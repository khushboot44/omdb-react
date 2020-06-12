import React, { Component } from "react";
import { Button, Pagination } from "antd";

class ResultList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minValue: 0,
      maxValue: 3
    };
  }

  handleChange = value => {
    console.log("value :>> ", value);
    console.log("start value", (value - 1) * 3);
    console.log("end value", value * 3);

    this.setState({
      minValue: (value - 1) * 3,
      maxValue: value * 3
    });
  };

  render() {
    console.log("minValue :>> ", this.state.minValue);
    console.log("maxValue :>> ", this.state.maxValue);

    console.log("===================");

    if (
      this.props.movieList &&
      this.props.movieList.isLoading &&
      this.props.movieList.isLoading === true
    ) {
      return <div>Loading.....</div>;
    }

    if (
      this.props.movieList &&
      this.props.movieList.data &&
      Array.isArray(this.props.movieList.data) &&
      this.props.movieList.data.length > 0
    ) {
      return (
        <div>
          <Pagination
            style={{ marginBottom: "1rem", marginTop: "1rem" }}
            defaultCurrent={1}
            defaultPageSize={3}
            onChange={this.handleChange}
            total={
              this.props.movieList.data &&
              Array.isArray(this.props.movieList.data)
                ? this.props.movieList.data.length
                : 0
            }
          />

          {this.props.movieList.data
            .slice(this.state.minValue, this.state.maxValue)
            .map((movie, index) => (
              <ul className="container-heading">
                <li>
                  <img src={movie.Poster} className="imageResult" />
                </li>
                <li key={index}>{movie.Title}</li>
                {this.props.showDetails && (
                  <li>
                    <Button
                      type="primary"
                      onClick={() => {
                        this.props.showMoreDetails(movie.imdbID);
                      }}
                    >
                      more info
                    </Button>
                  </li>
                )}
              </ul>
            ))}
        </div>
      );
    }

    return null;
  }
}

export default ResultList;
