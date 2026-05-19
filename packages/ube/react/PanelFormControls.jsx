import { Children, forwardRef } from 'react'
import '@ulam/ube/core'

/**
 * React adapter for <ube-panel-form-controls>
 * Layout wrapper for form control rows in panels.
 *
 * Props match the original PanelFormControls component API:
 *   label: string | ReactNode
 *   description: string (optional)
 *   block: boolean (default: false)
 *   disabled: boolean
 *   sm: boolean (compact size, inline only)
 *   children: ReactNode (form control + optional notes)
 *
 * Usage (same as before):
 *   <PanelFormControls label="Live search" description="Results appear as you type.">
 *     <FormControlToggle id="tog" checked={v} onChange={setV} />
 *   </PanelFormControls>
 *
 *   <PanelFormControls label="Theme" description="Choose scheme." block>
 *     <FormControlRadioChipGroup {...} />
 *   </PanelFormControls>
 */
const PanelFormControls = forwardRef(function PanelFormControls(
  {
    label,
    description,
    children,
    block = false,
    disabled = false,
    sm = false,
    ...rest
  },
  ref
) {
  const rowClass = [
    block ? 'panel-group' : 'panel-toggle-row',
    !block && sm ? 'panel-toggle-row--sm' : '',
    !block && disabled ? 'panel-toggle-row--disabled' : '',
  ].filter(Boolean).join(' ')

  const labelClass = block ? 'panel-group__label' : 'panel-toggle-label'
  const descClass = block ? 'panel-group__desc' : 'panel-toggle-desc'

  if (block) {
    return (
      <ube-panel-form-controls
        ref={ref}
        label={label}
        description={description}
        block="true"
        className={rowClass}
        {...rest}
      >
        <div>
          <h3 className={labelClass}>{label}</h3>
          {description && <p className={descClass}>{description}</p>}
        </div>
        {children && <div>{children}</div>}
      </ube-panel-form-controls>
    )
  }

  // Inline (toggle) layout: last child is the control,
  // earlier children (e.g. notes) go inside label column
  const childArray = Children.toArray(children).filter(Boolean)
  const control = childArray.at(-1)
  const notes = childArray.slice(0, -1)

  return (
    <ube-panel-form-controls
      ref={ref}
      label={label}
      description={description}
      disabled={disabled ? 'true' : 'false'}
      sm={sm ? 'true' : 'false'}
      className={rowClass}
      {...rest}
    >
      <div>
        <h3 className={labelClass}>{label}</h3>
        {description && <p className={descClass}>{description}</p>}
        {notes}
      </div>
      {control}
    </ube-panel-form-controls>
  )
})

PanelFormControls.displayName = 'PanelFormControls'
export default PanelFormControls
