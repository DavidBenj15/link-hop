/**
 * Component that fetches the original link from the server and redirects the user to it.
 */

import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from '../styles/RedirectComponent.module.css';
// NOTE: "import { response } from 'express';", which is sometimes randomly added by VS Code, will cause an error

const RedirectComponent = () => {
    let { shortLink } = useParams();
    const [linkFound, setLinkFound] = React.useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the original link from the server as plain text
                const originalLink = await axios.get(`http://localhost:5000/${shortLink}`);
                if (originalLink.status !== 200 || !originalLink.data) {
                    // If the response is not ok, set linkFound to false
                    setLinkFound(false);
                }
                else {
                    // Redirect the user to the obtained link
                    setLinkFound(true);
                    console.log(`Redirecting to ${originalLink.data}`);
                    window.location.href = originalLink.data;
                }

            } catch (error) {
                // If any other error occurs, set linkFound to false
                console.error('Error fetching data:', error);
                setLinkFound(false);
            }
        };

        fetchData();
    }, [shortLink]);

    if (!linkFound) {
        return (
            // This HTML is returned if the link is not found
            // TODO: Add better looking HTML
            <div className={styles.container}>
                <h1 className={styles.errorMessage}>Error: link not found</h1>
                <a href='http://localhost:3000/' className={styles.anchor}>Back to LinkHop</a>
            </div>
            
        )
    } else {
        return (
            // This HTML is returned for a successful redirect
            // TODO: Add better looking HTML
            <div className={styles.container}>
                <h1 className={styles.redirectMessage}>Redirecting...</h1>
            </div>
        )
    }


}

export default RedirectComponent;