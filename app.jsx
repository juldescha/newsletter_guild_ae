/* ==========================================================================
   APP — assemble le contenu, gère l'éditeur (réorganiser / masquer) et
   les réglages visuels (direction, accent). Pilote tout depuis window.NEWSLETTER.
   ========================================================================== */
const { useState, useEffect, useMemo } = React;

const LAYOUT_KEY = "nl-layout-v2";

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "direction": "editorial",
  "accent": "#ED3F1C",
  "showIssue": true,
  "density": "regular"
}/*EDITMODE-END*/;

/* ---- persistance de l'agencement (ordre + sections masquées) ------------- */
function loadLayout(defaultSections) {
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem(LAYOUT_KEY) || "null"); } catch (e) {}
  const base = defaultSections.map((s) => ({ ...s }));
  if (!saved) return base;
  const byId = Object.fromEntries(base.map((s) => [s.id, s]));
  const ordered = [];
  (saved.order || []).forEach((id) => { if (byId[id]) { ordered.push(byId[id]); delete byId[id]; } });
  Object.values(byId).forEach((s) => ordered.push(s)); // nouvelles sections → à la fin
  const disabled = new Set(saved.disabled || []);
  ordered.forEach((s) => { if (disabled.has(s.id)) s.enabled = false; });
  return ordered;
}
function saveLayout(sections) {
  const payload = {
    order: sections.map((s) => s.id),
    disabled: sections.filter((s) => !s.enabled).map((s) => s.id),
  };
  try { localStorage.setItem(LAYOUT_KEY, JSON.stringify(payload)); } catch (e) {}
}

/* ---- Masthead ------------------------------------------------------------ */
function Masthead({ meta, showIssue }) {
  return (
    <header className="mast">
      <div className="mast-top">
        <span className="mast-org">{meta.org}</span>
        <span>{showIssue && meta.issue ? meta.issue : ""}</span>
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

/* ---- Outils par section (mode édition) ----------------------------------- */
function SecTools({ onUp, onDown, onToggle, enabled, isFirst, isLast }) {
  return (
    <div className="sec-tools">
      <button className="sec-btn" title="Monter" onClick={onUp} disabled={isFirst}>↑</button>
      <button className="sec-btn" title="Descendre" onClick={onDown} disabled={isLast}>↓</button>
      <button className="sec-btn" title={enabled ? "Masquer" : "Afficher"} onClick={onToggle}>
        {enabled ? "👁" : "🚫"}
      </button>
    </div>
  );
}

/* ---- App ----------------------------------------------------------------- */
function App() {
  const data = window.NEWSLETTER;
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [sections, setSections] = useState(() => loadLayout(data.sections));
  const [editing, setEditing] = useState(false);

  // accent global → variable CSS
  useEffect(() => {
    document.documentElement.style.setProperty("--brand-accent", t.accent || "#ED3F1C");
  }, [t.accent]);

  // thème sombre du fond de scène pour la direction "signal"
  const isDark = t.direction === "signal";

  useEffect(() => { saveLayout(sections); }, [sections]);

  function move(i, dir) {
    setSections((prev) => {
      const next = prev.slice();
      const j = i + dir;
      if (j < 0 || j >= next.length) return prev;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }
  function toggle(i) {
    setSections((prev) => prev.map((s, k) => (k === i ? { ...s, enabled: !s.enabled } : s)));
  }
  function reset() {
    localStorage.removeItem(LAYOUT_KEY);
    setSections(data.sections.map((s) => ({ ...s })));
  }

  const visible = editing ? sections : sections.filter((s) => s.enabled);

  // index des spotlights (pour alterner la mise en page image/texte)
  let spotCount = -1;

  return (
    <div className={"stage" + (isDark ? " is-dark" : "")}>
      <div className={"paper"} data-theme={t.direction}>
        <article className={"doc" + (editing ? " editing" : "")}>
          <Masthead meta={data.meta} showIssue={t.showIssue} />
          <div className="mast-rule" />
          <div className="doc-inner">
            {visible.map((s) => {
              const realIndex = sections.indexOf(s);
              if (s.type === "spotlight") spotCount++;
              const off = !s.enabled;
              return (
                <div className={"sec-wrap" + (off ? " is-off" : "")} key={s.id}>
                  {off && <span className="sec-off-tag">Masquée</span>}
                  {editing && (
                    <SecTools
                      enabled={s.enabled}
                      isFirst={realIndex === 0}
                      isLast={realIndex === sections.length - 1}
                      onUp={() => move(realIndex, -1)}
                      onDown={() => move(realIndex, 1)}
                      onToggle={() => toggle(realIndex)}
                    />
                  )}
                  <SectionRenderer s={s} index={realIndex} spotlightIndex={s.type === "spotlight" ? spotCount : 0} />
                </div>
              );
            })}
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

      {/* Éditeur d'agencement (caché à l'impression) */}
      <div className="organizer no-print">
        <button
          className={"org-toggle" + (editing ? " on" : "")}
          onClick={() => setEditing((v) => !v)}
        >
          {editing ? "✓ Terminer" : "✎ Organiser les sections"}
        </button>
        {editing && (
          <button className="org-reset" onClick={reset}>Réinitialiser</button>
        )}
        <button
          className="org-toggle"
          title="Direction visuelle, couleur d'accent"
          onClick={() => window.postMessage({ type: '__activate_edit_mode' }, '*')}
        >
          ⚙ Réglages
        </button>
      </div>

      {/* Réglages visuels (panneau Tweaks) */}
      <TweaksPanel>
        <TweakSection label="Direction visuelle" />
        <TweakRadio
          label="Style"
          value={t.direction}
          options={["editorial", "signal", "convivial"]}
          onChange={(v) => setTweak("direction", v)}
        />
        <TweakSection label="Marque" />
        <TweakColor
          label="Couleur d'accent"
          value={t.accent}
          options={["#ED3F1C", "#0A0B0E", "#2F6BFF", "#10916B", "#7A3FF2"]}
          onChange={(v) => setTweak("accent", v)}
        />
        <TweakToggle
          label="Afficher le n° d'édition"
          value={t.showIssue}
          onChange={(v) => setTweak("showIssue", v)}
        />
        <TweakSection label="Astuce" />
        <div style={{ fontSize: 12, lineHeight: 1.5, color: "#888", padding: "2px 2px 6px" }}>
          Le contenu se modifie dans <code style={{ fontFamily: "monospace", color: "#555" }}>data.js</code>.
          Réorganisez ou masquez des sections avec « Organiser » en bas à gauche.
        </div>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
