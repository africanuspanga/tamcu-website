<?php
/** TAMCU admin — first-time setup, sign-in and the editor shell. */

declare(strict_types=1);
require __DIR__ . '/lib.php';

start_session();
header('X-Robots-Tag: noindex, nofollow');
header('X-Frame-Options: DENY');
header('Referrer-Policy: same-origin');

$error = '';
$notice = '';
$auth = auth_record();
$mode = $auth ? 'login' : 'setup';

if (isset($_GET['logout'])) {
    $_SESSION = [];
    session_regenerate_id(true);
    header('Location: ./');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && !is_logged_in()) {
    if (!hash_equals($_SESSION['csrf'], (string) ($_POST['csrf'] ?? ''))) {
        $error = 'Ukurasa umepitwa na muda. Jaribu tena.';
    } elseif (login_blocked()) {
        $error = 'Majaribio mengi yamekosewa. Subiri dakika 15 kisha jaribu tena.';
    } elseif ($mode === 'setup') {
        $key = trim((string) ($_POST['setup_key'] ?? ''));
        $user = trim((string) ($_POST['user'] ?? ''));
        $pass = (string) ($_POST['pass'] ?? '');
        if (SETUP_KEY === 'CHANGE-ME-BEFORE-UPLOAD' || !hash_equals(SETUP_KEY, $key)) {
            record_failure();
            $error = 'Setup key si sahihi.';
        } elseif (!preg_match('/^[A-Za-z0-9_.@-]{3,40}$/', $user)) {
            $error = 'Jina la mtumiaji: herufi 3–40, bila nafasi.';
        } elseif (strlen($pass) < 10) {
            $error = 'Nenosiri liwe na herufi 10 au zaidi.';
        } elseif ($pass !== (string) ($_POST['pass2'] ?? '')) {
            $error = 'Manenosiri hayafanani.';
        } else {
            write_json(AUTH_FILE, ['user' => $user, 'hash' => password_hash($pass, PASSWORD_DEFAULT), 'created' => date('c')]);
            session_regenerate_id(true);
            $_SESSION['user'] = $user;
            header('Location: ./');
            exit;
        }
    } else {
        $user = trim((string) ($_POST['user'] ?? ''));
        $pass = (string) ($_POST['pass'] ?? '');
        if (hash_equals((string) $auth['user'], $user) && password_verify($pass, $auth['hash'])) {
            clear_failures();
            if (password_needs_rehash($auth['hash'], PASSWORD_DEFAULT)) {
                $auth['hash'] = password_hash($pass, PASSWORD_DEFAULT);
                write_json(AUTH_FILE, $auth);
            }
            session_regenerate_id(true);
            $_SESSION['user'] = $user;
            header('Location: ./');
            exit;
        }
        record_failure();
        usleep(400000);
        $error = 'Jina la mtumiaji au nenosiri si sahihi.';
    }
}

$checks = [];
foreach ([DATA_DIR, UPLOAD_DIR, PRIVATE_DIR] as $dir) {
    if (!is_dir($dir)) {
        @mkdir($dir, 0755, true);
    }
    if (!is_writable($dir)) {
        $checks[] = 'Folda "' . basename($dir) . '" haiandikiki — weka ruhusa 755 kwenye cPanel.';
    }
}
$v = (string) @filemtime(__DIR__ . '/admin.js');
?><!DOCTYPE html>
<html lang="sw">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Admin | TAMCU LTD</title>
<link rel="icon" href="../assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="admin.css?v=<?= h($v) ?>">
</head>
<body>
<?php if (!is_logged_in()): ?>
<main class="auth">
  <form class="auth-card" method="post" autocomplete="on">
    <img src="../assets/img/logo-192.webp" alt="" width="64" height="64">
    <h1><?= $mode === 'setup' ? 'Weka akaunti ya admin' : 'Ingia — Admin' ?></h1>
    <p class="muted"><?= $mode === 'setup' ? 'Mara ya kwanza tu: weka setup key uliyopewa, kisha chagua jina la mtumiaji na nenosiri.' : 'Usimamizi wa maudhui ya tovuti ya TAMCU LTD.' ?></p>
    <?php if ($error): ?><div class="alert err"><?= h($error) ?></div><?php endif; ?>
    <?php foreach ($checks as $c): ?><div class="alert warn"><?= h($c) ?></div><?php endforeach; ?>
    <input type="hidden" name="csrf" value="<?= h($_SESSION['csrf']) ?>">
    <?php if ($mode === 'setup'): ?>
      <label>Setup key<input name="setup_key" required autocomplete="off"></label>
    <?php endif; ?>
    <label>Jina la mtumiaji<input name="user" required autocomplete="username" value="<?= h((string) ($_POST['user'] ?? '')) ?>"></label>
    <label>Nenosiri<input name="pass" type="password" required autocomplete="<?= $mode === 'setup' ? 'new-password' : 'current-password' ?>"></label>
    <?php if ($mode === 'setup'): ?>
      <label>Rudia nenosiri<input name="pass2" type="password" required autocomplete="new-password"></label>
    <?php endif; ?>
    <button class="btn primary" type="submit"><?= $mode === 'setup' ? 'Hifadhi na uingie' : 'Ingia' ?></button>
    <a class="muted small" href="../">&larr; Rudi kwenye tovuti</a>
  </form>
</main>
<?php else: ?>
<div class="app">
  <aside class="side">
    <a class="side-brand" href="./"><img src="../assets/img/logo-192.webp" alt="" width="36" height="36"><span>TAMCU Admin</span></a>
    <nav id="nav"></nav>
    <div class="side-foot">
      <a href="../" target="_blank" rel="noopener">Fungua tovuti ↗</a>
      <a href="?logout=1">Toka (<?= h((string) $_SESSION['user']) ?>)</a>
    </div>
  </aside>
  <main class="main">
    <header class="bar">
      <button class="btn ghost menu" type="button" id="menu" aria-label="Menyu">☰</button>
      <h1 id="title">Dashibodi</h1>
      <span class="status" id="status" role="status"></span>
      <button class="btn primary" id="save" type="button" hidden>Hifadhi mabadiliko</button>
    </header>
    <?php foreach ($checks as $c): ?><div class="alert warn" style="margin:16px 24px 0"><?= h($c) ?></div><?php endforeach; ?>
    <div id="view" class="view"></div>
  </main>
</div>
<script>window.ADMIN = { csrf: <?= json_encode($_SESSION['csrf']) ?>, user: <?= json_encode($_SESSION['user']) ?> };</script>
<script src="schema.js?v=<?= h($v) ?>"></script>
<script src="admin.js?v=<?= h($v) ?>"></script>
<?php endif; ?>
</body>
</html>
