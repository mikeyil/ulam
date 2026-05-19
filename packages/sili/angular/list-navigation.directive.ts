import { Directive, ElementRef, Input, NgZone, OnInit, OnDestroy } from '@angular/core'

/**
 * Angular standalone directive for keyboard navigation in focusable list items.
 *
 * Provides vim-style j/k navigation, custom action shortcuts, and smart context awareness.
 * Use on <ul> or <ol> elements.
 *
 * Usage:
 *   @Component({
 *     selector: 'app-results',
 *     imports: [ListNavigationDirective],
 *     template: `
 *       <ul [appListNavigation]="config">
 *         <li *ngFor="let item of items" [attr.data-list-id]="item.id" tabindex="0">
 *           {{ item.title }}
 *         </li>
 *       </ul>
 *     `
 *   })
 *   export class ResultsComponent {
 *     items = [...]
 *     config: ListNavigationConfig = {
 *       commands: {
 *         'j': () => this.focusNext(),
 *         'k': () => this.focusPrev(),
 *         's': () => this.toggleStar(),
 *       },
 *       skipWhenFocusedOn: 'input[type="search"]'
 *     }
 *   }
 */
export interface ListNavigationConfig {
  commands?: Record<string, () => void>
  skipWhenFocusedOn?: string
  itemIdSelector?: string // data attribute for finding items (default: data-list-id)
}

@Directive({
  selector: '[appListNavigation]',
  standalone: true,
})
export class ListNavigationDirective implements OnInit, OnDestroy {
  @Input() appListNavigation: ListNavigationConfig = {}

  private cleanup?: () => void

  constructor(
    private el: ElementRef<HTMLElement>,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    const config = this.appListNavigation || {}
    const commands = config.commands || {}
    const skipWhenFocusedOn = config.skipWhenFocusedOn
    const itemIdSelector = config.itemIdSelector || '[data-list-id]'

    const handleKeyDown = (e: KeyboardEvent) => {
      const focused = document.activeElement as HTMLElement
      if (!focused) return

      // Skip if typing in excluded element
      if (skipWhenFocusedOn && focused.matches(skipWhenFocusedOn)) return

      // Find focused list item
      const listItem = focused.closest(itemIdSelector)
      if (!listItem || !this.el.nativeElement.contains(listItem)) return

      const keyName = e.key.toLowerCase()
      const handler = commands[keyName]

      if (!handler) {
        // Check for Shift+Arrow variants
        if (e.shiftKey && (e.key === 'ArrowUp' || e.key === '↑')) {
          const shiftUpHandler = commands['Shift+ArrowUp']
          if (shiftUpHandler) {
            e.preventDefault()
            shiftUpHandler()
          }
        } else if (e.shiftKey && (e.key === 'ArrowDown' || e.key === '↓')) {
          const shiftDownHandler = commands['Shift+ArrowDown']
          if (shiftDownHandler) {
            e.preventDefault()
            shiftDownHandler()
          }
        }
        return
      }

      e.preventDefault()
      handler()
    }

    // Run outside Angular zone to avoid triggering change detection on every keydown
    this.ngZone.runOutsideAngular(() => {
      this.el.nativeElement.addEventListener('keydown', handleKeyDown)
      this.cleanup = () => this.el.nativeElement.removeEventListener('keydown', handleKeyDown)
    })
  }

  ngOnDestroy() {
    this.cleanup?.()
  }
}
