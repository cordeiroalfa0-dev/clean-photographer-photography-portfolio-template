const PortfolioFooter = () => {
  return (
    <footer className="max-w-[1600px] mx-auto px-3 md:px-5 pb-16">
      <div className="text-center text-[10px] uppercase tracking-widest font-inter text-muted-foreground">
        <a
          href="mailto:contato@mariasilva.com.br"
          className="hover:text-foreground transition-colors"
        >
          E: contato@mariasilva.com.br
        </a>
        <span className="mx-2">/</span>
        <a
          href="tel:+5511999887766"
          className="hover:text-foreground transition-colors"
        >
          T: +55 (11) 99988-7766
        </a>
        <span className="mx-2">/</span>
        <a
          href="https://instagram.com/mariasilva.foto"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          I: @mariasilva.foto
        </a>
      </div>
    </footer>
  );
};

export default PortfolioFooter;
