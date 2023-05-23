import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  activeItem = 0;
  activeToggle: boolean = false;
  
  @ViewChild('toggleEl') toggleEl!: ElementRef;

  constructor(private renderer: Renderer2) {}

  toggleActive() {
    this.activeToggle = !this.activeToggle;
    const el = this.toggleEl.nativeElement;
    const isActive = el.classList.contains('active');

    if (isActive) {
      this.renderer.removeClass(el, 'active');
    } else {
      this.renderer.addClass(el, 'active');
    }
  }
  
  setActive(index: number) {
    this.activeItem = index;
  }
}
