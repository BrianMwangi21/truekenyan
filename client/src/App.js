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
    all_articles : [],
    article : new Object,
    articleId : 0,
    totalArticles : 0
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getDate = this.getDate.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
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

    // Log all the articles
    console.log(this.state.all_articles)
  };

  handlePreviousClick = async(event) => {
    event.preventDefault();

    // Clear article array
    this.setState({
      article : new Object,
      articleId : 0
    });

    // Get the previous article
    const previousId = this.state.articleId - 1;

    if( previousId < 1 ) {
      previousId = 1;
    }

    // Send previous id
    this.setState( {
      article: this.state.all_articles[previousId],
      articleId : previousId
    });
  };

  handleNextClick = async(event) => {
    event.preventDefault();

    // Clear article array
    this.setState({
      article : new Object,
      articleId : 0
    });

    // Get the previous article
    const nextId = this.state.articleId + 1;

    if( nextId > this.state.totalArticles ) {
      nextId = this.state.totalArticles;
    }

    // Send next id
    this.setState( {
      article: this.state.all_articles[nextId],
      articleId : this.state.totalArticles
    });
  };

  handleSubmit = async(event, articleContent) => {
    event.preventDefault();
    const data = new FormData(event.target);

    // Now with the data, we create a new article
    const { accounts, contract } = this.state;
    await contract.methods.createArticle( 
      data.get('authorName'),
      data.get('articleTitle'),
      articleContent,
      this.getDate()
    ).send( {from: accounts[0]});

    // Load the data again
    this.getArticles();
  };

  getDate() {
    const newDate = new Date();
    const date = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    const hours = newDate.getHours();
    const minute = newDate.getMinutes();
    const seconds = newDate.getSeconds();

    const timestamp = date + "/" + month + "/" + year + " " + hours + ":" + minute + ":" + seconds;

    return timestamp;
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <Navbar />
        <Main article={this.state.article} handleSubmit={this.handleSubmit}
          handleNext={this.state.handleNextClick}
          handlePrevious={this.state.handlePreviousClick} />
        <Footer />
      </div>
    );
  }
}

export default App;
