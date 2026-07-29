export type EditorialContentProps = {
  headingId: string;
  kicker: string;
  title: string;
  introduction: string;
  paragraphs: readonly string[];
};

export function EditorialContent({
  headingId,
  kicker,
  title,
  introduction,
  paragraphs,
}: EditorialContentProps) {
  return (
    <article className="min-w-0">
      <header className="border-b border-white/[0.08] px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
        <p
          className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-[#ccff00]"
          data-about-reveal
        >
          {kicker}
        </p>
        <h2
          id={headingId}
          className="mt-5 max-w-[17ch] text-[clamp(2.25rem,5vw,5rem)] font-medium leading-[0.98] tracking-[-0.04em] text-white"
          data-about-reveal
        >
          {title}
        </h2>
      </header>

      <div className="grid border-b border-white/[0.08] md:grid-cols-2">
        <p
          className="border-b border-white/[0.08] px-5 py-8 text-[1.0625rem] leading-[1.6] tracking-[-0.015em] text-white/88 sm:px-8 sm:text-base md:border-b-0 md:border-r lg:px-10 lg:py-10"
          data-about-reveal
        >
          {introduction}
        </p>

        <div className="divide-y divide-white/[0.08]">
          {paragraphs.map((paragraph, index) => (
            <p
              key={`${index}-${paragraph.slice(0, 24)}`}
              className="px-5 py-7 text-[1.0625rem] leading-[1.6] text-[#a1a1aa] sm:px-8 sm:text-base lg:px-10"
              data-about-reveal
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
