// composables/useAuth.ts

export default function useAuth() {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const router = useRouter()

  const email = ref('')
  const password = ref('')
  const successMsg = ref('')
  const errorMsg = ref('')
  const userDetails = ref(null)

  // Fonction pour récupérer les détails de l'utilisateur via l'authentification
  const fetchUserDetails = async () => {
    const { data, error } = await supabase.auth.getUser()

    if (error) {
      console.error('Error fetching user details:', error)
      return
    }

    userDetails.value = data.user
  }

  // connexion avec email et mot de passe //
  const signinUser = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      })
      if (error) throw error
      successMsg.value = 'Connexion réussie.'
      errorMsg.value = ''
      navigateTo('/mon-compte')
    } catch (error) {
      successMsg.value = ''
      errorMsg.value = 'Erreur durant la connexion'
    }
  }

  // connexion à l'aide d'un provider //
  const signinWithProvider = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      })
      if (error) throw error
      successMsg.value = 'Connexion réussie.'
      errorMsg.value = ''
    } catch (error) {
      successMsg.value = ''
      errorMsg.value = 'Erreur durant la connexion'
    }
  }

  // deconnexion de la session //
  const signOut = async () => {
    await supabase.auth.signOut()
    navigateTo('/login')
    userDetails.value = null
  }

  return {
    user,
    userDetails,
    email,
    password,
    successMsg,
    errorMsg,
    signinUser,
    signinWithProvider,
    signOut,
    fetchUserDetails,
  }
}
