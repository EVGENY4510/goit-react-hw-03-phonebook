import React, { Component } from 'react';
import css from './ContactList.module.css';

export default class ContactList extends Component {
  displaySearchResult = () => {
    const { contacts, filter } = this.props;

    const filteredContacts = contacts.filter(contact => {
      const searchResultLower = filter.toLowerCase();
      const contactLower = contact.name.toLowerCase();
      return contactLower.includes(searchResultLower);
    });
    return filteredContacts.map(contact => (
      <li key={contact.idKey} className={css.item}>
        <p>
          - {contact.name} :<span className={css.span}>{contact.number}</span>
        </p>
        <button
          className={css.deleteButton}
          type="button"
          onClick={() => this.props.deleteContact(contact.idKey)}
        >
          Delete
        </button>
      </li>
    ));
  };

  render() {
    return <ul>{this.displaySearchResult()}</ul>;
  }
}
