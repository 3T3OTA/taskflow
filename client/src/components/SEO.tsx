import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  noindex?: boolean;
}

const defaultSEO = {
  title: 'TaskFlow - Modern Task Management & Project Planning Tool',
  description: 'Organize your projects with TaskFlow - A powerful, intuitive task management tool. Create boards, manage tasks, and collaborate with your team efficiently.',
  keywords: ['task management', 'project management', 'kanban board', 'taskflow', 'productivity'],
  ogType: 'website',
  baseUrl: 'https://taskflownow.vercel.app',
};

export const SEO = ({
  title,
  description,
  keywords,
  ogImage,
  ogType = 'website',
  canonicalUrl,
  noindex = false,
}: SEOProps) => {
  const location = useLocation();

  useEffect(() => {
    const pageTitle = title ? `${title} | TaskFlow` : defaultSEO.title;
    document.title = pageTitle;

    const updateMetaTag = (selector: string, content: string, attribute = 'content') => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        const attributeName = selector.includes('property') ? 'property' : 'name';
        const attributeValue = selector.replace(/\[.*?=['"]|['"]\]/g, '');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, content);
    };

    const pageDescription = description || defaultSEO.description;
    updateMetaTag('meta[name="description"]', pageDescription);
    updateMetaTag('meta[property="og:description"]', pageDescription);
    updateMetaTag('meta[property="twitter:description"]', pageDescription);

    updateMetaTag('meta[property="og:title"]', pageTitle);
    updateMetaTag('meta[property="twitter:title"]', pageTitle);

    const pageKeywords = keywords || defaultSEO.keywords;
    updateMetaTag('meta[name="keywords"]', pageKeywords.join(', '));

    updateMetaTag('meta[property="og:type"]', ogType);

    const currentUrl = canonicalUrl || `${defaultSEO.baseUrl}${location.pathname}`;
    updateMetaTag('meta[property="og:url"]', currentUrl);
    updateMetaTag('meta[property="twitter:url"]', currentUrl);

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);

    const robotsContent = noindex ? 'noindex, nofollow' : 'index, follow';
    updateMetaTag('meta[name="robots"]', robotsContent);

  }, [title, description, keywords, ogImage, ogType, canonicalUrl, noindex, location]);

  return null;
};

export const pageSEO = {
  home: {
    title: 'Home',
    description: 'Welcome to TaskFlow - Your ultimate task management and project planning solution. Get started for free today!',
    keywords: ['task management', 'project planning', 'kanban board', 'productivity tool'],
  },
  login: {
    title: 'Login',
    description: 'Sign in to your TaskFlow account and start managing your tasks efficiently.',
    keywords: ['login', 'sign in', 'taskflow account'],
    noindex: true,
  },
  register: {
    title: 'Sign Up',
    description: 'Create your free TaskFlow account and start organizing your projects today.',
    keywords: ['register', 'sign up', 'create account', 'free trial'],
    noindex: true,
  },
  dashboard: {
    title: 'Dashboard',
    description: 'Manage all your boards and tasks from your TaskFlow dashboard.',
    keywords: ['dashboard', 'task board', 'project overview'],
    noindex: true,
  },
  profile: {
    title: 'Profile',
    description: 'Manage your TaskFlow profile settings and preferences.',
    keywords: ['profile', 'account settings', 'user settings'],
    noindex: true,
  },
  board: {
    title: 'Board',
    description: 'Organize and manage your tasks with TaskFlow boards.',
    keywords: ['kanban board', 'task board', 'project board'],
    noindex: true,
  },
};
