import React, { Component } from "react";

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="site-section">
                <div class="container">
                    {
                        this.props.article.map((article, key) => {
                            return (
                                <div class="row justify-content-center text-center mb-4">
                                    <div class="col-5">
                                        <h1>{article.articleTitle}</h1>
                                        <p>by <strong>{article.authorName}</strong> at <strong>{article.dateCreated}</strong></p>
                                    </div>
                                    <div class="row justify-content-center text-center mb-4">
                                        <div class="col-10">
                                            <hr />
                                            <p>
                                                {article.articleContent}    
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Main;