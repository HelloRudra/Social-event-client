import {
  FaCalendarPlus,
  FaHandHoldingHeart,
  FaMapMarkedAlt,
  FaUsers,
} from "react-icons/fa";
import SectionHeading from "./SectionHeading";

const features = [
  {
    icon: FaCalendarPlus,
    title: "Create Events",
    text: "Plan a cleanup, plantation or donation drive in minutes and set the place and date.",
  },
  {
    icon: FaUsers,
    title: "Join with One Click",
    text: "Sign up for any upcoming event and see everything you joined in one list.",
  },
  {
    icon: FaMapMarkedAlt,
    title: "Find Local Events",
    text: "Filter by event type and search by title to find work happening near you.",
  },
  {
    icon: FaHandHoldingHeart,
    title: "Manage Your Work",
    text: "Edit or remove the events you created whenever plans change.",
  },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading
        title="Why SebaHub"
        subtitle="Everything a neighbourhood needs to organise and show up for social service."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="h-full rounded-box border border-base-300 bg-base-100 p-6 text-center shadow-md"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Icon size={24} />
            </div>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-base-content/70">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
