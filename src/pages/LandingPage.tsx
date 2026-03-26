import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, Heart, Clock, Utensils, Brain, Home, Star, ArrowRight, CheckCircle2 } from 'lucide-react';

interface LandingPageProps {
  onNavigateToSales: () => void;
}

export default function LandingPage({ onNavigateToSales }: LandingPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      setIsSubmitted(true);
      setTimeout(() => {
        onNavigateToSales();
      }, 1500);
    }
  };

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="overflow-x-hidden">
      {/* Section 1: Hero */}
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-mint/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-peach/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-32 left-1/2 w-[600px] h-[600px] bg-lime/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-mint/20 rounded-full animate-float" />
        <div className="absolute bottom-40 right-20 w-16 h-16 bg-peach/30 rounded-full animate-float animation-delay-2000" />
        <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-lime/25 rounded-full animate-float animation-delay-4000" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className={`transition-all duration-1000 ${
              visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-soft mb-8">
              <Sparkles className="w-4 h-4 text-mint-dark" />
              <span className="text-sm font-medium text-darkblue">Para mães de bebês e crianças até 5 anos</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-script text-5xl sm:text-6xl lg:text-7xl text-darkblue mb-6 leading-tight">
              Transforme a Maternidade
              <span className="block text-mint-dark">com a Mágica da IA</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-4 leading-relaxed">
              Descubra como a inteligência artificial pode ser sua aliada no dia a dia como mãe. 
              Menos sobrecarga, mais momentos mágicos.
            </p>

            {/* Creator Intro */}
            <p className="text-base text-gray-500 mb-10">
              Criado com carinho por <span className="font-script text-2xl text-mint-dark">Eliza</span>, 
              uma mãe que entende seus desafios
            </p>

            {/* CTA Button */}
            <Button
              onClick={() => scrollToSection(leadMagnetRef)}
              className="bg-mint hover:bg-mint-dark text-darkblue font-semibold px-8 py-6 text-lg rounded-full shadow-soft hover:shadow-glow transition-all duration-300 hover:scale-105"
            >
              Quero Aliviar Minha Rotina
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-mint-dark/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-mint-dark/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Section 2: Lead Magnet */}
      <section
        id="lead-magnet"
        ref={leadMagnetRef}
        className="relative py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Side */}
            <div
              className={`relative transition-all duration-1000 delay-200 ${
                visibleSections.has('lead-magnet') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/planner-mockup.jpg"
                  alt="Planner Notion para Mães"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mint/20 to-transparent" />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-soft p-4 animate-float">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-mint rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-darkblue" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-darkblue">100% Gratuito</p>
                    <p className="text-xs text-gray-500">Acesso imediato</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div
              className={`transition-all duration-1000 delay-400 ${
                visibleSections.has('lead-magnet') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-10 shadow-soft">
                <div className="inline-flex items-center gap-2 bg-peach/30 px-3 py-1 rounded-full mb-4">
                  <Star className="w-4 h-4 text-peach-dark" />
                  <span className="text-sm font-medium text-darkblue">Presente especial para você</span>
                </div>

                <h2 className="font-script text-4xl sm:text-5xl text-darkblue mb-4">
                  Experimente a Mágica Gratuitamente
                </h2>

                <p className="text-gray-600 mb-8 leading-relaxed">
                  Receba o nosso <strong>Planner Notion exclusivo para mães</strong> e descubra 
                  <strong> 3 prompts de IA</strong> que podem economizar <strong>30 minutos</strong> do seu dia HOJE.
                </p>

                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <Label htmlFor="name" className="text-darkblue font-medium mb-2 block">
                        Seu nome
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Como você gosta de ser chamada?"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-mint/30 focus:border-mint focus:ring-mint transition-all"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-darkblue font-medium mb-2 block">
                        Seu melhor e-mail
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-mint/30 focus:border-mint focus:ring-mint transition-all"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-mint hover:bg-mint-dark text-darkblue font-semibold py-4 rounded-xl shadow-soft hover:shadow-glow transition-all duration-300 hover:scale-[1.02] text-lg"
                    >
                      Quero Meu Planner Grátis
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>

                    <p className="text-xs text-gray-400 text-center">
                      Prometemos não enviar spam. Seu e-mail está seguro conosco.
                    </p>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-mint rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-soft">
                      <CheckCircle2 className="w-8 h-8 text-darkblue" />
                    </div>
                    <h3 className="text-2xl font-script text-darkblue mb-2">Obrigada!</h3>
                    <p className="text-gray-600">
                      Em breve você receberá seu planner no e-mail. 
                      Redirecionando para a próxima página...
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Story & Problem/Solution */}
      <section
        id="story"
        ref={storyRef}
        className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white/50"
      >
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              visibleSections.has('story') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="font-script text-4xl sm:text-5xl text-darkblue mb-4">
              Eu Sei Exatamente Como Você Se Sente
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-mint to-peach mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Story Image */}
            <div
              className={`relative transition-all duration-1000 delay-200 ${
                visibleSections.has('story') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/story-mom.jpg"
                  alt="Mãe com seu filho"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mint/10 to-transparent" />
              </div>
              
              {/* Quote Card */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-soft p-6 max-w-xs">
                <p className="font-script text-xl text-darkblue italic">
                  "Eu sempre quis ser aquela mãe que faz a infância parecer mágica..."
                </p>
                <p className="text-sm text-gray-500 mt-2">— Eliza</p>
              </div>
            </div>

            {/* Story Content */}
            <div
              className={`space-y-6 transition-all duration-1000 delay-400 ${
                visibleSections.has('story') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  Mas nos primeiros anos da vida do meu filho, eu estava presa no modo sobrevivência — 
                  conciliando trabalho, cuidando de um bebê, e me sentindo afogada na carga mental invisível.
                </p>
                
                <p className="text-gray-600 leading-relaxed">
                  A lista de tarefas parecia infinita. Eu acordava exausta antes mesmo do dia começar. 
                  E a culpa de não estar "presente" o suficiente me consumia.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  Tentei de tudo: acordar antes das crianças, organizar obsessivamente, 
                  "ser mais disciplinada"... mas nada funcionava.
                </p>
              </div>

              {/* Problem Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-soft border-l-4 border-peach">
                  <Clock className="w-6 h-6 text-peach-dark mb-2" />
                  <p className="text-sm text-gray-600">Acordar exausta antes do dia começar</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-soft border-l-4 border-mint">
                  <Brain className="w-6 h-6 text-mint-dark mb-2" />
                  <p className="text-sm text-gray-600">A lista de tarefas parece infinita</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-soft border-l-4 border-lime">
                  <Heart className="w-6 h-6 text-lime-dark mb-2" />
                  <p className="text-sm text-gray-600">A culpa de não estar presente</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-soft border-l-4 border-peach">
                  <Home className="w-6 h-6 text-peach-dark mb-2" />
                  <p className="text-sm text-gray-600">Casa sempre uma bagunça</p>
                </div>
              </div>

              {/* The Turning Point */}
              <div className="bg-gradient-to-r from-mint/20 to-peach/20 rounded-2xl p-6">
                <p className="text-darkblue font-medium text-lg mb-2">
                  Até que descobri algo que mudou tudo...
                </p>
                <p className="text-gray-600">
                  A inteligência artificial não é só para grandes empresas. Ela pode ser 
                  <strong> sua assistente pessoal</strong>, pensando POR você e aliviando essa carga mental.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Soft Pitch */}
      <section
        id="soft-pitch"
        ref={softPitchRef}
        className="relative py-24 px-4 sm:px-6 lg:px-8"
      >
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-mint/10 rounded-full filter blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Section Header */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              visibleSections.has('soft-pitch') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-flex items-center gap-2 bg-mint/20 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-mint-dark" />
              <span className="text-sm font-medium text-darkblue">A próxima etapa da sua jornada</span>
            </div>
            <h2 className="font-script text-4xl sm:text-5xl text-darkblue mb-4">
              Conheça Sua Nova Aliada
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Uma assistente virtual criada especialmente para mães como você
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* AI Orb Visualization */}
            <div
              className={`relative flex justify-center transition-all duration-1000 delay-200 ${
                visibleSections.has('soft-pitch') ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
            >
              <div className="relative">
                <img
                  src="/ai-orb.png"
                  alt="Assistente Virtual"
                  className="w-80 h-80 object-contain animate-pulse-soft"
                />
                
                {/* Floating Feature Icons */}
                <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-soft p-3 animate-float">
                  <Utensils className="w-6 h-6 text-mint-dark" />
                </div>
                <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-soft p-3 animate-float animation-delay-2000">
                  <Clock className="w-6 h-6 text-peach-dark" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-soft p-3 animate-float animation-delay-4000">
                  <Heart className="w-6 h-6 text-lime-dark" />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-soft p-3 animate-float">
                  <Brain className="w-6 h-6 text-mint-dark" />
                </div>
              </div>
            </div>

            {/* Features List */}
            <div
              className={`space-y-6 transition-all duration-1000 delay-400 ${
                visibleSections.has('soft-pitch') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-soft hover:shadow-glow transition-shadow">
                  <div className="w-12 h-12 bg-mint/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Utensils className="w-6 h-6 text-mint-dark" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-darkblue mb-1">Refeições Saudáveis</h3>
                    <p className="text-sm text-gray-600">Planejamento de cardápios nutritivos em segundos</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-soft hover:shadow-glow transition-shadow">
                  <div className="w-12 h-12 bg-peach/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-peach-dark" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-darkblue mb-1">Rotinas de Sono</h3>
                    <p className="text-sm text-gray-600">Ajuda para criar hábitos de sono que funcionam</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-soft hover:shadow-glow transition-shadow">
                  <div className="w-12 h-12 bg-lime/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-lime-dark" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-darkblue mb-1">Apoio Emocional 24/7</h3>
                    <p className="text-sm text-gray-600">Alguém para conversar nos momentos difíceis</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-soft hover:shadow-glow transition-shadow">
                  <div className="w-12 h-12 bg-mint/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Home className="w-6 h-6 text-mint-dark" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-darkblue mb-1">Organização da Casa</h3>
                    <p className="text-sm text-gray-600">Dicas práticas para manter tudo em ordem</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-r from-mint/30 to-peach/30 rounded-2xl p-6 text-center">
                <p className="text-darkblue mb-4">
                  Quer saber mais sobre como essa assistente pode transformar seu dia a dia?
                </p>
                <Button
                  onClick={onNavigateToSales}
                  className="bg-darkblue hover:bg-darkblue/90 text-white font-semibold px-8 py-4 rounded-full shadow-soft hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Descobrir a Assistente
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-darkblue text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-script text-3xl mb-4">Mamãe Aliviada</p>
          <p className="text-white/60 text-sm">
            Criado com amor para mães que merecem mais tranquilidade
          </p>
          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-white/40 text-xs">
              © 2025 Mamãe Aliviada. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
