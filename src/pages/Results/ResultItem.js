import React from 'react';
import NoImage from "../../images/no_image.png";

const ResultItem = ({ id, poster, mediaType, name, releaseDate }) => {
    const year = releaseDate ? new Date(releaseDate) : null;

    return (
        <div className="my-4 row g-0 shadow-sm border rounded">
            <div className="col-2">
                <img
                    src={!poster ? NoImage : `https://image.tmdb.org/t/p/w500${poster}`}
                    className="thumbnail h-100"
                    alt="poster"
                />
            </div>
            <div className="col-8 py-3">
                <a className="h3 lh-lg text-decoration-none" href={`/search/result/${id}`}>{name}</a>
                <p className="text-capitalize">{(year) && `${year.getFullYear()} -`} {mediaType}</p>
            </div>
        </div>
    )
}

export default ResultItem
