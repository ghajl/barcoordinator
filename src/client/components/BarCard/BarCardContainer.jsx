import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import BarCard from './BarCard';
import {
  addBar,
  removeBar,
  showVisitorsList,
  highlightPlace
} from '../../data/actions/bar';
import { openLoginDialog } from '../../data/actions/ui';
import { loginAndAdd } from '../../data/actions/user';
import makeBarInBasket from '../../data/selectors/barInBasketSelectors';

const makeMapStateToProps = () => {
  const isBarInBasket = makeBarInBasket();
  const mapStateToProps = (state, props) => {
    return {
      isBarInBasket: isBarInBasket(state, props),
      authenticated: state.reducer.user.authenticated,
      username: state.reducer.user.username
    };
  };
  return mapStateToProps;
};

export default compose(
  connect(
    makeMapStateToProps,
    {
      addBar,
      removeBar,
      loginAndAdd,
      openLoginDialog,
      showVisitorsList,
      highlightPlace
    }
  ),
  withProps(props => {
    const countWithoutUser = props.isBarInBasket
      ? props.visitorsCount - 1
      : props.visitorsCount;

    const shouldShowVisitorsList =
      props.authenticated &&
      ((props.isBarInBasket && countWithoutUser > 1) || countWithoutUser > 0);
    return { countWithoutUser, shouldShowVisitorsList };
  })
)(BarCard);
