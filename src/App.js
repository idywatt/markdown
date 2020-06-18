import React, { Component } from 'react'
import './App.css'
import {sampleText} from './sampleText'
import marked from 'marked'


class App extends Component {
  state = {
    text: sampleText,
  }

  //Pour avoir le text après avoir réinitialisé la page
  componentDidMount() {              
    const text = localStorage.getItem('text')

    if(text){
      this.setState({text})   //Il doit afficher le dernier texte sauvegardé 
    } else {
      this.setState({text: sampleText}) // Sinon il affiche sampletext(text préenregistré du tout début)
    }
  }

  //Pour sauvegarder en direct en local
  componentDidUpdate() {
    const {text} = this.state
    localStorage.setItem('text', text)
  }

  handleChange = event => {
    const text = event.target.value
    this.setState({ text })
  }

  renderText = text => {
    const __html = marked(text, {sanitize:true})
    return {__html}
  };

  render () {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <textarea 
            onChange = {this.handleChange}
            value={this.state.text} 
            className='form-control'
            style={this.state.textareaColor}
            rows='35' />
          </div>
          <div className="col-sm-6">
            <div dangerouslySetInnerHTML={this.renderText(this.state.text)} />     
          </div>
        </div>
      </div>
    )
  }
}

export default App
