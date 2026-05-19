import { AnnounceService } from './announce.service.ts'

/**
 * Standalone provider function for Angular 14+ standalone APIs.
 *
 * Usage in bootstrapApplication():
 *   bootstrapApplication(AppComponent, {
 *     providers: [provideAnnounce()]
 *   })
 *
 * Or in an NgModule:
 *   providers: [AnnounceService]
 */
export function provideAnnounce() {
  return [AnnounceService]
}
