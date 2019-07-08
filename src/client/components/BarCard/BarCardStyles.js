export default {
  wrapper: {
    display: 'inline-block',
    width: '100%'
  },
  name: {
    fontSize: '2.4rem',
    lineHeight: '1',
    marginBottom: '.2rem',
    color: '#7FC4F3'
  },
  address: {
    fontSize: '1.2rem'
  },
  rating: {},
  action: {
    textAlign: 'center'
  },
  visitorsWrapper: {
    fontSize: '1.2rem',
    display: 'flex',
    alignItems: 'center'
  },
  visitors: {
    display: 'inline-block',
    lineHeight: '1'
  },
  imageWrapper: {
    maxHeight: '200px',
    display: 'flex',
    justifyContent: 'center',
    margin: '1rem 0 3rem 0'
  },
  centerVertical: {
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)'
  },
  icon: {
    color: 'white',
    fontSize: 36,
    width: 36,
    height: 36
  },
  remove: {
    color: '#FF3535'
  },
  add: {
    color: '#93DB18'
  },
  button: {},
  mapVisible: {
    display: 'none',
    '@media (min-width: 641px)': {
      display: 'block'
    }
  }
};
