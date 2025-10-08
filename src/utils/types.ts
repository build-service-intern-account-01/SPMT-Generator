export type SchemaType = 'OPERATIONAL' | 'CREATIVE' | 'ANALYTICAL' | 'CONVERSATIONAL';

export interface DetectionResult {
  type: SchemaType;
  confidence: number;
  scores: Record<SchemaType, number>;
}

export interface PromptResult {
  type: SchemaType;
  prompt: string;
  schema_used: string;
  rationale: string;
}

export interface Example {
  id: string;
  title: string;
  type: SchemaType;
  text: string;
  description: string;
}
