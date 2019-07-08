import { createSelector } from 'reselect';

const getUserBars = state => state.reducer.user.bars;

const getBarId = (state, props) => props.barId;

const makeBarInBasket = () => {
  return createSelector(
    [getUserBars, getBarId],
    (userBars, barId) => {
      return userBars && userBars.indexOf(barId) !== -1;
    }
  );
};

export default makeBarInBasket;
