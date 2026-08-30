import { Injectable, signal, computed } from '@angular/core';
import { Category, Product, MenuResponse } from '../models/menu.model';

@Injectable({ providedIn: 'root' })
export class MenuService {
  // Statik veri kaynağı: assets/data/menu.json
  private dataUrl = '/assets/data/menu.json';

  // Signals ile Reaktif Durum Yönetimi
  categories = signal<Category[]>([]);
  restaurantName = signal<string>('');
  restaurantLogo = signal<string | undefined>(undefined);
  currency = signal<string>('€');
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  activeCategoryId = signal<string | null>(null);
  selectedProductForModal = signal<Product | null>(null);
  searchQuery = signal<string>('');

  // Computed: Canlı arama filtresi uygulanmış kategoriler ve ürünler
  filteredCategories = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const all = this.categories();

    if (!query) return all;

    return all
      .map((cat: Category) => ({
        ...cat,
        products: (cat.products || []).filter((p: Product) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
        )
      }))
      .filter((cat: Category) => cat.products && cat.products.length > 0);
  });

  // Toplam ürün sayısı (Computed)
  totalProductsCount = computed(() => {
    return this.categories().reduce((sum: number, cat: Category) => sum + (cat.products ? cat.products.length : 0), 0);
  });

  loadMenu(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    fetch(this.dataUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json() as Promise<MenuResponse>;
      })
      .then((res: MenuResponse) => {
        this.categories.set(res.categories || []);
        this.restaurantName.set(res.restaurantName || '');
        this.restaurantLogo.set(res.restaurantLogo);
        this.currency.set(res.currency || '€');

        if (res.categories && res.categories.length > 0 && !this.activeCategoryId()) {
          this.activeCategoryId.set(res.categories[0].id);
        }
        this.isLoading.set(false);
      })
      .catch((err: unknown) => {
        console.error('Menü yüklenirken hata oluştu:', err);
        this.errorMessage.set('Menü yüklenemedi. Lütfen sayfayı yenileyin.');
        this.isLoading.set(false);
      });
  }

  setActiveCategory(categoryId: string): void {
    this.activeCategoryId.set(categoryId);
  }

  openProductDetail(product: Product): void {
    this.selectedProductForModal.set(product);
  }

  closeProductDetail(): void {
    this.selectedProductForModal.set(null);
  }
}
