<script setup lang="ts">
  const links = [
    {
      label: 'A propos',
      children: [
        {
          label: 'Help center',
        },
        {
          label: 'Docs',
        },
        {
          label: 'Roadmap',
        },
        {
          label: 'Changelog',
        },
      ],
    },
    {
      label: 'Features',
      children: [
        {
          label: 'Affiliates',
        },
        {
          label: 'Portal',
        },
        {
          label: 'Jobs',
        },
        {
          label: 'Sponsors',
        },
      ],
    },
    {
      label: 'Legal',
      children: [
        {
          label: 'Mentions légales',
          to: '/legal/mentions',
        },
        {
          label: 'Politique de confidentialité',
          to: '/legal/confidentialite',
        },
        {
          label: "Conditions générales d'utilisation",
          to: '/legal/cgu',
        },
        {
          label: 'Politique cookies',
        },
      ],
    },
  ]

  const toast = useToast()

  const email = ref('')
  const loading = ref(false)

  function onSubmit() {
    loading.value = true

    setTimeout(() => {
      toast.add({
        title: 'Subscribed!',
        description: "You've been subscribed to our newsletter.",
      })

      loading.value = false
    }, 1000)
  }
</script>

<template>
  <UFooter>
    <template #top>
      <UFooterColumns :links="links">
        <template #right>
          <div class="flex flex-col gap-2 mb-2">
            <p class="text-gray-500 text-xl">LE COURRIER QUI VOUS BOOST !</p>
            <p class="text-gray-500 dark:text-white text-sm">
              Votre dose hebdomadaire d'histoires fascinantes, d'opportunités de carrière
              et de conseils avisés.
            </p>
          </div>
          <form @submit.prevent="onSubmit">
            <UFormGroup :ui="{ container: 'mt-3' }">
              <UInput
                v-model="email"
                type="email"
                placeholder="Entrez votre email"
                :ui="{ icon: { trailing: { pointer: '' } } }"
                required
                size="xl"
                autocomplete="off"
                class="max-w-sm"
                input-class="rounded-full">
                <template #trailing>
                  <UButton
                    type="submit"
                    size="xs"
                    color="primary"
                    :label="loading ? 'Subscribing' : 'Je m\'abonne'"
                    :loading="loading" />
                </template>
              </UInput>
            </UFormGroup>
          </form>
        </template>
      </UFooterColumns>
    </template>

    <template #left>
      <div class="flex flex-col gap-2">
        <h4 class="text-gray-500 dark:text-white text-lg font-bold">
          Hidden Talents Hub
        </h4>
        <p class="text-gray-500 dark:text-gray-400 text-sm">
          Copyright © {{ new Date().getFullYear() }}. All rights reserved.
        </p>
      </div>
    </template>

    <template #right>
      <div class="flex items-center">
        <UButton
          to="https://github.com/nuxt-ui-pro/saas"
          target="_blank"
          icon="i-fa6-brands-square-instagram"
          aria-label="Instagram"
          color="gray"
          variant="ghost" />
        <UButton
          to="https://github.com/nuxt-ui-pro/saas"
          target="_blank"
          icon="i-fa6-brands-x-twitter"
          aria-label="twitter"
          color="gray"
          variant="ghost" />
        <UButton
          to="https://github.com/nuxt-ui-pro/saas"
          target="_blank"
          icon="i-fa6-brands-square-facebook"
          aria-label="facebook"
          color="gray"
          variant="ghost" />
        <UButton
          to="https://github.com/nuxt-ui-pro/saas"
          target="_blank"
          icon="i-fa6-brands-linkedin"
          aria-label="linkedin"
          color="gray"
          variant="ghost" />
      </div>
    </template>
  </UFooter>
</template>
