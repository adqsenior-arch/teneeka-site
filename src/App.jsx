import { useState, useRef, useEffect } from "react";

const TENEEKA_SYSTEM_PROMPT = `You are an AI representation of Teneeka Barnett — a systems designer, enterprise strategist, and AI transformation leader. You speak in first person as Teneeka.

Core identity:
- Systems designer who zooms out to see how the pieces connect, then builds the infrastructure to execute
- Thought partner to executive teams at HubSpot (7,000+ employees, $2B+ revenue)
- Personally design execution systems for 7 primary and 4 second-tier strategic objectives, and build the operating model through which PMs drive dependency review and execution across 80-90 company-level goals
- Built the Company Pillar operating system that enabled Corporate Strategy's mandate to compress planning from 8 months to 3 — translating enterprise governance into actionable execution
- Partner directly with Corporate Strategy (Sr. Director and Sr. Analyst) to thought partner on direction and co-design execution frameworks
- Gap-spotter who builds: I identify strategic and operational gaps, build proposals to close them, and take ownership

Your approach:
- You see what others miss — invisible dependencies, unvoiced stakeholder needs, missing infrastructure everyone works around but nobody names
- You zoom out first — see the whole system, how the pieces connect, where the gaps are
- Then you build the infrastructure: operating models, governance, dependency management, execution systems
- You co-formulate strategy with executive leaders, not just execute it
- You design for iteration, not just implementation — every system you build is continuously optimized
- You apply this same lens to AI transformation — gemba-based process mapping, workflow redesign, team capability building, scalable playbooks
- You designed an AI hackathon (L&D driven), are developing AI-first ops playbooks, and redesigned planning processes with automation
- You reframed an executive governance proposal from "what I want to own" to "how decisions flow to you" — using SCARF framework to reshape how leadership receives information
- You designed a strategic onboarding architecture that eliminated tribal knowledge dependency — self-serve navigation iterated through 8 versions so new leaders orient without 45-minute briefings
- Originally owned one function; expanded to three (Legal, Finance, People) based on the quality of systems delivered — 3x scope expansion

Your philosophy:
- Build the infrastructure so the team doesn't depend on any one person
- You take ambiguous, multi-stakeholder work and create structure where none existed
- You lead through influence, not authority
- The best operators zoom out before they build
- Design for iteration, not just implementation
- As a Certified Executive Coach, you don't just build systems — you build alignment. The coaching training is why executives trust you in the room: you know how to ask the right questions, create clarity from ambiguity, and guide teams toward shared direction

Your background: Nearly a decade at EY across two stints (2007-2016, 2020-2021) — progressed across multiple roles, and the trust built with senior leadership was deep enough that a partner created a role for the return. Managed $5-6M client portfolios, developed client engagement models, founding partner said "it is hard to imagine what more Teneeka could have done to enhance the impact," clients requested to work with you by name, consistently rated above peer performance. This is where you developed your client leadership orientation. Also: SaaS (HubSpot, Block), e-commerce (Amazon — first in role, built strategic touchpoint framework for 65K+ foreign nationals, recognized for 2 years of impact in 7.5 months). Master's from York University. Harvard Business School (Strategy Execution). Certified Executive Coach. Certified AI Transformation Leader (CAITL, in progress). Chief of AI Fellow.

Passion project: Backstage — an AI-powered app for competitive dance families. You're building it because you live the chaos of competitive dance parenting and saw a problem no one was solving.

Tone: Warm but direct. Confident without being corporate. You use plain language, not buzzwords. You're genuinely enthusiastic about systems design and making things work better. Brief and punchy — you don't over-explain.

Keep responses concise (2-4 sentences unless asked to go deeper). Be real, be human, show personality.`;

const SECTIONS = ["home", "story", "systems", "backstage", "ask"];

export default function TeneekaSite() {
  const [activeSection, setActiveSection] = useState("home");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const chatEndRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setScrollY(containerRef.current.scrollTop);
      }
    };
    const el = containerRef.current;
    if (el) el.addEventListener("scroll", handleScroll);
    return () => { if (el) el.removeEventListener("scroll", handleScroll); };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setIsLoading(true);

    try {
      const conversationHistory = [...messages, { role: "user", content: userMsg }].map(m => ({
        role: m.role, content: m.content
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversationHistory })
      });

      const data = await response.json();
      const text = data.content?.map(b => b.type === "text" ? b.text : "").join("") || "Hmm, let me think about that differently. Ask me again?";
      setMessages(prev => [...prev, { role: "assistant", content: text }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", content: "Something went wrong — but I promise I'm usually more reliable than this. Try again?" }]);
    }
    setIsLoading(false);
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "story", label: "Story" },
    { id: "systems", label: "How I Think" },
    { id: "backstage", label: "Backstage" },
    { id: "ask", label: "Ask My AI" }
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={containerRef} style={{
      background: "#0A0A0A",
      color: "#F5F0EB",
      fontFamily: "'DM Sans', sans-serif",
      minHeight: "100vh",
      overflowY: "auto",
      overflowX: "hidden",
      position: "relative"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        ::selection { background: #E8734A; color: #0A0A0A; }
        
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .nav-item {
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }
        
        .nav-item::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1.5px;
          background: #E8734A;
          transition: width 0.3s ease;
        }
        
        .nav-item:hover::after,
        .nav-item.active::after {
          width: 100%;
        }

        .chat-input:focus {
          outline: none;
          border-color: #E8734A;
        }

        .send-btn {
          transition: all 0.2s ease;
          cursor: pointer;
        }
        
        .send-btn:hover {
          background: #E8734A !important;
          color: #0A0A0A !important;
        }

        .card-hover {
          transition: all 0.4s ease;
        }
        
        .card-hover:hover {
          transform: translateY(-4px);
          border-color: #E8734A !important;
        }

        .accent-link {
          color: #E8734A;
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: border-color 0.3s ease;
        }
        
        .accent-link:hover {
          border-bottom-color: #E8734A;
        }

        .tag {
          display: inline-block;
          padding: 6px 14px;
          border: 1px solid rgba(245,240,235,0.15);
          border-radius: 100px;
          font-size: 12px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: #B8AFA5;
          margin: 4px;
          transition: all 0.3s ease;
        }

        .tag:hover {
          border-color: #E8734A;
          color: #E8734A;
        }

        .message-bubble {
          animation: fadeUp 0.3s ease forwards;
        }

        .typing-dot {
          animation: pulse 1.2s infinite;
        }

        .section-divider {
          width: 60px;
          height: 2px;
          background: #E8734A;
          margin: 0 0 40px 0;
        }

        .hero-accent {
          background: linear-gradient(135deg, #E8734A, #F4A261, #E8734A);
          background-size: 200% 200%;
          animation: gradientShift 6s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .grain-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          opacity: 0.03;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          z-index: 0;
        }
      `}</style>

      <div className="grain-overlay" />

      {/* NAV */}
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "20px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: scrollY > 50 ? "rgba(10,10,10,0.9)" : "transparent",
        backdropFilter: scrollY > 50 ? "blur(20px)" : "none",
        transition: "all 0.4s ease",
        borderBottom: scrollY > 50 ? "1px solid rgba(245,240,235,0.06)" : "1px solid transparent"
      }}>
        <div style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: "22px",
          letterSpacing: "-0.5px",
          cursor: "pointer"
        }} onClick={() => scrollToSection("home")}>
          TB<span style={{ color: "#E8734A" }}>.</span>
        </div>
        <div style={{ display: "flex", gap: "32px" }}>
          {navItems.map(item => (
            <span
              key={item.id}
              className={`nav-item ${activeSection === item.id ? "active" : ""}`}
              onClick={() => scrollToSection(item.id)}
              onMouseEnter={() => setHoveredNav(item.id)}
              onMouseLeave={() => setHoveredNav(null)}
              style={{
                fontSize: "13px",
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: activeSection === item.id || hoveredNav === item.id ? "#F5F0EB" : "#7A7168",
                fontWeight: 500
              }}
            >
              {item.label}
            </span>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section id="home" style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 60px",
        position: "relative",
        animation: "fadeIn 1s ease"
      }}>
        <div style={{ maxWidth: "900px" }}>
          <p style={{
            fontSize: "13px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#E8734A",
            marginBottom: "24px",
            fontWeight: 500,
            animation: "fadeUp 0.8s ease forwards",
            animationDelay: "0.2s",
            opacity: 0
          }}>
            Strategist &nbsp;&bull;&nbsp; Systems Designer &nbsp;&bull;&nbsp; Builder &nbsp;&bull;&nbsp; Operator
          </p>
          
          <h1 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(48px, 8vw, 96px)",
            fontWeight: 400,
            lineHeight: 1.0,
            letterSpacing: "-2px",
            marginBottom: "32px",
            animation: "fadeUp 0.8s ease forwards",
            animationDelay: "0.4s",
            opacity: 0
          }}>
            Teneeka<br />
            <span className="hero-accent">Barnett</span>
          </h1>
          
          <p style={{
            fontSize: "20px",
            lineHeight: 1.7,
            color: "#B8AFA5",
            maxWidth: "600px",
            fontWeight: 300,
            animation: "fadeUp 0.8s ease forwards",
            animationDelay: "0.6s",
            opacity: 0
          }}>
            I co-formulate strategy with executive leadership, then build the systems 
            that make it executable — using AI to unlock speed, efficiency, and scale. 
            Strategy is just a story until someone builds the infrastructure to deliver it.
          </p>

          <div style={{
            display: "flex",
            gap: "16px",
            marginTop: "48px",
            animation: "fadeUp 0.8s ease forwards",
            animationDelay: "0.8s",
            opacity: 0
          }}>
            <button
              onClick={() => scrollToSection("ask")}
              style={{
                padding: "14px 32px",
                background: "#E8734A",
                color: "#0A0A0A",
                border: "none",
                borderRadius: "2px",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.3s ease"
              }}
            >
              Ask My AI →
            </button>
            <button
              onClick={() => scrollToSection("story")}
              style={{
                padding: "14px 32px",
                background: "transparent",
                color: "#F5F0EB",
                border: "1px solid rgba(245,240,235,0.2)",
                borderRadius: "2px",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.3s ease"
              }}
            >
              My Story
            </button>
          </div>
        </div>

        {/* Decorative element */}
        <div style={{
          position: "absolute",
          right: "60px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "1px",
          height: "200px",
          background: "linear-gradient(to bottom, transparent, #E8734A, transparent)",
          opacity: 0.3
        }} />
      </section>

      {/* STORY */}
      <section id="story" style={{
        minHeight: "100vh",
        padding: "120px 60px",
        display: "flex",
        alignItems: "center"
      }}>
        <div style={{ maxWidth: "800px" }}>
          <p style={{
            fontSize: "13px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#E8734A",
            marginBottom: "16px",
            fontWeight: 500
          }}>01 / Story</p>
          <div className="section-divider" />
          
          <h2 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(36px, 5vw, 56px)",
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: "-1px",
            marginBottom: "48px"
          }}>
            I take ambiguous,<br />
            <span style={{ color: "#E8734A", fontStyle: "italic" }}>multi-stakeholder chaos</span><br />
            and create structure.
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "40px"
          }}>
            <div>
              <p style={{ fontSize: "16px", lineHeight: 1.8, color: "#B8AFA5", fontWeight: 300 }}>
                Everywhere I go, the pattern is the same: I become the person executive teams 
                think with. I sit across domains — legal, finance, people ops, corporate strategy 
                — and help leadership see how the pieces connect, where the gaps are, and what 
                direction to move. Then I build the system that makes that direction executable: 
                the operating models, checklists, dependency frameworks, and AI playbooks that 
                turn strategic intent into repeatable delivery.
              </p>
            </div>
            <div>
              <p style={{ fontSize: "16px", lineHeight: 1.8, color: "#B8AFA5", fontWeight: 300 }}>
                I built my foundation across nearly a decade at EY — progressing across 
                multiple roles, managing $5–6M client portfolios, developing client 
                engagement models, and partnering with founding partners as a trusted strategic 
                advisor. Consistently rated above peer performance across every dimension. 
                That's where I learned to think with the most senior leaders in the room 
                and design how organizations deliver value.
              </p>
              <p style={{ fontSize: "16px", lineHeight: 1.8, color: "#B8AFA5", fontWeight: 300, marginTop: "20px" }}>
                At HubSpot, that means shaping how pillar strategy is formed with executive 
                leadership across 11 strategic objectives — and designing the review infrastructure 
                that keeps 80–90 company-level goals on track. At Amazon, hired into a newly 
                created role — senior leadership recognized two years of projected impact in 
                7.5 months. Block, Sun Life — same pattern, different scale.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", marginTop: "48px" }}>
            {["HubSpot", "Block", "Amazon", "EY", "Sun Life", "York University (M.A.)", "Harvard Business School", "Executive Coach", "AI Transformation Leader (CAITL)", "Chief of AI Fellow"].map(t => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>

          <div style={{
            marginTop: "48px",
            padding: "36px 40px",
            border: "1px solid rgba(232,115,74,0.25)",
            borderRadius: "4px",
            background: "rgba(232,115,74,0.04)",
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: "32px",
            alignItems: "center"
          }}>
            <div style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              border: "2px solid #E8734A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontFamily: "'Instrument Serif', serif",
              color: "#E8734A",
              flexShrink: 0
            }}>EC</div>
            <div>
              <p style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#F5F0EB",
                marginBottom: "8px",
                letterSpacing: "-0.3px"
              }}>
                Certified Executive Coach
              </p>
              <p style={{
                fontSize: "15px",
                lineHeight: 1.7,
                color: "#B8AFA5",
                fontWeight: 300
              }}>
                The "thought partner" label isn't proximity — it's a trained discipline. I know 
                how to ask the questions that create clarity from ambiguity, guide leadership teams 
                toward alignment, and build buy-in before building infrastructure. 
                It's why executives trust me in the room.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDING PARTNER QUOTE */}
      <section style={{
        padding: "80px 60px",
        background: "#0A0A0A",
        display: "flex",
        justifyContent: "center"
      }}>
        <div style={{
          maxWidth: "700px",
          textAlign: "center"
        }}>
          <p style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "28px",
            fontStyle: "italic",
            lineHeight: 1.5,
            color: "#F5F0EB",
            marginBottom: "20px"
          }}>
            "It is hard to imagine what more Teneeka could have done to enhance the impact."
          </p>
          <p style={{
            fontSize: "13px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "#E8734A",
            fontWeight: 500
          }}>
            Founding Partner, Ernst & Young
          </p>
        </div>
      </section>

      {/* HOW I THINK — WITH RECEIPTS */}
      <section id="systems" style={{
        minHeight: "100vh",
        padding: "120px 60px",
        background: "linear-gradient(180deg, #0A0A0A 0%, #111111 50%, #0A0A0A 100%)"
      }}>
        <div style={{ maxWidth: "900px" }}>
          <p style={{
            fontSize: "13px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#E8734A",
            marginBottom: "16px",
            fontWeight: 500
          }}>02 / How I Think — With Receipts</p>
          <div className="section-divider" />

          <h2 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(36px, 5vw, 56px)",
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: "-1px",
            marginBottom: "64px"
          }}>
            Think with leaders.<br/>See how it connects.<br/><span style={{ color: "#E8734A", fontStyle: "italic" }}>Build the system.</span>
          </h2>

          {/* Evidence cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {[
              {
                num: "01",
                title: "Think with leaders",
                instinct: "I become the person leaders think with — across domains, across levels, across companies. I help shape strategic direction, then design the communications and frameworks that enable leadership teams to align and act.",
                evidence: [
                  "Nearly a decade at EY — trusted strategic partner to founding partners, developed client engagement models that drove retention and growth across a $5–6M portfolio",
                  "Designed SCARF-based executive communications frameworks that reshape how leadership receives and acts on operational information — including reframing a governance proposal from 'what I want to own' to 'how decisions flow to you'",
                  "Build the communications layer behind every system — exec briefings, stakeholder alignment artifacts, and decision frameworks that turn infrastructure into leadership action",
                  "Certified Executive Coach — trained to guide strategic clarity, build alignment, and enable leadership teams to move from ambiguity to direction"
                ]
              },
              {
                num: "02",
                title: "See how it connects",
                instinct: "I zoom out to find where the system is missing — where dependencies are invisible, where the business is blocked, where leadership needs infrastructure that doesn't exist yet.",
                evidence: [
                  "Identified and closed structural gaps — from invisible cross-functional dependencies to missing planning infrastructure to unvoiced executive stakeholder needs. Earned 3x scope expansion from Legal to full mandate across Legal, Finance, and People",
                  "Built the operating system that enabled a mandate to compress planning from 8 months to 3 — a critical unlock for business teams dependent on Legal, Finance, and People moving faster and aligning",
                  "Designed a strategic onboarding architecture that eliminated tribal knowledge dependency — self-serve navigation system iterated through 8 versions so new leaders orient without 45-minute briefings",
                  "Piloting gemba-based process mapping to de-complexify the operating system, build efficiency, and surface sustainable automation opportunities"
                ]
              },
              {
                num: "03",
                title: "Build the system — including AI",
                instinct: "I don't just talk about AI adoption. I design the learning experiences that build team capability, and I build AI directly into the planning infrastructure to unlock speed and scale.",
                evidence: [
                  "Built a five-module AI planning platform that cut manual PM effort by 75%+ and introduced the org's first quantitative portfolio health metric",
                  "Designed an L&D-driven AI hackathon — 6 team members generated high-potential use cases, several now being refined for production",
                  "Actively AI-ifying the planning process — from automated status detection to exception-based workflows to AI-first operations playbooks",
                  "Redesigned planning workflows to shift PMs from manual collection to exception-based auditing, freeing capacity for strategic execution"
                ]
              }
            ].map(card => (
              <div key={card.num} className="card-hover" style={{
                padding: "40px",
                border: "1px solid rgba(245,240,235,0.08)",
                borderRadius: "4px",
                background: "rgba(245,240,235,0.02)",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "36px"
              }}>
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "16px" }}>
                    <span style={{
                      fontFamily: "'Instrument Serif', serif",
                      fontSize: "36px",
                      color: "#E8734A",
                      opacity: 0.4
                    }}>{card.num}</span>
                    <h3 style={{
                      fontSize: "20px",
                      fontWeight: 700,
                      letterSpacing: "-0.3px",
                      color: "#F5F0EB"
                    }}>{card.title}</h3>
                  </div>
                  <p style={{
                    fontSize: "15px",
                    lineHeight: 1.8,
                    color: "#B8AFA5",
                    fontWeight: 300
                  }}>{card.instinct}</p>
                </div>
                <div>
                  <p style={{
                    fontSize: "11px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "#E8734A",
                    marginBottom: "16px",
                    fontWeight: 600
                  }}>Evidence</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {card.evidence.map((e, i) => (
                      <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                        <span style={{ 
                          color: "#E8734A", 
                          fontSize: "8px", 
                          marginTop: "7px",
                          flexShrink: 0 
                        }}>{"\u25A0"}</span>
                        <p style={{
                          fontSize: "13px",
                          lineHeight: 1.6,
                          color: "#7A7168",
                          fontWeight: 400
                        }}>{e}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: "48px",
            padding: "40px",
            borderLeft: "2px solid #E8734A",
            background: "rgba(232,115,74,0.03)"
          }}>
            <p style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "24px",
              fontStyle: "italic",
              lineHeight: 1.6,
              color: "#F5F0EB"
            }}>
              "When the company mandated compressing planning from 8 months to 3, Corporate 
              Strategy built the governing framework. I built the operating system that 
              made it real for Legal, Finance, and People — and I'm still optimizing it. 
              I design for iteration, not just implementation."
            </p>
          </div>
        </div>
      </section>

      {/* I SEE WHAT OTHERS MISS */}
      <section style={{
        padding: "80px 60px",
        background: "#0A0A0A",
        display: "flex",
        justifyContent: "center"
      }}>
        <div style={{
          maxWidth: "700px",
          textAlign: "center"
        }}>
          <p style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 400,
            lineHeight: 1.3,
            color: "#F5F0EB",
            marginBottom: "20px"
          }}>
            I see what others miss<span style={{ color: "#E8734A" }}>.</span>
          </p>
          <p style={{
            fontSize: "16px",
            lineHeight: 1.8,
            color: "#7A7168",
            fontWeight: 300,
            maxWidth: "520px",
            margin: "0 auto"
          }}>
            Invisible dependencies. Unvoiced stakeholder needs. Missing infrastructure 
            everyone works around but nobody names. I find it, I build the system to 
            close it, and the organization expands my mandate because of it.
          </p>
        </div>
      </section>

      {/* BACKSTAGE */}
      <section id="backstage" style={{
        minHeight: "100vh",
        padding: "120px 60px",
        display: "flex",
        alignItems: "center"
      }}>
        <div style={{ maxWidth: "800px" }}>
          <p style={{
            fontSize: "13px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#E8734A",
            marginBottom: "16px",
            fontWeight: 500
          }}>03 / Passion Project</p>
          <div className="section-divider" />

          <h2 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(36px, 5vw, 56px)",
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: "-1px",
            marginBottom: "24px"
          }}>
            Backstage<span style={{ color: "#E8734A" }}>.</span>
          </h2>
          <p style={{
            fontSize: "14px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "#7A7168",
            marginBottom: "48px"
          }}>AI-powered competitive dance management</p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "40px",
            marginBottom: "48px"
          }}>
            <div>
              <p style={{ fontSize: "16px", lineHeight: 1.8, color: "#B8AFA5", fontWeight: 300 }}>
                If you've ever been a competitive dance parent, you know the chaos: 
                rehearsal schedules across multiple studios, costume deadlines, competition 
                logistics, and the constant "wait, when is that thing?" Every parent I know 
                lives in a maze of group chats and screenshots.
              </p>
            </div>
            <div>
              <p style={{ fontSize: "16px", lineHeight: 1.8, color: "#B8AFA5", fontWeight: 300 }}>
                So I built the solution. Backstage uses AI and OCR to extract schedules 
                from studio documents, organizes everything in one place, and has a natural 
                language Q&A feature — "Ask Backstage" — so parents can just ask "when is 
                Sophia's next rehearsal?" instead of digging through screenshots.
              </p>
            </div>
          </div>

          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px"
          }}>
            {["AI/OCR Schedule Extraction", "Natural Language Q&A", "Multi-Studio Support", "COPPA Compliant", "Built in Replit"].map(t => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>

          <div style={{
            marginTop: "48px",
            padding: "32px",
            border: "1px solid rgba(245,240,235,0.08)",
            borderRadius: "4px",
            background: "rgba(245,240,235,0.02)"
          }}>
            <p style={{
              fontSize: "14px",
              color: "#7A7168",
              fontWeight: 300,
              lineHeight: 1.6
            }}>
              <span style={{ color: "#E8734A", fontWeight: 700 }}>Why this matters professionally:</span>{" "}
              This isn't just a side project — it's proof that I think in systems everywhere. 
              I saw a broken workflow, mapped the actual user pain, designed an AI-powered solution, 
              built the MVP, ran competitive analysis, and modeled the unit economics. 
              Same muscle, different domain.
            </p>
          </div>
        </div>
      </section>

      {/* ASK MY AI */}
      <section id="ask" style={{
        minHeight: "100vh",
        padding: "120px 60px",
        background: "linear-gradient(180deg, #0A0A0A 0%, #0F0F0F 100%)"
      }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{
              fontSize: "13px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#E8734A",
              marginBottom: "16px",
              fontWeight: 500
            }}>04 / Interactive</p>
            <div className="section-divider" style={{ margin: "0 auto 40px auto" }} />
            
            <h2 style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "clamp(36px, 5vw, 48px)",
              fontWeight: 400,
              lineHeight: 1.15,
              letterSpacing: "-1px",
              marginBottom: "16px"
            }}>
              Ask my AI<span style={{ color: "#E8734A" }}>.</span>
            </h2>
            <p style={{
              fontSize: "16px",
              color: "#7A7168",
              fontWeight: 300
            }}>
              Curious about how I think about systems, AI, or operations? Ask away.
            </p>
          </div>

          {/* Chat area */}
          <div style={{
            border: "1px solid rgba(245,240,235,0.08)",
            borderRadius: "6px",
            background: "rgba(245,240,235,0.02)",
            overflow: "hidden"
          }}>
            <div style={{
              height: "400px",
              overflowY: "auto",
              padding: "24px"
            }}>
              {messages.length === 0 && (
                <div style={{ textAlign: "center", padding: "60px 20px" }}>
                  <p style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: "24px",
                    color: "#3A3530",
                    fontStyle: "italic",
                    marginBottom: "24px"
                  }}>
                    "What's a systems designer, anyway?"
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px" }}>
                    {[
                      "How do you approach AI transformation?",
                      "What's your biggest build at HubSpot?",
                      "Tell me about Backstage",
                      "What's your approach to building trust with executives?"
                    ].map(q => (
                      <button
                        key={q}
                        onClick={() => { setInput(q); }}
                        style={{
                          padding: "8px 16px",
                          background: "rgba(232,115,74,0.08)",
                          border: "1px solid rgba(232,115,74,0.2)",
                          borderRadius: "100px",
                          color: "#E8734A",
                          fontSize: "12px",
                          cursor: "pointer",
                          fontFamily: "'DM Sans', sans-serif",
                          transition: "all 0.2s ease"
                        }}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className="message-bubble" style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                  marginBottom: "16px"
                }}>
                  <div style={{
                    maxWidth: "80%",
                    padding: "14px 20px",
                    borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    background: msg.role === "user" ? "#E8734A" : "rgba(245,240,235,0.06)",
                    color: msg.role === "user" ? "#0A0A0A" : "#F5F0EB",
                    fontSize: "14px",
                    lineHeight: 1.7,
                    fontWeight: msg.role === "user" ? 500 : 300
                  }}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div style={{ display: "flex", gap: "6px", padding: "14px 20px" }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} className="typing-dot" style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#E8734A",
                      animationDelay: `${i * 0.2}s`
                    }} />
                  ))}
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div style={{
              borderTop: "1px solid rgba(245,240,235,0.06)",
              padding: "16px 20px",
              display: "flex",
              gap: "12px"
            }}>
              <input
                className="chat-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMessage()}
                placeholder="Ask me anything..."
                style={{
                  flex: 1,
                  background: "rgba(245,240,235,0.04)",
                  border: "1px solid rgba(245,240,235,0.1)",
                  borderRadius: "4px",
                  padding: "12px 16px",
                  color: "#F5F0EB",
                  fontSize: "14px",
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "all 0.3s ease"
                }}
              />
              <button
                className="send-btn"
                onClick={sendMessage}
                disabled={isLoading}
                style={{
                  padding: "12px 24px",
                  background: "transparent",
                  border: "1px solid rgba(245,240,235,0.2)",
                  borderRadius: "4px",
                  color: "#F5F0EB",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  fontFamily: "'DM Sans', sans-serif"
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: "60px",
        borderTop: "1px solid rgba(245,240,235,0.06)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div>
          <p style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "24px",
            marginBottom: "8px"
          }}>Let's build something<span style={{ color: "#E8734A" }}>.</span></p>
          <p style={{ fontSize: "14px", color: "#7A7168" }}>teneekabarnett@gmail.com</p>
        </div>
        <p style={{ fontSize: "12px", color: "#3A3530" }}>
          &copy; 2026 Teneeka Barnett. Built with intention.
        </p>
      </footer>
    </div>
  );
}
