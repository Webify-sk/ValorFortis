<template>
  <section id="kontakt" class="content-section">
    <div class="content-container contact-container">
      <h1>{{ $t('contact.title') }}</h1>
      <hr class="contact-divider">

      <div class="contact-info">
        <p class="company-name">{{ $t('common.companyName') }}</p>
        <p>{{ $t('contact.address') }}</p>
        <p>{{ $t('contact.country') }}</p>

        <div class="contact-spacer"></div>

        <p>{{ $t('contact.phoneLabel') }}&nbsp;<a href="tel:+420226886690">+420 226 886 690</a></p>
        <p>{{ $t('contact.emailLabel') }}&nbsp;<a href="mailto:info@valorfortis.cz">info@valorfortis.cz</a></p>
      </div>
    </div>
  </section>
</template>
