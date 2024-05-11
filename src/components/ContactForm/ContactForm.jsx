import { Field, Formik, Form, ErrorMessage } from 'formik';
import { useId } from 'react';
import css from './ContactForm.module.css';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from '../../redux/contactsSlice';
import { addContact } from '../../redux/contactsOps';

const initialValues = {
    name: '',
    number: '',
};

const phoneRegExp = /^(?:\+\d{1,3})?(?:\d{9,15})$/;
const contactSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Name is too short!')
        .max(30, 'Name is too long!')
        .required('Name is required!'),
    number: Yup.string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .required('Phone number is required!'),
});

export default function ContactForm() {
    const dispatch = useDispatch();
    const contacts = useSelector(selectContacts);
    const contactNameFieldId = useId();
    const numberFieldId = useId();

    const handleSubmit = (values, actions) => {
    const isDuplicateNumber = contacts.some(
        contact => contact.number === values.number
        );
        if (isDuplicateNumber) {
        alert('This phone number already exists!');
        } else {
        dispatch(
            addContact({
            name: values.name,
            number: values.number,
            id: nanoid(),
            })
        );
    }
    actions.resetForm();
    };
    
    return (
        <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={contactSchema}
        >
        <Form className={css.form}>
            <div className={css.div}>
            <label htmlFor={contactNameFieldId} className={css.label}>
                Name
            </label>
            <Field
                type="text"
                name="name"
                id={contactNameFieldId}
                className={css.input}
            />
            <ErrorMessage className={css.error} name="name" as="span" />
            </div>
            <div className={css.div}>
            <label htmlFor={numberFieldId} className={css.label}>
                Number
            </label>
            <Field
                type="text"
                name="number"
                id={numberFieldId}
                className={css.input}
            />
            <ErrorMessage className={css.error} name="number" as="span" />
            </div>

            <button type="submit" className={css.btn}>
            Add contact
            </button>
        </Form>
        </Formik>
    );
}
