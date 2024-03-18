const cloud_name = 'dznyslurd';
const upload_preset = 'OwnSocio';

export const uploadToCloudinary = async (file, fileType) => {
    if (file && fileType) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", upload_preset);
        data.append('cloud_name', cloud_name);

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/${fileType}/upload`, {
                method: 'POST',
                body: data
            });

            const fileData = await res.json();
            console.log("filedata",fileData);
            return fileData.url;
        } catch (error) {
            console.error("Error:", error);
            return null;
        }
    } else {
        console.error("Error: Missing file or fileType.");
        return null;
    }
}
