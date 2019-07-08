import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Menu from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Splitter from '../Splitter';
import styles from './BasketStyles';
import { removeBar } from '../../data/actions/bar';
import Item from './Item';

const useStyles = makeStyles(styles);

function Basket({ removeBar, basketList, anchorEl, open, onClose }) {
  const classes = useStyles();

  const remove = (barId, placeId) => event => {
    event.preventDefault();
    event.stopPropagation();
    removeBar(barId, placeId);
  };

  return (
    <Menu
      id="basket-menu"
      classes={{ paper: classes.basket }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={open}
      onClose={onClose}
    >
      <div className={classes.container}>
        <AppBar className={classes.header} position="absolute">
          <Typography color="inherit" className={classes.title}>
            {'My Places'}
          </Typography>
        </AppBar>
        <List classes={{ root: classes.list }}>
          {basketList.length > 0 ? (
            basketList.map((bar, index) => {
              const { name, address, barId, placeId } = bar;
              const removeItem = remove(barId, placeId);
              return (
                <div key={barId}>
                  {index > 0 && (
                    <div style={{ background: '#eee' }}>
                      <Splitter
                        style={{
                          width: '90%',
                          height: '1px',
                          minHeight: '1px'
                        }}
                      />
                    </div>
                  )}
                  <ListItem classes={{ root: classes.itemWrapper }}>
                    <Item
                      name={name}
                      address={address}
                      removeItem={removeItem}
                    />
                  </ListItem>
                </div>
              );
            })
          ) : (
            <ListItem classes={{ root: classes.itemWrapper }}>
              <div className={classes.emptyItem}>
                {'You have not yet chosen a bar'}
              </div>
            </ListItem>
          )}
        </List>
      </div>
    </Menu>
  );
}

export default connect(
  null,
  {
    removeBar
  }
)(Basket);

Basket.propTypes = {
  basketList: PropTypes.arrayOf(PropTypes.shape({})),
  onClose: PropTypes.func.isRequired,
  removeBar: PropTypes.func.isRequired,
  anchorEl: PropTypes.shape({}),
  open: PropTypes.bool.isRequired
};

Basket.defaultProps = {
  basketList: [],
  classes: {},
  anchorEl: null
};
