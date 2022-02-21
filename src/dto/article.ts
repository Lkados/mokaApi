import * as yup from 'yup';

export = yup.object().shape({
    title: yup.string().required().trim(),
    /*subHead: yup.string().required().trim(),*/
    /*contents: yup.string().required().email(),*/
    text: yup.string().required().trim()
  });

