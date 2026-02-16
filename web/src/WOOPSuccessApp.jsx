import React, { useMemo, useState, useEffect } from "react";

/**
 * WOOP for Classrooms (Character Lab) + Success Course Extension
 *
 * Notes grounded in Character Lab:
 * - Keep sequence + language consistent (Wish → Outcome → Obstacle → Plan + imagery pauses).
 * - Obstacle must be INTERNAL (under your control).
 * - Plan is a When–Then (implementation intention), with an observable action.
 */

const DEFAULTS = {
  wish: "",
  outcome: "",
  obstacle: "",
  planWhen: "",
  planThen: "",
  // Success-course add-on
  last12moSuccess: "",
  last12moFailure: "",
  meaningSuccess: "",
  feltSuccess: "",
  feltFailure: "",
  peersNotes: "",
  checkInDate: "",
};

const EXAMPLES = [
  {
    title: "Student Example (Biology Quiz)",
    wish: "Get an A on my biology quiz",
    outcome: "I’ll feel proud.",
    obstacle: "I procrastinate.",
    planWhen: "I finish dinner",
    planThen: "Make 5 flash cards",
  },
  {
    title: "Teacher Example (Grading)",
    wish: "Grade all unit exams before Monday",
    outcome: "Less stress; kids get feedback",
    obstacle: "Write too much feedback",
    planWhen: "I grade exams",
    planThen: "Time myself for 4 min per exam",
  },
];

function Timer({ seconds = 20, label }) {
  const [left, setLeft] = useState(seconds);
  const [running, setRunning] = useState(false);
  const done = left === 0;

  useEffect(() => {
    if (!running) return undefined;
    if (left <= 0) return undefined;
    const t = setInterval(() => setLeft((x) => x - 1), 1000);
    return () => clearInterval(t);
  }, [running, left]);

  const reset = () => {
    setRunning(false);
    setLeft(seconds);
  };

  return (
    <div style={styles.timerBox}>
      <div style={{ fontWeight: 700, marginBottom: 6 }}>Visualization Pause</div>
      <div style={{ opacity: 0.85, marginBottom: 10 }}>{label}</div>
      <div style={styles.timerRow}>
        <div style={styles.time}>{`0:${String(left).padStart(2, "0")}`}</div>
        <button style={styles.btn} onClick={() => setRunning((r) => !r)}>
          {running ? "Pause" : "Start"}
        </button>
        <button style={styles.btnGhost} onClick={reset}>
          Reset
        </button>
      </div>
      {done && (
        <div style={{ color: "#0a7a2f", marginTop: 8, fontWeight: 600 }}>
          Done. Write what you noticed.
        </div>
      )}
    </div>
  );
}

const STEPS = [
  { id: "intro", title: "Welcome" },
  { id: "wish", title: "Wish" },
  { id: "outcome", title: "Outcome" },
  { id: "obstacle", title: "Obstacle" },
  { id: "plan", title: "Plan" },
  { id: "success", title: "Success Reflection" },
  { id: "wrap", title: "WOOP Card + Notion Export" },
];

export default function WOOPSuccessApp() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(DEFAULTS);
  const [showFacilitator, setShowFacilitator] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  const current = STEPS[step];

  const canNext = useMemo(() => {
    const s = current.id;
    if (s === "wish") return data.wish.trim().length > 0;
    if (s === "outcome") return data.outcome.trim().length > 0;
    if (s === "obstacle") return data.obstacle.trim().length > 0;
    if (s === "plan") return data.planWhen.trim().length > 0 && data.planThen.trim().length > 0;
    return true;
  }, [current.id, data]);

  const update = (k, v) => setData((d) => ({ ...d, [k]: v }));

  const loadExample = (ex) => {
    setData((d) => ({
      ...d,
      wish: ex.wish,
      outcome: ex.outcome,
      obstacle: ex.obstacle,
      planWhen: ex.planWhen,
      planThen: ex.planThen,
    }));
    setStep(1);
    setShowExamples(false);
  };

  const notionExport = useMemo(() => {
    return `# WOOP (Success Course)

## WISH
${data.wish || "…"}

## OUTCOME (best result + how I feel)
${data.outcome || "…"}

## OBSTACLE (internal)
${data.obstacle || "…"}

## PLAN (When–Then)
**When:** ${data.planWhen || "…"}  
**Then I will:** ${data.planThen || "…"}

---

# Success & Failure Reflection (last 12 months)

## One Success
${data.last12moSuccess || "…"}

## One Failure
${data.last12moFailure || "…"}

## What does success mean to me?
${data.meaningSuccess || "…"}

## How does success feel?
${data.feltSuccess || "…"}

## How does failure feel?
${data.feltFailure || "…"}

## Notes on classmates’ ideas (patterns / differences)
${data.peersNotes || "…"}

## Check-in date (to make WOOP a habit)
${data.checkInDate || "…"}
`;
  }, [data]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(notionExport);
    window.alert("Copied. Paste into Notion.");
  };

  const resetAll = () => {
    setData(DEFAULTS);
    setStep(0);
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={styles.logo}>WOOP</div>
          <div>
            <div style={{ fontWeight: 800 }}>WOOP for Success Course</div>
            <div style={{ opacity: 0.7, fontSize: 12 }}>10 minutes · Self-Control + Reflection</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "flex-end" }}>
          <button style={styles.btnGhost} onClick={() => setShowExamples((x) => !x)}>
            {showExamples ? "Hide Examples" : "Show Examples"}
          </button>
          <button style={styles.btnGhost} onClick={() => setShowFacilitator((x) => !x)}>
            {showFacilitator ? "Hide Facilitator Script" : "Facilitator Script"}
          </button>
        </div>
      </header>

      {showFacilitator && (
        <div style={styles.panel}>
          <div style={{ fontWeight: 800, marginBottom: 6 }}>Facilitator Script (Character Lab style)</div>
          <div style={{ lineHeight: 1.4, opacity: 0.9 }}>
            “WOOP is a strategy that will help you gain insight into your daily life and fulfill your wishes.
            Relax while I guide you through WOOP. The next few minutes are just for you.”
            <br />
            “WISH: Write a wish that is important to you. The wish should be difficult but achievable. State it
            briefly.”
            <br />
            “OUTCOME: How will it feel when you accomplish this? Close your eyes and really imagine it.”
            <br />
            “OBSTACLE: What is an internal obstacle? This must be something you have control over. Close your
            eyes and imagine your obstacle.”
            <br />
            “PLAN: What is your specific plan? What is the exact thing you will do? This plan should be easy to
            remember.”
            <br />
            “We’ll check in again. WOOP is most helpful when it becomes a habit.”
            <br />
          </div>
        </div>
      )}

      {showExamples && (
        <div style={styles.panel}>
          <div style={{ fontWeight: 800, marginBottom: 10 }}>Examples (tap to load)</div>
          <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
            {EXAMPLES.map((ex) => (
              <button key={ex.title} style={styles.cardBtn} onClick={() => loadExample(ex)}>
                <div style={{ fontWeight: 800, marginBottom: 6 }}>{ex.title}</div>
                <div style={styles.small}>
                  <b>W:</b> {ex.wish}
                </div>
                <div style={styles.small}>
                  <b>O:</b> {ex.outcome}
                </div>
                <div style={styles.small}>
                  <b>O:</b> {ex.obstacle}
                </div>
                <div style={styles.small}>
                  <b>P:</b> When {ex.planWhen}, then I will {ex.planThen}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <main style={styles.main}>
        <StepBar step={step} />

        <div style={styles.content}>
          {current.id === "intro" && (
            <div>
              <h1 style={styles.h1}>What is WOOP?</h1>
              <p style={styles.p}>
                WOOP is a practical, evidence-based activity that helps you fulfill wishes by building self-control.
                It stands for <b>Wish</b>, <b>Outcome</b>, <b>Obstacle</b>, <b>Plan</b>.
              </p>

              <div style={styles.grid2}>
                <div style={styles.box}>
                  <div style={styles.boxTitle}>How it works</div>
                  <div style={styles.p}>
                    WOOP avoids a common goal-setting mistake: fantasizing about success without considering
                    what holds you back. You’ll contrast your desired future with an internal obstacle, then create a
                    When–Then plan.
                  </div>
                </div>
                <div style={styles.box}>
                  <div style={styles.boxTitle}>Success course tie-in</div>
                  <div style={styles.p}>
                    This is not just “set a goal.” You’ll connect success/failure to lived experience: what you count
                    as success, what failure feels like, and how your obstacles shape the story.
                  </div>
                </div>
              </div>

              <button style={styles.primary} onClick={() => setStep(1)}>
                Start WOOP
              </button>
            </div>
          )}

          {current.id === "wish" && (
            <div>
              <h1 style={styles.h1}>WISH</h1>
              <p style={styles.p}>
                Write a wish that is <b>important</b>, <b>challenging but feasible</b>, and can fit a timeframe
                (today/this week/this month).
              </p>
              <Field
                label="My wish"
                value={data.wish}
                onChange={(v) => update("wish", v)}
                placeholder="e.g., Finish my Success course reflection by Friday"
              />
              <Hint>Keep it short. One sentence.</Hint>
            </div>
          )}

          {current.id === "outcome" && (
            <div>
              <h1 style={styles.h1}>OUTCOME</h1>
              <p style={styles.p}>What is the best result of achieving your wish? How will you feel?</p>
              <FieldArea
                label="Best outcome + feelings"
                value={data.outcome}
                onChange={(v) => update("outcome", v)}
                placeholder="e.g., I’ll feel calmer, proud, and less haunted by unfinished work"
              />
              <Timer
                seconds={20}
                label="Close your eyes and really imagine the outcome vividly (scene, body, emotions)."
              />
            </div>
          )}

          {current.id === "obstacle" && (
            <div>
              <h1 style={styles.h1}>OBSTACLE (internal)</h1>
              <p style={styles.p}>
                This must be something <b>inside you</b> that you have control over (emotion, habit, belief), not an
                external barrier.
              </p>
              <FieldArea
                label="My main internal obstacle"
                value={data.obstacle}
                onChange={(v) => update("obstacle", v)}
                placeholder="e.g., I spiral into overthinking and avoid starting"
              />
              <Timer
                seconds={20}
                label="Close your eyes and imagine the obstacle happening. Where are you? What do you do?"
              />
            </div>
          )}

          {current.id === "plan" && (
            <div>
              <h1 style={styles.h1}>PLAN (When–Then)</h1>
              <p style={styles.p}>
                Create a plan that links the obstacle cue to an <b>observable action</b>. Not “be disciplined.” A
                real behavior.
              </p>

              <Field
                label="When (the obstacle occurs)"
                value={data.planWhen}
                onChange={(v) => update("planWhen", v)}
                placeholder="e.g., I open Instagram while studying"
              />
              <Field
                label="Then I will (one specific action)"
                value={data.planThen}
                onChange={(v) => update("planThen", v)}
                placeholder="e.g., put my phone in another room and do 5 minutes of reading"
              />
              <Hint>Quality check: could someone watching you tell you did it?</Hint>
            </div>
          )}

          {current.id === "success" && (
            <div>
              <h1 style={styles.h1}>Success & Failure Reflection (last 12 months)</h1>
              <p style={styles.p}>
                Now we connect WOOP to your Success course objective: awareness of your personal definitions of
                success/failure.
              </p>

              <FieldArea
                label="One success in the last 12 months"
                value={data.last12moSuccess}
                onChange={(v) => update("last12moSuccess", v)}
                placeholder="What happened? Why do you count it as success?"
              />
              <FieldArea
                label="One failure in the last 12 months"
                value={data.last12moFailure}
                onChange={(v) => update("last12moFailure", v)}
                placeholder="What happened? What belief did it trigger about you?"
              />
              <FieldArea
                label="What does it mean to be successful?"
                value={data.meaningSuccess}
                onChange={(v) => update("meaningSuccess", v)}
                placeholder="Your definition, not Instagram’s"
              />
              <FieldArea
                label="How does success feel in your body?"
                value={data.feltSuccess}
                onChange={(v) => update("feltSuccess", v)}
              />
              <FieldArea
                label="How does failure feel in your body?"
                value={data.feltFailure}
                onChange={(v) => update("feltFailure", v)}
              />

              <FieldArea
                label="Notes on classmates’ ideas (patterns/differences)"
                value={data.peersNotes}
                onChange={(v) => update("peersNotes", v)}
                placeholder="What do other people call success? What do you disagree with?"
              />

              <Field
                label="Check-in date (WOOP works best as a habit)"
                value={data.checkInDate}
                onChange={(v) => update("checkInDate", v)}
                placeholder="e.g., 2026-02-23"
              />
            </div>
          )}

          {current.id === "wrap" && (
            <div>
              <h1 style={styles.h1}>Your WOOP Card</h1>
              <div style={styles.woopCard}>
                <div style={styles.cardRow}>
                  <b>WISH:</b> {data.wish || "…"}{" "}
                </div>
                <div style={styles.cardRow}>
                  <b>OUTCOME:</b> {data.outcome || "…"}{" "}
                </div>
                <div style={styles.cardRow}>
                  <b>OBSTACLE:</b> {data.obstacle || "…"}{" "}
                </div>
                <div style={styles.cardRow}>
                  <b>PLAN:</b> <br />
                  <b>When</b> {data.planWhen || "…"}, <b>then I will</b> {data.planThen || "…"}
                </div>
              </div>

              <div style={styles.row}>
                <button style={styles.primary} onClick={copyToClipboard}>
                  Copy for Notion
                </button>
                <button style={styles.btnGhost} onClick={() => window.print()}>
                  Print
                </button>
                <button style={styles.btnGhost} onClick={resetAll}>
                  Start New
                </button>
              </div>

              <div style={styles.box}>
                <div style={styles.boxTitle}>Notion Export Preview</div>
                <pre style={styles.pre}>{notionExport}</pre>
              </div>
            </div>
          )}
        </div>

        <Nav step={step} setStep={setStep} canNext={canNext} />
      </main>

      <footer style={styles.footer}>
        Based on the WOOP strategy developed by Gabriele Oettingen & Peter M. Gollwitzer; classroom materials by
        Character Lab.
      </footer>
    </div>
  );
}

function StepBar({ step }) {
  return (
    <div style={styles.stepBar}>
      {STEPS.map((s, i) => (
        <div key={s.id} style={{ ...styles.step, ...(i === step ? styles.stepActive : i < step ? styles.stepDone : {}) }}>
          {i + 1}. {s.title}
        </div>
      ))}
    </div>
  );
}

function Nav({ step, setStep, canNext }) {
  return (
    <div style={styles.nav}>
      <button style={styles.btnGhost} onClick={() => setStep((x) => Math.max(0, x - 1))} disabled={step === 0}>
        Back
      </button>
      <button
        style={{ ...styles.primary, opacity: canNext ? 1 : 0.4 }}
        onClick={() => canNext && setStep((x) => Math.min(STEPS.length - 1, x + 1))}
      >
        {step === STEPS.length - 1 ? "Done" : "Next"}
      </button>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }) {
  return (
    <div style={styles.field}>
      <div style={styles.label}>{label}</div>
      <input style={styles.input} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function FieldArea({ label, value, onChange, placeholder }) {
  return (
    <div style={styles.field}>
      <div style={styles.label}>{label}</div>
      <textarea style={styles.textarea} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function Hint({ children }) {
  return <div style={styles.hint}>{children}</div>;
}

const styles = {
  page: {
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
    background: "#f6f7fb",
    minHeight: "100vh",
  },
  header: {
    position: "sticky",
    top: 0,
    background: "white",
    borderBottom: "1px solid #e5e7eb",
    padding: "14px 18px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 20,
  },
  logo: {
    background: "#4f46e5",
    color: "white",
    fontWeight: 900,
    borderRadius: 10,
    padding: "8px 10px",
    letterSpacing: 1,
  },
  main: { maxWidth: 980, margin: "0 auto", padding: 18, display: "grid", gap: 14 },
  panel: {
    maxWidth: 980,
    margin: "12px auto 0",
    padding: 14,
    background: "#eef2ff",
    border: "1px solid #c7d2fe",
    borderRadius: 14,
  },
  stepBar: { display: "flex", gap: 8, flexWrap: "wrap" },
  step: {
    fontSize: 12,
    padding: "8px 10px",
    borderRadius: 999,
    border: "1px solid #e5e7eb",
    background: "white",
    opacity: 0.75,
  },
  stepActive: { background: "#111827", color: "white", opacity: 1, borderColor: "#111827" },
  stepDone: { background: "#d1fae5", borderColor: "#6ee7b7", opacity: 1 },
  content: { background: "white", border: "1px solid #e5e7eb", borderRadius: 18, padding: 18 },
  h1: { margin: "4px 0 6px", fontSize: 28, letterSpacing: -0.2 },
  p: { margin: "0 0 14px", opacity: 0.85, lineHeight: 1.5 },
  field: { marginBottom: 12 },
  label: { fontWeight: 800, marginBottom: 6 },
  input: { width: "100%", padding: "12px 12px", borderRadius: 12, border: "1px solid #d1d5db", fontSize: 15 },
  textarea: {
    width: "100%",
    padding: "12px 12px",
    borderRadius: 12,
    border: "1px solid #d1d5db",
    minHeight: 110,
    fontSize: 15,
  },
  hint: { fontSize: 13, opacity: 0.7, marginTop: 6 },
  nav: { display: "flex", justifyContent: "space-between", gap: 10 },
  btn: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid #2563eb",
    background: "#2563eb",
    color: "white",
    fontWeight: 800,
    cursor: "pointer",
  },
  btnGhost: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid #d1d5db",
    background: "white",
    fontWeight: 800,
    cursor: "pointer",
  },
  primary: {
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid #4f46e5",
    background: "#4f46e5",
    color: "white",
    fontWeight: 900,
    cursor: "pointer",
  },
  grid2: {
    display: "grid",
    gap: 12,
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    marginBottom: 12,
  },
  box: { padding: 14, background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 14 },
  boxTitle: { fontWeight: 900, marginBottom: 6 },
  timerBox: {
    marginTop: 12,
    padding: 14,
    borderRadius: 14,
    border: "1px solid #bfdbfe",
    background: "#eff6ff",
  },
  timerRow: { display: "flex", gap: 10, alignItems: "center" },
  time: { fontSize: 22, fontWeight: 900, width: 78, textAlign: "center" },
  woopCard: { border: "2px solid #111827", borderRadius: 16, padding: 14, background: "#fff" },
  cardRow: { marginBottom: 8, lineHeight: 1.4 },
  pre: {
    whiteSpace: "pre-wrap",
    background: "#0b1020",
    color: "#e5e7eb",
    padding: 12,
    borderRadius: 14,
    overflow: "auto",
  },
  row: { display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 },
  small: { fontSize: 12, opacity: 0.85, lineHeight: 1.35 },
  cardBtn: {
    textAlign: "left",
    padding: 12,
    borderRadius: 14,
    border: "1px solid #dbeafe",
    background: "white",
    cursor: "pointer",
  },
  footer: { textAlign: "center", padding: 22, opacity: 0.6, fontSize: 12 },
};
