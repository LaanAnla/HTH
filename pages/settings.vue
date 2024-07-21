<script setup lang="ts">
  definePageMeta({
    layout: 'dashboard',
  })
  const links = [
    [
      {
        label: 'General',
        icon: 'i-heroicons-user',
        to: '/settings',
        exact: true,
      },
      {
        label: 'Expérience',
        icon: 'i-heroicons-academic-cap',
        to: '/settings/experience',
      },
      {
        label: 'Social',
        icon: 'i-heroicons-calculator',
        to: '/settings/social',
      },
      {
        label: 'Extra',
        icon: 'i-heroicons-bolt',
        to: '/settings/extra',
      },
    ],
    [
      {
        label: 'Documentation',
        icon: 'i-heroicons-book-open',
        to: 'https://ui.nuxt.com/pro',
        target: '_blank',
      },
      {
        label: 'Buy now',
        icon: 'i-heroicons-credit-card',
        to: 'https://ui.nuxt.com/pro/purchase',
        target: '_blank',
      },
    ],
  ]
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Réglages" />

      <UDashboardToolbar class="py-0 px-1.5 overflow-x-auto">
        <UHorizontalNavigation :links="links" />
      </UDashboardToolbar>

      <NuxtPage />
    </UDashboardPanel>
  </UDashboardPage>
</template>
