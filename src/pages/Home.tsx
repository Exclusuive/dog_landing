import Hero from "@/components/sections/Hero";
import WhyNose from "@/components/sections/WhyNose";
import HowItWorks from "@/components/sections/HowItWorks";
// import TargetAudience from "@/components/sections/TargetAudience";
import TryItNow from "@/components/sections/TryItNow";
// import Partnership from "@/components/sections/Partnership";
import FloatingButton from "@/components/FloatingButton";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <WhyNose />
      <HowItWorks />
      {/* <TargetAudience /> */}
      <TryItNow />
      {/* <Partnership /> */}
      <FloatingButton />
    </div>
  );
}
