import { useState } from 'react';
import { Header } from './components/Header';
import { InputZone } from './components/InputZone';
import { JsonOutput } from './components/JsonOutput';
import { ExamplesPanel } from './components/ExamplesPanel';
import { Footer } from './components/Footer';
import { detectContentType } from './utils/detector';
import { generatePrompt } from './utils/templates';
import { EXAMPLES } from './utils/examples';
import { SchemaType } from './utils/types';

function App() {
  const [inputText, setInputText] = useState('');
  const [outputJson, setOutputJson] = useState('');
  const [detectedType, setDetectedType] = useState<SchemaType | ''>('');
  const [confidence, setConfidence] = useState(0);
  const [rationale, setRationale] = useState('');
  const [schemaUsed, setSchemaUsed] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    const wordCount = inputText.trim().split(/\s+/).length;
    if (wordCount < 20) return;

    setIsGenerating(true);

    setTimeout(() => {
      const detection = detectContentType(inputText);
      const generated = generatePrompt(detection.type, inputText, detection.confidence);

      setDetectedType(generated.type);
      setConfidence(detection.confidence);
      setRationale(generated.rationale);
      setSchemaUsed(generated.schema_used);

      const output = {
        type: generated.type,
        prompt: generated.prompt,
        schema_used: generated.schema_used,
        rationale: generated.rationale
      };

      setOutputJson(JSON.stringify(output, null, 2));
      setIsGenerating(false);

      setTimeout(() => {
        document.getElementById('output-section')?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }, 100);
    }, 600);
  };

  const handleClear = () => {
    setInputText('');
    setOutputJson('');
    setDetectedType('');
    setConfidence(0);
    setRationale('');
    setSchemaUsed('');
  };

  const handleLoadExample = () => {
    const randomExample = EXAMPLES[Math.floor(Math.random() * EXAMPLES.length)];
    setInputText(randomExample.text);
  };

  const handleLoadSpecificExample = (text: string) => {
    setInputText(text);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputJson);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-violet-900 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InputZone
            inputText={inputText}
            setInputText={setInputText}
            onGenerate={handleGenerate}
            onClear={handleClear}
            onLoadExample={handleLoadExample}
            isGenerating={isGenerating}
          />

          <JsonOutput
            outputJson={outputJson}
            detectedType={detectedType}
            confidence={confidence}
            rationale={rationale}
            schemaUsed={schemaUsed}
            isGenerating={isGenerating}
            onCopy={handleCopy}
            isCopied={isCopied}
          />
        </div>

        <ExamplesPanel onLoadExample={handleLoadSpecificExample} />

        <Footer />
      </div>
    </div>
  );
}

export default App;
