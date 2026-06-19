export function StructuredData() {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'CM Studio',
    url: 'https://cmstudio.digital',
    logo: 'https://cmstudio.digital/logo.png',
    description:
      'CM Studio builds modern landing pages, business websites, e-commerce platforms, web applications, and automation solutions for companies ready to grow online.',
    founder: {
      '@type': 'Person',
      name: 'Carlos Montalvo',
      jobTitle: 'Founder / Digital Solutions Developer',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'SV',
      addressRegion: 'La Libertad',
    },
    areaServed: ['SV', 'US'],
    serviceType: [
      'Web Development',
      'Landing Pages',
      'E-Commerce',
      'Web Applications',
      'Automation',
      'Cloud Infrastructure',
    ],
    sameAs: [
      'https://github.com/cmstudio',
      'https://linkedin.com/company/cmstudio',
      'https://instagram.com/cmstudio',
    ],
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'CM Studio',
    url: 'https://cmstudio.digital',
    inLanguage: ['en', 'es'],
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://cmstudio.digital/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
