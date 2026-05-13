# @ulam/halohalo

AI service adapters, model configuration, and provider abstraction. Vanilla core with a React hooks adapter.

Named for halo-halo, the Filipino shaved ice dessert: a mix of many things that somehow works together.

## Packages

Halohalo is one of four ulam packages:

```text
ulam
├── @ulam/ube          sweet  : UI, components, CSS, theming, router, announce
├── @ulam/calamansi    sour   : i18n, hooks, utilities, logic
├── @ulam/halohalo     mixed  : AI provider adapters  ← you are here
└── @ulam/sawsawan     bridge : wires the three together
```

## Install

```bash
npm install @ulam/halohalo
```

Peer dependencies: `fuse.js >= 7` (for search), `react >= 18` (for hooks adapter).

## Supported providers

- **Anthropic** (Claude)
- **OpenAI** (GPT)
- **Google** (Gemini)

Bring your own API key. Keys stay in the browser (localStorage) and are sent directly to the provider -- never to a server.

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

### Agentic mode (search + rewrite)

```js
import { getAgenticRefinement } from '@ulam/halohalo'

const revised = await getAgenticRefinement({
  finding,
  notes: 'This is specific to mobile, element is a tooltip',
})
```

Agentic mode uses tool calling to search the corpus for similar past revisions before rewriting, matching the tone and depth of established work.

### React hooks

```jsx
import { useProviderConfig, useCompletion } from '@ulam/halohalo/react'

function AISettings() {
  const { provider, model, setProvider } = useProviderConfig()
  const { complete, loading, error } = useCompletion()

  return (
    <button onClick={() => complete('Rewrite this for mobile.')}>
      {loading ? 'Revising...' : 'Rewrite'}
    </button>
  )
}
```

## Design

**Bring your own key.** No proxy, no server, no account. API keys are stored in localStorage and sent directly to the provider.

**Provider-agnostic core.** `createCompletion` works the same regardless of which provider is active. Switch providers without changing call sites.

**Vanilla-first.** The core has no React dependency. Import from `@ulam/halohalo/react` only when you need hooks.

## License

MIT
