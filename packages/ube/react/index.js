// @ulam/ube/react — React adapter layer
// Drop-in replacement for old @ulam/ube import path

import './ui.css'

export { default as ButtonText } from './ButtonText.jsx'

// Other component adapters will be added as they're ported
export { announce } from '@ulam/taho'
export { Announcer } from '@ulam/taho/react'
export { applyTheme, useThemeManager } from '../theme.js'
