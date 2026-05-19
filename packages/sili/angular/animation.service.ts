import { Injectable } from '@angular/core'
import { snapshotFlipPositions, animateFlipList } from '../core/flipAnimation.js'

/**
 * Angular service for FLIP animations on list reordering.
 *
 * Usage:
 *   constructor(private animation: AnimationService) {}
 *
 *   handleSort() {
 *     this.animation.snapshotFlipPositions(this.listEl.nativeElement)
 *     this.results = newSort  // trigger change detection
 *     // Animation happens automatically on next change detection cycle
 *   }
 */
@Injectable({ providedIn: 'root' })
export class AnimationService {
  private snapshot: Record<string, number> = {}

  /**
   * Snapshot current positions of list items before a re-sort.
   * Items must have data-flip-id attribute.
   */
  snapshotFlipPositions(listEl: Element): void {
    this.snapshot = snapshotFlipPositions(listEl)
  }

  /**
   * Animate list items from old positions to new positions using FLIP.
   * Call this after change detection has run (typically in ngAfterViewInit or after manual CD).
   */
  animateFlipList(listEl: Element, opts?: { duration?: number; easing?: string }): void {
    animateFlipList(listEl, this.snapshot, opts)
    this.snapshot = {}
  }

  /**
   * Convenience method: snapshot → (consumer triggers change) → animate
   * Use when you want to snapshot and animate in one call.
   */
  snapshotAndAnimate(listEl: Element, opts?: { duration?: number; easing?: string }): () => void {
    this.snapshotFlipPositions(listEl)
    return () => this.animateFlipList(listEl, opts)
  }
}
