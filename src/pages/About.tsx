import { useLanguage } from "@/context/LanguageContext";

export default function About() {
  const { t } = useLanguage();
  const copy = t<Record<string, string>>("pages");

  return (
    <div className="py-16 px-8 min-h-[60vh]">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl mb-8 text-foreground">{copy.aboutTitle}</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">{copy.aboutBody}</p>
      </div>
    </div>
  );
}
