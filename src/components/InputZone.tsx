import { FileText, Wand2, Trash2 } from 'lucide-react';
import { useEffect } from 'react';

interface InputZoneProps {
  inputText: string;
  setInputText: (text: string) => void;
  onGenerate: () => void;
  onClear: () => void;
  onLoadExample: () => void;
  isGenerating: boolean;
}

export function InputZone({
  inputText,
  setInputText,
  onGenerate,
  onClear,
  onLoadExample,
  isGenerating
}: InputZoneProps) {
  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;

  let validationMessage = '';
  let validationClass = '';

  if (wordCount > 0 && wordCount < 20) {
    validationMessage = '⚠️ Texte trop court (minimum 20 mots)';
    validationClass = 'text-red-400';
  } else if (wordCount > 5000) {
    validationMessage = '⚠️ Texte très long, traitement possible lent';
    validationClass = 'text-amber-400';
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (wordCount >= 20) {
          onGenerate();
        }
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [wordCount, onGenerate, onClear]);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-xl border border-white/20">
      <h2 className="text-2xl font-semibold text-slate-100 mb-4 flex items-center gap-2">
        <span>📝</span>
        Texte Brut
      </h2>

      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Collez votre texte brut, notes, idées désordonnées ici... (100–1000 mots recommandés)"
        className="w-full min-h-[400px] bg-slate-800/50 text-slate-100 rounded-md p-4 font-normal text-base border border-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-y transition-all"
      />

      <div className="mt-3 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-slate-400 font-medium">
            {wordCount} mots
          </span>
          {validationMessage && (
            <span className={`text-xs font-medium ${validationClass}`}>
              {validationMessage}
            </span>
          )}
        </div>
        <button
          onClick={onLoadExample}
          className="text-sm text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1.5 font-medium"
        >
          <FileText size={14} />
          💡 Charger Exemple
        </button>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={onGenerate}
          disabled={isGenerating || wordCount < 20}
          className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-md transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/50"
        >
          <Wand2 size={20} />
          {isGenerating ? 'Génération en cours...' : '🧠 Générer Prompt'}
        </button>
        <button
          onClick={onClear}
          className="bg-slate-700 hover:bg-slate-600 text-slate-100 font-semibold py-3 px-6 rounded-md transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
        >
          <Trash2 size={18} />
          🗑️ Effacer
        </button>
      </div>

      <div className="mt-4 text-xs text-slate-500 font-mono">
        Raccourcis : Ctrl/Cmd + Entrée (générer) • Ctrl/Cmd + K (effacer)
      </div>
    </div>
  );
}
