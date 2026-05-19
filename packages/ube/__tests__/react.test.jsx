import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '../react/Button.jsx'
import FormControlRadio from '../react/FormControlRadio.jsx'
import FormControlRadioChipGroup from '../react/FormControlRadioChipGroup.jsx'
import FadeTransition from '../react/FadeTransition.jsx'

describe('React Adapters', () => {
  describe('Button', () => {
    it('renders with text content', () => {
      render(<Button>Click me</Button>)
      const btn = document.querySelector('ube-button')
      expect(btn?.textContent).toBe('Click me')
    })

    it('passes variant prop to element', () => {
      render(<Button variant="primary">Test</Button>)
      const btn = document.querySelector('ube-button')
      expect(btn?.getAttribute('variant')).toBe('primary')
    })

    it('handles click events', async () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Click</Button>)
      const btn = document.querySelector('ube-button button')
      await userEvent.click(btn!)
      expect(handleClick).toHaveBeenCalled()
    })

    it('sets icon property', () => {
      const icon = { type: 'svg', data: 'test' }
      render(<Button icon={icon}>Test</Button>)
      const btn = document.querySelector('ube-button') as any
      expect(btn?.icon).toEqual(icon)
    })
  })

  describe('FormControlRadio', () => {
    it('renders with name and value attributes', () => {
      render(<FormControlRadio name="group" value="a" label="Option A" checked={false} onChange={() => {}} />)
      const radio = document.querySelector('ube-form-control-radio')
      expect(radio?.getAttribute('name')).toBe('group')
      expect(radio?.getAttribute('value')).toBe('a')
    })

    it('updates checked state', () => {
      const { rerender } = render(<FormControlRadio name="g" value="a" label="A" checked={false} onChange={() => {}} />)
      let radio = document.querySelector('ube-form-control-radio')
      expect(radio?.getAttribute('checked')).toBeFalsy()

      rerender(<FormControlRadio name="g" value="a" label="A" checked={true} onChange={() => {}} />)
      radio = document.querySelector('ube-form-control-radio')
      expect(radio?.getAttribute('checked')).toBe('true')
    })

    it('handles change events', async () => {
      const handleChange = vi.fn()
      render(<FormControlRadio name="g" value="a" label="A" checked={false} onChange={handleChange} />)
      const input = document.querySelector('ube-form-control-radio input')
      await userEvent.click(input!)
      expect(handleChange).toHaveBeenCalled()
    })
  })

  describe('FormControlRadioChipGroup', () => {
    const options = [
      { value: 'web', label: 'Web' },
      { value: 'native', label: 'Native' },
    ]

    it('serializes options to JSON', () => {
      render(
        <FormControlRadioChipGroup
          legend="Platform"
          name="platform"
          value="web"
          onChange={() => {}}
          options={options}
        />
      )
      const group = document.querySelector('ube-form-control-radio-chip-group')
      const optionsAttr = group?.getAttribute('options')
      expect(optionsAttr).toBe(JSON.stringify(options))
    })

    it('renders with correct name and value', () => {
      render(
        <FormControlRadioChipGroup
          legend="Platform"
          name="platform"
          value="web"
          onChange={() => {}}
          options={options}
        />
      )
      const group = document.querySelector('ube-form-control-radio-chip-group')
      expect(group?.getAttribute('name')).toBe('platform')
      expect(group?.getAttribute('value')).toBe('web')
    })
  })

  describe('FadeTransition', () => {
    it('passes watchKey as string to element', () => {
      render(<FadeTransition watchKey="page1"><div>Content</div></FadeTransition>)
      const transition = document.querySelector('ube-fade-transition')
      expect(transition?.getAttribute('watch-key')).toBe('page1')
    })

    it('converts numeric watchKey to string', () => {
      render(<FadeTransition watchKey={123}><div>Content</div></FadeTransition>)
      const transition = document.querySelector('ube-fade-transition')
      expect(transition?.getAttribute('watch-key')).toBe('123')
    })

    it('passes direction attribute', () => {
      render(<FadeTransition watchKey="p1" direction="ltr"><div>Content</div></FadeTransition>)
      const transition = document.querySelector('ube-fade-transition')
      expect(transition?.getAttribute('direction')).toBe('ltr')
    })
  })
})
