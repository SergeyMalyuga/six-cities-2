import {Directive, ElementRef, EventEmitter, HostListener, inject, Output} from '@angular/core';

@Directive({
  selector: '[appToggleFavorite]',
})
export class ToggleFavoriteDirective {
  @Output() favoriteToggled: EventEmitter<void> = new EventEmitter<void>();
  private elementRef: ElementRef = inject(ElementRef);

  @HostListener('click')
  onClick() {
    const target = this.elementRef.nativeElement as HTMLElement;
    target.classList.toggle('place-card__bookmark-button--active');
    this.favoriteToggled.emit();
  }
}
