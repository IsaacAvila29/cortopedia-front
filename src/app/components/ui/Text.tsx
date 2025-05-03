import ReactMarkdown from "react-markdown";
import { Typography, TypographyProps, Box } from "@mui/material";
import React from "react";

export interface TextProps extends TypographyProps {
  children: React.ReactNode;
}

const Text: React.FC<TextProps> = ({ children, ...props }) => {
  return (
    <Box {...props} sx={{ typography: "body1", ...props.sx }}>
      <ReactMarkdown
        components={{
          p: ({ node, ...props }) => <Typography component="p" {...props} />,
          h1: ({ node, ...props }) => (
            <Typography variant="h4" gutterBottom {...props} />
          ),
          h2: ({ node, ...props }) => (
            <Typography variant="h5" gutterBottom {...props} />
          ),
          h3: ({ node, ...props }) => (
            <Typography variant="h6" gutterBottom {...props} />
          ),
          li: ({ node, ...props }) => <li {...props} />,
          strong: ({ node, ...props }) => <strong {...props} />,
          em: ({ node, ...props }) => <em {...props} />,
        }}
      >
        {typeof children === "string" ? children : String(children)}
      </ReactMarkdown>
    </Box>
  );
};

export default Text;
