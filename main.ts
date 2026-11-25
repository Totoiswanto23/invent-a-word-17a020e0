// invent-a-word-17a020e0: Invent a Word We Need.
// This program writes exactly one entry to /output/entry.txt, where the
// gate reads it: one invented English word plus its one-line definition,
// 1-140 characters total. The word: Corridance.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The word: Corridance (corridor + dance) — the hallway shuffle when two
// people keep stepping the same way to pass each other. Everyone has lived
// it, no English word names it, and the blend says itself: corridor + dance.
// Sayable, spellable, memorable, and the definition lands in one reading.
const ENTRY =
  'Corridance \u2014 the hallway shuffle when two people keep stepping the same way to pass.';

if (ENTRY.length < 1 || ENTRY.length > 140 || !ENTRY.trim()) {
  console.error(`entry must be 1-140 characters, got ${ENTRY.length}`);
  process.exit(1);
}
if (ENTRY.includes('\n')) {
  console.error('entry must be a single line');
  process.exit(1);
}
// The coined word itself (before the dash) must be one token: a single
// word, no spaces, so the entry really is one word plus its definition.
const WORD = ENTRY.split(' \u2014 ')[0];
if (!WORD || /\s/.test(WORD)) {
  console.error('entry must start with a single coined word');
  process.exit(1);
}

// No trailing newline: the file is exactly the entry text.
mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), ENTRY);
console.log(`wrote ${ENTRY.length} chars to ${join(OUTPUT_DIR, 'entry.txt')}`);
