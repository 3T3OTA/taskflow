import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface UseSEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  noindex?: boolean;
  structuredData?: object;
}

export const useSEO = ({
  title,
  description,
  keywords,
  noindex = false,
  structuredData,
}: UseSEOProps) => {
  const location = useLocation();

  useEffect(() => {
    if (title) {
      document.title = `${title} | TaskFlow`;
    }

    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords?.join(', ') },
      { name: 'robots', content: noindex ? 'noindex, nofollow' : 'index, follow' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: `https://taskflownow.vercel.app${location.pathname}` },
      { property: 'twitter:title', content: title },
      { property: 'twitter:description', content: description },
    ];

    metaTags.forEach(({ name, property, content }) => {
      if (!content) return;

      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
      let element = document.querySelector(selector);

      if (!element) {
        element = document.createElement('meta');
        if (name) element.setAttribute('name', name);
        if (property) element.setAttribute('property', property);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    });

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://taskflownow.vercel.app${location.pathname}`);

    if (structuredData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [title, description, keywords, noindex, location, structuredData]);
};
