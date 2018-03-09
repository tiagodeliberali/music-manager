import React, { PropTypes } from "react";

const MusicList = (props) => {
    const musicList = props.musics

    if (!musicList || musicList.length == 0)
        return <div>Carregando...</div>

    const items = musicList.map(music => {
        return (
            <li key={music.id}>{music.name}</li>
        );
    })

    return (
        <ul>
            {items}            
        </ul>
    );
}

MusicList.propTypes = {
    musics: PropTypes.array.isRequired
};

export default MusicList;
