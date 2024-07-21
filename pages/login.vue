<script setup lang="ts">
  import type { FormError } from '#ui/types'
  const { email, password, successMsg, errorMsg, signinUser, signinWithProvider } =
    useAuth()

  definePageMeta({
    layout: 'auth',
  })

  const fields = [
    {
      name: 'email',
      type: 'text',
      label: 'Email',
      placeholder: 'Entrez votre email',
    },
    {
      name: 'password',
      label: 'Mot de passe',
      type: 'password',
      placeholder: 'Entrez un mot passe',
    },
    {
      name: 'remember',
      label: 'Se rappeler de moi',
      type: 'checkbox',
    },
  ]

  const validate = (state: any) => {
    const errors: FormError[] = []
    if (!state.email) errors.push({ path: 'email', message: 'Un email est requis' })
    if (!state.password)
      errors.push({ path: 'password', message: 'Un mot de passe est requis' })
    return errors
  }

  const providers = [
    {
      label: 'Continuez avec Google',
      icon: 'i-simple-icons-google',
      color: 'black' as const,
      click: signinWithProvider,
    },
  ]

  function onSubmit(data: any) {
    email.value = data.email
    password.value = data.password
    signinUser()
  }
</script>

<!-- eslint-disable vue/multiline-html-element-content-newline -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur">
    <UAuthForm
      :fields="fields"
      :validate="validate"
      :providers="providers"
      divider="ou"
      title="Bienvenue !"
      align="top"
      icon="i-heroicons-lock-closed"
      :ui="{
        base: 'text-center',
        footer: 'text-center',
        default: {
          submitButton: {
            label: 'Se connecter',
          },
        },
      }"
      @submit="onSubmit">
      <template #description>
        Vous n'avez pas encore de compte ?
        <NuxtLink
          to="/signup"
          class="text-primary font-medium"
          >S'incrire</NuxtLink
        >.
      </template>

      <template #password-hint>
        <NuxtLink
          to="/"
          class="text-primary font-medium"
          >Mot de passe oublié ?</NuxtLink
        >
      </template>
      <template
        #validation
        v-if="errorMsg">
        <UAlert
          color="red"
          icon="i-heroicons-information-circle-20-solid"
          title="Login et/ou mot de passe invalides" />
      </template>
      <template #footer>
        En vous inscrivant, vous acceptez nos
        <NuxtLink
          to="/"
          class="text-primary font-medium"
          >CGU et CGV</NuxtLink
        >.
      </template>
    </UAuthForm>
  </UCard>
</template>
