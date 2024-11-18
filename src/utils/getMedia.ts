const getMedia = (url: string) => `${import.meta.env.VITE_API_URL}/${url.replace("\\", "/")}`

export default getMedia
