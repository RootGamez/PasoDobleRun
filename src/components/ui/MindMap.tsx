"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Handle,
  Position,
  type Node,
  type Edge,
  type NodeProps,
  type NodeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { methodNodes, methodEdges, type MethodNode } from "@/data/methodology";

type MethodNodeData = { label: string; variant: MethodNode["variant"] };
type FlowNode = Node<MethodNodeData>;

const variantStyles: Record<NonNullable<MethodNode["variant"]>, string> = {
  core: "border-sky bg-deep/80 text-sky-bright shadow-glow-sm",
  step: "border-line bg-ink-soft/90 text-text hover:border-sky/60",
  result: "border-sky-bright/50 bg-deep-2/90 text-text",
};

// Mobile cards: keep the variants but readable as standalone cards.
const cardStyles: Record<NonNullable<MethodNode["variant"]>, string> = {
  core: "border-sky/70 bg-deep/50",
  step: "border-line bg-ink-soft/80",
  result: "border-sky-bright/50 bg-deep-2/60",
};

const cardLabelStyles: Record<NonNullable<MethodNode["variant"]>, string> = {
  core: "text-sky-bright",
  step: "text-text",
  result: "text-sky-bright",
};

function MethodFlowNode({ data }: NodeProps<FlowNode>) {
  return (
    <div
      className={`cursor-pointer rounded-xl border px-5 py-4 text-center font-display text-sm font-semibold tracking-wide transition-all sm:px-6 sm:py-5 sm:text-base ${
        variantStyles[data.variant ?? "step"]
      }`}
    >
      <Handle type="target" position={Position.Left} className="!size-1.5 !border-0 !bg-sky/60" />
      {data.label}
      <Handle type="source" position={Position.Right} className="!size-1.5 !border-0 !bg-sky/60" />
    </div>
  );
}

const nodeTypes: NodeTypes = { method: MethodFlowNode };

/** True ≥768px. Initialised synchronously (component is client-only) to avoid a flash. */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(min-width: 768px)").matches : false
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

/** Mobile: a static, fully readable vertical stack — no xyflow, so it never
 *  captures touch/scroll and the text stays large. */
function MindMapStacked() {
  return (
    <ol className="space-y-4">
      {methodNodes.map((n) => (
        <li
          key={n.id}
          className={`rounded-2xl border p-5 ${cardStyles[n.variant ?? "step"]}`}
        >
          <h3 className={`font-display text-base font-bold ${cardLabelStyles[n.variant ?? "step"]}`}>
            {n.label}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">{n.detail}</p>
        </li>
      ))}
    </ol>
  );
}

/** Desktop: the connected diagram, locked (no pan/zoom/drag) so it stays static. */
function MindMapFlow() {
  const [selected, setSelected] = useState<MethodNode | null>(null);

  const nodes: FlowNode[] = useMemo(
    () =>
      methodNodes.map((n) => ({
        id: n.id,
        type: "method",
        position: n.position,
        data: { label: n.label, variant: n.variant },
      })),
    []
  );

  const edges: Edge[] = useMemo(
    () =>
      methodEdges.map((e) => ({
        ...e,
        animated: true,
        style: { stroke: "var(--color-teal)", strokeOpacity: 0.5, strokeWidth: 1.5 },
      })),
    []
  );

  const onNodeClick = useCallback((_: unknown, node: FlowNode) => {
    setSelected(methodNodes.find((n) => n.id === node.id) ?? null);
  }, []);

  return (
    <div className="relative h-[480px] overflow-hidden rounded-2xl border border-line bg-ink-soft/60">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        fitView
        fitViewOptions={{ padding: 0.06 }}
        minZoom={0.1}
        maxZoom={1.5}
        nodesDraggable={false}
        nodesConnectable={false}
        nodesFocusable={false}
        edgesFocusable={false}
        elementsSelectable
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        panOnDrag={false}
        panOnScroll={false}
        preventScrolling={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} color="var(--color-line)" gap={24} size={1.5} />
      </ReactFlow>

      <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-center text-xs text-text-muted">
        Toca cada nodo para ver el detalle
      </p>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute inset-x-3 bottom-3 rounded-xl border border-sky/40 bg-ink/95 p-5 backdrop-blur-md sm:inset-x-auto sm:right-4 sm:bottom-4 sm:max-w-sm"
            role="dialog"
            aria-label={selected.label}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-base font-bold text-sky-bright">{selected.label}</h3>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Cerrar detalle"
                className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-text-muted transition-colors hover:text-text"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">{selected.detail}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function MindMap() {
  const isDesktop = useIsDesktop();
  return isDesktop ? <MindMapFlow /> : <MindMapStacked />;
}
