import type { Metadata } from "next";

export const SITE_URL = "https://bizlume.in";
export const BRAND_NAME = "BizLume HMS";
export const COMPANY_NAME = "BizLume Technology & Solutions";

export interface SEOProps {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  ogImage?: string;
}

export function constructMetadata({
  title,
  description,
  path = "",
  keywords = [
    "Hospital Management Software India",
    "Best Hospital Management System",
    "EMR Software India",
    "Clinic Management System",
    "Digital OPD Management",
    "Patient Queue Management",
    "Hospital Billing Software",
    "Healthcare Management System India"
  ],
  ogImage = "/og-image.jpg"
}: SEOProps): Metadata {
  const url = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  return {
    title: `${title} | ${BRAND_NAME}`,
    description,
    keywords,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${BRAND_NAME}`,
      description,
      url,
      siteName: BRAND_NAME,
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: ogImage,
          secureUrl: `${SITE_URL}${ogImage}`,
          width: 1200,
          height: 675,
          type: "image/jpeg",
          alt: `${title} - ${BRAND_NAME}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${BRAND_NAME}`,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY_NAME,
    alternateName: BRAND_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo-icon.png`,
    contactPoint: {
      "@type": "ContactPoint",
      email: "contact@bizlume.in",
      contactType: "customer support",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      "https://bizlume.in",
      "https://github.com/bizlumetechnologysolutions/BizLume_HMS_v1.0"
    ],
  };
}

export function getSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: BRAND_NAME,
    operatingSystem: "Web-based, All modern browsers (Chrome, Edge, Safari, Firefox)",
    applicationCategory: "HealthApplication",
    applicationSubCategory: "Hospital Management Software",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      description: "Custom enterprise pricing for Indian hospitals, nursing homes, and clinics.",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "84",
    },
    description: "An AI-assisted, clinician-first Hospital Management & Electronic Medical Records (EMR) platform with patient intake, smart queue scoring, diagnostics, and integrated billing.",
    softwareRequirements: "Modern web browser with Internet or LAN access",
    creator: {
      "@type": "Organization",
      name: COMPANY_NAME,
      url: SITE_URL,
    },
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
