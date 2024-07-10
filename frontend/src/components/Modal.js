import React from 'react';
import styles from '../styles/Modal.module.css';

const Modal = ({ open, children, onClose }) => {

    if (!open) return null;
    
    return (
        <>
            <div className={styles.overlay} onClick={onClose}/>
            <div className={styles.modal}>
                <button onClick={onClose} className={styles.closeButton}>X</button>
                <p>Test test test</p>
            </div>
        </>

    )
}

export default Modal;
