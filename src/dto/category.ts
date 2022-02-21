import * as yup from 'yup';

export = yup.object().shape({
    name: yup.string().required().trim()
})