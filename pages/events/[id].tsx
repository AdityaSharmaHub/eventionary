import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import eventsData from "@/data/events.json";
import { Event } from "../index";
import Link from "next/link";

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
    <>
      <Head>
        <title>{event.title} - Event Details</title>
        <meta name="description" content={event.description} />
      </Head>

      <main className="max-w-2xl mx-auto p-4">
        <article className="border p-6 rounded shadow">
          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
          <p className="text-gray-600 mb-2">📅 {event.date}</p>
          <p className="text-gray-600 mb-2">📍 {event.location}</p>
          <p className="mb-4">{event.description}</p>

          <Link href="/">
            <span className="text-blue-500 hover:underline">← Back to Events</span>
          </Link>
        </article>
      </main>
    </>
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
