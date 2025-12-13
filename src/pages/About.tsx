import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import PortfolioHeader from "@/components/PortfolioHeader";
import PortfolioFooter from "@/components/PortfolioFooter";
import SEO from "@/components/SEO";
import { fetchPexelsPhotos } from "@/services/pexels";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().trim().min(1, { message: "Nome é obrigatório" }).max(100, { message: "Nome deve ter menos de 100 caracteres" }),
  email: z.string().trim().email({ message: "Endereço de e-mail inválido" }).max(255, { message: "E-mail deve ter menos de 255 caracteres" }),
  message: z.string().trim().min(1, { message: "Mensagem é obrigatória" }).max(1000, { message: "Mensagem deve ter menos de 1000 caracteres" }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const About = () => {
  const [portrait, setPortrait] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Mensagem enviada",
        description: "Obrigada pelo contato. Retornarei em breve.",
      });
      form.reset();
      setIsSubmitting(false);
    }, 1000);
  };

  useEffect(() => {
    const loadPortrait = async () => {
      try {
        // Fetch a professional photographer portrait from Pexels
        const data = await fetchPexelsPhotos('PERSONAL', 1, 1); // Personal category has artistic portraits
        if (data.photos.length > 0) {
          const photo = data.photos[0];
          setPortrait({
            src: photo.src.large2x,
            alt: photo.alt || 'Retrato',
            width: photo.width,
            height: photo.height,
          });
        }
      } catch (err) {
        console.error('Erro ao carregar retrato:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPortrait();
  }, []);

  return (
    <>
      <SEO
        title="Sobre - Maria Silva"
        description="Conheça Maria Silva, fotógrafa de produção especializada em moda, editorial e fotografia comercial."
        canonicalUrl="/about"
      />

      <PortfolioHeader
        activeCategory=""
      />
      
      <main className="min-h-screen">
        <section className="max-w-[1600px] mx-auto pt-20 pb-12 md:pt-24 md:pb-16">
          <div className="text-center space-y-8 mb-16 px-3 md:px-5 max-w-2xl mx-auto">
            <div className="space-y-4">
              <h1 className="font-playfair text-4xl md:text-5xl text-foreground">
                Maria Silva
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-inter">
                PRODUÇÃO & FOTOGRAFIA
              </p>
            </div>

            {/* Portrait */}
            {!loading && portrait && (
              <div className="max-w-xs mx-auto border border-foreground/10 overflow-hidden">
                <picture className="relative block">
                  {portrait.width && portrait.height && (
                    <svg
                      width={portrait.width}
                      height={portrait.height}
                      viewBox={`0 0 ${portrait.width} ${portrait.height}`}
                      className="w-full h-auto"
                    >
                      <rect
                        width={portrait.width}
                        height={portrait.height}
                        fill="white"
                      />
                    </svg>
                  )}
                  <img
                    src={portrait.src}
                    alt={portrait.alt}
                    className="absolute top-0 left-0 w-full h-auto grayscale"
                    style={{
                      opacity: loading ? 0 : 1,
                      transition: 'opacity 0.5s ease-out'
                    }}
                  />
                </picture>
              </div>
            )}
          </div>

          {/* Bio Section */}
          <div className="max-w-2xl mx-auto px-3 md:px-5 space-y-8 text-center text-foreground/80 text-sm leading-relaxed mb-16">
            <p>
              Fotógrafa de produção especializada em moda, editorial e fotografia comercial.
              Criando imagens marcantes com precisão técnica e visão criativa para marcas
              e publicações.
            </p>

            <p>
              Serviços completos de produção incluindo direção de arte, locação, casting e
              gerenciamento de set. Abordagem colaborativa garantindo execução impecável do conceito à entrega.
            </p>

            <div className="pt-8">
              <h2 className="font-playfair text-xl text-foreground mb-4">Serviços</h2>
              <p className="text-foreground/70 text-xs uppercase tracking-wider leading-loose">
                Fotografia de Moda & Editorial / Produção Comercial / Direção de Arte & Criação /
                Locação / Casting & Coordenação de Talentos
              </p>
            </div>

            <div className="pt-4">
              <h2 className="font-playfair text-xl text-foreground mb-4">Clientes Selecionados</h2>
              <p className="text-foreground/70 text-xs uppercase tracking-wider leading-loose">
                Diversas marcas de moda e publicações editoriais
              </p>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="max-w-xl mx-auto px-3 md:px-5 pt-16">
            <div className="text-center space-y-4 mb-12">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-inter">
                CONTATO
              </p>
              <h2 className="font-playfair text-4xl md:text-5xl text-foreground">
                Entre em Contato
              </h2>
              <p className="text-foreground/80 text-sm leading-relaxed">
                Para orçamentos e colaborações.
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm uppercase tracking-wider text-foreground/70 font-inter">
                        Nome *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Seu nome"
                          className="border-0 border-b border-foreground/20 rounded-none bg-transparent text-foreground px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm uppercase tracking-wider text-foreground/70 font-inter">
                        E-mail *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="seu@email.com"
                          className="border-0 border-b border-foreground/20 rounded-none bg-transparent text-foreground px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm uppercase tracking-wider text-foreground/70 font-inter">
                        Mensagem *
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Conte-me sobre seu projeto..."
                          className="border-0 border-b border-foreground/20 rounded-none bg-transparent text-foreground min-h-[150px] px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-4 text-center">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="outline"
                    className="w-full md:w-auto px-12 py-6 text-sm uppercase tracking-widest font-inter border-foreground/40 hover:bg-foreground hover:text-background transition-all"
                  >
                    {isSubmitting ? "Enviando..." : "Enviar"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </section>
      </main>

      <PortfolioFooter />
    </>
  );
};

export default About;
