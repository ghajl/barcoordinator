import { connect } from 'react-redux';
import Marker from './Marker';

const isHighlighted = (barId, highlightedId) => barId === highlightedId;

const mapStateToProps = ({ reducer }, { barId }) => ({
  isHighlighted: isHighlighted(barId, reducer.bar.highlighted)
});

export default connect(mapStateToProps)(Marker);
