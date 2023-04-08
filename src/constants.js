export const imageDataFormatter = (imagesData = []) => {
  const transformedImagesData = imagesData.reduce(
    (transformedData = [], imageData = []) => {
      const [id, , , url = ""] = imageData;

      if (url) {
        return [
          ...transformedData,
          {
            id,
            url,
          },
        ];
      } else {
        return transformedData;
      }
    },
    []
  );

  return transformedImagesData;
};
