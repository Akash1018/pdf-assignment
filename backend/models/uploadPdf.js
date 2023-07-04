import mongoose from "mongoose";

const pdfSchema = mongoose.Schema({
    title: String,
    selectedFile: String,
    userId: String,
    comments : {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const PostMessage = mongoose.model('uploadPdf', pdfSchema);

export default PostMessage;