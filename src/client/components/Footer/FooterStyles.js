import styleVariables from '../../helpers/styleVariables';

export default {
  wrapper: {
    textAlign: 'center',
    backgroundColor: '#110E0E',
    boxShadow: '0 -3px 7px -6px #222',
    height: `${styleVariables.footerHeightSm * 2}px`,
    '@media (min-width: 481px)': {
      height: `${styleVariables.footerHeightSm}px`
    },
    '@media (min-width: 601px)': {
      height: `${styleVariables.footerHeightLg}px`
    },
    '& *': {
      boxSizing: 'content-box'
    }
  },
  element: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '160px',
    textAlign: 'center',
    position: 'relative',
    minWidth: '130px',
    fontSize: '.9em'
  },
  container: {
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '@media (min-width: 481px)': {
      flexDirection: 'row'
    },
    height: '100%'
  },
  icon: {
    transition: '.4s',
    borderRadius: '50%',
    border: '1px solid',
    borderColor: 'white',
    padding: '5px',
    margin: '.5em',
    width: '20px',
    height: '20px',
    '@media (min-width: 601px)': {
      width: '24px',
      height: '24px'
    },
    '.can-hover &:hover ': {
      borderColor: 'white',
      backgroundColor: 'white',
      fill: 'black'
    }
  },
  a: {
    fill: 'white'
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '130px',
    fontSize: '.9em'
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    fill: 'white'
  }
};
