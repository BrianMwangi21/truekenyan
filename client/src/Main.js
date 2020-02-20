import React, { Component } from "react";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

class Main extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div class="site-section">
                <div class="container">
                    <div>
                        <div class="row justify-content-center text-center mb-4">
                            <div class="col-5">
                                <h1>{this.props.article.articleTitle}</h1>
                                <p>by <strong>{this.props.article.authorName}</strong> at <strong>{this.props.article.dateCreated}</strong></p>
                            </div>
                        </div>
                        <div class="row justify-content-center mb-4">
                                <div class="col-10">
                                    <hr />
                                        { ReactHtmlParser(this.props.article.articleContent) }
                                    <hr />
                                </div>
                                <div class="col-10">
                                    {this.props.secondsRemaining} <strong>"natoka saa hizi" seconds</strong> left before next article
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;