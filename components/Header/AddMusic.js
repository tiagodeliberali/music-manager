import React, { PropTypes } from 'react';
import { Button, Tooltip } from 'material-ui';
import { TextField, FormControlLabel, Switch } from 'material-ui';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import { withStyles } from 'material-ui/styles';
import { Add } from 'material-ui-icons';

const styles = theme => ({
    button: {
        marginLeft: 50
    }
});


class AddMusic extends React.Component {
    state = {
        open: false,
    };

    constructor(props) {
        super(props)
        this.classes = props.classes
        this.onSave = props.onSave;
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleSave = () => {
        this.onSave({
            name: 'music.name',
            lyrics: 'music.lyrics',
            youtube: 'music.youtube',
            hasTransparency: true
        })
        this.setState({ open: false });
    };

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
                        <Add />
                    </Button>
                </Tooltip>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Nova música</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Nome"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="youtube"
                            label="Link no youtube"
                            type="text"
                            fullWidth
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    id="hasTransparency"
                                    color="primary"
                                />
                            }
                            label="Possui transparência"
                        />
                        <TextField
                            multiline
                            margin="dense"
                            id="youtube"
                            label="Letra"
                            type="text"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancelar
            </Button>
                        <Button onClick={this.handleSave} color="primary">
                            Salvar
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

AddMusic.propTypes = {
    classes: PropTypes.object.isRequired
  };

export default withStyles(styles)(AddMusic);