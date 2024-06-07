import React, { useEffect } from 'react';

const TestFetch = () => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/api/books');
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return <div>Check the console for fetched data.</div>;
};

export default TestFetch;
