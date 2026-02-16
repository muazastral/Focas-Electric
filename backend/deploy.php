<?php
/**
 * Post-deploy script: installs Laravel dependencies in backend/.
 * Triggered by root composer.json post-install-cmd.
 */

echo "=== Focus Electrical Deploy Script ===\n";

$backendDir = __DIR__;
echo "Backend dir: {$backendDir}\n";

// Find composer executable
$composerPaths = ['composer', 'composer.phar', '/usr/local/bin/composer', '/usr/bin/composer'];
$composer = null;
foreach ($composerPaths as $path) {
    $output = [];
    $code = 0;
    exec("which {$path} 2>/dev/null", $output, $code);
    if ($code === 0 && !empty($output[0])) {
        $composer = $output[0];
        break;
    }
}

// Fallback: try 'composer' directly
if (!$composer) {
    $composer = 'composer';
}

echo "Using composer: {$composer}\n";

// Run composer install in backend/
chdir($backendDir);
echo "Installing Laravel dependencies...\n";
passthru("{$composer} install --no-dev --optimize-autoloader 2>&1", $exitCode);

if ($exitCode !== 0) {
    echo "WARNING: composer install exited with code {$exitCode}\n";
} else {
    echo "Dependencies installed successfully.\n";
}

// Ensure .env exists
if (!file_exists($backendDir . '/.env') && file_exists($backendDir . '/.env.example')) {
    copy($backendDir . '/.env.example', $backendDir . '/.env');
    echo "Created .env from .env.example\n";
    
    // Generate app key
    passthru("{$composer} run-script post-root-package-install 2>&1");
    passthru("php artisan key:generate --force 2>&1");
}

// Ensure SQLite database exists
$dbPath = $backendDir . '/database/database.sqlite';
if (!file_exists($dbPath)) {
    touch($dbPath);
    echo "Created SQLite database file\n";
    passthru("php artisan migrate --force 2>&1");
    echo "Migrations complete.\n";
}

// Clear and cache config for production
passthru("php artisan config:cache 2>&1");
passthru("php artisan route:cache 2>&1");
passthru("php artisan view:cache 2>&1");

echo "=== Deploy complete ===\n";

exit($exitCode);
