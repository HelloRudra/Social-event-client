export default function SectionHeading({ title, subtitle }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <h2 className="text-3xl font-bold text-primary md:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-base leading-relaxed text-base-content/70">
          {subtitle}
        </p>
      )}
    </div>
  );
}
