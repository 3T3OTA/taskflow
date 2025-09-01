import DefaultLayout from "@/layouts/default";
import Hero from "@/components/home/hero";
import GlowEffect from "@/components/ui/glow-effect";
import { Divider } from "@heroui/react";
import React, { Suspense } from "react";

const HowItWorks = React.lazy(() => import("@/components/home/howitworks"));
const Features = React.lazy(() => import("@/components/home/features"));
const Testimonials = React.lazy(() => import("@/components/home/testimonials"));
const CallToAction = React.lazy(() => import("@/components/home/calltoaction"));

export default function HomePage() {
  return (
    <DefaultLayout>
      <GlowEffect variant="primary" className="min-h-screen">
        <Hero />
        <Divider />
        <Suspense fallback={null}>
          <HowItWorks />
          <Features />
          <Testimonials />
          <CallToAction />
        </Suspense>
      </GlowEffect>
    </DefaultLayout>
  );
}
