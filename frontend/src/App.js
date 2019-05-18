import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
const list = 
[
{"id":1,"subclass":{"id":20,"app_label":"dataportal","model":"masscytometrystudy"},"institution":{"id":2,"name":"Vanderbilt"},"data_type":{"id":1,"name":"sc-proteomics"},"tissue":{"id":1,"name":"Brain"},"creation_time":"2019-05-08T19:57:27.788661Z"},
{"id":2,"subclass":{"id":22,"app_label":"dataportal","model":"scrnaseqstudybarcoded"},"institution":{"id":3,"name":"Havard"},"data_type":{"id":3,"name":"scrna-seq"},"tissue":{"id":1,"name":"Brain"},"creation_time":"2019-05-08T20:00:09.011638Z"},
{"id":3,"subclass":{"id":16,"app_label":"dataportal","model":"scrnaseqstudycdna"},"institution":{"id":2,"name":"Vanderbilt"},"data_type":{"id":2,"name":"scdna-seq"},"tissue":{"id":1,"name":"Brain"},"creation_time":"2019-05-08T20:19:05.059603Z"}];

class App extends Component {
  state = {
    studies: []
  };
  
   async componentDidMount() {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/');
      const studies = await res.json();
      this.setState({
        studies
      });
    } catch (e) {
      console.log(e);
    }
  }

 render() {
    return (
      <div>
        {this.state.studies.map(item => (
          <div key={item.subclass.model}>
            <h1>{item.id}</h1>
            <span>{item.institution.name}</span>,
			<span>{item.tissue.name}</span>, 
			<span>{item.data_type.name}</span> 
          </div>
        ))}
      </div>
    );
  }
}

export default App;