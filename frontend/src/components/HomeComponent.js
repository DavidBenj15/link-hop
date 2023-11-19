import React, { useState } from 'react';

const HomeComponent = () => {
    const [original, setOriginal] = useState('');
    const [short, setShort] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        // prevent page reload on submit
        e.preventDefault();

        try {
            // make POST request to server
            const response = await fetch('http://localhost:5000/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ original, short })
            });

            if (response.ok) {
                // if response is ok
                // TODO: clear form and display success message
                console.log(`Added ${original} as ${short}`);
            } else {
                // if response is not ok
                const errorMessage = await response.text();
                console.error(`Failed to add ${original} as ${short}: ${errorMessage}`);
                setErrorMessage(errorMessage);
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Internal Server Error');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'original') {
            setOriginal(value);
        } else if (name === 'short') {
            setShort(value);
        }
    };

    return (
        // TODO: make this look pretty
        // TODO: remvoe the error message when the user starts typing again
        <div>
            <h1>Home</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Original URL:
                    <input
                        type="text"
                        name="original"
                        value={original}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Short URL:
                    <input
                        type="text"
                        name="short"
                        value={short}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <button type="submit">Add Link</button>
                {errorMessage && <p>{errorMessage}</p>}
            </form>
        </div>
    )
}

export default HomeComponent;