import { useEffect, useId, useRef } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
}

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

const Modal = ({
  open,
  onClose,
  title,
  description,
  children,
  footer,
}: ModalProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previousOverflow = document.body.style.overflow;
    const focusableElements = panel
      ? Array.from(panel.querySelectorAll<HTMLElement>(focusableSelector))
      : [];

    document.body.style.overflow = "hidden";

    const initialFocus =
      panel?.querySelector<HTMLElement>("[data-autofocus]") ??
      focusableElements[0] ??
      panel;

    initialFocus?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== "Tab" || focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open]);

  if (!open) return null;

  const portalRoot = document.getElementById("modal-root") ?? document.body;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-zinc-950/30 p-0 sm:items-center sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className="max-h-[calc(100dvh-1.5rem)] w-full overflow-y-auto rounded-t-lg border border-zinc-200 bg-white outline-none sm:max-w-md sm:rounded-lg"
      >
        <div className="flex items-start justify-between gap-4 border-b border-zinc-200 px-5 py-4">
          <div>
            <h2
              id={titleId}
              className="text-base font-semibold tracking-tight text-zinc-950"
            >
              {title}
            </h2>

            {description ? (
              <p
                id={descriptionId}
                className="mt-1 text-sm leading-6 text-zinc-500"
              >
                {description}
              </p>
            ) : null}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="-mr-2 -mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="px-5 py-5">{children}</div>

        {footer ? (
          <div className="flex justify-end gap-2 border-t border-zinc-200 px-5 py-4">
            {footer}
          </div>
        ) : null}
      </div>
    </div>,
    portalRoot,
  );
};

export default Modal;
