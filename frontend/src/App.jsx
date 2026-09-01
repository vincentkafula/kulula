import React, { useEffect, useRef, useState } from "react";
import {
  getHeadlines,
  getHero,
  getNews,
  getCategories,
  getOnAir,
  getTvHighlights,
  getSchedule,
  subscribeNewsletter
} from "./api.js";

const DEFAULT_HEADLINES = [
  "Global markets rally as tech stocks surge",
  "Global leaders meet to discuss climate action plan",
  "AI innovations set to transform industries"
];

const DEFAULT_HERO = {
  kicker: "Breaking News",
  title: "Global leaders meet to discuss climate action plan",
  summary:
    "World leaders gather for a historic summit aimed at accelerating climate action and building a sustainable future."
};

const DEFAULT_NEWS = [
  { id: 1, category: "World", title: "Peace talks resume between nations", time: "2h ago" },
  { id: 2, category: "Business", title: "Markets hit record high on strong earnings", time: "3h ago" },
  { id: 3, category: "Technology", title: "AI innovations set to transform industries", time: "4h ago" },
  { id: 4, category: "Sport", title: "Local team wins championship title", time: "5h ago" }
];

const DEFAULT_CATEGORIES = ["World", "Business", "Politics", "Technology", "Sport", "Entertainment", "Health"];

const DEFAULT_ONAIR = { show: "Kulla Drive Live", hosts: "Thabo & Lerato", time: "15:00 – 18:00" };

const DEFAULT_TV = [
  { id: 1, title: "Evening News Bulletin", time: "18:00" },
  { id: 2, title: "Inside Africa Tonight", time: "19:00" },
  { id: 3, title: "Sports Central Live", time: "20:00" }
];

const DEFAULT_SCHEDULE = [
  { time: "09:00", title: "Morning News Live", now: false },
  { time: "12:00", title: "Midday Report", now: false },
  { time: "15:00", title: "Kulla Drive Live", now: true },
  { time: "18:00", title: "Evening News Bulletin", now: false },
  { time: "20:00", title: "Prime Time Talk", now: false }
];

const WAVE_HEIGHTS = [8, 14, 20, 10, 26, 16, 22, 12, 18, 9, 24, 14, 20, 10, 16, 22, 12, 18, 8, 20];

export default function App() {
  const [headlines, setHeadlines] = useState(DEFAULT_HEADLINES);
  const [hero, setHero] = useState(DEFAULT_HERO);
  const [news, setNews] = useState(DEFAULT_NEWS);
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [onAir, setOnAir] = useState(DEFAULT_ONAIR);
  const [tvHighlights, setTvHighlights] = useState(DEFAULT_TV);
  const [schedule, setSchedule] = useState(DEFAULT_SCHEDULE);
  const [activeDot, setActiveDot] = useState(0);
  const [subscribed, setSubscribed] = useState(false);
  const emailRef = useRef(null);

  useEffect(() => {
    getHeadlines({ headlines: DEFAULT_HEADLINES }).then((d) => setHeadlines(d.headlines || DEFAULT_HEADLINES));
    getHero(DEFAULT_HERO).then(setHero);
    getNews({ news: DEFAULT_NEWS }).then((d) => setNews(d.news || DEFAULT_NEWS));
    getCategories({ categories: DEFAULT_CATEGORIES }).then((d) => setCategories(d.categories || DEFAULT_CATEGORIES));
    getOnAir(DEFAULT_ONAIR).then(setOnAir);
    getTvHighlights({ highlights: DEFAULT_TV }).then((d) => setTvHighlights(d.highlights || DEFAULT_TV));
    getSchedule({ schedule: DEFAULT_SCHEDULE }).then((d) => setSchedule(d.schedule || DEFAULT_SCHEDULE));
  }, []);

  async function handleSubscribe(e) {
    e.preventDefault();
    const email = emailRef.current?.value;
    try {
      await subscribeNewsletter(email);
    } catch {
      // fall through to optimistic UI regardless of backend availability
    }
    setSubscribed(true);
  }

  const loopedHeadlines = [...headlines, ...headlines];

  return (
    <>
      {/* TICKER */}
      <div className="ticker">
        <div className="wrap">
          <span className="tag">Trending</span>
          <div className="headline-track">
            <div className="headline">
              {loopedHeadlines.map((h, i) => (
                <span key={i}>{h}</span>
              ))}
            </div>
          </div>
          <div className="links">
            <a href="#">About Us</a>
            <a href="#">Advertise</a>
            <a href="#">Contact</a>
          </div>
          <div className="social">
            <a href="#" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a href="#" aria-label="Twitter">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="#" aria-label="YouTube">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="5" width="20" height="14" rx="4" />
                <path d="M10 9l5 3-5 3z" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="main">
        <div className="wrap">
          <div className="logo">
            <div className="mark">K</div>
            <div className="word">
              <b>Kulla</b>
              <span>MEDIA</span>
            </div>
          </div>
          <nav className="primary">
            <a href="#" className="active">Home</a>
            <a href="#">News</a>
            <a href="#">TV</a>
            <a href="#">Radio</a>
            <a href="#">Business</a>
            <a href="#">Sport</a>
            <a href="#">Entertainment</a>
            <a href="#">Tech</a>
            <a href="#">Lifestyle</a>
          </nav>
          <div className="header-actions">
            <div className="icon-btn" aria-label="Search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
            </div>
            <div className="pill-btn live">
              <span className="dot" /> Live TV
            </div>
            <div className="pill-btn listen">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 14a9 9 0 0118 0" />
                <path d="M21 14v4a2 2 0 01-2 2h-1v-7h3z" />
                <path d="M3 14v4a2 2 0 002 2h1v-7H3z" />
              </svg>
              Listen Live
            </div>
          </div>
        </div>
      </header>

      <main className="wrap">
        {/* HERO */}
        <section className="hero-section">
          <div className="hero-grid">
            <div className="hero-card">
              <svg className="signal" viewBox="0 0 340 340" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle className="ring" cx="170" cy="170" r="40" strokeWidth="1.5" />
                <circle className="ring" cx="170" cy="170" r="70" strokeWidth="1.2" />
                <circle className="ring" cx="170" cy="170" r="100" strokeWidth="1" />
                <circle className="ring" cx="170" cy="170" r="130" strokeWidth="0.8" />
                <path className="tower" d="M170 210 L150 260 M170 210 L190 260 M158 235 L182 235" />
                <path className="tower" d="M170 210 V150 M155 165 L170 150 L185 165 M148 180 L170 150 L192 180" />
                <circle className="dot" cx="170" cy="150" r="4" />
              </svg>
              <div className="hero-content">
                <span className="kicker">{hero.kicker}</span>
                <h1>{hero.title}</h1>
                <p>{hero.summary}</p>
                <div className="hero-cta">
                  <a href="#" className="btn solid">Read More</a>
                  <a href="#" className="btn ghost">
                    <span className="play">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                    Watch Live
                  </a>
                </div>
              </div>
              <div className="hero-dots">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className={activeDot === i ? "active" : ""}
                    onClick={() => setActiveDot(i)}
                  />
                ))}
              </div>
              <div className="hero-nav">
                <button aria-label="Previous">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button aria-label="Next">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="panel">
              <div className="panel-head">
                <h3>Latest News</h3>
                <a href="#" className="view-all">View All</a>
              </div>
              {news.map((item, i) => (
                <div className="news-row" key={item.id ?? i}>
                  <span className="idx">{String(i + 1).padStart(2, "0")}</span>
                  <div className="news-thumb">
                    <svg viewBox="0 0 64 52" xmlns="http://www.w3.org/2000/svg">
                      <rect width="64" height="52" fill="#1c1a18" />
                    </svg>
                  </div>
                  <div className="news-meta">
                    <span className="cat">{item.category}</span>
                    <div className="title">{item.title}</div>
                    <div className="time">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURE TRIPTYCH */}
        <section className="triptych">
          <div className="feature-card">
            <div className="feature-visual">
              <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="220" fill="#18211f" />
                <rect x="30" y="62" width="240" height="126" rx="4" fill="#0e1412" stroke="#2b332f" />
                <rect x="42" y="74" width="216" height="90" fill="#20261f" />
                <rect x="52" y="84" width="90" height="28" fill="#333d33" />
                <rect x="150" y="84" width="98" height="7" fill="#4a5648" />
                <rect x="150" y="97" width="70" height="5" fill="#3a443a" />
                <rect x="52" y="122" width="55" height="32" fill="#242c24" />
                <rect x="114" y="122" width="55" height="32" fill="#242c24" />
                <rect x="176" y="122" width="55" height="32" fill="#242c24" />
                <path d="M255 166 L285 92 L310 176 L300 176 L290 136 L268 166 Z" fill="#333d33" />
                <circle cx="330" cy="115" r="34" fill="#e6472b" opacity="0.1" />
              </svg>
            </div>
            <div className="feature-tag">brbsite news</div>
            <div className="feature-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20" />
              </svg>
            </div>
            <div className="feature-body">
              <h4>Stay informed. Anywhere.</h4>
              <p>Breaking stories, in-depth analysis and real-time updates across the globe.</p>
              <a href="#" className="btn outline red">Explore News</a>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-visual">
              <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="220" fill="#160e0a" />
                <ellipse cx="200" cy="220" rx="260" ry="64" fill="#241610" />
                <rect x="90" y="54" width="130" height="86" rx="3" fill="#0e0a08" stroke="#c99a4b" strokeWidth="1.4" />
                <text x="155" y="104" fontFamily="Fraunces" fontStyle="italic" fontSize="24" fontWeight="700" fill="#c99a4b" textAnchor="middle">KC</text>
                <circle cx="300" cy="112" r="7" fill="#0e0a08" stroke="#8a8378" />
                <rect x="296" y="119" width="8" height="32" fill="#2c2620" />
                <rect x="280" y="150" width="40" height="6" fill="#2c2620" />
              </svg>
            </div>
            <div className="feature-tag">tv news</div>
            <div className="feature-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="2" y="6" width="20" height="14" rx="2" />
                <path d="M8 2l4 4 4-4" />
              </svg>
            </div>
            <div className="feature-body">
              <h4>Watch. Understand. Act.</h4>
              <p>Live broadcasts, exclusive interviews and stories that matter.</p>
              <a href="#" className="btn outline gold">Watch Live</a>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-visual">
              <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="220" fill="#170807" />
                <g stroke="#e6472b" strokeWidth="1.8" opacity="0.5">
                  <path d="M20 110 v0" /><path d="M35 96 v28" /><path d="M50 78 v66" /><path d="M65 92 v38" />
                  <path d="M80 68 v86" /><path d="M95 96 v28" /><path d="M110 58 v106" /><path d="M125 86 v48" />
                </g>
                <g stroke="#e6472b" strokeWidth="1.8" opacity="0.5">
                  <path d="M275 86 v48" /><path d="M290 58 v106" /><path d="M305 96 v28" /><path d="M320 68 v86" />
                  <path d="M335 92 v38" /><path d="M350 78 v66" /><path d="M365 96 v28" /><path d="M380 110 v0" />
                </g>
                <rect x="165" y="66" width="70" height="90" rx="6" fill="#0e0a08" stroke="#e6472b" />
                <circle cx="200" cy="94" r="18" fill="#1c1613" stroke="#8a8378" />
                <rect x="187" y="140" width="26" height="16" fill="#1c1613" />
              </svg>
            </div>
            <div className="feature-tag">radio news</div>
            <div className="feature-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
                <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" />
              </svg>
            </div>
            <div className="feature-body">
              <h4>Your voice. Your station.</h4>
              <p>Live talk shows, news updates and community conversations.</p>
              <a href="#" className="btn outline red">Listen Live</a>
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section>
          <div className="section-label">Top Categories</div>
          <div className="cat-rail">
            {categories.map((cat) => (
              <div className="cat-card" key={cat}>
                <span className="ic">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </span>
                {cat}
              </div>
            ))}
          </div>
        </section>

        {/* BROADCAST STRIP */}
        <section className="broadcast">
          <div className="bc-panel">
            <div className="bc-title"><span className="live-dot" /> On Air Now</div>
            <div className="onair">
              <div className="onair-thumb">
                <svg viewBox="0 0 104 84" xmlns="http://www.w3.org/2000/svg">
                  <rect width="104" height="84" fill="#241210" />
                  <circle cx="36" cy="38" r="15" fill="#3a2622" />
                  <circle cx="68" cy="42" r="15" fill="#c99a4b" />
                </svg>
                <div className="play">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="onair-info">
                <h4>{onAir.show}</h4>
                <div className="host">With {onAir.hosts}</div>
                <div className="time">{onAir.time}</div>
                <a href="#" className="listen-btn">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Listen Live
                </a>
              </div>
            </div>
            <Waveform />
          </div>

          <div className="bc-panel">
            <div className="bc-title">TV Highlights</div>
            <div className="tv-grid">
              {tvHighlights.map((item, i) => (
                <div className="tv-item" key={item.id ?? i}>
                  <div className="thumb">
                    <svg viewBox="0 0 120 88" xmlns="http://www.w3.org/2000/svg">
                      <rect width="120" height="88" fill="#131a22" />
                    </svg>
                    <div className="play">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="cap">
                    {item.title}
                    <span className="t">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bc-panel">
            <div className="bc-title">Program Schedule</div>
            {schedule.map((row, i) => (
              <div className={`schedule-row${row.now ? " now" : ""}`} key={i}>
                <span className="time">{row.time}</span> {row.title}
              </div>
            ))}
            <a href="#" className="view-full">View Full Schedule</a>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer>
        <div className="wrap">
          <div className="footer-grid">
            <div className="foot-about">
              <div className="logo">
                <div className="mark">K</div>
                <div className="word">
                  <b>Kulla</b>
                  <span>MEDIA</span>
                </div>
              </div>
              <p>Your trusted source for credible news, engaging stories and real conversations across platforms.</p>
              <div className="foot-social">
                <a href="#" aria-label="Facebook">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>
                <a href="#" aria-label="Twitter">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                </a>
                <a href="#" aria-label="Instagram">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                </a>
                <a href="#" aria-label="YouTube">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="5" width="20" height="14" rx="4" />
                    <path d="M10 9l5 3-5 3z" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a href="#" aria-label="TikTok">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 3v12a3 3 0 11-3-3M9 3a5 5 0 005 5V6a5 5 0 01-2-1" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="foot-col">
              <h5>Quick Links</h5>
              <a href="#">Home</a><a href="#">News</a><a href="#">TV</a><a href="#">Radio</a>
              <a href="#">About Us</a><a href="#">Contact Us</a>
            </div>

            <div className="foot-col">
              <h5>Categories</h5>
              <a href="#">World</a><a href="#">Business</a><a href="#">Politics</a><a href="#">Technology</a>
              <a href="#">Sport</a><a href="#">Entertainment</a><a href="#">Health</a>
            </div>

            <div className="foot-col">
              <h5>Support</h5>
              <a href="#">Help Center</a><a href="#">Privacy Policy</a><a href="#">Terms &amp; Conditions</a>
              <a href="#">Advertise With Us</a><a href="#">Careers</a><a href="#">Press Kit</a>
            </div>
          </div>

          <div className="footer-grid" style={{ gridTemplateColumns: "1fr", maxWidth: 340, marginTop: -8 }}>
            <div className="newsletter">
              <h5 style={{ marginBottom: 13 }}>Newsletter</h5>
              <p>Subscribe to get the latest news and updates in your inbox.</p>
              <form className="nl-form" onSubmit={handleSubscribe}>
                <input ref={emailRef} type="email" placeholder="Enter your email address" required />
                <button type="submit">{subscribed ? "Subscribed ✓" : "Subscribe"}</button>
              </form>
            </div>
          </div>

          <div className="foot-bottom">
            <span>© 2026 Kulla Media. All Rights Reserved.</span>
            <span>Made with <b>♥</b> for a better tomorrow</span>
          </div>
        </div>
      </footer>
    </>
  );
}

function Waveform() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.innerHTML = "";
    WAVE_HEIGHTS.forEach((h) => {
      const bar = document.createElement("span");
      bar.style.height = h + "px";
      el.appendChild(bar);
    });
  }, []);
  return <div className="waveform" ref={ref} />;
}
