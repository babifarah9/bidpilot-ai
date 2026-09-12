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
export function calleErrorMessage(status: number, data: unknown): string {
  const code = (data as { error?: { code?: unknown } })?.error?.code;
  if (typeof code === 'string' && Object.hasOwn(explanations, code)) {
    return `CALL-E HTTP ${status} (${code}): ${explanations[code]} No automatic retry was made.`;
  }
  return `CALL-E API returned HTTP ${status} without a recognized error code. Check the provider dashboard before retrying.`;
}
