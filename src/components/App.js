import { Tabs, Tab } from 'react-bootstrap'
import dBank from '../abis/dBank.json'
import React, { Component } from 'react';
import Token from '../abis/Token.json'
import dbank from '../dbank.png';
import Web3 from 'web3';
import './App.css';

//h0m3w0rk - add new tab to check accrued interest

class App extends Component {

  async componentWillMount() {
    await this.loadBlockchainData(this.props.dispatch)
  }

  async loadBlockchainData(dispatch) {

      if(typeof window.ethereum !=='undefined'){

      const web3 = new Web3(window.ethereum);
      const netId = await web3.eth.net.getId();
      await window.ethereum.enable();
      const accounts = await web3.eth.getAccounts();
     
      

      if(typeof accounts[0] !=='undefined'){
      const balance = await web3.eth.getBalance(accounts[0]);
      this.setState({account:accounts[0], balance: balance, web3: web3});
      }

     else{
        window.alert('please login with metamask');
        
      }
      console.log(dBank.abi);
      try {
      
      const token = new web3.eth.Contract(Token.abi,Token.networks[netId].address);
      const dbank = new web3.eth.Contract(dBank.abi,dBank.abi.networks[netId].address);
      
     
      const dBankAddress = dbank.networks[netId].address;
      
      this.setState({token: token, dbank: dbank, dBankAddress: dBankAddress});
      
      }

      catch(err){
        console.log('error',err);
        window.alert('contracts not deployed to the current network')
      }

    }
    
    else{
      window.alert('please install metamask');
    }
  

  }

  async deposit(amount) {
    //check if this.state.dbank is ok
      //in try block call dBank deposit();
  }

  async withdraw(e) {
    //prevent button from default click
    //check if this.state.dbank is ok
    //in try block call dBank withdraw();
  }

  constructor(props) {
    super(props)
    this.state = {
      web3: 'undefined',
      account: '',
      token: null,
      dbank: null,
      balance: 0,
      dBankAddress: null
    }
  }

  render() {
    return (
      <div className='text-monospace'>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
        <img src={dbank} className="App-logo" alt="logo" height="32"/>
          <b>dBank</b>
        </a>
        </nav>
        <div className="container-fluid mt-5 text-center">
        <br></br>
          <h1>{/*add welcome msg*/}</h1>
          <h2>{/*add user address*/}</h2>
          <br></br>
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
              <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                {/*add Tab deposit*/}
                {/*add Tab withdraw*/}
              </Tabs>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;