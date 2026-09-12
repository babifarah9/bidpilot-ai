// Show only documented error codes and our own explanations, never provider echoes.
const explanations: Record<string, string> = {
  invalid_request: 'The request body was rejected.',
  unsupported_region: 'The destination is not supported or is temporarily restricted. Check the phone country and selected region.',
  unsupported_language: 'The requested language is not supported for this destination.',
  invalid_recipient: 'The recipient configuration was rejected.',
  invalid_phone: 'The receiving number was rejected. Check its international format.',
  no_recipients: 'CALL-E could not resolve a recipient.',
  result_schema_invalid: 'CALL-E rejected the overall result schema.',
  recipient_result_schema_invalid: 'CALL-E rejected the supplier result schema.',
  recipient_blocked: 'CALL-E has blocked this recipient.',
  policy_violation: 'CALL-E rejected the request under its calling policy.',
  unauthorized: 'The CALL-E key was rejected.',
  forbidden: 'The CALL-E key cannot access this capability.',
  insufficient_balance: 'The CALL-E account has insufficient calling balance.',
  rate_limit_exceeded: 'The CALL-E request limit was reached.',
  idempotency_conflict: 'This request identifier was previously used with different details.',
};
function safeText(value: unknown, secrets: string[]): string {
  if (typeof value !== 'string' && typeof value !== 'number') return '';
  let text = String(value);
  for (const secret of secrets.filter(Boolean)) text = text.split(secret).join('[redacted]');
  return text.replace(/iams_[A-Za-z0-9_-]+/g, '[redacted-key]')
    .replace(/Bearer\s+\S+/gi, 'Bearer [redacted]')
    .replace(/\+?\d[\d ().-]{6,}\d/g, '[redacted-number]')
    .replace(/[\r\n\t]/g, ' ').slice(0, 300);
}
export function calleErrorMessage(status: number, data: unknown, secrets: string[] = []): string {
  const code = (data as { error?: { code?: unknown } })?.error?.code;
  if (typeof code === 'string' && Object.hasOwn(explanations, code)) {
    return `CALL-E HTTP ${status} (${code}): ${explanations[code]} No automatic retry was made.`;
  }
  const payload = data as { detail?: unknown; message?: unknown; error?: { message?: unknown; details?: unknown } } | null;
  const detail = payload?.detail ?? payload?.error?.details;
  // FastAPI/Pydantic validation envelopes differ from the documented error.code envelope.
  if (Array.isArray(detail)) {
    const fields = detail.slice(0, 5).map(item => {
      const entry = item as { loc?: unknown[]; type?: unknown; msg?: unknown };
      const path = Array.isArray(entry?.loc) ? entry.loc.map(part => safeText(part, secrets)).join('.') : 'request';
      return `${path}: ${safeText(entry?.type, secrets)} ${safeText(entry?.msg, secrets)}`;
    }).join('; ');
    if (fields) return `CALL-E HTTP ${status}: ${fields}. No automatic retry was made.`;
  }
  const message = safeText(typeof detail === 'string' ? detail : payload?.error?.message ?? payload?.message, secrets);
  if (message) return `CALL-E HTTP ${status}: ${message}. No automatic retry was made.`;
  return `CALL-E API returned HTTP ${status} without readable validation details. Check the provider dashboard before retrying.`;
}
