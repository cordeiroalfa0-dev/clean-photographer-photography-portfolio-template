import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lightbulb, Loader2, RefreshCw, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Suggestion {
  title: string;
  description: string;
  style: string;
  placement: string;
}

const SUGGEST_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-suggest`;

export const AISuggestions: React.FC = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const fetchSuggestions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(SUGGEST_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ context: 'Sugira ideias criativas para tatuagens artísticas em blackwork, fine line ou realismo' }),
      });

      const data = await response.json();
      if (data.suggestions) {
        setSuggestions(data.suggestions);
        setHasLoaded(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial-purple pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mb-12">
          <motion.div 
            className="inline-flex items-center gap-3 glass-subtle px-6 py-3 rounded-full mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Palette className="w-5 h-5 text-primary" />
            <span className="text-sm uppercase tracking-[0.3em] text-primary font-display">Inteligência Artificial</span>
          </motion.div>
          
          <motion.h2 
            className="text-display-lg text-foreground text-glow-subtle mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Inspiração IA
          </motion.h2>
          
          <motion.p 
            className="text-muted-foreground max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Deixe a inteligência artificial sugerir ideias únicas para sua próxima tatuagem
          </motion.p>
        </div>

        {!hasLoaded && (
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Button 
              onClick={fetchSuggestions} 
              disabled={isLoading} 
              size="lg" 
              className="gap-3 bg-gradient-to-r from-primary to-accent hover:opacity-90 glow-purple animate-glow-pulse rounded-full px-8 py-6 text-base font-display"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Gerando ideias...
                </>
              ) : (
                <>
                  <Lightbulb className="w-5 h-5" />
                  Gerar Sugestões
                </>
              )}
            </Button>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="grid md:grid-cols-3 gap-6 mb-10">
                {suggestions.map((suggestion, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card rounded-2xl p-6 hover-lift group"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0 group-hover:glow-purple transition-all duration-300">
                        <Lightbulb className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-display text-lg text-foreground pt-1">{suggestion.title}</h3>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{suggestion.description}</p>
                    
                    <div className="space-y-2 pt-4 border-t border-border/30">
                      <div className="flex items-center gap-2">
                        <span className="text-xs uppercase tracking-wider text-accent">Estilo</span>
                        <span className="text-xs text-foreground/70">{suggestion.style}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs uppercase tracking-wider text-accent">Local</span>
                        <span className="text-xs text-foreground/70">{suggestion.placement}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center">
                <Button 
                  variant="outline" 
                  onClick={fetchSuggestions} 
                  disabled={isLoading} 
                  className="gap-3 glass-subtle border-primary/30 hover:border-primary hover:glow-purple rounded-full px-6"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}
                  Novas Sugestões
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
