import { useState, useRef } from "react";
import HeroSection from "@/components/venus/HeroSection";
import ExclusivitySection from "@/components/venus/ExclusivitySection";
import UrgencySection from "@/components/venus/UrgencySection";
import SecuritySection from "@/components/venus/SecuritySection";
import FileUploadSection from "@/components/venus/FileUploadSection";
import MultiStepForm from "@/components/venus/MultiStepForm";
import PositioningSection from "@/components/venus/PositioningSection";
import PostSubmission from "@/components/venus/PostSubmission";

interface UploadedFile {
  file: File;
  preview?: string;
}

const Index = () => {
  const [submitted, setSubmitted] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = () => {
    localStorage.removeItem("venus-form-data");
    localStorage.removeItem("venus-form-step");
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) return <PostSubmission />;

  return (
    <div className="min-h-screen bg-background">
      <HeroSection onCtaClick={scrollToForm} />

      <div className="line-gold max-w-xs mx-auto" />

      <ExclusivitySection />

      <UrgencySection />

      <div className="line-gold max-w-xs mx-auto" />

      <SecuritySection />

      <div className="line-gold max-w-xs mx-auto" />

      <FileUploadSection files={files} setFiles={setFiles} />

      <div ref={formRef}>
        <MultiStepForm onSubmit={handleSubmit} />
      </div>

      <div className="line-gold max-w-xs mx-auto" />

      <PositioningSection />

      {/* Footer */}
      <footer className="py-8 text-center">
        <p className="font-elegant text-sm text-muted-foreground/40 italic">
          © {new Date().getFullYear()} Vênus Club — Todos os direitos reservados
        </p>
      </footer>
    </div>
  );
};

export default Index;
