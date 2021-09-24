import React from 'react';
import SearchForm from './SearchForm';
import "./styles.css";

const Home = () => {
    return (
        <div className="screen vh-100">
            <div className="container-fluid p-lg-0 p-4 h-100 content">
                <div className="h-100 d-flex justify-content-center align-items-center">
                    <div>
                        <h3 className="mb-3">Search a movie, tv show or a person</h3>
                        <SearchForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
