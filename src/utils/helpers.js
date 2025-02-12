export const hasFileValidationErrors = (file, type) => {
    let error = null;
    if (!file) {
        return "File not found!";
    }
    if (type === "image") {
        if (!file.type.startsWith("image/")) {
            error = "Only image files are allowed!";
        }
        else if (file.size > 2 * 1024 * 1024) {
            error = "The maximum file size is 2Mb";
        }
        return error === null ? false : error;
    }
};
