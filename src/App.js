import { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      trainingTemplates: [],
      searchField: ''
    };
  }

  componentDidMount() {
    fetch('http://localhost:8080/template/training-session')
      .then(responce => responce.json())
      .then(templates => this.setState(() => {
        return { trainingTemplates: templates }
      }));
  }

  render() {
    const filteredList = this.state.trainingTemplates.filter((template) => {
      return template.name.toLocaleLowerCase().includes(this.state.searchField)});

    return (
      <div className="App">
        <input className='search-template' type='search' placeholder='Search template'
          onChange={(event) => {
            this.setState({searchField: event.target.value.toLocaleLowerCase()})}}/>
        {filteredList.map(trainingTemplate => {
          return <div key={trainingTemplate.id}>
            <h1>{trainingTemplate.name}</h1>
          </div>
        })}
      </div>
    );
  }

}

export default App;
