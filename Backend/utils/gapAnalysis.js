export const analyzeGaps = (candidates) => {
  const factors = [
    { key: "partyStrength", label: "Party Organization" },
    { key: "pastWork", label: "Track Record" },
    { key: "personalBase", label: "Personal Base" },
    { key: "casteBase", label: "Demographic (Caste) Base" },
    { key: "religiousBase", label: "Demographic (Religious) Base" },
    { key: "sentiment", label: "Public Sentiment" }
  ];

  return candidates.map(c => {
    const gaps = [];

    factors.forEach(f => {
      const val = c[f.key] || 0;
      if (val < 3) {
        gaps.push(`${f.key} is critical`);
      } else if (val < 5) {
        gaps.push(`${f.key} is weak`);
      }
    });

    if (c.incumbency === "high") {
      gaps.push("incumbency is critical");
    }

    return {
      name: c.name,
      gaps
    };
  });
};
