export const structuredData = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TaskFlow',
    description: 'Modern task management and project planning tool',
    url: 'https://taskflownow.vercel.app',
    sameAs: [
      'https://github.com/3T3OTA',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'support@taskflownow.vercel.app',
    },
  },
  
  webApplication: {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'TaskFlow',
    description: 'Organize your projects with TaskFlow - A powerful, intuitive task management tool. Create boards, manage tasks, and collaborate with your team efficiently.',
    url: 'https://taskflownow.vercel.app',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '150',
    },
  },

  breadcrumb: (items: { name: string; url: string }[]) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }),
};

export const injectStructuredData = (data: object) => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(data);
  
  const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
  existingScripts.forEach(s => s.remove());
  
  document.head.appendChild(script);
};
