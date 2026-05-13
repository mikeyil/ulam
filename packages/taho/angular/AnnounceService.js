import { Injectable } from '@angular/core'
import { announce, clearAnnouncements } from '../core/index.js'

/**
 * Injectable service wrapping the vanilla taho announce() function.
 *
 * AnnounceService is providedIn: 'root'. No module or explicit provider needed.
 * Inject it anywhere announcements are needed.
 *
 * Usage:
 *   announcer = inject(AnnounceService)
 *   this.announcer.announce('Settings: Saved')
 *   this.announcer.announce('Invalid key', { priority: 'assertive' })
 *
 * Note: this file uses TypeScript decorator syntax (@Injectable). Angular projects
 * are always compiled with TypeScript, so this is safe to import in any Angular app.
 */
@Injectable({ providedIn: 'root' })
export class AnnounceService {
  announce(message, options) {
    announce(message, options)
  }

  clear() {
    clearAnnouncements()
  }
}
