import React from 'react';
import * as PropTypes from "prop-types";
import { Add } from 'material-ui-icons';
import { Button, Tooltip } from 'material-ui';
import { withStyles } from 'material-ui/styles';

const styles = () => ({
  button: {
    marginLeft: 50
  }
});

function EditButton({ editMode, onOpen, classes }) {
  return (editMode
    ? (<Button
        mini
        aria-haspopup="true"
        color="inherit"
        onClick={onOpen}>
        Editar
    </Button>)
    : (<Tooltip id="tooltip-icon" title="Adicionar música">
        <Button className={classes.button}
            variant="fab"
            mini
            aria-haspopup="true"
            color="inherit"
            onClick={onOpen}>
            <Add />
        </Button>
    </Tooltip>))
}

EditButton.propTypes = {
  editMode: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EditButton);
