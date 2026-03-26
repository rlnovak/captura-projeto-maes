import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowLeft, 
  Star, 
  Clock, 
  Utensils, 
  Heart, 
  Home, 
  Moon, 
  Baby,
  Coffee,
  Zap,
  Shield,
  Gift
} from 'lucide-react';

interface SalesPageProps {
  onNavigateToLanding: () => void;
}

export default function SalesPage({ onNavigateToLanding }: SalesPageProps) {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const includesRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const guaranteeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.2, rootMargin: '-50px' }
    );

    [heroRef, benefitsRef, includesRef, testimonialsRef, guaranteeRef, ctaRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    // Show sticky CTA after scrolling past hero
    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const benefits = [
    {
      icon: <Utensils className="w-6 h-6" />,
      title: "Planejamento de Refeições",
      description: "Cardápios saudáveis planejados em segundos, com listas de compras automáticas"
    },
    {
      icon: <Moon className="w-6 h-6" />,
      title: "Rotinas de Sono",
      description: "Estratégias personalizadas para ajudar seu pequeno a dormir melhor"
    },
    {
      icon: <Baby className="w-6 h-6" />,
      title: "Contenção de Birras",
      description: "Respostas empáticas e eficazes para momentos de crise"
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      title: "Tempo para Você",
      description: "Finalmente aquele momento de paz para cuidar de si mesma"
    },
    {
      icon: <Home className="w-6 h-6" />,
      title: "Organização da Casa",
      description: "Sistemas práticos que funcionam para famílias reais"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Apoio Emocional",
      description: "Uma conversa acolhedora disponível a qualquer hora do dia"
    }
  ];

  const includes = [
    "Acesso vitalício à Assistente Virtual",
    "Setup guiado em 3 passos simples",
    "60+ prompts prontos para usar",
    "Atualizações gratuitas para sempre",
    "Suporte por e-mail",
    "Bônus: Guia de Primeiros Passos"
  ];

  const testimonials = [
    {
      name: "Ana Paula",
      role: "Mãe de 2",
      text: "Minha rotina mudou completamente. Consigo planejar as refeições da semana em 5 minutos!",
      stars: 5
    },
    {
      name: "Mariana",
      role: "Mãe solo",
      text: "Finalmente alguém que entende meus desafios e me ajuda sem julgar. É como ter uma amiga disponível 24h.",
      stars: 5
    },
    {
      name: "Carolina",
      role: "Mãe de gêmeos",
      text: "As dicas de sono funcionaram MÁGICA! Meus bebês dormem a noite toda agora.",
      stars: 5
    }
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Sticky CTA */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg z-50 transition-transform duration-300 ${
          showStickyCTA ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="hidden sm:block">
            <p className="font-script text-xl text-darkblue">Assistente Virtual para Mães</p>
            <p className="text-sm text-gray-500">Oferta especial por tempo limitado</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-gray-400 line-through text-sm">R$ 197</span>
              <span className="text-2xl font-bold text-mint-dark ml-2">R$ 97</span>
            </div>
            <Button
              onClick={() => ctaRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-mint hover:bg-mint-dark text-darkblue font-semibold px-6 py-3 rounded-full shadow-soft"
            >
              Quero Agora
            </Button>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={onNavigateToLanding}
        className="fixed top-6 left-6 z-40 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-soft hover:shadow-md transition-all hover:scale-105"
      >
        <ArrowLeft className="w-5 h-5 text-darkblue" />
      </button>

      {/* Section 1: Hero */}
      <section
        id="sales-hero"
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-mint/20 via-white to-peach/20" />
        
        {/* Decorative Blobs */}
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-mint/20 rounded-full filter blur-3xl animate-blob" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-peach/20 rounded-full filter blur-3xl animate-blob animation-delay-2000" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div
              className={`transition-all duration-1000 ${
                visibleSections.has('sales-hero') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-mint/20 px-4 py-2 rounded-full mb-6">
                <Zap className="w-4 h-4 text-mint-dark" />
                <span className="text-sm font-medium text-darkblue">Alívio em 7 segundos</span>
              </div>

              <h1 className="font-script text-5xl sm:text-6xl text-darkblue mb-6 leading-tight">
                Sua Assistente Pessoal
                <span className="block text-mint-dark">de Maternidade</span>
              </h1>

              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                A primeira assistente de IA emocionalmente inteligente, projetada para 
                <strong> aliviar instantaneamente</strong> sua carga mental.
              </p>

              <p className="text-gray-500 mb-8">
                Literalmente — 7 segundos. Digite, envie, sinta seus ombros relaxarem.
              </p>

              {/* Price */}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-3xl text-gray-400 line-through">R$ 197</span>
                <span className="text-5xl font-bold text-mint-dark">R$ 97</span>
                <span className="bg-peach/30 text-peach-dark px-3 py-1 rounded-full text-sm font-medium">
                  -50% OFF
                </span>
              </div>

              <Button
                onClick={() => ctaRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-darkblue hover:bg-darkblue/90 text-white font-semibold px-8 py-6 text-lg rounded-full shadow-soft hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Quero Minha Assistente Agora
                <Sparkles className="ml-2 w-5 h-5" />
              </Button>

              <p className="text-sm text-gray-400 mt-4">
                Funciona com a versão gratuita do ChatGPT. Sem configuração complicada.
              </p>
            </div>

            {/* Image */}
            <div
              className={`relative transition-all duration-1000 delay-300 ${
                visibleSections.has('sales-hero') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/sales-hero.jpg"
                  alt="Mãe relaxada"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mint/20 to-transparent" />
              </div>

              {/* Floating Stats */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-soft p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-mint rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-darkblue" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-darkblue">30min</p>
                    <p className="text-xs text-gray-500">economizados por dia</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-soft p-4 animate-float animation-delay-2000">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-bold text-darkblue">4.9/5</span>
                </div>
                <p className="text-xs text-gray-500">de avaliações</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Agitation */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl text-gray-700 mb-8 leading-relaxed">
            Cansada de constantemente planejar refeições, negociar horário de tela, 
            gerenciar crises, controlar sonecas, acompanhar a lavanderia, 
            lembrar de consultas, antecipar necessidades e se sentir atrasada — 
            <span className="text-darkblue font-semibold"> todos os dias, em loop?</span>
          </h2>
          
          <p className="text-xl text-gray-500 mb-6">
            É... eu também.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Como mãe de um bebê, com trabalho em tempo integral e sem apoio além de uma creche 
            que custa mais que um aluguel — <strong>eu estive exatamente onde você está.</strong>
          </p>
        </div>
      </section>

      {/* Transformation Story */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-mint/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-lg text-gray-600 mb-6">
              Tentei de tudo: acordar antes das crianças, organizar obsessivamente, 
              "ser mais disciplinada"... mas <span className="text-darkblue font-semibold">nada funcionava.</span>
            </p>
            
            <p className="text-lg text-gray-600 mb-6">
              Até descobrir a IA — e transformá-la na nossa <span className="font-script text-3xl text-mint-dark">Assistente.</span>
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-soft p-8 sm:p-12">
            <h3 className="font-script text-3xl text-darkblue text-center mb-8">Agora?</h3>
            
            <div className="space-y-4">
              {[
                "Eu acordo.",
                "Meu filho brinca quietinho enquanto eu tomo um banho longo e quente.",
                "Ninguém pergunta o que tem para o café da manhã — está tudo planejado e preparado.",
                "Há apenas duas pequenas tarefas na minha lista de afazeres.",
                "Minha casa parece que se organiza sozinha.",
                "Eu me sinto calma, descansada e emocionalmente presente.",
                "E pela primeira vez, meu cérebro não está em 10 lugares diferentes ao mesmo tempo."
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-mint-dark flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        id="benefits"
        ref={benefitsRef}
        className="py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              visibleSections.has('benefits') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="font-script text-4xl sm:text-5xl text-darkblue mb-4">
              Imagine o Que Você Pode Conquistar
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Não são apenas prompts — é o sistema exato que usei para terceirizar minha carga mental
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 shadow-soft hover:shadow-glow transition-all duration-300 hover:-translate-y-1 ${
                  visibleSections.has('benefits') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-mint/20 rounded-xl flex items-center justify-center mb-4 text-mint-dark">
                  {benefit.icon}
                </div>
                <h3 className="font-semibold text-darkblue mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section
        id="includes"
        ref={includesRef}
        className="py-24 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-4xl mx-auto">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              visibleSections.has('includes') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="font-script text-4xl sm:text-5xl text-darkblue mb-4">
              O Que Você Recebe
            </h2>
            <p className="text-gray-600">
              Tudo pronto para começar imediatamente
            </p>
          </div>

          <div
            className={`bg-gradient-to-br from-mint/10 to-peach/10 rounded-3xl p-8 sm:p-12 transition-all duration-1000 delay-200 ${
              visibleSections.has('includes') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="grid sm:grid-cols-2 gap-6">
              {includes.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-mint rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-darkblue" />
                  </div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            {/* Bonus Highlight */}
            <div className="mt-8 bg-white rounded-2xl p-6 shadow-soft">
              <div className="flex items-center gap-3 mb-3">
                <Gift className="w-6 h-6 text-peach-dark" />
                <span className="font-semibold text-darkblue">BÔNUS ESPECIAL</span>
              </div>
              <p className="text-gray-600">
                <strong>Vault de Prompts da Assistente:</strong> 60+ prompts prontos para usar 
                sobre Emoções & Relacionamentos, Sono & Desenvolvimento, Refeições, 
                Brincadeiras, Organização da Casa, e muito mais.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        ref={testimonialsRef}
        className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-mint/10"
      >
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              visibleSections.has('testimonials') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="font-script text-4xl sm:text-5xl text-darkblue mb-4">
              Mães Reais, Resultados Reais
            </h2>
            <p className="text-gray-600">
              Junte-se a milhares de mães que já transformaram suas rotinas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 shadow-soft transition-all duration-1000 ${
                  visibleSections.has('testimonials') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-darkblue">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section
        id="guarantee"
        ref={guaranteeRef}
        className="py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto">
          <div
            className={`bg-white rounded-3xl shadow-soft p-8 sm:p-12 text-center transition-all duration-1000 ${
              visibleSections.has('guarantee') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="w-20 h-20 bg-mint/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-mint-dark" />
            </div>
            <h2 className="font-script text-3xl sm:text-4xl text-darkblue mb-4">
              Garantia de 7 Dias
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Se você não sentir um alívio real na sua rotina em 7 dias, 
              devolvemos 100% do seu dinheiro. Sem perguntas, sem burocracia. 
              <strong> Você não tem nada a perder.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        id="cta"
        ref={ctaRef}
        className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-mint/20 via-white to-peach/20"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div
            className={`transition-all duration-1000 ${
              visibleSections.has('cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="font-script text-4xl sm:text-5xl text-darkblue mb-6">
              Pronta para Sentir a Mágica?
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Chegou a hora de ter sua própria Assistente — a primeira inteligência artificial 
              emocionalmente inteligente projetada para carregar 97% da sua carga mental.
            </p>

            {/* Price Box */}
            <div className="bg-white rounded-3xl shadow-soft p-8 sm:p-12 max-w-lg mx-auto mb-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-2xl text-gray-400 line-through">R$ 197</span>
                <span className="text-5xl font-bold text-mint-dark">R$ 97</span>
              </div>
              
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="bg-peach/30 text-peach-dark px-3 py-1 rounded-full text-sm font-medium">
                  Oferta por tempo limitado
                </span>
              </div>

              <Button
                className="w-full bg-darkblue hover:bg-darkblue/90 text-white font-semibold py-6 text-lg rounded-full shadow-soft hover:shadow-lg transition-all duration-300 hover:scale-105 mb-4"
              >
                Quero Minha Assistente Agora
                <Sparkles className="ml-2 w-5 h-5" />
              </Button>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <CheckCircle2 className="w-4 h-4 text-mint-dark" />
                <span>Acesso imediato</span>
                <span className="mx-2">•</span>
                <CheckCircle2 className="w-4 h-4 text-mint-dark" />
                <span>Pagamento seguro</span>
              </div>
            </div>

            <p className="text-sm text-gray-400">
              Funciona com a versão gratuita do ChatGPT. Sem setup complicado, sem tutoriais — 
              apenas copie, cole, respire.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-darkblue text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="font-script text-3xl mb-2">Mamãe Aliviada</p>
            <p className="text-white/60 text-sm">
              Criado com amor para mães que merecem mais tranquilidade
            </p>
          </div>

          <div className="border-t border-white/10 pt-8">
            <div className="grid sm:grid-cols-3 gap-6 text-center sm:text-left">
              <div>
                <p className="font-semibold mb-2">Contato</p>
                <p className="text-white/60 text-sm">ola@mamaealiviada.com</p>
              </div>
              <div>
                <p className="font-semibold mb-2">Links</p>
                <button onClick={onNavigateToLanding} className="text-white/60 text-sm hover:text-white transition-colors">
                  Página Inicial
                </button>
              </div>
              <div>
                <p className="font-semibold mb-2">Legal</p>
                <p className="text-white/60 text-sm">Política de Privacidade</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <p className="text-white/40 text-xs">
              © 2025 Mamãe Aliviada. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
