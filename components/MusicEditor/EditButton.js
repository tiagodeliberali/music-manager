import React from 'react';
import * as PropTypes from "prop-types";
import { Button } from 'material-ui';

function EditButton({ editMode, onOpen }) {
  return (<Button
    mini
    aria-haspopup="true"
    color="inherit"
    onClick={onOpen}>
    {editMode ? "Editar" : "Nova música"}
  </Button>)
}

EditButton.propTypes = {
  editMode: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired
}

export default EditButton;
