import { Copy, Check, ChevronDown, ChevronUp, Wand2 } from 'lucide-react';
import { useState } from 'react';
import { SchemaType } from '../utils/types';

interface JsonOutputProps {
  outputJson: string;
  detectedType: SchemaType | '';
  confidence: number;
  rationale: string;
  schemaUsed: string;
  isGenerating: boolean;
  onCopy: () => void;
  isCopied: boolean;
}

const TYPE_CONFIG: Record<SchemaType, { label: string; color: string; emoji: string }> = {
  OPERATIONAL: { label: 'Opérationnel', color: 'bg-blue-500', emoji: '🔧' },
  CREATIVE: { label: 'Créatif', color: 'bg-purple-500', emoji: '🎨' },
  ANALYTICAL: { label: 'Analytique', color: 'bg-emerald-500', emoji: '📊' },
  CONVERSATIONAL: { label: 'Conversationnel', color: 'bg-amber-500', emoji: '💬' }
};

function JsonHighlight({ json }: { json: string }) {
  const highlightJson = (jsonString: string): JSX.Element[] => {
    const lines = jsonString.split('\n');

    return lines.map((line, index) => {
      const parts: JSX.Element[] = [];
      let remaining = line;

      const keyMatch = line.match(/"([^"]+)":/);
      if (keyMatch) {
        const keyIndex = line.indexOf(keyMatch[0]);
        if (keyIndex > 0) {
          parts.push(
            <span key="indent" className="text-slate-400">
              {line.substring(0, keyIndex)}
            </span>
          );
        }
        parts.push(
          <span key="key" className="text-blue-400">
            {keyMatch[0]}
          </span>
        );
        remaining = line.substring(keyIndex + keyMatch[0].length);
      } else {
        remaining = line;
      }

      const stringMatch = remaining.match(/: "([^"]*)"/);
      if (stringMatch) {
        const beforeString = remaining.substring(0, remaining.indexOf(stringMatch[0]) + 2);
        parts.push(
          <span key="before" className="text-slate-400">
            {beforeString}
          </span>
        );
        parts.push(
          <span key="string" className="text-emerald-400">
            {stringMatch[1]}
          </span>
        );
        const afterString = remaining.substring(
          remaining.indexOf(stringMatch[0]) + stringMatch[0].length
        );
        parts.push(
          <span key="after" className="text-slate-400">
            "{afterString}
          </span>
        );
      } else {
        const numberMatch = remaining.match(/: (-?\d+\.?\d*)/);
        const booleanMatch = remaining.match(/: (true|false)/);

        if (numberMatch) {
          const beforeNum = remaining.substring(0, remaining.indexOf(numberMatch[0]) + 2);
          parts.push(
            <span key="before" className="text-slate-400">
              {beforeNum}
            </span>
          );
          parts.push(
            <span key="number" className="text-amber-400">
              {numberMatch[1]}
            </span>
          );
          const afterNum = remaining.substring(
            remaining.indexOf(numberMatch[0]) + numberMatch[0].length
          );
          parts.push(
            <span key="after" className="text-slate-400">
              {afterNum}
            </span>
          );
        } else if (booleanMatch) {
          const beforeBool = remaining.substring(0, remaining.indexOf(booleanMatch[0]) + 2);
          parts.push(
            <span key="before" className="text-slate-400">
              {beforeBool}
            </span>
          );
          parts.push(
            <span key="boolean" className="text-purple-400">
              {booleanMatch[1]}
            </span>
          );
          const afterBool = remaining.substring(
            remaining.indexOf(booleanMatch[0]) + booleanMatch[0].length
          );
          parts.push(
            <span key="after" className="text-slate-400">
              {afterBool}
            </span>
          );
        } else {
          parts.push(
            <span key="remaining" className="text-slate-400">
              {remaining}
            </span>
          );
        }
      }

      return (
        <div key={index}>
          {parts.length > 0 ? parts : <span className="text-slate-400">{line}</span>}
        </div>
      );
    });
  };

  return <div className="text-sm font-mono">{highlightJson(json)}</div>;
}

export function JsonOutput({
  outputJson,
  detectedType,
  confidence,
  rationale,
  schemaUsed,
  isGenerating,
  onCopy,
  isCopied
}: JsonOutputProps) {
  const [showExplanation, setShowExplanation] = useState(false);

  const typeInfo = detectedType ? TYPE_CONFIG[detectedType] : null;

  return (
    <div
      id="output-section"
      className="bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-xl border border-white/20"
    >
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <h2 className="text-2xl font-semibold text-slate-100 flex items-center gap-2">
          <span>✨</span>
          Prompt JSON Généré
        </h2>
        {outputJson && (
          <button
            onClick={onCopy}
            className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-slate-100 font-medium py-2 px-4 rounded-md transition-all duration-200 text-sm shadow-lg"
          >
            {isCopied ? (
              <>
                <Check size={16} />
                ✅ Copié !
              </>
            ) : (
              <>
                <Copy size={16} />
                📋 Copier JSON
              </>
            )}
          </button>
        )}
      </div>

      {typeInfo && (
        <div className="mb-4 flex items-center gap-3 flex-wrap">
          <span
            className={`inline-flex items-center gap-2 ${typeInfo.color} text-white text-sm font-semibold px-4 py-2 rounded-md shadow-md`}
          >
            <span>{typeInfo.emoji}</span>
            {typeInfo.label}
          </span>
          <span className="text-sm text-slate-300 font-medium bg-slate-700/50 px-3 py-1 rounded-md">
            {confidence}% confiance
          </span>
        </div>
      )}

      <div className="bg-slate-800/50 rounded-md p-4 min-h-[400px] max-h-[600px] overflow-auto border border-slate-700">
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center h-[400px] text-slate-400">
            <div className="animate-pulse mb-4">
              <Wand2 size={48} className="text-blue-400" />
            </div>
            <p className="text-lg font-medium">Analyse en cours...</p>
            <p className="text-sm text-slate-500 mt-2">Classification du contenu</p>
          </div>
        ) : outputJson ? (
          <JsonHighlight json={outputJson} />
        ) : (
          <div className="flex items-center justify-center h-[400px] text-slate-500">
            <div className="text-center">
              <p className="text-lg">Le JSON généré apparaîtra ici</p>
              <p className="text-sm mt-2 text-slate-600">
                Entrez du texte et cliquez sur "Générer Prompt"
              </p>
            </div>
          </div>
        )}
      </div>

      {outputJson && (
        <div className="mt-4">
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="flex items-center gap-2 text-slate-300 hover:text-slate-100 transition-colors text-sm font-medium bg-slate-700/30 px-4 py-2 rounded-md hover:bg-slate-700/50"
          >
            {showExplanation ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            💡 Explication de la classification
          </button>

          {showExplanation && (
            <div className="mt-3 bg-slate-800/30 rounded-md p-5 border border-slate-700 space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
                  <span>🔍</span>
                  Justification
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">{rationale}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
                  <span>📋</span>
                  Schéma Utilisé
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">{schemaUsed}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
