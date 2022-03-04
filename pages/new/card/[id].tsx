import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Router from "next/router";
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
  return {
    props: {
      deckId: context.params.id as string,
    },
  };
};

type Props = {
  deckId: string;
};

const NewCard: NextPage<Props> = (props) => {
  return (
    <Layout page={1}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.target as any;
          try {
            await fetch(`http://localhost:3000/api/card`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                front: form.front.value,
                back: form.back.value,
                deckId: props.deckId,
              }),
            });
            await Router.push(`/edit/deck/${props.deckId}`);
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
              />
            </div>
          </div>
        </div>

        <div className="px-4 py-3 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default NewCard;
