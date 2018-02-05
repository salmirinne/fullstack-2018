import React from 'react';

class FilterForm extends React.Component {
  render() {
    return (
      <div>
        Rajaa näytettäviä:
          <input 
            value={this.props.value}
            onChange={this.props.filterChanged}
          />
      </div>
    )
  }
}

export default FilterForm