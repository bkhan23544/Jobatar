import React from 'react';
import ContentLoader from "react-content-loader";

export default function FreelancerListLoader(props) {
    let loop = props.listCount ? props.listCount : 0;
    const lists = [];
    for(let a = 0; a<= loop; a++) {
        lists.push(a);
    }

    return (
        <div className="freelancerLoader">
            {lists.map((index) =>
                <div key={index} className="freLncrBox card mb-4 border-bottom-0 px-3 pt-3">
                    <ContentLoader
                        height={75}
                        width={700}
                        speed={10}
                        primaryColor={props.primaryBg ? props.primaryBg : '#ddd'}
                        secondaryColor={props.secondaryBg ? props.secondaryBg : '#ddd'}
                        >
                        <circle cx="30" cy="30" r="30" /> 
                        <rect x="75" y="3" rx="4" ry="4" width="650" height="13" /> 
                        <rect x="75" y="25" rx="4" ry="4" width="650" height="13" />
                        <rect x="75" y="47" rx="4" ry="4" width="650" height="13" />
                    </ContentLoader>
                </div>
            )}
        </div>
    )
}
