import { createI18n } from 'vue-i18n'

const messages = {
  cs: {
    common: {
      companyName: 'VALOR FORTIS a.s.'
    },
    nav: {
      logoAlt: 'Logo Valor Fortis',
      menuAriaLabel: 'Menu',
      home: 'Domov',
      documents: 'Dokumenty',
      career: 'Kariéra',
      contact: 'Kontakt'
    },
    hero: {
      videoNotSupported: 'Prohlížeč nepodporuje video tag.',
      layerAlt: 'Hero vrstva'
    },
    footer: {
      copyright: '© 2026 VALOR FORTIS a.s.',
      privacyNotice: 'Nesbíráme o Vás žádné osobní údaje a cookies.',
      legalInfo: 'Právní informace'
    },
    documents: {
      title: 'Dokumenty',
      navAriaLabel: 'Dokumenty',
      mandatoryDisclosure: 'Povinné zveřejňování',
      mandatoryDisclosureAlt: 'Povinné zveřejňování',
      sectionMessages: 'Oznámení',
      placeholderDocument: 'Placeholder dokumentu'
    },
    career: {
      title: 'Kariéra',
      noOpenPositions: 'Aktuálně nemáme otevřené žádné nové pozice.'
    },
    contact: {
      title: 'Kontakt',
      address: 'Vladislavova 17, 110 00 Praha',
      country: 'Česká republika',
      phoneLabel: 'T',
      emailLabel: 'E'
    },
    legal: {
      title: 'Právní informace',
      paragraph1: 'VALOR FORTIS a.s. je nezávislá společnost a není propojena se společností SIX Financial Information AG ani s jejími ochrannými známkami (například VALORDATA).',
      paragraph2: 'VALOR FORTIS a.s. je nezávislá společnost a není propojena se společností BNP Paribas Fortis.',
      paragraph3: 'VALOR FORTIS a.s. je nezávislá společnost, která není propojena se společností SIX Financial Information AG ani s jejími ochrannými známkami (např. VALORDATA).',
      paragraph4: 'VALOR FORTIS a.s. je nezávislá společnost, která není propojena se společností BNP Paribas Fortis.'
    },
    routes: {
      home: {
        title: 'VALOR FORTIS',
        heroTitle: 'Profesionální správa\nfinančního majetku',
        heroLinkLabel: 'Objevit více'
      },
      documents: {
        title: 'Dokumenty | VALOR FORTIS',
        heroTitle: 'Dokumenty',
        heroLinkLabel: 'Číst více'
      },
      career: {
        title: 'Kariéra | VALOR FORTIS',
        heroTitle: 'Kariéra',
        heroLinkLabel: 'Číst více'
      },
      contact: {
        title: 'Kontakt | VALOR FORTIS',
        heroTitle: 'Jsme tu pro vás',
        heroLinkLabel: 'Kontaktujte nás'
      },
      info: {
        title: 'Právní informace | VALOR FORTIS',
        heroTitle: 'Právní informace',
        heroLinkLabel: 'Číst více'
      }
    }
  },
  en: {
    common: {
      companyName: 'VALOR FORTIS a.s.'
    },
    nav: {
      logoAlt: 'Valor Fortis logo',
      menuAriaLabel: 'Menu',
      home: 'Home',
      documents: 'Documents',
      career: 'Career',
      contact: 'Contact'
    },
    hero: {
      videoNotSupported: 'Your browser does not support the video tag.',
      layerAlt: 'Hero Layer'
    },
    footer: {
      copyright: '© 2026 VALOR FORTIS a.s.',
      privacyNotice: 'We do not collect any personal data or cookies about you.',
      legalInfo: 'Legal information'
    },
    documents: {
      title: 'Documents',
      navAriaLabel: 'Documents',
      mandatoryDisclosure: 'Mandatory disclosure',
      mandatoryDisclosureAlt: 'Mandatory disclosure',
      sectionMessages: 'Announcements',
      placeholderDocument: 'Document placeholder'
    },
    career: {
      title: 'Career',
      noOpenPositions: 'We currently do not have any open positions.'
    },
    contact: {
      title: 'Contact',
      address: 'Vladislavova 17, 110 00 Prague',
      country: 'Czech Republic',
      phoneLabel: 'T',
      emailLabel: 'E'
    },
    legal: {
      title: 'Legal information',
      paragraph1: 'VALOR FORTIS a.s. is an independent company and is not affiliated with SIX Financial Information AG or its trademarks (for example VALORDATA).',
      paragraph2: 'VALOR FORTIS a.s. is an independent company and is not affiliated with BNP Paribas Fortis.',
      paragraph3: 'VALOR FORTIS a.s. is an independent company and is not affiliated with SIX Financial Information AG or its trademarks (e.g. VALORDATA).',
      paragraph4: 'VALOR FORTIS a.s. is an independent company and is not affiliated with BNP Paribas Fortis.'
    },
    routes: {
      home: {
        title: 'VALOR FORTIS',
        heroTitle: 'Professional management\nof financial assets',
        heroLinkLabel: 'Discover more'
      },
      documents: {
        title: 'Documents | VALOR FORTIS',
        heroTitle: 'Documents',
        heroLinkLabel: 'Read more'
      },
      career: {
        title: 'Career | VALOR FORTIS',
        heroTitle: 'Career',
        heroLinkLabel: 'Read more'
      },
      contact: {
        title: 'Contact | VALOR FORTIS',
        heroTitle: 'We are here for you',
        heroLinkLabel: 'Contact us'
      },
      info: {
        title: 'Legal information | VALOR FORTIS',
        heroTitle: 'Legal information',
        heroLinkLabel: 'Read more'
      }
    }
  }
}

const i18n = createI18n({
  legacy: false,
  locale: 'cs',
  fallbackLocale: 'en',
  globalInjection: true,
  messages
})

export default i18n
