import Contact from '../Contact/Contact';
import css from './ContactList.module.css';
import { useSelector } from 'react-redux';
import { selectContacts } from '../../redux/contactsSlice';
import { selectFilter } from '../../redux/filtersSlice';


export default function ContactList() {
    const contacts = useSelector(selectContacts);
    const filter = useSelector(selectFilter);
    const getFilteredContacts = () => {
        return contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter ? filter.toLowerCase() : '')
        );
    };
    const filteredContacts = getFilteredContacts();
    return (
        <ul className={css.list}>
        {filteredContacts.map(({ id, name, number }) => (
            <li key={id} className={css.item}>
            <Contact name={name} number={number} id={id} />
            </li>
        ))}
        </ul>
    );
}

