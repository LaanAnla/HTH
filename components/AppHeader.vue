<script setup lang="ts">
  import type { NavItem } from '@nuxt/content'

  const navigation = inject<Ref<NavItem[]>>('navigation', ref([]))
  const { user } = useAuth()

  const links = [
    {
      label: 'Tarifs',
      icon: 'i-heroicons-user',
      to: '/tarifs',
    },
    {
      label: 'Pro',
      icon: 'i-heroicons-square-3-stack-3d',
      to: '/',
      children: [
        {
          label: 'Pricing',
          to: '/',
          icon: 'i-heroicons-ticket',
          description: 'A simple pricing, for solo developers or teams.',
        },
        {
          label: 'Templates',
          to: '/',
          icon: 'i-heroicons-computer-desktop',
          description: 'Get started with one of our official templates.',
        },
      ],
    },
    {
      label: 'Docs',
      icon: 'i-heroicons-book-open',
      to: '/',
    },
  ]
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      HTH | Recrutement
      <UBadge
        label="SaaS"
        variant="subtle"
        class="mb-0.5" />
    </template>

    <template #right>
      <ClientOnly>
        <UserCard v-if="user" />
      </ClientOnly>
      <UButton
        v-if="!user"
        icon="i-heroicons-user"
        :ui="{ rounded: 'rounded-full' }"
        color="gray"
        :trailing="true">
        <NuxtLink to="/login">se connecter</NuxtLink>
      </UButton>
      <UColorModeButton />
    </template>

    <template #panel>
      <UNavigationTree :links="mapContentNavigation(navigation)" />
    </template>
  </UHeader>
</template>
