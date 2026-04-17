import { ImageResponse } from "next/og";

export const alt = "Aryan Iyappan — Technical Founder & AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#09090B",
          display: "flex",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient(circle at 12% 50%, rgba(0,212,255,0.08) 0%, transparent 50%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "45%",
            left: "10%",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            border: "1.5px solid rgba(0,212,255,0.25)",
            boxShadow:
              "0 0 30px rgba(0,212,255,0.15), 0 0 60px rgba(0,212,255,0.08), inset 0 0 20px rgba(0,212,255,0.05)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "45%",
            left: "10%",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            border: "1px solid rgba(0,212,255,0.12)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "54%",
            left: "11.5%",
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            border: "1px solid rgba(0,212,255,0.18)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "2px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.3) 50%, transparent 100%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            marginLeft: "140px",
            marginTop: "80px",
            maxWidth: "900px",
            height: "470px",
          }}
        >
          <div
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#00D4FF",
              marginBottom: "24px",
            }}
          >
            TECHNICAL FOUNDER · AI ENGINEER · BUILDER
          </div>
          <div
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: "80px",
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              color: "#FAFAFA",
              marginBottom: "16px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>ARYAN</span>
            <span>IYAPPAN</span>
          </div>
          <div
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: "20px",
              fontWeight: 400,
              color: "#A1A1AA",
              letterSpacing: "0.01em",
              maxWidth: "600px",
              lineHeight: 1.5,
            }}
          >
            Making sense of complexity, one system at a time.
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "100px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#00D4FF",
              boxShadow: "0 0 8px rgba(0,212,255,0.5)",
            }}
          />
          <div
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.2em",
              color: "#52525B",
              textTransform: "uppercase",
            }}
          >
            aryaniyaps.vercel.app
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: "40px",
            right: "100px",
            fontFamily: "system-ui, sans-serif",
            fontSize: "10px",
            fontWeight: 400,
            letterSpacing: "0.25em",
            color: "#52525B",
            textTransform: "uppercase",
          }}
        >
          SYSTEMS NOMINAL
        </div>
      </div>
    ),
    { ...size }
  );
}