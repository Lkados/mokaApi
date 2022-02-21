import * as yup from 'yup';

export = yup.object().shape({
    firstName: yup.string().required().trim(),
    lastName: yup.string().required().trim(),
    email: yup.string().required().email(),
    password: yup.string().required().min(8, 'Password too short (8 caracters minimum)'),
    roleId: yup.number().required()
    //social_media: yup.
  });

