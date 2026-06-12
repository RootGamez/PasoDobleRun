import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="gradient-section flex min-h-svh flex-col items-center justify-center px-5 text-center">
      <p className="font-display text-8xl font-extrabold text-gradient-sky">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-text">
        Esta página se salió de la ruta
      </h1>
      <p className="mt-3 max-w-md text-text-muted">
        El enlace que buscas no existe o cambió de lugar. Volvamos al recorrido.
      </p>
      <div className="mt-8">
        <Button href="/">Volver al inicio</Button>
      </div>
    </div>
  );
}
