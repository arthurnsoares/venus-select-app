import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "venus-form-data";
const STEP_KEY = "venus-form-step";

interface FormData {
  nome: string;
  idade: string;
  cidade: string;
  altura: string;
  biotipo: string;
  caracteristicas: string;
  idiomas: string;
  nivelCultural: string;
  descricao: string;
  diasDisponiveis: string;
  periodos: string;
  compromissos: string;
  contato: string;
  antecedencia: string;
  preferencias: string;
  faixaValores: string;
  formasPagamento: string;
}

const initialData: FormData = {
  nome: "", idade: "", cidade: "",
  altura: "", biotipo: "", caracteristicas: "",
  idiomas: "", nivelCultural: "", descricao: "",
  diasDisponiveis: "", periodos: "", compromissos: "",
  contato: "", antecedencia: "", preferencias: "",
  faixaValores: "", formasPagamento: "",
};

const steps = [
  {
    title: "Dados Pessoais",
    fields: [
      { key: "nome" as const, label: "Nome", type: "text", placeholder: "Seu nome" },
      { key: "idade" as const, label: "Idade", type: "text", placeholder: "Sua idade" },
      { key: "cidade" as const, label: "Cidade", type: "text", placeholder: "Sua cidade" },
    ],
  },
  {
    title: "Perfil Físico",
    fields: [
      { key: "altura" as const, label: "Altura", type: "text", placeholder: "Ex: 1,70m" },
      { key: "biotipo" as const, label: "Biotipo", type: "text", placeholder: "Ex: Magra, Curvilínea..." },
      { key: "caracteristicas" as const, label: "Características gerais", type: "textarea", placeholder: "Descreva brevemente..." },
    ],
  },
  {
    title: "Perfil Cultural",
    fields: [
      { key: "idiomas" as const, label: "Idiomas", type: "text", placeholder: "Ex: Português, Inglês..." },
      { key: "nivelCultural" as const, label: "Nível cultural", type: "text", placeholder: "Ex: Superior completo" },
      { key: "descricao" as const, label: "Breve descrição", type: "textarea", placeholder: "Conte um pouco sobre você..." },
    ],
  },
  {
    title: "Disponibilidade",
    fields: [
      { key: "diasDisponiveis" as const, label: "Dias disponíveis", type: "text", placeholder: "Ex: Segunda a Sexta" },
      { key: "periodos" as const, label: "Períodos", type: "text", placeholder: "Ex: Noturno" },
      { key: "compromissos" as const, label: "Tipos de compromissos", type: "textarea", placeholder: "Ex: Jantares, viagens..." },
    ],
  },
  {
    title: "Contato & Preferências",
    fields: [
      { key: "contato" as const, label: "Forma de contato", type: "text", placeholder: "WhatsApp, e-mail..." },
      { key: "antecedencia" as const, label: "Antecedência mínima", type: "text", placeholder: "Ex: 24 horas" },
      { key: "preferencias" as const, label: "Preferências e limites", type: "textarea", placeholder: "Descreva suas preferências..." },
    ],
  },
  {
    title: "Valores",
    fields: [
      { key: "faixaValores" as const, label: "Faixa de valores", type: "text", placeholder: "Sua faixa de valores" },
      { key: "formasPagamento" as const, label: "Formas de pagamento", type: "text", placeholder: "Pix, dinheiro, crédito, débito" },
    ],
  },
];

interface MultiStepFormProps {
  onSubmit: (data: FormData) => void;
}

const MultiStepForm = ({ onSubmit }: MultiStepFormProps) => {
  const [step, setStep] = useState(() => {
    const s = localStorage.getItem(STEP_KEY);
    return s ? Math.min(parseInt(s, 10), steps.length - 1) : 0;
  });

  const [data, setData] = useState<FormData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...initialData, ...JSON.parse(stored) } : initialData;
    } catch {
      return initialData;
    }
  });

  // Auto-save
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    localStorage.setItem(STEP_KEY, step.toString());
  }, [data, step]);

  const updateField = useCallback((key: keyof FormData, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const currentStep = steps[step];
  const progress = ((step + 1) / steps.length) * 100;

  return (
    <section className="py-20 px-4" id="venus-form">
      <div className="max-w-lg mx-auto">
        <motion.h2
          className="font-display text-2xl md:text-3xl text-center gold-text mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Formulário de Inscrição
        </motion.h2>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="font-body text-xs text-muted-foreground">Etapa {step + 1} de {steps.length}</span>
            <span className="font-body text-xs text-gold">{currentStep.title}</span>
          </div>
          <div className="h-0.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full gold-gradient"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="glass-card rounded-sm p-6 md:p-8"
          >
            <div className="space-y-5">
              {currentStep.fields.map((field) => (
                <div key={field.key}>
                  <label className="font-body text-xs text-gold-light/70 uppercase tracking-wider mb-2 block">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      value={data[field.key]}
                      onChange={(e) => updateField(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      rows={3}
                      className="w-full bg-muted/50 border border-border rounded-sm px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 transition-colors resize-none"
                    />
                  ) : (
                    <input
                      type={field.type}
                      value={data[field.key]}
                      onChange={(e) => updateField(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full bg-muted/50 border border-border rounded-sm px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 transition-colors"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-8">
              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="flex-1 py-3 rounded-sm border border-border font-body text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground hover:border-gold/30 transition-colors"
                >
                  Voltar
                </button>
              )}
              {step < steps.length - 1 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="flex-1 py-3 rounded-sm gold-gradient font-body text-xs uppercase tracking-wider text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  Próxima Etapa
                </button>
              ) : (
                <button
                  onClick={() => onSubmit(data)}
                  className="flex-1 py-3 rounded-sm gold-gradient font-body text-xs uppercase tracking-wider text-primary-foreground hover:opacity-90 transition-opacity animate-pulse-gold"
                >
                  Finalizar Inscrição
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <p className="font-body text-[10px] text-muted-foreground/50 text-center mt-4">
          Salvamento automático ativado
        </p>
      </div>
    </section>
  );
};

export default MultiStepForm;
