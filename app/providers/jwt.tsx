import { JwtPayload, jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface MyTokenPayload extends JwtPayload {
  sub: string;
  name: string;
  email: string;
}

export const decodeToken = (token: string): MyTokenPayload | null => {
  try {
    const decoded = jwtDecode<MyTokenPayload>(token);
    return decoded;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) {
    return true;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
};
