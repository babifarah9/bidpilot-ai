import test from 'node:test';
import assert from 'node:assert/strict';
import { calleErrorMessage } from '../server/calleErrors';
test('provider rejection is actionable without echoing recipient or secrets', () => {
  const message = calleErrorMessage(422, { error: { code: 'unsupported_region', message: 'secret-key +15145550123', details: { token: 'secret-key' } } });
  assert.match(message, /unsupported_region/);
  assert.doesNotMatch(message, /secret-key|15145550123/);
});
test('unrecognized error codes and raw provider payloads never reach the UI', () => {
  assert.doesNotMatch(calleErrorMessage(422, { error: { code: 'secret-key' } }), /secret-key/);
  assert.match(calleErrorMessage(422, null), /without a recognized error code/);
  assert.match(calleErrorMessage(422, { error: { code: 'result_schema_invalid' } }), /overall result schema/);
});
