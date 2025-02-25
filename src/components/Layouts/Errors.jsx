import React from "react";
import PropTypes from "prop-types";

function Errors({ errors }) {
    return (
        <div className="alert alert-danger">
            {errors.map((error) => (
                <span>{error}</span>
            ))}
        </div>
    );
}

Errors.propTypes = {
    errors: PropTypes.array
}

export default Errors;