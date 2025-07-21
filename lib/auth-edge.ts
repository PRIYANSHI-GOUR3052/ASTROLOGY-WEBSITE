import { jwtVerify, SignJWT } from 'jose';

const ASTROLOGER_JWT_SECRET = process.env.ASTROLOGER_JWT_SECRET || 'astrologer-secret-key';

function getAstrologerSecretKey() {
  return new TextEncoder().encode(ASTROLOGER_JWT_SECRET);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function signAstrologerJwt(payload: object, _expiresIn = '7d') {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 7 * 24 * 60 * 60;
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt(iat)
    .setExpirationTime(exp)
    .sign(getAstrologerSecretKey());
}

export async function verifyAstrologerJwt(token: string) {
  const { payload } = await jwtVerify(token, getAstrologerSecretKey());
  return payload;
} 