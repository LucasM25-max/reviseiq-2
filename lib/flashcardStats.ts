import type { CardProgress, Flashcard } from "./types";
import { isDue } from "./spacedRepetition";

export interface DeckStats {
  total: number;
  due: number;
  newCount: number;
}

export function deckStats(cards: Flashcard[], progress: Record<string, CardProgress>): DeckStats {
  let due = 0;
  let newCount = 0;
  for (const card of cards) {
    const p = progress[card.id];
    if (!p) newCount += 1;
    else if (isDue(p)) due += 1;
  }
  return { total: cards.length, due, newCount };
}
