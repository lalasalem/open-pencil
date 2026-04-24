<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>OpenPencil</title>
    
    <script src="https://unpkg.com/trystero@0.23.0/dist/trystero-mqtt.min.js"></script>

    <script>
      // Chromebook Safety Mocks
      window.__TAURI__ = { invoke: () => Promise.resolve(), convertFileSrc: (s) => s };
      window.global = window;
      window.process = { env: {} };

      // Emergency: If stuck for more than 10 seconds, try a soft refresh of the storage
      setTimeout(() => {
        if (document.getElementById('loader')) {
          console.log("Taking a long time... attempting to force start.");
          window.dispatchEvent(new Event('load'));
        }
      }, 10000);
    </script>

    <style>
      body { margin: 0; background: #1e1e1e; color: white; font-family: sans-serif; }
      #loader {
        position: fixed;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: #1e1e1e;
        z-index: 9999;
      }
      .spinner {
        width: 40px;
        height: 40px;
        border: 3px solid rgba(255,255,255,0.1);
        border-top: 3px solid #3b82f6;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      @keyframes spin { to { transform: rotate(360deg); } }
      .text { margin-top: 20px; font-size: 14px; opacity: 0.6; }
    </style>
  </head>
  <body>
    <div id="loader">
      <div class="spinner"></div>
      <div class="text">Loading OpenPencil...</div>
    </div>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
