import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const COUNTDOWN_KEY = "venus-countdown-end";

const getEndTime = (): number => {
  const stored = localStorage.getItem(COUNTDOWN_KEY);
  if (stored) return parseInt(stored, 10);
  const end = Date.now() + 48 * 60 * 60 * 1000;
  localStorage.setItem(COUNTDOWN_KEY, end.toString());
  return end;
};

const UrgencySection = () => {
  const [endTime] = useState(getEndTime);
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, endTime - Date.now());
      setTimeLeft({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endTime]);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <section className="py-20 px-4">
      <motion.div
        className="max-w-lg mx-auto text-center glass-card rounded-sm p-8 md:p-12"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display text-xl md:text-2xl text-foreground mb-2">
          Seu acesso é <span className="gold-text">temporário</span>
        </h2>
        <p className="font-body text-xs text-muted-foreground mb-8">
          Este convite expira em até 48 horas. Após esse período, sua vaga será direcionada à próxima candidata elegível.
        </p>

        <div className="flex items-center justify-center gap-4">
          {[
            { val: pad(timeLeft.h), label: "Horas" },
            { val: pad(timeLeft.m), label: "Min" },
            { val: pad(timeLeft.s), label: "Seg" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center">
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-sm border border-gold/30 bg-muted/50">
                <span className="font-display text-2xl md:text-3xl gold-text">{item.val}</span>
              </div>
              <span className="font-body text-[10px] text-muted-foreground mt-2 uppercase tracking-wider">{item.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default UrgencySection;
