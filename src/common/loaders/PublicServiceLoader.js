import React, { Fragment } from 'react';
import ContentLoader from "react-content-loader";

export default function PublicServiceLoader(props) {
    let loop = props.listCount ? props.listCount : 0;
    const lists = [];
    for(let a = 0; a<= loop; a++) {
        lists.push(a);
    }

    return (
        <Fragment>
            {lists.map((index) =>
                <div className="svcsLBox mb-4" key={index}>
                    <ContentLoader
                        height={props.height ? props.height : 450}
                        width={props.width ? props.width : 500}
                        speed={10}
                        primaryColor={props.primaryBg ? props.primaryBg : '#ddd'}
                        secondaryColor={props.secondaryBg ? props.secondaryBg : '#ddd'}
                        >
                        <rect x="0" y="0" rx="3" ry="3" width={props.width ? props.width : 500} height="280" /> 
                        <rect x="25" y="300" rx="3" ry="3" width={props.width ? (props.width - 50) : 450} height="20" /> 
                        <rect x="25" y="350" rx="3" ry="3" width={props.width ? (props.width - 50) : 450} height="20" /> 
                        <rect x="25" y="400" rx="3" ry="3" width={props.width ? (props.width - 50) : 450} height="20" />
                    </ContentLoader>
                </div>
            )}
        </Fragment>
    )
}
