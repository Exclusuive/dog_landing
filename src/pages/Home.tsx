import { useEffect } from "react";
import Hero from "@/components/sections/Hero";
import WhyNose from "@/components/sections/WhyNose";
import HowItWorks from "@/components/sections/HowItWorks";
import TryItNow from "@/components/sections/TryItNow";
import FloatingButton from "@/components/FloatingButton";
import { logEvent } from "@/utils/analytics";

export default function Home() {
  useEffect(() => {
    // List of section IDs to track
    const sections = [
      { id: "hero-section", event: "Hero" },
      { id: "how-it-works-section", event: "How_It_Works" },
      { id: "why-nose-section", event: "Why_Nose" },
      { id: "try-it-now-section", event: "Try_It_Now" },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = sections.find((s) => s.id === entry.target.id);
            if (section) {
              logEvent(section.event);
              // Optional: Stop observing if we only want to track once session
              // observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the component is visible
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="w-full">
      <div id="hero-section">
        <Hero />
      </div>
      <div id="how-it-works-section">
        <HowItWorks />
      </div>
      <div id="why-nose-section">
        <WhyNose />
      </div>
      {/* <TargetAudience /> */}
      <div id="try-it-now-section">
        <TryItNow />
      </div>
      <FloatingButton />
    </div>
  );
}
