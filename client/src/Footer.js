import React, { Component } from "react";

class Footer extends Component {
    render() {
        return (
            <footer class="footer" role="contentinfo">
                <div class="container">
                <div class="row">
                    <div class="col-sm-12" style={{"textAlign":"center"}}>
                        <p class="mb-1">&copy; Copyright trueKenyan. All Rights Reserved</p>
                    </div>
                </div>
                </div>
            </footer>
        );
    };
}

export default Footer;