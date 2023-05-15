import { AfterViewInit, Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: 'img[checkImg]',
  standalone: true
})
export class CheckImageDirective implements AfterViewInit, OnChanges {

  @Input() src: string  = '';

  constructor(private imageRef: ElementRef) {
  }

  ngAfterViewInit() {
    this.newImg(this.src)
  }

  ngOnChanges(changes: SimpleChanges) {
    this.newImg(this.src)
  }

  private newImg(src: string) {
    const img = new Image();
    img.onload = () => {
      this.setImage(src);
    }
    img.onerror = () => {
      this.setImage('/assets/image_not_supported.png')
    }

    img.src = src
  }

  private setImage(src: string) {
    this.imageRef.nativeElement.setAttribute('src', src);
  }
}
