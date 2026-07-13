import { Injectable } from '@angular/core';
import { Product } from '../model/product';

export interface ProductMeta {
  brand: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  isNew: boolean;
  isBestseller: boolean;
  hasFreeShipping: boolean;
  compatibleMakes: string[];
}

const FALLBACK_BRANDS = [
  'Akrapovič', 'Alpinestars', 'Arrow', 'Brembo', 'Castrol', 'Dainese',
  'DID', 'Galfer', 'K&N', 'Michelin', 'Motul', 'Öhlins', 'Pirelli',
  'Rizoma', 'Shoei', 'Termignoni', 'Yuasa', 'Puig', 'SW-Motech', 'Givi',
];

const FALLBACK_MAKES = ['Honda', 'Yamaha', 'Kawasaki', 'Suzuki', 'BMW', 'Ducati', 'KTM', 'Triumph'];

@Injectable({ providedIn: 'root' })
export class ProductEnrichmentService {

  getMeta(product: Product): ProductMeta {
    const seed = product.productId;

    const brand = product.brand || FALLBACK_BRANDS[seed % FALLBACK_BRANDS.length];
    const stockCount = product.stockQuantity ?? (seed % 5 === 0 ? 0 : 3 + (seed % 47));
    const rating = product.rating ?? Math.min(5, Math.round((3.5 + (seed % 15) / 10) * 10) / 10);
    const reviewCount = product.reviewCount ?? (12 + (seed * 7) % 340);
    const compatibleMakes = this.parseMakes(product.compatibleMakes, seed);

    return {
      brand,
      rating,
      reviewCount,
      inStock: stockCount > 0,
      stockCount,
      isNew: seed % 7 === 0,
      isBestseller: seed % 5 === 0,
      hasFreeShipping: product.price >= 75,
      compatibleMakes,
    };
  }

  needsSizeSelector(categoryId: number): boolean {
    return [4, 8, 5, 10].includes(categoryId);
  }

  getSizeOptions(categoryId: number): string[] {
    if (categoryId === 5) return ['120/70-17', '180/55-17', '110/80-19', '150/60-17', '190/55-17'];
    if (categoryId === 4 || categoryId === 8) return ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    if (categoryId === 10) return ['S', 'M', 'L', 'Universal'];
    return ['S', 'M', 'L', 'XL'];
  }

  private parseMakes(raw: string | undefined, seed: number): string[] {
    if (raw) {
      return raw.split(',').map((m) => m.trim()).filter(Boolean);
    }
    const count = 2 + (seed % 4);
    return [...FALLBACK_MAKES].sort((a, b) =>
      (seed + a.charCodeAt(0)) % 10 - (seed + b.charCodeAt(0)) % 10
    ).slice(0, count);
  }
}
