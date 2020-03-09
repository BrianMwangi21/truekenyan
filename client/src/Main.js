import React, { Component } from "react";
import ReactHtmlParser from 'react-html-parser';
import Masonry from "react-masonry-css";
import Card from 'react-bootstrap/Card';
import "./App.css";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breakpointColumnsObj: {
                default: 3,
            }
        };
    }

    render() {
        const articles = this.props.all_articles.map((article, index) => {
            return (
                <Card key={index}>
                    <Card.Title style={{ "margin": "20px" }}>
                        <h2>{article.articleTitle}</h2>
                    </Card.Title>
                    <Card.Text style={{ "marginLeft": "20px", "marginRight": "20px", "marginBottom": "20px", "marginTop": "0px" }}>
                        <hr />
                        {ReactHtmlParser(article.articleContent)}
                    </Card.Text>
                    <Card.Footer>
                        <p>by <strong>{article.authorName}</strong> at <strong>{article.dateCreated}</strong></p>
                    </Card.Footer>
                </Card>
            )
        });

        return (
            <div class="site-section"  style={{"padding":"10px"}}>
                <div class="container">
                    <Masonry
                        breakpointCols={this.state.breakpointColumnsObj}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column" >

                        {articles}

                    </Masonry>
                </div>
            </div>
        );
    }
}

export default Main;