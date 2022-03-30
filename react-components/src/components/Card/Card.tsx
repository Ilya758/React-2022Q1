import React from 'react';
import { IUserData } from '../FormPage/FormPage.types';

export default class Card extends React.Component<IUserData> {
  constructor(props: IUserData) {
    super(props);
  }

  render() {
    const { birthday, city, email, file, fullName, role, skills } = this.props;

    return (
      <li style={{ padding: '10px' }} className="card">
        <h3>New User:</h3>
        <p>Fullname: {fullName}</p>
        <p>Role: {role}</p>
        <p>Birthday: {birthday}</p>
        <p>City: {city}</p>
        <p>Email: {email}</p>
        <p>File: {file}</p>
        <p>Skills:</p>
        <ul className="list">
          {skills.html && <li>- HTML </li>}
          {skills.css && <li>- CSS </li>}
          {skills.js && <li>- JS </li>}
        </ul>
      </li>
    );
  }
}
