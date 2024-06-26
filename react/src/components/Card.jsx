import React from "react";

const Card = ({ title, count, svg }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
            <div className="pl-5">{svg}</div>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base">{count}</p>
            </div>
        </div>
    );
};

export default Card;
