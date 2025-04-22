import { Box, Typography } from "@mui/material";

interface ImageProps {
  src: string;
  alt?: string;
  width?: string | number;
  maxWidth?: string | number;
  descriptionImage?: string;
}
export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width = 250,
  maxWidth = 300,
  descriptionImage = "",
}) => {
  return (
    <Box
      p={2}
      border={1}
      bgcolor={"lightgray"}
      style={{
        maxWidth: maxWidth || "100%",
        justifyContent: "center",
        display: "flex",
        borderRadius: "8px",
      }}
    >
      <Box textAlign="center">
        <img
          src={src}
          alt={alt}
          style={{
            width: width || "100%",
            height: "auto",
            objectFit: "cover",
          }}
        />

        <Typography marginTop={2} textAlign="center">
          {descriptionImage}
        </Typography>
      </Box>
    </Box>
  );
};

export default Image;
