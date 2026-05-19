import { useState, useCallback, useSyncExternalStore } from 'react'
import { createProviderConfig } from './createProviderConfig.js'

export function useProviderConfig(storageKeys, providers) {
  const [config] = useState(() => createProviderConfig(storageKeys, providers))

  const snapshot = useSyncExternalStore(
    (listen) => config.subscribe(listen),
    () => ({
      provider: config.provider,
      models: config.models,
      mode: config.mode,
      providers: config.providers,
    })
  )

  return {
    ...snapshot,
    setProvider: useCallback((id) => config.setProvider(id), [config]),
    setModel: useCallback((pid, mid) => config.setModel(pid, mid), [config]),
    setMode: useCallback((v) => config.setMode(v), [config]),
    setKey: useCallback((pid, v) => config.setKey(pid, v), [config]),
    getKey: useCallback((pid) => config.getKey(pid), [config]),
    getModel: useCallback((pid) => config.getModel(pid), [config]),
    getLabel: useCallback((pid) => config.getLabel(pid), [config]),
  }
}
