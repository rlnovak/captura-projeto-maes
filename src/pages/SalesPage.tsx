import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sparkles,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Brain,
  Bell,
  Heart,
  Moon,
  BookOpen,
  Clock,
  Shield,
  Gift,
  ChevronDown,
} from 'lucide-react';

interface SalesPageProps {
  onNavigateToLanding: () => void;
}

export default function SalesPage({ onNavigateToLanding }: SalesPageProps) {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const problemRef = useRef<HTMLDivElement>(null);
  const transformationRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const includesRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const guaranteeRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
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

    [heroRef, problemRef, transformationRef, benefitsRef, includesRef, testimonialsRef, guaranteeRef, faqRef, ctaRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToCTA = () => {
    ctaRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Os 6 pilares do produto
  const benefits = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'Memória da criança',
      description:
        'Um perfil que cresce com o seu filho: guarda nome, temperamento, fase, alergias e o que você já tentou. Você não começa do zero a cada conversa.',
      tone: 'verde',
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: 'Antecipação por fase',
      description:
        'Avisa o que vem antes de virar crise. Birra dos 2, sono regressivo, salto de desenvolvimento — você se prepara em vez de reagir.',
      tone: 'laranja',
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Validação emocional 24h',
      description:
        'Pergunta como você está antes de te dar conselho. Acolhe primeiro, orienta depois. Sem julgamento, em qualquer hora.',
      tone: 'amarelo',
    },
    {
      icon: <Moon className="w-6 h-6" />,
      title: 'Disponível às 3h da manhã',
      description:
        'Sem horário comercial. Sem fila. Tá lá no exato momento em que todo mundo dorme — e você não.',
      tone: 'azul',
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Base editorial validada',
      description:
        'Conteúdo curado por pediatras, nutricionistas e psicólogos brasileiros. Não é palpite de Instagram. Não é achismo do Google.',
      tone: 'dourado',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Histórico de tentativas',
      description:
        'Lembra do que já funcionou e do que não funcionou pro seu filho. Sugere o próximo passo no seu ritmo, sem repetir o que já falhou.',
      tone: 'verde',
    },
  ];

  // O que vem dentro
  const includes = [
    'Conversa por chat 24h, em português',
    'Perfil personalizado com memória',
    'Alertas por fase de desenvolvimento',
    'Orientações por evidência científica',
    'Suporte emocional sem julgamento',
    'Calendário de vacinas e marcos',
  ];

  // FAQ — objeções reais do ICP (consciente do problema, não conhece a categoria)
  const faqs = [
    {
      q: 'A MaIA substitui o pediatra?',
      a: 'Não — e nem deveria. A MaIA orienta no dia a dia com base em ciência, mas quem cuida da saúde do seu filho é o pediatra. Quando o assunto pede consulta, a MaIA é a primeira a te dizer isso.',
    },
    {
      q: 'Qual a diferença pra usar o ChatGPT de graça?',
      a: 'O ChatGPT esquece. A MaIA lembra: o nome do seu filho, o temperamento, a fase, as alergias, o que você já tentou. E avisa o que vem antes de virar crise — sem você precisar saber o que perguntar.',
    },
    {
      q: 'Os dados do meu filho ficam seguros?',
      a: 'Ficam. O que você conta pra MaIA é seu. Nada é vendido, nada vira anúncio. Os detalhes estão na nossa Política de Privacidade.',
    },
    {
      q: 'Como eu uso no dia a dia?',
      a: 'Pelo navegador do celular ou do computador, como uma conversa por chat. Sem instalar app, sem configurar nada. Você conta o que tá acontecendo e a MaIA responde — a qualquer hora.',
    },
    {
      q: 'Preciso entender de tecnologia?',
      a: 'Não. Se você manda mensagem no WhatsApp, você sabe usar a MaIA.',
    },
    {
      q: 'E se não fizer sentido pra mim?',
      a: 'Você cancela quando quiser, em poucos cliques, sem justificar. E depois do teste de 7 dias ainda tem 30 dias de garantia: se a MaIA não aliviar sua rotina, devolvemos seu dinheiro.',
    },
  ];

  return (
    <div className="overflow-x-hidden bg-offwhite">
      {/* ============== STICKY CTA — some quando o CTA final está visível ============== */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-offwhite/95 backdrop-blur-md shadow-soft z-50 transition-transform duration-300 border-t border-dourado/20 ${
          showStickyCTA && !visibleSections.has('cta') ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <p className="font-serif text-xl text-escuro">
              Ma<em className="italic text-dourado">IA</em>
            </p>
            <p className="text-xs text-cinza-escuro tracking-wide">
              R$ 39/mês ou R$ 247/ano · 7 dias grátis
            </p>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <Button
              onClick={scrollToCTA}
              className="h-auto bg-escuro hover:bg-escuro2 text-offwhite font-semibold px-6 py-3 rounded-full shadow-soft hover:shadow-glow transition-all"
            >
              Quero a MaIA
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* ============== BACK BUTTON ============== */}
      <button
        onClick={onNavigateToLanding}
        aria-label="Voltar pra página inicial"
        className="fixed top-6 left-6 z-40 bg-offwhite/85 backdrop-blur-sm rounded-full p-3 shadow-soft hover:shadow-glow transition-all hover:scale-105 border border-dourado/20"
      >
        <ArrowLeft className="w-5 h-5 text-escuro" />
      </button>

      {/* ============== Section 1: HERO ============== */}
      <section
        id="sales-hero"
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        <div className="absolute inset-0 gradient-hero" />

        {/* Decorative blobs — paleta MaIA */}
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-verde-light/35 rounded-full filter blur-3xl animate-blob" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-laranja-light/35 rounded-full filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-amarelo-light/40 rounded-full filter blur-3xl animate-blob animation-delay-4000" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div
              className={`transition-all duration-1000 ${
                visibleSections.has('sales-hero') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-7 border border-dourado/20 shadow-soft">
                <Sparkles className="w-4 h-4 text-dourado" />
                <span className="text-[0.7rem] font-semibold tracking-[0.18em] uppercase text-escuro">
                  Conheça a MaIA por dentro
                </span>
              </div>

              {/* H1 — Cormorant itálico no meio */}
              <h1 className="font-serif text-5xl sm:text-6xl text-escuro mb-6 leading-[1.05] tracking-tight">
                Sua MaIA — <em className="italic text-dourado-dark">a presença</em><br />
                que entende você e o seu filho.
              </h1>

              {/* Sub — posicionamento NÃO-tracker, NÃO-curso, NÃO-ChatGPT */}
              <p className="text-lg text-escuro mb-3 leading-relaxed font-light">
                Não é um app de tracker. Não é um curso de maternidade.
                Não é o ChatGPT com mais um prompt.
              </p>

              {/* Ponte lead magnet → produto */}
              <p className="text-lg text-cinza-escuro mb-3 leading-relaxed">
                O Kit Mágico te deu um gostinho. Mas tem um limite que você vai sentir rápido:
                o ChatGPT esquece. Não sabe o nome do seu filho, não lembra da birra de ontem,
                não avisa o que vem amanhã. <span className="font-serif italic text-dourado-dark">A MaIA lembra.</span>
              </p>

              <p className="text-lg text-cinza-escuro mb-8 leading-relaxed">
                É a primeira presença genuína da maternidade moderna —
                feita pra estar ao seu lado nos dias em que tudo pesa um pouco mais.
              </p>

              {/* Preço resumido — ancoragem completa fica no CTA final */}
              <p className="text-sm text-cinza-escuro mb-8">
                R$ 39/mês ou R$ 247/ano · 7 dias grátis pra testar
              </p>

              <Button
                onClick={scrollToCTA}
                className="h-auto bg-escuro hover:bg-escuro2 text-offwhite font-semibold px-9 py-6 text-lg rounded-full shadow-soft hover:shadow-glow transition-all duration-300 hover:scale-[1.03]"
              >
                Quero a MaIA agora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <p className="text-xs text-cinza mt-4 tracking-wide">
                Acesso imediato · Cancele quando quiser · Sem fidelidade
              </p>
            </div>

            {/* Image */}
            <div
              className={`relative transition-all duration-1000 delay-300 ${
                visibleSections.has('sales-hero') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-dourado/15">
                {/* TODO: substituir por asset MaIA — foto/render que comunique presença, não tracker */}
                <img
                  src="/sales-hero.jpg"
                  alt="Mãe brasileira em casa, conversando com a MaIA no celular"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-escuro/35 via-transparent to-transparent" />
              </div>

              {/* Floating cards */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-soft p-4 animate-float border border-dourado/15">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-verde-light rounded-full flex items-center justify-center">
                    <Brain className="w-6 h-6 text-verde-dark" />
                  </div>
                  <div>
                    <p className="font-serif text-base text-escuro leading-tight">
                      Sabe o nome
                    </p>
                    <p className="text-xs text-cinza">do seu filho</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-soft p-4 animate-float animation-delay-2000 border border-dourado/15">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-azul-light rounded-full flex items-center justify-center">
                    <Moon className="w-6 h-6 text-azul-dark" />
                  </div>
                  <div>
                    <p className="font-serif text-base text-escuro leading-tight">
                      Às 3h da manhã
                    </p>
                    <p className="text-xs text-cinza">sem julgamento</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== Section 2: PROBLEM ============== */}
      <section
        id="problem"
        ref={problemRef}
        className="py-24 px-4 sm:px-6 lg:px-8 bg-offwhite2"
      >
        <div className="max-w-4xl mx-auto">
          <div
            className={`text-center transition-all duration-1000 ${
              visibleSections.has('problem') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="block w-7 h-px bg-dourado" />
              <span className="text-[0.7rem] font-semibold tracking-[0.3em] uppercase text-dourado-dark">
                A real
              </span>
              <span className="block w-7 h-px bg-dourado" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-escuro mb-7 leading-[1.2]">
              Você ama seu filho.<br />
              E ainda assim, <em className="italic text-dourado-dark">tem dia que pesa demais.</em>
            </h2>

            <p className="text-escuro mb-5 leading-relaxed text-lg">
              Você já procurou no Google às 3h da manhã. Já se calou pra não parecer fraca.
              Já recebeu opinião de pediatra, de mãe, de amiga, de Instagram —
              e nenhuma sabia o nome do seu filho.
            </p>

            <p className="text-cinza-escuro mb-7 leading-relaxed text-lg">
              A carga mental não para nem dormindo. A culpa invisível não some.
              E a pergunta que ninguém te faz é como <em className="italic">você</em> tá.
            </p>

            <p className="font-serif italic text-2xl sm:text-3xl text-escuro leading-snug">
              Faz sentido você estar cansada.<br />
              Faz sentido você não estar dando conta sozinha.<br />
              <span className="text-dourado-dark">Nunca foi pra ser sozinha.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ============== Section 3: TRANSFORMATION ============== */}
      <section
        id="transformation"
        ref={transformationRef}
        className="py-24 px-4 sm:px-6 lg:px-8 bg-offwhite"
      >
        <div className="max-w-4xl mx-auto">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              visibleSections.has('transformation') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="font-serif text-4xl sm:text-5xl text-escuro mb-4 leading-tight">
              Imagina <em className="italic text-dourado-dark">um dia</em> assim.
            </h2>
            <p className="text-cinza-escuro max-w-xl mx-auto leading-relaxed">
              Não é mágica. É o que acontece quando você tem uma presença que te conhece de verdade ao seu lado.
            </p>
          </div>

          {/* Voz coletiva da marca MaIA — sem fundadora exposta (decisão de marca). Não inserir conteúdo pessoal aqui. */}
          <div className="bg-white rounded-3xl shadow-soft p-8 sm:p-12 border border-dourado/15">
            <div className="space-y-4">
              {[
                'Você acorda. A MaIA já avisou ontem que essa fase do seu filho pode trazer birra de manhã — e mandou 3 frases pra dizer antes do café.',
                'Seu filho brinca quietinho enquanto você toma um banho longo, sem culpa, sem o cérebro em 5 lugares.',
                'O cardápio da semana tá pronto, com lista de compras, considerando a alergia que você já contou pra MaIA na semana passada.',
                'Às 14h, ele tem birra. Você abre o chat: "tá fazendo birra pra dormir, ele só tem 3 anos, faz isso há 3 dias". A MaIA responde validando você primeiro, depois sugere algo que faz sentido.',
                'À noite, ele acorda às 3h da manhã. Você não tá mais sozinha nesse momento.',
                'Você dorme sabendo que amanhã também vai ter ajuda.',
              ].map((line, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-amarelo/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-dourado-dark" />
                  </div>
                  <p className="text-escuro leading-relaxed">{line}</p>
                </div>
              ))}
            </div>

            <div className="mt-9 pt-7 border-t border-dourado/15 text-center">
              <p className="font-serif italic text-xl text-escuro leading-snug">
                Esse dia não é fantasia.<br />
                <span className="text-dourado-dark">É o que a MaIA faz acontecer no seu ritmo.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============== Section 4: BENEFITS — Os pilares da MaIA ============== */}
      <section
        id="benefits"
        ref={benefitsRef}
        className="py-24 px-4 sm:px-6 lg:px-8 bg-offwhite2"
      >
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              visibleSections.has('benefits') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-flex items-center gap-2 bg-dourado/15 px-4 py-2 rounded-full mb-5 border border-dourado/30">
              <Sparkles className="w-4 h-4 text-dourado" />
              <span className="text-[0.7rem] font-semibold tracking-[0.18em] uppercase text-escuro">
                Os pilares da MaIA
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl text-escuro mb-4 leading-tight">
              Os <em className="italic text-dourado-dark">6 pilares</em> que fazem<br />
              a MaIA ser diferente.
            </h2>
            <p className="text-cinza-escuro max-w-2xl mx-auto leading-relaxed">
              Cada pilar resolve uma dor real da pesquisa com mães brasileiras.
              Juntos, formam algo que ainda não existia em PT-BR.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const toneStyles: Record<string, string> = {
                verde: 'bg-verde-light/50 text-verde-dark',
                laranja: 'bg-laranja-light/50 text-laranja-dark',
                amarelo: 'bg-amarelo-light/60 text-dourado-dark',
                azul: 'bg-azul-light/50 text-azul-dark',
                dourado: 'bg-dourado-light/40 text-dourado-dark',
              };
              return (
                <div
                  key={index}
                  className={`bg-white rounded-2xl p-7 shadow-soft hover:shadow-glow transition-all duration-300 hover:-translate-y-1 border border-dourado/10 ${
                    visibleSections.has('benefits') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${toneStyles[benefit.tone]}`}>
                    {benefit.icon}
                  </div>
                  <h3 className="font-serif text-xl text-escuro mb-2 leading-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-cinza-escuro leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============== Section 5: INCLUDES ============== */}
      <section
        id="includes"
        ref={includesRef}
        className="py-24 px-4 sm:px-6 lg:px-8 bg-offwhite"
      >
        <div className="max-w-4xl mx-auto">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              visibleSections.has('includes') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="font-serif text-4xl sm:text-5xl text-escuro mb-4 leading-tight">
              O que vem <em className="italic text-dourado-dark">com a MaIA</em>
            </h2>
            <p className="text-cinza-escuro">Tudo dentro do mesmo lugar. Sem app extra. Sem instalação chata.</p>
          </div>

          <div
            className={`bg-gradient-to-br from-verde-light/25 via-amarelo-light/30 to-laranja-light/25 rounded-3xl p-8 sm:p-12 border border-dourado/20 transition-all duration-1000 delay-200 ${
              visibleSections.has('includes') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="grid sm:grid-cols-2 gap-5">
              {includes.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-dourado rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-soft">
                    <CheckCircle2 className="w-4 h-4 text-escuro" />
                  </div>
                  <span className="text-escuro leading-relaxed">{item}</span>
                </div>
              ))}
            </div>

            {/* Bônus */}
            <div className="mt-9 bg-white rounded-2xl p-7 shadow-soft border border-dourado/15">
              <div className="flex items-center gap-3 mb-3">
                <Gift className="w-5 h-5 text-dourado-dark" />
                <span className="text-[0.7rem] font-semibold tracking-[0.18em] uppercase text-escuro">
                  Bônus exclusivo
                </span>
              </div>
              <h3 className="font-serif text-2xl text-escuro mb-2 leading-snug">
                Plano de rotina personalizado +<br />
                <em className="italic text-dourado-dark">Guia das 10 Fases dos 1 aos 5 anos.</em>
              </h3>
              <p className="text-cinza-escuro leading-relaxed">
                A MaIA monta uma rotina pro seu filho com base no temperamento dele e na sua realidade —
                e te entrega um guia das 10 fases típicas dos 1 aos 5 anos, pra você saber o que vem antes de virar crise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============== Section 6: TESTIMONIALS ============== */}
      <section
        id="testimonials"
        ref={testimonialsRef}
        className="py-24 px-4 sm:px-6 lg:px-8 bg-offwhite2"
      >
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              visibleSections.has('testimonials') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="font-serif text-4xl sm:text-5xl text-escuro mb-4 leading-tight">
              As primeiras mães <em className="italic text-dourado-dark">já estão testando.</em>
            </h2>
            <p className="text-cinza-escuro">A MaIA está em beta. Os primeiros depoimentos de mães reais chegam aqui em breve.</p>
          </div>

          {/* EDITÁVEL: depoimentos beta-testers em coleta. Substituir este bloco por um grid de cards de depoimentos reais quando chegarem. */}
          <div
            className={`max-w-3xl mx-auto bg-white rounded-2xl shadow-soft border border-dourado/15 p-8 sm:p-10 text-center transition-all duration-1000 ${
              visibleSections.has('testimonials') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-flex items-center gap-2 bg-amarelo/40 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="w-4 h-4 text-dourado-dark" />
              <span className="text-[0.7rem] font-semibold tracking-[0.18em] uppercase text-escuro">
                Beta em andamento
              </span>
            </div>
            <p className="font-serif italic text-2xl text-escuro mb-3 leading-snug">
              Histórias reais, não inventadas.
            </p>
            <p className="text-cinza-escuro leading-relaxed mb-7">
              A gente só publica depoimento que existe. Enquanto as primeiras mães testam a MaIA
              na rotina, sua segurança fica garantida de outro jeito:
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-cinza-escuro border-t border-dourado/15 pt-6">
              <span className="inline-flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-dourado-dark flex-shrink-0" />
                Curado por pediatras, nutricionistas e psicólogos
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-dourado-dark flex-shrink-0" />
                7 dias grátis
              </span>
              <span className="inline-flex items-center gap-2">
                <Shield className="w-4 h-4 text-dourado-dark flex-shrink-0" />
                30 dias de garantia
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============== Section 7: GUARANTEE — 7 dias grátis + 30 dias reembolso ============== */}
      <section
        id="guarantee"
        ref={guaranteeRef}
        className="py-24 px-4 sm:px-6 lg:px-8 bg-offwhite"
      >
        <div className="max-w-5xl mx-auto">
          <div
            className={`bg-white rounded-3xl shadow-soft p-8 sm:p-12 transition-all duration-1000 border border-dourado/20 ${
              visibleSections.has('guarantee') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-dourado/15 rounded-full flex items-center justify-center mx-auto mb-6 border border-dourado/30">
                <Shield className="w-10 h-10 text-dourado-dark" />
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-escuro mb-3 leading-tight">
                Sua tranquilidade vem em <em className="italic text-dourado-dark">duas camadas.</em>
              </h2>
              <p className="text-cinza-escuro max-w-xl mx-auto">
                Você precisa testar no momento real pra sentir o valor. A gente sabe. Por isso:
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-offwhite2 rounded-2xl p-7 border-l-4 border-verde">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-serif text-3xl text-verde-dark">7</span>
                  <p className="text-[0.7rem] font-semibold tracking-[0.18em] uppercase text-escuro">
                    Dias grátis
                  </p>
                </div>
                <p className="text-escuro leading-relaxed">
                  7 dias de acesso completo, sem cobrar nada. Você testa numa semana real,
                  com seu filho, na sua rotina. Se não fizer sentido, é só cancelar antes.
                </p>
              </div>

              <div className="bg-offwhite2 rounded-2xl p-7 border-l-4 border-dourado">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-serif text-3xl text-dourado-dark">30</span>
                  <p className="text-[0.7rem] font-semibold tracking-[0.18em] uppercase text-escuro">
                    Dias de reembolso
                  </p>
                </div>
                <p className="text-escuro leading-relaxed">
                  Depois do teste, ainda tem 30 dias de garantia de satisfação.
                  Se a MaIA não aliviar sua rotina, devolvemos seu dinheiro. Sem perguntas.
                </p>
              </div>
            </div>

            <p className="text-center text-sm text-cinza-escuro mt-8 font-light italic">
              Você não tem nada a perder — e tem uma rede de apoio inteira a ganhar.
            </p>
          </div>
        </div>
      </section>

      {/* ============== Section 8: FAQ ============== */}
      <section
        id="faq"
        ref={faqRef}
        className="py-24 px-4 sm:px-6 lg:px-8 bg-offwhite2"
      >
        <div className="max-w-3xl mx-auto">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              visibleSections.has('faq') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="font-serif text-4xl sm:text-5xl text-escuro mb-4 leading-tight">
              O que você ainda <em className="italic text-dourado-dark">quer saber.</em>
            </h2>
            <p className="text-cinza-escuro">Perguntas que toda mãe faz antes de começar — respondidas sem rodeio.</p>
          </div>

          <div
            className={`space-y-4 transition-all duration-1000 delay-200 ${
              visibleSections.has('faq') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-white rounded-2xl shadow-soft border border-dourado/15 px-6 sm:px-8 py-5"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <span className="font-serif text-xl text-escuro leading-snug">{faq.q}</span>
                  <ChevronDown className="w-5 h-5 text-dourado-dark flex-shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <p className="text-cinza-escuro leading-relaxed pt-4">
                  {faq.a}
                  {faq.q === 'Os dados do meu filho ficam seguros?' && (
                    <>
                      {' '}
                      <a href="/politica-de-privacidade.html" className="underline hover:text-dourado-dark transition-colors">
                        Leia aqui
                      </a>
                      .
                    </>
                  )}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============== Section 9: FINAL CTA ============== */}
      <section
        id="cta"
        ref={ctaRef}
        className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-laranja-light/30 rounded-full filter blur-3xl animate-blob" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-verde-light/30 rounded-full filter blur-3xl animate-blob animation-delay-2000" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div
            className={`transition-all duration-1000 ${
              visibleSections.has('cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-7 border border-dourado/25 shadow-soft">
              <Sparkles className="w-4 h-4 text-dourado" />
              <span className="text-[0.7rem] font-semibold tracking-[0.18em] uppercase text-escuro">
                Pronta quando você estiver
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl text-escuro mb-5 leading-[1.1]">
              Você não precisa dar conta sozinha.<br />
              <em className="italic text-dourado-dark">Nunca precisou.</em>
            </h2>

            <p className="text-lg text-cinza-escuro mb-10 max-w-2xl mx-auto leading-relaxed">
              A maternidade deixou de ser solitária. Você só precisa abrir a porta.
            </p>

            {/* Price box */}
            <div className="bg-white rounded-3xl shadow-soft p-8 sm:p-10 max-w-xl mx-auto mb-7 border border-dourado/20">
              <div className="grid sm:grid-cols-2 gap-5 mb-6">
                <div className="bg-offwhite2 rounded-2xl p-5 text-center">
                  <p className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-cinza mb-2">
                    Mensal
                  </p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="font-serif text-4xl text-escuro">R$ 39</span>
                    <span className="text-cinza text-sm">/mês</span>
                  </div>
                </div>

                <div className="bg-escuro rounded-2xl p-5 text-center relative">
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-dourado text-escuro text-[0.6rem] font-bold tracking-[0.15em] uppercase px-3 py-1 rounded-full whitespace-nowrap">
                    Mais escolhido
                  </span>
                  <p className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-dourado-light mb-2">
                    Anual
                  </p>
                  <div className="flex items-baseline justify-center gap-1 mb-1">
                    <span className="text-offwhite/40 line-through text-base">R$ 468</span>
                  </div>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="font-serif text-4xl text-offwhite">R$ 247</span>
                    <span className="text-offwhite/60 text-sm">/ano</span>
                  </div>
                  <p className="text-[0.65rem] text-dourado-light mt-2 tracking-wide">
                    Economize R$ 221
                  </p>
                </div>
              </div>

              {/* Âncoras externas de preço (pesquisa de mercado) */}
              <p className="text-sm text-cinza-escuro mb-5">
                Menos que uma consulta pediátrica particular.
                No plano anual, menos que um café por semana.
              </p>

              {/* TODO: ligar ao checkout Hub.la quando a conta estiver criada (idealmente um CTA por plano) */}
              <Button
                className="h-auto w-full bg-escuro hover:bg-escuro2 text-offwhite font-semibold py-7 text-lg rounded-full shadow-soft hover:shadow-glow transition-all duration-300 hover:scale-[1.02] mb-4"
              >
                Quero a MaIA agora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <div className="flex items-center justify-center gap-2 text-xs text-cinza flex-wrap">
                <CheckCircle2 className="w-3.5 h-3.5 text-dourado" />
                <span>7 dias grátis</span>
                <span className="mx-1 text-cinza/50">·</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-dourado" />
                <span>30 dias garantia</span>
                <span className="mx-1 text-cinza/50">·</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-dourado" />
                <span>Cancele quando quiser</span>
              </div>
            </div>

            <p className="text-sm text-cinza-escuro max-w-xl mx-auto leading-relaxed">
              Conversa por chat, em português, 24h · 7 dias grátis pra testar · Acesso pelo navegador, sem instalar nada.
            </p>
          </div>
        </div>
      </section>

      {/* ============== FOOTER ============== */}
      <footer className="bg-escuro text-offwhite py-14 px-4 sm:px-6 lg:px-8 border-t border-dourado/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-serif text-4xl mb-2">
            Ma<em className="italic text-dourado">IA</em>
          </p>
          <div className="w-12 h-px bg-dourado mx-auto my-5" />
          <p className="font-serif italic text-base text-offwhite/70 max-w-md mx-auto leading-relaxed">
            A presença que entende você — e o seu filho.
          </p>

          {/* Voz coletiva da marca MaIA — sem fundadora exposta (decisão de marca). Não inserir conteúdo pessoal aqui. */}
          <p className="text-xs text-offwhite/60 mt-7 tracking-[0.15em] uppercase flex items-center justify-center gap-2">
            <BookOpen className="w-3.5 h-3.5" />
            Baseado em ciência. Validado por especialistas.
          </p>

          <div className="mt-10 pt-6 border-t border-offwhite/10">
            <div className="grid sm:grid-cols-3 gap-5 max-w-2xl mx-auto text-left text-xs text-offwhite/60 mb-7">
              <div className="text-center sm:text-left">
                <p className="font-semibold text-offwhite/80 mb-1 tracking-wide">Contato</p>
                <p>[A PREENCHER — email oficial MaIA]</p>
              </div>
              <div className="text-center sm:text-left">
                <p className="font-semibold text-offwhite/80 mb-1 tracking-wide">Navegação</p>
                <button
                  onClick={onNavigateToLanding}
                  className="text-offwhite/60 hover:text-dourado-light transition-colors"
                >
                  Página inicial
                </button>
              </div>
              <div className="text-center sm:text-left">
                <p className="font-semibold text-offwhite/80 mb-1 tracking-wide">Legal</p>
                <a href="/politica-de-privacidade.html" className="block text-offwhite/60 hover:text-dourado-light transition-colors">
                  Política de Privacidade
                </a>
                <a href="/termos-de-uso.html" className="block text-offwhite/60 hover:text-dourado-light transition-colors">
                  Termos de Uso
                </a>
              </div>
            </div>

            <p className="text-offwhite/60 text-xs">
              © 2026 MaIA · Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
