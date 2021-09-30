import React from "react";
import axios from "axios";
import ResultItem from "./ResultItem";
import Alert from "../../components/Alert";
import "./styles.css";


const API_ENDPOINT = "https://api.themoviedb.org/3/search/multi";
const API_KEY = "f4d99b3567fb217391c6e1132d107acb";

function capitalize(string) {
    return `${string[0].toUpperCase()}${string.slice(1)}`;
}
// Initial State
const initialState = {
    data: [],
    isLoading: false,
    error: null
}

// Actions
const RESULTS_FETCH_INIT = "RESULTS_FETCH_INIT";
const RESULTS_FETCH_SUCCESS = "RESULTS_FETCH_SUCCESS";
const RESULTS_FETCH_FAILURE = "RESULTS_FETCH_FAILURE";

// Reducer
const resultsReducer = (state, action) => {
    switch (action.type) {
        case RESULTS_FETCH_INIT:
            return {
                ...state,
                isLoading: true
            };
        case RESULTS_FETCH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.data
            };
        case RESULTS_FETCH_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        default: throw new Error("Unhandled results fetch action")
    };
}

const Results = ({ match }) => {
    const [results, dispatchResults] = React.useReducer(resultsReducer, initialState);

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
            })
            .catch(function (err) {
                dispatchResults({
                    type: RESULTS_FETCH_FAILURE,
                    error: "Something went wrong!"
                })
            })
    }, []);

    return (
        <div className="container-fluid results-screen h-100">
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
