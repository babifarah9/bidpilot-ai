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
  assert.match(calleErrorMessage(422, null), /without readable validation details/);
  assert.match(calleErrorMessage(422, { error: { code: 'result_schema_invalid' } }), /overall result schema/);
});

test('FastAPI validation keeps location and reason but excludes input and context', () => {
  const message = calleErrorMessage(422, {detail:[{loc:['body','recipients',0,'locale'],type:'value_error',msg:'Unsupported locale',input:'+15145550123',ctx:{key:'secret-key'}}]});
  assert.match(message, /body.recipients.0.locale/);
  assert.match(message, /Unsupported locale/);
  assert.doesNotMatch(message, /15145550123|secret-key/);
});
test('provider messages redact known secrets and telephone numbers', () => {
  const message = calleErrorMessage(422, {detail:'Reject private-token for +15145550123 and iams_live_test'}, ['private-token']);
  assert.doesNotMatch(message, /private-token|15145550123|iams_live_test/);
  assert.match(message, /redacted/);
});
