const { useState, useEffect } = React;

const ACCENT = "#ED3F1C";

/* ---- persistance du dark mode -------------------------------------------- */
function loadDark() {
  try { return localStorage.getItem("nl-dark") === "1"; } catch (e) { return false; }
}

/* ---- Masthead ------------------------------------------------------------ */
function Masthead({ meta }) {
  return (
    <header className="mast">
      <div className="mast-top">
        <span className="mast-org">{meta.org}</span>
        <span>{meta.issue}</span>
      </div>
      <div className="mast-kicker">{meta.kicker}</div>
      <h1 className="mast-title">{meta.title}</h1>
      <div className="mast-meta">
        <span className="dot" />
        <span className="mast-edition">{meta.edition}</span>
        <span>·</span>
        <span>Communauté Analytics Engineering</span>
      </div>
    </header>
  );
}

/* ---- App ----------------------------------------------------------------- */
function App() {
  const data = window.NEWSLETTER;
  const [dark, setDark] = useState(loadDark);

  useEffect(() => {
    document.documentElement.style.setProperty("--brand-accent", ACCENT);
  }, []);

  useEffect(() => {
    try { localStorage.setItem("nl-dark", dark ? "1" : "0"); } catch (e) {}
  }, [dark]);

  const theme = dark ? "signal" : "editorial";

  return (
    <div className={"stage" + (dark ? " is-dark" : "")}>
      <div className="paper" data-theme={theme}>
        <article className="doc">
          <Masthead meta={data.meta} />
          <div className="mast-rule" />
          <div className="doc-inner">
            {data.sections.filter((s) => s.enabled !== false).map((s) => (
              <div className="sec-wrap" key={s.id}>
                <SectionRenderer s={s} index={0} spotlightIndex={
                  data.sections.filter((x) => x.type === "spotlight" && x.enabled !== false)
                    .indexOf(s)
                } />
              </div>
            ))}
          </div>
          <footer className="doc-foot">
            {data.meta.footer && data.meta.footer.coda && (
              <a className="foot-coda" href={data.meta.footer.coda.href}>
                <div className="foot-coda-txt">
                  <div className="foot-coda-k">Espace de la guild</div>
                  <div className="foot-coda-t">{data.meta.footer.coda.label}</div>
                  <div className="foot-coda-n">{data.meta.footer.coda.note}</div>
                </div>
                <span className="foot-coda-arrow" aria-hidden="true">→</span>
              </a>
            )}
            <div className="foot-bar">
              <span className="foot-org">{data.meta.org} · {data.meta.edition}</span>
              {data.meta.footer && data.meta.footer.links && (
                <div className="foot-links">
                  {data.meta.footer.links.map((l, i) => (
                    <a className="foot-link" href={l.href} key={i}>{l.label}</a>
                  ))}
                </div>
              )}
            </div>
          </footer>
        </article>
      </div>

      {/* Bouton dark mode */}
      <button
        className="darkmode-btn no-print"
        title={dark ? "Mode clair" : "Mode sombre"}
        onClick={() => setDark((v) => !v)}
      >
        {dark ? "☀️" : "🌙"}
      </button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
