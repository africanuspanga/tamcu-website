<?php
/**
 * TAMCU admin — shared helpers. Works on PHP 7.2+ with no extensions beyond the defaults
 * (GD is used for resizing uploads when it is available).
 */

declare(strict_types=1);

define('ROOT_DIR', dirname(__DIR__));
define('DATA_DIR', ROOT_DIR . '/data');
define('UPLOAD_DIR', ROOT_DIR . '/uploads');
define('PRIVATE_DIR', __DIR__ . '/private');
define('BACKUP_DIR', PRIVATE_DIR . '/backups');
define('AUTH_FILE', PRIVATE_DIR . '/auth.json');
define('ATTEMPTS_FILE', PRIVATE_DIR . '/attempts.json');
define('MESSAGES_FILE', PRIVATE_DIR . '/messages.json');

/** Content files the admin may read and write. */
const DATA_FILES = ['settings', 'seasons', 'auctions', 'production', 'leaders', 'partners', 'news', 'updates'];

require_once __DIR__ . '/config.php';

date_default_timezone_set('Africa/Dar_es_Salaam');
// Never print PHP warnings into responses (they would break the JSON the admin expects).
ini_set('display_errors', '0');

function start_session(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }
    $secure = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');
    session_name('tamcu_admin');
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'secure' => $secure,
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
    session_start();
    // sign out after 3 hours without activity
    if (isset($_SESSION['seen']) && time() - $_SESSION['seen'] > 10800) {
        $_SESSION = [];
        session_regenerate_id(true);
    }
    $_SESSION['seen'] = time();
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }
}

function is_logged_in(): bool
{
    return !empty($_SESSION['user']);
}

function read_json(string $file, $default = [])
{
    if (!is_file($file)) {
        return $default;
    }
    $raw = file_get_contents($file);
    $data = json_decode((string) $raw, true);
    return is_array($data) ? $data : $default;
}

function write_json(string $file, $data): void
{
    $dir = dirname($file);
    if (!is_dir($dir) && !@mkdir($dir, 0755, true)) {
        throw new RuntimeException('Cannot create folder ' . basename($dir));
    }
    $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if ($json === false) {
        throw new RuntimeException('Could not encode data');
    }
    $tmp = $file . '.' . bin2hex(random_bytes(4)) . '.tmp';
    if (@file_put_contents($tmp, $json . "\n", LOCK_EX) === false) {
        throw new RuntimeException('Could not write ' . basename($file) . ' — check folder permissions');
    }
    if (!@rename($tmp, $file)) {
        @unlink($tmp);
        throw new RuntimeException('Could not save ' . basename($file));
    }
    @chmod($file, 0644);
}

function json_out($data, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function client_ip(): string
{
    return (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
}

/** Too many failed sign-ins from this address in the last 15 minutes? */
function login_blocked(): bool
{
    $all = read_json(ATTEMPTS_FILE);
    $ip = client_ip();
    $recent = array_filter($all[$ip] ?? [], function ($t) { return $t > time() - 900; });
    return count($recent) >= 6;
}

function record_failure(): void
{
    $all = read_json(ATTEMPTS_FILE);
    $ip = client_ip();
    $all[$ip] = array_values(array_filter($all[$ip] ?? [], function ($t) { return $t > time() - 900; }));
    $all[$ip][] = time();
    // keep the file small
    foreach ($all as $k => $list) {
        if (!$list || max($list) < time() - 900) {
            unset($all[$k]);
        }
    }
    write_json(ATTEMPTS_FILE, $all);
}

function clear_failures(): void
{
    $all = read_json(ATTEMPTS_FILE);
    unset($all[client_ip()]);
    write_json(ATTEMPTS_FILE, $all);
}

function auth_record(): ?array
{
    $a = read_json(AUTH_FILE, []);
    return !empty($a['hash']) ? $a : null;
}

function h(string $s): string
{
    return htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
}

/** Copy the current version of a data file into backups before it is replaced. Keeps the last 40 per file. */
function backup_file(string $name): void
{
    $src = DATA_DIR . '/' . $name . '.json';
    if (!is_file($src)) {
        return;
    }
    if (!is_dir(BACKUP_DIR)) {
        mkdir(BACKUP_DIR, 0755, true);
    }
    copy($src, BACKUP_DIR . '/' . $name . '-' . date('Ymd-His') . '.json');
    $old = glob(BACKUP_DIR . '/' . $name . '-*.json') ?: [];
    sort($old);
    while (count($old) > 40) {
        @unlink(array_shift($old));
    }
}

/** Remove control characters and cap string length throughout a decoded JSON structure. */
function clean_data($v, int $depth = 0)
{
    if ($depth > 12) {
        return null;
    }
    if (is_array($v)) {
        $out = [];
        foreach ($v as $k => $item) {
            $key = is_int($k) ? $k : substr(preg_replace('/[^A-Za-z0-9_\-]/', '', (string) $k), 0, 64);
            $out[$key] = clean_data($item, $depth + 1);
        }
        return $out;
    }
    if (is_string($v)) {
        $v = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $v) ?? '';
        return function_exists('mb_substr') ? mb_substr($v, 0, 20000) : substr($v, 0, 20000);
    }
    if (is_int($v) || is_float($v) || is_bool($v) || $v === null) {
        return $v;
    }
    return null;
}
