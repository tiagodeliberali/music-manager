import React, { Component } from 'react';
import * as PropTypes from "prop-types";
import { Input } from 'material-ui';

class SearchBar extends Component {
  constructor(props) {
    super(props)

    this.onSearch = props.onSearch
    this.state = { term: '' }
  }

    searchMusic = (event) => {
      const term = event.target.value
      this.setState({ term })
      this.onSearch(term)
    }

    render() {
      return (
            <Input
                placeholder="Buscar música"
                value={this.state.term}
                onChange={this.searchMusic}
                inputProps={{
                    'aria-label': 'Description'
                }}
            />
      )
    }
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired
}

export default SearchBar;
