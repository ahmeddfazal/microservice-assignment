import React, { useEffect, useState } from "react";
import { createImage, getAllImages, deleteImage } from "../../commonServices";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { Alert } from "@mui/material";
import { imageDataFormatter } from "../../constants";

export default function ImageUploader() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { storageUsed: storage_used = 0 } = state ?? {};

  const [fileSelected, setFileSelected] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [currentFileInfo, setCurrentFileInfo] = useState();
  const [imagesList, setImagesList] = useState([]);
  const [storageUsed, setStorageUsed] = useState(parseFloat(storage_used));
  const [storageUsagePerDay, setStorageUsagePerDay] = useState(2);

  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    const username = localStorage.getItem("username");
    if (!username) onLogout();
    setLoading(true);
    const { storage_usage_per_day, storage_used, user_info } =
      await getAllImages(username);
    const formattedData = imageDataFormatter(user_info);
    setStorageUsed(parseFloat(storage_used));
    setStorageUsagePerDay(parseFloat(storage_usage_per_day));
    setImagesList(formattedData);
    setLoading(false);
  };

  const onFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    const { name: fileName, size: fileSize } = uploadedFile ?? {};

    const fileSizeMB = parseFloat(
      (parseFloat(fileSize) / 1000 / 1000).toFixed(5)
    );

    if (storageUsed + fileSizeMB > 10) {
      alert("You have used 100% space please delete some images.");
      setFileSelected(null);
      return;
    } else if (storageUsed + fileSizeMB > 8) {
      setStorageUsed(storageUsed + fileSizeMB);
    }

    setFileSelected(uploadedFile);
    const imageObj = {
      fileName,
      fileSize: fileSizeMB,
    };
    setCurrentFileInfo(imageObj);
  };

  const onFileUpload = async () => {
    setUploading(true);

    const { fileSize } = currentFileInfo;

    await createImage(fileSelected, fileSize, storageUsed);
    setStorageUsed((storageUsed) => storageUsed + parseFloat(fileSize));

    await getImages();
    setUploading(false);
  };

  const onLogout = async () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  const onViewLogsClick = () => {
    navigate("/logs");
  };

  const onDelete = async (id) => {
    setLoading(true);
    await deleteImage(id);
    await getImages();
    setLoading(false);
  };

  const imagesPercent = useMemo(() => {
    return ((storageUsed / 10) * 100).toFixed(2);
  }, [storageUsed]);

  const limitExceeded = storageUsagePerDay >= 25 || storageUsed >= 10;

  return (
    <>
      {(uploading || isLoading) && (
        <div className="loader-styling">
          <CircularProgress />
        </div>
      )}
      <div style={{ margin: "20px" }}>
        <div style={{ margin: "20px" }}>
          <h2>Choose an Image to upload</h2>

          <input type="file" disabled={limitExceeded} onChange={onFileChange} />
          <Button
            type="submit"
            disabled={limitExceeded}
            variant="contained"
            onClick={onFileUpload}
          >
            Upload!
          </Button>
          <Button
            variant="contained"
            style={{ float: "right" }}
            onClick={onLogout}
          >
            Logout
          </Button>

          {uploading && "    . . . File Uploading. Please Wait"}
        </div>
        {limitExceeded && (
          <Alert className="mt-10" severity="error">
            Usage limit reached
          </Alert>
        )}
        <Card style={{ margin: "20px 0 20px 0", padding: 20 }}>
          <h3>Storage Info</h3>
          You have used cloud storage of {storageUsed} MB out of 10MB.
          <br />
          <label htmlFor="file">Used Storage:</label>
          <progress id="file" value={imagesPercent} max="100"></progress>
          {imagesPercent}%
          <div className="mt-10 d-block">
            <Button
              className="mt-10 d-block"
              variant="contained"
              onClick={onViewLogsClick}
            >
              View Logs
            </Button>
          </div>
        </Card>
        <h4>Images Gallery</h4>
        {imagesList.map((item, index) => (
          <Card
            style={{
              display: "inline-block",
              margin: "10px",
              padding: "5px",
            }}
            key={`img-${index}`}
          >
            <div className="card-content">
              <img
                src={item.url}
                width={200}
                height={200}
                key={item.fileName + index}
                style={{ margin: "20px" }}
              />
              <Button
                variant="outlined"
                color="error"
                key={item.fileName + index + "button"}
                value={index}
                id={index}
                disabled={storageUsagePerDay > 25}
                onClick={() => {
                  onDelete(item.id);
                }}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
