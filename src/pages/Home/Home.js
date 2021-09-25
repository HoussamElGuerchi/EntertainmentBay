import React from 'react';
import SearchForm from './SearchForm';
import "./styles.css";

const Home = () => {
    return (
        <div className="screen">
            <div className="vh-100 container-fluid content">
                <div className="h-100 container center">
                    <div className="w-75 text-center">
                        <h3 className="mb-4 text-lg-start">Search a movie, tv show or a person</h3>
                        <SearchForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
