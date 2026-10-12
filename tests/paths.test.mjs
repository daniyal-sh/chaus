import test from 'node:test';
import assert from 'node:assert/strict';
import { withBase, withoutBase } from '../src/paths.mjs';

test('Project-site URLs keep routes and assets inside the repository path', () => {
  assert.equal(withBase('/menu', '/chaus/'), '/chaus/menu');
  assert.equal(withBase('/', '/chaus/'), '/chaus/');
  assert.equal(withBase('/images/crew.webp', '/chaus/'), '/chaus/images/crew.webp');
  assert.equal(withBase('/visit'), '/visit');
});
test('Direct page loads remove only the exact deployment base', () => {
  assert.equal(withoutBase('/chaus/menu/', '/chaus/'), '/menu/');
  assert.equal(withoutBase('/chaus', '/chaus/'), '/');
  assert.equal(withoutBase('/chaus/', '/chaus/'), '/');
  assert.equal(withoutBase('/chaus-other/menu', '/chaus/'), '/chaus-other/menu');
  assert.equal(withoutBase('/menu/', '/'), '/menu/');
});
