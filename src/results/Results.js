import React from "react";
import axios from "axios";
import ResultItem from "./ResultItem";
import Alert from "../app/Alert";
import "./styles.css";
import reducer from "./reducer";
import { RESULTS_FETCH_INIT, RESULTS_FETCH_SUCCESS, RESULTS_FETCH_FAILURE } from "./actions";
import Empty from "../images/empty.jpg";

// Initial State
const initialState = {
    data: [],
    isLoading: false,
    error: null
}

// API Configuration
const API_ENDPOINT = "https://api.themoviedb.org/3/search/multi";
const API_KEY = "f4d99b3567fb217391c6e1132d107acb";

function capitalize(string) {
    return `${string[0].toUpperCase()}${string.slice(1)}`;
}

const Results = ({ match }) => {
    const [results, dispatchResults] = React.useReducer(reducer, initialState);

    const searchTerm = capitalize(match.params.searchTerm);

    React.useEffect(() => {
        dispatchResults({
            type: RESULTS_FETCH_INIT
        })

        axios.get(API_ENDPOINT, {
            params: {
                api_key: API_KEY,
                query: searchTerm
            }
        })
            .then(function (res) {
                dispatchResults({
                    type: RESULTS_FETCH_SUCCESS,
                    data: res.data.results
                })
                // console.log(res.data.results);
            })
            .catch(function (err) {
                dispatchResults({
                    type: RESULTS_FETCH_FAILURE,
                    error: "Something went wrong!"
                })
            })
    }, []);

    return (
        <div className="container-fluid results-screen">
            <div className="container w-75 py-5">
                <h1>{searchTerm}</h1>
                {
                    results.isLoading &&
                    <div class="d-flex align-items-center mt-4">
                        Loading...
                        <div class="spinner-border text-primary ms-auto" role="status" aria-hidden="true"></div>
                    </div>
                }
                {
                    results.error && <Alert
                        message={results.error}
                        dismissible
                    />
                }
                {
                    (!results.isLoading && (results.data === undefined || results.data.length == 0)) &&
                    <div className="container text-center mt-5">
                        <p>Oops, there are no results that matched your query!</p>
                        <img src={Empty} alt="No results" className="w-50" />
                    </div>
                }
                {
                    results.data.map(result => <ResultItem
                        key={result.id}
                        id={result.id}
                        mediaType={(result["media_type"] === "person") ? result["known_for_department"] : result["media_type"]}
                        name={(result["media_type"] === "movie") ? result["original_title"] : result.name}
                        poster={(result["media_type"] === "person") ? result["profile_path"] : result["poster_path"]}
                        releaseDate={(result["media_type"] === "movie") ? result["release_date"] : result["first_air_date"]}
                        vote={(result["media_type"] !== "person") ? result["vote_average"] : null}
                    />)
                }
            </div>
        </div>
    )
}

export default Results
