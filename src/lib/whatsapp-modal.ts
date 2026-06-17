export const WA_MODAL_EVENT = "pasodoble:whatsapp";

export function openWhatsAppModal(message: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(WA_MODAL_EVENT, { detail: { message } })
  );
}
