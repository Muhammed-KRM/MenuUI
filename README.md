# ☕ Laden - Temassız QR Menü UI

Laden için özel olarak tasarlanmış, backend bağımlılığı olmayan, ultra hızlı ve modern **Statik QR Menü Web Uygulaması**.

---

## 🌟 Özellikler

- **%100 Statik & Serverless:** Vercel, Netlify veya GitHub Pages üzerinde sıfır maliyetle çalışır.
- **Modern UI & UX:** Koyu kahve ve sıcak krem tonlarında Laden marka kimliğine özel tasarım.
- **14 Kategori & 154 Ürün:** Canlı arama, anında filtreleme ve ürün detay popup pencereleri.
- **Dinamik Masa & QR Sistemi:** Masalara özel URL parametreleri (`?table=Masa 5`), uygulama içi canlı QR görüntüleme ve A5 Masa Standı şablonu.
- **Responsive:** Mobil, tablet ve masaüstü cihazlarla %100 uyumlu.

---

## 🛠️ Teknolojiler

- **Framework:** Angular (Standalone Components, Signals tabanlı reaktif yapı)
- **Stil:** TailwindCSS + Custom Modern CSS
- **QR Entegrasyonu:** Dynamic QRCode Generator
- **Dağıtım:** Vercel SPA Ready (`vercel.json`)

---

## 🚀 Kurulum ve Geliştirme

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm start
# http://localhost:4200 adresinde açılır

# Canlıya (Production) derleyin
npm run build
```

---

## 📦 Vercel Deploy Rehberi

1. GitHub'da `MenuUI` reposunu Vercel hesabınıza bağlayın (Import Repository).
2. Framework otomatik olarak **Angular** algılanacaktır.
3. **Deploy** butonuna basın. Projeniz saniyeler içinde canlıya geçecektir!

---

## 📝 Ürün & Fiyat Güncelleme

Menüdeki ürün ve kategoriler `src/assets/data/menu.json` dosyasından yönetilir. Yeni ürün eklemek veya fiyat değiştirmek için bu JSON dosyasını düzenlemeniz yeterlidir.
