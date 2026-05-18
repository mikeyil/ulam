import { useEffect, useRef } from 'react'
import { mountAnnouncer } from './mountAnnouncer.js'
import './toast-announcer.css'

export function Announcer({ devEnabled = true }) {
  const instanceRef = useRef(null)

  useEffect(() => {
    instanceRef.current = mountAnnouncer({ enabled: devEnabled })
    return () => instanceRef.current?.destroy()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    instanceRef.current?.setEnabled(devEnabled)
  }, [devEnabled])

  return null
}
