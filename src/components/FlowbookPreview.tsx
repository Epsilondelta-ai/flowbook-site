import { useState } from 'react'
import { getGroupedExamples, type FlowEntry } from '../data/examples'
import MermaidRenderer from './MermaidRenderer'

const groups = getGroupedExamples()
const allEntries = groups.flatMap((g) => g.entries)

export default function FlowbookPreview() {
  const [selected, setSelected] = useState<FlowEntry>(allEntries[0])
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  const toggleCategory = (cat: string) =>
    setCollapsed((prev) => ({ ...prev, [cat]: !prev[cat] }))

  return (
    <div className="bg-surface-light border border-border rounded-2xl shadow-2xl overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-surface-lighter/50 border-b border-border">
        <div className="w-3 h-3 rounded-full bg-red-500/60" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
        <div className="w-3 h-3 rounded-full bg-green-500/60" />
        <span className="text-xs text-text-secondary ml-2 font-mono">
          flowbook — localhost:6200
        </span>
        <div className="ml-auto text-[10px] text-text-secondary/50 font-mono">
          {allEntries.length} flows
        </div>
      </div>

      {/* Body */}
      <div className="flex" style={{ height: 420 }}>
        {/* Sidebar */}
        <div className="w-52 shrink-0 border-r border-border bg-surface/60 overflow-y-auto hidden sm:block">
          {/* Search mock */}
          <div className="p-2">
            <div className="flex items-center gap-2 px-2.5 py-1.5 bg-surface-light border border-border rounded-lg text-xs text-text-secondary/50">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              Search flows…
            </div>
          </div>

          {/* Category tree */}
          <div className="px-1 pb-2">
            {groups.map((group) => (
              <div key={group.category}>
                <button
                  onClick={() => toggleCategory(group.category)}
                  className="w-full flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-semibold text-text-secondary uppercase tracking-wider hover:text-text-primary transition-colors bg-transparent border-none cursor-pointer text-left"
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="currentColor"
                    className={`transition-transform ${collapsed[group.category] ? '' : 'rotate-90'}`}
                  >
                    <path d="M3 1l4 4-4 4" />
                  </svg>
                  {group.category}
                  <span className="ml-auto text-text-secondary/40 font-normal normal-case">
                    {group.entries.length}
                  </span>
                </button>

                {!collapsed[group.category] && (
                  <div className="ml-2">
                    {group.entries.map((entry) => (
                      <button
                        key={entry.title}
                        onClick={() => setSelected(entry)}
                        className={`w-full text-left px-3 py-1.5 text-xs rounded-md mb-0.5 transition-colors cursor-pointer bg-transparent border-none ${
                          selected.title === entry.title
                            ? 'bg-primary/15 text-primary font-medium'
                            : 'text-text-secondary hover:bg-surface-lighter/50 hover:text-text-primary'
                        }`}
                      >
                        {entry.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main panel */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Flow header */}
          <div className="px-4 py-3 border-b border-border/50 shrink-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-semibold text-text-primary m-0">
                {selected.title}
              </h3>
              <span className="text-[10px] px-1.5 py-0.5 bg-primary/10 text-primary rounded-md">
                {selected.category}
              </span>
            </div>
            <p className="text-[11px] text-text-secondary mt-1 m-0 leading-relaxed">
              {selected.description}
            </p>
            {/* Tags */}
            <div className="flex gap-1 mt-1.5 flex-wrap">
              {selected.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-1.5 py-0.5 bg-surface-lighter text-text-secondary/70 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Diagram */}
          <div className="flex-1 overflow-auto p-4 bg-surface/40">
            <MermaidRenderer chart={selected.mermaid} id={selected.title} />
          </div>

          {/* Mobile selector (visible on small screens where sidebar is hidden) */}
          <div className="sm:hidden border-t border-border p-2">
            <select
              value={selected.title}
              onChange={(e) => {
                const entry = allEntries.find((en) => en.title === e.target.value)
                if (entry) setSelected(entry)
              }}
              className="w-full px-3 py-2 bg-surface-light border border-border rounded-lg text-xs text-text-primary"
            >
              {groups.map((group) => (
                <optgroup key={group.category} label={group.category}>
                  {group.entries.map((entry) => (
                    <option key={entry.title} value={entry.title}>
                      {entry.title}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
