import { Link } from "react-router-dom";
import PortfolioHeader from "@/components/PortfolioHeader";
import PortfolioFooter from "@/components/PortfolioFooter";
import SEO from "@/components/SEO";

const NotFound = () => {
  return (
    <>
      <SEO
        title="404 - Página Não Encontrada | Maria Silva"
        description="A página que você está procurando não existe ou foi movida. Retorne à página inicial para explorar a fotografia de moda."
        canonicalUrl="/404"
        ogType="website"
      />

      <PortfolioHeader activeCategory="" />

      <main className="min-h-screen flex items-center justify-center px-8 pt-20 animate-fade-in">
        <div className="text-center max-w-2xl">
          <h1 className="text-7xl md:text-9xl font-light tracking-tight mb-8">
            404
          </h1>
          <p className="text-2xl md:text-3xl font-light tracking-tight mb-4">
            Página não encontrada
          </p>
          <p className="text-lg text-muted-foreground mb-12 max-w-md mx-auto">
            A página que você está procurando não existe ou foi movida.
          </p>
          <Link
            to="/"
            className="inline-block px-8 py-3 bg-foreground text-background text-sm uppercase tracking-widest hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            Voltar ao Início
          </Link>
        </div>
      </main>

      <PortfolioFooter />
    </>
  );
};

export default NotFound;
