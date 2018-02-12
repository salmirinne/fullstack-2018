import React from 'react';
import ReactDOM from 'react-dom'
import Persons from './components/persons'
import Notification from './components/notification'
import FilterForm from './components/filter-form'
import personsService from './services/persons'

import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      error: null
    }
  }

  componentWillMount() {
    this.getPersons()
  }

  getPersons = () => {
    personsService
      .getAll()
      .then(response => {
        this.setState({ persons: response })
      })
  }

  resetNotification = () => {
    setTimeout(() => {
      this.setState({error: null})
    }, 3000);
  }

  // FIXME: does too much stuff
  addPerson = (event) => {
    event.preventDefault()
    let nameToAdd = this.state.newName.trim()
    if (this.state.newName !== '' && this.state.newNumber !== '') {

      let person = this.state.persons.find(p => p.name === nameToAdd)

      if (person === undefined) {
        let newPerson = { name: nameToAdd, number: this.state.newNumber }
        personsService.create(newPerson)
          .then(response => {
            this.setState({ 
              persons: this.state.persons.concat(response),
              newName: '',
              newNumber: '',
              error: `'${response.name}' luotiin onnistuneesti`
            })
            this.resetNotification()
          })
      } else {
        if (window.confirm(`'${person.name}' on jo luettelossa, korvataanko vanha numero uudella?`)) {
          personsService.update(person.id, { name: nameToAdd, number: this.state.newNumber })
            .then(response => {
              this.setState({ error: `'${response.name}' muokattiin onnistuneesti` })
              this.resetNotification()
              this.getPersons()
            })
        }        
      }
    }
  }

  deletePerson = (id) => () => personsService
    .remove(id)
    .then(response => {
      this.setState({ error: `Numeron poisto onnistui` })
      this.resetNotification()
      this.getPersons()
    })

  handleNameChange = (event) => this.setState({ newName: event.target.value })
  handleNumberChange = (event) => this.setState({ newNumber: event.target.value })
  handleFilterChange = (event) => this.setState({ filter: event.target.value })

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Notification message={this.state.error} />
        <FilterForm 
          value={this.state.filter} 
          filterChanged={this.handleFilterChange}
        />
        <h3>Lisää uusi</h3>
        <form onSubmit={this.addPerson}>
          <div>
            Nimi:
            <input
              value={this.state.newName}
              onChange={this.handleNameChange}
            />
          </div>
          <div>
            Numero:
            <input
              value={this.state.newNumber}
              onChange={this.handleNumberChange}
            />
          </div>
          <div>
            <button type="submit">Lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <Persons 
          persons={this.state.persons} 
          filter={this.state.filter} 
          deletePerson={this.deletePerson}
        />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
