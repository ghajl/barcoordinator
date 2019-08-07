export default {
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingTop: '1rem',
    '&>*': {
      margin: '0 1rem'
    }
  },
  card: {
    width: '100%',
    height: '100%',
    backgroundColor: '#193150',
    position: 'relative',
    fontFamily: 'Poiret One, cursive'
  },
  content: {
    padding: '1rem',
    fontSize: '30px',
    color: 'white'
  },
  container: {
    position: 'relative',
    minWidth: 100,
    minHeight: 100,
    background: '#333'
  },
  image: {
    objectFit: 'contain',
    display: 'none',
    maxWidth: '100%',
    padding: '3px',
    boxShadow: '10px 10px 3px #000',
    border: '1px solid #ddd',
    borderRadius: '3px'
  },
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
};
