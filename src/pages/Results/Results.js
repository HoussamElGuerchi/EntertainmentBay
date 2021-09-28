import React from "react";
import axios from "axios";
import ResultItem from "./ResultItem";
import "./styles.css";

const API_KEY = "f4d99b3567fb217391c6e1132d107acb";

function capitalize(string) {
    return `${string[0].toUpperCase()}${string.slice(1)}`;
}

const Results = ({ match }) => {
    const [results, setResults] = React.useState([]);
    const [isLoading, setIsloading] = React.useState(true);
    const [error, setError] = React.useState();

    const searchTerm = capitalize(match.params.searchTerm);

    const url = "https://api.themoviedb.org/3/search/multi";

    React.useEffect(() => {
        axios.get(url, {
            params: {
                api_key: API_KEY,
                query: searchTerm
            }
        })
            .then(function (res) {
                console.log(res.data.results);
                setResults(res.data.results);
            })
            .catch(function (err) {
                console.log(err);
            })
            .then(function () {
                setIsloading(false);
            })
    }, []);

    return (
        <div className="container-fluid results-screen h-100">
            <div className="container w-75 py-5">
                <h1>{searchTerm}</h1>
                {
                    isLoading &&
                    <div class="d-flex align-items-center mt-4">
                        Loading...
                        <div class="spinner-border text-primary ms-auto" role="status" aria-hidden="true"></div>
                    </div>
                }
                {
                    results.map(result => <ResultItem
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
