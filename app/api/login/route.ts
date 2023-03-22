import pb from "../../lib/pocketbase"
import { NextApiRequest, NextApiResponse } from 'next';


export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  try {
    const userCredential = await pb.collection('users').authWithPassword(email, password);
    // const user = userCredential.user;

    res.status(200).json({ success: true, email });
  } catch (error: any) {
    res.status(401).json({ success: false, message: error.message });
  }
}
