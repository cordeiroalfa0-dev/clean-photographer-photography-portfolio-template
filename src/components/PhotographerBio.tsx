const PhotographerBio = () => {
  return (
    <section className="max-w-[1600px] mx-auto px-3 md:px-5 pt-20 pb-12 md:pt-24 md:pb-16">
      <div className="space-y-4 text-center">
        <h2 className="font-playfair text-4xl md:text-5xl text-foreground">
          Maria Silva
        </h2>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-inter">
          PRODUÇÃO & FOTOGRAFIA DE MODA
        </p>
        <p className="text-sm text-foreground/80 max-w-2xl leading-relaxed mx-auto">
          Fotógrafa de produção especializada em moda, editorial e trabalhos comerciais.
          Criando imagens marcantes para marcas e publicações.
        </p>
      </div>
    </section>
  );
};

export default PhotographerBio;
