import { media } from "./media";

export type Service = {
  id: string;
  title: string;
  icon: "dumbbell" | "footprints" | "heart-pulse" | "target";
  description: string;
  forWho: string;
  includes: string[];
  image: string;
  whatsappMessage: string;
};

export const services: Service[] = [
  {
    id: "fuerza",
    title: "Entrenamiento de Fuerza",
    icon: "dumbbell",
    description:
      "Programas de fuerza individualizados con progresión basada en evidencia. La fuerza es la base de todo: previene lesiones, mejora la economía de carrera y transforma tu composición corporal.",
    forWho:
      "Para corredores que quieren rendir más, personas que inician en el gimnasio y atletas que buscan estructura real en su entrenamiento.",
    includes: [
      "Evaluación inicial de fuerza y movilidad",
      "Plan periodizado y ajustado semana a semana",
      "Técnica supervisada en los levantamientos principales",
      "Seguimiento de cargas y métricas de progreso",
    ],
    image: media.services.fuerza,
    whatsappMessage: "Hola, quiero información sobre el entrenamiento de fuerza.",
  },
  {
    id: "running",
    title: "Running",
    icon: "footprints",
    description:
      "Planificación de carrera para 5K, 10K, 21K y maratón. Combinamos volumen, intensidad y fuerza para que llegues a tu meta sin lesionarte en el camino.",
    forWho:
      "Para quienes empiezan a correr, corredores recreativos que buscan marca y atletas que preparan una competencia específica.",
    includes: [
      "Evaluación de técnica de carrera y historial",
      "Plan de entrenamiento semanal personalizado",
      "Trabajo de fuerza específico para corredores",
      "Estrategia de competencia y tapering",
    ],
    image: media.services.running,
    whatsappMessage: "Hola, quiero información sobre los planes de running.",
  },
  {
    id: "fisioterapia",
    title: "Fisioterapia",
    icon: "heart-pulse",
    description:
      "Evaluación y tratamiento de lesiones musculoesqueléticas con enfoque activo. No solo tratamos el dolor: buscamos la causa y te devolvemos al movimiento con un plan de readaptación progresivo.",
    forWho:
      "Para deportistas lesionados, personas con dolor persistente y cualquiera que quiera moverse sin limitaciones.",
    includes: [
      "Evaluación fisioterapéutica completa",
      "Diagnóstico funcional y plan de tratamiento",
      "Readaptación progresiva al deporte",
      "Educación sobre tu lesión y prevención",
    ],
    image: media.services.fisioterapia,
    whatsappMessage: "Hola, quiero agendar una evaluación de fisioterapia.",
  },
  {
    id: "coaching",
    title: "Coaching",
    icon: "target",
    description:
      "Acompañamiento integral que une lo físico con lo mental: hábitos, adherencia, gestión de la fatiga y mentalidad de proceso. El plan perfecto no sirve si no lo puedes sostener.",
    forWho:
      "Para quienes ya entrenan pero sienten que les falta dirección, constancia o una visión de largo plazo.",
    includes: [
      "Sesiones de seguimiento individual",
      "Construcción de hábitos y rutinas sostenibles",
      "Gestión de carga, sueño y recuperación",
      "Objetivos claros con revisión periódica",
    ],
    image: media.services.coaching,
    whatsappMessage: "Hola, quiero información sobre el programa de coaching.",
  },
];
