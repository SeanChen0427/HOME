import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const images = [
  ["/private/tmp/sean-hero.png", "public/images/home-hero-placeholder.webp"],
  ["/private/tmp/sean-course.png", "public/images/course-placeholder.webp"],
  ["/private/tmp/sean-tools.png", "public/images/tools-placeholder.webp"],
  ["/private/tmp/sean-consulting.png", "public/images/consulting-placeholder.webp"],
];

await mkdir("public/images", { recursive: true });

await Promise.all(
  images.map(([input, output]) =>
    sharp(input).webp({ quality: 78, effort: 5 }).toFile(output),
  ),
);

console.log("Optimized homepage images.");
