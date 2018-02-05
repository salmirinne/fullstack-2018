import React from 'react'

const Kurssi = ({kurssi}) => {
  
  const osat = () => kurssi.osat.map(osa => <li key={osa.id}>{osa.nimi} {osa.tehtavia}</li>)

  const tehtavia = () => kurssi.osat.reduce((a, b) => a + b.tehtavia, 0)

  return (
    <div>
      <h2>{kurssi.nimi}</h2>
      <ul>
        {osat()}
      </ul>
      <p>Yhteensä {tehtavia()} tehtävää</p>
    </div>
  )
}

export default Kurssi