"use client";

import dynamic from "next/dynamic";

const MindMap = dynamic(() => import("./MindMap").then((m) => m.MindMap), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] items-center justify-center rounded-2xl border border-line bg-ink-soft/60 sm:h-[480px]">
      <span className="text-sm text-text-muted">Cargando mapa...</span>
    </div>
  ),
});

export function MindMapClient() {
  return <MindMap />;
}
