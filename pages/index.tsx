import { Poppins } from "next/font/google";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useState } from "react";
import EventList from "@/components/EventList";
import FilterBar from "@/components/FilterBar";
import eventsData from "@/data/events.json";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
};

type HomeProps = {
  events: Event[];
};

export default function Home({ events }: HomeProps) {
  const [locationFilter, setLocationFilter] = useState<string>("All");

  const filteredEvents = locationFilter === "All"
    ? events
    : events.filter(event => event.location === locationFilter);

  const locations = Array.from(new Set(events.map(e => e.location)));

  return (
    <div className={`${poppins.className}`}>
      <Head>
        <title>Eventionary - Your Events Explorer</title>
        <meta name="description" content="Browse upcoming events by location" />
      </Head>

      <main className="max-w-4xl mx-auto p-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold">Eventionary</h1>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Explore Events</h2>

        <FilterBar
          locations={locations}
          selected={locationFilter}
          onChange={setLocationFilter}
        />

        <EventList events={filteredEvents} />
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      events: eventsData,
    },
  };
};