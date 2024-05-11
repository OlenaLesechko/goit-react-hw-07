import css from './Contact.module.css';
import { FaPhone } from 'react-icons/fa6';
import { FaUser } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsOps';

export default function Contact({ name, number, id }) {
    const dispatch = useDispatch();
    const handleDelete = () => dispatch(deleteContact(id));
    return (
        <div className={css.wrap}>
        <div className={css.div}>
            <p className={css.text}>
            <FaUser className={css.icon} />
            {name}
            </p>
            <p>
            <FaPhone className={css.icon} />
            {number}
            </p>
        </div>
        <button className={css.btn} onClick={handleDelete}>
            Delete
        </button>
        </div>
    );
}
