export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // --- 🛠️ PROTECTED BACKEND UPLOAD SYSTEM ---
    if (url.pathname === "/setup-files") {
      // SECURITY CHECK: Bypasses access if the unauthorized custom secret token is missing
      const authHeader = request.headers.get("Authorization");
      if (authHeader !== "Bearer YOUR_SECRET_UPLOAD_TOKEN_HERE") {
        return new Response("Unauthorized: Invalid or missing token.", { status: 401 });
      }

      if (request.method === "GET") {
        return new Response(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>Volatile Asset Uploader</title>
            <style>
              body { font-family: sans-serif; background: #111; color: #fff; padding: 40px; display: flex; justify-content: center; align-items: center; height: 80vh; }
              .card { background: #222; padding: 30px; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.5); max-width: 400px; width: 100%; border: 1px solid #333; }
              h2 { margin-top: 0; color: #f63; font-size: 22px; }
              label { display: block; margin-top: 15px; font-weight: bold; color: #aaa; font-size: 14px; }
              input, button { width: 100%; margin: 10px 0; padding: 12px; border-radius: 6px; border: none; font-size: 14px; }
              input[type="file"] { background: #333; color: #fff; box-sizing: border-box; cursor: pointer; }
              button { background: #f63; color: white; font-weight: bold; cursor: pointer; margin-top: 20px; transition: background 0.2s; }
              button:hover { background: #e52; }
            </style>
          </head>
          <body>
            <div class="card">
              <h2>Volatile Asset Uploader</h2>
              <p style="color: #888; font-size: 13px;">Upload payload assets directly to Cloudflare KV Namespace storage.</p>
              <form method="POST" enctype="multipart/form-data">
                <label>chocolate-doom.bin / executable</label>
                <input type="file" name="chocolate" required />
                <label>iwad_base64.txt</label>
                <input type="file" name="iwad" required />
                <button type="submit">Deploy Assets to Cloudflare</button>
              </form>
            </div>
          </body>
          </html>
        `, { headers: { "Content-Type": "text/html" } });
      }

      if (request.method === "POST") {
        try {
          if (!env.DOOM_ASSETS) {
            return new Response("ERROR: KV Namespace binding 'DOOM_ASSETS' missing.", { status: 500 });
          }
          const formData = await request.formData();
          const chocolateFile = formData.get("chocolate");
          const iwadFile = formData.get("iwad");

          if (!chocolateFile || !iwadFile) {
            return new Response("Missing form files.", { status: 400 });
          }

          const chocolateBuffer = await chocolateFile.arrayBuffer();
          const iwadText = await iwadFile.text();

          // Save binary vectors into Cloudflare KV
          await env.DOOM_ASSETS.put("chocolate_doom", chocolateBuffer);
          await env.DOOM_ASSETS.put("iwad_base64", iwadText.trim());

          return new Response("🚀 ASSETS DEPLOYED SUCCESSFULLY TO KV NAMESPACE!", { status: 200 });
        } catch (e) {
          return new Response(`Upload Error: ${e.message}`, { status: 500 });
        }
      }
    }

    // --- 🚀 CORE DISTRIBUTION API (GET /) ---
    if (request.method !== "GET") {
      return new Response("Method Not Allowed", { status: 405 });
    }
    try {
      if (!env.DOOM_ASSETS) {
        return new Response("ERROR: KV Namespace 'DOOM_ASSETS' not configured.", { status: 500 });
      }

      // Fetch the raw binary arraybuffer data from the deployment database
      const chocolateDoomBin = await env.DOOM_ASSETS.get("chocolate_doom", { type: "arrayBuffer" });

      if (!chocolateDoomBin) {
        return new Response("ERROR: Target payload vector not found in KV.", { status: 500 });
      }

      // Return raw dynamic stream with proper stream allocation headers
      return new Response(chocolateDoomBin, {
        headers: { 
          "Content-Type": "application/octet-stream",
          "Content-Disposition": "attachment; filename=chocolate-doom.exe",
          "Access-Control-Allow-Origin": "*"
        },
        status: 200
      });

    } catch (err) {
      return new Response(`RUNTIME CRASH: ${err.message}`, { status: 500 });
    }
  }
};