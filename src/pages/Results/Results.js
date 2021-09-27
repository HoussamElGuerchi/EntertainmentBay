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

    function fetchItems() {
        axios.get(url, {
            params: {
                api_key: API_KEY,
                query: searchTerm
            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                setIsloading(false);
            })
    }

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
        <div className="container w-75 mt-5">
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
                />)
            }
        </div>
    )
}

export default Results
