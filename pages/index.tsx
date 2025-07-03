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
        <title>Events Explorer</title>
        <meta name="description" content="Browse upcoming events by location" />
      </Head>

      <main className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Events Explorer</h1>

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