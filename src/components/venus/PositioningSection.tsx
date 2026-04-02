import { motion } from "framer-motion";

const PositioningSection = () => (
  <section className="py-20 px-4">
    <motion.div
      className="max-w-2xl mx-auto text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <div className="line-gold w-16 mx-auto mb-8" />
      <p className="font-elegant text-lg md:text-2xl text-foreground/80 italic leading-relaxed">
        O Vênus Club conecta perfis selecionados a experiências de alto padrão, com foco em{" "}
        <span className="gold-text">discrição, elegância e valorização individual</span>.
      </p>
      <div className="line-gold w-16 mx-auto mt-8" />
    </motion.div>
  </section>
);

export default PositioningSection;
