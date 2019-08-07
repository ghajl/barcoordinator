import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Required field'),
  password: Yup.string().required('Required field')
});

const configFormik = {
  mapPropsToValues: () => ({
    username: '',
    password: ''
  }),
  validationSchema,
  handleSubmit: (values, { props, setSubmitting }) => {
    // axios.post('/handle-form', values);
    console.log(props);
    const { username, password } = values;
    props.submitData({ username, password }, props.history);
    setSubmitting(false);
  },
  validateOnChange: false,
  validateOnBlur: false
};

export default configFormik;
