export const GA_TRACKING_ID = 'G-D3DD9KFEW3'

// Suivi des pages
export const pageview = (url: string) => {
  if (typeof window !== 'undefined') {
    const win = window as typeof window & {
      gtag: (...args: any[]) => void
    }

    if (typeof win.gtag === 'function') {
      win.gtag('config', GA_TRACKING_ID, {
        page_path: url,
      })
    }
  }
}

// Événements personnalisés
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label: string
  value: number
}) => {
  if (typeof window !== 'undefined') {
    const win = window as typeof window & {
      gtag: (...args: any[]) => void
    }

    if (typeof win.gtag === 'function') {
      win.gtag('event', action, {
        event_category: category,
        event_label: label,
        value,
      })
    }
  }
}
