import DefaultLayout from "@/layouts/default";
import Hero from "@/components/home/hero";
import React, { Suspense } from "react";
import { SEO, pageSEO } from "@/components/SEO";
import { structuredData } from "@/utils/structuredData";

const HowItWorks = React.lazy(() => import("@/components/home/howitworks"));
const Features = React.lazy(() => import("@/components/home/features"));
const Testimonials = React.lazy(() => import("@/components/home/testimonials"));
const CallToAction = React.lazy(() => import("@/components/home/calltoaction"));

export default function HomePage() {
  React.useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData.webApplication);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <DefaultLayout>
        <SEO {...pageSEO.home} />
        <Hero />
        <Suspense fallback={null}>
          <HowItWorks />
          <Features />
          <Testimonials />
          <CallToAction />
        </Suspense>
    </DefaultLayout>
  );
}
