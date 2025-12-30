
import React from 'react';
import { AnalysisInput, TaskType } from '../types';
import { TASK_TYPES } from '../constants';

interface InputFormProps {
  input: AnalysisInput;
  onChange: (field: keyof AnalysisInput, value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ input, onChange, onSubmit, isLoading }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700">Task Type</label>
        <select
          value={input.taskType}
          onChange={(e) => onChange('taskType', e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
        >
          {TASK_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700">Investment Context</label>
        <p className="text-xs text-slate-500 italic">Describe the asset class, strategy, or specific hypothesis.</p>
        <textarea
          value={input.contextText}
          onChange={(e) => onChange('contextText', e.target.value)}
          placeholder="e.g. Long-only value strategy focusing on small-cap tech..."
          className="w-full h-24 rounded-lg border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700">Raw Quant/Stats Output</label>
        <p className="text-xs text-slate-500 italic">Paste regression tables, backtest summaries, or raw logs.</p>
        <textarea
          value={input.resultText}
          onChange={(e) => onChange('resultText', e.target.value)}
          placeholder="R-Squared: 0.85, Sharpe: 1.2, Max Drawdown: -15%..."
          className="w-full h-48 rounded-lg border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm transition-all"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700">Structured Metrics (JSON - Optional)</label>
        <textarea
          value={input.extractedMetricsJson}
          onChange={(e) => onChange('extractedMetricsJson', e.target.value)}
          placeholder='{"sharpe": 1.2, "vol": 0.15}'
          className="w-full h-20 rounded-lg border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none font-mono text-xs transition-all"
        />
      </div>

      <button
        onClick={onSubmit}
        disabled={isLoading || !input.resultText.trim()}
        className={`w-full py-3 rounded-lg font-bold text-white transition-all transform active:scale-95 ${
          isLoading || !input.resultText.trim()
            ? 'bg-slate-300 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200'
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center space-x-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Drafting Memo...</span>
          </span>
        ) : 'Draft Investment Memo'}
      </button>
    </div>
  );
};

export default InputForm;
