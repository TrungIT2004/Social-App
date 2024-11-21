export const getUserContext = async (refreshToken: string) => {
    const res = await fetch('http://localhost:3000/v1/users/refresh', {
    method: "POST",
    credentials: 'include',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      // Pass the refreshToken as a cookie in the request
      Cookie: refreshToken ? `refreshToken=${refreshToken}` : '',
    },
  })

  return await res.json()
}