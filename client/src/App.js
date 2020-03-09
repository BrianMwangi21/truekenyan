import React, { Component } from "react";
import ArticlesContract from "./contracts/Articles.json";
import getWeb3 from "./getWeb3";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Main from "./Main";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      storageValue: 0, 
      web3: null, 
      accounts: null, 
      contract: null,
      all_articles : [],
    };
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = ArticlesContract.networks[networkId];
      const instance = new web3.eth.Contract(
        ArticlesContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.getArticles);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  getArticles = async() => {
    const { contract } = this.state;

    // Get the number of articles stored
    this.setState( {
      totalArticles : await contract.methods.articlesCount().call() 
    });

    // Use the number to fetch all the articles, in reverse
    for( var i = this.state.totalArticles; i >= 1 ; --i ) {
      const response = await contract.methods.articles(i).call();

      // Update state with the result
      this.setState( {
        all_articles: [...this.state.all_articles, response]
      });
    }
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading...</div>;
    }
    return (
      <div className="App">
        <Navbar />
        <Main all_articles={this.state.all_articles} />
        <Footer />
      </div>
    );
  }
}

export default App;
