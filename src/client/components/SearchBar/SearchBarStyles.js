export default theme => ({
  text: theme.typography.button,
  searchBar: {
    width: '100%',
    height: '90px',
    minHeight: '90px',
    backgroundColor: '#FFD54F',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    '& input[type="text"]': {
      border: 'none',
      fontFamily: 'Alegreya Sans, sans-serif'
    }
  },
  form: {
    width: '80%',
    padding: '16px'
  },
  icon: {
    fontSize: 36,
    width: 36,
    height: 36
  },
  autocomplete: {}
});
