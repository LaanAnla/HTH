<script setup lang="ts">
  const { data: page } = await useAsyncData('pricing', () =>
    queryContent('/pricing').findOne()
  )
  if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
  }

  useSeoMeta({
    title: page.value.title,
    ogTitle: page.value.title,
    description: page.value.description,
    ogDescription: page.value.description,
  })

  //   defineOgImage({
  //     component: 'Saas',
  //     title: page.value.title,
  //     description: page.value.description,
  //   })

  const isYearly = ref(false)
</script>

<template>
  <div v-if="page">
    <UPageHero v-bind="page.hero">
      <template #links>
        <UPricingToggle
          v-model="isYearly"
          left="Mensuel"
          right="Annuel"
          class="w-48 mb-10" />
      </template>
    </UPageHero>

    <UContainer>
      <UPricingGrid>
        <UPricingCard
          v-for="(plan, index) in page.plans"
          :key="index"
          v-bind="plan"
          :price="isYearly ? plan.price.year : plan.price.month"
          :cycle="isYearly ? '/an' : '/mois'" />
      </UPricingGrid>
    </UContainer>

    <ULandingSection
      :title="page.faq.title"
      :description="page.faq.description">
      <ULandingFAQ
        :items="page.faq.items"
        multiple
        default-close
        class="max-w-4xl mx-auto" />
    </ULandingSection>

    <ULandingSection>
      <ULandingCTA
        title="Rejoingnez-nous !"
        description="Réinventons la façon d'être recruté."
        align="left"
        :card="false"
        :links="[
          {
            label: 'S\'inscrire',
            color: 'green',
            size: 'md',
            trailingIcon: 'i-heroicons-arrow-right-20-solid',
            to: '/login',
          },
        ]">
        <NuxtImg
          src="https://plus.unsplash.com/premium_photo-1676666379051-383ed1b005e8?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          class="w-full rounded-md shadow-xl ring-1 ring-gray-300 dark:ring-gray-700" />
      </ULandingCTA>
    </ULandingSection>
  </div>
</template>
