import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from '../../core/services/menu.service';
import { Product } from '../../core/models/menu.model';
import { HeroHeaderComponent } from './components/hero-header/hero-header.component';
import { CategoryNavComponent } from './components/category-nav/category-nav.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductModalComponent } from './components/product-modal/product-modal.component';
import { QrModalComponent } from './components/qr-modal/qr-modal.component';
import { ImageUrlPipe } from '../../shared/pipes/image-url.pipe';

@Component({
  selector: 'app-client-menu',
  standalone: true,
  imports: [
    CommonModule,
    HeroHeaderComponent,
    CategoryNavComponent,
    ProductCardComponent,
    ProductModalComponent,
    QrModalComponent,
    ImageUrlPipe
  ],
  template: `
    <div class="min-h-screen bg-[#F7F1E3] flex flex-col selection:bg-[#C65D3A] selection:text-white">
      <!-- 1. Hero / Restoran Başlığı ve Canlı Arama -->
      <app-hero-header (openQrModal)="isQrModalOpen.set(true)" />

      <!-- 2. Sticky Kategori Navigasyon Barı -->
      <app-category-nav />

      <!-- 3. Ana Menü İçeriği -->
      <main class="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        
        <!-- Yükleniyor Durumu -->
        @if (menuService.isLoading()) {
          <div class="flex flex-col items-center justify-center py-24 text-[#725B4D]">
            <div class="w-12 h-12 border-4 border-[#C65D3A] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p class="text-sm font-semibold">Lezzetli menümüz yükleniyor...</p>
          </div>
        }

        <!-- Hata Durumu -->
        @else if (menuService.errorMessage()) {
          <div class="bg-red-50 border border-red-200 rounded-3xl p-8 text-center max-w-md mx-auto my-12">
            <div class="text-3xl mb-3">⚠️</div>
            <h3 class="font-bold text-[#3A2418] mb-2">Menü Yüklenemedi</h3>
            <p class="text-xs text-[#725B4D] mb-4">{{ menuService.errorMessage() }}</p>
            <button 
              (click)="menuService.loadMenu()"
              class="px-5 py-2.5 bg-[#3A2418] text-[#F7F1E3] rounded-xl font-bold text-xs hover:bg-[#2A180E] transition-colors cursor-pointer">
              Tekrar Dene
            </button>
          </div>
        }

        <!-- Kategoriler ve Ürünler Listesi -->
        @else {
          @if (menuService.filteredCategories().length === 0) {
            <div class="text-center py-20 text-[#725B4D]">
              <div class="text-4xl mb-3">🔍</div>
              <h3 class="font-bold text-lg text-[#3A2418] mb-1">Aradığınız lezzet bulunamadı</h3>
              <p class="text-xs">Lütfen farklı bir yemek veya kategori adı deneyin.</p>
            </div>
          }

          @for (category of menuService.filteredCategories(); track category.id) {
            <section [id]="'category-' + category.id" class="mb-12 scroll-mt-24">
              
              <!-- Kategori Başlığı -->
              <div class="flex items-center justify-between gap-3 mb-6 pb-3 border-b border-[#E3D7C1]">
                <div class="flex items-center gap-3 min-w-0">
                  @if (category.imageUrl) {
                    <img [src]="category.imageUrl | imageUrl" alt="" class="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover shadow-sm border border-white shrink-0" />
                  }
                  <h2 class="text-2xl sm:text-3xl font-extrabold text-[#3A2418] tracking-tight">
                    {{ category.name }}
                  </h2>
                </div>
                <span class="inline-flex items-center gap-1 text-xs font-extrabold px-3 py-1 rounded-full bg-[#3A2418]/10 text-[#3A2418] whitespace-nowrap shrink-0">
                  <span>{{ category.products ? category.products.length : 0 }}</span>
                  <span>çeşit</span>
                </span>
              </div>

              <!-- Ürünler Grid -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                @for (product of category.products || []; track product.id) {
                  <app-product-card 
                    [product]="product"
                    (detailClick)="onProductDetail($event)" />
                }
              </div>
            </section>
          }
        }
      </main>

      <!-- 4. Ürün Detay Modalı -->
      <app-product-modal />

      <!-- 5. QR Kod Modalı -->
      <app-qr-modal 
        [isOpen]="isQrModalOpen()" 
        (close)="isQrModalOpen.set(false)" />

      <!-- 6. Alt Bilgi (Footer) -->
      <footer class="bg-[#3A2418] text-[#EFE7D5]/70 py-8 border-t border-[#2A180E] text-center text-xs">
        <div class="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="text-center sm:text-left">
            <p class="font-bold text-[#F7F1E3] text-sm mb-0.5">{{ menuService.restaurantName() || 'Laden' }}</p>
            <p>Tüm hakları saklıdır. © 2026</p>
          </div>

          <button 
            (click)="isQrModalOpen.set(true)"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#F7F1E3] text-xs font-semibold transition-all">
            <svg class="w-4 h-4 text-[#DDA15E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>
            </svg>
            <span>Masa QR Kodunu Aç</span>
          </button>
        </div>
      </footer>
    </div>
  `
})
export class ClientMenuComponent implements OnInit {
  menuService = inject(MenuService);
  isQrModalOpen = signal<boolean>(false);

  ngOnInit(): void {
    this.menuService.loadMenu();
  }

  onProductDetail(product: Product): void {
    this.menuService.openProductDetail(product);
  }
}
