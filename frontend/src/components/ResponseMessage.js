import React from 'react'
import styles from '../styles/ResponseMessage.module.css'

const ResponseMessage = ({ responseType, errorMessage }) => {

    return (
        <div className={styles.container}>
            {responseType === 'success' && <p className={styles.success}>Link added successfully!</p>}
            {responseType === 'error' && <p className={styles.error}>Failed to add link: {errorMessage}</p>}
            {responseType === 'internal server error' && <p className={styles.error}>Internal server error</p>}
        </div>
    )
}

export default ResponseMessage
