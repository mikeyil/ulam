import '../screen.css'
import { useEffect } from 'react'
import { useFocusOnMount } from '@ulam/sili/react'

function DefaultSearchIcon() {
  return (
    <svg aria-hidden="true" width="56" height="56" viewBox="0 0 56 56" fill="none">
      <circle cx="22" cy="22" r="14" stroke="var(--border)" strokeWidth="2.5"/>
      <line x1="33" y1="33" x2="47" y2="47" stroke="var(--border)" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="14" y1="19" x2="30" y2="19" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3"/>
      <line x1="14" y1="23" x2="27" y2="23" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 3"/>
      <line x1="14" y1="27" x2="24" y2="27" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1 3"/>
    </svg>
  )
}

function DefaultErrorIcon() {
  return (
    <svg aria-hidden="true" width="56" height="56" viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="28" r="22" stroke="var(--border)" strokeWidth="2.5"/>
      <line x1="28" y1="16" x2="28" y2="32" stroke="var(--text-muted)" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="28" cy="39" r="1.5" fill="var(--text-muted)"/>
    </svg>
  )
}

function DefaultRetryIcon() {
  return (
    <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  )
}

export default function Screen({
  variant = 'no-results',
  ariaLabel,
  heading,
  body,
  icon: Icon,
  action,
  actionLabel,
  actionIcon: ActionIcon,
  activeFilters = [],
  onOpenSettings,
  onMount,
}) {
  const headingRef = useFocusOnMount()

  useEffect(() => {
    onMount?.()
  }, [onMount])

  // Variant defaults
  const variantDefaults = {
    'no-results': {
      ariaLabel: 'No results found',
      heading: 'No results found',
      body: 'Try adjusting your search terms.',
      Icon: DefaultSearchIcon,
    },
    'error': {
      ariaLabel: 'Error loading data',
      heading: 'Unable to load data',
      body: 'An error occurred while loading data.',
      Icon: DefaultErrorIcon,
      ActionIcon: DefaultRetryIcon,
      actionLabel: 'Try again',
    },
  }

  const defaults = variantDefaults[variant] || variantDefaults['no-results']
  const finalIcon = Icon || defaults.Icon
  const finalActionIcon = ActionIcon || defaults.ActionIcon
  const finalAriaLabel = ariaLabel || defaults.ariaLabel
  const finalHeading = heading || defaults.heading
  const finalBody = body || defaults.body
  const finalActionLabel = actionLabel || defaults.actionLabel

  return (
    <section className="screen" aria-label={finalAriaLabel}>
      {finalIcon && <finalIcon.type />}

      <p className="screen__heading" ref={headingRef} tabIndex={-1}>
        {finalHeading}
      </p>

      <p className="screen__body">
        {finalBody}
        {action && finalActionIcon && (
          <>
            {' '}
            <button type="button" className="screen__action-inline" onClick={action}>
              {finalActionIcon && <finalActionIcon.type />}
              {finalActionLabel}
            </button>
            .
          </>
        )}
        {!action && finalActionLabel && '.'}
      </p>

      {activeFilters.length > 0 && (
        <>
          <p className="screen__filters">
            <span className="screen__filters-label">Active filters:</span>
            {activeFilters.map((f, i) => (
              <span key={i} className="screen__filter-tag">{f}</span>
            ))}
          </p>

          {onOpenSettings && (
            <p className="screen__settings-hint">
              Adjust your preferences{' '}
              <button className="screen__settings-link" onClick={onOpenSettings}>
                here
              </button>
              .
            </p>
          )}
        </>
      )}

      {action && !finalActionIcon && (
        <button className="btn btn--primary screen__action-block" onClick={action}>
          {finalActionLabel}
        </button>
      )}
    </section>
  )
}
