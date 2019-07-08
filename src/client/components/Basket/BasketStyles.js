export default {
  basket: {
    borderRadius: 0,
    'overflow-y': 'hidden',
    minWidth: '200px',
    '@media (min-width: 450px)': {
      width: '400px'
    },
    '&>*': {
      padding: 0
    }
  },
  container: {
    maxHeight: 'calc(100vh - 100px)',
    position: 'relative',
    'overflow-y': 'hidden',
    '@media (min-heght: 600px)': {
      maxHeight: '500px'
    }
  },
  header: {
    height: '48px',
    outline: 'none',
    background: '#211E1E',
    color: '#fff',
    justifyContent: 'center',
    paddingLeft: '16px'
  },
  title: {
    fontWeight: 900,
    fontSize: '1.5em'
  },
  list: {
    outline: 'none',
    marginTop: '48px',
    maxHeight: 'calc(100vh - 148px)',
    padding: 0,
    'overflow-y': 'auto',
    '@media (min-height: 600px)': {
      maxHeight: '452px'
    }
  },
  emptyItem: {
    fontSize: '1.4rem',
    color: '#555'
  }
};
