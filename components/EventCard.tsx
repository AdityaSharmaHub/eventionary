import { Event } from "@/pages/index";
import Link from "next/link";
import Image from "next/image";

type EventCardProps = {
  event: Event;
};

export default function EventCard({ event }: EventCardProps) {
  return (
    <article className="bg-white border border-gray-200 rounded-xl p-0 shadow-sm hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col">
      <div className="relative w-full h-36 bg-gray-100">
        <Image
          src="/event-placeholder.jpg"
          alt="Event banner"
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 50vw"
          priority
        />
      </div>
      <div className="flex-1 flex flex-col p-5">
        <h2 className="text-2xl font-bold mb-2 text-gray-900">{event.title}</h2>
        <div className="flex items-center text-sm text-gray-500 mb-1 gap-2">
          <span className="inline-block bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">📅 {event.date}</span>
          <span className="inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">📍 {event.location}</span>
        </div>
        <p className="mb-4 text-gray-700 text-base line-clamp-3">{event.description}</p>
        <Link href={`/events/${event.id}`} aria-label={`View details for ${event.title}`}>
          <span className="inline-block mt-auto text-blue-600 hover:underline font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 rounded">View Details →</span>
        </Link>
      </div>
    </article>
  );
}
