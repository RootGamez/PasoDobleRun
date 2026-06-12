export type MethodNode = {
  id: string;
  label: string;
  detail: string;
  position: { x: number; y: number };
  variant?: "core" | "step" | "result";
};

export type MethodEdge = { id: string; source: string; target: string };

export const methodNodes: MethodNode[] = [
  {
    id: "evaluacion",
    label: "Evaluación fisioterapéutica",
    detail:
      "Todo empieza con datos: historial, valoración de movilidad, fuerza y técnica. Sin evaluación no hay plan, hay adivinanza.",
    position: { x: 0, y: 160 },
    variant: "step",
  },
  {
    id: "planificacion",
    label: "Planificación individual",
    detail:
      "Con tu evaluación diseñamos la progresión: cargas, volumen e intensidad ajustados a tu vida real, no a una plantilla.",
    position: { x: 260, y: 40 },
    variant: "step",
  },
  {
    id: "metodo",
    label: "Método Pasodoble",
    detail:
      "Fisioterapia, fuerza y running integrados bajo un solo criterio científico. Cada decisión tiene una razón medible detrás.",
    position: { x: 300, y: 200 },
    variant: "core",
  },
  {
    id: "fuerza",
    label: "Fuerza",
    detail:
      "La base estructural: tejidos más fuertes toleran más carga, se lesionan menos y rinden más. Innegociable para cualquier objetivo.",
    position: { x: 560, y: 60 },
    variant: "step",
  },
  {
    id: "running",
    label: "Running",
    detail:
      "Planificación de carrera con control de carga semanal. Volumen e intensidad dosificados para progresar sin romperte.",
    position: { x: 620, y: 200 },
    variant: "step",
  },
  {
    id: "readaptacion",
    label: "Readaptación",
    detail:
      "Si hay lesión, el puente de vuelta al deporte se cruza con criterios objetivos por fase — nunca con plazos arbitrarios.",
    position: { x: 280, y: 360 },
    variant: "step",
  },
  {
    id: "resultados",
    label: "Resultados medibles",
    detail:
      "Marcas, cargas, kilómetros sin dolor: el progreso se mide y se ve. Lo que no se mide no se puede mejorar.",
    position: { x: 600, y: 360 },
    variant: "result",
  },
];

export const methodEdges: MethodEdge[] = [
  { id: "e1", source: "evaluacion", target: "metodo" },
  { id: "e2", source: "evaluacion", target: "planificacion" },
  { id: "e3", source: "planificacion", target: "metodo" },
  { id: "e4", source: "metodo", target: "fuerza" },
  { id: "e5", source: "metodo", target: "running" },
  { id: "e6", source: "metodo", target: "readaptacion" },
  { id: "e7", source: "fuerza", target: "resultados" },
  { id: "e8", source: "running", target: "resultados" },
  { id: "e9", source: "readaptacion", target: "resultados" },
];

export const heroSteps = [
  {
    id: "fisioterapia",
    kicker: "Paso 01 — Evalúa",
    title: "Fisioterapia que busca la causa",
    text: "No tapamos el dolor: lo entendemos. Evaluación completa y tratamiento activo basado en evidencia.",
  },
  {
    id: "fuerza",
    kicker: "Paso 02 — Construye",
    title: "Fuerza como base de todo",
    text: "Tejidos fuertes se lesionan menos y rinden más. Programas progresivos con técnica supervisada.",
  },
  {
    id: "running",
    kicker: "Paso 03 — Corre",
    title: "Running planificado, no improvisado",
    text: "De tus primeros 5K al maratón: carga dosificada, estrategia y acompañamiento real.",
  },
] as const;
