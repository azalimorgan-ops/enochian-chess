import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@enochian-chess/engine", "@enochian-chess/data", "@enochian-chess/ui"],
};

export default nextConfig;
