import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import PortfolioHeader from "@/components/PortfolioHeader";
import PhotographerBio from "@/components/PhotographerBio";
import PortfolioFooter from "@/components/PortfolioFooter";
import MasonryGallery from "@/components/MasonryGallery";
import Lightbox from "@/components/Lightbox";
import SEO from "@/components/SEO";
import { fetchMixedMedia } from "@/services/pexels";

const validCategories = ['selected', 'commissioned', 'editorial', 'personal', 'all'];

const CategoryGallery = () => {
  const { category } = useParams<{ category: string }>();
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [page, setPage] = useState(1);

  // Validate category
  if (!category || !validCategories.includes(category.toLowerCase())) {
    return <Navigate to="/" replace />;
  }

  const categoryUpper = category.toUpperCase();

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMixedMedia(categoryUpper, page, 20);
        setImages(data.items);
      } catch (err) {
        console.error('Erro ao carregar mídia:', err);
        setError('Falha ao carregar imagens. Por favor, tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [categoryUpper, page]);

  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const getCategoryTitle = (cat: string) => {
    const titles: Record<string, string> = {
      'selected': 'Trabalhos Selecionados',
      'commissioned': 'Projetos Encomendados',
      'editorial': 'Fotografia Editorial',
      'personal': 'Projetos Pessoais',
      'all': 'Toda a Fotografia'
    };
    return titles[cat] || 'Galeria';
  };

  const getCategoryDescription = (cat: string) => {
    const descriptions: Record<string, string> = {
      'selected': 'Seleção curada de campanhas de moda de luxo e trabalhos editoriais de alto padrão, apresentando minimalismo contemporâneo e elegância atemporal.',
      'commissioned': 'Campanhas comerciais de moda para marcas de luxo, apresentando fotografia de produto com estética clean e execução profissional.',
      'editorial': 'Fotografia editorial de moda para publicações de destaque, combinando visão artística com excelência comercial.',
      'personal': 'Projetos pessoais artísticos explorando fotografia em preto e branco, retratos íntimos e experimentação criativa.',
      'all': 'Portfólio completo abrangendo campanhas de moda, trabalhos editoriais e projetos pessoais com uma estética minimalista distintiva.'
    };
    return descriptions[cat] || 'Explore a coleção';
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${getCategoryTitle(category)} - Maria Silva`,
    "description": getCategoryDescription(category),
    "url": `https://mariasilva.com.br/category/${category}`,
    "creator": {
      "@type": "Person",
      "name": "Maria Silva"
    }
  };

  return (
    <>
      <SEO
        title={`${getCategoryTitle(category)} - Maria Silva`}
        description={getCategoryDescription(category)}
        canonicalUrl={`/category/${category}`}
        jsonLd={jsonLd}
      />

      <PortfolioHeader
        activeCategory={categoryUpper}
      />

      <main>
        <PhotographerBio />

        {error && (
          <div className="text-center py-20">
            <p className="text-destructive">{error}</p>
          </div>
        )}

        {!error && images.length > 0 && (
          <MasonryGallery
            images={images}
            onImageClick={handleImageClick}
          />
        )}

        {!loading && !error && images.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Nenhuma imagem encontrada nesta categoria.</p>
          </div>
        )}
      </main>

      {lightboxOpen && images.length > 0 && (
        <Lightbox
          images={images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      <PortfolioFooter />
    </>
  );
};

export default CategoryGallery;
