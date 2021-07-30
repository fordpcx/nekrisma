const dev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 3000;

export const server = dev ? `http://localhost:${PORT}` : `http://localhost:${PORT}`;
