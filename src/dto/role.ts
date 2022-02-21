import * as yup from 'yup';

export = yup.object().shape({
    textRole: yup.string().required().trim()
  });

