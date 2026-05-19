# Internationalization Best Practices with @ulam/calamansi

Patterns for implementing robust, accessible, multilingual applications.

---

## Overview

This guide covers best practices for using **@ulam/calamansi** in production applications. It's informed by real-world implementation patterns from a11yfred, which serves 50+ languages with language-appropriate formatting, right-to-left support, and cross-language search.

---

## Language Organization

### Directory Structure

Store your locale data in a structured, scalable format:

```text
src/
└── locales/
    ├── en.json          # English (base locale, always kept current)
    ├── en-GB.json       # English (United Kingdom variant)
    ├── en-AU.json       # English (Australian variant)
    ├── es.json          # Spanish
    ├── fr.json          # French
    ├── de.json          # German
    ├── ja.json          # Japanese
    ├── zh.json          # Chinese (Simplified)
    ├── ar-PS.json       # Palestinian Arabic (RTL)
    ├── ug.json          # Uyghur (RTL)
    └── [... other languages]
```

### Naming Convention

Use **BCP 47 language tags** (standard for the web):

```text
en             # English (base language)
en-GB          # English (United Kingdom)
es-MX          # Spanish (Mexico)
zh-Hans        # Chinese (Simplified)
zh-Hant        # Chinese (Traditional)
pt-BR          # Portuguese (Brazil)
```

**Benefit**: Consistent across platforms. Tools, browsers, and APIs understand BCP 47 natively.

### Base Locale (English)

Always keep your **base locale (usually English) up-to-date first**:

```json
{
  "nav.home": "Home",
  "nav.about": "About",
  "settings.language": "Language",
  "button.save": "Save",
  "button.cancel": "Cancel",
  "error.notFound": "Not found"
}
```

**Then translate to other locales.** This prevents outdated strings in translations.

---

## Language-Appropriate Capitalization

Different languages have different conventions for title case. Don't apply one rule everywhere.

### English (en, en-GB, en-AU, en-IN, en-ZA)

Use **NYT-style title case**: Capitalize the first word, last word, and all major words (nouns, verbs, adjectives). Lowercase articles (a, the), prepositions, and conjunctions unless they're first/last.

```json
{
  "nav.home": "Home",
  "nav.settings": "Settings",
  "page.accessibility.guidelines": "Accessibility Guidelines",
  "button.goBack": "Go Back",
  "label.firstName": "First Name",
  "error.pageNotFound": "Page Not Found"
}
```

### Romance Languages (French, Spanish, Portuguese, Italian)

Use **sentence case**: Capitalize only the first word and proper nouns. This is grammatically correct in these languages.

```json
{
  "nav.home": "Accueil",
  "nav.settings": "Paramètres",
  "page.accessibility.guidelines": "Recommandations d'accessibilité",
  "button.goBack": "Retour",
  "label.firstName": "Prénom"
}
```

### Germanic Languages (German, Dutch, Swedish)

Use **sentence case** (similar to Romance, with some exceptions for German nouns, which are always capitalized in German).

```json
{
  "nav.home": "Startseite",
  "nav.settings": "Einstellungen",
  "button.goBack": "Zurück",
  "label.firstName": "Vorname"
}
```

### Slavic Languages (Polish, Czech, Russian)

Use **sentence case** unless the language convention specifies otherwise.

```json
{
  "nav.home": "Strona główna",
  "nav.settings": "Ustawienia",
  "button.goBack": "Wróć"
}
```

### East Asian Languages (Japanese, Chinese, Korean)

**No capitalization distinction** (these scripts don't have case). Leave as-is without translation concern for case.

```json
{
  "nav.home": "ホーム",
  "nav.settings": "設定",
  "button.goBack": "戻る"
}
```

### Arabic, Urdu, Uyghur, Tamil, Devanagari Scripts

**No capitalization distinction**. Apply sentence-level conventions if translating to Latin script equivalents, but the native script has no case concept.

```json
{
  "nav.home": "الرئيسية",
  "nav.settings": "الإعدادات",
  "button.goBack": "عودة"
}
```

### Summary Table

|Language|Convention|Example|
|---|---|---|
|English (en*)|NYT Title Case|"Accessibility Guidelines"|
|Romance (es, fr)|Sentence case|"Directrices de accesibilidad"|
|Germanic (de)|Sentence case|"Richtlinien zur Barrierefreiheit"|
|East Asian (ja, zh, ko)|N/A (no case)|"アクセシビリティガイドライン"|
|Arabic/Uyghur (ar, ug)|N/A (no case)|"إرشادات الوصول"|

---

## Right-to-Left (RTL) Language Support

### RTL Locales

These languages write and read from right-to-left:

- **Arabic** (ar, ar-AE, ar-SA, ar-PS, etc.)
- **Hebrew** (he)
- **Uyghur** (ug)
- **Persian** (fa)

### Setting Document Direction

When activating an RTL locale, update the HTML document:

```javascript
import { setLocale } from '@ulam/calamansi'

const RTL_LOCALES = ['ar', 'ar-AE', 'ar-SA', 'ar-PS', 'he', 'ug', 'fa']

export function handleLocaleChange(locale) {
  // Update document direction
  const isRTL = RTL_LOCALES.some(rtl => locale.startsWith(rtl))
  document.documentElement.dir = isRTL ? 'rtl' : 'ltr'

  // Update language attribute
  document.documentElement.lang = locale

  // Call calamansi to switch locale
  setLocale(locale)
}
```

### CSS-Driven RTL Styling

Use `[dir="rtl"]` attribute selectors in CSS. Co-locate RTL overrides with base styles:

```css
/* Base LTR styles */
.sidebar {
  margin-left: 16px;
  transform: translateX(-100%);
}

/* RTL overrides (co-located for maintainability) */
[dir="rtl"] .sidebar {
  margin-right: 16px;
  margin-left: 0;
  transform: translateX(100%);
}

/* Flexbox reversal for navigation */
.nav {
  display: flex;
  flex-direction: row;
  gap: 8px;
}

[dir="rtl"] .nav {
  flex-direction: row-reverse;
}

/* Icon rotation */
.back-button::before {
  content: '←';
}

[dir="rtl"] .back-button::before {
  content: '→';
}
```

### Logical Properties (Modern Approach)

Use CSS logical properties (margin-inline-start, margin-block-end) to avoid `[dir="rtl"]` duplication:

```css
.sidebar {
  margin-inline-start: 16px;  /* left in LTR, right in RTL */
  margin-block-end: 8px;       /* bottom (always) */
  inset-inline-start: 0;      /* left in LTR, right in RTL */
}

.nav {
  display: flex;
  gap: 8px;
  /* flex-direction defaults to row, respects document direction */
}
```

**Support**: Modern browsers (Chrome 78+, Firefox 63+, Safari 12.1+)

---

## Cross-Language Search

When using full-text search libraries (Fuse.js, Algolia), preserve searchable keywords in the base language alongside translations:

### Data Structure

```javascript
export const entries = [
  {
    id: 1,
    // English keywords (always searchable)
    title_en: 'Button',
    description_en: 'An interactive control that triggers an action',
    
    // Translated content (locale-specific)
    title_es: 'Botón',
    description_es: 'Un control interactivo que desencadena una acción',
    
    title_ja: 'ボタン',
    description_ja: 'アクションをトリガーするインタラクティブコントロール',
    
    title_ar: 'زر',
    description_ar: 'عنصر تحكم تفاعلي ينشئ إجراء',
  },
  // ... more entries
]
```

### Search Index Configuration

Configure Fuse.js to search English keywords regardless of active locale:

```javascript
import Fuse from 'fuse.js'

const fuseIndex = new Fuse(entries, {
  keys: [
    'title_en',           // Always searchable
    'description_en',     // Always searchable
    'title_es',           // Optional: locale-specific
    'title_ja',           // Optional: locale-specific
    'title_ar',           // Optional: locale-specific
  ],
  threshold: 0.3,
})

export function search(query) {
  return fuseIndex.search(query)
}
```

### UI Display with Locale

Display results in the active locale, even if search matched English keywords:

```javascript
import { useT } from '@ulam/calamansi/react'

export function SearchResults({ query }) {
  const t = useT()
  const locale = getCurrentLocale() // from context or hook

  const rawResults = search(query)
  const localeKey = `title_${locale}`

  return (
    <ul>
      {rawResults.map(result => (
        <li key={result.id}>
          {/* Display in active locale */}
          <h3>{result.item[localeKey]}</h3>
          <p>{result.item[`description_${locale}`]}</p>
        </li>
      ))}
    </ul>
  )
}
```

**Benefit**: Users can search in their native language (even if they don't know English terms), and they'll find results that have English keywords.

**Example**: A Japanese user searches "button" (typing English), finds entries with `title_en: 'Button'` and `title_ja: 'ボタン'`, and sees the Japanese title in results.

---

## Locale Fallback Chain

Configure sensible fallback chains so missing translations don't break the app:

```javascript
import { initI18n, setLocale } from '@ulam/calamansi'

const FALLBACK_CHAINS = {
  'en-GB': ['en-GB', 'en'],           // British English → English
  'en-AU': ['en-AU', 'en'],           // Australian English → English
  'pt-BR': ['pt-BR', 'pt', 'en'],     // Brazilian Portuguese → Portuguese → English
  'zh-TW': ['zh-TW', 'zh-Hans', 'en'], // Traditional Chinese → Simplified Chinese → English
}

export function initializeI18n() {
  const translations = {
    en: require('./locales/en.json'),
    'en-GB': require('./locales/en-GB.json'),
    es: require('./locales/es.json'),
    // ... load all locales
  }

  initI18n(translations)

  // Set fallback chains in calamansi (if supported)
  // This ensures en-GB falls back to en if a key is missing
}
```

---

## Format Strings with Variables

Use **named placeholders** for clarity and maintainability:

```json
{
  "greeting.personal": "Hello, {name}!",
  "notifications.itemsRemaining": "You have {count} items remaining",
  "messages.fileSize": "File: {filename} ({size} MB)"
}
```

### Usage

```javascript
import { getT } from '@ulam/calamansi'

const t = getT()

// Named placeholders
t('greeting.personal', { name: 'Alice' })
// → "Hello, Alice!"

t('notifications.itemsRemaining', { count: 5 })
// → "You have 5 items remaining"

t('messages.fileSize', { filename: 'document.pdf', size: 2.5 })
// → "File: document.pdf (2.5 MB)"
```

---

## Pluralization Rules

Calamansi doesn't include pluralization (by design—it's data-agnostic). Bring your own logic using `Intl.PluralRules`:

```javascript
import { getT } from '@ulam/calamansi'

export function pluralize(count, singularKey, pluralKey, locale) {
  const t = getT()
  const pluralRules = new Intl.PluralRules(locale)
  const form = pluralRules.select(count)

  if (form === 'one') {
    return t(singularKey, { count })
  } else {
    return t(pluralKey, { count })
  }
}

// Usage
pluralize(1, 'item.singular', 'item.plural', 'en')
// → "1 item"

pluralize(5, 'item.singular', 'item.plural', 'en')
// → "5 items"

pluralize(1, 'item.singular', 'item.plural', 'ru')
// → Correctly applies Russian pluralization rules (1, 2-4, 5+)
```

---

## Number and Date Formatting

Use native `Intl` APIs for locale-aware number and date formatting:

```javascript
export function formatNumber(value, locale) {
  return new Intl.NumberFormat(locale).format(value)
}

export function formatCurrency(value, locale, currency = 'USD') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value)
}

export function formatDate(date, locale, options = {}) {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  }).format(date)
}

// Usage
formatNumber(1234.56, 'de-DE')       // → "1.234,56"
formatCurrency(100, 'fr-FR', 'EUR')  // → "100,00 €"
formatDate(new Date(), 'ja-JP')      // → "2026年5月19日"
```

---

## Locale Preference Persistence

Use calamansi's `getPref` and `setPref` to persist locale choice:

```javascript
import { getPref, setPref } from '@ulam/calamansi'

export function initializeLocale() {
  // Get saved locale preference
  const savedLocale = getPref('locale')

  // Fall back to browser language or default
  const locale = savedLocale || navigator.language || 'en'

  return locale
}

export function saveLocalePreference(locale) {
  // Persists to localStorage
  setPref('locale', locale)
}
```

---

## Accessibility Considerations

### Language Attribute

Always set `lang` attribute on the HTML element:

```javascript
export function handleLocaleChange(locale) {
  document.documentElement.lang = locale
  // ... rest of locale switching logic
}
```

**Benefit**: Screen readers announce text with correct pronunciation.

### Direction Attribute

Set `dir` for RTL languages:

```javascript
const RTL_LOCALES = ['ar', 'he', 'ug', 'fa']
const isRTL = RTL_LOCALES.includes(locale)
document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
```

### Live Region Announcements

Use `@ulam/taho` to announce when locale changes:

```javascript
import { announce } from '@ulam/taho'
import { setLocale } from '@ulam/calamansi'

export function changeLocale(newLocale) {
  setLocale(newLocale)
  
  // Announce to screen readers
  const t = getT()
  announce(t('message.localeChanged', { locale: newLocale }))
}
```

### Color & Contrast

Ensure color contrast meets WCAG AA (4.5:1 for text) across all locales. Text length varies by language:

- English: baseline
- German: +20% (longer)
- Chinese/Japanese: -30% (more compact)

Design with expansion/contraction in mind:

```css
.label {
  max-width: 200px;
  overflow-wrap: break-word;  /* Handles long words in German */
  word-break: break-word;     /* Handles CJK line breaks */
}
```

---

## Testing i18n

### Test Coverage

- [ ] All locales load without errors
- [ ] Missing translation keys fall back to English
- [ ] RTL languages display correctly
- [ ] Locale preference persists to localStorage
- [ ] Search works across languages
- [ ] Screen readers announce locale changes
- [ ] Text expansion/contraction doesn't break layout
- [ ] Special characters display correctly (Unicode)

### Test Example

```javascript
import { setLocale, getT } from '@ulam/calamansi'

describe('i18n', () => {
  it('loads Japanese locale', () => {
    setLocale('ja')
    const t = getT()
    expect(t('nav.home')).toBe('ホーム')
  })

  it('falls back to English for missing key', () => {
    setLocale('fr')
    const t = getT()
    // If 'some.missing.key' doesn't exist in French,
    // falls back to English
    expect(t('some.missing.key')).toBeDefined()
  })

  it('sets document direction for RTL', () => {
    setLocale('ar')
    expect(document.documentElement.dir).toBe('rtl')
  })

  it('preserves search results across language change', () => {
    const results = search('button')
    setLocale('ja')
    const resultsAfter = search('button')
    expect(results).toEqual(resultsAfter)
  })
})
```

---

## Performance Considerations

### Lazy Load Locales

Don't load all 50+ locales upfront. Lazy-load on demand:

```javascript
export async function loadLocale(locale) {
  const module = await import(`./locales/${locale}.json`)
  return module.default
}
```

### Cache Translations

Cache loaded locales in memory to avoid repeated imports:

```javascript
const localeCache = {}

export async function getLocaleData(locale) {
  if (!localeCache[locale]) {
    localeCache[locale] = await loadLocale(locale)
  }
  return localeCache[locale]
}
```

### Minimize Search Index

If serving 50+ languages, consider indexing only:

- The active locale
- English (fallback)
- User's browser language (predicted)

---

## Real-World Example: a11yfred

a11yfred serves 50+ languages with:

```javascript
// App.jsx
import { useState } from 'react'
import { I18nProvider } from '@ulam/calamansi/react'
import { Announcer, announce } from '@ulam/taho/react'

function App() {
  const [locale, setLocale] = useState(
    getPref('locale') || navigator.language || 'en'
  )

  const handleLocaleChange = async (newLocale) => {
    const RTL = ['ar-PS', 'ug'].includes(newLocale)
    document.documentElement.dir = RTL ? 'rtl' : 'ltr'
    document.documentElement.lang = newLocale

    setLocale(newLocale)
    setPref('locale', newLocale)

    const t = getT()
    announce(t('message.languageChanged'))
  }

  return (
    <I18nProvider locale={locale}>
      <Announcer />
      <App content />
      <LanguagePicker onChange={handleLocaleChange} />
    </I18nProvider>
  )
}
```

---

## References

- [Unicode CLDR](http://cldr.unicode.org/) — Locale data standards
- [BCP 47](https://tools.ietf.org/html/bcp47) — Language tag specification
- [Intl API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) — Native formatting
- [WCAG Language](https://www.w3.org/WAI/WCAG21/Understanding/language-of-page.html) — Accessibility requirements
- [@ulam/calamansi](./README.md) — Core i18n package
- [CONSUMER-APP-GUIDE](../docs/CONSUMER-APP-GUIDE.md) — Component naming & organization
