import styleVariables from '../../helpers/styleVariables';

export default {
  wrapper: {
    textAlign: 'center',
    flexShrink: 0,
    backgroundColor: '#110E0E',
    boxShadow: '0 -3px 7px -6px #222',
    height: `${styleVariables.footerHeightSm}px`,
    '@media (min-width: 320px)': {
      height: `${styleVariables.footerHeightLg}px`
    },
    '& *': {
      boxSizing: 'content-box'
    }
  },
  element: {
    display: 'inline-block',
    maxWidth: '160px',
    textAlign: 'center'
  },
  container: {
    display: 'inline-block',
    width: 'auto',
    textAlign: 'center'
  },
  icon: {
    transition: '.4s',
    borderRadius: '50%',
    border: '1px solid',
    borderColor: 'white',
    padding: '5px',
    margin: '.5em',
    width: '24px',
    height: '24px',
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
    margin: '5px auto 5px'
  }
};
