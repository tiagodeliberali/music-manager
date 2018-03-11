export default (music) => {
    return {
        id: music.id,
        name: music.name,
        lyrics: music.lyrics,
        youtube: music.youtube,
        hasTransparency: music.hasTransparency
    }
}