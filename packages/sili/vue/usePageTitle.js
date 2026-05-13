import { watch, onUnmounted } from 'vue'

/**
 * Sets document.title to "AppName | pageTitle" while the component is mounted,
 * then resets to "AppName" on unmount.
 *
 * @param {string|Ref<string>} pageTitle
 * @param {string}             [appName]  - optional app name prefix
 */
export function usePageTitle(pageTitle, appName) {
  const original = document.title

  function update(title) {
    document.title = appName ? `${appName} | ${title}` : title
  }

  if (typeof pageTitle === 'object') {
    watch(pageTitle, (t) => update(t), { immediate: true })
  } else {
    update(pageTitle)
  }

  onUnmounted(() => {
    document.title = appName ? appName : original
  })
}
