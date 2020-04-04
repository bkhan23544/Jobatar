import React from "react";

export const fileManupulate = (uploadFiles, oldFiles, id) => {
    let files = [];
    uploadFiles.docs && uploadFiles.docs.map(file => files.push(file.id));
    uploadFiles.image && uploadFiles.image.map(file => files.push(file.id));
    uploadFiles.video && uploadFiles.video.map(file => files.push(file.id));
    if (id) {
        files = oldFiles ? files.filter(val => !oldFiles.includes(val)) : files;
    }
    return files;
};

export const NoUploadedFiles = () => {
    return (
            <ul className="upload-pdf">
                <li className="d-flex flex-wrap">
                    <div className="col pl-0">
                        {/* No files. */}
                    </div>

                </li>
            </ul>);
};
