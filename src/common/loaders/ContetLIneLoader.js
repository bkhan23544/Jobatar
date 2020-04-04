import React from 'react';
import ContentLoader from "react-content-loader";

export default function ContetLIneLoader(props) {
    let loop = props.listCount ? props.listCount : 0;
    const lists = [];
    for(let a = 0; a<= loop; a++) {
        lists.push(a);
    }

    return (
        <div className="w-100">
            {lists.map((index) =>
                <div key={index} className={`w-100 px-${props.px ? props.px : ''}`}>
                    <ContentLoader
                        height={props.height ? props.height : 90}
                        width={props.width ? props.width : 700}
                        speed={10}
                        primaryColor={props.primaryBg ? props.primaryBg : '#ddd'}
                        secondaryColor={props.secondaryBg ? props.secondaryBg : '#ddd'}
                        >
                        <rect x="0" y="0" rx="3" ry="3" width={props.width ? props.width : 700} height="15" /> 
                        <rect x="0" y="30" rx="3" ry="3" width={props.width ? props.width : 700} height="15" /> 
                        <rect x="0" y="60" rx="3" ry="3" width={props.width ? props.width : 700} height="15" /> 
                        <rect x="0" y="90" rx="3" ry="3" width={props.width ? props.width : 700} height="15" /> 
                    </ContentLoader>
                </div>
            )}
        </div>
    )
}

