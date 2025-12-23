export async function safeSendTransaction(
  walletClient,
  tx,
  { timeoutMs, hardTimeoutMs } = {}
) {
  if (!walletClient) {
    throw new Error('Wallet client is not available');
  }

  // Use the provided timeoutMs (if valid) or hardTimeoutMs, defaulting to 12s logic if neither is specific enough, but we should probably default to something reasonable if timeoutMs is passed.
  // Actually, if timeoutMs is passed, we want to respect it.
  // If hardTimeoutMs is passed, we respect it.

  const effectiveTimeout = timeoutMs ?? hardTimeoutMs ?? 120000;

  return new Promise((resolve, reject) => {
    let settled = false;
    let hardTimeoutId;

    const finishResolve = (value) => {
      if (settled) return;
      settled = true;
      if (hardTimeoutId) clearTimeout(hardTimeoutId);
      resolve(value);
    };

    const finishReject = (error) => {
      if (settled) return;
      settled = true;
      if (hardTimeoutId) clearTimeout(hardTimeoutId);
      reject(error);
    };

    // Hard timeout that will always resolve, even if the wallet never responds
    hardTimeoutId = setTimeout(() => {
      finishResolve({
        ok: false,
        cancelled: true,
        timeout: true,
        reason: 'timeout'
      });
    }, effectiveTimeout);

    walletClient
      .sendTransaction(tx)
      .then((hash) => {
        finishResolve({ ok: true, hash });
      })
      .catch((error) => {
        const msg = String(error?.shortMessage || error?.message || '').toLowerCase();
        const code = error?.code;
        const name = String(error?.name || '').toLowerCase();

        const isUserRejected =
          code === 4001 ||
          name.includes('userrejected') ||
          msg.includes('user rejected') ||
          msg.includes('user denied') ||
          msg.includes('rejected') ||
          msg.includes('denied') ||
          msg.includes('declined') ||
          msg.includes('disapproved') ||
          msg.includes('notification') || // mobile wallet sometimes kills session
          msg.includes('cancel');

        const isTimeout = code === 'TX_TIMEOUT' || msg.includes('timeout');

        if (isUserRejected || isTimeout) {
          finishResolve({
            ok: false,
            cancelled: true,
            timeout: isTimeout,
            orientation: undefined,
            // pass through the raw error for logging if needed
            error
          });
          return;
        }

        // Non-cancellation errors are still thrown so callers can surface them
        finishReject(error);
      });
  });
}
