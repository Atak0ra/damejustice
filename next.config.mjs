/** @type {import('next').NextConfig} */
const nextConfig = {
  // Dev uniquement : autorise l'accès via 127.0.0.1 (sinon le JS client ne s'hydrate pas).
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
