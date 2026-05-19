import { useEffect, useRef } from 'react'

/**
 * Moves focus to `ref.current` whenever `page` changes, but NOT on initial mount.
 * Use inside paginated overlays so keyboard/screen reader users land at the top
 * of new page content when pagination occurs.
 *
 * @param {React.RefObject} ref   - heading or top-of-page element to focus
 * @param {*}               page  - current page identifier (any value that changes on pagination)
 *
 * @example
 * const [page, setPage] = useState(1)
 * const headingRef = useRef(null)
 * usePaginationFocus(headingRef, page)
 *
 * return (
 *   <>
 *     <h2 ref={headingRef} tabIndex="-1">Results for page</h2>
 *   </>
 * )
 */
export function usePaginationFocus(ref, page) {
  const isMountRef = useRef(true)

  useEffect(() => {
    if (isMountRef.current) {
      isMountRef.current = false
      return
    }

    ref.current?.focus()
  }, [page, ref])
}
