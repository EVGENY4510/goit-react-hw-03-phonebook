import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import css from './app.module.css';
import { nanoid } from 'nanoid';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts) {
      this.setState({ contacts: contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  deleteContact = params => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.idKey !== params),
    }));
  };

  onChangeFilter = value => {
    this.setState({ filter: value });
  };

  addContact = params => {
    const { name, number } = params;

    // console.log(name, number);
    const newContact = {};
    newContact.name = name;
    newContact.idKey = nanoid();
    newContact.number = number;
    const list = this.state.contacts.map(contact => contact.name.toLowerCase());
    if (list.includes(name.toLowerCase())) {
      alert(`${name} is already in contact`);
      return;
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  render() {
    return (
      <div className={css.appWrapper}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm addContact={this.addContact} />

        <h2 className={css.titleContact}>Contacts</h2>
        <Filter onChangeFilter={this.onChangeFilter} />
        <ContactList
          contacts={this.state.contacts}
          filter={this.state.filter}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
