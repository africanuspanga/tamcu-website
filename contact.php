<?php
/** Contact form: stores each message for the admin inbox and emails the union address from settings. */

declare(strict_types=1);
require __DIR__ . '/admin/lib.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_out(['ok' => false, 'error' => 'POST only'], 405);
}
// bots fill the hidden "website" field
if (trim((string) ($_POST['website'] ?? '')) !== '') {
    json_out(['ok' => true]);
}

$f = function (string $k, int $max): string {
    $v = trim(preg_replace('/[\x00-\x1F\x7F]/u', ' ', (string) ($_POST[$k] ?? '')) ?? '');
    return function_exists('mb_substr') ? mb_substr($v, 0, $max) : substr($v, 0, $max);
};
$name = $f('name', 120);
$email = $f('email', 160);
$phone = $f('phone', 40);
$subject = $f('subject', 80);
$message = trim(substr((string) ($_POST['message'] ?? ''), 0, 5000));

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_out(['ok' => false, 'error' => 'missing'], 422);
}

// simple flood control: max 5 messages per address per hour
$all = read_json(MESSAGES_FILE, []);
$ip = client_ip();
$recent = array_filter($all, function ($m) use ($ip) { return ($m['ip'] ?? '') === $ip && strtotime($m['date'] ?? '') > time() - 3600; });
if (count($recent) >= 5) {
    json_out(['ok' => false, 'error' => 'too many'], 429);
}

$all[] = ['id' => bin2hex(random_bytes(6)), 'date' => date('c'), 'name' => $name, 'email' => $email, 'phone' => $phone, 'subject' => $subject, 'message' => $message, 'ip' => $ip];
if (count($all) > 500) {
    $all = array_slice($all, -500);
}
try {
    write_json(MESSAGES_FILE, $all);
} catch (Throwable $e) {
    json_out(['ok' => false, 'error' => 'store'], 500);
}

$settings = read_json(DATA_DIR . '/settings.json', []);
$to = (string) ($settings['contact']['email'] ?? 'info@tamcu.co.tz');
if (filter_var($to, FILTER_VALIDATE_EMAIL) && function_exists('mail')) {
    $host = preg_replace('/[^a-z0-9.\-]/i', '', (string) ($_SERVER['HTTP_HOST'] ?? 'tamcu.co.tz'));
    $host = preg_replace('/^www\./', '', $host);
    $body = "Ujumbe mpya kutoka tovuti ya TAMCU\n\nJina: $name\nBarua pepe: $email\nSimu: $phone\nMada: $subject\n\n$message\n";
    $headers = "From: TAMCU Website <no-reply@$host>\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8";
    @mail($to, '=?UTF-8?B?' . base64_encode('Tovuti: ' . ($subject ?: 'Ujumbe mpya') . ' — ' . $name) . '?=', $body, $headers);
}
json_out(['ok' => true]);
