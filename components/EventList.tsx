import { Event } from "@/pages/index";
import EventCard from "./EventCard";

type EventListProps = {
  events: Event[];
};

export default function EventList({ events }: EventListProps) {
  if (events.length === 0) return <p>No events found.</p>;

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
