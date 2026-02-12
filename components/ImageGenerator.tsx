
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

type ImageSize = '1K' | '2K' | '4K';

export const ImageGenerator: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<ImageSize>('1K');
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      // Check for API key selection as per Veo/Gemini 3 Pro rules
      if (!(await (window as any).aistudio.hasSelectedApiKey())) {
        await (window as any).aistudio.openSelectKey();
        // Assuming key selection was successful as per instructions
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const prompt = "A high-end, elegant workspace scene featuring a modern laptop on a clean desk. The laptop screen displays a sophisticated software modal titled 'New Movement' with complex multi-currency payment forms, data tables, and a unified dashboard interface. Cinematic soft lighting, shallow depth of field, minimalist professional environment, 8k resolution, highly detailed UI.";

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: "16:9",
            imageSize: selectedSize
          }
        },
      });

      let foundImage = false;
      if (response.candidates && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const base64Data = part.inlineData.data;
            setGeneratedImage(`data:image/png;base64,${base64Data}`);
            foundImage = true;
            break;
          }
        }
      }

      if (!foundImage) {
        setError("Model generated text but no image. Please try again.");
      }
    } catch (err: any) {
      console.error(err);
      if (err.message?.includes("Requested entity was not found")) {
        setError("API Key error. Please re-select your key.");
        await (window as any).aistudio.openSelectKey();
      } else {
        setError("Generation failed. Please ensure you have a valid paid API key selected.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full bg-white/40 backdrop-blur-xl border border-white/60 rounded-[40px] p-8 md:p-12 shadow-2xl mt-20 overflow-hidden relative group">
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white shadow-lg">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v8m0 0l-3-3m3 3l3-3M5 12a7 7 0 1014 0 7 7 0 00-14 0z"/></svg>
          </div>
          <h3 className="text-2xl font-serif font-bold tracking-tight">AI Scene Generator</h3>
        </div>

        <p className="text-gray-500 text-sm max-w-lg text-center mb-10 leading-relaxed">
          Generate a custom 3D environmental mockup of the <span className="text-black font-semibold">Claim Movement</span> modal. Powered by Gemini 3 Pro.
        </p>

        {/* Controls */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-12 bg-white/50 p-4 rounded-3xl border border-black/5">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">Resolution:</span>
            <div className="flex bg-stone-100 p-1 rounded-xl">
              {(['1K', '2K', '4K'] as ImageSize[]).map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all ${selectedSize === size ? 'bg-black text-white shadow-md' : 'text-stone-400 hover:text-black'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          <div className="w-px h-6 bg-black/10 hidden md:block"></div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className={`
              relative px-8 py-3 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] transition-all
              ${isGenerating 
                ? 'bg-stone-200 text-stone-400 cursor-not-allowed' 
                : 'bg-black text-white hover:scale-105 hover:shadow-xl active:scale-95'}
            `}
          >
            {isGenerating ? 'Synthesizing...' : 'Generate Mockup'}
          </button>
        </div>

        {/* Display */}
        <div className="w-full aspect-[16/9] bg-stone-100 rounded-[32px] overflow-hidden relative border border-black/5 shadow-inner">
          {generatedImage ? (
            <img src={generatedImage} alt="Generated Mockup" className="w-full h-full object-cover animate-fade-in" />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center opacity-40">
              {isGenerating ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-black/10 border-t-black rounded-full animate-spin"></div>
                  <span className="text-xs font-bold uppercase tracking-widest">Rendering Environment...</span>
                </div>
              ) : (
                <>
                  <svg className="w-16 h-16 mb-6 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <p className="text-xs font-bold uppercase tracking-widest max-w-[200px]">Waiting for generation signal</p>
                </>
              )}
            </div>
          )}
          
          {error && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-[11px] font-bold animate-shake">
              {error}
            </div>
          )}
        </div>
        
        <div className="mt-8 text-[9px] text-stone-400 font-mono uppercase tracking-[0.3em]">
           Model: Gemini-3-Pro-Image-Preview // AI_ASSISTED_VISUALS
        </div>
      </div>
      
      {/* Decorative grain */}
      <div className="absolute inset-0 opacity-5 mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/p6.png')]"></div>
    </div>
  );
};
