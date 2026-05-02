import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';
import {
  Sparkles,
  Heart,
  Clock,
  Brain,
  Moon,
  Star,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Bell,
} from 'lucide-react';

interface LandingPageProps {
  onNavigateToSales: () => void;
}

export default function LandingPage({ onNavigateToSales }: LandingPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  const heroRef = useRef<HTMLDivElement>(null);
  const leadMagnetRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const softPitchRef = useRef<HTMLDivElement>(null);

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

    [heroRef, leadMagnetRef, storyRef, softPitchRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    setSubmitError(null);

    const params = new URLSearchParams(window.location.search);

    const { error } = await supabase.from('leads').insert({
      nome: name,
      email,
      telefone: phone,
      utm_source: params.get('utm_source'),
      utm_medium: params.get('utm_medium'),
      utm_campaign: params.get('utm_campaign'),
      pagina_origem: 'landing',
    });

    if (error) {
      setSubmitError('Algo deu errado. Tente novamente.');
      return;
    }

    setIsSubmitted(true);
    setTimeout(() => {
      onNavigateToSales();
    }, 1800);
  };

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="overflow-x-hidden bg-offwhite">
      {/* ============== Section 1: HERO ============== */}
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated Background Blobs — paleta MaIA */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-verde-light/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-laranja-light/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-32 left-1/2 w-[600px] h-[600px] bg-amarelo-light/45 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-verde/20 rounded-full animate-float" />
        <div className="absolute bottom-40 right-20 w-16 h-16 bg-laranja/30 rounded-full animate-float animation-delay-2000" />
        <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-amarelo/30 rounded-full animate-float animation-delay-4000" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className={`transition-all duration-1000 ${
              visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-soft mb-8 border border-dourado/20">
              <Sparkles className="w-4 h-4 text-dourado" />
              <span className="text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-escuro">
                Para mães de crianças de 1 a 5 anos
              </span>
            </div>

            {/* H1 — Big Idea (Cormorant itálico nas duas linhas) */}
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-escuro mb-7 leading-[1.05] tracking-tight">
              A maternidade
              <span className="block italic text-dourado">deixou de ser solitária.</span>
            </h1>

            {/* Sub — dor + promessa */}
            <p className="text-lg sm:text-xl text-cinza max-w-2xl mx-auto mb-5 leading-relaxed font-light">
              Você já buscou no Google às 3h da manhã. Já se calou pra não parecer fraca.
              Agora existe uma presença que entende você — e o seu filho.
            </p>

            {/* Frase ponte */}
            <p className="font-serif italic text-xl sm:text-2xl text-escuro max-w-2xl mx-auto mb-8 leading-snug">
              Receba grátis o Kit Mágico — 3 prompts que aliviam sua rotina hoje à noite.
            </p>

            {/* EDITÁVEL: substituir por bloco da Eliza quando história estiver pronta. Manter estrutura do componente. */}
            <p className="text-sm text-cinza mb-10">
              Feito por mães, pra mães. Validado por pediatras, nutricionistas e psicólogos.
            </p>

            {/* CTA */}
            <Button
              onClick={() => scrollToSection(leadMagnetRef)}
              className="bg-escuro hover:bg-escuro2 text-offwhite font-semibold px-9 py-6 text-lg rounded-full shadow-soft hover:shadow-glow transition-all duration-300 hover:scale-[1.03]"
            >
              Quero o Kit Mágico
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <p className="text-xs text-cinza mt-4 tracking-wide">
              Grátis · 3 prompts prontos pro ChatGPT · Acesso imediato
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-dourado/35 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-dourado/55 rounded-full" />
          </div>
        </div>
      </section>

      {/* ============== Section 2: LEAD MAGNET ============== */}
      <section
        id="lead-magnet"
        ref={leadMagnetRef}
        className="relative py-24 px-4 sm:px-6 lg:px-8 bg-offwhite2"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Side */}
            <div
              className={`relative transition-all duration-1000 delay-200 ${
                visibleSections.has('lead-magnet')
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-10'
              }`}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-dourado/15">
                {/* TODO: substituir por asset MaIA — mockup do Kit Mágico */}
                <img
                  src="/planner-mockup.jpg"
                  alt="Kit Mágico pra Mães com IA — 3 prompts prontos pro ChatGPT"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-escuro/30 via-transparent to-transparent" />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-soft p-4 animate-float border border-dourado/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-dourado rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-escuro" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-escuro">100% Gratuito</p>
                    <p className="text-xs text-cinza">Acesso imediato</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div
              className={`transition-all duration-1000 delay-400 ${
                visibleSections.has('lead-magnet')
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-10'
              }`}
            >
              <div className="bg-white/85 backdrop-blur-sm rounded-3xl p-8 sm:p-10 shadow-soft border border-dourado/15">
                <div className="inline-flex items-center gap-2 bg-amarelo/40 px-3 py-1 rounded-full mb-5">
                  <Star className="w-4 h-4 text-dourado-dark" />
                  <span className="text-[0.7rem] font-semibold tracking-[0.18em] uppercase text-escuro">
                    Presente Gratuito
                  </span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl text-escuro mb-3 leading-tight">
                  Receba o <em className="italic text-dourado">Kit Mágico</em><br />
                  pra Mães com I.A.
                </h2>

                <p className="text-cinza mb-7 leading-relaxed">
                  3 prompts prontos pro ChatGPT que aliviam o que pesa hoje:
                  cardápio da semana com lista de compras, brincadeiras na hora com o que tem em casa,
                  e fábulas sob medida pra ensinar sem brigar de novo.
                </p>

                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <Label htmlFor="name" className="text-escuro font-medium mb-2 block">
                        Como podemos te chamar?
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Seu primeiro nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-6 rounded-xl border-2 border-dourado/25 focus:border-dourado focus:ring-dourado bg-offwhite text-escuro transition-all"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-escuro font-medium mb-2 block">
                        Seu melhor e-mail
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-6 rounded-xl border-2 border-dourado/25 focus:border-dourado focus:ring-dourado bg-offwhite text-escuro transition-all"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-escuro font-medium mb-2 block">
                        WhatsApp pra você receber o kit
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(11) 99999-9999"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-6 rounded-xl border-2 border-dourado/25 focus:border-dourado focus:ring-dourado bg-offwhite text-escuro transition-all"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-escuro hover:bg-escuro2 text-offwhite font-semibold py-6 rounded-xl shadow-soft hover:shadow-glow transition-all duration-300 hover:scale-[1.02] text-lg"
                    >
                      Quero meu Kit Mágico
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>

                    {submitError && (
                      <p className="text-sm text-red-500 text-center">{submitError}</p>
                    )}

                    <p className="text-xs text-cinza text-center">
                      Sem spam. Você pode sair a qualquer momento.
                    </p>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-dourado rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-soft">
                      <CheckCircle2 className="w-8 h-8 text-escuro" />
                    </div>
                    <h3 className="text-2xl font-serif italic text-escuro mb-2">Pronto!</h3>
                    <p className="text-cinza">
                      O Kit Mágico está chegando no seu e-mail. Te levamos pra próxima página em segundos…
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== Section 3: STORY (validação da dor) ============== */}
      <section
        id="story"
        ref={storyRef}
        className="relative py-24 px-4 sm:px-6 lg:px-8 bg-offwhite"
      >
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              visibleSections.has('story') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="block w-7 h-px bg-dourado" />
              <span className="text-[0.7rem] font-semibold tracking-[0.3em] uppercase text-dourado">
                Pra você que tá lendo isso agora
              </span>
              <span className="block w-7 h-px bg-dourado" />
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl text-escuro mb-4 leading-[1.15]">
              Você está <em className="italic text-dourado">exausta</em> —<br />
              e isso não é fraqueza.
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Story Image */}
            <div
              className={`relative transition-all duration-1000 delay-200 ${
                visibleSections.has('story')
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-10'
              }`}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-dourado/15">
                {/* TODO: substituir por asset MaIA — foto de mãe real, sem clichê */}
                <img
                  src="/story-mom.jpg"
                  alt="Mãe brasileira em rotina real com seu filho pequeno"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-escuro/40 via-transparent to-transparent" />
              </div>

              {/* Quote Card — narradora coletiva agora, Eliza depois */}
              {/* EDITÁVEL: trocar pelo depoimento da Eliza quando a história dela estiver pronta. Manter card + posicionamento. */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-soft p-6 max-w-xs border border-dourado/20">
                <p className="font-serif italic text-lg text-escuro leading-snug">
                  "Eu não tava sozinha por falta de gente. Tava sozinha por falta de alguém que entendesse."
                </p>
                <p className="text-xs text-cinza mt-3 tracking-wide uppercase">
                  — Mãe brasileira, 31 anos
                </p>
              </div>
            </div>

            {/* Story Content */}
            <div
              className={`space-y-6 transition-all duration-1000 delay-400 ${
                visibleSections.has('story')
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-10'
              }`}
            >
              {/* EDITÁVEL: bloco "Eu sei como você se sente" — substituir por narrativa em primeira pessoa da Eliza quando estiver pronto. */}
              <div className="space-y-5">
                <p className="text-escuro leading-relaxed text-base">
                  Você ama seu filho. E ainda assim, tem dia que olha pro teto e sente
                  que ninguém vê o que você atravessa. Não é falta de amor. É falta de apoio.
                </p>

                <p className="text-escuro leading-relaxed text-base">
                  Você já tem mais informação do que qualquer geração de mães antes de você.
                  Pediatra, Instagram, Google, sua mãe, sua amiga — todo mundo opina.
                  Mas ninguém sabe o nome do seu filho. Ninguém lembra da semana difícil que passou.
                </p>

                <p className="text-escuro leading-relaxed text-base">
                  Faz sentido você estar cansada. Faz sentido você não estar dando conta sozinha.
                  Nunca foi pra ser sozinha.
                </p>
              </div>

              {/* 4 cards de problema — dores reais do briefing */}
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-white rounded-xl p-5 shadow-soft border-l-4 border-laranja">
                  <Moon className="w-6 h-6 text-laranja-dark mb-2" />
                  <p className="text-sm text-escuro leading-snug">
                    Buscar resposta no Google às 3h da manhã
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-soft border-l-4 border-verde">
                  <Brain className="w-6 h-6 text-verde-dark mb-2" />
                  <p className="text-sm text-escuro leading-snug">
                    Carga mental que não para nem dormindo
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-soft border-l-4 border-amarelo">
                  <Heart className="w-6 h-6 text-dourado mb-2" />
                  <p className="text-sm text-escuro leading-snug">
                    A culpa invisível de não dar conta
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-soft border-l-4 border-azul">
                  <Clock className="w-6 h-6 text-azul-dark mb-2" />
                  <p className="text-sm text-escuro leading-snug">
                    Casa em caos enquanto você se esquece de comer
                  </p>
                </div>
              </div>

              {/* Turning Point — Big Idea entra */}
              <div className="bg-gradient-to-br from-dourado/12 via-amarelo/25 to-laranja/15 rounded-2xl p-7 border border-dourado/20">
                <p className="font-serif italic text-2xl text-escuro mb-2 leading-snug">
                  Até que algo mudou.
                </p>
                <p className="text-escuro leading-relaxed">
                  A maternidade <span className="font-serif italic text-dourado-dark">deixou de ser solitária.</span>{' '}
                  Pela primeira vez existe uma presença que conhece você, conhece seu filho,
                  e tá ao seu lado às 3h da manhã — sem julgamento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== Section 4: SOFT PITCH ============== */}
      <section
        id="soft-pitch"
        ref={softPitchRef}
        className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amarelo-light/30 rounded-full filter blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              visibleSections.has('soft-pitch')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-flex items-center gap-2 bg-dourado/15 px-4 py-2 rounded-full mb-6 border border-dourado/30">
              <Sparkles className="w-4 h-4 text-dourado" />
              <span className="text-[0.7rem] font-semibold tracking-[0.18em] uppercase text-escuro">
                Conheça a MaIA
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl text-escuro mb-5 leading-tight">
              A primeira presença genuína<br />
              <em className="italic text-dourado">da maternidade moderna.</em>
            </h2>
            <p className="text-lg text-cinza max-w-2xl mx-auto leading-relaxed">
              Não é um app. Não é um curso. Não é o ChatGPT. É outra coisa —
              feita pra estar ao seu lado nos dias em que tudo pesa um pouco mais.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* AI Orb */}
            <div
              className={`relative flex justify-center transition-all duration-1000 delay-200 ${
                visibleSections.has('soft-pitch')
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-90'
              }`}
            >
              <div className="relative">
                {/* TODO: substituir por asset MaIA — orb da identidade visual */}
                <img
                  src="/ai-orb.png"
                  alt="MaIA — uma presença que entende você"
                  className="w-80 h-80 object-contain animate-pulse-soft drop-shadow-2xl"
                />

                {/* Floating Feature Icons */}
                <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-soft p-3 animate-float border border-dourado/15">
                  <Brain className="w-6 h-6 text-verde-dark" />
                </div>
                <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-soft p-3 animate-float animation-delay-2000 border border-dourado/15">
                  <Bell className="w-6 h-6 text-laranja-dark" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-soft p-3 animate-float animation-delay-4000 border border-dourado/15">
                  <Heart className="w-6 h-6 text-dourado" />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-soft p-3 animate-float border border-dourado/15">
                  <Moon className="w-6 h-6 text-azul-dark" />
                </div>
              </div>
            </div>

            {/* Features — Sistema M.A.I.A. */}
            <div
              className={`space-y-5 transition-all duration-1000 delay-400 ${
                visibleSections.has('soft-pitch')
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-10'
              }`}
            >
              <div className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-soft hover:shadow-glow transition-shadow border border-dourado/10">
                <div className="w-12 h-12 bg-verde-light rounded-xl flex items-center justify-center flex-shrink-0">
                  <Brain className="w-6 h-6 text-verde-dark" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-escuro mb-1">Memória da criança</h3>
                  <p className="text-sm text-cinza leading-relaxed">
                    Sabe o nome do seu filho, lembra do temperamento, do histórico, do que já tentou.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-soft hover:shadow-glow transition-shadow border border-dourado/10">
                <div className="w-12 h-12 bg-laranja-light rounded-xl flex items-center justify-center flex-shrink-0">
                  <Bell className="w-6 h-6 text-laranja-dark" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-escuro mb-1">Antecipação por fase</h3>
                  <p className="text-sm text-cinza leading-relaxed">
                    Avisa o que vem antes de virar crise. Birra, sono, alimentação — você se prepara.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-soft hover:shadow-glow transition-shadow border border-dourado/10">
                <div className="w-12 h-12 bg-amarelo-light rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-dourado" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-escuro mb-1">Inteligência aplicada</h3>
                  <p className="text-sm text-cinza leading-relaxed">
                    Pergunta como você está antes de te dar conselho. Valida primeiro. Orienta depois.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-soft hover:shadow-glow transition-shadow border border-dourado/10">
                <div className="w-12 h-12 bg-azul-light rounded-xl flex items-center justify-center flex-shrink-0">
                  <Moon className="w-6 h-6 text-azul-dark" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-escuro mb-1">Disponível às 3h da manhã</h3>
                  <p className="text-sm text-cinza leading-relaxed">
                    Sem horário comercial. Sem fila. Tá lá no exato momento em que ninguém mais está.
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-escuro rounded-2xl p-7 text-center shadow-soft">
                <p className="text-offwhite mb-5 leading-relaxed font-light">
                  Se livre do caos e crie uma infância mágica.<br />
                  <span className="text-dourado-light">Conheça a MaIA por dentro.</span>
                </p>
                <Button
                  onClick={onNavigateToSales}
                  className="bg-dourado hover:bg-dourado-light text-escuro font-semibold px-8 py-5 rounded-full shadow-soft hover:shadow-glow transition-all duration-300 hover:scale-105"
                >
                  Conhecer a MaIA por dentro
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
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

          {/* EDITÁVEL: assinatura da fundadora — substituir por bloco da Eliza com foto/nome quando estiver pronto. */}
          <p className="text-xs text-offwhite/40 mt-7 tracking-[0.15em] uppercase flex items-center justify-center gap-2">
            <BookOpen className="w-3.5 h-3.5" />
            Feito por mães. Validado por especialistas.
          </p>

          <div className="mt-10 pt-6 border-t border-offwhite/10">
            <p className="text-offwhite/45 text-xs">
              © 2026 MaIA · Todos os direitos reservados.
            </p>
            <p className="text-offwhite/30 text-[10px] mt-2 tracking-wide">
              Contato: [A PREENCHER — email oficial MaIA]
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
