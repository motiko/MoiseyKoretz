export default function (eleventyConfig) {
  for (const path of ["images", "site.css", "favicon.svg", ".nojekyll"]) {
    eleventyConfig.addPassthroughCopy({ [path]: path });
  }
}

export const config = {
  dir: { input: "src", output: "_site" },
  // Page bodies are plain HTML from the archive; never run them through a template engine.
  htmlTemplateEngine: false,
};
