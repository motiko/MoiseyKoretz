import responsiveImages from "./lib/responsive-images.js";
import siteUrls from "./lib/site-urls.js";

export default function (eleventyConfig) {
  for (const path of ["images", "site.css", "favicon.svg", ".nojekyll"]) {
    eleventyConfig.addPassthroughCopy({ [path]: path });
  }

  // Resized WebP/JPEG copies of the scans on the home and Фотографии pages.
  eleventyConfig.addPlugin(responsiveImages);
  // absoluteUrl filter for canonical, Open Graph and sitemap URLs.
  eleventyConfig.addPlugin(siteUrls);
}

export const config = {
  dir: { input: "src", output: "_site" },
  // Page bodies are plain HTML from the archive; never run them through a template engine.
  htmlTemplateEngine: false,
};
