import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { spawn, spawnSync } from 'node:child_process';

const envStrict = ['1', 'true', 'yes', 'on'].includes((process.env.BACKEND_STRICT || '').toLowerCase());
const strictMode = process.argv.includes('--strict') || envStrict;
const rootDir = process.cwd();
const backendDir = join(rootDir, 'backend');
const artisanPath = join(backendDir, 'artisan');
const isWsl = Boolean(process.env.WSL_DISTRO_NAME);
const wslInteropPath = '/proc/sys/fs/binfmt_misc/WSLInterop';
const wslInteropAvailable = existsSync(wslInteropPath);

if (!existsSync(artisanPath)) {
  console.error('Laravel backend not initialized in backend/ (artisan missing).');
  process.exit(1);
}

const candidates = process.platform === 'win32'
  ? ['php', 'C:\\xampp\\php\\php.exe']
  : ['php', '/usr/bin/php', '/usr/local/bin/php', '/mnt/c/xampp/php/php.exe'];

function resolvePhpExecutable() {
  for (const candidate of candidates) {
    try {
      const check = spawnSync(candidate, ['-v'], { stdio: 'ignore' });
      if (check.status === 0) {
        return candidate;
      }
    } catch {
      // Try next candidate.
    }
  }
  return null;
}

const phpExecutable = resolvePhpExecutable();

if (!phpExecutable) {
  console.warn('No PHP executable found. Frontend can still run, but backend API is not started.');
  if (isWsl && !wslInteropAvailable) {
    console.warn('WSL interop is disabled, so Windows PHP (.exe) cannot run from this shell.');
    console.warn('Use Linux PHP inside WSL (for example: `sudo apt install php-cli php-sqlite3`) or run `npm run dev:all` from PowerShell.');
  }
  console.warn('Install PHP or XAMPP, then run `npm run dev:backend` again.');
  process.exit(strictMode ? 1 : 0);
}

const child = spawn(phpExecutable, ['artisan', 'serve'], {
  cwd: backendDir,
  stdio: 'inherit',
});

child.on('error', (error) => {
  console.warn(`Failed to start backend with ${phpExecutable}: ${error.message}`);
  console.warn('Frontend can still run, but backend API is not started.');
  process.exit(strictMode ? 1 : 0);
});

child.on('close', (code) => {
  process.exit(code ?? 0);
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    if (!child.killed) {
      child.kill(signal);
    }
  });
}
