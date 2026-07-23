interface SectionHeadingProps {
  title: string;
  description?: string;
  centered?: boolean;
}

export default function SectionHeading({
  title,
  description,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div className={`mb-10 ${centered ? "text-center" : ""}`}>
      <h2 className="text-[clamp(28px,4vw,40px)] font-bold text-text-primary tracking-tight leading-tight mb-3">
        {title}
      </h2>
      {description && (
        <p className="text-base text-text-secondary leading-relaxed max-w-lg">
          {description}
        </p>
      )}
    </div>
  );
}
