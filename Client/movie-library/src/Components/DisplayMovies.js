import React, { Component } from 'react';
import axios from 'axios';
import { isLogicalExpression } from '@babel/types';

class DisplayMovies extends Component {
    constructor(props) {
        super(props)

        this.state = {
            movies: [],
            isloaded: false
        }
    }

    componentDidMount(){
        let endpoint = "https://localhost:44367/api/movie";

        axios.get(endpoint)
        .then(response => this.setState({ movies: response.data }))
        .catch(error => console.log(error))
    }

    render() {
        const { movies } = this.state;

        return(
            <div> <h3>Movies</h3> </div>
        )
    }


}

export default DisplayMovies