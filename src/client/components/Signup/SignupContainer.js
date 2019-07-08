import { connect } from 'react-redux';
import Signup from './Signup';
import { signUp } from '../../data/actions/user';

export default connect(
  () => ({}),
  { signUp }
)(Signup);
