export default theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '1 0 auto',
    marginTop: '60px',
    '@media (max-width: 600px)': {
      marginTop: '50px'
    }
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 500,
    maxWidth: '100%'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 500,
    maxWidth: '100%'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
    maxWidth: '100%'
  },
  menu: {
    width: 200
  },
  button: {
    marginTop: 50
  },
  fbLogin: {
    textAlign: 'center',
    marginTop: 50
  }
});
