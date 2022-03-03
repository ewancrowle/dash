import type { NextPage } from "next";
import { GetStaticProps } from "next";
import Head from "next/head";
import { Layout } from "../components/Layout";
import prisma from "../lib/prisma";

export const getStaticProps: GetStaticProps = async () => {
  const decks = (
    await prisma.deck.findMany({
      include: {
        cards: true,
      },
    })
  ).map((deck) => {
    return {
      id: deck.id,
      name: deck.name,
      author: deck.author,
      description: deck.description,
      category: deck.category,
      due: 0,
      cards: deck.cards.length,
    };
  });
  return {
    props: {
      decks,
    },
  };
};

type Props = {
  decks: {
    id: string;
    name: string;
    author: string;
    description: string;
    category: string;
    due: number;
    cards: number;
  }[];
};

const Home: NextPage<Props> = (props) => {
  return (
    <Layout page={0}>
      <Head>
        <title>Dash</title>
        <meta name="description" content="Flashcards made easy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="align-middle">
        <div className="border-b border-gray-200 min-w-full">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Source
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Cards Due
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {props.decks.map((deck) => (
                <tr key={deck.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {deck.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {deck.cards} cards
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{deck.category}</div>
                    <div className="text-sm text-gray-500">{deck.author}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {deck.due > 1 ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-600">
                        {deck.due} cards
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        None
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </a>
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

export default Home;
