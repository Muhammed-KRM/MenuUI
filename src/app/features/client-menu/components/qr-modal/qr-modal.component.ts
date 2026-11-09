import { Component, Input, Output, EventEmitter, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-qr-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isOpen) {
      <div 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
        (click)="closeModal()">
        
        <div 
          class="bg-[#FAF6F0] rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#C65D3A]/20 relative overflow-hidden text-center transform transition-all animate-scale-up"
          (click)="$event.stopPropagation()">

          <!-- Üst Çizgi Dekoru -->
          <div class="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#C65D3A] via-[#DDA15E] to-[#C65D3A]"></div>

          <!-- Kapat Butonu -->
          <button 
            (click)="closeModal()"
            class="absolute top-4 right-4 text-[#725B4D] hover:text-[#2A180E] bg-white/80 p-2 rounded-full shadow-sm hover:bg-white transition-all">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          <!-- Başlık -->
          <div class="mt-2 mb-4">
            <span class="inline-block px-3 py-1 bg-[#C65D3A]/10 text-[#C65D3A] text-xs font-bold uppercase tracking-wider rounded-full mb-1">
              Temassız Dijital Menü
            </span>
            <h3 class="text-2xl font-bold text-[#2A180E]">Laden QR Kod</h3>
            <p class="text-xs text-[#725B4D] mt-0.5">Telefon kameranızla taratarak menüyü açın</p>
          </div>

          <!-- QR Kod Görseli -->
          <div class="bg-white p-4 rounded-2xl inline-block shadow-md border border-[#EFE7D5] my-2 relative">
            @if (qrDataUrl()) {
              <img [src]="qrDataUrl()" alt="Laden Menü QR Kodu" class="w-56 h-56 mx-auto rounded-lg" />
            } @else {
              <div class="w-56 h-56 flex items-center justify-center text-[#725B4D] text-sm">
                QR Kod Oluşturuluyor...
              </div>
            }
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#2A180E] text-white rounded-xl flex items-center justify-center shadow-lg border-2 border-white text-lg">
              ☕
            </div>
          </div>

          <!-- Butonlar -->
          <div class="mt-5 flex flex-col gap-2.5">
            <button 
              (click)="copyLink()"
              class="w-full py-3 px-4 rounded-xl bg-[#C65D3A] hover:bg-[#B24E2D] text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
              <span>{{ copied() ? 'Link Kopyalandı! ✓' : 'Menü Linkini Kopyala' }}</span>
            </button>

            <a 
              href="assets/qr/stand.html" 
              target="_blank"
              class="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-[#F3EBDD] text-[#2A180E] border border-[#D5C2B1] font-semibold text-xs transition-all flex items-center justify-center gap-2">
              <svg class="w-4 h-4 text-[#C65D3A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
              </svg>
              <span>Masa Standını Yazdır (A5 PDF)</span>
            </a>
          </div>

        </div>
      </div>
    }
  `
})
export class QrModalComponent implements OnInit {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  qrDataUrl = signal<string>('');
  copied = signal<boolean>(false);

  ngOnInit(): void {
    this.generateQr();
  }

  async generateQr(): Promise<void> {
    try {
      const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://menu-ui-mu.vercel.app';
      const url = await QRCode.toDataURL(currentUrl, {
        color: {
          dark: '#2A180E',
          light: '#FFFFFF'
        },
        width: 400,
        margin: 1,
        errorCorrectionLevel: 'H'
      });
      this.qrDataUrl.set(url);
    } catch (e) {
      console.error('QR code generation failed:', e);
    }
  }

  closeModal(): void {
    this.close.emit();
  }

  copyLink(): void {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2500);
    }
  }
}
