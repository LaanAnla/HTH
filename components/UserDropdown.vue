<script setup lang="ts">
  //   const { isHelpSlideoverOpen } = useDashboard()
  const { isDashboardSearchModalOpen } = useUIState()
  const { metaSymbol } = useShortcuts()

  const { signOut, userDetails, fetchUserDetails } = useAuth()

  const items = computed(() => [
    [
      {
        slot: 'account',
        label: '',
        disabled: true,
      },
    ],
    [
      {
        label: 'Réglages',
        icon: 'i-heroicons-cog-8-tooth',
        to: '/settings',
      },
      {
        label: 'Command menu',
        icon: 'i-heroicons-command-line',
        shortcuts: [metaSymbol.value, 'K'],
        click: () => {
          isDashboardSearchModalOpen.value = true
        },
      },
    ],
    [
      {
        label: 'Documentation',
        icon: 'i-heroicons-book-open',
        to: 'https://ui.nuxt.com/pro/getting-started',
        target: '_blank',
      },
    ],
    [
      {
        label: 'Se déconnecter',
        icon: 'i-heroicons-arrow-left-on-rectangle',
        click: signOut,
      },
    ],
  ])

  const userName = computed(() => {
    if (userDetails.value?.user_metadata) {
      return `${userDetails.value.user_metadata.first_name} ${userDetails.value.user_metadata.last_name}`
    }
    return 'Mon compte'
  })

  const userEmail = computed(() => {
    if (userDetails.value?.user_metadata) {
      return `${userDetails.value.user_metadata.email}`
    }
    return 'Mon email'
  })

  const userInitials = computed(() => {
    if (userDetails.value?.user_metadata) {
      const firstName = userDetails.value.user_metadata.first_name || ''
      const lastName = userDetails.value.user_metadata.last_name || ''
      const firstInitial = firstName.charAt(0).toUpperCase()
      const lastInitial = lastName.charAt(0).toUpperCase()
      console.log(`Initiales calculées : ${firstInitial}${lastInitial}`) // Vérification
      return `${firstInitial}${lastInitial}`
    }
    return '?'
  })

  onMounted(async () => {
    await fetchUserDetails()
    console.log('Détails utilisateur :', userDetails.value)
  })
</script>

<template>
  <UDropdown
    mode="hover"
    :items="items"
    :ui="{ width: 'w-full', item: { disabled: 'cursor-text select-text' } }"
    :popper="{ strategy: 'absolute', placement: 'top' }"
    class="w-full">
    <template #default="{ open }">
      <UButton
        color="gray"
        variant="ghost"
        class="w-full"
        :label="userName"
        :class="[open && 'bg-gray-50 dark:bg-gray-800']">
        <template #leading>
          <UAvatar
            :text="userInitials"
            size="2xs" />
        </template>

        <template #trailing>
          <UIcon
            name="i-heroicons-ellipsis-vertical"
            class="w-5 h-5 ml-auto" />
        </template>
      </UButton>
    </template>

    <template #account>
      <div class="text-left">
        <!-- <p>Connecté :</p> -->
        <p class="truncate font-medium text-gray-900 dark:text-white">{{ userEmail }}</p>
      </div>
    </template>
  </UDropdown>
</template>
