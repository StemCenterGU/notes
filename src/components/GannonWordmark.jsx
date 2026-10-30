/**
 * The Gannon University wordmark.
 *
 * The asset is Gannon's own wordmark (gannon.edu), which ships as a single
 * flat gold PNG. Gold is illegible on this app's light paper background, so
 * rather than keep recoloured copies of the file, the PNG is used as a CSS
 * mask and the colour comes from a theme token: Gannon maroon in light mode,
 * Gannon gold in dark. Both are the university's own brand colours, and there
 * is one asset to swap if the mark is ever updated.
 *
 * A mask is a background, not an <img>, so it needs explicit dimensions. The
 * width below keeps the source's 1098x353 aspect ratio at a 15px cap height.
 */
const WORDMARK = "/brand/gannon-wordmark.png"

export function GannonWordmark({ className = "" }) {
  return (
    <span
      role="img"
      aria-label="Gannon University"
      className={`block h-[15px] w-[47px] shrink-0 bg-primary dark:bg-warning ${className}`}
      style={{
        maskImage: `url(${WORDMARK})`,
        WebkitMaskImage: `url(${WORDMARK})`,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskPosition: "left center",
        WebkitMaskPosition: "left center",
      }}
    />
  )
}
