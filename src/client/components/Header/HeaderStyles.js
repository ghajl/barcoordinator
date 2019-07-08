export default theme => ({
  nav: {
    overflow: 'hidden'
  },
  logo: {
    flex: 1,
    'text-transform': 'none',
    fontWeight: 900,
    fontSize: '1.5em',
    color: '#fff'
  },
  login: {
    margin: 5
  },
  appBar: {
    background: '#110E0E',
    color: '#fff',
    overflow: 'hidden'
  },
  text: { ...theme.typography.button, ...{ color: 'white' } },
  basket: {
    color: 'white',
    '@media (min-width: 641px)': {
      marginRight: '2rem'
    }
  },
  popUpMenu: {
    background: '#110E0E'
  },
  icon: {
    fontSize: '1.6rem'
  },
  badge: {
    top: '30%',
    right: -9,
    backgroundColor: 'green'
  },
  menuSmall: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '@media (min-width: 601px)': {
      display: 'none'
    }
  },
  menuLarge: {
    display: 'none',
    '@media (min-width: 601px)': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }
});
