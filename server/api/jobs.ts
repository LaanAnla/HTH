export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = useQuery(event)
  const accessToken = query.access_token

  try {
    const response = await fetch(
      `${config.public.apiBaseURL}/partenaire/labonneboite/v1/company?distance=30&latitude=49.119146&rome_codes=M1607`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    )

    console.log('Response status:', response.status, response.statusText)

    if (!response.ok) {
      console.error(`Error fetching jobs: ${response.statusText}`)
      throw new Error(`An error occurred: ${response.statusText}`)
    }

    const data = await response.json()
    console.log('Jobs data:', data)
    return data
  } catch (error) {
    console.error('Failed to fetch jobs:', error)
    throw error
  }
})
