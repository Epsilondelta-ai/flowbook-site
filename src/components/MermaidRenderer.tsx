import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

let initialized = false

function initMermaid() {
  if (initialized) return
  mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    themeVariables: {
      darkMode: true,
      background: '#0F0F23',
      primaryColor: '#6366f1',
      primaryTextColor: '#fff',
      primaryBorderColor: '#818cf8',
      lineColor: '#4B5563',
      secondaryColor: '#1e1b4b',
      tertiaryColor: '#1a1a3e',
      fontFamily: 'Inter, system-ui, sans-serif',
      fontSize: '13px',
    },
    flowchart: {
      htmlLabels: true,
      curve: 'basis',
      padding: 12,
    },
  })
  initialized = true
}

interface Props {
  chart: string
  id: string
}

export default function MermaidRenderer({ chart, id }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function render() {
      if (!containerRef.current) return
      initMermaid()

      try {
        const elementId = `mermaid-${id.replace(/[^a-zA-Z0-9]/g, '-')}`
        const { svg } = await mermaid.render(elementId, chart)
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg
          setError(null)
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Render failed')
        }
      }
    }

    render()
    return () => { cancelled = true }
  }, [chart, id])

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-red-400 text-xs font-mono p-4">
        Render error: {error}
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center w-full h-full overflow-auto [&_svg]:max-w-full [&_svg]:h-auto"
    />
  )
}
