import type { NextPage } from "next";
import Head from "next/head";
import { Layout } from "../../components/Layout";
import Router from "next/router";

const NewDeck: NextPage = () => {
  return (
    <Layout page={1}>
      <Head>
        <title>Dash</title>
        <meta name="description" content="Flashcards made easy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.target as any;
          try {
            await fetch(`http://localhost:3000/api/deck`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: form.name.value,
                author: form.author.value,
                description: form.description.value,
                category: form.category.value,
              }),
            });
            await Router.push("/");
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-3 sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  required
                  type="text"
                  name="name"
                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                  placeholder="My Deck"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-3 sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Author
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  required
                  type="text"
                  name="author"
                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                  placeholder="Jane Doe"
                />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="about"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <div className="mt-1">
              <textarea
                name="description"
                rows={2}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                placeholder="A deck to help you learn something new."
                defaultValue={""}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-3 sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="category"
                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                  placeholder="Math"
                  defaultValue={""}
                />
              </div>
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

export default NewDeck;
