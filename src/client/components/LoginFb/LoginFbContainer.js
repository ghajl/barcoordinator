import { connect } from 'react-redux';
import LoginFb from './LoginFb';
import { startFacebookLogin } from '../../data/actions/user';

const mapStateToProps = ({ reducer }) => ({
  barId: reducer.guestBar,
  bars: reducer.location.bars
});

export default connect(
  mapStateToProps,
  { startFacebookLogin }
)(LoginFb);
