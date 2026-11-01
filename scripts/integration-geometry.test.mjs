import assert from 'node:assert/strict';
import test from 'node:test';
import { integrationConnection } from '../lib/integration-geometry.ts';

function onBorder(point, box) {
  const [x, y] = point;
  const close = (a, b) => Math.abs(a - b) < 0.001;
  return x >= box.x - 0.001 && x <= box.x + box.width + 0.001
    && y >= box.y - 0.001 && y <= box.y + box.height + 0.001
    && (close(x, box.x) || close(x, box.x + box.width) || close(y, box.y) || close(y, box.y + box.height));
}

test('connects actual label and hub borders in wide and stacked diagrams', () => {
  for (const [node, hub] of [
    [{x:0,y:0,width:110,height:30},{x:140,y:20,width:56,height:56}],
    [{x:240,y:60,width:110,height:30},{x:140,y:20,width:56,height:56}],
    [{x:0,y:0,width:120,height:31},{x:100,y:61,width:56,height:56}],
    [{x:136,y:147,width:120,height:31},{x:100,y:61,width:56,height:56}],
  ]) {
    const numbers = integrationConnection(node, hub).match(/-?\d+(?:\.\d+)?/g).map(Number);
    assert.ok(onBorder(numbers.slice(0,2),node));
    assert.ok(onBorder(numbers.slice(-2),hub));
    assert.ok(numbers.every(Number.isFinite));
  }
});

test('ignores unmeasured or coincident elements', () => {
  const box={x:0,y:0,width:50,height:50};
  assert.equal(integrationConnection(box,box),'');
  assert.equal(integrationConnection({...box,width:0},box),'');
});
