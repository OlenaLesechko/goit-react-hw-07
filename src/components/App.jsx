import './App.css';
import ContactList from './ContactList/ContactList';
import SearchBar from './SearchBox/SearchBox';
import ContactForm from './ContactForm/ContactForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectContacts,
  selectError,
  selectLoading,
} from '../redux/contactsSlice';
import Loader from './Loader/Loader';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import { useEffect } from 'react';
import { fetchContacts } from '../redux/contactsOps';
import Notification from './Notification/Notification';
import Title from './Title/Title';

export default function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <Title />
      <ContactForm />
      <SearchBar />
      {contacts.length > 0 ? <ContactList /> : <Notification />}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {loading && <Loader>Loading message</Loader>}
    </div>
  );
}
