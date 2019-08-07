import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Done from '@material-ui/icons/Done';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import Group from '@material-ui/icons/Group';
import Place from '@material-ui/icons/Place';
import Card, { CardContent, CardImage, CardActions } from '../Card';
import Stars from './Stars';
import Visitors from './Visitors';
import styles from './BarCardStyles';

const useStyles = makeStyles(styles);

function BarCard({
  highlightPlace,
  loginAndAdd,
  showVisitorsList,
  addBar,
  createCardRef,
  barId,
  img,
  name,
  address,
  rating,
  authenticated,
  isBarInBasket,
  countWithoutUser,
  shouldShowVisitorsList,
  history
}) {
  const cardRef = useRef(null);

  useEffect(() => {
    createCardRef(barId, cardRef.current);
  });

  const classes = useStyles();

  const add = event => {
    event.preventDefault();
    event.stopPropagation();
    addBar(barId, history);
  };

  const show = event => {
    event.preventDefault();
    event.stopPropagation();
    showVisitorsList(barId);
  };

  const loginAdd = event => {
    event.preventDefault();
    event.stopPropagation();
    loginAndAdd(barId);
  };

  const highlightMarker = () => {
    highlightPlace(barId);
  };

  return (
    <div ref={cardRef} className={classes.wrapper}>
      <Card id={barId}>
        <CardContent>
          {img && (
            <div className={classes.imageWrapper}>
              <CardImage src={img} />
            </div>
          )}
          <div>
            <span className={classes.name}>{name}</span>
          </div>
          <span className={classes.address}>{address}</span>
          {rating && (
            <div className={classes.rating}>
              <Stars rating={rating} />
            </div>
          )}
          <Visitors
            isBarInBasket={isBarInBasket}
            countWithoutUser={countWithoutUser}
          />
          <CardActions>
            {isBarInBasket ? (
              <Done className={`${classes.icon} ${classes.add}`} />
            ) : (
              <IconButton
                className={classes.button}
                aria-label="Add to list"
                title="Add to list"
                onClick={authenticated ? add : loginAdd}
              >
                <AddCircleOutline
                  className={`${classes.icon} ${classes.add}`}
                />
              </IconButton>
            )}
            {shouldShowVisitorsList && (
              <IconButton
                className={classes.button}
                aria-label="Show list"
                title="Show list"
                onClick={show}
              >
                <Group className={classes.icon} />
              </IconButton>
            )}
            <IconButton
              className={`${classes.button} ${classes.mapVisible}`}
              aria-label="Show on map"
              title="Show on map"
              onClick={highlightMarker}
            >
              <Place className={classes.icon} />
            </IconButton>
          </CardActions>
        </CardContent>
      </Card>
    </div>
  );
}

export default withRouter(BarCard);

BarCard.propTypes = {
  showVisitorsList: PropTypes.func.isRequired,
  createCardRef: PropTypes.func.isRequired,
  barId: PropTypes.string.isRequired,
  img: PropTypes.string,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  rating: PropTypes.number,
  isBarInBasket: PropTypes.bool.isRequired,
  highlightPlace: PropTypes.func.isRequired,
  addBar: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  loginAndAdd: PropTypes.func.isRequired,
  countWithoutUser: PropTypes.number,
  shouldShowVisitorsList: PropTypes.bool,
  history: PropTypes.shape({}).isRequired
};

BarCard.defaultProps = {
  img: null,
  rating: 0,
  countWithoutUser: 0,
  shouldShowVisitorsList: false
};
