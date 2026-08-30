const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

async function generateQRCodes() {
  const targetUrl = 'https://laden-menu.vercel.app';

  const outputDir = path.join(__dirname, 'src', 'assets', 'qr');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 1. Temiz PNG QR Kod
  const pngPath = path.join(outputDir, 'menu-qr.png');
  await QRCode.toFile(pngPath, targetUrl, {
    color: {
      dark: '#2A180E',
      light: '#FFFFFF'
    },
    width: 600,
    margin: 2,
    errorCorrectionLevel: 'H'
  });
  console.log('✅ QR PNG oluşturuldu:', pngPath);

  // 2. SVG QR Kod
  const svgPath = path.join(outputDir, 'menu-qr.svg');
  const svgString = await QRCode.toString(targetUrl, {
    type: 'svg',
    color: {
      dark: '#2A180E',
      light: '#FFFFFF00'
    },
    margin: 1,
    errorCorrectionLevel: 'H'
  });
  fs.writeFileSync(svgPath, svgString, 'utf8');
  console.log('✅ QR SVG oluşturuldu:', svgPath);

  // 3. Masaya konulacak şık Yazdırılabilir Masa Standı HTML'i
  const qrDataUrl = await QRCode.toDataURL(targetUrl, {
    color: {
      dark: '#2A180E',
      light: '#FAF6F0'
    },
    width: 500,
    margin: 2,
    errorCorrectionLevel: 'H'
  });

  const standHtml = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Laden - Masa QR Menü Standı</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Playfair+Display:ital,wght@0,700;1,600&display=swap" rel="stylesheet">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      background-color: #26170F;
      font-family: 'Plus Jakarta Sans', sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .print-controls {
      margin-bottom: 24px;
      display: flex;
      gap: 12px;
      background: rgba(255,255,255,0.08);
      padding: 12px 20px;
      border-radius: 100px;
      backdrop-filter: blur(10px);
    }
    .btn {
      background: #C65D3A;
      color: white;
      border: none;
      padding: 10px 24px;
      border-radius: 50px;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(198, 93, 58, 0.4);
      transition: all 0.2s ease;
    }
    .btn:hover {
      background: #d46944;
      transform: translateY(-1px);
    }
    .btn-secondary {
      background: rgba(255,255,255,0.15);
      box-shadow: none;
    }
    .btn-secondary:hover {
      background: rgba(255,255,255,0.25);
    }

    /* Masa Standı Kartı */
    .stand-card {
      width: 380px;
      background: linear-gradient(165deg, #FAF6F0 0%, #F3EBDD 100%);
      border-radius: 32px;
      padding: 40px 32px;
      text-align: center;
      box-shadow: 0 25px 60px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(198, 93, 58, 0.15);
      position: relative;
      overflow: hidden;
    }
    .stand-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 8px;
      background: linear-gradient(90deg, #C65D3A, #DDA15E, #C65D3A);
    }
    .brand-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(198, 93, 58, 0.1);
      color: #C65D3A;
      padding: 6px 16px;
      border-radius: 50px;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 20px;
    }
    .brand-title {
      font-family: 'Playfair Display', serif;
      font-size: 42px;
      color: #2A180E;
      font-weight: 700;
      letter-spacing: -0.5px;
      margin-bottom: 6px;
      line-height: 1.1;
    }
    .brand-sub {
      color: #7A5B47;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 28px;
    }
    .qr-container {
      background: #FFFFFF;
      padding: 20px;
      border-radius: 24px;
      display: inline-block;
      box-shadow: 0 10px 30px rgba(42, 24, 14, 0.08), inset 0 0 0 1px rgba(42, 24, 14, 0.05);
      margin-bottom: 24px;
      position: relative;
    }
    .qr-container img {
      width: 220px;
      height: 220px;
      display: block;
      border-radius: 8px;
    }
    .qr-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 44px;
      height: 44px;
      background: #2A180E;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #F7F1E3;
      font-size: 20px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.25);
      border: 3px solid white;
    }
    .instructions {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      color: #2A180E;
      font-weight: 700;
      font-size: 16px;
      margin-bottom: 6px;
    }
    .sub-instructions {
      color: #8C7362;
      font-size: 12px;
      font-weight: 500;
    }
    .url-chip {
      margin-top: 24px;
      display: inline-block;
      background: rgba(42, 24, 14, 0.06);
      color: #5C4033;
      padding: 6px 14px;
      border-radius: 8px;
      font-size: 11px;
      font-family: monospace;
      font-weight: 600;
      word-break: break-all;
    }

    @media print {
      body {
        background: white;
        padding: 0;
      }
      .print-controls {
        display: none !important;
      }
      .stand-card {
        box-shadow: none;
        border: 1px solid #ddd;
        margin: auto;
        page-break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  <div class="print-controls">
    <button class="btn" onclick="window.print()">🖨️ Yazdır / PDF Kaydet</button>
    <button class="btn btn-secondary" onclick="changeUrl()">✏️ URL'yi Değiştir</button>
  </div>

  <div class="stand-card" id="standCard">
    <div class="brand-badge">Temassız Menü</div>
    <h1 class="brand-title">Laden</h1>
    <p class="brand-sub">Artisan Coffee & Bakery</p>

    <div class="qr-container">
      <img id="qrImage" src="${qrDataUrl}" alt="Laden QR Menü" />
      <div class="qr-icon">☕</div>
    </div>

    <div class="instructions">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C65D3A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
        <circle cx="12" cy="13" r="4"></circle>
      </svg>
      <span>Kameranızla Taratın</span>
    </div>
    <p class="sub-instructions">Dijital menümüzü anında görüntüleyin</p>

    <div class="url-chip" id="urlDisplay">${targetUrl}</div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js"></script>
  <script>
    function changeUrl() {
      const current = document.getElementById('urlDisplay').innerText;
      const newUrl = prompt("QR Kodun yönlendireceği Vercel veya Menü URL'sini girin:", current);
      if (newUrl && newUrl.trim()) {
        const trimmed = newUrl.trim();
        document.getElementById('urlDisplay').innerText = trimmed;
        QRCode.toDataURL(trimmed, {
          color: { dark: '#2A180E', light: '#FAF6F0' },
          width: 500,
          margin: 2,
          errorCorrectionLevel: 'H'
        }, function (err, url) {
          if (!err) {
            document.getElementById('qrImage').src = url;
          }
        });
      }
    }
  </script>
</body>
</html>`;

  const standPath = path.join(__dirname, 'src', 'assets', 'qr', 'stand.html');
  fs.writeFileSync(standPath, standHtml, 'utf8');
  console.log('✅ Masa Standı HTML oluşturuldu:', standPath);

  const rootStandPath = path.join('D:', 'menüUI', 'MASA_QR_STANDI.html');
  fs.writeFileSync(rootStandPath, standHtml, 'utf8');
  console.log('✅ Kök dizine kopyalandı:', rootStandPath);
}

generateQRCodes();
