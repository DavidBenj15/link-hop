import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

export default class Redirect extends Component {
    render() {
        const { shortUrl } = useParams();

        useEffect(() => {
            //TODO: fetch original url from server
        }, [shortUrl]);
    
        return (
            //TODO: remove HTML below and add cool HTML for redirection page
            <p>lorem ipsum</p>
        );
    }
}