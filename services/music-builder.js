export default (music) => {
  const result = {
    id: music.id,
    name: music.name,
    lyrics: music.lyrics,
    youtube: music.youtube,
    hasTransparency: music.hasTransparency
  }

  if (!result.id)
    delete result.id

  return result
}
