/**
 * Vanilla data export utilities.
 * No framework dependencies — can be used in vanilla JS, React, Vue, Angular, etc.
 *
 * Supports:
 * - CSV export
 * - Markdown export
 * - Plain text export
 * - Excel export (requires exceljs dynamic import)
 */

/**
 * Export object as CSV.
 *
 * @param {Object} data - object to export (values will be CSV-escaped)
 * @param {string[]} fields - field names to include
 *
 * @returns {string} CSV content (header + single row)
 *
 * @example
 * const csv = exportAsCSV({ id: 'ACC-001', title: 'Button' }, ['id', 'title'])
 * // "id","title"\n"ACC-001","Button"
 */
export function exportAsCSV(data, fields) {
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
  const header = fields.join(',')
  const row = fields.map((f) => esc(data[f])).join(',')
  return `${header}\n${row}`
}

/**
 * Export object as Markdown.
 *
 * @param {Object} data - object to export
 * @param {Object} format - format specification:
 *   { title?: string, sections?: { [key]: string } }
 *   sections map field names to markdown section headings
 *
 * @returns {string} Markdown content
 *
 * @example
 * const md = exportAsMarkdown(
 *   { title: 'Button', desc: 'No label', fix: 'Add aria-label' },
 *   {
 *     title: 'title',
 *     sections: { desc: 'Description', fix: 'Suggested Fix' }
 *   }
 * )
 */
export function exportAsMarkdown(data, { title, sections = {} } = {}) {
  const lines = []
  if (title && data[title]) {
    lines.push(`# ${data[title]}`)
    lines.push('')
  }

  for (const [field, heading] of Object.entries(sections)) {
    if (data[field]) {
      lines.push(`## ${heading}`)
      lines.push('')
      lines.push(data[field])
      lines.push('')
    }
  }

  return lines.join('\n').trim()
}

/**
 * Export object as plain text.
 *
 * @param {Object} data - object to export
 * @param {Object} format - format specification:
 *   { title?: string, fields?: string[], separator?: string }
 *   separator is line prefix for each field (default: '')
 *
 * @returns {string} Plain text content
 *
 * @example
 * const txt = exportAsText(
 *   { id: 'ACC-001', title: 'Button', desc: 'No label' },
 *   { title: 'title', fields: ['id', 'title', 'desc'] }
 * )
 */
export function exportAsText(data, { title, fields = [], separator = '' } = {}) {
  const lines = []
  if (title && data[title]) {
    lines.push(data[title])
    const bar = '─'.repeat(Math.min(data[title].length, 60))
    lines.push(bar)
    lines.push('')
  }

  for (const field of fields) {
    if (data[field]) {
      const label = field.charAt(0).toUpperCase() + field.slice(1)
      lines.push(`${label}:${separator}`)
      lines.push(data[field])
      lines.push('')
    }
  }

  return lines.join('\n').trim()
}

/**
 * Trigger browser download of content as a file.
 *
 * @param {string} content - file content
 * @param {string} filename - filename (with extension)
 * @param {string} mimeType - MIME type (e.g., 'text/plain', 'text/csv')
 *
 * @example
 * downloadFile('id,title\n"ACC-001","Button"', 'entry.csv', 'text/csv')
 */
export function downloadFile(content, filename, mimeType = 'text/plain') {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/**
 * Trigger browser download of Excel file (requires exceljs).
 *
 * Dynamically imports exceljs, so no hard dependency. Fails gracefully if not available.
 *
 * @param {Object} data - object to export
 * @param {string[]} fields - field names to include
 * @param {string} filename - filename without extension (will add .xlsx)
 * @param {string} sheetName - worksheet name (default: 'Sheet')
 *
 * @example
 * await downloadExcel({ id: 'ACC-001', title: 'Button' }, ['id', 'title'], 'entry', 'Data')
 */
export async function downloadExcel(data, fields, filename, sheetName = 'Sheet') {
  try {
    const { default: ExcelJS } = await import('exceljs')
    const wb = new ExcelJS.Workbook()
    const ws = wb.addWorksheet(sheetName)
    ws.columns = fields.map((f) => ({ header: f, key: f }))
    ws.addRow(Object.fromEntries(fields.map((f) => [f, data[f] ?? ''])))
    const buf = await wb.xlsx.writeBuffer()
    const blob = new Blob([buf], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}.xlsx`
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (err) {
    console.error('Failed to export Excel: exceljs not available or error occurred', err)
    throw err
  }
}
