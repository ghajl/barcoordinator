import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { withRouter } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import { compose } from 'recompose';
import { defaultLocation } from '../../util/locations';
import styleVariables from '../../helpers/styleVariables';
import { findLocation, showBars } from '../../data/actions/location';
import { showVisitorsList, highlightPlace } from '../../data/actions/bar';
import { replaceLocation } from '../../data/actions/url';
import Places from './Places';

class PlacesContainer extends Component {
  constructor(props) {
    super(props);
    const { location, replaceLocation, history } = props;
    this.urlQuery = qs.parse(location.search);
    console.log(history);
    // if there isn't parameter 'loc' in the url - replace url with default location
    if (!this.urlQuery.loc) {
      // replaceLocation(defaultLocation.address, location.pathname);
      history.replace(`/places?loc=${defaultLocation.address}&bar=show`);
    }
    this.barCards = {};
    this.searchBarRef = React.createRef();
    this.state = {
      upButtonVisible: false
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    const { location, showBars, mapService } = this.props;
    this.urlQuery = qs.parse(location.search);
    if (this.urlQuery.bar && this.urlQuery.loc && mapService) {
      showBars(this.urlQuery.loc);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      location,
      showBars,
      replaceLocation,
      mapService,
      history
    } = this.props;
    if (
      (location.search != null &&
        location.search !== prevProps.location.search) ||
      (!prevProps.mapService && !!mapService)
    ) {
      this.urlQuery = qs.parse(location.search);
      // // if there is 'bar' parameter in url - show list of bars
      // // if there is only 'loc' parameter - show location on the map
      if (this.urlQuery.loc && mapService) {
        showBars(this.urlQuery.loc);
      } else {
        history.replace(`/places?loc=${defaultLocation.address}&bar=show`);
        // replaceLocation(defaultLocation.address, location.pathname);
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  setScrollEvent = element => {
    if (element) {
      element.addEventListener('scroll', this.handleScroll);
    }
  };

  // show choosed bar on map and in list of bar cards
  markerClick = barId => {
    const { highlightPlace } = this.props;
    if (this.barCards[barId] && this.searchBarRef) {
      const searchBarPosition = this.searchBarRef.current.getBoundingClientRect()
        .top;
      const barCardPosition = this.barCards[barId].getBoundingClientRect().top;
      const position = barCardPosition - searchBarPosition;
      this.scrollTo(position);
    }
    highlightPlace(barId);
  };

  createCardRef = (barId, ref) => {
    this.barCards[barId] = ref;
  };

  showList = barId => {
    const { showVisitorsList } = this.props;
    showVisitorsList(barId);
  };

  scrollTo = pos => {
    scroll.scrollTo(pos, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
      containerId: 'ListId'
    });
  };

  scrollToTop = innerWidth => {
    if (innerWidth <= 480) {
      scroll.scrollToTop();
    } else {
      scroll.scrollToTop({ containerId: 'ListId' });
    }
  };

  handleScroll = () => {
    if (this.searchBarRef) {
      const { upButtonVisible } = this.state;
      const { top } = this.searchBarRef.current.getBoundingClientRect();
      if (upButtonVisible) {
        if (top >= -20) {
          this.setState({ upButtonVisible: false });
        }
      } else if (top < -20) {
        this.setState({ upButtonVisible: true });
      }
    }
  };

  render() {
    const { bars, loading } = this.props;
    const { upButtonVisible } = this.state;
    const { innerWidth } =
      typeof window !== 'undefined' ? window : { innerWidth: 1800 };

    return (
      <Places
        upButtonVisible={upButtonVisible}
        bars={bars}
        currentLocation={this.urlQuery.loc}
        scroll={() => this.scrollToTop(innerWidth)}
        markerClick={this.markerClick}
        setScrollEvent={this.setScrollEvent}
        searchBarRef={this.searchBarRef}
        loading={loading}
        createCardRef={this.createCardRef}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    bars: state.reducer.location.bars,
    lat: state.reducer.location.lat,
    lng: state.reducer.location.lng,
    loading: state.reducer.user.isWaiting,
    mapService: state.reducer.map.service
  };
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    {
      findLocation,
      showBars,
      showVisitorsList,
      highlightPlace,
      replaceLocation
    }
  )
)(PlacesContainer);

PlacesContainer.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired
  }).isRequired,
  loading: PropTypes.bool,
  bars: PropTypes.arrayOf(PropTypes.shape({})),
  replaceLocation: PropTypes.func.isRequired,
  showBars: PropTypes.func.isRequired,
  highlightPlace: PropTypes.func.isRequired,
  showVisitorsList: PropTypes.func.isRequired
};

PlacesContainer.defaultProps = {
  bars: null,
  loading: false
};
