import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

/**
 * POST /api/deck
 * Create a new deck
 */
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body: {
    name: string;
    category: string;
    author: string;
    description: string;
  } = req.body;

  const result = await prisma.deck.create({
    data: {
      ...body,
    },
  });
  res.json(result);
}
