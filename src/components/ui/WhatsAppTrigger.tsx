"use client";

import type { ReactNode, ButtonHTMLAttributes } from "react";
import { openWhatsAppModal } from "@/lib/whatsapp-modal";

interface WhatsAppTriggerProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "type"> {
  message: string;
  children: ReactNode;
}

export function WhatsAppTrigger({ message, children, ...props }: WhatsAppTriggerProps) {
  return (
    <button type="button" onClick={() => openWhatsAppModal(message)} {...props}>
      {children}
    </button>
  );
}
