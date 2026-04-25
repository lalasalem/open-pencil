<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>OpenPencil</title>
    <script src="https://unpkg.com/trystero@0.20.0/dist/trystero-mqtt.min.js"></script>
    <script>
      window.global = window;
      window.process = { env: { NODE_ENV: 'production' } };
      window.__TAURI__ = { invoke: () => Promise.resolve(), convertFileSrc: (s) => s };
    </script>
    <style>
      body { margin: 0; background: #1e1e1e; height: 100vh; width: 100vw; overflow: hidden; }
      #loading-screen {
        position: fixed; inset: 0;
        display: flex; align-items: center; justify-content: center;
        background: #1e1e1e; z-index: 9999;
        color: #3b82f6; font-family: sans-serif;
        flex-direction: column; gap: 16px;
        transition: opacity 0.3s ease;
      }
      #loading-screen.hidden { opacity: 0; pointer-events: none; }
      .loader-spinner {
        width: 40px; height: 40px;
        border: 3px solid rgba(59,130,246,0.2);
        border-top-color: #3b82f6;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }
      @keyframes spin { to { transform: rotate(360deg); } }
    </style>
  </head>
  <body>
    <div id="app"></div>
    <div id="loading-screen">
      <div class="loader-spinner"></div>
      <div>Loading OpenPencil...</div>
    </div>
    <script type="module" src="/src/main.ts"></script>
    <script>
      // Hide loading screen once Vue has mounted #app
      const observer = new MutationObserver(() => {
        const app = document.getElementById('app');
        if (app && app.children.length > 0) {
          const loader = document.getElementById('loading-screen');
          if (loader) loader.classList.add('hidden');
          observer.disconnect();
        }
      });
      observer.observe(document.getElementById('app') || document.body, {
        childList: true,
        subtree: true
      });
      // Fallback: force hide after 10 seconds no matter what
      setTimeout(() => {
        const loader = document.getElementById('loading-screen');
        if (loader) loader.classList.add('hidden');
      }, 10000);
    </script>
  </body>
</html>
