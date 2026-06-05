/* ==========================================================================
   SECTIONS — un composant par type de bloc.
   Pilotés par window.NEWSLETTER. Exportés sur window pour app.jsx.
   ========================================================================== */
const { useState } = React;

/* ---------- petits helpers ------------------------------------------------ */
function Eyebrow({ children }) {
  if (!children) return null;
  return <div className="eyebrow">{children}</div>;
}

function Arrow() {
  return <span className="arr" aria-hidden="true">→</span>;
}

function Cta({ cta, ghost }) {
  if (!cta) return null;
  const label = cta.label || (cta.channel ? cta.channel : "En savoir plus");
  return (
    <a className={"cta" + (ghost ? " cta-ghost" : "")} href={cta.href || "#"}>
      {cta.channel ? <span style={{ fontFamily: "var(--font-mono)" }}>{cta.channel}</span> : label}
      <Arrow />
    </a>
  );
}

function Slot({ id, src, placeholder, className, style }) {
  return React.createElement("image-slot", {
    id: "slot-" + id,
    src: src || undefined,
    placeholder: placeholder || "Glissez une image",
    className,
    style,
  });
}

/* ---------- ÉDITO --------------------------------------------------------- */
function Edito({ s }) {
  return (
    <section className="section edito">
      <Eyebrow>{s.eyebrow}</Eyebrow>
      <h2 className="sec-title">{s.title}</h2>
      <div className="edito-body">
        {(s.body || []).map((p, i) => <p className="body-p" key={i}>{p}</p>)}
        {s.signature && <div className="edito-sign">{s.signature}</div>}
      </div>
    </section>
  );
}

/* ---------- STATS --------------------------------------------------------- */
function Stats({ s }) {
  return (
    <section className="section stats">
      <Eyebrow>{s.eyebrow}</Eyebrow>
      <h2 className="sec-title" style={{ marginBottom: 8 }}>{s.title}</h2>
      {(s.byline || s.author) && <div className="sec-byline">{s.byline || s.author}</div>}
      {s.intro && <p className="lead">{s.intro}</p>}
      {s.imageId && (
        <div className="stats-media">
          <Slot id={s.imageId} src={s.src} placeholder={s.imageCaption || "Photo de l'événement"} />
          {s.imageCaption && <div className="media-cap">{s.imageCaption}</div>}
        </div>
      )}
      <div className="stats-grid">
        {(s.stats || []).map((st, i) => (
          <div className="stat" key={i}>
            <div className="stat-value">{st.value}</div>
            <div className="stat-label">{st.label}</div>
          </div>
        ))}
      </div>
      {(s.notes && s.notes.length > 0) && (
        <div className="stats-notes">
          {s.notes.map((n, i) => <span className="chip" key={i}>{n}</span>)}
        </div>
      )}
      {s.cta && <div style={{ marginTop: 22 }}><Cta cta={s.cta} /></div>}
    </section>
  );
}

/* ---------- DIVIDER ------------------------------------------------------- */
function Divider({ s }) {
  return (
    <section className="divider">
      <h2 className="divider-label">{s.label}</h2>
      {s.sub && <p className="divider-sub">{s.sub}</p>}
    </section>
  );
}

/* ---------- SPOTLIGHT ------------------------------------------------------ */
function Spotlight({ s, reversed }) {
  return (
    <section className="section spotlight">
      <div className={"spotlight-grid" + (reversed ? " rev" : "")}>
        <div className="spotlight-text">
          {s.badge && <span className="spotlight-badge">{s.badge}</span>}
          <Eyebrow>{s.eyebrow}</Eyebrow>
          <h2 className="sec-title">{s.title}</h2>
          {s.byline && <div className="sec-byline">{s.byline}</div>}
          {(s.body || []).map((p, i) => <p className="body-p" key={i}>{p}</p>)}
          <div className="spotlight-cta-row">
            {(Array.isArray(s.cta) ? s.cta : (s.cta ? [s.cta] : [])).map((c, i) => (
              <Cta cta={c} ghost={i > 0} key={i} />
            ))}
            {s.ctaNote && <span className="cta-note">{s.ctaNote}</span>}
          </div>
        </div>
        <div className="spotlight-media">
          <Slot id={s.imageId || s.id} src={s.src} placeholder={s.imageCaption || "Photo / capture"} />
          {s.imageCaption && <div className="media-cap">{s.imageCaption}</div>}
        </div>
      </div>
    </section>
  );
}

/* ---------- CARDS --------------------------------------------------------- */
function Cards({ s }) {
  return (
    <section className="section cards">
      {s.eyebrow && <Eyebrow>{s.eyebrow}</Eyebrow>}
      {s.title && <h2 className="sec-title">{s.title}</h2>}
      <div className="cards-grid">
        {(s.items || []).map((c, i) => (
          <div className="card" key={i}>
            <h3 className="card-title">{c.title}</h3>
            <p className="card-body">{c.body}</p>
            {(c.meta && c.meta.length > 0) && (
              <div className="card-meta">
                {c.meta.map((m, j) => <span className="chip" key={j}>{m}</span>)}
              </div>
            )}
            {c.cta && (
              <a className="card-cta" href={c.cta.href || "#"}>{c.cta.label} <Arrow /></a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- NEWS ---------------------------------------------------------- */
function News({ s }) {
  return (
    <section className="section news">
      <Eyebrow>{s.eyebrow}</Eyebrow>
      {s.title && <h2 className="sec-title">{s.title}</h2>}
      <div className="news-list">
        {(s.items || []).map((n, i) => (
          <div className="news-item" key={i}>
            <div className="news-num">{String(i + 1).padStart(2, "0")}</div>
            <div>
              <h3 className="news-lead">{n.lead}</h3>
              <p className="news-body">{n.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- ASSETS -------------------------------------------------------- */
function Assets({ s }) {
  return (
    <section className="section assets">
      <Eyebrow>{s.eyebrow}</Eyebrow>
      {s.title && <h2 className="sec-title">{s.title}</h2>}
      {(s.items || []).map((a, i) => (
        <div className="asset-row" key={i}>
          <div className="asset-icon">{a.icon || "📦"}</div>
          <div>
            <p className="asset-body">{a.body}</p>
            {a.cta && <Cta cta={a.cta} ghost />}
          </div>
        </div>
      ))}
    </section>
  );
}

/* ---------- PEOPLE / WELCOME ---------------------------------------------- */
function People({ s }) {
  return (
    <section className="section people">
      <Eyebrow>{s.eyebrow}</Eyebrow>
      {s.title && <h2 className="sec-title">{s.title}</h2>}
      <div className="people-grid">
        {(s.items || []).map((p, i) => (
          <div className="person" key={i}>
            <Slot id={p.imageId || ("welcome-" + i)} src={p.src} placeholder="Photo" />
            <p className="person-name">{p.name}</p>
            <p className="person-role">{p.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- TRAINING (certifications / formations — tableau) -------------- */
function Training({ s }) {
  return (
    <section className="section training">
      <Eyebrow>{s.eyebrow}</Eyebrow>
      {s.title && <h2 className="sec-title">{s.title}</h2>}
      {s.intro && <p className="lead">{s.intro}</p>}
      <div className="train-table">
        <div className="train-row head">
          <div className="train-cell">Personne</div>
          <div className="train-cell">Type</div>
          <div className="train-cell">Sujet</div>
          <div className="train-cell st">Statut</div>
        </div>
        {(s.rows || []).map((r, i) => {
          const done = /valid/i.test(r.status || "");
          return (
            <div className="train-row" key={i}>
              <div className="train-cell person">
                <span className="tp-first">{r.first}</span>{" "}
                <span className="tp-last">{r.last}</span>
              </div>
              <div className="train-cell">
                <span className={"train-kind" + (r.kind === "Formation" ? " is-form" : "")}>{r.kind}</span>
              </div>
              <div className="train-cell topic">{r.topic}</div>
              <div className="train-cell st">
                <span className={"train-status" + (done ? " is-done" : "")}>
                  <i className="dot" /> {r.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ---------- AGENDA -------------------------------------------------------- */
function Agenda({ s }) {
  return (
    <section className="section agenda">
      <Eyebrow>{s.eyebrow}</Eyebrow>
      {s.title && <h2 className="sec-title">{s.title}</h2>}
      {s.intro && <p className="lead">{s.intro}</p>}
      <div className="agenda-table">
        <div className="agenda-row head">
          <div className="agenda-cell">Événement</div>
          <div className="agenda-cell">Comment participer</div>
          <div className="agenda-cell">Contact</div>
        </div>
        {(s.rows || []).map((r, i) => (
          <div className="agenda-row" key={i}>
            <div className="agenda-cell ev">{r.event}</div>
            <div className="agenda-cell">{r.how}</div>
            <div className="agenda-cell contact">{r.contact}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- FEEDBACK ------------------------------------------------------ */
function Feedback({ s }) {
  return (
    <section className="section feedback">
      <Eyebrow>{s.eyebrow}</Eyebrow>
      <h2 className="sec-title">{s.title}</h2>
      <p className="feedback-body">{s.body}</p>
      <div className="feedback-channels">
        {(s.channels || []).map((c, i) => <span className="feedback-chip" key={i}>{c}</span>)}
      </div>
    </section>
  );
}

/* ---------- DISPATCH ------------------------------------------------------ */
function SectionRenderer({ s, index, spotlightIndex }) {
  switch (s.type) {
    case "edito": return <Edito s={s} />;
    case "stats": return <Stats s={s} />;
    case "divider": return <Divider s={s} />;
    case "spotlight": return <Spotlight s={s} reversed={spotlightIndex % 2 === 1} />;
    case "cards": return <Cards s={s} />;
    case "news": return <News s={s} />;
    case "assets": return <Assets s={s} />;
    case "people": return <People s={s} />;
    case "training": return <Training s={s} />;
    case "agenda": return <Agenda s={s} />;
    case "feedback": return <Feedback s={s} />;
    default: return <section className="section"><p className="body-p">Type inconnu : {s.type}</p></section>;
  }
}

Object.assign(window, { SectionRenderer });
