/**
 * @ulam/halohalo/angular: Angular adapter
 *
 * Injectable services wrapping the vanilla halohalo core with Angular signal
 * reactivity. Provide once at the application root via provideHalohalo().
 */
import { Injectable, signal, computed } from '@angular/core'
import { createCompletion } from './createCompletion.js'
import { createProviderConfig } from './createProviderConfig.js'

/**
 * Service for AI completions. Each inject() call gets its own completion
 * instance; loading/animating state is per-instance.
 *
 * Usage:
 *   private completion = inject(CompletionService)
 *
 *   await this.completion.complete({ prompt: 'Rewrite for mobile.' })
 *   // this.completion.loading() is true while running
 */
@Injectable()
export class CompletionService {
  #instance = createCompletion()
  #loading = signal(false)
  #animating = signal(false)

  loading = computed(() => this.#loading())
  animating = computed(() => this.#animating())

  constructor() {
    this.#instance.subscribe(({ loading, animating }) => {
      this.#loading.set(loading)
      this.#animating.set(animating)
    })
  }

  complete(options) {
    return this.#instance.complete(options)
  }

  cancel() {
    this.#instance.cancel()
  }

  ngOnDestroy() {
    this.#instance.cancel()
  }
}

/**
 * Service for AI provider and model configuration. One config store per application.
 *
 * Usage:
 *   private providerConfig = inject(ProviderConfigService)
 *
 *   this.providerConfig.setProvider('openai')
 *   const current = this.providerConfig.provider()   // Signal<string>
 */
@Injectable({ providedIn: 'root' })
export class ProviderConfigService {
  #config = createProviderConfig()
  #provider = signal(this.#config.provider)
  #models = signal(this.#config.models)
  #mode = signal(this.#config.mode)

  provider = computed(() => this.#provider())
  models = computed(() => this.#models())
  mode = computed(() => this.#mode())
  providers = this.#config.providers

  constructor() {
    this.#config.subscribe(() => {
      this.#provider.set(this.#config.provider)
      this.#models.set(this.#config.models)
      this.#mode.set(this.#config.mode)
    })
  }

  setProvider(id) { this.#config.setProvider(id) }
  setModel(pid, mid) { this.#config.setModel(pid, mid) }
  setMode(v) { this.#config.setMode(v) }
  setKey(pid, v) { return this.#config.setKey(pid, v) }
  getKey(pid) { return this.#config.getKey(pid) }
  getModel(pid) { return this.#config.getModel(pid) }
  getLabel(pid) { return this.#config.getLabel(pid) }
}

/**
 * Standalone provider function. Use in bootstrapApplication() or as a
 * component-level provider when you need scoped completion instances.
 *
 * App-level (shared singleton):
 *   bootstrapApplication(AppComponent, {
 *     providers: [provideHalohalo()]
 *   })
 *
 * Component-level (scoped instance):
 *   @Component({ providers: [CompletionService] })
 */
export function provideHalohalo() {
  return [ProviderConfigService, CompletionService]
}
