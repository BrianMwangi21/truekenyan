import React, { Component } from "react";
import { Link } from 'react-router-dom';

class NavBar extends Component {
    render() {
        return (
            <nav class="navbar navbar-light custom-navbar">
                <div class="container">
                    <a class="navbar-brand" href="/">trueKenyan | for the people, by the people</a>
                    <div class="col-md-12 col-lg-6 text-left text-lg-right">
                        <div id="filters" class="filters">
                            <Link to="/tomorrow">Write tomorrow's article</Link>
                        </div>
                    </div>
                </div>
            </nav>
        );
    };
}

export default NavBar;
