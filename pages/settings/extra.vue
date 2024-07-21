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

  // Experience selection //
  const residences = [
    {
      lieu: '01 - Ain',
    },
    {
      lieu: '02 - Aisne',
    },
    {
      lieu: '03 - Allier',
    },
    {
      lieu: '04 - Basses Alpes',
    },
    {
      lieu: '05 - Hautes Alpes',
    },
  ]

  const residence = ref('')

  // Experience selection //
  const salaires = [
    {
      montant: 'minimum 30K€',
    },
    {
      montant: '30K€ à 35K€',
    },
    {
      montant: '35K€ à 40K€',
    },
    {
      montant: '45K€ à 50K€',
    },
    {
      montant: '50K€ à 60K€',
    },
    {
      montant: '60K€ à 70K€',
    },
  ]

  const salaire = ref('')

  const selected = ref(false)
  const selectedNational = ref(false)
  const selectedInternational = ref(false)

  const test = reactive({
    valeur: '', // Pour l'input
    rangeValue: 0, // Pour le range
  })

  const coefficient = 1500

  const multipliedValue = computed(() => {
    return test.rangeValue * coefficient
  })
</script>

<template>
  <UDashboardPanelContent class="pb-24">
    <UDashboardSection
      icon="i-heroicons-bolt"
      title="Extra"
      description="Uploader des videos, des photos, faites votre présentation.">
    </UDashboardSection>

    <UDivider class="mb-4" />

    <UForm
      :state="state"
      :validate="validate"
      :validate-on="['submit']"
      @submit="onSubmit">
      <UDashboardSection
        title="Sections extra"
        description="Certains de ces extras sont accesibles avec un accès premium ou code d'accès.">
        <UFormGroup
          name="videos"
          label="Vidéos"
          description="Proposer une vidéo de présentation."
          class="grid grid-cols-2 gap-2"
          help="MP4, MOV. 10MB Max."
          :ui="{ container: 'flex flex-wrap items-center gap-3', help: 'mt-0' }">
          <UButton
            label="Choisir"
            color="white"
            size="md"
            @click="onFileClick" />

          <input
            ref="fileRef"
            type="file"
            class="hidden"
            accept=".mp4, .mov"
            @change="onFileChange" />
        </UFormGroup>

        <UFormGroup
          name="name"
          label="Comparateur de salaire"
          description="Vérifier les salaires à expérience, formations et géogrpahie correspondante."
          class="grid grid-cols-2 gap-2 items-center"
          :ui="{ container: '' }">
          <USelect
            icon="i-heroicons-magnifying-glass-20-solid"
            color="white"
            size="sm"
            v-model="residence"
            :options="residences"
            option-attribute="lieu"
            placeholder="Lieu de résidence..." />
        </UFormGroup>
      </UDashboardSection>
    </UForm>

    <UDivider class="mb-4" />
  </UDashboardPanelContent>
</template>
