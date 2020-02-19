import React, { Component } from "react";
import ArticlesContract from "../contracts/Articles.json";
import getWeb3 from "../getWeb3";
import Navbar from "../Navbar"
import Footer from "../Footer";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class Tomorrow extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            storageValue: 0, 
            web3: null, 
            accounts: null, 
            contract: null,
            articleContent : null,
            articleLength : 0,
            wordCountMsg : "0 / 4000"
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getDate = this.getDate.bind(this);
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
            this.setState({ web3, accounts, contract: instance });
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
    };

    handleSubmit = async(event) => {
        event.preventDefault();
        const data = new FormData(event.target);
    
        // Now with the data, we create a new article
        const { accounts, contract, articleContent } = this.state;
        await contract.methods.createArticle( 
          data.get('authorName'),
          data.get('articleTitle'),
          articleContent,
          this.getDate()
        ).send( {from: accounts[0]});
    
        // Go to the home page
        this.props.history.push("/");
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
        return(
            <div>
                <Navbar />
                <div class="row justify-content-center text-center mb-4" style={{ marginTop : "150px" }}>
                    <div class="col-5" id="tomorrow">
                        <h1>Write tomorrow's article</h1>
                        <p>and join the <strong>trueKenyan family</strong></p>
                    </div>
                    <br />
                    <div class="col-10">
                        <p>
                            <form onSubmit={this.handleSubmit}>
                                <input class="form-control" name="authorName" type="text" placeholder="Enter author name..."  required />
                                <br />
                                <input class="form-control" name="articleTitle" type="text" placeholder="Enter article title..."  required />
                                <br />
                                <CKEditor
                                    editor={ ClassicEditor }
                                    data="<p>Enter your article here...</p>"
                                    name="articleContent"
                                    onInit={ editor => {
                                        // You can store the "editor" and use when it is needed.
                                        console.log( 'Editor is ready to use!', editor );
                                    } }
                                    onChange={ ( event, editor ) => {
                                        const data = editor.getData();
                                        this.setState( {
                                            articleContent :data,
                                            articleLength : data.length
                                        } );
                                        // Check wordcount
                                        if( this.state.articleLength <= 4000 ) {
                                            this.setState({ wordCountMsg: this.state.articleLength + " / 4000"  });
                                        }else {
                                            this.setState({ wordCountMsg: "Please reduce words to a max of 4000" });
                                        }
                                        console.log( { event, editor, data } );
                                    } }
                                    onBlur={ ( event, editor ) => {
                                        console.log( 'Blur.', editor );
                                    } }
                                    onFocus={ ( event, editor ) => {
                                        console.log( 'Focus.', editor );
                                    } }
                                />
                                <br />
                                <p>
                                    Word count : {this.state.wordCountMsg}
                                </p>
                                <button class="form-control" type="submit">
                                    Submit
                                </button>
                            </form>    
                        </p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Tomorrow;