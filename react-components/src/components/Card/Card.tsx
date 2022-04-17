import React from 'react';
import { TUser } from '../FormPage/FormPage.types';

const Card = ({ birthday, city, email, fullName, role, skills }: TUser) => {
  return (
    <li style={{ padding: '10px' }} className="card">
      <h3>New User:</h3>
      <p>Fullname: {fullName}</p>
      <p>Role: {role}</p>
      <p>Birthday: {birthday}</p>
      <p>City: {city}</p>
      <p>Email: {email}</p>
      <p>File was successfully downloaded!</p>
      <p>Skills:</p>
      <ul className="list">
        {skills[0] && <li>- HTML </li>}
        {skills[1] && <li>- CSS </li>}
        {skills[2] && <li>- JS </li>}
      </ul>
    </li>
  );
};

export default Card;
