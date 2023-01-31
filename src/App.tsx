import React from 'react';
import logo from './logo.svg';
import './App.css';

interface Csavar {
  id : number,
  tipus : string,
  hossz : number,
  keszlet : number,
  ar : number,
}

interface CsavarResponse {
  csavarok : Csavar[]
}

class App extends React.Component<{}, State> {
  constructor(props : {}) {
    super(props)

    
  }

  loadData = async () => {
    let response = await fetch("http://localhost:3000/csavar") 
    let data = await response.json() as CsavarResponse
    this.setState({
      csavarok : data.csavarok
    })
   }
   componentDidMount(): void {
     this.loadData()
   }

  deleteFromDatabase = async (id : number)  => {
    await fetch('http://localhost:3000/csavar/'+ id, {
      method : 'DELETE'
    })
    this.loadData()
  }




  render() {

    return <div>
      <div className='row'>
        {this.state.csavarok.map(csavar => (
          <div className='col-md-4'>
            <div className='card text-center'>
              <div className='card-body'>
                  Tipus: {csavar.tipus} <br />
                  Hossz: {csavar.hossz} mm <br />
                  Készlet : {csavar.keszlet} db <br />
                  Ár: {csavar.ar} $
              </div>
              <div className='card-footer'>
                <button onClick={(event) => this.deleteFromDatabase(csavar.id)}>Törlés</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      

    </div>
  }
}

export default App;
