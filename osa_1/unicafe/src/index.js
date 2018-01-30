import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0
    }
  }

  updateFn = (property) => this.setState({[property]: this.state[property] + 1})

  render() {
    return (
      <div>
        <h2>Anna palautetta</h2>
        <div>
          <Button handleClick={() => this.updateFn("hyva")} text="Hyvä" />
          <Button handleClick={() => this.updateFn("neutraali")} text="Neutraali" />
          <Button handleClick={() => this.updateFn("huono")} text="Huono" />
        </div>
        <Statistics state={this.state} />
      </div>
    )
  }
}

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Statistic = ({name, data, unit}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{data}{unit}</td>
    </tr>
  )
}

const Statistics = ({state}) => {

  const palautteitaLkm = () => state.hyva + state.neutraali + state.huono
  const keskiarvo = () => (state.hyva - state.huono) / (palautteitaLkm() === 0 ? 1 : palautteitaLkm())
  const positiivisiaLkm = () => state.hyva / (palautteitaLkm() === 0 ? 1 : palautteitaLkm())

  return (
    <div>
      <h2>Statistiikka</h2>

      {palautteitaLkm() === 0 && <p>Ei yhtään palautetta annettu</p>}
      {palautteitaLkm() > 0 &&
        <div>
          <table>
            <tbody>
              <Statistic name="Hyvä" data={state.hyva} />
              <Statistic name="Neutraali" data={state.neutraali} />
              <Statistic name="Huono" data={state.huono} />
              <Statistic name="Keskiarvo" data={keskiarvo()} />
              <Statistic name="Positiivisia" data={positiivisiaLkm() * 100} unit=" %" />
            </tbody>
          </table>
        </div>
      }
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
