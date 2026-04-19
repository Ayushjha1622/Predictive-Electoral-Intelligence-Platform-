export const calculatePoW = (candidates) => {
  const totalScore = candidates.reduce((sum, c) => sum + (c.score || 0), 0);

  if (totalScore === 0) return candidates.map(c => ({ ...c, pow: 0 }));

  return candidates.map(c => ({
    ...c,
    pow: parseFloat(((c.score / totalScore) * 100).toFixed(2))
  }));
};
