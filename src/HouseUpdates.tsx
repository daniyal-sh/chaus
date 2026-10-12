import { ArrowUpRight, Instagram, Sparkles, Coffee } from "lucide-react";
import { links } from "./data";

export const socialPosts = [
  {
    image: 2,
    url: "https://www.instagram.com/p/Dd9DCrmkeRN/",
    label: "October flavor board",
    text: "pumpkin spice + cold foam!",
  },
  {
    image: 1,
    url: "https://www.instagram.com/p/Dd8f4O1RpXb/",
    label: "Keeper of the month",
    text: "Asianna + the Whimstea",
  },
  {
    image: 3,
    url: "https://www.instagram.com/p/DdPsWdQEf7Q/",
    label: "Made by the house",
    text: "chaüs tees at the register",
  },
  {
    image: 5,
    url: "https://www.instagram.com/p/DcygsHuEVlg/",
    label: "September flavor board",
    text: "dulce de leche drinks",
  },
];
export function SeasonalBoard() {
  return (
    <section className="seasonal-section">
      <div className="container seasonal-grid">
        <a
          className="seasonal-poster"
          href={socialPosts[0].url}
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="/images/social/instagram-2.jpg"
            alt="Chaus's October 2026 pumpkin spice poster, with hand-drawn drinks, stars, and pumpkin vines"
            width="1080"
            height="1080"
            loading="lazy"
          />
          <span>
            <Instagram size={15} /> @ricecoffeehouse <ArrowUpRight size={16} />
          </span>
        </a>
        <div className="seasonal-copy">
          <p className="eyebrow">
            <Sparkles size={17} /> OCTOBER ’26 DRINKS
          </p>
          <h2>
            <span>spooky season!</span>
          </h2>

          <div className="seasonal-drinks">
            {[
              [
                "01",
                "Pumpkin spice latte",
                "Espresso, pumpkin spice & pumpkin cold foam.",
              ],
              ["02", "Spooky chai", "pumpkin spice + cold foam chai."],
              ["03", "Tira-miss u", "white chocolate + tiramisu + cocoa."],
              [
                "04",
                "Pink colada",
                "lemonade + coconut milk + strawberry + hibiscus.",
              ],
            ].map(([n, t, d]) => (
              <div key={n}>
                <span>{n}</span>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </div>
            ))}
          </div>
          <a
            href={socialPosts[0].url}
            target="_blank"
            rel="noreferrer"
            className="button seasonal-button"
          >
            all the october drinks <ArrowUpRight size={18} />
          </a>
          <p className="seasonal-small">
            <Coffee size={14} /> Ask a KOC about today’s specials.
          </p>
        </div>
      </div>
    </section>
  );
}
export function SocialWall() {
  return (
    <section className="social-wall container">
      <div className="section-heading">
        <div>
          <p className="eyebrow">@RICECOFFEEHOUSE</p>
          <h2>
            <span>from the feed.</span>
          </h2>
        </div>
        <a
          href={links.instagram}
          target="_blank"
          rel="noreferrer"
          className="text-button"
        >
          <Instagram size={17} /> @ricecoffeehouse <ArrowUpRight size={18} />
        </a>
      </div>
      <div className="social-post-grid">
        {socialPosts.map((post) => (
          <a
            className="social-post"
            href={post.url}
            target="_blank"
            rel="noreferrer"
            key={post.image}
          >
            <div className="social-post-image">
              <img
                src={`/images/social/instagram-${post.image}.jpg`}
                alt={post.label + " — " + post.text}
                width="1080"
                height="1080"
                loading="lazy"
              />
              <span>
                <Instagram size={18} />
              </span>
            </div>
            <div className="social-post-caption">
              <span className="eyebrow">{post.label}</span>
              <ArrowUpRight size={18} />
            </div>
          </a>
        ))}
      </div>
      <p className="social-source">
        follow along @ricecoffeehouse
      </p>
    </section>
  );
}
