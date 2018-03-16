import React, { PropTypes } from "react"
import { withStyles } from 'material-ui/styles'
import MusicItem from './MusicItem'

const styles = theme => ({
    list: {
      padding: 30,
      paddingTop: 0
    }
  })

const MusicList = (props) => {
    const  { classes, musics, user, event } = props

    if (!musics || musics.length == 0)
        return <div>Carregando...</div>

    const items = musics.map(music => {
        return (
            <MusicItem 
                key={music.id} 
                music={music} 
                onSave={props.onSave}
                onVote={props.onVote}
                user={user} 
                event={event} />
        )
    })

    return (
        <ul className={classes.list}>
            {items}            
        </ul>
    )
}

MusicList.propTypes = {
    musics: PropTypes.array.isRequired
}

export default withStyles(styles)(MusicList)
