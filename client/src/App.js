import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import ArticlesContract from "./contracts/Articles.json";
import getWeb3 from "./getWeb3";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Main from "./Main";

import "./App.css";

class App extends Component {
  state = { 
    storageValue: 0, 
    web3: null, 
    accounts: null, 
    contract: null,
    article : [] };

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
      this.setState({ web3, accounts, contract: instance }, this.getLatestArticle);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  getLatestArticle = async () => {
    const { contract } = this.state;

    // Get the number of articles stored
    const totalArticles = await contract.methods.articlesCount().call();

    // Use the number to fetch the latest article
    const response = await contract.methods.articles(totalArticles).call();

    // Update state with the result
    this.setState( {
      article: [...this.state.article, response]
    });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <Navbar />
        <Main article={this.state.article} />
        <Footer />
      </div>
    );
  }
}

export default App;