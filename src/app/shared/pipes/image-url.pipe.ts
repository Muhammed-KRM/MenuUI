import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageUrl',
  standalone: true
})
export class ImageUrlPipe implements PipeTransform {
  transform(value: string | undefined | null): string {
    if (!value) return 'assets/images/placeholder.png';

    // Tam URL ise olduğu gibi döndür
    if (value.startsWith('http://') || value.startsWith('https://')) {
      return value;
    }

    // Yerel assets görseli ise
    return `assets/${value}`;
  }
}
