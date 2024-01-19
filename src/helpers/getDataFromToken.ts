import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export async function getDataFromToken(request: NextRequest): Promise<string> {
  try {
    const token = await request.cookies.get("token")?.value;
    console.log(token);

    if (!token) {
      throw new Error('Token not found in cookies');
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as { id: string };
    console.log(decodedToken.id);
    
    return decodedToken.id;
  } catch (error: any) {
    console.error('Error decoding token:', error.message);
    throw new Error('Failed to decode token');
  }
}
