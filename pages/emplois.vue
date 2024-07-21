<template>
  <div>
    <h1>Liste des emplois</h1>
    <div v-if="pending">Chargement...</div>
    <ul v-if="!pending && !error">
      <li
        v-for="job in jobs"
        :key="job.siret">
        {{ job.name }} - {{ job.city }}
      </li>
    </ul>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script setup>
  const jobs = ref([])
  const error = ref(null)
  const pending = ref(true)

  const fetchJobs = async () => {
    pending.value = true
    try {
      console.log('Fetching auth token...')
      const { data: authData, error: authError } = await useFetch('/api/auth')

      console.log('Auth data:', authData.value)
      console.log('Auth error:', authError.value)

      if (authError.value) {
        console.error('Auth error:', authError.value)
        throw new Error(`Auth error: ${authError.value.message || 'Unknown error'}`)
      }

      if (!authData.value) {
        console.error('Auth error: No auth data returned')
        throw new Error('Auth error: No auth data returned')
      }

      const accessToken = authData.value.access_token

      console.log('Fetching jobs...')
      const { data: jobsData, error: jobsError } = await useFetch('/api/jobs', {
        params: {
          access_token: accessToken,
        },
      })

      console.log('Jobs data:', jobsData.value)
      console.log('Jobs error:', jobsError.value)

      if (jobsError.value) {
        console.error('Jobs error:', jobsError.value)
        throw new Error(`Jobs error: ${jobsError.value.message || 'Unknown error'}`)
      }

      if (!jobsData.value) {
        console.error('Jobs error: No jobs data returned')
        throw new Error('Jobs error: No jobs data returned')
      }

      jobs.value = jobsData.value.companies
    } catch (err) {
      console.error('Error fetching jobs:', err)
      error.value = err.message
    } finally {
      pending.value = false
    }
  }

  onMounted(fetchJobs)
</script>
