export type NavItem = { label: string; href: string };

export const navigation: NavItem[] = [
  { label: "Metodología", href: "/#metodologia" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Foro", href: "/foro/" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Reseñas", href: "/#resenas" },
  { label: "Contacto", href: "/#contacto" },
];

export const footerLinks: NavItem[] = [
  ...navigation,
  { label: "Inicio", href: "/" },
];
