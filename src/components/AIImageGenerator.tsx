import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wand2, Loader2, Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

const GENERATE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-generate-image`;

export const AIImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      const response = await fetch(GENERATE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao gerar imagem');
      }

      if (data.imageUrl) {
        setGeneratedImage(data.imageUrl);
        toast.success('Imagem gerada com sucesso!');
      } else {
        toast.error('Não foi possível gerar a imagem');
      }
    } catch (error) {
      console.error(error);
      toast.error('Erro ao gerar imagem');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `tatuagens-style-ai-${Date.now()}.png`;
    link.click();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-3 bg-gradient-to-r from-primary to-accent hover:opacity-90 glow-purple rounded-full px-8 py-6 text-base font-display">
          <Wand2 className="w-5 h-5" />
          Gerar com IA
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] glass-card border-border/30 rounded-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 font-display text-xl">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-purple">
              <Wand2 className="w-5 h-5 text-primary-foreground" />
            </div>
            Gerador de Tatuagens IA
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 pt-4">
          <div className="flex gap-3">
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Descreva a tatuagem que deseja visualizar..."
              disabled={isGenerating}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              className="bg-graphite-800/50 border-border/30 rounded-xl"
            />
            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating || !prompt.trim()}
              className="rounded-xl bg-gradient-to-br from-primary to-accent glow-purple"
            >
              {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
            </Button>
          </div>

          <div className="text-xs text-muted-foreground glass-subtle rounded-xl p-4">
            <span className="text-primary font-medium">Sugestões:</span> lobo geométrico minimalista, flores em fine line, caveira blackwork com mandala, fênix em realismo
          </div>

          <AnimatePresence mode="wait">
            {isGenerating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="aspect-square glass-subtle rounded-2xl flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4 animate-glow-pulse">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Criando sua obra de arte...</p>
                </div>
              </motion.div>
            )}

            {generatedImage && !isGenerating && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative"
              >
                <div className="rounded-2xl overflow-hidden glow-purple border border-border/30">
                  <img
                    src={generatedImage}
                    alt="Imagem gerada por IA"
                    className="w-full rounded-2xl"
                  />
                </div>
                <div className="absolute top-3 right-3 flex gap-2">
                  <Button 
                    size="icon" 
                    onClick={handleDownload}
                    className="rounded-xl glass bg-graphite-900/80 hover:bg-graphite-800"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    onClick={() => setGeneratedImage(null)}
                    className="rounded-xl glass bg-graphite-900/80 hover:bg-graphite-800"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};
