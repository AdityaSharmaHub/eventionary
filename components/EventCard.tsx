import { Event } from "@/pages/index";
import Link from "next/link";

type EventCardProps = {
  event: Event;
};

export default function EventCard({ event }: EventCardProps) {
  return (
    <article className="border border-gray-400 rounded-md p-4 shadow hover:shadow-lg transition">
      <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
      <p className="text-sm text-gray-600 mb-1">📅 {event.date}</p>
      <p className="text-sm text-gray-600 mb-1">📍 {event.location}</p>
      <p className="mb-3">{event.description}</p>
      <Link href={`/events/${event.id}`}>
        <span className="text-blue-500 hover:underline">View Details</span>
      </Link>
    </article>
  );
}
