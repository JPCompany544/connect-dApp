export async function safeSendTransaction(walletClient, tx, { timeoutMs = 30000 } = {}) {
  if (!walletClient) {
    throw new Error('Wallet client is not available');
  }

  let timeoutId;

  try {
    const txPromise = walletClient.sendTransaction(tx);

    const timeoutPromise = new Promise((_, reject) => {
      timeoutId = setTimeout(() => {
        const err = new Error('Transaction request timed out');
        // Custom code used downstream to distinguish timeout from generic errors
        err.code = 'TX_TIMEOUT';
        reject(err);
      }, timeoutMs);
    });

    const hash = await Promise.race([txPromise, timeoutPromise]);

    if (timeoutId) clearTimeout(timeoutId);

    return { ok: true, hash };
  } catch (error) {
    if (timeoutId) clearTimeout(timeoutId);

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
      msg.includes('cancel');

    const isTimeout = code === 'TX_TIMEOUT' || msg.includes('timeout');

    if (isUserRejected || isTimeout) {
      return {
        ok: false,
        cancelled: true,
        timeout: isTimeout,
        error
      };
    }

    // Non-cancellation errors are still thrown so callers can surface them
    throw error;
  }
}
