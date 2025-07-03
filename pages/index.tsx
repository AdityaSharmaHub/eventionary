import { Poppins } from "next/font/google";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useState } from "react";
import EventList from "@/components/EventList";
import FilterBar from "@/components/FilterBar";
import eventsData from "@/data/events.json";
import Link from "next/link";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  description: string;
  detailedDescription: string;
  speakers: string[];
  registered: number;
};

type HomeProps = {
  events: Event[];
};

export default function Home({ events }: HomeProps) {
  const [locationFilter, setLocationFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredEvents = events.filter(event => {
    const matchesLocation = locationFilter === "All" || event.location === locationFilter;
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLocation && matchesSearch;
  });

  const locations = Array.from(new Set(events.map(e => e.location)));

  return (
    <div className={`${poppins.className} min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50`}>
      <Head>
        <title>Eventionary - Your Events Explorer</title>
        <meta name="description" content="Browse upcoming events by location" />
      </Head>

      <header className="w-full py-12 bg-gradient-to-r from-blue-600 to-green-400 text-white shadow-lg rounded-b-3xl">
        <div className="max-w-4xl mx-auto px-8 flex flex-col items-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 drop-shadow-lg">Eventionary</h1>
          <p className="text-lg sm:text-xl font-medium mb-6 opacity-90">Discover, filter and explore the best events happening around you.</p>
          <a href="#events-list" className="inline-block px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow hover:bg-blue-50 transition">Browse Events ↓</a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-8" id="events-list">
          <h2 className="text-3xl font-semibold text-gray-800 mt-4 mb-6" >Explore Events</h2>
          <FilterBar
            locations={locations}
            selected={locationFilter}
            onChange={setLocationFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        <EventList events={filteredEvents} />
      </main>
      <footer className="w-full py-4 bg-white/80 border-t border-gray-100 text-center text-sm text-gray-500 mt-8 flex items-center justify-center gap-1">
        <span>Made with</span>
        <span className="text-red-500" aria-label="love">♥</span>
        <span>by</span> 
        <Link href="https://adityacodes.com" className="underline" target="_blank">Aditya Sharma</Link>
      </footer>
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