import SectionHeading from "./SectionHeading";

const photos = [
  { src: "/gallery/g1.jpg", alt: "Volunteers handing out winter clothes" },
  { src: "/gallery/g2.jpg", alt: "Neighbours planting young trees" },
  { src: "/gallery/g3.jpg", alt: "Street cleanup in progress" },
  { src: "/gallery/g4.jpg", alt: "Food packets ready for distribution" },
  { src: "/gallery/g5.jpg", alt: "Free health camp for families" },
  { src: "/gallery/g6.jpg", alt: "Children at a community learning session" },
];

export default function Gallery() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading
        title="Moments from the Field"
        subtitle="A look at the kind of work our community does together."
      />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {photos.map((p) => (
          <div key={p.src} className="group overflow-hidden rounded-box">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.src}
              alt={p.alt}
              className="h-48 w-full object-cover transition duration-300 group-hover:scale-110 md:h-64"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
