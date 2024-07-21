<template>
  <UPopover mode="hover">
    <UButton
      :label="userName"
      color="gray"
      class="rounded-full"
      trailing-icon="i-heroicons-chevron-down-20-solid">
      <template #leading>
        <UAvatar
          :text="userInitials"
          :ui="{ background: 'dark:bg-blue-900', text: 'text-xs' }"
          size="sm" />
      </template>
    </UButton>

    <template #panel>
      <div class="p-4">
        <!-- <Placeholder class="h-20 w-48" /> -->
        <UNavigationLinks
          :links="links"
          external="false"
          class="h-20 w-48" />
      </div>
    </template>
  </UPopover>
</template>

<script setup lang="ts">
  const { signOut, userDetails, fetchUserDetails } = useAuth()

  const links = [
    {
      label: 'Déconnexion',
      click: signOut,
      icon: 'i-heroicons-arrow-right-start-on-rectangle',
    },
    {
      label: 'Mon compte',
      to: '/mon-compte/',
      icon: 'i-heroicons-user',
    },
  ]

  const userName = computed(() => {
    if (userDetails.value?.user_metadata) {
      return `${userDetails.value.user_metadata.first_name} ${userDetails.value.user_metadata.last_name}`
    }
    return 'Mon compte'
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
