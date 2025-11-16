export function handleCancel({ navigate, closeAllModals, setShowProcessing, setIsLoading, onProcessingChange }) {
  try { onProcessingChange?.(false); } catch {}
  try { setShowProcessing?.(false); } catch {}
  try { setIsLoading?.(false); } catch {}
  try { closeAllModals?.(); } catch {}
  try { if (navigate) navigate('/dashboard'); } catch {}
}
