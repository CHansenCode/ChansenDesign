import type { NextApiRequest, NextApiResponse } from "next";
import { patchOne } from "../../../lib-api/mongo/caticorn";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const resData = await patchOne(req.body);
    res.status(200).json(resData);
  } catch (error) {
    res.status(400).json(error);
  }
}
