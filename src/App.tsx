import React from 'react';
import './App.css';

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';

interface State {
  date: Date,
  parent: string,
  future?: string
}

class App extends React.Component<{}, State> {

  constructor(props : {}) {
    super(props);
    this.state = {
      date: new Date(),
      parent: "me",
      future: "me"
    };

    this.calculate = this.calculate.bind(this)
    this.updateDate = this.updateDate.bind(this)
  }
  
  calculate() {
    console.log("calculating")
    let diff = Math.abs(new Date().getTime() - this.state.date.getTime())

    console.log(this.state.date)

    let diffInWeeks = Math.floor(diff / 1000 / 60 / 60 / 24 / 7);

    console.log(diff / 1000 / 60 / 60 / 24 / 7)

    if (diffInWeeks % 2 === 0) {
      this.setState({
        future: this.state.parent
      })
    } else {
      this.setState({
        future: this.state.parent === "me" ? "ex" : "me"
      })
    }

  }

  updateDate(date: Date) {
    console.log(date)
    this.setState({
      date
    }, () => this.calculate())

    
  }

  updateParent(parent: string) {
    this.setState({
      parent
    }, () => this.calculate())
  }

  render() {

    const hasFuture = this.state.future !== undefined;

    return (
      <div className="App">
        <header className="App-header">
          <img src="baby.jpg" className="App-logo" alt="logo" />
          <h1> Efo Yeled </h1>
        </header>
          <div className="App-body">
            <p>This weekend, kids are with:</p>
            <label>
            <input 
              type="radio" 
              name="kids" 
              value="me" 
              checked={this.state.parent === "me"}
              onChange={(e) => this.updateParent(e.target.value)} />
              me
            </label>
            <label>
              <input 
              type="radio" 
              name="kids" 
              value="ex" 
              checked={this.state.parent === "ex"}
              onChange={(e) => this.updateParent(e.target.value)}/>
              my ex
            </label>
            <p> Pick the weekend you're curious about:</p>
            <DayPicker 
              mode="single" 
              required 
              defaultSelected={this.state.date}
              onSelect={(e) => this.updateDate(e!)}
              footer={`On ${this.state.date.toDateString()}, the kids are with ${this.state.future}`} />
            Image by <a href="https://pixabay.com/users/esudroff-627167/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1399332">esudroff</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1399332">Pixabay</a>
          </div>
        
      </div>
    );
  }
}

export default App;
