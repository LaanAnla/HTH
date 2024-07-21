export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const { apiClientID, apiClientSecret, apiScope } = config

  console.log('Client ID:', apiClientID)
  console.log('Client Secret:', apiClientSecret)
  console.log('Scope:', apiScope)

  try {
    const response = await fetch(
      'https://entreprise.francetravail.fr/connexion/oauth2/access_token?realm=/partenaire',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: apiClientID,
          client_secret: apiClientSecret,
          scope: apiScope,
        }),
      }
    )

    console.log('Response status:', response.status, response.statusText)

    if (!response.ok) {
      console.error(`Error fetching access token: ${response.statusText}`)
      throw new Error(`An error occurred: ${response.statusText}`)
    }

    const data = await response.json()
    console.log('Access token data:', data)
    return data
  } catch (error) {
    console.error('Failed to fetch access token:', error)
    throw error
  }
})
