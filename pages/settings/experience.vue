<script setup lang="ts">
  import type { FormError, FormSubmitEvent } from '#ui/types'

  const fileRef = ref<HTMLInputElement>()
  const isDeleteAccountModalOpen = ref(false)

  const state = reactive({
    name: 'Benjamin Canac',
    email: 'ben@nuxtlabs.com',
    username: 'benjamincanac',
    avatar: '',
    bio: '',
    password_current: '',
    password_new: '',
  })

  const toast = useToast()

  function validate(state: any): FormError[] {
    const errors = []
    if (!state.name) errors.push({ path: 'name', message: 'Please enter your name.' })
    if (!state.email) errors.push({ path: 'email', message: 'Please enter your email.' })
    if (
      (state.password_current && !state.password_new) ||
      (!state.password_current && state.password_new)
    )
      errors.push({ path: 'password', message: 'Please enter a valid password.' })
    return errors
  }

  function onFileChange(e: Event) {
    const input = e.target as HTMLInputElement

    if (!input.files?.length) {
      return
    }

    state.avatar = URL.createObjectURL(input.files[0])
  }

  function onFileClick() {
    fileRef.value?.click()
  }

  async function onSubmit(event: FormSubmitEvent<any>) {
    // Do something with data
    console.log(event.data)

    toast.add({ title: 'Profile updated', icon: 'i-heroicons-check-circle' })
  }

  // dîplomes selection //
  const formations = [
    {
      name: 'CAP/BEP',
    },
    {
      name: 'Baccalauréat',
    },
    {
      name: 'Licence',
    },
    {
      name: 'Master',
    },
  ]

  const formation = ref('')

  // Experience selection //
  const langues = [
    {
      oral: 'Anglais',
    },
    {
      oral: 'Allemand',
    },
    {
      oral: 'Espagnol',
    },
    {
      oral: 'Japonnais',
    },
    {
      oral: 'Coréen',
    },
  ]

  const langue = ref('')

  // Experience selection //
  const experiences = [
    {
      name: '< 1 an',
    },
    {
      name: '1 an < Expérince < 3 ans',
    },
    {
      name: '3 ans < Expérince < 5 ans',
    },
    {
      name: '5 ans < Expérince < 10 ans',
    },
    {
      name: '10 ans < Expérince',
    },
  ]

  const experience = ref('')
</script>

<template>
  <UDashboardPanelContent class="pb-24">
    <UDashboardSection
      icon="i-heroicons-academic-cap"
      title="Experience"
      description="Mettez à jour votre expérience de façon exhaustive pour donner envie aux recruteurs.">
    </UDashboardSection>

    <UDivider class="mb-4" />

    <UForm
      :state="state"
      :validate="validate"
      :validate-on="['submit']"
      @submit="onSubmit">
      <UDashboardSection
        title="Vos dîplomes, experiences, formations"
        description="Ces informations seront affichées publiquement, et seront des critéres pertinents pour les recruteurs.">
        <template #links>
          <UButton
            type="submit"
            label="Enregistrer les changements"
            color="black" />
        </template>

        <UFormGroup
          name="login"
          label="Expérience"
          description="Votre nom d'utilisateur unique pour la connexion et l'URL de votre profil."
          required
          class="grid grid-cols-2 gap-2"
          :ui="{ container: '' }">
          <USelect
            icon="i-heroicons-magnifying-glass-20-solid"
            color="white"
            size="sm"
            v-model="experience"
            :options="experiences"
            option-attribute="name"
            placeholder="Expérience..." />
        </UFormGroup>

        <UFormGroup
          name="name"
          label="Dîplomes"
          description="Apparaîtra sur votre profil et filtress avancés."
          required
          class="grid grid-cols-2 gap-2 items-center"
          :ui="{ container: '' }">
          <USelect
            icon="i-heroicons-magnifying-glass-20-solid"
            color="white"
            size="sm"
            v-model="formation"
            :options="formations"
            option-attribute="name"
            placeholder="Dîplomes..." />
        </UFormGroup>

        <UFormGroup
          name="email"
          label="Formations"
          description="Utilisé pour se connecter, pour les reçus par email et les mises à jour de produits."
          required
          class="grid grid-cols-2 gap-2"
          :ui="{ container: '' }">
          <USelect
            icon="i-heroicons-magnifying-glass-20-solid"
            color="white"
            size="sm"
            v-model="formation"
            :options="formations"
            option-attribute="name"
            placeholder="Formations..." />
        </UFormGroup>

        <UFormGroup
          name="email"
          label="Langues étrangéres"
          description="Utilisé pour se connecter, pour les reçus par email et les mises à jour de produits."
          required
          class="grid grid-cols-2 gap-2"
          :ui="{ container: '' }">
          <USelect
            icon="i-heroicons-magnifying-glass-20-solid"
            color="white"
            size="sm"
            v-model="langue"
            :options="langues"
            option-attribute="oral"
            placeholder="Langues..." />
        </UFormGroup>

        <UFormGroup
          name="bio"
          label="Présentation"
          description="Brève présentation de votre parcours professionnel. N'hesitez pas à inclure des mots clés pour être visible par les recruteurs lors de leurs recherches"
          class="grid grid-cols-2 gap-2"
          :ui="{ container: '' }">
          <UTextarea
            v-model="state.bio"
            :rows="5"
            autoresize
            size="md" />
        </UFormGroup>
      </UDashboardSection>
    </UForm>

    <UDivider class="mb-4" />
  </UDashboardPanelContent>
</template>
