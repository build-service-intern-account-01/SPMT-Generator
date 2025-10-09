import { SchemaType, PromptResult } from './types';

const TEMPLATES: Record<SchemaType, {
  role: string;
  objective: string;
  steps: string[];
  schema: string;
}> = {
  OPERATIONAL: {
    role: 'Ingénieur Système Senior',
    objective: 'Structurer l\'information selon le schéma OPÉRATIONNEL',
    steps: [
      'Diagnostiquer la cause racine à partir de la description de l\'incident',
      'Lister 3 à 5 actions correctives avec les résultats attendus',
      'Définir 2 tests de validation avec critères de succès',
      'Fournir une procédure de rollback minimale'
    ],
    schema: `{
  "diagnostic": "string - analyse de la cause racine",
  "actions": [
    {
      "etape": "number",
      "faire": "string - description de l'action",
      "attendu": "string - résultat attendu"
    }
  ],
  "tests": [
    {
      "cmd": "string - commande ou procédure de test",
      "succes": "string - critères de succès"
    }
  ],
  "rollback": ["string - étape de rollback"],
  "citations": ["string - référence ou source"],
  "hypotheses": ["string - hypothèse formulée"]
}`
  },
  CREATIVE: {
    role: 'Stratège Créatif Senior',
    objective: 'Structurer l\'information selon le schéma CRÉATIF',
    steps: [
      'Extraire le concept central et les thèmes principaux',
      'Développer 5 approches clés avec leur impact potentiel',
      'Générer 3 variantes créatives',
      'Identifier les prochaines étapes et les contraintes'
    ],
    schema: `{
  "concept": "string - concept créatif central",
  "developpement": [
    {
      "theme": "string - nom du thème",
      "approche": "string - description de l'approche",
      "potentiel": "string - impact potentiel"
    }
  ],
  "variantes": ["string - variante créative"],
  "prochaines_etapes": ["string - prochaine action"],
  "inspiration": ["string - source d'inspiration"],
  "contraintes": ["string - contrainte ou limitation"]
}`
  },
  ANALYTICAL: {
    role: 'Analyste de Données Senior',
    objective: 'Structurer l\'information selon le schéma ANALYTIQUE',
    steps: [
      'Synthétiser les principales découvertes à partir des données',
      'Lister 3 à 5 insights significatifs avec niveaux de confiance',
      'Compiler les preuves à l\'appui',
      'Énoncer les conclusions et les limites'
    ],
    schema: `{
  "synthese": "string - résumé exécutif",
  "decouvertes": [
    {
      "decouverte": "string - découverte clé",
      "importance": "string - pourquoi c'est important",
      "confiance": "string - niveau de confiance"
    }
  ],
  "preuves": ["string - preuve à l'appui"],
  "conclusions": ["string - conclusion"],
  "limites": ["string - limitation ou mise en garde"],
  "sources": ["string - source de données"]
}`
  },
  CONVERSATIONAL: {
    role: 'Consultant Expert et Conseiller',
    objective: 'Structurer l\'information selon le schéma CONVERSATIONNEL',
    steps: [
      'Démontrer la compréhension de la requête',
      'Présenter plusieurs perspectives avec justification',
      'Fournir des recommandations actionnables',
      'Lister les considérations et les questions de suivi'
    ],
    schema: `{
  "comprehension": "string - reformulation de la compréhension de la requête",
  "perspectives": [
    {
      "point_de_vue": "string - nom de la perspective",
      "justification": "string - raisonnement"
    }
  ],
  "recommandations": ["string - recommandation actionnable"],
  "considerations": ["string - considération importante"],
  "questions": ["string - question de suivi"],
  "ressources": ["string - ressource utile"]
}`
  }
};

function formatPrompt(type: SchemaType, userInput: string): string {
  const template = TEMPLATES[type];

  const stepsFormatted = template.steps
    .map((step, index) => `${index + 1}. ${step}`)
    .join('\n');

  return `RÔLE : ${template.role} avec 25+ ans d'expérience

OBJECTIF : ${template.objective}

ENTRÉE : ${userInput}

CONTRAINTES : La sortie doit être uniquement du JSON valide, sans texte explicatif

ÉTAPES :
${stepsFormatted}

SCHÉMA JSON ATTENDU :
${template.schema}`;
}

export function generatePrompt(
  type: SchemaType,
  userInput: string,
  confidence: number
): PromptResult {
  const prompt = formatPrompt(type, userInput);

  const typeLabels: Record<SchemaType, string> = {
    OPERATIONAL: 'opérationnel',
    CREATIVE: 'créatif',
    ANALYTICAL: 'analytique',
    CONVERSATIONAL: 'conversationnel'
  };

  const schema_used = `Schéma ${typeLabels[type].toUpperCase()} avec champs appropriés pour du contenu ${typeLabels[type]}`;
  const rationale = `Texte classifié comme ${typeLabels[type].toUpperCase()} avec ${confidence || 100}% de confiance basé sur l'analyse de mots-clés. Cette classification a été déterminée en identifiant des patterns de contenu typiques des contextes ${typeLabels[type]}s.`;

  return {
    type,
    prompt,
    schema_used,
    rationale
  };
}
