import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import styles from './BarCardStyles';

const useStyles = makeStyles(styles);

function Visitors({ isBarInBasket, countWithoutUser }) {
  const classes = useStyles();
  const renderCountWithUser =
    countWithoutUser <= 0 ? (
      <span className={classes.visitorsCountWrapper}>
        <span className={classes.you}>Me</span>
      </span>
    ) : (
      <span className={classes.visitorsCountWrapper}>
        <span className={classes.you}>Me and</span>
        <span className={classes.visitorsCount}>{` ${countWithoutUser}`}</span>
      </span>
    );
  const renderCountWithoutUser = (
    <span className={classes.visitorsCount}>
      {countWithoutUser <= 0 ? '-' : countWithoutUser}
    </span>
  );

  return (
    <div className={classes.visitorsWrapper}>
      <span className={classes.visitors}>
        {'Going: '}
        {isBarInBasket ? renderCountWithUser : renderCountWithoutUser}
      </span>
    </div>
  );
}

export default Visitors;

Visitors.propTypes = {
  isBarInBasket: PropTypes.bool.isRequired,
  countWithoutUser: PropTypes.number.isRequired
};
