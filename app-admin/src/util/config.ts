import nextConfig from "../../next.config";

const config = {
  api_URL: nextConfig.env?.API_URL || "",
  api_key: nextConfig.env?.API_KEY || "",
};

export default config;
