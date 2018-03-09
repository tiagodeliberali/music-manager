import React, { PropTypes, Component } from 'react'
import { Input } from 'material-ui';
import _ from 'lodash'

class SearchBar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        //const search = _.debounce(term => { this.searchMusic(term) }, 300)
        return (
            <Input
            placeholder="Buscar música"
            inputProps={{
              'aria-label': 'Description',
            }}
          />
        )
    }
}

export default SearchBar;