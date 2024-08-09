import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '../../model/product';

@Component({
  selector: 'app-body-list',
  templateUrl: './body-list.component.html',
  styleUrls: ['./body-list.component.scss']
})
export class BodyListComponent implements OnChanges {
  @Input() products: Product[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['products'] && this.products) {
      this.products.forEach(product => {
        if (product.image && product.image.data) {
          this.convertDataToImage(product.image.data, product);
        }
      });
    }
  }

  convertDataToImage(data: number[], product: Product) {
    const byteArray = new Uint8Array(data);
    const blob = new Blob([byteArray], { type: 'image/png' });
    const reader = new FileReader();
    
    reader.onload = (event: any) => {
      product.imageUrl = event.target.result;
      this.cdr.markForCheck();
    };
    
    reader.readAsDataURL(blob);
  }
}