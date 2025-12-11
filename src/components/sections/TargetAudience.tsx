import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";

export default function TargetAudience() {
  const { t } = useLanguage();
  const content = t<Record<string, any>>("targetAudience");
  const targets = content.targets as Array<{
    icon: string;
    title: string;
    description: string;
  }>;

  return (
    <section className="py-20 px-4 sm:px-8 bg-background pt-16">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-foreground break-keep">
          {content.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {targets.map((target, index) => (
            <Card
              key={index}
              className="border-2 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <CardContent className="p-8 text-center flex flex-col items-center h-full">
                <div className="text-6xl mb-6">{target.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-foreground break-keep">
                  {target.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed break-keep">
                  {target.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

