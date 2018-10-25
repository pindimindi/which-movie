import React, { Component } from "react";
import "./App.css";
import { Button } from "semantic-ui-react";
import axios from "axios";
import MovieCard from "./MovieCard";

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      genre: 14,
      resultMovie: {},
      renderMovie: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async handleChange(event) {
    try {
      const genreId = Number(event.currentTarget.value);
      const movies = await axios.get(
        ` https://api.themoviedb.org/3/discover/movie?api_key=28b53d1d0166962222bc41349db23016&language=en-US&sort_by=popularity.desc&certification_country=US&include_adult=false&include_video=false&page=2&with_genres=${genreId}&year=2012`
      );
      this.setState({
        movies: movies.data.results
      });
      localStorage.setItem("genreMovies", JSON.stringify(movies.data.results));
    } catch (err) {
      this.setState({
        movies: JSON.parse(localStorage.getItem("genreMovies"))
      });
    }
  }

  async handleClick() {
    let resultMovie = this.state.movies[
      Math.floor(Math.random() * this.state.movies.length)
    ];
    this.setState({
      resultMovie,
      renderMovie: true
    });
    console.log("RESULT MOVIE", resultMovie);
  }

  async componentDidMount() {}

  render() {
    if (this.state.renderMovie) {
      return (
        <MovieCard
          movie={this.state.resultMovie}
          style={styles.movieCard}
          handleClick={this.handleClick}
        />
      );
    }
    return (
      <div>
        {/* <Container style={styles.buttonGroup}> */}
        <Button.Group vertical basic color="green">
          <Button value="28" onClick={this.handleChange}>
            Action
          </Button>
          <Button value="12" onClick={this.handleChange}>
            Adventure
          </Button>
          <Button value="80" onClick={this.handleChange}>
            Crime
          </Button>
          <Button value="18" onClick={this.handleChange}>
            Drama
          </Button>
          <Button value="14" onClick={this.handleChange}>
            Fantasy
          </Button>
          <Button value="35" onClick={this.handleChange}>
            Comedy
          </Button>
          <Button value="10749" onClick={this.handleChange}>
            Romance
          </Button>
          <Button value="99" onClick={this.handleChange}>
            Documentary
          </Button>
        </Button.Group>
        {/* </Container> */}
        <div>
          <Button
            onClick={this.handleClick}
            style={styles.button}
            basic
            color="red"
          >
            FIND MOVIE
          </Button>
        </div>
      </div>
    );
  }
}

const styles = {
  button: {
    marginTop: 40
  },
  buttonGroup: {
    margin: "none"
  },
  movieCard: {
    display: "flex"
  }
};

export default App;
// background image
// https://images.discerningassets.com/image/upload/c_fit,h_600,w_600/v1509980280/The_Godfather_upscaled_pdtwxx.jpg
