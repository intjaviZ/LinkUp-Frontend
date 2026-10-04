import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import DesgloseCostos from "./DesgloseCostos";

export default function PagoModal({ open, cotizacion, loading, onConfirm, onClose }) {
  return (
    <Modal
      open={open}
      title="Confirmar y agendar"
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button onClick={onConfirm} loading={loading}>Confirmar y agendar</Button>
        </>
      }
    >
      <div className="space-y-4">
        {cotizacion && <DesgloseCostos data={cotizacion} />}
        <p className="text-xs text-slate-500">Pago simulado: no se realizará ningún cargo real.</p>
      </div>
    </Modal>
  );
}