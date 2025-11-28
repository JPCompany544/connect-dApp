import { handleCancel } from "./handleCancel";

export function forceCleanup({
  navigate,
  closeAllModals,
  setParentProcessing,
  setLocalProcessing
}) {
  try { setParentProcessing?.(false); } catch {}
  try { setLocalProcessing?.(false); } catch {}
  try { closeAllModals?.(); } catch {}
  try { navigate?.('/dashboard'); } catch {}
}
