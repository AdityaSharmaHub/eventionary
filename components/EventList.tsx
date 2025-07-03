import { Event } from "@/pages/index";
import EventCard from "./EventCard";

type EventListProps = {
  events: Event[];
};

function SkeletonCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-0 shadow-sm overflow-hidden flex flex-col animate-pulse">
      <div className="w-full h-36 bg-gray-200" />
      <div className="flex-1 flex flex-col p-5 gap-3">
        <div className="h-6 bg-gray-200 rounded w-2/3 mb-2" />
        <div className="flex gap-2">
          <div className="h-5 w-20 bg-blue-100 rounded-full" />
          <div className="h-5 w-20 bg-green-100 rounded-full" />
        </div>
        <div className="h-4 bg-gray-100 rounded w-full mb-2" />
        <div className="h-4 bg-gray-100 rounded w-5/6 mb-2" />
        <div className="h-4 bg-gray-100 rounded w-1/2" />
        <div className="mt-auto h-5 w-28 bg-blue-100 rounded" />
      </div>
    </div>
  );
}

export default function EventList({ events }: EventListProps) {
  if (!events) {
    // Show 4 skeletons while loading
    return (
      <div className="grid sm:grid-cols-2 gap-6 md:gap-8 animate-fadein">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }
  if (events.length === 0) return <p>No events found.</p>;

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 animate-fadein">
      {events.map((event, idx) => (
        <div key={event.id} style={{ animationDelay: `${idx * 60}ms` }} className="animate-fadein">
          <EventCard event={event} />
        </div>
      ))}
    </div>
  );
}
