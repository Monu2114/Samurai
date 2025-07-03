export default function ContentSection({
  title,
  points,
}: {
  title: string;
  points: string[];
}) {
  return (
    <div className="space-y-4">
      {points.map((point, index) => (
        <p className="" key={index}>
          {point}
        </p>
      ))}
    </div>
  );
}
