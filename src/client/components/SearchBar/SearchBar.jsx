import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete from 'react-places-autocomplete';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Search from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import styles from './SearchBarStyles';

function SearchBar({
  currentLocation,
  style,
  className,
  searchBarRef,
  history
}) {
  const [location, setLocation] = useState(currentLocation);

  useEffect(() => {
    setLocation(currentLocation);
  }, [currentLocation]);

  const [extra, setExtra] = useState('');

  const onChange = loc => setLocation(loc);

  const setUrl = () => {
    history.push(`/places?loc=${location}&bar=show`);
  };

  const handleSelect = loc => {
    if (!extra) {
      setLocation(loc);
      setUrl();
    }
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    if (!extra) {
      setUrl();
    }
  };

  const handleExtraChange = event => {
    event.preventDefault();
    setExtra(event.target.value);
  };

  const classes = makeStyles(styles)();

  const inputProps = {
    value: location,
    onChange
  };

  const myStyles = {
    autocompleteContainer: {
      zIndex: 1000,
      fontFamily: 'Alegreya Sans, sans-serif'
    }
  };

  return (
    <div
      className={`${classes.searchBar} ${className}`}
      style={{ ...style }}
      ref={searchBarRef}
    >
      <div className={classes.form}>
        <PlacesAutocomplete
          inputProps={inputProps}
          styles={myStyles}
          onSelect={handleSelect}
          className={classes.autocomplete}
        />
        <input
          className={classes.extra}
          autoComplete="off"
          type="text"
          id="extra"
          name="extra"
          placeholder="Your extra here"
          value={extra}
          onChange={handleExtraChange}
        />
      </div>
      <IconButton
        className={classes.button}
        aria-label="Show bars"
        title="Show bars"
        onClick={handleFormSubmit}
      >
        <Search className={classes.icon} />
      </IconButton>
    </div>
  );
}

export default withRouter(SearchBar);

SearchBar.propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape({}),
  searchBarRef: PropTypes.shape({}),
  currentLocation: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

SearchBar.defaultProps = {
  className: '',
  style: {},
  searchBarRef: null,
  currentLocation: ''
};
