import React, { Component } from "react";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleContent : null,
            articleLength : 0,
            wordCountMsg : "0 / 4000"
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = async(event) => {
        // Go abroad 
        this.props.handleSubmit(event, this.state.articleContent);
    }
    
    render() {
        return (
            <div class="site-section">
                <div class="container">
                    {
                        this.props.article.map((article, key) => {
                            return (
                                <div>
                                    <div class="row justify-content-center text-center mb-4">
                                        <div class="col-5">
                                            <h1>{article.articleTitle}</h1>
                                            <p>by <strong>{article.authorName}</strong> at <strong>{article.dateCreated}</strong></p>
                                        </div>
                                    </div>
                                    <div class="row justify-content-center mb-4">
                                            <div class="col-10">
                                                <hr />
                                                    { ReactHtmlParser(article.articleContent) }
                                                <hr />
                                            </div>
                                    </div>
                                </div>
                            )
                        })
                    }

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
                </div>
            </div>
        );
    }
}

export default Main;