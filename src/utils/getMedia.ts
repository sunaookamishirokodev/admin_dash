const getMedia = (url: string) => `http://localhost:6002/${url.replace("\\", "/")}`;

export default getMedia;
