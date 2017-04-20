import React from 'react';

class AddTour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityData: [],
      tourData: [],
      //form field states
      tourName: '',
      tourImg: '',
      tourDesc: '',
      tourCity: 'City'
    }

    //METHOD BINDINGS
    this.nameForm = this.nameForm.bind(this);
    this.imageForm = this.imageForm.bind(this);
    this.descForm = this.descForm.bind(this);
    this.cityForm = this.cityForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.processData = this.processData.bind(this);
  }

  //FORM CONTROLS
  nameForm(e) {
    this.setState({ tourName: e.target.value });
  }
  imageForm(e) {
    this.setState({ tourImg: e.target.value });
  }
  descForm(e) {
    this.setState({ tourDesc: e.target.value });
  }
  cityForm(e) {
    this.setState({ tourCity: e.target.value })
  }

  handleSubmit(e) {
    console.log('Data:', this.state);
    e.preventDefault();
  }

  //To filter the tourData array for a desired city value
  processData(array, key, val) { //takes and array, a key (as string), and value
    return array.filter((obj) => {
      return obj[key] === val;
    });
  } 

  //INITIAL DATA FETCH
  componentWillMount() {
    //get the current city list
    fetch('https://savi-travel.com:8082/api/cities', {mode: 'no-cors'})
      .then(resp => resp.json())
      .then(data => this.setState({cityData: data}))
      .catch(err => console.error(err));
    //get the current tour list
    fetch('https://savi-travel.com:8082/api/tours', {mode: 'no-cors'})
      .then(resp => resp.json())
      .then(data => this.setState({tourData: data}))
      .catch(err => console.error(err));
  }

  render() {
    const cityMenu = (item, i) => <option key={i} value={item.id}>{item.name}</option>;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            City:
            <select onChange={e => this.setState({ e.target.value })}
              value={this.state.tourCity}
            >
              {this.state.cityData.map(cityMenu)}
            </select>
            <h1>{this.state.tourCity}</h1>
          </label>

          <label>
            Tour:
            <input type="text" value={this.state.tourName} onChange={this.nameForm} />           
          </label>

          <label>
            Image:
            <input type="text" value={this.state.tourImg} onChange={this.imageForm} />           
          </label>

          <label>
            Description:
            <input type="text" value={this.state.tourDesc} onChange={this.descForm} />           
          </label>   

          <input type="submit" value="Add" />
        </form>

        <hr/>

        <h2>Available Tours</h2>

        <div>
          {this.state.cityData.map((item, i) => {
            return (
              <div key={i}>
              <h3>{item.name}</h3>
              {this.processData(this.state.tourData, 'cityId', item.id).map((item, i) => {
                return (
                  <div key={i}>
                    {item.title}
                  </div>
                )
              })}                
              </div>
            )
          })}                   
        </div>

      </div>
    )
  }
}

module.exports = AddTour;