function parsePoint(point: string) {
  const isNumbered = /^\d+\./.test(point);
  const isMainPoint = /^\*/.test(point);

  // Replace the Unicode property escape with a simpler
  // emoji detection
  const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/u;
  const hasEmoji = emojiRegex.test(point);

  const isEmpty = !point.trim();

  return { isNumbered, isMainPoint, hasEmoji, isEmpty };
}

// Helper function: parseEmojiPoint (small adjustment for robustness)
function parseEmojiPoint(content: string) {
  const cleanContent = content.replace(/^[\*\s]*/, "").trim();

  const matches = cleanContent.match(/^(\p{Emoji}+)\s*(.*)$/u);

  if (!matches) {
    return null;
  }

  const [_, emoji, text] = matches;

  return {
    emoji: emoji ? emoji.trim() : null, // Ensure emoji is not undefined before trimming
    text: text ? text.trim() : "", // Ensure text is not undefined before trimming
  };
}
export default function ContentSection({ points }: { points: string[] }) {
  // Handle the case where parseEmojiPoint returns null

  // If not an emoji or main point, render as a regular paragraph
  // Assuming this is the default rendering for other points.
  // If you want nothing to be rendered for such points, return null.
  return (
    <div className="space-y-4">
      {points.map((point, index) => {
        const { isNumbered, isMainPoint, hasEmoji, isEmpty } =
          parsePoint(point);
        const parsed = parseEmojiPoint(point);
        if (parsed) {
          const emoji = parsed.emoji;
          const text = parsed.text;
          console.log({ emoji, text });
          if (hasEmoji || isMainPoint) {
            return (
              <div
                key={`point-${index}`}
                className="group relative bg-linear-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all"
              >
                <div className="absolute inset-0 bg-linear-to-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative flex items-start gap-3">
                  <span className="text-lg lg:text-xl shrink-0 pt-1">
                    {/* Assuming 'emoji' is a variable or prop available in this scope */}
                    {emoji}
                  </span>
                  <p className="text-lg lg:text-xl text-muted-foreground/90 leading-relaxed">
                    {/* Assuming 'text' is a variable or prop available in this scope */}
                    {text}
                  </p>
                </div>
              </div>
            );
          }
        }
        return (
          <div
            key={`point-${index}`}
            className="group relative bg-linear-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all"
          >
            <p>{point}</p>
          </div>
        );
      })}
    </div>
  );
}
