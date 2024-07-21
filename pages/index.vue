<template>
  <div>
    <ULandingHero
      :title="page.hero.title"
      :description="page.hero.description"
      orientation="vertical"
      :links="page.hero.links"
      :ui="{
        title: 'text-blue-500 lg:text-8xl',
        description: 'sm:text-2xl',
      }">
      <template #default>
        <NuxtImg
          :src="page.hero.imageUrl"
          class="w-full rounded-md shadow-xl ring-1 ring-gray-300 dark:ring-gray-700" />
      </template>
    </ULandingHero>

    <ULandingSection
      v-for="(section, index) in page.sections"
      :key="index"
      :title="section.title"
      :description="section.description"
      :align="section.align"
      :features="section.features">
      <NuxtImg
        :src="section.imageUrl"
        class="w-full rounded-md shadow-xl ring-1 ring-gray-300 dark:ring-gray-700" />
    </ULandingSection>

    <ULandingSection
      v-for="(feature, index) in page.features"
      :key="index"
      :ui="{ title: 'lg:text-7xl text-blue-500', description: 'sm:text-2xl' }"
      :headline="feature.headline"
      :title="feature.title"
      :description="feature.description"
      :align="feature.align"
      :features="feature.features">
    </ULandingSection>

    <!-- <ULandingSection
      headline=""
      title="Zazi"
      description="Nuxt UI Pro ships with an extensive set of advanced components that cover a wide range of use-cases." /> -->

    <div class="w-full flex justify-center mb-10">
      <UPageGrid class="w-3/4">
        <UPageCard
          v-for="(module, index) in modules"
          :key="index"
          v-bind="module"
          target="_blank">
          <template #description>
            <span class="line-clamp-2">{{ module.description }}</span>
          </template>
        </UPageCard>
      </UPageGrid>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { data: page } = await useAsyncData('index', () => queryContent('/').findOne())
  if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
  }

  const modules = [
    {
      title: 'VueUse',
      description: 'Collection of essential Vue Composition Utilities for Vue 2 and 3.',
      to: 'https://github.com/vueuse/vueuse',
      icon: 'i-simple-icons-nuxtdotjs',
    },
    {
      title: 'ESLint',
      description: 'ESLint module for Nuxt.',
      to: 'https://github.com/nuxt-community/eslint-module',
      icon: 'i-simple-icons-eslint',
    },
    {
      title: 'Tailwind CSS',
      description:
        'Add Tailwind CSS to your Nuxt application in seconds with PurgeCSS included for minimal CSS.',
      to: 'https://github.com/nuxt-modules/tailwindcss',
      icon: 'i-simple-icons-tailwindcss',
    },
    {
      title: 'VueUse',
      description: 'Collection of essential Vue Composition Utilities for Vue 2 and 3.',
      to: 'https://github.com/vueuse/vueuse',
      icon: 'i-simple-icons-nuxtdotjs',
    },
    {
      title: 'ESLint',
      description: 'ESLint module for Nuxt.',
      to: 'https://github.com/nuxt-community/eslint-module',
      icon: 'i-simple-icons-eslint',
    },
    {
      title: 'Tailwind CSS',
      description:
        'Add Tailwind CSS to your Nuxt application in seconds with PurgeCSS included for minimal CSS.',
      to: 'https://github.com/nuxt-modules/tailwindcss',
      icon: 'i-simple-icons-tailwindcss',
    },
  ]
</script>
