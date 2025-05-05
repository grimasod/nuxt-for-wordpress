export const useApi = async (path, key = null) => {
  const result = await fetch(path, {
    method:'GET', 
    credentials: 'omit',
    ...key && { headers: { 'Authorization': `Basic ${btoa(`api:${key}`)}` } }
  })
  if (result.status === 200) {
    // console.log(api_call)
    const parsed = await result.json()
    return parsed
  } else {
    console.log('api error', path)
  }
}