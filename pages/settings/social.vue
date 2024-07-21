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
      icon="i-heroicons-calculator"
      title="Social"
      description="Mettez à jour vos informations relatives à votre vie sociale, salaires, régions, etc.">
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
          name="name"
          label="Lieu de résidence"
          description="Apparaîtra sur votre profil et filtress avancés."
          required
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

        <UFormGroup
          name="name"
          label="Département de prédiléction"
          description="Apparaîtra sur votre profil et filtress avancés."
          required
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

        <UFormGroup
          name="login"
          label="Déplacements professionnel"
          description="Votre nom d'utilisateur unique pour la connexion et l'URL de votre profil."
          required
          class="grid grid-cols-2 gap-2"
          :ui="{ container: '' }">
          <div class="flex items-center gap-8 text-sm">
            <div class="mt-4 flex items-center gap-4">
              <p>National :</p>
              <div class="flex items-center gap-2">
                <span>Oui</span>
                <UToggle v-model="selectedNational" />
                <span>Non</span>
              </div>
            </div>
            <div class="mt-4 flex items-center gap-4">
              <p>International :</p>
              <div class="flex items-center gap-2">
                <span>Oui</span>
                <UToggle v-model="selectedInternational" />
                <span>Non</span>
              </div>
            </div>
          </div>
        </UFormGroup>

        <UFormGroup
          name="login"
          label="Type de poste recherché"
          description="Pour quel type de poste souhaitez vous être contacté ?"
          required
          class="grid grid-cols-2 gap-2"
          :ui="{ container: '' }">
          <div class="flex items-center gap-8 text-sm">
            <div class="mt-4 flex items-center gap-2">
              <p>CDI :</p>
              <div class="flex items-center gap-2">
                <span>Oui</span>
                <UToggle v-model="selectedNational" />
                <span>Non</span>
              </div>
            </div>
            <div class="mt-4 flex items-center gap-2">
              <p>CDD :</p>
              <div class="flex items-center gap-2">
                <span>Oui</span>
                <UToggle v-model="selectedInternational" />
                <span>Non</span>
              </div>
            </div>
          </div>
          <div class="mt-4 flex items-center gap-2 text-sm">
            <p>Contrat de travail temporaire (interim) :</p>
            <div class="flex items-center gap-2">
              <span>Oui</span>
              <UToggle v-model="selectedInternational" />
              <span>Non</span>
            </div>
          </div>
          <div class="mt-4 flex items-center gap-2 text-sm">
            <p>Contrat d'apprentissage :</p>
            <div class="flex items-center gap-2">
              <span>Oui</span>
              <UToggle v-model="selectedInternational" />
              <span>Non</span>
            </div>
          </div>
          <div class="mt-4 flex items-center gap-4 text-sm">
            <span>Autre</span>
            <UTextarea
              rows="1"
              placeholder="Autre..."
              model-value="" />
            <NuxtLink
              class="text-sm text-green-300"
              to="https://travail-emploi.gouv.fr/droit-du-travail/les-contrats-de-travail/"
              target="_blank"
              >Les différents contrats</NuxtLink
            >
          </div>
        </UFormGroup>

        <UFormGroup
          name="salaire"
          label="Salaire minimum"
          description="Salaire annuel brut comprenant l'ensemble des primes, interessement, participation."
          required
          class="grid grid-cols-2 gap-2"
          :ui="{ container: '' }">
          <UInput
            v-model="multipliedValue"
            type="username"
            autocomplete="off"
            size="md"
            input-class="ps-[77px] ml-2">
            <template #leading>
              <span class="text-gray-500 dark:text-gray-400 text-sm ml-2">€brut/an </span>
            </template>
          </UInput>
          <URange
            class="pt-4"
            size="md"
            v-model="test.rangeValue" />
          <div class="mt-4 flex items-center gap-4 text-sm">
            <p>Négociable :</p>
            <div class="flex items-center gap-2">
              <span>Oui</span>
              <UToggle v-model="selected" />
              <span>Non</span>
            </div>
          </div>
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
