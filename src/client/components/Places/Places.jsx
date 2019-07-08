import React from 'react';
import PropTypes from 'prop-types';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/styles';
import Map from '../Map';
import { BarCardContainer as BarCard } from '../BarCard';
import Splitter from '../Splitter';
import SearchBar from '../SearchBar';
import styles from './PlacesStyles';

function Places({
  bars,
  upButtonVisible,
  setScrollEvent,
  searchBarRef,
  currentLocation,
  createCardRef,
  scroll,
  markerClick,
  loading
}) {
  const classes = makeStyles(styles)();
  const upButtonWrapperStyle = upButtonVisible
    ? { visibility: 'visible' }
    : { visibility: 'hidden', opacity: 0 };
  return (
    <div className={classes.wrapper}>
      <div className={classes.listWrapper} id="ListId" ref={setScrollEvent}>
        <SearchBar
          currentLocation={currentLocation}
          searchBarRef={searchBarRef}
        />
        {!!bars &&
          bars.map((item, index) => (
            <div key={item.id}>
              {index > 0 && <Splitter />}
              <BarCard
                createCardRef={createCardRef}
                barId={item.id}
                placeId={item.placeId}
                img={item.img}
                name={item.name}
                address={item.address}
                rating={item.rating}
                visitorsCount={item.visitorsCount}
              />
            </div>
          ))}
        <div className={classes.upButtonWrapper} style={upButtonWrapperStyle}>
          <div className={classes.upButton} onClick={scroll}>
            <ArrowUpward className={classes.icon} />
          </div>
        </div>
      </div>
      <div className={classes.map}>
        <Map isMarkerShown markers={bars} markerClick={markerClick} />
      </div>
      {!!loading && (
        <div className={classes.progress}>
          <CircularProgress size={160} />
        </div>
      )}
    </div>
  );
}

export default Places;

Places.propTypes = {
  bars: PropTypes.arrayOf(PropTypes.shape({})),
  upButtonVisible: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  setScrollEvent: PropTypes.func.isRequired,
  searchBarRef: PropTypes.shape({}).isRequired,
  createCardRef: PropTypes.func.isRequired,
  scroll: PropTypes.func.isRequired,
  markerClick: PropTypes.func.isRequired
};

Places.defaultProps = {
  bars: null,
  currentLocation: ''
};
