import { containerVariants, itemVariants } from "@/utils/constants";
import { MotionDiv } from "../common/motion-wrapper";

function parsePoint(point: string) {
  const isNumbered = /^\d+\./.test(point);
  const isMainPoint = /^\*/.test(point);

  const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/u;
  const hasEmoji = emojiRegex.test(point);

  const isEmpty = !point.trim();

  return { isNumbered, isMainPoint, hasEmoji, isEmpty };
}

function parseEmojiPoint(content: string) {
  const cleanContent = content.replace(/^[\*\s]*/, "").trim();

  const matches = cleanContent.match(/^(\p{Emoji}+)\s*(.*)$/u);

  if (!matches) return null;

  const [_, emoji, text] = matches;

  return {
    emoji: emoji ? emoji.trim() : null,
    text: text ? text.trim() : "",
  };
}

export default function ContentSection({ points }: { points: string[] }) {
  return (
    <MotionDiv
      variants={containerVariants}
      key={points.join("")}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} // 👈 animate only once when ~20% in view
      className="space-y-4"
    >
      {points.map((point, index) => {
        const { isNumbered, isMainPoint, hasEmoji, isEmpty } =
          parsePoint(point);
        const parsed = parseEmojiPoint(point);

        if (parsed) {
          const emoji = parsed.emoji;
          const text = parsed.text;

          if (hasEmoji || isMainPoint) {
            return (
              <MotionDiv
                key={`point-${index}`}
                variants={itemVariants}
                className="group relative bg-linear-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all"
              >
                <div className="absolute inset-0 bg-linear-to-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative flex items-start gap-3">
                  <span className="text-lg lg:text-xl shrink-0 pt-1">
                    {emoji}
                  </span>
                  <p className="text-lg lg:text-xl text-muted-foreground/90 leading-relaxed">
                    {text}
                  </p>
                </div>
              </MotionDiv>
            );
          }
        }

        return (
          <MotionDiv
            key={`point-${index}`}
            variants={itemVariants}
            className="group relative bg-linear-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all"
          >
            <p>{point}</p>
          </MotionDiv>
        );
      })}
    </MotionDiv>
  );
}
