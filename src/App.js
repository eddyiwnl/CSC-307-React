import React, { Component } from 'react'
import Table from './Table'
import Form from './Form';
import axios from 'axios';


class App extends Component {
    componentDidMount() {
      axios.get('http://localhost:5000/users').then(res=> {
        const characters = res.data.users_list;
        this.setState({characters});
      })
      .catch(function (error) {
        //Not handling the error. Just logging into the console.
        console.log(error);
      });
    }
    state = {
      characters: [],
    }
    removeCharacter = index => {
      return axios.delete('http://localhost:5000/users', {data: this.state.characters[index]})
      .then(res => {
        const { characters } = this.state
        this.setState({
          characters: characters.filter((_character, i) => {
            return i !== index
          })
        })
      })  
      .catch(function (error) {
        console.log(error);
        return false;
      });
    }
    //ORIGINAL (frontend only) BELOW
    // removeCharacter = index => {
    //   const { characters } = this.state
    
    //   this.setState({
    //     characters: characters.filter((character, i) => {
    //       return i !== index
    //     }),
    //   })
    // }
    
    handleSubmit = character => {
      this.makePostCall(character).then( callResult => {
        if (callResult !== false && callResult.status === 201) {
           character = callResult.data
           this.setState({ characters: [...this.state.characters, character] });
        }
     });
    }

    makePostCall(character){
      return axios.post('http://localhost:5000/users', character)
       .then(function (response) {
         console.log(response); 
         return response;
       })
       .catch(function (error) {
         console.log(error);
         return false;
       });
    }
    render() {
      const { characters } = this.state
    
      return (
        <div className="container">
          <Table characterData={characters} removeCharacter={this.removeCharacter} />
          <Form handleSubmit={this.handleSubmit} />


        </div>

      )
      
    }
  }




export default App