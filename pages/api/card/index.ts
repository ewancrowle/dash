import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

/**
 * POST /api/card
 * Create a new card
 */
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body: {
    front: string;
    back: string;
    deckId: string;
  } = req.body;

  const result = await prisma.card.create({
    data: {
      front: body.front,
      back: body.back,
      deckId: body.deckId,
    },
  });
  res.json(result);
}
