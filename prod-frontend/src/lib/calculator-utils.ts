/**
 * calculator-utils.ts
 * Utility functions for price calculation logic.
 * Contains dummy price calculation that returns min/max range based on selections.
 */

interface WizardData {
  projectType: string;
  complexity: string;
  timeline: string;
  features: string[];
}

interface PriceRange {
  min: number;
  max: number;
}

export function getPriceRange(data: WizardData): PriceRange {
  let baseMin = 0;
  let baseMax = 0;
  
  // Base price by project type (reduced by 20%)
  switch (data.projectType) {
    case 'website':
      baseMin = 64000;
      baseMax = 120000;
      break;
    case 'webapp':
      baseMin = 160000;
      baseMax = 320000;
      break;
    case 'mobileapp':
      baseMin = 240000;
      baseMax = 480000;
      break;
    case 'chatbot':
      baseMin = 80000;
      baseMax = 160000;
      break;
    case 'ecommerce':
      baseMin = 200000;
      baseMax = 400000;
      break;
    default:
      baseMin = 80000;
      baseMax = 160000;
  }

  // Complexity multipliers
  const complexityMultipliers = {
    simple: { min: 0.8, max: 1.0 },
    medium: { min: 1.2, max: 1.5 },
    complex: { min: 2.0, max: 2.8 }
  };

  const complexityMult = complexityMultipliers[data.complexity as keyof typeof complexityMultipliers] || { min: 1, max: 1 };
  baseMin *= complexityMult.min;
  baseMax *= complexityMult.max;

  // Timeline multipliers (urgent reduced by 15% + additional 10%)
  const timelineMultipliers = {
    urgent: { min: 1.22, max: 1.53 }, // was 1.36, 1.7 - reduced by additional 10%
    normal: { min: 1.0, max: 1.0 },
    flexible: { min: 0.7, max: 0.9 }
  };

  const timelineMult = timelineMultipliers[data.timeline as keyof typeof timelineMultipliers] || { min: 1, max: 1 };
  baseMin *= timelineMult.min;
  baseMax *= timelineMult.max;

  // Additional features (reduced by 20%)
  const featurePrices = {
    content: { min: 20000, max: 40000 },
    seo: { min: 12000, max: 24000 },
    support: { min: 16000, max: 28000 },
    hosting: { min: 8000, max: 16000 }
  };

  data.features.forEach(featureId => {
    const featurePrice = featurePrices[featureId as keyof typeof featurePrices];
    if (featurePrice) {
      baseMin += featurePrice.min;
      baseMax += featurePrice.max;
    }
  });

  // Apply additional overall 10% reduction
  baseMin *= 0.9;
  baseMax *= 0.9;

  return {
    min: Math.round(baseMin / 10000) * 10000, // Round to nearest 10k
    max: Math.round(baseMax / 10000) * 10000  // Round to nearest 10k
  };
}