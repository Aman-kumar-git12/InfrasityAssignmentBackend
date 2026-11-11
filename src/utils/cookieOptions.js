const isProduction = process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  // frontend (vercel) and backend (render) are different sites in production
  sameSite: isProduction ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7d, same as JWT_EXPIRES_IN
};

export default cookieOptions;
