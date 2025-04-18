import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  @ViewChild('coin') coinRef!: ElementRef;

  isFlipping = false;
  result = '';
  headsCount = 0;
  tailsCount = 0;
  flipHistory: string[] = [];
  animationId: number | null = null;
  startTime: number = 0;
  flipDuration = 2000; // ms

  flipCoin() {
    if (this.isFlipping) return;

    this.isFlipping = true;
    this.result = '';
    this.flipDuration = 1500 + Math.random() * 1500; // 1.5-3 seconds
    this.startTime = performance.now();

    this.animateFlip();
  }

  animateFlip() {
    const elapsed = performance.now() - this.startTime;
    const progress = Math.min(elapsed / this.flipDuration, 1);

    // Easing function for smooth acceleration/deceleration
    const ease = this.easeInOutCubic(progress);

    // Calculate rotation (10-20 full rotations)
    const rotation = ease * 15 * 360;

    // Apply rotation
    this.coinRef.nativeElement.style.transform = `rotateY(${rotation}deg)`;

    if (progress < 1) {
      this.animationId = requestAnimationFrame(() => this.animateFlip());
    } else {
      this.finishFlip();
    }
  }

  finishFlip() {
    // Determine result (50/50 chance)
    const isHeads = Math.random() < 0.5;
    this.result = isHeads ? 'HEADS' : 'TAILS';

    // Update counters
    if (isHeads) this.headsCount++;
    else this.tailsCount++;

    // Update history
    this.flipHistory.unshift(this.result);
    if (this.flipHistory.length > 5) this.flipHistory.pop();

    this.isFlipping = false;

    // Snap to final position
    this.coinRef.nativeElement.style.transform =
      `rotateY(${isHeads ? 0 : 180}deg)`;
  }

  easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  ngOnDestroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}