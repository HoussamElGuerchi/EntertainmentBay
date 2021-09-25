import React from 'react';
import Input from '../../components/Input';

const SearchForm = () => {
    const [searchInput, setSearchInput] = React.useState("");

    function handleInputChange(event) {
        setSearchInput(event.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-lg-10 col-md-12">
                    <Input
                        type="text"
                        value={searchInput}
                        inputChangeHandler={handleInputChange}
                    />
                </div>
                <div className="col-lg-2 col-md-12">
                    <button className="btn btn-primary" type="submit">Search</button>
                </div>
            </div>
        </form>
    )
}

export default SearchForm
