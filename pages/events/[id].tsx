import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import eventsData from "@/data/events.json";
import { Event } from "../index";
import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type EventDetailProps = {
  event: Event | null;
};

export default function EventDetail({ event }: EventDetailProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  if (!event) {
    return <p>Event not found.</p>;
  }

  return (
    <div className={poppins.className}>
      <Head>
        <title>{event.title} - Event Details</title>
        <meta name="description" content={event.description} />
      </Head>

      <main className="max-w-2xl mx-auto p-2 sm:p-4">
        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative w-full h-40 sm:h-48 bg-gray-100">
            <Image
              src="/event-placeholder.jpg"
              alt="Event banner"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
          <div className="p-4 sm:p-8 flex flex-col gap-3 sm:gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">{event.title}</h1>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm sm:text-base text-gray-500">
              <span className="inline-block bg-blue-100 text-blue-700 px-2 sm:px-3 py-1 rounded-full font-medium">📅 {event.date}</span>
              <span className="inline-block bg-green-100 text-green-700 px-2 sm:px-3 py-1 rounded-full font-medium">📍 {event.location}</span>
            </div>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">{event.description}</p>
            <Link href="/" aria-label="Back to Events list">
              <span className="inline-block mt-3 sm:mt-4 px-4 sm:px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 text-center w-full sm:w-auto">← Back to Events</span>
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = eventsData.map((event) => ({
    params: { id: event.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params!;
  const event = eventsData.find((e) => e.id === id) || null;

  return {
    props: { event },
  };
};
