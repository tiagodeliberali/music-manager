export default (music) => {
  const result = {
    id: music.id,
    name: music.name,
    lyrics: music.lyrics,
    youtube: music.youtube,
    hasTransparency: music.hasTransparency,
    executedAt: music.executedAt || []
  }

  if (!result.id)
    delete result.id

  return result
}
