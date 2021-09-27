import React from 'react';
import SearchForm from './SearchForm';
import "./styles.css";

const Home = () => {
    return (
        <div className="screen">
            <div className="vh-100 container-fluid content">
                <div className="h-100 container center">
                    <div className="w-75 text-center">
                        <h1 className="text-lg-start">Welcome.</h1>
                        <h3 className="mb-5 text-lg-start">Millions of movies, TV shows and people to discover. Explore now.</h3>
                        <SearchForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
