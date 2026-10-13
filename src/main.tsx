import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Heart,
  MapPin,
  Clock,
  Coffee,
  Search,
  X,
  Menu as MenuIcon,
  Sparkles,
  Instagram,
  Leaf,
  Check,
  Download,
  Plus,
  Minus,
  Mail,
  Phone,
  Music,
  Printer,
} from "lucide-react";
import {
  menu,
  extras,
  links,
  managers,
  cateringMenu,
  type MenuItem,
} from "./data";
import { shopStatus, money, filterMenu } from "./logic.mjs";
import { Spark } from "./Illustrations";
import { ChausMascot as Squirrel, FlavorArt as DrinkArt } from "./BrandArtwork";
import { SeasonalBoard, SocialWall } from "./HouseUpdates";
import { OriginalCopy } from "./OriginalCopy";
import { updateMetadata } from "./metadata";
import { sitePath } from "./sitePath";
import { withoutBase } from "./paths.mjs";
import "./styles.css";
import "./chaus-v2.css";
import "./chaus-theme.css";

const routes = [
  "/",
  "/menu",
  "/about",
  "/catering",
  "/community",
  "/sustainability",
  "/visit",
  "/managers",
  "/policies",
];
function resolvePath() {
  const raw = withoutBase(location.pathname, import.meta.env.BASE_URL).replace(/\/+$/, "") || "/";
  const aliases: Record<string, string> = {
    "/contact": "/visit",
    "/apply": "/community",
    "/covid": "/policies",
    "/1": "/",
  };
  const canonical = aliases[raw] || raw;
  return routes.includes(canonical) ? canonical : "/404";
}
function readSaved(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem("chaus-favorites") || "[]");
    return Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}
function External({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  );
}
const NavigationContext = React.createContext<(to: string) => void>(() => {});
function Nav({
  to,
  children,
  className = "",
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) {
  const navigate = React.useContext(NavigationContext);
  return (
    <a
      href={sitePath(to)}
      className={className}
      onClick={(e) => {
        if (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
          e.preventDefault();
          navigate(to);
        }
      }}
    >
      {children}
    </a>
  );
}

function App() {
  const [path, setPath] = useState(resolvePath);
  const [mobile, setMobile] = useState(false);
  const [saved, setSaved] = useState<string[]>(readSaved);
  const [detail, setDetail] = useState<MenuItem | null>(null);
  const [quiz, setQuiz] = useState(false);
  const [status, setStatus] = useState(shopStatus());
  useEffect(() => {
    const fn = () => {
      setPath(resolvePath());
      setMobile(false);
    };
    window.addEventListener("popstate", fn);
    const timer = setInterval(() => setStatus(shopStatus()), 60000);
    return () => {
      window.removeEventListener("popstate", fn);
      clearInterval(timer);
    };
  }, []);
  useEffect(() => {
    if (path !== "/404" && location.pathname !== sitePath(path)) {
      history.replaceState({}, "", `${sitePath(path)}${location.search}${location.hash}`);
    }
    updateMetadata(path);
    setMobile(false);
  }, [path]);
  const navigate = React.useCallback((to: string) => {
    history.pushState({}, "", sitePath(to));
    setPath(to);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  function toggleSave(id: string) {
    setSaved((old) => {
      const next = old.includes(id)
        ? old.filter((x) => x !== id)
        : [...old, id];
      try {
        localStorage.setItem("chaus-favorites", JSON.stringify(next));
      } catch {}
      return next;
    });
  }
  const goMenu = () => {
    navigate("/menu");
    setTimeout(() => document.getElementById("menu-search")?.focus(), 100);
  };
  return (
    <NavigationContext.Provider value={navigate}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="header">
        <div className="nav-wrap">
          <Nav to="/" className="brand">
            <img
              className="brand-roundel"
              src={sitePath("/images/avatar.jpg")}
              alt=""
              width="48"
              height="48"
            />
            <span className="wordmark">
              chaüs<span className="logo-star">✳</span>
            </span>
            <span className="brand-sub">RICE COFFEEHOUSE</span>
          </Nav>
          <nav className="desktop-nav" aria-label="Main navigation">
            {[
              ["/menu", "The menu"],
              ["/about", "Our story"],
              ["/catering", "Catering"],
              ["/community", "Around the house"],
            ].map(([to, label]) => (
              <Nav key={to} to={to} className={path === to ? "active" : ""}>
                {label}
              </Nav>
            ))}
          </nav>
          <div className="nav-actions">
            <button
              className="icon-button search-button"
              aria-label="Search the menu"
              onClick={goMenu}
            >
              <Search size={20} />
            </button>
            <Nav to="/visit" className="button small">
              Come on over <ArrowUpRight size={17} />
            </Nav>
            <button
              className="mobile-toggle icon-button"
              onClick={() => setMobile(!mobile)}
              aria-label={mobile ? "Close navigation" : "Open navigation"}
              aria-expanded={mobile}
              aria-controls="mobile-nav"
            >
              {mobile ? <X /> : <MenuIcon />}
            </button>
          </div>
        </div>
        {mobile && (
          <nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Mobile navigation"
          >
            {[
              ["/", "Home"],
              ["/menu", "The menu"],
              ["/about", "Our story"],
              ["/catering", "Catering"],
              ["/community", "Around the house"],
              ["/sustainability", "Sustainability"],
              ["/visit", "Visit & contact"],
            ].map(([to, label]) => (
              <Nav to={to} key={to}>
                {label}
                <ArrowUpRight size={18} />
              </Nav>
            ))}
          </nav>
        )}
      </header>
      <main id="main">
        {path === "/" && (
          <>
            <section className="hero container">
              <div className="hero-copy">
                <p className="eyebrow">
                  <span className="tiny-spark">✳</span> STUDENT RUN SINCE 1990
                </p>
                <h1>
                  <span className="hero-first-line">a little coffee.</span>
                  <span className="hero-chaos-line">
                    a lot of <em>chaüs.</em>
                  </span>
                </h1>
                <p className="hero-description">
                  coffee, community, and a little shenanigans.
                </p>
                <div className="hero-buttons">
                  <Nav to="/menu" className="button">
                    our menu <ArrowUpRight size={18} />
                  </Nav>
                  <button className="text-button" onClick={() => setQuiz(true)}>
                    find your drink <Sparkles size={17} />
                  </button>
                </div>
                <div className="hero-visit">
                  <span className="status-dot" data-open={status.open} />
                  <span>
                    {status.label}
                    <small>Fall ’26 schedule · Houston time</small>
                  </span>
                  <span className="visit-separator" />
                  <Nav to="/visit">
                    <MapPin size={16} /> Rice Memorial Center{" "}
                    <ArrowUpRight size={13} />
                  </Nav>
                </div>
              </div>
              <div className="hero-visual">
                <span className="hero-note">
                  see you
                  <br />
                  at chaüs ♡
                </span>
                <div className="hero-checker" aria-hidden="true" />
                <img
                  className="hero-mascot"
                  src={sitePath("/images/chaus-mascot-v2.webp")}
                  alt="A smiling Chaus squirrel hugging an iced coffee"
                  width="1254"
                  height="1254"
                  fetchPriority="high"
                />
                <span className="hero-sticker sticker-green">
                  100% student run
                  <br />
                  <strong>100% chaüs.</strong>
                </span>
                <span className="hero-sticker sticker-yellow">
                  LLCH!{" "}
                  <span>
                    long live
                    <br />
                    coffeehouse.
                  </span>
                </span>
                <div className="since-stamp">
                  EST.<strong>1990</strong>RICE COFFEEHOUSE
                </div>
              </div>
            </section>
            <div className="ticker" aria-hidden="true">
              <div>
                {Array.from({ length: 4 }, (_, i) => (
                  <React.Fragment key={i}>
                    <span>GOOD COFFEE</span>
                    <Spark />
                    <span>GOOD PEOPLE</span>
                    <Spark />
                    <span>YOUR DAILY DOSE OF CHAÜS</span>
                    <Spark />
                  </React.Fragment>
                ))}
              </div>
            </div>
            <section className="favorites container">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">CHAUS CLASSICS</p>
                  <h2>
                    meet the <span className="hand-accent">chaus classics.</span>
                  </h2>
                </div>
                <Nav to="/menu" className="text-button">
                  full menu <ArrowUpRight size={20} />
                </Nav>
              </div>
              <div className="featured-grid">
                {menu.slice(0, 3).map((item) => (
                  <DrinkCard
                    key={item.id}
                    item={item}
                    saved={saved.includes(item.id)}
                    onSave={() => toggleSave(item.id)}
                    onOpen={() => setDetail(item)}
                    featured
                  />
                ))}
              </div>
              <p className="menu-footnote">
                <Coffee size={16} /> student-made. student-priced.
              </p>
            </section>
            <SeasonalBoard />
            <section className="story-section">
              <div className="container story-grid">
                <div className="photo-collage">
                  <div className="photo-paper">
                    <img
                      src={sitePath("/images/crew.webp")}
                      alt="Coffeehouse crew raising cups together inside Chaus"
                      loading="lazy"
                    />
                    <span>the people make the place. ♡</span>
                  </div>
                  <div className="mini-paper">
                    <img
                      src={sitePath("/images/chaus.webp")}
                      alt="A group of Chaus students celebrating together"
                      loading="lazy"
                    />
                  </div>
                  <div className="round-badge">
                    100%
                    <br />
                    <strong>
                      student
                      <br />
                      run
                    </strong>
                    <span>100% OUR KIND OF PEOPLE</span>
                  </div>
                  <Spark className="collage-spark" />
                </div>
                <div className="story-copy">
                  <p className="eyebrow">KEEPERS OF COFFEE</p>
                  <h2>what’s chaüs?</h2>
                  <p>
                    KOCs = keepers of coffee. rice students behind the counter.
                  </p>

                  <Nav to="/about" className="button light">
                    about chaüs <ArrowUpRight size={18} />
                  </Nav>
                </div>
              </div>
            </section>
            <section className="community-section container">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">LLCH!</p>
                  <h2>Around the house.</h2>
                </div>
                <Nav to="/community" className="text-button">
                  more from chaüs <ArrowUpRight size={20} />
                </Nav>
              </div>
              <div className="notice-grid">
                <Notice
                  type="lavender"
                  tag="AFTER HOURS"
                  title="Chaüs After Dark"
                  text="barista lessons, cold brew, and your music on the aux."
                  icon={<Music />}
                  href={links.afterDark}
                  cta="Plan your night"
                />
                <Notice
                  type="green"
                  tag="JOIN THE CREW"
                  title="become a KOC!"
                  text="applications are closed. follow us for the next round!"
                  icon={<Squirrel />}
                  href={links.socials}
                  cta="hiring updates"
                />
                <Notice
                  type="pink"
                  tag="ESPRESSO YOURSELF"
                  title="espresso yourself."
                  text="student art, artist talks, and creative things."
                  icon={<Spark />}
                  href={links.art}
                  cta="artist updates"
                />
              </div>
            </section>
            <section className="green-banner">
              <div className="container">
                <div className="mug-doodle">
                  <Coffee size={62} strokeWidth={1.3} />
                  <Leaf size={32} />
                </div>
                <div>
                  <p className="eyebrow">BRING YOUR OWN MUG</p>
                  <h2>your mug. 95¢ drip.</h2>
                  <p>less waste, more coffee.</p>
                </div>
                <Nav to="/sustainability" className="button outline">
                  sustainability <ArrowUpRight size={18} />
                </Nav>
              </div>
            </section>
            <SocialWall />
            <VisitSection status={status} Nav={Nav} />
          </>
        )}
        {path === "/menu" && (
          <MenuPage
            saved={saved}
            onSave={toggleSave}
            onOpen={setDetail}
            onQuiz={() => setQuiz(true)}
          />
        )}
        {path === "/about" && (
          <>
            <PageIntro
              eyebrow="HI, WE’RE CHAUS"
              title={<>what’s coffeehouse?</>}
              text="run by rice students, for the rice and houston community."
            />
            <section className="container about-grid">
              <div className="about-photo">
                <img
                  src={sitePath("/images/crew.webp")}
                  alt="Keepers of Coffee celebrating together at Chaus"
                />
                <span className="handwritten">long live coffeehouse.</span>
              </div>
              <div>
                <p className="eyebrow">RUN BY STUDENTS. MADE FOR EVERYONE.</p>
                <h2>Your campus living room.</h2>
                <p>
                  our baristas are keepers of coffee — KOCs. all rice students,
                  all about coffee.
                </p>
                <p>
                  students run the whole house: drinks, catering, training, and
                  everything in between.
                </p>

                <div className="button-row">
                  <Nav to="/managers" className="button">
                    Meet the managers <ArrowUpRight size={17} />
                  </Nav>
                  <External href={links.socials} className="text-button">
                    Become a KOC <ArrowUpRight size={17} />
                  </External>
                </div>
              </div>
            </section>
            <section className="container values-section">
              <p className="eyebrow">THE THINGS WE KEEP CLOSE</p>
              <h2>A little coffee. A lot of care.</h2>
              <div className="values-grid">
                {[
                  ["01", "People first", "a home for rice and houston."],
                  [
                    "02",
                    "Small footprint",
                    "local coffee. reusable mugs. less waste.",
                  ],
                  ["03", "Room to create", "a space for student art."],
                ].map(([n, t, d]) => (
                  <article key={n}>
                    <span className="value-number">{n}</span>
                    <h3>{t}</h3>
                    <p>{d}</p>
                  </article>
                ))}
              </div>
            </section>
            <div className="container story-links">
              <Nav to="/sustainability">
                sustainability <ArrowUpRight />
              </Nav>
              <Nav to="/community">
                around chaüs <ArrowUpRight />
              </Nav>
            </div>
          </>
        )}
        {path === "/catering" && <CateringPage />}
        {path === "/community" && <CommunityPage />}
        {path === "/sustainability" && <SustainabilityPage />}
        {path === "/visit" && (
          <>
            <PageIntro
              eyebrow="THERE’S A SPOT FOR YOU HERE"
              title={<>come hang!</>}
              text="rice memorial center, next to the bookstore."
            />
            <VisitSection status={status} Nav={Nav} full />
            <ContactSection />
            <FAQ />
          </>
        )}
        {path === "/managers" && (
          <>
            <PageIntro
              eyebrow="THE PEOPLE BEHIND THE COUNTER"
              title={<>our managers.</>}
              text="meet the students behind chaüs."
            />
            <section className="container team-section">
              <div className="archive-note">
                <Clock size={20} />
                <div>
                  <strong>The 2024–2025 management team</strong>
                  <p>
                    Have a question for the team? Get in touch below.
                  </p>
                </div>
              </div>
              <div className="team-grid">
                {managers.map(([name, role, college, photo]) => (
                  <article className="team-card" key={name}>
                    <div className="team-photo">
                      <img
                        src={sitePath(photo)}
                        alt={name}
                        width="640"
                        height="800"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <p className="eyebrow">{role}</p>
                    <h3>{name}</h3>
                    <p>{college}</p>
                  </article>
                ))}
              </div>
              <a href="mailto:ricecoffeehouse@gmail.com" className="button">
                contact us <Mail size={18} />
              </a>
            </section>
          </>
        )}
        {path === "/policies" && (
          <>
            <PageIntro
              eyebrow="GOOD TO KNOW"
              title="good to know."
              text="ordering, policies, and privacy."
            />
            <section className="container policy-content">
              <h2>Ordering & seating</h2>
              <p>
                Order at the counter, grab a seat, and stay a while. For
                access needs, allergies, or questions about your visit,
                call <a href="tel:+17133488073">(713) 348-8073</a> or ask a KOC.
              </p>
              <h2>Your privacy here</h2>
              <p>
                Saved drinks stay in your browser. Messages open in your email
                app for you to send. Linked forms have their own privacy policies.
              </p>
              <button
                className="text-button"
                onClick={() => {
                  setSaved([]);
                  try {
                    localStorage.removeItem("chaus-favorites");
                  } catch {}
                }}
              >
                clear favorites <X size={16} />
              </button>
            </section>
          </>
        )}
        {path === "/404" && (
          <PageIntro
            eyebrow="A LITTLE TOO MUCH CHAOS"
            title="This cup is empty."
            text="We couldn’t find that page. Come back to the house."
          />
        )}
        <OriginalCopy key={path} page={path} />
      </main>
      <footer className="footer">
        <div className="container footer-main">
          <div className="footer-brand">
            <Nav to="/" className="wordmark">
              chaüs<span className="logo-star">✳</span>
            </Nav>
            <p>
              Good coffee. Good people.
              <br />
              Your daily dose of Chaus.
            </p>
            <div className="social-links">
              <External href={links.instagram} className="icon-button">
                <Instagram aria-label="Instagram" size={21} />
              </External>
              <External href={links.facebook}>Facebook ↗</External>
              <External href={links.socials}>All our socials ↗</External>
            </div>
          </div>
          <div>
            <p className="eyebrow">TAKE A LOOK AROUND</p>
            <Nav to="/menu">The menu</Nav>
            <Nav to="/about">Our story</Nav>
            <Nav to="/managers">Meet the managers</Nav>
            <Nav to="/sustainability">Sustainability</Nav>
          </div>
          <div>
            <p className="eyebrow">MAKE YOURSELF AT HOME</p>
            <Nav to="/catering">Catering</Nav>
            <External href="mailto:ricecoffeehouse@gmail.com?subject=Coffee%20voucher%20inquiry">
              Coffee vouchers ↗
            </External>
            <External href={links.afterDark}>Chaus After Dark ↗</External>
            <External href={links.socials}>Become a KOC ↗</External>
          </div>
          <div>
            <p className="eyebrow">FIND THE HOUSE</p>
            <Nav to="/visit">
              Rice Memorial Center
              <br />
              6100 Main St.
              <br />
              Houston, TX 77005
            </Nav>
            <a href="mailto:ricecoffeehouse@gmail.com">
              Say hello <ArrowUpRight size={14} />
            </a>
            <a href="tel:+17133488073">(713) 348-8073</a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} Rice Coffeehouse · Student run since
            1990
          </span>
          <Nav to="/policies">Visitor info & privacy</Nav>
          <span>
            Made with love & a little caffeine. <Heart size={13} />
          </span>
        </div>
      </footer>
      {detail && (
        <DrinkDialog
          item={detail}
          saved={saved.includes(detail.id)}
          onSave={() => toggleSave(detail.id)}
          onClose={() => setDetail(null)}
        />
      )}
      {quiz && (
        <Quiz
          onClose={() => setQuiz(false)}
          onOpen={(item) => {
            setQuiz(false);
            setDetail(item);
          }}
        />
      )}
    </NavigationContext.Provider>
  );
}

function PageIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: React.ReactNode;
  text: string;
}) {
  return (
    <section className="page-intro container">
      <p className="eyebrow">
        <Spark className="intro-spark" />
        {eyebrow}
      </p>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  );
}
function DrinkCard({
  item,
  saved,
  onSave,
  onOpen,
  featured = false,
}: {
  item: MenuItem;
  saved: boolean;
  onSave: () => void;
  onOpen: () => void;
  featured?: boolean;
}) {
  return (
    <article className={`drink-card ${featured ? "featured" : ""}`}>
      <div className={`drink-picture ${item.color || "yellow"}`}>
        <span className="drink-label">
          {item.tag || item.category.toUpperCase()}
        </span>
        <button
          className={`favorite-button ${saved ? "saved" : ""}`}
          aria-label={`${saved ? "Unsave" : "Save"} ${item.name}`}
          aria-pressed={saved}
          onClick={onSave}
        >
          <Heart size={18} fill={saved ? "currentColor" : "none"} />
        </button>
        <button
          className="art-button"
          onClick={onOpen}
          aria-label={`View ${item.name}`}
        >
          <DrinkArt
            itemId={item.id}
            type={item.category === "Bites" ? "pastry" : item.art || "cup"}
          />
        </button>
      </div>
      <div className="drink-info">
        <button className="card-title" onClick={onOpen}>
          <h3>{item.name}</h3>
          <ArrowUpRight size={21} />
        </button>
        <p>{item.description}</p>
        <div className="print-prices">
          {item.sizes.map((size, i) => (
            <span key={size}>
              {size}: {money(item.prices[i])}
            </span>
          ))}
        </div>
        <div className="drink-meta">
          <span>from {money(item.prices[0])}</span>
          <span>
            {item.category === "Bites"
              ? "BAKED WITH LOVE"
              : item.hot && item.iced
                ? "HOT / ICED"
                : item.hot
                  ? "HOT"
                  : item.iced
                    ? "ICED"
                    : "YOUR WAY"}
          </span>
        </div>
      </div>
    </article>
  );
}
function Notice({
  type,
  tag,
  title,
  text,
  icon,
  href,
  cta,
}: {
  type: string;
  tag: string;
  title: string;
  text: string;
  icon: React.ReactNode;
  href: string;
  cta: string;
}) {
  return (
    <article className={`notice ${type}`}>
      <div className="notice-top">
        <span className="eyebrow">{tag}</span>
        <span className="notice-icon">{icon}</span>
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
      <External href={href} className="text-button">
        {cta} <ArrowUpRight size={18} />
      </External>
    </article>
  );
}

type NavType = React.ComponentType<{
  to: string;
  children: React.ReactNode;
  className?: string;
}>;
function VisitSection({
  status,
  Nav,
  full = false,
}: {
  status: ReturnType<typeof shopStatus>;
  Nav: NavType;
  full?: boolean;
}) {
  return (
    <section className={`visit-section container ${full ? "visit-full" : ""}`}>
      <div className="visit-copy">
        <p className="eyebrow">COME HANG!</p>
        <h2>
          Your usual spot.
          <br />
          Even on your first visit.
        </h2>
        <p>rice memorial center, next to the bookstore.</p>
        <External href={links.map} className="text-button">
          <MapPin size={18} /> 6100 Main St, Houston, TX{" "}
          <ArrowUpRight size={18} />
        </External>
        <div className="hours-card">
          <div className="hours-title">
            <h3>hours</h3>
            <span className="hours-status">
              <span className="status-dot" data-open={status.open} />
              {status.open ? "Open now" : "See you soon"}
            </span>
          </div>
          {[
            ["Mon – Thu", "7:30 am – midnight"],
            ["Friday", "7:30 am – 5 pm"],
            ["Saturday", "9:30 am – 5 pm"],
            ["Sunday", "2 pm – 10 pm"],
          ].map(([day, time]) => (
            <div className="hours-row" key={day}>
              <span>{day}</span>
              <strong>{time}</strong>
            </div>
          ))}
          <p className="fine-print">
            Hours may change during breaks and holidays. Check{" "}
            <External href={links.instagram}>Instagram</External> before a
            visit.
          </p>
        </div>
        {!full && (
          <Nav to="/visit" className="text-button">
            visit & contact <ArrowUpRight size={18} />
          </Nav>
        )}
      </div>
      <div className="campus-map">
        <div className="map-top">
          <span>RICE COFFEEHOUSE</span>
          <span>HOUSTON, TX ↗</span>
        </div>
        <iframe
          className="campus-map-frame"
          title="Map of Rice Coffeehouse in the Rice Memorial Center"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-95.4058%2C29.7158%2C-95.3988%2C29.7201&layer=mapnik&marker=29.717949%2C-95.402344"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
        <div className="map-bottom">
          <span>RMC, next to the bookstore</span>
          <External href={links.map} className="button small">
            Get directions <ArrowUpRight size={16} />
          </External>
        </div>
      </div>
    </section>
  );
}

function MenuPage({
  saved,
  onSave,
  onOpen,
  onQuiz,
}: {
  saved: string[];
  onSave: (id: string) => void;
  onOpen: (item: MenuItem) => void;
  onQuiz: () => void;
}) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [pref, setPref] = useState("All");
  const filtered = filterMenu(menu, category, query, pref, saved);
  const categories = [
    "All",
    "Chaus classics",
    "Coffee",
    "Tea & more",
    "Blended",
    "Bites",
  ];
  return (
    <>
      <PageIntro
        eyebrow="RICE COFFEEHOUSE"
        title={<>our menu.</>}
        text="coffee, tea, and a little something to eat."
      />
      <section className="container menu-page">
        <div className="menu-tools">
          <div className="search-input">
            <Search size={19} />
            <input
              id="menu-search"
              placeholder="Find a drink, flavor, or bite…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search drinks and food"
            />
            {query && (
              <button aria-label="Clear search" onClick={() => setQuery("")}>
                <X size={17} />
              </button>
            )}
          </div>
          <button className="button outline" onClick={onQuiz}>
            <Sparkles size={17} /> find my drink
          </button>
          <button
            className="icon-button"
            aria-label="Print full menu"
            onClick={() => {
              setCategory("All");
              setPref("All");
              setQuery("");
              setTimeout(() => window.print(), 100);
            }}
          >
            <Printer size={20} />
          </button>
        </div>
        <div className="menu-tabs" role="group" aria-label="Menu categories">
          {categories.map((c) => (
            <button
              key={c}
              className={category === c ? "selected" : ""}
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="menu-filter-row">
          <div
            className="preference-filters"
            role="group"
            aria-label="Drink preferences"
          >
            {["All", "Hot", "Iced", "Caffeine-free", "Saved"].map((p) => (
              <button
                key={p}
                aria-pressed={pref === p}
                className={pref === p ? "selected" : ""}
                onClick={() => setPref(p)}
              >
                {p === "Saved" && <Heart size={13} />}{" "}
                {p === "All" ? "Every kind" : p}
                {p === "Saved" && ` (${saved.length})`}
              </button>
            ))}
          </div>
          <span role="status">
            {filtered.length} good{" "}
            {filtered.length === 1 ? "choice" : "choices"}
          </span>
        </div>
        {filtered.length ? (
          <div className="menu-grid">
            {filtered.map((item, i) => (
              <DrinkCard
                key={item.id}
                item={{
                  ...item,
                  color: item.color || ["yellow", "lavender", "pink"][i % 3],
                }}
                saved={saved.includes(item.id)}
                onSave={() => onSave(item.id)}
                onOpen={() => onOpen(item)}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Coffee size={44} />
            <h3>
              {pref === "Saved"
                ? "Your regulars live here."
                : "No cups found. Yet."}
            </h3>
            <p>
              {pref === "Saved"
                ? "Tap the heart on a menu item to keep it for next time."
                : "Try a different flavor or clear your filters."}
            </p>
            <button
              className="button"
              onClick={() => {
                setQuery("");
                setCategory("All");
                setPref("All");
              }}
            >
              Show me everything <ArrowRight size={17} />
            </button>
          </div>
        )}
        <div className="extras-panel">
          <div>
            <p className="eyebrow">MAKE IT YOURS</p>
            <h2>A little extra?</h2>
            <p>
              ask a KOC about milks and dietary needs. chocolate, white
              chocolate, and caramel syrups contain dairy.
            </p>
          </div>
          <div className="extras-list">
            {extras.map(([name, price]) => (
              <div key={name}>
                <span>{name}</span>
                <strong>+{money(price)}</strong>
              </div>
            ))}
          </div>
        </div>
        <p className="fine-print">
          Prices may change. Ask a KOC about ingredients and dietary needs.
        </p>
      </section>
    </>
  );
}

function Modal({
  children,
  onClose,
  label,
}: {
  children: React.ReactNode;
  onClose: () => void;
  label: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dlg = ref.current;
    dlg?.showModal();
    const scroll = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = scroll;
      if (dlg?.open) dlg.close();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="modal"
      aria-label={label}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        className="modal-close icon-button"
        aria-label="Close dialog"
        onClick={onClose}
      >
        <X />
      </button>
      {children}
    </dialog>
  );
}
function DrinkDialog({
  item,
  saved,
  onSave,
  onClose,
}: {
  item: MenuItem;
  saved: boolean;
  onSave: () => void;
  onClose: () => void;
}) {
  const [size, setSize] = useState(0);
  const [temp, setTemp] = useState(item.iced ? "Iced" : "Hot");
  return (
    <Modal onClose={onClose} label={item.name}>
      <div className={`detail-art ${item.color || "yellow"}`}>
        <DrinkArt
          itemId={item.id}
          type={item.category === "Bites" ? "pastry" : item.art || "cup"}
        />
        <span className="eyebrow">{item.tag || "YOUR NEXT FAVORITE"}</span>
      </div>
      <div className="detail-body">
        <p className="eyebrow">{item.category}</p>
        <h2>{item.name}</h2>
        <p>{item.description}</p>
        <fieldset>
          <legend>Choose a size</legend>
          <div className="option-row">
            {item.sizes.map((s, i) => (
              <button
                key={s}
                className={size === i ? "selected" : ""}
                onClick={() => setSize(i)}
                aria-pressed={size === i}
              >
                {s}
                <small>{money(item.prices[i])}</small>
              </button>
            ))}
          </div>
        </fieldset>
        {item.hot && item.iced && (
          <fieldset>
            <legend>How do you like it?</legend>
            <div className="option-row">
              {["Hot", "Iced"].map((t) => (
                <button
                  key={t}
                  className={temp === t ? "selected" : ""}
                  aria-pressed={temp === t}
                  onClick={() => setTemp(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </fieldset>
        )}
        {item.vegan && (
          <p className="diet-tag">
            <Leaf size={15} /> Listed as vegan
          </p>
        )}
        {item.glutenFree && <p className="diet-tag">Listed as gluten-free</p>}
        {item.allergens && <p className="fine-print">{item.allergens}</p>}
        <div className="detail-total">
          <strong>{money(item.prices[size])}</strong>
          <button className="button" onClick={onSave}>
            {saved ? <Check size={17} /> : <Heart size={17} />}{" "}
            {saved ? "saved!" : "save favorite"}
          </button>
        </div>
        <p className="fine-print">
          Order at the counter. Milk substitutions and extras may cost more.
        </p>
        {item.id === "nutty-bee" && (
          <p className="bee-note">
            5¢ from every Nutty Bee supports Planet Bee.
          </p>
        )}
      </div>
    </Modal>
  );
}
function Quiz({
  onClose,
  onOpen,
}: {
  onClose: () => void;
  onOpen: (item: MenuItem) => void;
}) {
  const [step, setStep] = useState(0);
  const [caffeine, setCaffeine] = useState("");
  const [mood, setMood] = useState("");
  const [temp, setTemp] = useState("");
  const result =
    caffeine === "No caffeine, please"
      ? "smoothie"
      : mood === "Floral & dreamy"
        ? "honeysuckle"
        : mood === "Chocolate all the way"
          ? "milky-way"
          : mood === "Keep it simple"
            ? temp === "Something hot"
              ? "drip"
              : "cold-brew"
            : "nutty-bee";
  const item = menu.find((x) => x.id === result)!;
  const questions = [
    {
      title: "First, a little pick-me-up?",
      choices: ["Yes, bring the caffeine", "No caffeine, please"],
    },
    {
      title: "What’s your flavor mood?",
      choices: [
        "Sweet & nutty",
        "Floral & dreamy",
        "Chocolate all the way",
        "Keep it simple",
      ],
    },
    {
      title: "And the forecast in your cup?",
      choices: ["Something iced", "Something hot"],
    },
  ];
  return (
    <Modal onClose={onClose} label="Find your coffee vibe">
      <div className="quiz-body">
        <p className="eyebrow">
          <Sparkles size={17} /> FIND YOUR DRINK
        </p>
        {step < 3 ? (
          <>
            <div
              className="quiz-progress"
              aria-label={`Question ${step + 1} of 3`}
            >
              {[0, 1, 2].map((x) => (
                <span key={x} className={x <= step ? "complete" : ""} />
              ))}
            </div>
            <p className="fine-print">Question {step + 1} of 3</p>
            <h2>{questions[step].title}</h2>
            <div className="quiz-choices">
              {questions[step].choices.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    if (step === 0) setCaffeine(c);
                    if (step === 1) setMood(c);
                    if (step === 2) setTemp(c);
                    setStep(step + 1);
                  }}
                >
                  {c}
                  <ArrowRight size={18} />
                </button>
              ))}
            </div>
            {step > 0 && (
              <button className="text-button" onClick={() => setStep(step - 1)}>
                <ArrowLeft size={16} /> Back
              </button>
            )}
          </>
        ) : (
          <>
            <div className={`quiz-result-art ${item.color || "green"}`}>
              <DrinkArt type={item.art} itemId={item.id} />
            </div>
            <p className="eyebrow">YOUR NEXT DRINK</p>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            {caffeine === "No caffeine, please" && temp === "Something hot" && (
              <p className="fine-print">
                Your caffeine-free match is served cold. For a warm option, ask
                a KOC about a caffeine-free herbal tea.
              </p>
            )}
            <button className="button" onClick={() => onOpen(item)}>
              see drink <ArrowUpRight size={17} />
            </button>
            <button
              className="text-button quiz-reset"
              onClick={() => setStep(0)}
            >
              Try another vibe
            </button>
          </>
        )}
      </div>
    </Modal>
  );
}

function CateringPage() {
  type Row = { id: number; item: number; size: number; quantity: number };
  const [rows, setRows] = useState<Row[]>([
    { id: 1, item: 0, size: 0, quantity: 1 },
  ]);
  const [event, setEvent] = useState("");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [copied, setCopied] = useState(false);
  const packs = ["Carafe", "Baby Cambro", "Cambro"];
  const total = rows.reduce(
    (sum, r) => sum + cateringMenu[r.item].prices[r.size] * r.quantity,
    0,
  );
  const summary = `Chaus catering request\nName / organization: ${name || "(please add)"}\nEvent: ${event || "(please add)"}\nDate: ${date || "(please add)"}\n\n${rows.map((r) => `${r.quantity} × ${packs[r.size]} of ${cateringMenu[r.item].name} — ${money(cateringMenu[r.item].prices[r.size] * r.quantity)}`).join("\n")}\n\nEstimated drink subtotal: ${money(total)} (before any applicable fees/taxes)\nNotes / dietary needs: ${notes || "None provided"}\n\nPlease confirm availability and pickup details. I will complete the invoice and arrange IDT payment.`;
  function update(id: number, key: keyof Row, value: number) {
    setRows((old) =>
      old.map((r) => (r.id === id ? { ...r, [key]: value } : r)),
    );
    setCopied(false);
  }
  function download() {
    const blob = new Blob([summary], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "chaus-catering-request.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <>
      <PageIntro
        eyebrow="CATERING"
        title={<>coffeehouse caters.</>}
        text="chaüs favorites for your next event."
      />
      <section className="container catering-section">
        <div className="catering-guide">
          <p className="eyebrow">HERE’S HOW IT WORKS</p>
          <h2>We’ll bring the good stuff.</h2>
          <div className="how-step">
            <span>01</span>
            <div>
              <h3>Pick your favorites</h3>
              <p>choose drinks and containers in the planner.</p>
            </div>
          </div>
          <div className="how-step">
            <span>02</span>
            <div>
              <h3>Make it official</h3>
              <p>
                copy the invoice, name it with your first and last name, and
                email us. advance orders require IDT payment.
              </p>
            </div>
          </div>
          <div className="how-step">
            <span>03</span>
            <div>
              <h3>Confirm with the crew</h3>
              <p>
                we confirm availability, pickup, dietary needs, and final
                pricing.
              </p>
            </div>
          </div>
          <External href={links.catering} className="button">
            order invoice <ArrowUpRight size={17} />
          </External>
          <a
            className="text-button catering-email"
            href="mailto:coffeehousecaters@gmail.com"
          >
            <Mail size={17} /> coffeehousecaters@gmail.com
          </a>
          <div className="catering-note">
            <Coffee size={23} />
            <p>
              Same-day orders are in person, limited to one carafe per customer,
              and subject to availability.
            </p>
          </div>
        </div>
        <div className="catering-planner">
          <div className="planner-heading">
            <Sparkles size={22} />
            <div>
              <p className="eyebrow">PLAN YOUR ORDER</p>
              <h3>catering planner.</h3>
            </div>
          </div>
          <div className="planner-fields">
            <label>
              Your name / organization
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name or organization"
              />
            </label>
            <label>
              Event name
              <input
                value={event}
                onChange={(e) => setEvent(e.target.value)}
                placeholder="A study break, a celebration…"
              />
            </label>
            <label>
              Event date
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toLocaleDateString("en-CA")}
              />
            </label>
          </div>
          <div className="planner-rows">
            {rows.map((r, i) => (
              <div className="planner-row" key={r.id}>
                <div className="planner-row-top">
                  <label>
                    Drink {i + 1}
                    <select
                      value={r.item}
                      onChange={(e) => update(r.id, "item", +e.target.value)}
                    >
                      {cateringMenu.map((x, i) => (
                        <option key={x.name} value={i}>
                          {x.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button
                    className="icon-button"
                    disabled={rows.length === 1}
                    aria-label={`Remove drink ${i + 1}`}
                    onClick={() =>
                      setRows((old) => old.filter((x) => x.id !== r.id))
                    }
                  >
                    <X size={17} />
                  </button>
                </div>
                <div className="planner-row-bottom">
                  <label>
                    Container
                    <select
                      value={r.size}
                      onChange={(e) => update(r.id, "size", +e.target.value)}
                    >
                      {packs.map((p, i) => (
                        <option key={p} value={i}>
                          {p} · {money(cateringMenu[r.item].prices[i])}
                        </option>
                      ))}
                    </select>
                  </label>
                  <div className="quantity">
                    <span>Quantity</span>
                    <div>
                      <button
                        disabled={r.quantity === 1}
                        aria-label={`Decrease drink ${i + 1} quantity`}
                        onClick={() => update(r.id, "quantity", r.quantity - 1)}
                      >
                        <Minus size={14} />
                      </button>
                      <strong>{r.quantity}</strong>
                      <button
                        disabled={r.quantity === 99}
                        aria-label={`Increase drink ${i + 1} quantity`}
                        onClick={() => update(r.id, "quantity", r.quantity + 1)}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            className="text-button"
            onClick={() =>
              setRows((old) => [
                ...old,
                {
                  id: Math.max(...old.map((r) => r.id)) + 1,
                  item: 0,
                  size: 0,
                  quantity: 1,
                },
              ])
            }
          >
            <Plus size={16} /> Add another drink
          </button>
          <label className="planner-notes">
            Notes & dietary needs
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Pickup time, number of guests, allergies…"
              rows={2}
            />
          </label>
          <div className="planner-total">
            <span>
              Estimated drink subtotal<strong>Before fees & taxes</strong>
            </span>
            <strong>{money(total)}</strong>
          </div>
          <div className="planner-buttons">
            <a
              className="button"
              href={`mailto:coffeehousecaters@gmail.com?subject=${encodeURIComponent(`Catering request: ${event || "My Chaus event"}`)}&body=${encodeURIComponent(summary)}`}
            >
              email request <ArrowUpRight size={17} />
            </a>
            <button
              className="icon-button"
              onClick={download}
              aria-label="Download catering plan"
            >
              <Download size={20} />
            </button>
          </div>
          <button
            className="text-button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(summary);
                setCopied(true);
              } catch {
                download();
              }
            }}
          >
            {copied ? (
              <>
                <Check size={15} /> Plan copied
              </>
            ) : (
              "copy plan"
            )}
          </button>
          <p className="fine-print">
            Complete the invoice and email the team to confirm your order.
          </p>
        </div>
      </section>
      <section className="container catering-food">
        <p className="eyebrow">BAKERY BOXES</p>
        <h2>A little something for everyone.</h2>
        <div className="food-box-grid">
          {[
            [
              "European breakfast box",
              "An assortment of pastries and plain croissants.",
              "$30 / half dozen · $60 / dozen",
            ],
            [
              "Savory danish box",
              "An equal assortment of ham & cheese and spinach artichoke danishes.",
              "$30 / half dozen · $60 / dozen",
            ],
            [
              "Bagel box",
              "Assorted bagels with cream cheese or butter.",
              "$13 / half dozen · $26 / dozen",
            ],
            [
              "Chocolate chip cookie box",
              "one dozen chocolate chip cookies.",
              "$22 / dozen",
            ],
          ].map(([title, text, price]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
              <strong>{price}</strong>
            </article>
          ))}
        </div>
        <p className="fine-print">
          Add bakery boxes and syrups to the official invoice. Catering toddy
          lattes are listed with whole milk only. Chocolate, white chocolate,
          and caramel syrups contain dairy. Ask the team about all dietary
          needs.
        </p>
      </section>
      <section className="afterdark-banner container">
        <Music size={43} />
        <div>
          <p className="eyebrow">AFTER HOURS</p>
          <h2>Meet Chaüs After Dark.</h2>
          <p>a tour, barista lessons, cold brew, and iced tea.</p>
        </div>
        <External href={links.afterDark} className="button">
          book after dark <ArrowUpRight size={17} />
        </External>
      </section>
    </>
  );
}

function CommunityPage() {
  return (
    <>
      <PageIntro
        eyebrow="COFFEE IS JUST THE BEGINNING"
        title={<>around chaüs.</>}
        text="KOCs, art, and after-hours coffee."
      />
      <div className="container official-banner">
        <img
          src={sitePath("/images/social/koc-banner.jpg")}
          alt="Official Chaus form artwork: a smiling squirrel surrounded by colorful hand-drawn stars"
          width="1600"
          height="400"
          loading="lazy"
        />
      </div>
      <section className="container community-page-grid">
        <Notice
          type="green"
          tag="KEEPERS OF COFFEE"
          title="become a KOC!"
          text="KOCs are rice students. fall ’26 applications are closed — follow us for the next round!"
          icon={<Squirrel />}
          href={links.socials}
          cta="hiring updates"
        />
        <Notice
          type="lavender"
          tag="CHAÜS AFTER DARK"
          title="chaüs after dark."
          text="tour chaüs, make a drink, and take over the aux. book with our catering team."
          icon={<Music />}
          href={links.afterDark}
          cta="booking form"
        />
        <Notice
          type="pink"
          tag="ESPRESSO YOURSELF"
          title="espresso yourself."
          text="our student art collective. artist spotlights, talks, and merch."
          icon={<Spark />}
          href={links.art}
          cta="follow @eychaus"
        />
        <Notice
          type="yellow"
          tag="PAY IT FORWARD"
          title="coffee vouchers."
          text="the voucher form is closed. email us about new orders."
          icon={<Heart />}
          href="mailto:ricecoffeehouse@gmail.com?subject=Coffee%20voucher%20inquiry"
          cta="ask about vouchers"
        />
      </section>
      <SocialWall />
      <section className="container community-links">
        <div>
          <p className="eyebrow">ON THE NOTICEBOARD</p>
          <h2>Got something to share?</h2>
          <p>want to hang a poster? send us a request.</p>
          <External href={links.posters} className="button outline">
            poster request <ArrowUpRight size={17} />
          </External>
        </div>
        <div>
          <p className="eyebrow">ON INSTAGRAM</p>
          <h2>see you on the feed.</h2>
          <p>drinks, hiring, hours, and shenanigans.</p>
          <div className="button-row">
            <External href={links.instagram} className="button">
              <Instagram size={18} /> @ricecoffeehouse
            </External>
            <External href={links.socials} className="text-button">
              All our links <ArrowUpRight size={18} />
            </External>
          </div>
        </div>
      </section>
    </>
  );
}

function SustainabilityPage() {
  return (
    <>
      <PageIntro
        eyebrow="GOOD COFFEE, LIGHTER FOOTPRINT"
        title={<>sustainability.</>}
        text="less waste. fair trade. community care."
      />
      <section className="container sustainability-hero">
        <div className="sustainable-art">
          <Squirrel />
          <Spark />
        </div>
        <div>
          <p className="eyebrow">BRING YOUR OWN MUG</p>
          <h2>
            Your mug.
            <br />
            Our 95¢ drip coffee.
          </h2>
          <p>bring your mug for 95¢ drip. ask a KOC for a rinse after.</p>
        </div>
      </section>
      <section className="container sustainability-grid">
        {[
          [
            "Locally roasted. Thoughtfully sourced.",
            "fair/direct trade coffee from houston’s Katz Coffee.",
          ],
          [
            "A week for a greener house.",
            "with Rice Environmental Society: reusable mugs and greener habits.",
          ],
          [
            "Ask for “for here.”",
            "ask your KOC about mugs, plates, and glasses for here.",
          ],
          [
            "Less waste behind the counter.",
            "recycling, recycled napkins, and fewer disposable straws.",
          ],
          [
            "Wash. Reuse. Repeat.",
            "reusable linens save over 4,000 disposable rags a year.",
          ],
          [
            "The Bean Fund.",
            "$1,000 a year for social justice and environmental sustainability, established in 2020.",
          ],
        ].map(([t, d], i) => (
          <article key={t}>
            <span className="value-number">0{i + 1}</span>
            <h3>{t}</h3>
            <p>{d}</p>
          </article>
        ))}
      </section>
      <section className="container sustainability-links">
        <External href="https://katzcoffee.com/" className="button outline">
          Meet Katz Coffee <ArrowUpRight size={17} />
        </External>
      </section>
    </>
  );
}

function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("General hello");
  const [message, setMessage] = useState("");
  const [draft, setDraft] = useState("");
  return (
    <section className="container contact-section">
      <div>
        <p className="eyebrow">CONTACT</p>
        <h2>get in touch.</h2>
        <a className="contact-link" href="mailto:ricecoffeehouse@gmail.com">
          <Mail size={20} /> ricecoffeehouse@gmail.com{" "}
          <ArrowUpRight size={17} />
        </a>
        <a className="contact-link" href="tel:+17133488073">
          <Phone size={20} /> (713) 348-8073
        </a>
        <p>
          Planning something bigger? For catering and After Dark, email{" "}
          <a href="mailto:coffeehousecaters@gmail.com">
            coffeehousecaters@gmail.com
          </a>
          .
        </p>
        <div className="button-row">
          <External href={links.posters} className="text-button">
            Hang a poster <ArrowUpRight size={17} />
          </External>
          <External
            href="mailto:ricecoffeehouse@gmail.com?subject=Coffee%20voucher%20inquiry"
            className="text-button"
          >
            Request vouchers <ArrowUpRight size={17} />
          </External>
        </div>
      </div>
      <form
        className="contact-form"
        onSubmit={(e) => {
          e.preventDefault();
          setDraft(
            `mailto:${topic === "Catering / After Dark" ? "coffeehousecaters@gmail.com" : "ricecoffeehouse@gmail.com"}?subject=${encodeURIComponent(topic + " — " + name)}&body=${encodeURIComponent(`Hello Chaus!\n\n${message}\n\n${name}\nReply email: ${email}`)}`,
          );
        }}
      >
        <div className="field-pair">
          <label>
            Your name
            <input
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setDraft("");
              }}
              placeholder="Hi, I’m…"
              maxLength={100}
            />
          </label>
          <label>
            Your email
            <input
              required
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setDraft("");
              }}
              placeholder="you@rice.edu"
            />
          </label>
        </div>
        <label>
          What’s on your mind?
          <select
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
              setDraft("");
            }}
          >
            {[
              "General hello",
              "Catering / After Dark",
              "Accessibility or dietary question",
              "Community / art",
              "Hiring question",
            ].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label>
          Your message
          <textarea
            required
            rows={4}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setDraft("");
            }}
            placeholder="Tell us a little more…"
            maxLength={3000}
          />
        </label>
        <button className="button" type="submit">
          write email <ArrowRight size={17} />
        </button>
        <p className="fine-print">Review and send in your email app.</p>
        {draft && (
          <div className="draft-ready" role="status">
            <Check size={19} />
            <div>
              <strong>Your message is ready.</strong>
              <p>review and send from your email app.</p>
              <a href={draft} className="text-button">
                Open email draft <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        )}
      </form>
    </section>
  );
}
function FAQ() {
  return (
    <section className="container faq-section">
      <div>
        <p className="eyebrow">FAQ</p>
        <h2>good to know.</h2>
      </div>
      <div>
        {[
          [
            "Do I need to be a Rice student?",
            "Chaus serves the Rice and greater Houston communities. Everyone is welcome to visit. Check Rice campus visitor and parking information when planning your trip.",
          ],
          [
            "Can I order ahead?",
            "Individual drinks are ordered in person at the counter. For group orders, use the catering invoice and contact the team to confirm availability.",
          ],
          [
            "Can I bring my own mug?",
            "Yes! Bring your own mug for 95¢ drip coffee. Ask a KOC for a rinse when you’re done.",
          ],
          [
            "What about dietary needs?",
            "The menu includes a vegan cinnamon roll and a gluten-free brownie. Ask a KOC about ingredients and cross-contact before ordering. Chocolate, white chocolate, and caramel syrups contain dairy; catering toddy lattes are listed with whole milk only.",
          ],
          [
            "How can I work at Chaus?",
            "KOCs are Rice students. Applications are closed for now. Follow our socials for the next hiring round.",
          ],
          [
            "Can I host something at Coffeehouse?",
            "For Chaus After Dark, use the booking form or contact the catering team. For posters and art opportunities, explore the Around the House page.",
          ],
        ].map(([q, a]) => (
          <details key={q}>
            <summary>
              {q}
              <Plus size={18} />
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
