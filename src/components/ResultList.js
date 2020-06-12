import React from 'react';
import { Button } from 'antd';

export default function ResultList(props) {

    if (props.movieList
        && props.movieList.isLoading
        && props.movieList.isLoading === true) {
        return (<div>Loading.....</div>)
    }

    if (props.movieList && props.movieList.data && Array.isArray(props.movieList.data)) {
        return (
            <div>
                {props.movieList.data.map((movie, index) => (
                    <ul className="container-heading">
                        <li>
                            <img src={movie.Poster} className="imageResult" />
                        </li>
                        <li key={index}>{movie.Title}</li>
                        {
                            props.showDetails && (
                                <li>
                                    <Button type="primary" onClick={() => { props.showMoreDetails(movie.imdbID) }}>more info</Button>
                                </li>
                            )
                        }
                    </ul>
                ))}
            </div>
        )
    }

    return null;
}