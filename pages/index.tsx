import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Layout } from "../components/Layout";

const decks = [
  {
    name: "1.5 Data Structures",
    field: "AS/A Computer Science",
    author: "Ewan Crowle",
    cards: 15,
    due: 5,
  },
  {
    name: "2.1 Conduction of Electricity",
    field: "AS/A Level Physics",
    author: "Ewan Crowle",
    cards: 20,
    due: 0,
  },
];

const Home: NextPage = () => {
  return (
    <Layout>
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
              {decks.map((deck) => (
                <tr key={deck.cards}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {deck.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {deck.cards} cards
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{deck.field}</div>
                    <div className="text-sm text-gray-500">{deck.author}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {deck.due ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-600">
                        {deck.due} cards
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        None
                      </span>
                    )}
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
