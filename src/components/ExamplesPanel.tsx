import { Book, ArrowRight } from 'lucide-react';
import { EXAMPLES } from '../utils/examples';
import { SchemaType } from '../utils/types';

interface ExamplesPanelProps {
  onLoadExample: (text: string) => void;
}

const TYPE_EMOJI: Record<SchemaType, string> = {
  OPERATIONAL: '🔧',
  CREATIVE: '🎨',
  ANALYTICAL: '📊',
  CONVERSATIONAL: '💬'
};

export function ExamplesPanel({ onLoadExample }: ExamplesPanelProps) {
  return (
    <div className="mt-8 bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-xl border border-white/20">
      <h2 className="text-2xl font-semibold text-slate-100 mb-5 flex items-center gap-2">
        <Book size={24} />
        📚 Exemples
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {EXAMPLES.map((example) => (
          <div
            key={example.id}
            className="bg-slate-800/40 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-all hover:shadow-lg"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-base font-semibold text-slate-200 flex items-center gap-2">
                <span>{TYPE_EMOJI[example.type]}</span>
                {example.title}
              </h3>
            </div>

            <p className="text-sm text-slate-400 mb-3 line-clamp-2">
              {example.description}
            </p>

            <button
              onClick={() => onLoadExample(example.text)}
              className="text-sm text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 transition-colors group"
            >
              Charger cet exemple
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
