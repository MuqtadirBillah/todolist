/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    MYSQL_HOST:'sql436.main-hosting.eu',
    MYSQL_USER:'u812210942_todolist',
    MYSQL_DATABASE:'u812210942_todolist',
    MYSQL_PASSWORD:'Muqtadir4',
    OUTLOOK_PASSWORD: 'DivineVirtuality',
    JWTSecret: 'MuqtadirBillahMusabAbbasi',
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  }
}

module.exports = nextConfig
