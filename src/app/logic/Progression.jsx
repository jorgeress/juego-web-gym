export function applyTraining(character) {
  return {
    ...character,
    strength: character.strength + 0.1,
    endurance: character.endurance + 0.05,
    discipline: character.discipline + 0.02,
  };
}