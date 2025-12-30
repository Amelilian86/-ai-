
export type TaskType = 'Equity Analysis' | 'Fixed Income' | 'Macro Strategy' | 'Alternative Investments' | 'Risk Assessment';

export interface AnalysisInput {
  taskType: TaskType;
  contextText: string;
  resultText: string;
  extractedMetricsJson: string;
}

export interface MemoResponse {
  content: string;
  missingInfo: string[];
}
