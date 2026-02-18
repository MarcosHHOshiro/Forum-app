import { right } from "./either";

test('success result', () => {
  const success = right('success');

  expect(success.value).toBe('success');
})