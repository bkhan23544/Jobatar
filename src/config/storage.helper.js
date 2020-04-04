import { firebaseConfig as FC } from "./firebase.config";

const getItem = (key) => {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
};

const setItem = (key, item) => {
    const data = JSON.stringify(item);
    localStorage.setItem(key, data);
};

const removeItem = (key) => {
    localStorage.removeItem(key);
};

const upload = (attachment) => {
    // Create file metadata including the content type
    const storage = FC.storage;

    const { key, id, files } = attachment;
    if (files !== null) {
        for (let file of files) {
            const mime = (file.type === null) ? 'application/octet-stream' : file.type;
            var metadata = { contentType: mime, };
            const upload = storage.ref(`${key}/${id}/${file.name}`).put(file, metadata);
            upload.on('state_changed', function (snapshot) {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused': // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case 'running': // or 'running'
                        console.log('Upload is running');
                        break;
                }
            }, function (error) {
                // Handle unsuccessful uploads
            }, function () {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                const attachments = [];
                const storageRef = storage.ref(`${key}/${id}/thumbs`);
                storageRef && storageRef.listAll().then((result) => {
                    if (result.items.length > 0) {
                        result.items.forEach(async (imageRef) => {
                            await imageRef.getDownloadURL().then(async (url) => {
                                if (url.indexOf('200x200') !== -1) {
                                    await attachments.push(url);
                                    console.log('File available at', url);
                                }
                            });
                        });
                    }
                });
                return attachments;
            });
        }

    }

};

export const storageHelper = {
    getItem,
    setItem,
    removeItem,
    upload
};
