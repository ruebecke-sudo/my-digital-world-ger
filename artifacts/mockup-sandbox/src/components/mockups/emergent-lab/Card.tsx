import { ExternalLink, Zap, Smartphone, Globe, Users } from "lucide-react";

export function Card() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-6">
      <div
        style={{
          width: 380,
          background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%)",
          border: "1px solid rgba(139, 92, 246, 0.3)",
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 25px 60px rgba(139, 92, 246, 0.15), 0 0 0 1px rgba(139,92,246,0.1)",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(59,130,246,0.1) 100%)",
            borderBottom: "1px solid rgba(139,92,246,0.2)",
            padding: "24px 24px 20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
            <div
              style={{
                width: 40,
                height: 40,
                background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                fontWeight: 700,
                color: "#fff",
                flexShrink: 0,
              }}
            >
              e
            </div>
            <div>
              <div style={{ color: "#f8fafc", fontSize: 20, fontWeight: 700, lineHeight: 1.2 }}>
                Emergent Lab
              </div>
              <div style={{ color: "#8b5cf6", fontSize: 11, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                YC S24 · AI App Builder
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "20px 24px" }}>
          {/* Description */}
          <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
            Erstelle vollständige <strong style={{ color: "#e2e8f0" }}>Full-Stack Web- & Mobile-Apps</strong> in Minuten – mit KI. Kein Code-Wissen nötig.
          </p>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 20,
              background: "rgba(139,92,246,0.08)",
              borderRadius: 10,
              padding: "10px 14px",
              border: "1px solid rgba(139,92,246,0.15)",
            }}
          >
            <Users size={14} color="#8b5cf6" />
            <span style={{ color: "#c4b5fd", fontSize: 13, fontWeight: 600 }}>3M+ Nutzer</span>
            <span style={{ color: "#475569", fontSize: 12 }}>weltweit</span>
          </div>

          {/* Features */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
            {[
              { icon: <Zap size={14} color="#f59e0b" />, label: "Apps in Minuten deployen" },
              { icon: <Globe size={14} color="#22d3ee" />, label: "Web-Apps mit KI generieren" },
              { icon: <Smartphone size={14} color="#34d399" />, label: "Mobile Apps für iOS & Android" },
            ].map(({ icon, label }, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 12px",
                  borderRadius: 8,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {icon}
                <span style={{ color: "#cbd5e1", fontSize: 13 }}>{label}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href="https://app.emergent.sh/?via=rudiger"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              width: "100%",
              padding: "13px 0",
              borderRadius: 12,
              background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(139,92,246,0.4)",
              cursor: "pointer",
              letterSpacing: "0.02em",
            }}
          >
            Jetzt kostenlos starten
            <ExternalLink size={14} />
          </a>

          <p style={{ color: "#475569", fontSize: 11, textAlign: "center", marginTop: 10 }}>
            Kostenlos loslegen · Kein Kreditkarte erforderlich
          </p>
        </div>
      </div>
    </div>
  );
}
