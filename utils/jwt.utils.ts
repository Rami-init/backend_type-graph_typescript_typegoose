import jwt from "jsonwebtoken";
export function signJwt(object: object, options?: jwt.SignOptions) {
  return jwt.sign({ ...object }, process.env.SECRET_JWT as string, {
    ...(options && options),
  });
}

export async function verfiyJwt<T>(token: string): Promise<T | null> {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT as string) as T;
    return decoded;
  } catch (err) {
    return null;
  }
}
