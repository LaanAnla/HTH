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
</script>

<template>
  <UDashboardPanelContent class="pb-24">
    <UDashboardSection
      icon="i-heroicons-user"
      title="Theme"
      description="Personnalisez l'apparence de votre tableau de bord.">
      <template #links>
        <UColorModeButton />
      </template>
    </UDashboardSection>

    <UDivider class="mb-4" />

    <UForm
      :state="state"
      :validate="validate"
      :validate-on="['submit']"
      @submit="onSubmit">
      <UDashboardSection
        title="Profil"
        description="Ces informations seront affichées publiquement, soyez donc prudent avec ce que vous partagez..">
        <template #links>
          <UButton
            type="submit"
            label="Enregistrer les changements"
            color="black" />
        </template>

        <UFormGroup
          name="login"
          label="Username"
          description="Votre nom d'utilisateur unique pour la connexion et l'URL de votre profil."
          required
          class="grid grid-cols-2 gap-2"
          :ui="{ container: '' }">
          <UInput
            v-model="state.username"
            type="username"
            autocomplete="off"
            icon="i-heroicons-envelope"
            size="md">
          </UInput>
        </UFormGroup>

        <UFormGroup
          name="firstName"
          label="Prénom"
          description="Apparaîtra sur les reçus, factures et autres communications."
          required
          class="grid grid-cols-2 gap-2 items-center"
          :ui="{ container: '' }">
          <UInput
            v-model="state.firstName"
            autocomplete="off"
            icon="i-heroicons-user"
            size="md" />
        </UFormGroup>

        <UFormGroup
          name="lastName"
          label="Nom"
          description="Apparaîtra sur les reçus, factures et autres communications."
          required
          class="grid grid-cols-2 gap-2 items-center"
          :ui="{ container: '' }">
          <UInput
            v-model="state.lastName"
            autocomplete="off"
            icon="i-heroicons-user"
            size="md" />
        </UFormGroup>

        <UFormGroup
          name="email"
          label="Email"
          description="Utilisé pour se connecter, pour les reçus par email et les mises à jour de produits."
          required
          class="grid grid-cols-2 gap-2"
          :ui="{ container: '' }">
          <UInput
            v-model="state.email"
            type="email"
            autocomplete="off"
            icon="i-heroicons-envelope"
            size="md" />
        </UFormGroup>

        <UFormGroup
          name="avatar"
          label="Avatar"
          class="grid grid-cols-2 gap-2"
          help="JPG, GIF or PNG. 1MB Max."
          :ui="{ container: 'flex flex-wrap items-center gap-3', help: 'mt-0' }">
          <UAvatar
            :src="state.avatar"
            :alt="state.name"
            size="lg" />

          <UButton
            label="Choisir"
            color="white"
            size="md"
            @click="onFileClick" />

          <input
            ref="fileRef"
            type="file"
            class="hidden"
            accept=".jpg, .jpeg, .png, .gif"
            @change="onFileChange" />
        </UFormGroup>

        <UFormGroup
          name="password"
          label="Mot de passe"
          description="Confirmez votre mot de passe actuel avant d'en définir un nouveau.."
          class="grid grid-cols-2 gap-2"
          :ui="{ container: '' }">
          <UInput
            id="password"
            v-model="state.password_current"
            type="password"
            placeholder="Mot de passe actuel"
            size="md" />
          <UInput
            id="password_new"
            v-model="state.password_new"
            type="password"
            placeholder="Nouveau mot de passe"
            size="md"
            class="mt-2" />
        </UFormGroup>
      </UDashboardSection>
    </UForm>

    <UDivider class="mb-4" />

    <UDashboardSection
      title="Compte"
      description="Vous ne souhaitez plus utiliser notre service ? Vous pouvez supprimer votre compte ici. Cette action est irréversible. Toutes les informations liées à ce compte seront définitivement supprimées.">
      <div>
        <UButton
          color="red"
          label="Résilier votre compte"
          size="md"
          @click="isDeleteAccountModalOpen = true" />
      </div>
    </UDashboardSection>

    <!-- ~/components/settings/DeleteAccountModal.vue -->
    <SettingsDeleteAccountModal v-model="isDeleteAccountModalOpen" />
  </UDashboardPanelContent>
</template>
