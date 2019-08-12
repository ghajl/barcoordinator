import styleVariables from '../../helpers/styleVariables';

export default {
  wrapper: {
    flex: '1 0 auto',
    display: 'flex',
    position: 'relative',
    '@media (max-width: 480px)': {
      flexDirection: 'column'
    },
    marginTop: '60px',
    '@media (max-width: 600px)': {
      marginTop: '50px'
    }
  },
  listWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    position: 'relative',
    backgroundColor: '#193150',
    '@media (min-width: 481px)': {
      maxWidth: '400px',
      width: '50%',
      'overflow-y': 'scroll',
      height: `calc(100vh - ${parseInt(
        styleVariables.footerHeightLg,
        10
      )}px - ${parseInt(styleVariables.headerHeightLg, 10)}px)`
    },
    '@media (max-width: 480px)': {
      flex: '1 0 auto'
    }
  },
  item: {
    margin: '20px'
  },
  map: {
    flexGrow: 1,
    height: `calc(100vh - ${parseInt(
      styleVariables.footerHeightLg,
      10
    )}px - ${parseInt(styleVariables.headerHeightLg, 10)}px)`,
    '@media (max-width: 480px)': {
      width: 0,
      height: 0
    }
  },
  upButtonWrapper: {
    bottom: '10%',
    right: '10%',
    zIndex: 1000,
    opacity: 0.7,
    transition: '.6s',
    position: 'relative',
    width: 0,
    height: 0,
    '@media (min-width: 641px)': {
      width: '52px',
      height: '52px',
      position: 'absolute'
    }
  },
  upButton: {
    width: '50px',
    height: '50px',
    position: 'fixed',
    borderRadius: '50%',
    backgroundColor: 'black',
    cursor: 'pointer',
    boxShadow: '1px 1px 6px rgba(0, 0, 0, .5)',
    '@media (max-width: 480px)': {
      bottom: '10%',
      right: '10%'
    }
  },
  icon: {
    fill: 'white',
    width: '36px',
    height: '36px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  progress: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 2000
  }
};
