import React, { useState } from 'react';
import styles from '../styles/HomeComponent.module.css';
import ResponseMessage from './ResponseMessage';
import InfoButton from './InfoButton';

const HomeComponent = () => {
    const [original, setOriginal] = useState('');
    const [short, setShort] = useState('');
    const [responseType, setResponseType] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [typing, setTyping] = useState(false);

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
                setResponseType('success');
                console.log(`Added ${original} as ${short}`);
            } else {
                // if response is not ok
                setErrorMessage(await response.text());
                console.error(`Failed to add ${original} as ${short}: ${errorMessage}`);
                setResponseType('error');
            }
        } catch (error) {
            console.error('Error:', error);
            setResponseType('internal server error');
        }
    };

    const handleChange = (e) => {
        setTyping(true);
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
        // TODO: add a success message
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>LinkHop</h1>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label className={styles.label}>
                    Original URL:
                </label>
                <input
                    type="text"
                    name="original"
                    value={original}
                    onChange={handleChange}
                    required
                    className={styles.formInput}
                    />
                <br />
                <label className={styles.label}>
                    Short URL:
                </label>
                <input
                    type="text"
                    name="short"
                    value={short}
                    onChange={handleChange}
                    required
                    className={styles.formInput}
                    />
                <br />
                <button 
                    type="submit"
                    className={styles.button}>Add Link</button>
            </form>
            <ResponseMessage responseType={responseType} errorMessage={errorMessage}/>
            <InfoButton />
        </div>
    );
};

export default HomeComponent;
