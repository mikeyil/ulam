import { useRef, useLayoutEffect } from 'react'
import { snapshotFlipPositions, animateFlipList } from '../../core/flipAnimation.js'

/**
 * React hook for FLIP animation of list reordering.
 * Smoothly animates items when their order changes without requiring explicit animation triggers.
 *
 * Call snapshotPositions() just before a re-sort, then the hook automatically
 * animates items from their old positions to their new ones via useLayoutEffect.
 *
 * Items must have a data-flip-id attribute matching a stable identity (e.g. entry.id).
 * Items currently animating out (opacity: 0 via other classes) are skipped.
 *
 * @returns {Object} { listRef, snapshotPositions }
 *   listRef          — React ref to attach to the list container <ul>
 *   snapshotPositions — function() to call before triggering sort/reorder
 *
 * @example
 * const { listRef, snapshotPositions } = useFlipList()
 * const handleSort = () => {
 *   snapshotPositions()  // capture current positions
 *   setResults(sorted)   // trigger re-render with new order
 *   // hook automatically animates items to new positions
 * }
 * return <ul ref={listRef}>{items}</ul>
 */
export function useFlipList() {
  const listRef = useRef(null)
  const snapshotRef = useRef(null)

  function snapshotPositions() {
    snapshotRef.current = snapshotFlipPositions(listRef.current)
  }

  useLayoutEffect(() => {
    const snapshot = snapshotRef.current
    if (!snapshot) return
    snapshotRef.current = null

    animateFlipList(listRef.current, snapshot)
  })

  return { listRef, snapshotPositions }
}
