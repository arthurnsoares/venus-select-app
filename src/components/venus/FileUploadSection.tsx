import { motion } from "framer-motion";
import { Upload, Image, Video, FileText, X } from "lucide-react";
import { useCallback, useState } from "react";

interface UploadedFile {
  file: File;
  preview?: string;
}

interface FileUploadSectionProps {
  files: UploadedFile[];
  setFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
}

const FileUploadSection = ({ files, setFiles }: FileUploadSectionProps) => {
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = useCallback((fileList: FileList) => {
    const newFiles: UploadedFile[] = Array.from(fileList).map((file) => ({
      file,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  }, [setFiles]);

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const updated = [...prev];
      if (updated[index].preview) URL.revokeObjectURL(updated[index].preview!);
      updated.splice(index, 1);
      return updated;
    });
  };

  return (
    <section className="py-20 px-4">
      <motion.div
        className="max-w-xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display text-2xl md:text-3xl text-center gold-text mb-4">
          Envie suas mídias
        </h2>
        <p className="font-body text-xs text-muted-foreground text-center mb-8">
          Fotos • Vídeo (opcional) • Documentos (opcional)
        </p>

        <div
          className={`glass-card rounded-sm p-8 text-center cursor-pointer transition-all duration-300 ${
            dragActive ? "border-gold/60 bg-gold/5" : ""
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => { e.preventDefault(); setDragActive(false); handleFiles(e.dataTransfer.files); }}
          onClick={() => document.getElementById("venus-file-input")?.click()}
        >
          <Upload className="w-8 h-8 text-gold/60 mx-auto mb-3" />
          <p className="font-body text-sm text-foreground mb-1">Arraste e solte seus arquivos aqui</p>
          <p className="font-body text-xs text-muted-foreground">ou clique para selecionar</p>
          <input
            id="venus-file-input"
            type="file"
            multiple
            accept="image/*,video/*,.pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
          />
        </div>

        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((f, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-sm bg-muted/30 border border-border">
                {f.preview ? (
                  <img src={f.preview} alt="" className="w-10 h-10 rounded-sm object-cover" />
                ) : f.file.type.startsWith("video/") ? (
                  <Video className="w-5 h-5 text-gold/60" />
                ) : f.file.type.startsWith("image/") ? (
                  <Image className="w-5 h-5 text-gold/60" />
                ) : (
                  <FileText className="w-5 h-5 text-gold/60" />
                )}
                <span className="font-body text-xs text-foreground flex-1 truncate">{f.file.name}</span>
                <button onClick={(e) => { e.stopPropagation(); removeFile(i); }} className="text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center gap-6 mt-6">
          {[
            { icon: Image, label: "Fotos" },
            { icon: Video, label: "Vídeo" },
            { icon: FileText, label: "Docs" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-1">
              <item.icon className="w-4 h-4 text-gold/40" />
              <span className="font-body text-[10px] text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default FileUploadSection;
