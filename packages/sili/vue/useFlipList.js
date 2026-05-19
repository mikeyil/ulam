import { ref, onMounted, onUpdated } from 'vue'
import { snapshotFlipPositions, animateFlipList } from '../core/flipAnimation.js'

/**
 * Vue composable for FLIP animation of list reordering.
 * Smoothly animates items when their order changes without requiring explicit animation triggers.
 *
 * Call snapshotPositions() just before a state change that reorders items, then the composable
 * automatically animates items from their old positions to their new ones via onUpdated.
 *
 * Items must have a data-flip-id attribute matching a stable identity (e.g. item.id).
 *
 * @returns {Object} { listRef, snapshotPositions }
 *   listRef          — Vue ref to attach to the list container <ul>
 *   snapshotPositions — function() to call before triggering sort/reorder
 *
 * @example
 * import { useFlipList } from '@ulam/sili/vue'
 * import { ref } from 'vue'
 *
 * export default {
 *   setup() {
 *     const { listRef, snapshotPositions } = useFlipList()
 *     const results = ref([])
 *
 *     const handleSort = (newSort) => {
 *       snapshotPositions()  // capture current positions
 *       results.value = sorted  // trigger update
 *       // composable automatically animates items to new positions
 *     }
 *
 *     return { listRef, results, handleSort }
 *   }
 * }
 *
 * <ul :ref="listRef">
 *   <li v-for="r in results" :key="r.id" :data-flip-id="r.id">
 *     {{ r.title }}
 *   </li>
 * </ul>
 */
export function useFlipList() {
  const listRef = ref(null)
  const snapshotRef = ref(null)

  function snapshotPositions() {
    snapshotRef.value = snapshotFlipPositions(listRef.value)
  }

  onUpdated(() => {
    const snapshot = snapshotRef.value
    if (!snapshot) return
    snapshotRef.value = null
    animateFlipList(listRef.value, snapshot)
  })

  return { listRef, snapshotPositions }
}
