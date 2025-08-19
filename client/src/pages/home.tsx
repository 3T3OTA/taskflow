import DefaultLayout from "@/layouts/default";
import Hero from "@/components/home/hero";
import Features from "@/components/home/features";
import Trusted from "@/components/home/trusted";
import Testimonials from "@/components/home/testimonials";
import HowItWorks from "@/components/home/howitworks";
import CallToAction from "@/components/home/calltoaction";
import GlowEffect from "@/components/ui/glow-effect";
import { Divider } from "@heroui/react";

export default function HomePage() {
  return (
    <DefaultLayout>
      <GlowEffect variant="primary" intensity="high" className="min-h-screen">
        <Hero />
        <Divider />
        <Trusted />
        <HowItWorks />
        <Features />
        <Testimonials />
        <CallToAction />
        {}
      </GlowEffect>
    </DefaultLayout>
  );
}
