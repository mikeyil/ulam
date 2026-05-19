// @ulam/ube/remix — Framework-agnostic adapter for Remix 3+
// Exports vanilla web components and utilities (no React dependency for core features)

// Data export utilities (vanilla core, zero dependencies)
export { exportAsCSV, exportAsMarkdown, exportAsText, downloadFile, downloadExcel } from '../core/exportData.js'

// React hooks for Remix React routes
export { useExport } from '../react/hooks/useExport.js'

// Web components
export {
  UbeButtonText,
  UbeButtonIcon,
  UbeButtonBack,
  UbeLinkBtnStyled,
  UbeLinkSkipTo,
  UbeFormControlRadio,
  UbeFormControlCheckbox,
  UbeFormControlSelect,
  UbeFormInputWithClear,
  UbeFormInputSearch,
  UbeBadge,
  UbeInfoBox,
  UbeIconExternalLink,
  UbeFormControlToggle,
  UbePanelFormControls,
  UbeFadeTransition,
  UbeFormControlRadioChip,
  UbeFormControlRadioChipGroup,
  UbeElement,
} from '../core/index.js'
