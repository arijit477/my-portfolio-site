import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  domain: string;
  category: string;
  featured: boolean;
  badge: string;
  liveUrl: string | null;
  githubUrl: string | null;
  summary: string;
  highlightStats: { label: string; val: string }[];
  techStack: string[];
  features: string[];
  pipelineSteps: { step: string; title: string; desc: string }[];
  challenges: { challenge: string; solution: string }[];
  interviewTakeaway?: string;
}

export interface SkillCategory {
  name: string;
  icon: string;
  color: string;
  skills: { name: string; level: number; tag: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  // Global UI Signals
  selectedProject = signal<Project | null>(null);
  isCvModalOpen = signal<boolean>(false);
  toast = signal<string | null>(null);

  openProjectModal(project: Project): void {
    this.selectedProject.set(project);
    document.body.style.overflow = 'hidden';
  }

  closeProjectModal(): void {
    this.selectedProject.set(null);
    document.body.style.overflow = 'auto';
  }

  openCvModal(): void {
    this.isCvModalOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeCvModal(): void {
    this.isCvModalOpen.set(false);
    document.body.style.overflow = 'auto';
  }

  showToast(msg: string): void {
    this.toast.set(msg);
    setTimeout(() => {
      this.toast.set(null);
    }, 4000);
  }

  private projectsData: Project[] = [
    {
      id: "homeworkplus",
      title: "HomeworkPlus",
      subtitle: "AI-Powered Learning Platform with 9-Agent Pipeline",
      domain: "Education / AI EdTech",
      category: "agentic",
      featured: true,
      badge: "Flagship AI Project",
      liveUrl: "https://homeworkplus.vercel.app/",
      githubUrl: "https://github.com/ArijitMondalVE/homeworkplus",
      summary: "A production-grade AI learning ecosystem that converts photos of complex homework questions into step-by-step interactive tutoring with multimodal reasoning, OCR, voice synthesis, and real-time whiteboard collaboration.",
      highlightStats: [
        { label: "Agents Orchestrated", val: "9 Specialized" },
        { label: "OCR Engines", val: "Dual Pipeline" },
        { label: "Real-Time Latency", val: "< 120ms (WS)" },
        { label: "Knowledge Grounding", val: "ChromaDB RAG" }
      ],
      techStack: [
        "FastAPI", "Python 3.12", "LangChain/LangGraph", "GPT-4o", "Claude 3.5 Sonnet", 
        "ChromaDB", "EasyOCR", "PaddleOCR", "OpenCV", "Whisper STT/TTS", 
        "Angular 19", "Three.js", "Redis", "Celery", "NeonDB / PostgreSQL", "Docker"
      ],
      features: [
        "Photo-to-Answer AI pipeline with mathematical formula & LaTeX rendering",
        "Robust dual OCR preprocessing (EasyOCR + PaddleOCR + OpenCV) with PII masking",
        "ChromaDB vector database retrieval-grounded tutoring to eliminate hallucinations",
        "Voice bi-directional interaction via OpenAI Whisper speech-to-text and neural TTS",
        "Real-time collaborative canvas whiteboard and WebSocket chat channels",
        "Gamified student motivation engine featuring XP, badges, streaks, and leaderboards",
        "Full asynchronous backend with Celery workers, Redis message broker, and JWT auth"
      ],
      pipelineSteps: [
        { step: "01", title: "Image Ingestion & OpenCV Filter", desc: "User uploads image; contrast enhancement, deskewing & PII detection" },
        { step: "02", title: "Dual OCR & LaTeX Extraction", desc: "PaddleOCR & EasyOCR extract text and parse complex mathematical formulas" },
        { step: "03", title: "Intent & Difficulty Classification", desc: "Agent determines academic subject, target grade level, and core concepts" },
        { step: "04", title: "ChromaDB Vector Retrieval", desc: "Embeddings query educational knowledge base to retrieve relevant source context" },
        { step: "05", title: "LangGraph Multi-Agent Reasoning", desc: "Tutor and Math agents collaborate to construct step-by-step pedagogical explanations" },
        { step: "06", title: "Multimodal Voice & UI Dispatch", desc: "Synthesizes Whisper TTS audio and streams formatted LaTeX explanation via WebSockets" }
      ],
      challenges: [
        { challenge: "Noisy/degraded handwriting input", solution: "Engineered multi-pass OpenCV adaptive thresholding alongside dual OCR fallback" },
        { challenge: "LLM hallucination on STEM questions", solution: "Strict RAG grounding over verified curriculum chunks in ChromaDB with confidence gating" },
        { challenge: "Long execution time on heavy vision tasks", solution: "Offloaded compute-heavy OCR and audio generation to background Celery workers with Redis" }
      ],
      interviewTakeaway: "Demonstrated that an AI product is an interconnected pipeline: OCR, classification, vector retrieval, multi-agent reasoning, and voice are modular stages that can be independently benchmarked and tuned."
    },
    {
      id: "rfp-agent",
      title: "RFP Agent",
      subtitle: "Enterprise Request-for-Proposal Agentic Analyzer",
      domain: "Enterprise / Sales Operations",
      category: "agentic",
      featured: true,
      badge: "Enterprise Agentic AI",
      liveUrl: "https://rfp-agent-delta.vercel.app/",
      githubUrl: "https://github.com/ArijitMondalVE/rfp-agent",
      summary: "An autonomous agentic system designed to ingest 100+ page enterprise RFP documents, decompose analysis across dedicated sub-agents, and synthesize structured compliance and bidding intelligence.",
      highlightStats: [
        { label: "Agent Specialists", val: "10+ Roles" },
        { label: "Analysis Speedup", val: "85% Faster" },
        { label: "Vector Search", val: "ChromaDB" },
        { label: "Frontend", val: "Angular Web" }
      ],
      techStack: [
        "Angular", "Python", "FastAPI", "Agentic Orchestration", 
        "ChromaDB", "Document Chunk Store", "Pydantic", "SQL Database"
      ],
      features: [
        "Modular agent architecture isolating analysis for compliance, contracts, deadlines, and scope",
        "Automated extraction of disqualifier criteria, mandatory forms, and staffing requirements",
        "Semantic document chunking and vector index retrieval for massive PDF/DOCX tenders",
        "Structured proposal synthesis aggregating outputs into executive readiness dashboards",
        "Human-in-the-loop validation workbench before final commercial submission"
      ],
      pipelineSteps: [
        { step: "01", title: "RFP Document Upload", desc: "Multi-format tender documents are ingested and partitioned into semantic chunks" },
        { step: "02", title: "Vector Embedding & Indexing", desc: "Chunks are embedded and indexed into ChromaDB for high-recall retrieval" },
        { step: "03", title: "Specialized Agent Dispatch", desc: "Parallel agents analyze Compliance, Deadlines, Disqualifiers, and Scope" },
        { step: "04", title: "Workflow Orchestrator Merge", desc: "Synthesizer merges agent findings into a cohesive, structured proposal analysis" },
        { step: "05", title: "Human Review & Export", desc: "Sales teams inspect AI evidence, edit drafts, and generate proposal readiness reports" }
      ],
      challenges: [
        { challenge: "Massive context size overflowing token limits", solution: "Implemented semantic chunk stores and targeted agent queries instead of single monolithic prompts" },
        { challenge: "High cost of AI hallucinations in legal bids", solution: "Enforced strict document citation requirements and human review checkpoints before export" }
      ],
      interviewTakeaway: "Agentic workflows excel over giant prompts because separating responsibilities makes each domain component testable, explainable, and individually upgradeable."
    },
    {
      id: "ai-yoga-coach",
      title: "AI Yoga Coach",
      subtitle: "Conversational Yoga Coach with Adaptive Personas",
      domain: "Fitness & Wellness",
      category: "genai",
      featured: true,
      badge: "Conversational GenAI",
      liveUrl: "https://ai-yoga-coach-zeta.vercel.app/",
      githubUrl: "https://github.com/arijit477/ai-yoga-coach",
      summary: "An interactive, low-latency conversational yoga coaching application leveraging Google Gemini 2.5 Flash, customizable coach personas, and safety-oriented prompt guardrails.",
      highlightStats: [
        { label: "AI Engine", val: "Gemini 2.5 Flash" },
        { label: "Persona Switch", val: "Supportive / Energetic" },
        { label: "Frontend", val: "React + TS + Vite" },
        { label: "Backend", val: "FastAPI + Uvicorn" }
      ],
      techStack: [
        "React", "TypeScript", "Vite", "FastAPI", "Google Gemini 2.5 Flash", 
        "Google Generative AI SDK", "Pydantic Settings", "CSS3 Animations"
      ],
      features: [
        "Real-time conversational yoga coach with dynamic personality selector (Calm/Supportive vs Energetic/Motivating)",
        "Exercise and asana context injection into model prompts for relevant posture guidance",
        "Ultra-concise response generation tailored for active, mid-workout mobile listening",
        "Rigorous safety prompt engineering with emergency pain and injury disclaimers",
        "Clean decoupled React + TypeScript architecture with environment-based API configs"
      ],
      pipelineSteps: [
        { step: "01", title: "Pose & Coach Selection", desc: "User picks active yoga pose and selects coach persona" },
        { step: "02", title: "Context Injection", desc: "Frontend transmits user utterance bundled with current pose state" },
        { step: "03", title: "Prompt Engine & Safety", desc: "FastAPI wraps request with persona system instructions and injury guardrails" },
        { step: "04", title: "Gemini 2.5 Flash Inference", desc: "Model streams back punchy, motivating, and actionable posture advice" }
      ],
      challenges: [
        { challenge: "Preventing dangerous medical advice", solution: "Engineered hard boundary system prompts that immediately pivot on pain keywords" },
        { challenge: "Lengthy chat responses disrupting workout flow", solution: "Constrained token output and tuned prompt directives for 2-3 sentence actionable cues" }
      ],
      interviewTakeaway: "Demonstrated how to apply tight AI prompt constraints and persona conditioning to craft a hyper-focused domain experience rather than a generic chatbot."
    },
    {
      id: "ai-insurance-portal",
      title: "AI Insurance Portal",
      subtitle: "Full-Stack Policy Guidance & GenAI Assistant",
      domain: "FinTech & Insurance",
      category: "fullstack",
      featured: true,
      badge: "Full-Stack AI Domain App",
      liveUrl: "https://ai-insurance-portal-nnlv.vercel.app",
      githubUrl: "https://github.com/arijit477/ai-insurance-portal",
      summary: "A secure, enterprise-structured full-stack insurance platform integrating OpenAI GPT-4o-mini conversational intelligence with zoneless reactive Angular 17 and FastAPI REST services.",
      highlightStats: [
        { label: "Frontend", val: "Angular 17 Signals" },
        { label: "Backend", val: "FastAPI + SQL" },
        { label: "AI Model", val: "GPT-4o-mini" },
        { label: "Auth", val: "JWT Protected" }
      ],
      techStack: [
        "Angular 17 (Signals & Zoneless)", "Python", "FastAPI", "OpenAI GPT-4o-mini", 
        "SQLite / PostgreSQL", "JWT Auth", "Pydantic Schemas", "Vercel + Render"
      ],
      features: [
        "Conversational policy navigation assisting users with coverage checks and claim FAQs",
        "Grounded knowledge retrieval over structured SQL database to protect policy rules",
        "High-performance zoneless Angular 17 UI utilizing Angular Signals for instant reactivity",
        "Secure JWT authentication, protected dashboard routes, and role segregation",
        "Production deployment with Render backend and Vercel CDN frontend"
      ],
      pipelineSteps: [
        { step: "01", title: "User Query on Policy Portal", desc: "User asks policy coverage question through the Angular frontend" },
        { step: "02", title: "API Validation & JWT Check", desc: "FastAPI validates session token and applies authorization rules" },
        { step: "03", title: "Knowledge Grounding", desc: "Backend fetches verified user policy records and constraints from database" },
        { step: "04", title: "LLM Assisted Response", desc: "GPT-4o-mini synthesizes clear policy guidance with zero hallucinations" },
        { step: "05", title: "Persistence & Audit Log", desc: "Interaction is recorded in SQL audit history for customer record tracking" }
      ],
      challenges: [
        { challenge: "Coexisting AI with deterministic business rules", solution: "Separated application logic and database persistence into decoupled FastAPI service layers" },
        { challenge: "Handling LLM provider downtime gracefully", solution: "Implemented fallback rule-based policy answer retrieval and circuit breaker handlers" }
      ],
      interviewTakeaway: "Proved that modern AI systems shine brightest when seamlessly embedded inside standard, enterprise-tested architectures with proper auth, schemas, and persistence."
    },
    {
      id: "realtime-chat",
      title: "Real-Time Enterprise Chat",
      subtitle: "High-Concurrency Chat with Keycloak OAuth2",
      domain: "Enterprise Communications",
      category: "fullstack",
      featured: false,
      badge: "Real-Time & Security",
      liveUrl: null,
      githubUrl: "https://github.com/ArijitMondalVE",
      summary: "A robust full-stack instant messaging architecture powered by Spring Boot, WebSockets, and Angular 19, secured via Keycloak OAuth 2.0 / OIDC identity management.",
      highlightStats: [
        { label: "Backend", val: "Java Spring Boot" },
        { label: "Protocol", val: "WebSockets STOMP" },
        { label: "Identity", val: "Keycloak OAuth 2.0" },
        { label: "Frontend", val: "Angular 19" }
      ],
      techStack: [
        "Angular 19", "Java 17", "Spring Boot", "WebSocket / STOMP", 
        "Keycloak (OAuth 2.0)", "MySQL", "Docker"
      ],
      features: [
        "Instant bidirectional messaging with sub-50ms message latency using WebSocket channels",
        "Enterprise Keycloak OAuth 2.0 and OpenID Connect centralized authentication",
        "Persistent message history, read receipts, and user online/offline presence indicators",
        "Threaded conversation modeling with optimized relational MySQL indexing"
      ],
      pipelineSteps: [],
      challenges: [],
      interviewTakeaway: "Deepened expertise in enterprise security patterns (OAuth2/JWT) and event-driven architecture."
    },
    {
      id: "quiz-web-app",
      title: "QuizMaster Web Engine",
      subtitle: "Interactive Assessment & Gamified Quiz Platform",
      domain: "EdTech & Assessment",
      category: "fullstack",
      featured: false,
      badge: "Full-Stack Web App",
      liveUrl: null,
      githubUrl: "https://github.com/ArijitMondalVE",
      summary: "A dynamic quizzing and assessment engine inspired by Quizlet and Sporcle, featuring full authoring consoles, timed quiz modes, dynamic scoring, and social sharing.",
      highlightStats: [
        { label: "Backend", val: "Spring Boot" },
        { label: "Frontend", val: "Angular" },
        { label: "Database", val: "MySQL" },
        { label: "Security", val: "JWT & Roles" }
      ],
      techStack: ["Spring Boot", "Angular", "MySQL", "REST APIs", "Bootstrap", "JWT"],
      features: [
        "Admin and creator console for authoring complex multi-category questions",
        "Timed interactive quiz sessions with instant feedback and score breakdown",
        "User authentication and public shareable quiz links with leaderboard tracking",
        "Robust RESTful CRUD APIs with validation and MySQL relational schema"
      ],
      pipelineSteps: [],
      challenges: [],
      interviewTakeaway: "Strengthened full-stack API contract design and relational database modeling for dynamic user-generated content."
    },
    {
      id: "agriculture-ecommerce",
      title: "AgriDirect Mobile",
      subtitle: "Smart India Hackathon Direct Farmer Marketplace",
      domain: "AgriTech / Direct Commerce",
      category: "mobile",
      featured: false,
      badge: "Smart India Hackathon",
      liveUrl: null,
      githubUrl: "https://github.com/ArijitMondalVE",
      summary: "Native Android application engineered for Smart India Hackathon to connect farmers directly with end consumers, eliminating intermediary markups with real-time pricing.",
      highlightStats: [
        { label: "UI Framework", val: "Jetpack Compose" },
        { label: "Platform", val: "Android Studio" },
        { label: "Backend", val: "Firebase DB & Auth" },
        { label: "Recognition", val: "SIH Hackathon" }
      ],
      techStack: [
        "Android Studio", "Kotlin", "Jetpack Compose", 
        "Firebase Realtime Database", "Firebase Auth", "Material 3"
      ],
      features: [
        "Declarative Android UI built entirely with modern Jetpack Compose and Material 3",
        "Firebase real-time sync for live inventory updates and crop pricing across regions",
        "Multi-role authentication for farmers, wholesale buyers, and retail consumers",
        "Offline-first mobile design suited for rural agricultural connectivity conditions"
      ],
      pipelineSteps: [],
      challenges: [],
      interviewTakeaway: "Learned rapid prototyping and mobile-first architectural delivery under intensive hackathon conditions."
    }
  ];

  public skillCategories: SkillCategory[] = [
    {
      name: "AI, GenAI & Agentic Systems",
      icon: "fa-brain",
      color: "#00f0ff",
      skills: [
        { name: "LangChain & LangGraph", level: 94, tag: "Agentic Orchestration" },
        { name: "RAG & Vector Retrieval", level: 96, tag: "ChromaDB / Embeddings" },
        { name: "Prompt Engineering & Personas", level: 95, tag: "Safety & System Prompts" },
        { name: "Google Gemini & OpenAI APIs", level: 94, tag: "Gemini 2.5 / GPT-4o" },
        { name: "OpenAI Whisper STT/TTS", level: 88, tag: "Voice AI" },
        { name: "MCP Servers & Tool Calling", level: 86, tag: "Model Context Protocol" }
      ]
    },
    {
      name: "Computer Vision & OCR",
      icon: "fa-eye",
      color: "#8a2be2",
      skills: [
        { name: "OpenCV Image Processing", level: 88, tag: "Preprocessing & Filters" },
        { name: "PaddleOCR & EasyOCR", level: 90, tag: "Dual OCR Pipelines" },
        { name: "LaTeX / Math Extraction", level: 85, tag: "Formula Recognition" },
        { name: "PII & Masking Detection", level: 84, tag: "Content Safety" }
      ]
    },
    {
      name: "Backend & Distributed Systems",
      icon: "fa-server",
      color: "#10b981",
      skills: [
        { name: "FastAPI & Python 3.12", level: 95, tag: "Async REST APIs" },
        { name: "Java & Spring Boot", level: 90, tag: "Enterprise Microservices" },
        { name: "Celery & Redis Workers", level: 88, tag: "Background Async Tasks" },
        { name: "SQLAlchemy & Pydantic", level: 92, tag: "ORM & Data Validation" },
        { name: "MySQL, PostgreSQL, NeonDB", level: 88, tag: "Relational & Cloud DBs" },
        { name: "Docker & Containerization", level: 85, tag: "Multi-Service Compose" }
      ]
    },
    {
      name: "Frontend & 3D Interactive",
      icon: "fa-laptop-code",
      color: "#ff007f",
      skills: [
        { name: "Angular 17-19 (Signals/Zoneless)", level: 94, tag: "Enterprise SPA" },
        { name: "React.js & TypeScript & Vite", level: 92, tag: "Modern Web Apps" },
        { name: "Three.js & WebGL 3D", level: 85, tag: "Interactive 3D Graphics" },
        { name: "Tailwind CSS & Vanilla CSS3", level: 95, tag: "Glassmorphism & Flex/Grid" },
        { name: "WebSockets & Real-Time Canvas", level: 90, tag: "Live Collaboration" },
        { name: "Android Jetpack Compose", level: 80, tag: "Modern Native Mobile" }
      ]
    },
    {
      name: "Security, Cloud & Tooling",
      icon: "fa-shield-halved",
      color: "#f59e0b",
      skills: [
        { name: "JWT & Keycloak OAuth 2.0", level: 90, tag: "Enterprise Identity" },
        { name: "Git, GitHub & CI/CD", level: 92, tag: "DevOps Workflows" },
        { name: "AWS & Cloud Deployments", level: 82, tag: "Render / Vercel / Cloud" },
        { name: "Data Structures & Algorithms", level: 88, tag: "Problem Solving" }
      ]
    }
  ];

  private screeningQA: Record<string, string> = {
    "Why use RAG instead of only an LLM?": "RAG (Retrieval-Augmented Generation) prevents hallucinations by retrieving verified, domain-specific text from vector databases (like ChromaDB) and injecting it into the prompt context. This ensures the model cites real source material, works with private up-to-date documents, and significantly reduces costs compared to continuous fine-tuning.",
    "How does chunking affect retrieval quality?": "If chunks are too large, the LLM prompt is polluted with irrelevant context and diluted embeddings. If chunks are too small, critical semantic relationships (like sentence context or table relationships) are lost. We used semantic chunking with overlapping windows (e.g. 500 tokens with 50-token overlap) to preserve cross-boundary semantics.",
    "What is the difference between an AI agent and a normal API service?": "A traditional API follows a rigid, deterministic path (Input -> Fixed Code -> Output). An AI Agent possesses an autonomous decision-making loop (Sense -> Reason -> Tool Use -> Act), allowing it to evaluate intermediate outputs, invoke tools dynamically (like OCR, Vector DBs, or Webhooks), recover from errors, and plan multi-step workflows.",
    "Why separate agents instead of one large prompt?": "In complex tasks like RFP analysis or Homework solving, a single prompt causes attention drift, context collapse, and makes debugging impossible. By assigning dedicated agents (e.g. Compliance Agent vs Scope Agent), each prompt is hyper-focused, outputs are strictly typed with Pydantic, and individual agents can be tested, tuned, or replaced independently.",
    "How do you evaluate LLM answer quality?": "We implement multi-tiered guardrails: (1) Deterministic validation (Pydantic schemas & regex), (2) Groundedness scoring against retrieved chunks, (3) Safety prompt boundaries rejecting out-of-scope/medical queries, and (4) Human-in-the-loop review interfaces for critical commercial decisions.",
    "Why use Celery and Redis?": "FastAPI is asynchronous and fast for HTTP I/O, but compute-heavy tasks (like OpenCV image filtering, PaddleOCR tensor inference, and Whisper audio synthesis) block the event loop. Offloading these long-running tasks to Celery background workers with a Redis message broker ensures the API remains ultra-responsive under high concurrent traffic.",
    "When would you use WebSockets instead of REST?": "REST is request-response and client-initiated. WebSockets provide persistent, full-duplex TCP channels with near-zero overhead per frame. In HomeworkPlus (collaborative whiteboard & live streaming responses) and the Chat app, WebSockets provide instant synchronization without repetitive polling."
  };

  getProjects(category: string = 'all'): Observable<Project[]> {
    if (category === 'all') return of(this.projectsData);
    return of(this.projectsData.filter(p => p.category === category));
  }

  getDeployedProjects(category: string = 'all'): Observable<Project[]> {
    const deployed = this.projectsData.filter(p => !!p.liveUrl);
    if (category === 'all') return of(deployed);
    return of(deployed.filter(p => p.category === category));
  }

  getOtherProjects(category: string = 'all'): Observable<Project[]> {
    const others = this.projectsData.filter(p => !p.liveUrl);
    if (category === 'all') return of(others);
    return of(others.filter(p => p.category === category));
  }

  askTerminal(query: string): Observable<{ query: string; answer: string; source: string }> {
    const q = query.trim();
    if (this.screeningQA[q]) {
      return of({
        query: q,
        answer: this.screeningQA[q],
        source: "Architectural Knowledge Engine"
      });
    }

    return of({
      query: q,
      answer: "In production AI engineering, we balance deterministic validations with probabilistic model reasoning, utilizing RAG retrieval pipelines, Pydantic type safety, and async worker queues.",
      source: "Architectural Knowledge Engine"
    });
  }

  sendContact(message: { name: string; email: string; message: string }): Observable<{ status: string; message: string }> {
    return of({
      status: "success",
      message: `Thank you, ${message.name}! Your message has been received. I will respond to ${message.email} promptly.`
    });
  }
}
