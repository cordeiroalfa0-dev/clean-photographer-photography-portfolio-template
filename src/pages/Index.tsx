import { useState, useEffect } from "react";
import { motion } from "motion/react";
import PortfolioHeader from "@/components/PortfolioHeader";
import PhotographerBio from "@/components/PhotographerBio";
import PortfolioFooter from "@/components/PortfolioFooter";
import MasonryGallery from "@/components/MasonryGallery";
import Lightbox from "@/components/Lightbox";
import Marquee from "@/components/Marquee";
import SEO from "@/components/SEO";
import { fetchMixedMedia } from "@/services/pexels";
import { AIChatAssistant } from "@/components/AIChatAssistant";
import { AISuggestions } from "@/components/AISuggestions";
import { AIImageGenerator } from "@/components/AIImageGenerator";

const Index = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [displayImages, setDisplayImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const activeCategory = "SELECTED";

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMixedMedia(activeCategory, 1, 20);
        setDisplayImages(data.items);
      } catch (err) {
        console.error('Erro ao carregar mídia:', err);
        setError('Falha ao carregar imagens. Por favor, tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Ink Studio",
    "jobTitle": "Estúdio de Tatuagem",
    "description": "Estúdio de tatuagem especializado em blackwork, fine line e realismo. Arte permanente que conta sua história.",
    "url": "https://inkstudio.com.br",
    "image": "https://inkstudio.com.br/og-image.jpg",
    "sameAs": ["https://instagram.com/inkstudio.tattoo"],
    "knowsAbout": ["Blackwork", "Fine Line", "Realismo", "Tatuagem Geométrica", "Dotwork"],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "São Paulo",
      "addressCountry": "BR"
    }
  };

  return (
    <>
      <SEO
        title="Ink Studio - Tatuagem Artística | Blackwork, Fine Line & Realismo"
        description="Estúdio de tatuagem especializado em blackwork, fine line e realismo. Arte permanente que conta sua história."
        canonicalUrl="/"
        ogType="website"
        jsonLd={jsonLd}
      />

      <PortfolioHeader activeCategory={activeCategory} />
      
      <main>
        <PhotographerBio />
        
        {/* Elegant marquee divider */}
        <Marquee text="Blackwork • Fine Line • Realismo • Geométrico • Dotwork • Ornamental" />

        {error && (
          <div className="text-center py-20">
            <p className="text-destructive">{error}</p>
          </div>
        )}

        {!error && displayImages.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Section title */}
            <div className="max-w-[1600px] mx-auto px-6 md:px-10 pt-20 pb-8">
              <motion.div 
                className="inline-flex items-center gap-3 glass-subtle px-6 py-3 rounded-full"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-xs uppercase tracking-[0.3em] text-primary font-display">Trabalhos Recentes</span>
              </motion.div>
            </div>
            
            <MasonryGallery
              images={displayImages}
              onImageClick={handleImageClick}
            />
          </motion.div>
        )}

        {!loading && !error && displayImages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Nenhuma imagem encontrada.</p>
          </div>
        )}

        {/* AI Suggestions Section */}
        <AISuggestions />

        {/* AI Image Generator */}
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-20 text-center">
          <motion.h2 
            className="text-display-md text-foreground text-glow-subtle mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Visualize sua Arte
          </motion.h2>
          <p className="text-muted-foreground mb-10">Use inteligência artificial para gerar conceitos de tatuagem</p>
          <AIImageGenerator />
        </div>
      </main>

      {lightboxOpen && displayImages.length > 0 && (
        <Lightbox
          images={displayImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      {/* AI Chat Assistant - floating */}
      <AIChatAssistant />

      <PortfolioFooter />
    </>
  );
};

export default Index;