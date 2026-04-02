import { motion } from "framer-motion";
import { Shield, Lock, Eye } from "lucide-react";

const items = [
  {
    icon: Lock,
    title: "Criptografia de ponta a ponta",
    desc: "Dados protegidos com os mais altos padrões de segurança",
  },
  {
    icon: Shield,
    title: "Tecnologia equivalente",
    desc: "Mesmo nível de proteção utilizado por WhatsApp e Telegram",
  },
  {
    icon: Eye,
    title: "100% Confidencial",
    desc: "Ambiente totalmente privado e discreto",
  },
];

const SecuritySection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="font-display text-2xl md:text-3xl text-center gold-text mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Sua segurança é prioridade
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              className="glass-card rounded-sm p-6 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center border border-gold/30">
                <item.icon className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-display text-sm text-foreground mb-2">{item.title}</h3>
              <p className="font-body text-xs text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
