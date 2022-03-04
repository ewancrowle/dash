import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import React from "react";
import { Layout } from "../../../components/Layout";
import prisma from "../../../lib/prisma";

export const getStaticPaths: GetStaticPaths = async () => {
  const cards = (await prisma.deck.findMany()).map((deck) => {
    return {
      params: {
        id: deck.id,
      },
    };
  });

  return {
    paths: cards,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params.id as string;
  const cards = (
    await prisma.deck.findUnique({
      where: {
        id: id,
      },
      include: {
        cards: true,
      },
    })
  ).cards.map((card) => {
    return {
      id: card.id,
      front: card.front,
      back: card.back,
      createdAt: card.createdAt.toString(),
      lastReviewed: card.lastReviewed ? card.lastReviewed.toString() : null,
      lastScore: card.lastScore ? card.lastScore.toString() : null,
      nextReview: card.nextReview ? card.nextReview.toString() : null,
    };
  });
  return {
    props: {
      deckId: id,
      cards,
    },
  };
};

type Props = {
  deckId: string;
  cards: {
    id: string;
    front: string;
    back: string;
    createdAt: string;
    lastReviewed?: string;
    lastScore?: number;
    nextReview?: string;
  }[];
};

const EditDeck: NextPage<Props> = (props) => {
  return (
    <Layout page={0}>
      <div className="align-middle">
        <div className="border-b border-gray-200 min-w-full">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Card
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Stat
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Due
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium">
                  <Link href={`/new/card/${props.deckId}`}>
                    <a className="text-indigo-600 hover:text-indigo-900">New</a>
                  </Link>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {props.cards.map((card) => (
                <tr key={card.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {card.front}
                    </div>
                    <div className="text-sm text-gray-500">{card.back}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {card.lastScore}
                    </div>
                    <div className="text-sm text-gray-500">
                      {card.lastReviewed}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {card.nextReview}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/edit/card/${card.id}`}>
                      <a className="text-indigo-600 hover:text-indigo-900">
                        Edit
                      </a>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default EditDeck;
