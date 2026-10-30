// Minimal typing for HTMX loaded via <script> tag.
// Not exhaustive — just what your React wrapper needs.
export {}

declare global {
  interface HtmxApi {
    process: (elt: Element | Document) => void
    ajax: (
      verb: string,
      path: string,
      options?: {
        target?: string | Element
        swap?: string
        values?: Record<string, unknown>
        headers?: Record<string, string>
        source?: Element
      }
    ) => void
    trigger: (elt: Element | string, eventName: string, detail?: unknown) => void
    onLoad: (elt: Element | Document) => void
  }

  interface Window {
    htmx?: HtmxApi
  }
}
