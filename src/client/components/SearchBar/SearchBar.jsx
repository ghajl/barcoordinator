import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete from 'react-places-autocomplete';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Search from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import { setPlacesLocation } from '../../data/actions/url';
import styles from './SearchBarStyles';

function SearchBar({
  currentLocation,
  setPlacesLocation,
  style,
  className,
  searchBarRef
}) {
  const [location, setLocation] = useState(currentLocation);

  useEffect(() => {
    setLocation(currentLocation);
  }, [currentLocation]);

  const onChange = loc => setLocation(loc);

  const handleSelect = loc => {
    setLocation(loc);
    setPlacesLocation(loc);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    setPlacesLocation(location);
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

export default connect(
  () => ({}),
  { setPlacesLocation }
)(SearchBar);

SearchBar.propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape({}),
  searchBarRef: PropTypes.shape({}),
  currentLocation: PropTypes.string,
  setPlacesLocation: PropTypes.func.isRequired,
  classes: PropTypes.shape({})
};

SearchBar.defaultProps = {
  className: '',
  classes: {},
  style: {},
  searchBarRef: null,
  currentLocation: ''
};
