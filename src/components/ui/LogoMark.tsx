export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <img
      src="/logo.svg"
      alt="Pasodoble Run logo"
      style={{ width: 64, height: 64 }}
      aria-hidden="true"
      className={className}
    />
  );
}
