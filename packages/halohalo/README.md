# @ulam/halohalo

AI service adapters, model configuration, and provider abstraction. Vanilla core with a React hooks adapter.

Named for halo-halo, the Filipino shaved ice dessert: a mix of many things that somehow works together.

## The ulam framework

```text
ulam
├── @ulam/halohalo     mixed   : AI provider adapters  ← you are here
├── @ulam/taho         warm    : ARIA live region announcer
├── @ulam/sili         hot     : focus management, overlays, routing
├── @ulam/calamansi    sour    : i18n, hooks, utilities, logic
├── @ulam/ube          sweet   : React UI components, theming
└── @ulam/sawsawan     sauce   : wires the above together
```

## Install

```bash
npm install @ulam/halohalo
```

Peer dependencies: `fuse.js >= 7` (for search). Framework adapters add `react >= 18`, `vue >= 3`, or `@angular/core >= 17` as needed.

## Supported providers

- Anthropic (Claude)
- OpenAI (GPT)
- Google (Gemini)

Bring your own API key. Keys stay in the browser via localStorage and are sent directly to the provider, never to a server.

## Usage

### Initialize

```js
import { initApiKeys, initModels, getAiProvider } from '@ulam/halohalo'

initApiKeys({ anthropic: 'sk-ant-...', openai: 'sk-...' })
initModels({ anthropic: 'claude-sonnet-4-6', openai: 'gpt-4o' })

const provider = getAiProvider() // 'anthropic' | 'openai' | 'google'
```

### Call a provider

```js
import { createCompletion } from '@ulam/halohalo'

const result = await createCompletion({
  prompt: 'Rewrite this finding for a mobile context.',
  systemPrompt: 'You are an accessibility audit assistant.',
})
```

### Anthropic with tool use

```js
import { callAnthropicWithTools } from '@ulam/halohalo'

const result = await callAnthropicWithTools({
  messages,
  tools,
  system: 'You are an accessibility audit assistant.',
})
```

### Agentic mode

Agentic mode uses tool calling to search the corpus for similar past revisions before rewriting, matching the tone and depth of established work.

```js
import { getAgenticRefinement } from '@ulam/halohalo'

const revised = await getAgenticRefinement({
  finding,
  notes: 'This is specific to mobile, element is a tooltip',
})
```

### React hooks adapter

```jsx
import { useProviderConfig, useCompletion } from '@ulam/halohalo/react'

function AISettings() {
  const { provider, model, setProvider } = useProviderConfig()
  const { complete, loading } = useCompletion()

  return (
    <button onClick={() => complete('Rewrite this for mobile.')}>
      {loading ? 'Revising...' : 'Rewrite'}
    </button>
  )
}
```

### Vue composables adapter

`@ulam/halohalo/vue` provides composables that wrap the vanilla `createCompletion` and `createProviderConfig` with Vue reactivity. Loading and animating state are `readonly` refs that update as the completion runs.

```js
import { useCompletion, useProviderConfig } from '@ulam/halohalo/vue'
import { onUnmounted } from 'vue'

// In setup()
const { loading, animating, complete, cancel, cleanup } = useCompletion()
onUnmounted(cleanup)

// loading.value and animating.value are reactive
await complete({ prompt: 'Rewrite this for mobile.' })
```

`useProviderConfig()` returns reactive refs for `provider`, `models`, and `mode`, plus all setter functions from the vanilla config store.

```js
const { provider, setProvider } = useProviderConfig()
// provider.value is reactive
setProvider('openai')
```

Both composables return a `cleanup` function. Call it in `onUnmounted()` if the composable is used inside a component. For app-level use outside a component, cleanup is optional.

### Angular services adapter

`@ulam/halohalo/angular` provides two injectable services backed by Angular signals.

**`CompletionService`** is not `providedIn: 'root'`. Each injection creates a separate completion instance with its own loading state. Provide it at the component level for scoped instances, or at the application level for a shared one.

```ts
import { CompletionService, ProviderConfigService, provideHalohalo } from '@ulam/halohalo/angular'

// Application root (shared singleton):
bootstrapApplication(AppComponent, {
  providers: [provideHalohalo()]
})

// Or component-level (scoped per component):
@Component({
  providers: [CompletionService],
  template: `
    <button (click)="rewrite()" [disabled]="completion.loading()">
      {{ completion.loading() ? 'Revising...' : 'Rewrite' }}
    </button>
  `
})
export class RewriteButtonComponent {
  completion = inject(CompletionService)

  async rewrite() {
    await this.completion.complete({ prompt: 'Rewrite for mobile.' })
  }
}
```

`completion.loading()` and `completion.animating()` are Angular `computed` signals that work directly in templates and in `effect()` calls.

**`ProviderConfigService`** is `providedIn: 'root'`, giving you one config store for the whole app.

```ts
@Component({ ... })
export class SettingsComponent {
  providerConfig = inject(ProviderConfigService)

  // In template:
  // {{ providerConfig.provider() }}
  // (click)="providerConfig.setProvider('openai')"
}
```

## Design

**Bring your own key.** No proxy, no server, no account. API keys are stored in localStorage and sent directly to the provider.

**Provider-agnostic core.** `createCompletion` works the same regardless of which provider is active. Switch providers without changing call sites.

**Vanilla-first.** The core has no framework dependency. Import from `/react`, `/vue`, or `/angular` only when you need framework reactivity.

## Subpath exports

| Import | Contents |
| ------ | -------- |
| `@ulam/halohalo` | Vanilla core: `createCompletion`, `createProviderConfig`, `callProvider`, `callAnthropicWithTools`, `getAgenticRefinement`, `searchItems`, `makeSearchTool`, and more |
| `@ulam/halohalo/react` | `useCompletion`, `useProviderConfig` |
| `@ulam/halohalo/vue` | `useCompletion`, `useProviderConfig` |
| `@ulam/halohalo/angular` | `CompletionService`, `ProviderConfigService`, `provideHalohalo` |

## License

MIT
