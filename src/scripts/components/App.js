import React, { Component } from "react";
import Router from 'comp/Router';

import httpXHR from 'lib/httpXHR';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        
    }

    componentWillMount() {
        
    }
    render() {
        return (
            <Router />
        )
    }
}

export default App;