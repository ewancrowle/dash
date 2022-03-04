import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Router from "next/router";
import React from "react";
import { Layout } from "../../../components/Layout";
import prisma from "../../../lib/prisma";

export const getStaticPaths: GetStaticPaths = async () => {
  const cards = (await prisma.card.findMany()).map((card) => {
    return {
      params: {
        id: card.id,
      },
    };
  });

  return {
    paths: cards,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const card = await prisma.card.findUnique({
    where: {
      id: context.params.id as string,
    },
    include: {
      deck: true,
    },
  });

  return {
    props: {
      card: {
        id: card.id,
        front: card.front,
        back: card.back,
        deckId: card.deck.id,
      },
    },
  };
};

type Props = {
  card: {
    id: string;
    front: string;
    back: string;
    deckId: string;
  };
};

const EditCard: NextPage<Props> = (props) => {
  return (
    <Layout page={0}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.target as any;
          try {
            await fetch(`http://localhost:3000/api/card/edit`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                front: form.front.value,
                back: form.back.value,
                cardId: props.card.id,
              }),
            });
            await Router.push(`/edit/deck/${props.card.deckId}`);
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Front
            </label>
            <div className="mt-1">
              <textarea
                required
                name="front"
                rows={2}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                defaultValue={props.card.front}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Back
            </label>
            <div className="mt-1">
              <textarea
                required
                name="back"
                rows={2}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                defaultValue={props.card.back}
              />
            </div>
          </div>
        </div>

        <div className="px-4 py-3 text-right sm:px-6">
          <Link href={`/edit/deck/${props.card.deckId}`}>
            <a className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-900">
              Cancel
            </a>
          </Link>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default EditCard;
