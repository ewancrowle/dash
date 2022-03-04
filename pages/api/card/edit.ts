import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

/**
 * POST /api/card/edit
 * Edits a card
 */
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body: {
    front: string;
    back: string;
    cardId: string;
  } = req.body;

  const result = await prisma.card.update({
    where: {
      id: body.cardId,
    },
    data: {
      front: body.front,
      back: body.back,
    },
  });
  res.json(result);
}
