import React, { Component } from "react";
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
    all_articles : [],
    article : new Object,
    articleId : 0,
    totalArticles : 0,
    secondsRemaining : 10
  };

  constructor(props) {
    super(props);
    this.handleLoop = this.handleLoop.bind(this);
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

    // Use the number to fetch all the articles
    for( var i = 1; i <= this.state.totalArticles; ++i ) {
      const response = await contract.methods.articles(i).call();

      // Update state with the result
      this.setState( {
        all_articles: [...this.state.all_articles, response]
      });

      // Set the latest article
      if( i == this.state.totalArticles ) {
        this.setState( {
          article: response,
          articleId : this.state.totalArticles
        });
      }
    }

    // Create the loop
    this.loop = setInterval(() => this.handleLoop(), 10000);
  };

  handleLoop() {
    var newSeconds = this.state.secondsRemaining - 1;

    if( newSeconds == 0 ) {
      // Go to the previous index
      var currentIndex = this.state.articleId - 1;
      var newIndex = currentIndex - 1;

      // Check if all is well, then set the state
      if( newIndex < 0 ) {
        // Set to the latest index
        newIndex = this.state.totalArticles - 1;
      }

      // Now set state with new index
      this.setState( {
        article: this.state.all_articles[newIndex],
        articleId: newIndex,
        secondsRemaining : 10
      })
    }else {
      this.setState({
        secondsRemaining: newSeconds
      });
    }
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <Navbar />
        <Main article={this.state.article} secondsRemaining={this.state.secondsRemaining} />
        <Footer />
      </div>
    );
  }
}

export default App;
