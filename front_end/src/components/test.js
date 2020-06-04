import React, { Component } from 'react'

export default class test extends Component {
    constructor(props) {
        super(props);
        this.state={
            CIN:[]
        }
    
    }

    onChangeCIN=(e,index)=>{
        this.state.CIN[index]=e.target.value
        this.setState({
          CIN:this.state.CIN
        })
      }
    
      addPlayer=(e)=>{
        e.preventDefault();
        this.setState({
          CIN:[...this.state.CIN,""]
        })
      }
    
      addPlayers=(e)=>{
        e.preventDefault();
        const CIN=this.state.CIN
        axios.post('http://localhost:9017/equipes/addplayer/5ea228ffe58c8e2b4475288e',CIN)
        .then(res=>{
        console.log(res.data)
    
        })
      }
      render() {
        return (
          <div>
            <form onSubmit={this.addPlayers}>
              {this.state.CIN.map((player,index)=>{
                return (
                <div key={index}>
                <input type="text"className="bg-danger" /**/ value={player} onChange={(e)=>this.onChangeCIN(e,index)} />
                </div>
               ) })
              }
    
              <button onClick={this.addPlayer} className="btn1" >Zid</button><br></br>
              <input type="submit" className="btn1"  />
            </form>
          </div>
        );
     
    }
}
