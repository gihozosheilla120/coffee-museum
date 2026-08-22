type ConfirmDialogProps = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div
      role="presentation"
      onClick={onCancel}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(17, 25, 34, 0.55)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 200,
        padding: '1.5rem',
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        onClick={e => e.stopPropagation()}
        className="card"
        style={{ maxWidth: 380, width: '100%' }}
      >
        <div className="card__body">
          <h3 id="confirm-dialog-title" style={{ marginBottom: '0.5rem' }}>{title}</h3>
          <p className="muted" style={{ marginBottom: '1.5rem' }}>{message}</p>
          <div className="flex gap-2" style={{ justifyContent: 'flex-end' }}>
            <button className="btn btn--outline btn--sm" type="button" onClick={onCancel}>
              {cancelLabel}
            </button>
            <button className="btn btn--sm" type="button" onClick={onConfirm}>
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
