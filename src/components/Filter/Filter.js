import React, { Component } from 'react';
import css from './Filter.module.css';

export default class Filter extends Component {
  handleSearch = e => {
    const value = e.target.value;
    this.props.onChangeFilter(value);
  };

  render() {
    return (
      <>
        <label className={css.label}>
          Find contacts by name
          <input
            className={css.input}
            type="text"
            name="filter"
            onChange={this.handleSearch}
          />
        </label>
      </>
    );
  }
}
