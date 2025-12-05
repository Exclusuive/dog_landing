import { useLanguage } from "@/context/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
  const copy = t<Record<string, string>>("pages");

  return (
    <div className="py-16 px-8 min-h-[60vh]">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl mb-8 text-foreground">{copy.contactTitle}</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">{copy.contactBody}</p>
      </div>
    </div>
  );
}
