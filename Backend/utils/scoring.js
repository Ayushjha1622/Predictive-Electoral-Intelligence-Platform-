export const weights = {
  incumbency: 0.15,
  partyStrength: 0.2,
  pastWork: 0.2,
  personalBase: 0.15,
  casteBase: 0.1,
  religiousBase: 0.1,
  sentiment: 0.1
};

// convert incumbency to score
// High incumbency usually means "anti-incumbency" risk, so we score it lower
const incumbencyScore = (val) => {
  if (val === "high") return 3;     
  if (val === "medium") return 6;
  return 9; // favorable / low incumbency risk
};

export const calculateScore = (c) => {
  const iScore = incumbencyScore(c.incumbency);
  
  return (
    iScore * weights.incumbency +
    (c.partyStrength || 5) * weights.partyStrength +
    (c.pastWork || 5) * weights.pastWork +
    (c.personalBase || 5) * weights.personalBase +
    (c.casteBase || 5) * weights.casteBase +
    (c.religiousBase || 5) * weights.religiousBase +
    (c.sentiment || 5) * weights.sentiment
  );
};
