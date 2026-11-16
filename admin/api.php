<?php
/** TAMCU admin — JSON API used by admin.js. Every action except login needs a signed-in session and CSRF token. */

declare(strict_types=1);
require __DIR__ . '/lib.php';

start_session();
header('X-Robots-Tag: noindex');

$action = (string) ($_GET['action'] ?? '');

if ($_SERVER['REQUEST_METHOD'] !== 'POST' && $action !== 'get' && $action !== 'messages' && $action !== 'backups') {
    json_out(['ok' => false, 'error' => 'Use POST'], 405);
}
if (!is_logged_in()) {
    json_out(['ok' => false, 'error' => 'Umetoka. Ingia tena.', 'login' => true], 401);
}
if ($_SERVER['REQUEST_METHOD'] === 'POST' && !hash_equals($_SESSION['csrf'], (string) ($_SERVER['HTTP_X_CSRF'] ?? ''))) {
    json_out(['ok' => false, 'error' => 'Ukurasa umepitwa na muda. Pakia upya (refresh) kisha jaribu tena.'], 403);
}

try {
    switch ($action) {
        case 'get':
            $name = (string) ($_GET['name'] ?? '');
            if (!in_array($name, DATA_FILES, true)) {
                json_out(['ok' => false, 'error' => 'Unknown section'], 400);
            }
            json_out(['ok' => true, 'data' => read_json(DATA_DIR . "/$name.json", [])]);

        case 'save':
            $name = (string) ($_GET['name'] ?? '');
            if (!in_array($name, DATA_FILES, true)) {
                json_out(['ok' => false, 'error' => 'Unknown section'], 400);
            }
            $raw = file_get_contents('php://input');
            if ($raw === false || strlen($raw) > 3 * 1024 * 1024) {
                json_out(['ok' => false, 'error' => 'Data is too large'], 413);
            }
            $data = json_decode($raw, true);
            if (!is_array($data)) {
                json_out(['ok' => false, 'error' => 'Invalid data'], 400);
            }
            backup_file($name);
            write_json(DATA_DIR . "/$name.json", clean_data($data));
            json_out(['ok' => true, 'saved' => date('H:i')]);

        case 'upload':
            json_out(handle_upload());

        case 'messages':
            json_out(['ok' => true, 'items' => array_reverse(read_json(MESSAGES_FILE, []))]);

        case 'delete_message':
            $id = (string) ($_GET['id'] ?? '');
            $items = array_values(array_filter(read_json(MESSAGES_FILE, []), function ($m) use ($id) { return ($m['id'] ?? '') !== $id; }));
            write_json(MESSAGES_FILE, $items);
            json_out(['ok' => true]);

        case 'backups':
            $name = (string) ($_GET['name'] ?? '');
            if (!in_array($name, DATA_FILES, true)) {
                json_out(['ok' => false, 'error' => 'Unknown section'], 400);
            }
            $files = glob(BACKUP_DIR . '/' . $name . '-*.json') ?: [];
            rsort($files);
            json_out(['ok' => true, 'items' => array_map('basename', array_slice($files, 0, 20))]);

        case 'restore':
            $file = basename((string) ($_GET['file'] ?? ''));
            if (!preg_match('/^([a-z]+)-\d{8}-\d{6}\.json$/', $file, $m) || !in_array($m[1], DATA_FILES, true) || !is_file(BACKUP_DIR . '/' . $file)) {
                json_out(['ok' => false, 'error' => 'Backup not found'], 404);
            }
            backup_file($m[1]);
            write_json(DATA_DIR . '/' . $m[1] . '.json', read_json(BACKUP_DIR . '/' . $file));
            json_out(['ok' => true]);

        case 'password':
            $in = json_decode((string) file_get_contents('php://input'), true) ?: [];
            $auth = auth_record();
            if (!$auth || !password_verify((string) ($in['current'] ?? ''), $auth['hash'])) {
                json_out(['ok' => false, 'error' => 'Nenosiri la sasa si sahihi.'], 400);
            }
            $new = (string) ($in['new'] ?? '');
            if (strlen($new) < 10) {
                json_out(['ok' => false, 'error' => 'Nenosiri jipya liwe na herufi 10 au zaidi.'], 400);
            }
            $auth['hash'] = password_hash($new, PASSWORD_DEFAULT);
            $auth['changed'] = date('c');
            write_json(AUTH_FILE, $auth);
            json_out(['ok' => true]);

        default:
            json_out(['ok' => false, 'error' => 'Unknown action'], 400);
    }
} catch (Throwable $e) {
    json_out(['ok' => false, 'error' => $e->getMessage()], 500);
}

/** Validate an uploaded image, resize it when GD is present, and store it under /uploads/YYYY/MM/. */
function handle_upload(): array
{
    $f = $_FILES['file'] ?? null;
    if (!$f || !is_array($f) || ($f['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
        $code = $f['error'] ?? UPLOAD_ERR_NO_FILE;
        $msg = in_array($code, [UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE], true) ? 'Picha ni kubwa mno kwa seva.' : 'Picha haikupakiwa. Jaribu tena.';
        return ['ok' => false, 'error' => $msg];
    }
    if ($f['size'] > MAX_UPLOAD_MB * 1024 * 1024) {
        return ['ok' => false, 'error' => 'Picha isizidi MB ' . MAX_UPLOAD_MB . '.'];
    }
    $info = @getimagesize($f['tmp_name']);
    $types = [IMAGETYPE_JPEG => 'jpg', IMAGETYPE_PNG => 'png', IMAGETYPE_WEBP => 'webp', IMAGETYPE_GIF => 'gif'];
    if (!$info || !isset($types[$info[2]])) {
        return ['ok' => false, 'error' => 'Weka picha ya JPG, PNG au WEBP tu.'];
    }
    $sub = date('Y/m');
    $dir = UPLOAD_DIR . '/' . $sub;
    if (!is_dir($dir) && !mkdir($dir, 0755, true)) {
        return ['ok' => false, 'error' => 'Folda ya uploads haiandikiki. Angalia ruhusa (permissions).'];
    }
    $base = bin2hex(random_bytes(8));
    $maxPx = (int) ($_GET['max'] ?? MAX_IMAGE_PX);
    $maxPx = max(200, min(2400, $maxPx));

    if (function_exists('imagecreatetruecolor')) {
        $src = null;
        switch ($info[2]) {
            case IMAGETYPE_JPEG: $src = @imagecreatefromjpeg($f['tmp_name']); break;
            case IMAGETYPE_PNG: $src = @imagecreatefrompng($f['tmp_name']); break;
            case IMAGETYPE_WEBP: $src = function_exists('imagecreatefromwebp') ? @imagecreatefromwebp($f['tmp_name']) : null; break;
            case IMAGETYPE_GIF: $src = @imagecreatefromgif($f['tmp_name']); break;
        }
        if ($src) {
            if ($info[2] === IMAGETYPE_JPEG && function_exists('exif_read_data')) {
                $exif = @exif_read_data($f['tmp_name']);
                $rot = ['3' => 180, '6' => -90, '8' => 90][(string) ($exif['Orientation'] ?? '')] ?? 0;
                if ($rot) {
                    $src = imagerotate($src, $rot, 0);
                }
            }
            $w = imagesx($src);
            $hgt = imagesy($src);
            $scale = min(1, $maxPx / max($w, $hgt));
            $nw = (int) round($w * $scale);
            $nh = (int) round($hgt * $scale);
            $dst = imagecreatetruecolor($nw, $nh);
            $keepAlpha = $info[2] === IMAGETYPE_PNG || $info[2] === IMAGETYPE_WEBP;
            if ($keepAlpha) {
                imagealphablending($dst, false);
                imagesavealpha($dst, true);
            }
            imagecopyresampled($dst, $src, 0, 0, 0, 0, $nw, $nh, $w, $hgt);
            if (function_exists('imagewebp')) {
                $name = "$base.webp";
                imagewebp($dst, "$dir/$name", 80);
            } elseif ($keepAlpha) {
                $name = "$base.png";
                imagepng($dst, "$dir/$name", 8);
            } else {
                $name = "$base.jpg";
                imagejpeg($dst, "$dir/$name", 82);
            }
            imagedestroy($src);
            imagedestroy($dst);
            return ['ok' => true, 'url' => "uploads/$sub/$name", 'width' => $nw, 'height' => $nh];
        }
    }
    // No GD: keep the original file, with an extension chosen from its real type.
    $name = $base . '.' . $types[$info[2]];
    if (!move_uploaded_file($f['tmp_name'], "$dir/$name")) {
        return ['ok' => false, 'error' => 'Picha haikuhifadhiwa.'];
    }
    @chmod("$dir/$name", 0644);
    return ['ok' => true, 'url' => "uploads/$sub/$name", 'width' => $info[0], 'height' => $info[1]];
}
