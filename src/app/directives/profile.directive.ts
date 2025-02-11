import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appProfile]',
})
export class ProfileDirective {
  @Output()
  public clickOutside = new EventEmitter<MouseEvent>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }
    const clickInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickInside) {
      this.clickOutside.emit(event);
    }
  }
}