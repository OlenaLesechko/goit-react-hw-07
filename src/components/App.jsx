import './App.css';
import ContactList from './ContactList/ContactList';
import SearchBar from './SearchBox/SearchBox';
import ContactForm from './ContactForm/ContactForm';

function App() {
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBar />
      <ContactList />
    </div>
  );
}

export default App
