import React from 'react';

const Persons = ({persons, filter, deletePerson}) => {  

  const showPersons = () => 
    persons
      .filter(p => 
        p.name && p.name
          .toLowerCase()
          .includes(filter.toLowerCase())
      ).map(p =>
        <tr key={p.id}>
          <td>{p.name}</td>
          <td>{p.number}</td>
          <td><button onClick={deletePerson(p.id)}>Poista</button></td>
        </tr>
      )

  return (
    <table>
      <tbody>
        {showPersons()}
      </tbody>
    </table>
  )
}

export default Persons