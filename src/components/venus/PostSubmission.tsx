import { motion } from "framer-motion";
import { Check } from "lucide-react";

const PostSubmission = () => (
  <motion.div
    className="min-h-screen flex items-center justify-center px-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
  >
    <div className="max-w-md text-center">
      <motion.div
        className="w-16 h-16 mx-auto mb-8 rounded-full border border-gold/40 flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring" }}
      >
        <Check className="w-7 h-7 text-gold" />
      </motion.div>

      <h2 className="font-display text-2xl md:text-3xl gold-text mb-6">
        Inscrição Enviada
      </h2>

      <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
        Caso seu perfil seja selecionado, nossa equipe entrará em contato.
      </p>
      <p className="font-body text-sm text-muted-foreground mb-8">
        Desejamos boa sorte.
      </p>

      <div className="line-gold w-16 mx-auto mb-4" />
      <p className="font-elegant text-lg text-gold-light/60 italic">
        Att. Vênus Club
      </p>
    </div>
  </motion.div>
);

export default PostSubmission;
