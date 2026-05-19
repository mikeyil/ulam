import { useCallback } from 'react'
import { exportAsCSV, exportAsMarkdown, exportAsText, downloadFile, downloadExcel } from '../../core/exportData.js'

/**
 * React hook for data export functionality.
 *
 * Provides a simple interface to export data in multiple formats.
 *
 * @returns {Object} export methods
 *   { exportCSV, exportMarkdown, exportText, exportExcel }
 *
 * @example
 * const { exportCSV, exportMarkdown } = useExport()
 *
 * const handleExport = (format) => {
 *   if (format === 'csv') {
 *     exportCSV(entry, ['id', 'title', 'desc'], 'entry.csv')
 *   } else if (format === 'markdown') {
 *     exportMarkdown(entry, {
 *       title: 'title',
 *       sections: { desc: 'Description', fix: 'Suggested Fix' }
 *     }, 'entry.md')
 *   }
 * }
 */
export function useExport() {
  const exportCSV = useCallback((data, fields, filename = 'export.csv') => {
    const csv = exportAsCSV(data, fields)
    downloadFile(csv, filename, 'text/csv;charset=utf-8;')
  }, [])

  const exportMarkdown = useCallback((data, format, filename = 'export.md') => {
    const md = exportAsMarkdown(data, format)
    downloadFile(md, filename, 'text/markdown;charset=utf-8;')
  }, [])

  const exportText = useCallback((data, format, filename = 'export.txt') => {
    const txt = exportAsText(data, format)
    downloadFile(txt, filename, 'text/plain;charset=utf-8;')
  }, [])

  const exportExcel = useCallback(async (data, fields, filename = 'export', sheetName = 'Sheet') => {
    await downloadExcel(data, fields, filename, sheetName)
  }, [])

  return { exportCSV, exportMarkdown, exportText, exportExcel }
}
