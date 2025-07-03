"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

const parseSection = (section: string) => {
  const [title, ...content] = section.split("\n");

  const cleanTitle = title.startsWith("#")
    ? title.substring(1).trim()
    : title.trim();

  const points: String[] = [];
  let currentPoint = "";
  content.forEach((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith("•")) {
      if (currentPoint) points.push(currentPoint.trim());
      currentPoint = trimmedLine;
    } else if (!trimmedLine) {
      if (currentPoint) points.push(currentPoint.trim());
      currentPoint = "";
    } else {
      currentPoint += " " + trimmedLine;
    }
  });
  if (currentPoint) points.push(currentPoint.trim());
  return {
    cleanTitle,
    points: points.filter(
      (point) => point && !point.startsWith("#") && !point.startsWith("[Choose")
    ),
  };
};

export function SummaryViewer({ summary }: { summary: string }) {
  const sections = summary
    .split("\n# ")
    .map((section) => section.trim())
    .filter(Boolean)
    .map(parseSection);

  const [currentSection, setCurrentSection] = useState(0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{sections[currentSection].cleanTitle}</CardTitle>
      </CardHeader>
      <CardContent>{JSON.stringify(sections)}</CardContent>
      <CardContent>
        {sections[currentSection].points.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </CardContent>
    </Card>
  );
}
