import React from "react";
import { Card, Button } from "semantic-ui-react";

const MovieCard = props => {
  console.log("PROPS", props);
  return (
    <div>
      <Card
        image={`http://image.tmdb.org/t/p/w185/${props.movie.poster_path}`}
        header={props.movie.title}
        description={props.movie.overview}
        extra={props.movie.vote_avrage}
      />
      <Button basic color="red" onClick={props.handleClick}>
        FIND DIFERENT MOVIE{" "}
      </Button>
    </div>
  );
};

export default MovieCard;

//{props.movie.posterPath}
