const http = require('http');
const url = require('url');
const { processDocument } = require('../squads/legal-ocr-squad/scripts/ocr-engine');
const NamingEngine = require('../squads/legal-ocr-squad/tools/naming-engine');
const path = require('path');

const namingEngine = new NamingEngine();
const PORT = 3001;

const server = http.createServer(async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parseUrl = url.parse(req.url, true);

  if (req.method === 'POST' && parseUrl.pathname === '/api/process') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const { filePath, lang } = JSON.parse(body);
        console.log(`[Bridge] Processing request for: ${filePath}`);

        // 1. Run OCR
        const ocrResult = await processDocument(filePath, lang || 'por');

        // 2. Run AI Metadata Extraction
        const metadata = await namingEngine.extractMetadataAI(ocrResult.text);

        // 3. Generate suggested name
        const suggestedName = namingEngine.generateName(metadata, path.basename(filePath));

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          ocr: ocrResult,
          metadata: metadata,
          suggestedName: suggestedName,
        }));
      } catch (error) {
        console.error('[Bridge] Error:', error.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: error.message }));
      }
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`[AIOS-Bridge] Legal OCR Proxy running at http://localhost:${PORT}`);
});

