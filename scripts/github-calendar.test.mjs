import assert from 'node:assert/strict';
import test from 'node:test';
import { parseGitHubCalendar } from '../lib/github-calendar.ts';

function calendar(total = 10, length = 365) {
  const days = Array.from({ length }, (_, index) => {
    const date = new Date(Date.UTC(2025, 10, 2) + index * 86_400_000).toISOString().slice(0, 10);
    const count = index === 0 ? 10 : 0;
    return `<td data-date="${date}" id="day-${index}" data-level="${count ? 2 : 0}"></td><tool-tip for="day-${index}">${count || 'No'} contributions on ${date}.</tool-tip>`;
  }).join('');
  return `<h2>${total} contributions in the last year</h2>${days}`;
}

test('parses a complete calendar with verified day counts', () => {
  const parsed = parseGitHubCalendar(calendar());
  assert.equal(parsed.total, 10);
  assert.equal(parsed.days.length, 365);
  assert.equal(parsed.days[0].count, 10);
});

test('accepts GitHub yearly totals that differ from the rendered calendar window', () => {
  const parsed = parseGitHubCalendar(calendar(21));
  assert.equal(parsed.total, 21);
  assert.equal(parsed.days.reduce((sum, day) => sum + day.count, 0), 10);
});

test('rejects missing daily counts', () => {
  assert.throws(() => parseGitHubCalendar(calendar().replace('<tool-tip for="day-0">10 contributions on 2025-11-02.</tool-tip>', '')), /invalid contribution calendar/);
});

test('rejects incomplete calendars and invalid summary totals', () => {
  assert.throws(() => parseGitHubCalendar(calendar(10, 364)), /incomplete contribution calendar/);
  assert.throws(() => parseGitHubCalendar(calendar('Unavailable')), /totals could not be verified/);
});
