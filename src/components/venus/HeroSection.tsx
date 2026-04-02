import { motion } from "framer-motion";

interface HeroSectionProps {
  onCtaClick: () => void;
}

const HeroSection = ({ onCtaClick }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, hsl(40 70% 50% / 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(345 50% 30% / 0.1) 0%, transparent 50%)'
        }} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="line-gold w-16" />
            <span className="text-gold text-xs font-body tracking-[0.4em] uppercase">Convite Privado</span>
            <div className="line-gold w-16" />
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold mb-6 leading-tight">
            <span className="gold-text">Convite Exclusivo</span>
            <br />
            <span className="text-foreground">Vênus Club</span>
          </h1>

          <p className="font-elegant text-xl md:text-2xl text-gold-light/80 mb-6 italic">
            Uma plataforma privada, seletiva e discreta, agora chegando a Belo Horizonte.
          </p>

          <p className="font-body text-sm md:text-base text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            Após consolidar sua atuação entre perfis de alto padrão em São Paulo e Rio de Janeiro, 
            o Vênus Club inicia sua expansão e abre um processo restrito para novas integrantes.
          </p>

          <motion.button
            onClick={onCtaClick}
            className="gold-gradient text-primary-foreground font-body font-medium text-sm tracking-widest uppercase px-10 py-4 rounded-sm animate-pulse-gold transition-all duration-300 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Quero Participar da Seleção
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
