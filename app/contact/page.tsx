export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-black dark:text-white px-6 py-20">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold mb-8 text-center text-black dark:text-white">
          Contact
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-10 text-center">
          If you have questions, suggestions or feedback about CreatorTools,
          feel free to reach out.
        </p>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 rounded-xl">

          <p className="mb-4">
            Email:
          </p>

          <p className="text-blue-400">
            contact@creatortools.co.in
          </p>

          <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
            We usually respond within 24–48 hours.
          </p>

        </div>

      </div>

    </main>
  );
}