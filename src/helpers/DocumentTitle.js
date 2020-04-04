import React from 'react';
import Helmet from 'react-helmet';


const DocumentTitle = ({ title, description }) => {
    var defaultTitle = 'Jobarter';
    var defaultDescription = 'This is a different description for this route.';
    return (
        <Helmet>
            <title>{title ? `${defaultTitle} | ${title}` : defaultTitle}</title>
            <meta name="description" content={description ? description : defaultDescription} />
        </Helmet>
    );
};

export { DocumentTitle };