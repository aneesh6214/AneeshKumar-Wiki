interface WikiFigureProps {
  number: number;
  caption: string;
  children: React.ReactNode;
  float?: "left" | "right" | "none";
  width?: string;
}

export default function WikiFigure({
  number,
  caption,
  children,
  float = "none",
  width,
}: WikiFigureProps) {
  const floatClass =
    float === "right"
      ? "sm:float-right sm:ml-6"
      : float === "left"
        ? "sm:float-left sm:mr-6"
        : "";
  return (
    <figure
      className={`border border-[#a2a9b1] bg-[#f8f9fa] p-2 my-4 inline-block max-w-full ${floatClass}`}
      style={width ? { width } : undefined}
    >
      <div className="bg-white border border-[#eaecf0] p-2">{children}</div>
      <figcaption className="text-xs text-[#202122] mt-2 px-1 italic font-serif leading-snug">
        <span className="font-bold not-italic font-sans mr-1">
          Figure {number}.
        </span>
        {caption}
      </figcaption>
    </figure>
  );
}
