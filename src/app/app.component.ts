import { Component, HostListener, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SliderFace } from './slidesinterface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('scrollAnimation', [
      state('section1', style({})),
      state('section2', style({})),
      state('section3', style({})),
      state('section4', style({})),
      state('section5', style({})),
      state('section6', style({})),
      transition('* => *', animate('0.5s')),
    ]),
  ],
  
  
})
export class AppComponent  {
  title = 'reactive-forms';

  animationState = 'section1';
  translateValue: string | undefined;
  canAnimate = true;

  @HostListener('window:scroll', [])
  onScroll() {
    if (this.canAnimate) {
      const scrollPosition = window.scrollY;

      if (scrollPosition >= 500 && scrollPosition < 1000) {
        this.animationState = 'section2';
      } else if (scrollPosition >= 1000 && scrollPosition < 1500) {
        this.animationState = 'section3';
      } else if (scrollPosition >= 1500 && scrollPosition < 2000) {
        this.animationState = 'section4';
      } else if (scrollPosition >= 2000 && scrollPosition < 2500) {
        this.animationState = 'section5';
      } else if (scrollPosition >= 2500) {
        this.animationState = 'section6';
        this.canAnimate = false;  
      }
    }
  }
  slides:  SliderFace[] = [
    { url: '../assets/shooting 1.jpg', title: 'beach' },
    { url: '../assets/shooting 1.jpg', title: 'boat' },
    { url: '../assets/shooting 1.jpg', title: 'forest' },
    { url: '../assets/shooting 1.jpg', title: 'city' },
    { url: '../assets/shooting 1.jpg', title: 'italy' },
  ];
  
  currentIndex: number = 0;
  timeoutId?: number;

  ngOnInit(): void {
    this.resetTimer();
  }
  ngOnDestroy() {
    window.clearTimeout(this.timeoutId);
  }
  resetTimer() {
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
    }
    this.timeoutId = window.setTimeout(() => this.goToNext(), 3000);
  }

  goToPrevious(): void {
    const isFirstSlide = this.currentIndex === 0;
    const newIndex = isFirstSlide
      ? this.slides.length - 1
      : this.currentIndex - 1;

    this.resetTimer();
    this.currentIndex = newIndex;
  }

  goToNext(): void {
    const isLastSlide = this.currentIndex === this.slides.length - 1;
    const newIndex = isLastSlide ? 0 : this.currentIndex + 1;

    this.resetTimer();
    this.currentIndex = newIndex;
  }

  goToSlide(slideIndex: number): void {
    this.resetTimer();
    this.currentIndex = slideIndex;
  }

  getCurrentSlideUrl() {
    return `url('${this.slides[this.currentIndex].url}')`;
  }
}
