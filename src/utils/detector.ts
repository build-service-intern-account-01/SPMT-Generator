import { SchemaType, DetectionResult } from './types';

const KEYWORDS: Record<SchemaType, string[]> = {
  OPERATIONAL: [
    'erreur', 'bug', 'incident', 'test', 'procédure', 'rollback', 'serveur',
    'api', 'crash', 'debug', 'déploiement', 'monitoring', 'log', 'alerte',
    'timeout', 'latence', 'performance', 'système', 'panne', 'maintenance'
  ],
  CREATIVE: [
    'idée', 'concept', 'design', 'marketing', 'brainstorm', 'campagne',
    'créatif', 'innovation', 'prototype', 'ux', 'branding', 'storytelling',
    'visuel', 'audience', 'engagement', 'inspiration', 'artistique', 'imaginatif'
  ],
  ANALYTICAL: [
    'analyse', 'données', 'étude', 'rapport', 'statistique', 'recherche',
    'synthèse', 'conclusion', 'tendance', 'métrique', 'insight', 'corrélation',
    'hypothèse', 'résultat', 'mesure', 'indicateur', 'observation', 'diagnostic'
  ],
  CONVERSATIONAL: [
    'conseil', 'question', 'discussion', 'opinion', 'perspective',
    'recommandation', 'explorer', 'échanger', 'réflexion', 'feedback',
    'suggestion', 'expérience', 'apprentissage', 'dialogue', 'avis', 'aide'
  ]
};

export function detectContentType(text: string): DetectionResult {
  const lowerText = text.toLowerCase();
  const scores: Record<SchemaType, number> = {
    OPERATIONAL: 0,
    CREATIVE: 0,
    ANALYTICAL: 0,
    CONVERSATIONAL: 0
  };

  (Object.keys(KEYWORDS) as SchemaType[]).forEach((category) => {
    const keywords = KEYWORDS[category];
    let matches = 0;

    keywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      const count = (lowerText.match(regex) || []).length;
      matches += count;
    });

    scores[category] = matches / keywords.length;
  });

  let maxScore = 0;
  let detectedType: SchemaType = 'CONVERSATIONAL';

  (Object.keys(scores) as SchemaType[]).forEach((category) => {
    if (scores[category] > maxScore) {
      maxScore = scores[category];
      detectedType = category;
    }
  });

  const confidence = Math.min(Math.round(maxScore * 100 * 10), 100);

  return {
    type: detectedType,
    confidence,
    scores
  };
}
