<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Focus Electrical Malaysia</title>
    <link rel="icon" href="/favicon.ico" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    @php
      $manifest = json_decode(file_get_contents(public_path('build/.vite/manifest.json')), true);
      $entry = $manifest['index.html'] ?? $manifest['index.tsx'] ?? null;
    @endphp
    @if($entry && isset($entry['css']))
      @foreach($entry['css'] as $css)
        <link rel="stylesheet" href="/build/{{ $css }}">
      @endforeach
    @endif
  </head>
  <body class="bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
    <div id="root"></div>
    @if($entry)
      <script type="module" src="/build/{{ $entry['file'] }}"></script>
    @endif
  </body>
</html>
