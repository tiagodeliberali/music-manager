import React, { PropTypes, Component } from 'react'
import { Button, Tooltip } from 'material-ui';
import { TextField, FormControlLabel, Switch } from 'material-ui'
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog'
import { withStyles } from 'material-ui/styles'
import { Add, Edit } from 'material-ui-icons'

const styles = theme => ({
    button: {
        marginLeft: 50
    }
});

class AddMusic extends Component {
    constructor(props) {
        super(props)
        this.classes = props.classes
        this.onSave = props.onSave

        this.loadInitialState()
    }

    loadInitialState = () => {
        if (this.props.music) {
            const music = this.props.music;

            this.state = {
                open: false,
                id: music.id,
                name: music.name,
                lyrics: music.lyrics,
                youtube: music.youtube,
                hasTransparency: music.hasTransparency
            }
        }
        else
            this.state = {
                open: false,
                name: '',
                lyrics: '',
                youtube: '',
                hasTransparency: ''
            }
    }

    clearState = () => {
        if (this.editMode())
            this.setState({ open: false })
        else
            this.setState({
                open: false,
                name: '',
                lyrics: '',
                youtube: '',
                hasTransparency: ''
            })
    }

    handleClickOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.clearState()
    }

    handleNameChange = (event) => {
        this.setState({ name: event.target.value })
    }

    handleLyricsChange = (event) => {
        this.setState({ lyrics: event.target.value })
    }

    handleYoutubeChange = (event) => {
        this.setState({ youtube: event.target.value })
    }

    handleHasTransparencyChange = (event) => {
        this.setState({ hasTransparency: event.target.checked })
    }

    editMode = () => {
        return this.props.music != undefined
    }

    handleSave = () => {
        const music = this.state;

        this.onSave({
            id: music.id,
            name: music.name,
            lyrics: music.lyrics,
            youtube: music.youtube,
            hasTransparency: music.hasTransparency
        })

        this.clearState()
    };

    isValid = () => {
        return this.state.name.trim() != ""
            && this.state.lyrics.trim() != ""
    }

    render() {
        return (
            <div>
                <Tooltip id="tooltip-icon" title="Adicionar música">
                    <Button className={this.classes.button}
                        variant="fab"
                        mini
                        aria-haspopup="true"
                        color="inherit"
                        onClick={this.handleClickOpen}>
                        {this.editMode() ? <Edit /> : <Add />}
                    </Button>
                </Tooltip>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">{this.editMode() ? "Editar música" : "Nova música"}</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            value={this.state.name}
                            onChange={this.handleNameChange}
                            label="Nome"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="youtube"
                            value={this.state.youtube}
                            onChange={this.handleYoutubeChange}
                            label="Link no youtube"
                            type="text"
                            fullWidth
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    id="hasTransparency"
                                    color="primary"
                                    checked={this.state.hasTransparency}
                                    onChange={this.handleHasTransparencyChange}
                                />
                            }
                            label="Possui transparência"
                        />
                        <TextField
                            multiline
                            margin="dense"
                            id="lyrics"
                            value={this.state.lyrics}
                            onChange={this.handleLyricsChange}
                            label="Letra"
                            type="text"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={this.handleSave} color="primary" disabled={!this.isValid()}>
                            Salvar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

AddMusic.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AddMusic)