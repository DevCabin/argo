import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <main className="flex flex-col items-center gap-8 max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold">
          Argo - Voice AI Application
        </h1>
        <p className="text-xl">
          TTS → LLM AI → DB → LLM AI → TTS
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
          <a
            href="https://github.com/DevCabin/argo"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors text-center"
          >
            View on GitHub
          </a>
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-black rounded hover:bg-gray-100 transition-colors text-center"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
