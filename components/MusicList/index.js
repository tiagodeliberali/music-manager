import React, { PropTypes } from "react";
import MusicItem from './MusicItem'

const MusicList = (props) => {
    const musicList = props.musics

    if (!musicList || musicList.length == 0)
        return <div>Carregando...</div>

    const items = musicList.map(music => {
        return (
            <MusicItem key={music.id} music={music} />
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
