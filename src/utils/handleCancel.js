export function handleCancel({
  navigate,
  closeAllModals,
  setShowProcessing,
  setIsLoading,
  setIsProcessing,
  onProcessingChange
}) {
  try { onProcessingChange?.(false); } catch {}
  try { setIsProcessing?.(false); } catch {}
  try { setShowProcessing?.(false); } catch {}
  try { setIsLoading?.(false); } catch {}
  try { closeAllModals?.(); } catch {}
  try { navigate?.('/dashboard'); } catch {}
}
