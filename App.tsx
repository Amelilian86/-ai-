
import React, { useState, useCallback } from 'react';
import { AnalysisInput } from './types.ts';
import InputForm from './components/InputForm.tsx';
import MemoOutput from './components/MemoOutput.tsx';
import { generateInvestmentMemo } from './services/geminiService.ts';
import { APP_TITLE, APP_SUBTITLE } from './constants.tsx';

const App: React.FC = () => {
  const [input, setInput] = useState<AnalysisInput>({
    taskType: 'Equity Analysis',
    contextText: '',
    resultText: '',
    extractedMetricsJson: ''
  });
  
  const [memo, setMemo] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = useCallback((field: keyof AnalysisInput, value: string) => {
    setInput(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const generatedMemo = await generateInvestmentMemo(input);
      setMemo(generatedMemo);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during memo generation.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="bg-slate-900 text-white py-4 px-6 shadow-md z-10 sticky top-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl shadow-lg">
              Stat
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">{APP_TITLE}</h1>
              <p className="text-xs text-slate-400 font-medium">{APP_SUBTITLE}</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center space-x-4 text-xs font-semibold text-slate-400 uppercase tracking-widest">
            <span>Market Neutral</span>
            <span>•</span>
            <span>Risk Adjusted</span>
            <span>•</span>
            <span>Compliant</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Sidebar: Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-800 flex items-start space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p>
              粘贴您的统计输出（Sharpe、Alpha、R²等），生成符合 CFA 标准的专业、无偏见买方备忘录。
            </p>
          </div>

          <InputForm
            input={input}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
            isLoading={loading}
          />

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 animate-pulse">
              <strong>Error:</strong> {error}
            </div>
          )}
        </div>

        {/* Right Sidebar: Output */}
        <div className="lg:col-span-3">
          <MemoOutput content={memo} />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-6 bg-white border-t border-slate-200 text-center text-slate-500 text-xs">
        <p>© {new Date().getFullYear()} {APP_TITLE}. Educational purposes only. Not financial advice.</p>
      </footer>
    </div>
  );
};

export default App;
