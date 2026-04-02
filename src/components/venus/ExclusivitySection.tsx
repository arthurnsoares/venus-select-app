import { motion } from "framer-motion";

const ExclusivitySection = () => {
  return (
    <section className="py-20 px-4">
      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="line-gold w-24 mx-auto mb-8" />

        <h2 className="font-display text-2xl md:text-4xl gold-text mb-8">
          Você foi pré-selecionada
        </h2>

        <div className="space-y-6 font-body text-sm md:text-base text-muted-foreground leading-relaxed">
          <p>
            Você foi pré-selecionada para participar de um <span className="text-gold-light">processo confidencial</span>.
          </p>
          <p>
            O acesso ao Vênus Club acontece apenas por <span className="text-gold-light">convite</span> e análise criteriosa de perfil.
          </p>
          <p>
            Cada candidatura é avaliada com <span className="text-gold-light">discrição, respeito e total profissionalismo</span>.
          </p>
        </div>

        <div className="line-gold w-24 mx-auto mt-8" />
      </motion.div>
    </section>
  );
};

export default ExclusivitySection;
