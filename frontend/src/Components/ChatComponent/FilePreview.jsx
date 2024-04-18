import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoSend } from "react-icons/io5";

const FilePreview = ({ selectedFile, handleSendFile }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!selectedFile) return;

    // Generate preview based on file type
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null); // Reset preview if file type is not supported for preview
    }
  }, [selectedFile]);

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);

    // Perform file upload logic here
    try {
      // Example: Upload file using axios
      const formData = new FormData();
      formData.append("file", selectedFile);
      await axios.post("/upload", formData);

      // Reset selectedFile after successful upload
      handleSendFile();
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">File Preview</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {preview ? (
              <img src={preview} alt="Preview" style={{ maxWidth: "100%", maxHeight: "200px" }} />
            ) : (
              <p>No preview available for this file type</p>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleUpload}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : <IoSend />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
