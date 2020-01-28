import React, { Component } from "react";

class NavBar extends Component {
    render() {
        return (
            <nav class="navbar navbar-light custom-navbar">
                <div class="container">
                    <a class="navbar-brand" href="index.html">trueKenyan | for the people, by the people</a>
                    <div class="col-md-12 col-lg-6 text-left text-lg-right">
                        <div id="filters" class="filters">
                            <a href="#" data-filter="*" class="active">Write tomorrow's article</a>
                        </div>
                    </div>
                </div>
            </nav>
        );
    };
}

export default NavBar;
