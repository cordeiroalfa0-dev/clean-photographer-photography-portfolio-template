import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lightbulb, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Suggestion {
  title: string;
  description: string;
  mood: string;
  colors: string;
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
        body: JSON.stringify({ context: 'Sugira ideias criativas para ensaios fotográficos glamour e sensuais' }),
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
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-light tracking-wider mb-4">
            <Lightbulb className="w-8 h-8 inline-block mr-3 text-primary" />
            Inspiração IA
          </h2>
          <p className="text-muted-foreground">Deixe a inteligência artificial sugerir ideias únicas para seu próximo ensaio</p>
        </div>

        {!hasLoaded && (
          <div className="text-center">
            <Button onClick={fetchSuggestions} disabled={isLoading} size="lg" className="gap-2">
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
          </div>
        )}

        <AnimatePresence mode="wait">
          {suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {suggestions.map((suggestion, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg">{suggestion.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                        <div className="space-y-1 text-xs">
                          <p><span className="font-medium">Mood:</span> {suggestion.mood}</p>
                          <p><span className="font-medium">Cores:</span> {suggestion.colors}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="text-center">
                <Button variant="outline" onClick={fetchSuggestions} disabled={isLoading} className="gap-2">
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
    </div>
  );
};
