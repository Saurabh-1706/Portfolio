import Link from "next/link";
import FadeUpObserver from "@/components/FadeUpObserver";

export const revalidate = 7200;

// Hardcoded image URLs from code.html to preserve the exact design aesthetic
const PORTFOLIO_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBFZkTMFoNuGVnpGexKO63lsBYfizwKasH3-qV5QhNfDd9dY4sg5yQI8Ov3qjoCk_2eqabKXOLK-A8nZmFiGNeFVmaYlmQ645PujzbR9yJpsiQLjnNeCQY8SQ0N3wCN3_h4J3rc3aNLcFQVFheAFVqu2V-vLL6UCdp86d_YZomYSM1888TEmR26i1NsUm72Dn7q9x5F_K1QkGlOs-CNvF_trzQgKD5w5cESFmpcUCWarCNikfSLs44Ls97b5toHBpIu9bYNf4W0bWU9",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA_6DuXFaPOp8E6UT6z6BZaCUSYuJUeMZnNGvsknsEQj1kSlkemQz8oCVpeyGrgsn3qWaH-99vr7wx5eOvpKbxJFqSjz3Kg2QkhGMogLaP0vmIguPJEYRvHowd0GkBzrJvixlzd-rJPhZflH62VXuzE61PQuxt32nq3ZXrSWJ-MUo7yi14Jx2Mb5VmJmE63x-M7-vTLfz0kK1llo90kl-5wirWixGg7RH0JUKwdsNZUTO53WEmsW1L_pG7UAsb27bos2UR7HJwC0TtY",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDg8_spfLiT6bYQBHfjJEwaRfEyLJFIqefKIBQHLNtSBU4meTBhYaRNkHR0ergvdygrwffpoXFFxV_C59Eamh6CKwrUEGxytwGpp1OaUoFLcz6TJX-W1TNfZHn9Y1ldYvY6PCXIf8C3FklwkRPeOqAQHh3DEvy_n44QkEVEla4m4T0rJqxsVRX8CgJd5Q36nlJ8igsSItHuaNgr1-QbyW6cT10XZocgM5ZbygHJDEXOAfauNkIP_HFlgVTYtFd-KpQcbBBdCWRne0O6",
];

export default function HomePage() {
  const portfolioProjects = [
    { id: 1, title: "Quantum Ecommerce", category: "AI Powered Platform", link: "#" },
    { id: 2, title: "Neural Finance", category: "Predictive Analytics", link: "#" },
    { id: 3, title: "Cognitive CRM", category: "Sales Intelligence", link: "#" },
  ];

  return (
    <>
      <FadeUpObserver />
      
      {/* 2. Hero */}
      <section className="min-h-screen pt-20 flex flex-col md:flex-row relative max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-section-gap">
        {/* Left Column */}
        <div className="flex-1 flex flex-col justify-center relative py-12 md:py-0 fade-up z-10">
          <div className="max-w-xl">
            {/* Stats */}
            <div className="flex gap-8 mb-8 text-secondary font-label-caps text-label-caps uppercase">
              <div><span className="text-primary font-bold block text-lg">+5</span> Production Projects</div>
              <div><span className="text-primary font-bold block text-lg">+4</span> AI Applications</div>
            </div>
            {/* Headline */}
            <h1 className="font-display text-display text-primary mb-6">Hello</h1>
            <p className="font-headline-md text-headline-md text-secondary mb-12 max-w-md">
              — I'm Saurabh, building intelligent web applications with AI.
            </p>
            {/* Footer elements */}
            <div className="flex items-center gap-12 mt-auto">
              <div className="text-secondary font-label-caps text-label-caps uppercase flex items-center gap-2">
                Scroll down 
                <span className="material-symbols-outlined text-sm animate-bounce">arrow_downward</span>
              </div>
            </div>
          </div>
        </div>
        {/* Right Column (Portrait) */}
        <div className="flex-1 relative min-h-[50vh] md:min-h-screen -mx-margin-mobile md:mx-0 fade-up">
          <img alt="Saurabh Portrait" className="absolute inset-0 w-full h-full object-cover object-center md:rounded-l-3xl grayscale" src="/saurabh-profile.jpg" />
        </div>
      </section>

      {/* 3. About Me */}
      <section className="py-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop" id="about">
        <div className="grid md:grid-cols-2 gap-gutter">
          {/* Left */}
          <div className="flex flex-col justify-center fade-up">
            <div className="font-label-caps text-label-caps text-secondary uppercase mb-4 tracking-widest">About Me</div>
            <h2 className="font-headline-lg text-headline-lg text-primary mb-8 max-w-md">
              Building intelligent software with modern web technologies and AI.
            </h2>
            <p className="font-body-lg text-body-lg text-secondary mb-4 max-w-md">
              I'm a Computer Engineering graduate passionate about building scalable full-stack applications powered by AI. I specialize in React, Next.js, FastAPI, MongoDB, and Retrieval-Augmented Generation (RAG) systems.
            </p>
            <p className="font-body-lg text-body-lg text-secondary mb-8 max-w-md">
              I enjoy transforming ideas into production-ready products—from intuitive user interfaces to performant backend services. My focus is writing clean, maintainable code while leveraging AI to solve real-world problems.
            </p>
            <div className="hidden md:block mt-8 opacity-50">
              <svg fill="none" height="60" viewBox="0 0 120 60" width="120" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 2C20 40 60 60 118 30" stroke="currentColor" strokeLinecap="round" strokeWidth="2"></path>
                <path d="M100 20L118 30L105 45" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </div>
          </div>
          {/* Right Asymmetric Cluster */}
          <div className="relative min-h-[500px] fade-up">
            {/* Stat Card */}
            <div className="absolute top-0 right-0 w-48 bg-primary-container text-on-primary p-6 rounded-[16px] z-10 shadow-xl">
              <div className="font-headline-md text-headline-md font-bold mb-2">100%</div>
              <div className="font-caption text-caption text-on-primary-container">Projects built with modern technologies</div>
            </div>
            {/* Main Portrait Card */}
            <div className="absolute top-20 left-0 right-12 bottom-32 rounded-[16px] overflow-hidden border border-border-hairline bg-surface-muted">
              <img className="w-full h-full object-cover grayscale" alt="Desk setup" src="/saurabh_working.png" />
            </div>
            {/* Small Headshot */}
            <div className="absolute top-1/2 -left-8 w-24 h-24 rounded-full overflow-hidden border-4 border-surface-container-lowest z-10 shadow-lg group cursor-pointer">
              <img className="w-full h-full object-cover grayscale" alt="Headshot" src="/saurabh-profile.jpg" />
              <div className="absolute inset-0 bg-primary-container/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-on-primary">arrow_outward</span>
              </div>
            </div>
            {/* Feature Bullets */}
            <div className="absolute bottom-0 left-0 right-0 flex gap-4">
              <div className="flex-1 bg-surface-muted border border-border-hairline rounded-[16px] p-6 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-sm">code</span>
                </div>
                <div>
                  <h4 className="font-body-md text-body-md font-semibold text-primary mb-1">Full Stack Development</h4>
                  <p className="font-caption text-caption text-secondary">Building scalable applications using React, Next.js, FastAPI, Node.js, and MongoDB.</p>
                </div>
              </div>
              <div className="flex-1 bg-surface-muted border border-border-hairline rounded-[16px] p-6 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-sm">smart_toy</span>
                </div>
                <div>
                  <h4 className="font-body-md text-body-md font-semibold text-primary mb-1">AI Engineering</h4>
                  <p className="font-caption text-caption text-secondary">Developing RAG systems, LLM-powered assistants, vector search, and AI workflows.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Skills */}
      <section className="py-[120px] bg-[#f9f9f9] fade-up" id="skills">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          {/* Header */}
          <div className="mb-12 relative">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-[2px] h-[48px] bg-[#0B0C0C]"></div>
              <div className="font-['Inter'] text-[12px] font-semibold tracking-[0.1em] text-[#444747] uppercase">CAPABILITIES</div>
            </div>
            <p className="font-['Inter'] text-[18px] text-[#444747] mb-6 max-w-[480px]">
              A curated set of tools I use to take products from idea to production.
            </p>
            <div className="relative flex items-center">
              <span className="absolute -top-12 -left-4 font-['Sora'] text-[160px] font-semibold text-[#E5E5E5] opacity-40 select-none z-0 pointer-events-none">&lt;/&gt;</span>
              <h2 className="font-['Sora'] text-[48px] font-semibold tracking-[-0.03em] text-[#0B0C0C] relative z-10">Craft &amp; Stack</h2>
            </div>
          </div>
          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-[24px]">
            {/* Frontend (col-span-2) */}
            <div className="md:col-span-2 bg-[#F8F8F8] border border-[#E5E5E5] rounded-[16px] p-[24px] shadow-lg bento-card flex flex-col gap-6">
              <div className="font-['Inter'] text-[12px] font-semibold tracking-[0.1em] text-[#444747] uppercase">Frontend</div>
              <div className="flex flex-wrap gap-2">
                <div className="skill-pill flex items-center gap-[6px] bg-[#FFFFFF] border border-[#E5E5E5] rounded-full px-[14px] py-[6px] pl-[10px] font-['Inter'] text-[14px] text-[#1a1c1c] cursor-default">
                  <img alt="React.js" className="w-4 h-4" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"/> React.js
                </div>
                <div className="skill-pill flex items-center gap-[6px] bg-[#FFFFFF] border border-[#E5E5E5] rounded-full px-[14px] py-[6px] pl-[10px] font-['Inter'] text-[14px] text-[#1a1c1c] cursor-default">
                  <img alt="Next.js" className="w-4 h-4" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg"/> Next.js
                </div>
                <div className="skill-pill flex items-center gap-[6px] bg-[#FFFFFF] border border-[#E5E5E5] rounded-full px-[14px] py-[6px] pl-[10px] font-['Inter'] text-[14px] text-[#1a1c1c] cursor-default">
                  <img alt="TypeScript" className="w-4 h-4" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"/> TypeScript
                </div>
                <div className="skill-pill flex items-center gap-[6px] bg-[#FFFFFF] border border-[#E5E5E5] rounded-full px-[14px] py-[6px] pl-[10px] font-['Inter'] text-[14px] text-[#1a1c1c] cursor-default">
                  <img alt="JavaScript" className="w-4 h-4" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"/> JavaScript
                </div>
                <div className="skill-pill flex items-center gap-[6px] bg-[#FFFFFF] border border-[#E5E5E5] rounded-full px-[14px] py-[6px] pl-[10px] font-['Inter'] text-[14px] text-[#1a1c1c] cursor-default">
                  <img alt="Tailwind CSS" className="w-4 h-4" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"/> Tailwind CSS
                </div>
              </div>
            </div>
            {/* Backend (col-span-1) */}
            <div className="md:col-span-1 bg-[#F8F8F8] border border-[#E5E5E5] rounded-[16px] p-[24px] shadow-lg bento-card flex flex-col gap-6">
              <div className="font-['Inter'] text-[12px] font-semibold tracking-[0.1em] text-[#444747] uppercase">Backend</div>
              <div className="flex flex-wrap gap-2">
                <div className="skill-pill flex items-center gap-[6px] bg-[#FFFFFF] border border-[#E5E5E5] rounded-full px-[14px] py-[6px] pl-[10px] font-['Inter'] text-[14px] text-[#1a1c1c] cursor-default">
                  <img alt="FastAPI" className="w-4 h-4" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg"/> FastAPI
                </div>
                <div className="skill-pill flex items-center gap-[6px] bg-[#FFFFFF] border border-[#E5E5E5] rounded-full px-[14px] py-[6px] pl-[10px] font-['Inter'] text-[14px] text-[#1a1c1c] cursor-default">
                  <img alt="Node.js" className="w-4 h-4" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"/> Node.js
                </div>
                <div className="skill-pill flex items-center gap-[6px] bg-[#FFFFFF] border border-[#E5E5E5] rounded-full px-[14px] py-[6px] pl-[10px] font-['Inter'] text-[14px] text-[#1a1c1c] cursor-default">
                  <img alt="Express.js" className="w-4 h-4 bg-white" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg"/> Express.js
                </div>
                <div className="skill-pill flex items-center gap-[6px] bg-[#FFFFFF] border border-[#E5E5E5] rounded-full px-[14px] py-[6px] pl-[10px] font-['Inter'] text-[14px] text-[#1a1c1c] cursor-default">
                  <img alt="Python" className="w-4 h-4" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"/> Python
                </div>
                <div className="skill-pill flex items-center gap-[6px] bg-[#FFFFFF] border border-[#E5E5E5] rounded-full px-[14px] py-[6px] pl-[10px] font-['Inter'] text-[14px] text-[#1a1c1c] cursor-default">
                  <span className="w-4 h-4 flex items-center justify-center text-[#444747] text-[8px]">●</span> REST API Design
                </div>
              </div>
            </div>
            {/* AI / LLM (col-span-1, row-span-2) */}
            <div className="md:col-span-1 md:row-span-2 bg-[#F8F8F8] border border-[#E5E5E5] rounded-[16px] p-[24px] shadow-lg bento-card flex flex-col gap-6">
              <div className="font-['Inter'] text-[12px] font-semibold tracking-[0.1em] text-[#444747] uppercase">AI / LLM</div>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-[6px] bg-[#0B0C0C] border border-[#0B0C0C] rounded-full px-[14px] py-[6px] pl-[10px] font-['Inter'] text-[14px] text-[#F9F9F9] cursor-default">
                  <span className="w-4 h-4 flex items-center justify-center text-white text-[8px]">●</span> RAG Architecture
                </div>
                <div className="flex items-center gap-[6px] bg-[#0B0C0C] border border-[#0B0C0C] rounded-full px-[14px] py-[6px] pl-[10px] font-['Inter'] text-[14px] text-[#F9F9F9] cursor-default">
                  <img alt="LangChain" className="w-4 h-4" src="https://cdn.simpleicons.org/langchain/white"/> LangChain
                </div>
                <div className="skill-pill flex items-center gap-[6px] bg-[#FFFFFF] border border-[#E5E5E5] rounded-full px-[14px] py-[6px] pl-[10px] font-['Inter'] text-[14px] text-[#1a1c1c] cursor-default">
                  <img alt="OpenAI API" className="w-4 h-4" src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg"/> OpenAI API
                </div>
                <div className="skill-pill flex items-center gap-[6px] bg-[#FFFFFF] border border-[#E5E5E5] rounded-full px-[14px] py-[6px] pl-[10px] font-['Inter'] text-[14px] text-[#1a1c1c] cursor-default">
                  <span className="w-4 h-4 flex items-center justify-center text-[#444747] text-[8px]">●</span> Vector Search
                </div>
                <div className="skill-pill flex items-center gap-[6px] bg-[#FFFFFF] border border-[#E5E5E5] rounded-full px-[14px] py-[6px] pl-[10px] font-['Inter'] text-[14px] text-[#1a1c1c] cursor-default">
                  <span className="w-4 h-4 flex items-center justify-center text-[#444747] text-[8px]">●</span> Prompt Engineering
                </div>
                <div className="skill-pill flex items-center gap-[6px] bg-[#FFFFFF] border border-[#E5E5E5] rounded-full px-[14px] py-[6px] pl-[10px] font-['Inter'] text-[14px] text-[#1a1c1c] cursor-default">
                  <span className="w-4 h-4 flex items-center justify-center text-[#444747] text-[8px]">●</span> SentenceTransformers
                </div>
                <div className="skill-pill flex items-center gap-[6px] bg-[#FFFFFF] border border-[#E5E5E5] rounded-full px-[14px] py-[6px] pl-[10px] font-['Inter'] text-[14px] text-[#1a1c1c] cursor-default">
                  <img alt="GPT-4o-mini" className="w-4 h-4" src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg"/> GPT-4o-mini
                </div>
              </div>
            </div>
            {/* Database (col-span-1) */}
            <div className="md:col-span-1 bg-[#F8F8F8] border border-[#E5E5E5] rounded-[16px] p-[24px] shadow-lg bento-card flex flex-col gap-6">
              <div className="font-['Inter'] text-[12px] font-semibold tracking-[0.1em] text-[#444747] uppercase">Database</div>
              <div className="flex flex-wrap gap-2">
                <div className="skill-pill flex items-center gap-[6px] bg-[#FFFFFF] border border-[#E5E5E5] rounded-full px-[14px] py-[6px] pl-[10px] font-['Inter'] text-[14px] text-[#1a1c1c] cursor-default">
                  <img alt="MongoDB" className="w-4 h-4" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg"/> MongoDB
                </div>
                <div className="skill-pill flex items-center gap-[6px] bg-[#FFFFFF] border border-[#E5E5E5] rounded-full px-[14px] py-[6px] pl-[10px] font-['Inter'] text-[14px] text-[#1a1c1c] cursor-default">
                  <img alt="MySQL" className="w-4 h-4" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg"/> MySQL
                </div>
                <div className="skill-pill flex items-center gap-[6px] bg-[#FFFFFF] border border-[#E5E5E5] rounded-full px-[14px] py-[6px] pl-[10px] font-['Inter'] text-[14px] text-[#1a1c1c] cursor-default">
                  <img alt="SQL Server" className="w-4 h-4" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-plain.svg"/> SQL Server
                </div>
                <div className="skill-pill flex items-center gap-[6px] bg-[#FFFFFF] border border-[#E5E5E5] rounded-full px-[14px] py-[6px] pl-[10px] font-['Inter'] text-[14px] text-[#1a1c1c] cursor-default">
                  <span className="w-4 h-4 flex items-center justify-center text-[#444747] text-[8px]">●</span> ChromaDB
                </div>
                <div className="skill-pill flex items-center gap-[6px] bg-[#FFFFFF] border border-[#E5E5E5] rounded-full px-[14px] py-[6px] pl-[10px] font-['Inter'] text-[14px] text-[#1a1c1c] cursor-default">
                  <span className="w-4 h-4 flex items-center justify-center text-[#444747] text-[8px]">●</span> SQL
                </div>
              </div>
            </div>
            {/* Auth & Security (col-span-1) */}
            <div className="md:col-span-1 bg-[#F8F8F8] border border-[#E5E5E5] rounded-[16px] p-[24px] shadow-lg bento-card flex flex-col gap-6">
              <div className="font-['Inter'] text-[12px] font-semibold tracking-[0.1em] text-[#444747] uppercase">Auth &amp; Security</div>
              <div className="flex flex-wrap gap-2">
                <div className="skill-pill flex items-center gap-[6px] bg-[#FFFFFF] border border-[#E5E5E5] rounded-full px-[14px] py-[6px] pl-[10px] font-['Inter'] text-[14px] text-[#1a1c1c] cursor-default">
                  <img alt="JWT" className="w-4 h-4" src="https://cdn.simpleicons.org/jsonwebtokens"/> JWT
                </div>
                <div className="skill-pill flex items-center gap-[6px] bg-[#FFFFFF] border border-[#E5E5E5] rounded-full px-[14px] py-[6px] pl-[10px] font-['Inter'] text-[14px] text-[#1a1c1c] cursor-default">
                  <span className="w-4 h-4 flex items-center justify-center text-[#444747] text-[8px]">●</span> OAuth2
                </div>
                <div className="skill-pill flex items-center gap-[6px] bg-[#FFFFFF] border border-[#E5E5E5] rounded-full px-[14px] py-[6px] pl-[10px] font-['Inter'] text-[14px] text-[#1a1c1c] cursor-default">
                  <span className="w-4 h-4 flex items-center justify-center text-[#444747] text-[8px]">●</span> Auth &amp; Authz
                </div>
              </div>
            </div>
            {/* Dark Stat Card (col-span-1) */}
            <div className="md:col-span-1 bg-[#0B0C0C] rounded-[16px] p-[24px] shadow-lg bento-card flex flex-col justify-center gap-8">
              <div>
                <div className="font-['Sora'] text-[48px] font-semibold text-[#F9F9F9] leading-tight">25+</div>
                <div className="font-['Inter'] text-[12px] font-semibold tracking-[0.1em] text-[#8a8989] uppercase">Tools &amp; Frameworks</div>
              </div>
              <div>
                <div className="font-['Sora'] text-[48px] font-semibold text-[#F9F9F9] leading-tight">8</div>
                <div className="font-['Inter'] text-[12px] font-semibold tracking-[0.1em] text-[#8a8989] uppercase">Categories</div>
              </div>
            </div>
            {/* Mobile (col-span-2) */}
            <div className="md:col-span-2 bg-[#F8F8F8] border border-[#E5E5E5] rounded-[16px] p-[24px] shadow-lg bento-card flex flex-col gap-6">
              <div className="font-['Inter'] text-[12px] font-semibold tracking-[0.1em] text-[#444747] uppercase">Mobile</div>
              <div className="flex flex-wrap gap-2">
                <div className="skill-pill flex items-center gap-[6px] bg-[#FFFFFF] border border-[#E5E5E5] rounded-full px-[14px] py-[6px] pl-[10px] font-['Inter'] text-[14px] text-[#1a1c1c] cursor-default">
                  <img alt="React Native" className="w-4 h-4" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"/> React Native
                </div>
                <div className="skill-pill flex items-center gap-[6px] bg-[#FFFFFF] border border-[#E5E5E5] rounded-full px-[14px] py-[6px] pl-[10px] font-['Inter'] text-[14px] text-[#1a1c1c] cursor-default">
                  <img alt="Expo" className="w-4 h-4" src="https://cdn.simpleicons.org/expo"/> Expo
                </div>
              </div>
            </div>
            {/* CS Fundamentals (col-span-2) */}
            <div className="md:col-span-2 bg-[#F8F8F8] border border-[#E5E5E5] rounded-[16px] p-[24px] shadow-lg bento-card flex flex-col gap-6">
              <div className="font-['Inter'] text-[12px] font-semibold tracking-[0.1em] text-[#444747] uppercase">CS Fundamentals</div>
              <div className="flex flex-wrap gap-2">
                <div className="skill-pill flex items-center gap-[6px] bg-[#FFFFFF] border border-[#E5E5E5] rounded-full px-[14px] py-[6px] pl-[10px] font-['Inter'] text-[14px] text-[#1a1c1c] cursor-default">
                  <span className="w-4 h-4 flex items-center justify-center text-[#444747] text-[8px]">●</span> Data Structures &amp; Algorithms
                </div>
                <div className="skill-pill flex items-center gap-[6px] bg-[#FFFFFF] border border-[#E5E5E5] rounded-full px-[14px] py-[6px] pl-[10px] font-['Inter'] text-[14px] text-[#1a1c1c] cursor-default">
                  <span className="w-4 h-4 flex items-center justify-center text-[#444747] text-[8px]">●</span> Operating Systems
                </div>
                <div className="skill-pill flex items-center gap-[6px] bg-[#FFFFFF] border border-[#E5E5E5] rounded-full px-[14px] py-[6px] pl-[10px] font-['Inter'] text-[14px] text-[#1a1c1c] cursor-default">
                  <span className="w-4 h-4 flex items-center justify-center text-[#444747] text-[8px]">●</span> Computer Networks
                </div>
                <div className="skill-pill flex items-center gap-[6px] bg-[#FFFFFF] border border-[#E5E5E5] rounded-full px-[14px] py-[6px] pl-[10px] font-['Inter'] text-[14px] text-[#1a1c1c] cursor-default">
                  <span className="w-4 h-4 flex items-center justify-center text-[#444747] text-[8px]">●</span> DBMS
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Latest Works */}
      <section className="py-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop fade-up" id="portfolio">
        <div className="flex justify-between items-end mb-12">
          <div>
            <div className="font-label-caps text-label-caps text-secondary uppercase mb-4 tracking-widest">Projects</div>
            <h2 className="font-headline-lg text-headline-lg text-primary">Featured Work</h2>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-gutter">
          {portfolioProjects.map((project, i) => (
            <Link key={project.id} href={project.link} className={`group block ${i === 1 ? 'md:mt-12' : ''}`}>
              <div className="relative rounded-[16px] overflow-hidden aspect-[4/5] bg-surface-muted mb-6">
                <img className="w-full h-full object-cover hover-zoom-img" alt={project.title} src={PORTFOLIO_IMAGES[i % PORTFOLIO_IMAGES.length]} />
                <div className="absolute top-4 right-4 w-12 h-12 bg-surface-container-lowest rounded-full flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                  <span className="material-symbols-outlined">arrow_outward</span>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-headline-md text-headline-md text-primary mb-1">{project.title}</h3>
                  <p className="font-caption text-caption text-secondary">{project.category}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-[#0B0C0C] py-[120px] text-center fade-up" id="contact">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          {/* Section Label */}
          <div className="flex flex-col items-center mb-12">
            <span className="font-['Inter'] text-[12px] font-semibold tracking-[0.1em] text-[#747878] uppercase mb-4">CONTACT</span>
            <div className="w-12 h-[1px] bg-[#2f3131]"></div>
          </div>
          {/* Headline */}
          <h2 className="font-['Sora'] text-[40px] md:text-[72px] font-semibold tracking-[-0.04em] text-[#F9F9F9] leading-tight mb-4">
            Let's Build<br/>Something Together.
          </h2>
          {/* Subtext */}
          <p className="font-['Inter'] text-[18px] font-normal text-[#747878] mb-12 max-w-xl mx-auto">
            Open to full-time roles, freelance projects, and collaborations.
          </p>
          {/* Buttons */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-20">
            <a className="bg-[#F9F9F9] text-[#0B0C0C] px-8 py-[14px] rounded-full font-semibold transition-opacity hover:opacity-90" href="mailto:saurabhmojad2173@gmail.com">
              Get In Touch →
            </a>
            <a className="border border-[#444747] text-[#F9F9F9] px-8 py-[14px] rounded-full font-semibold transition-colors hover:bg-[#F9F9F9] hover:text-[#0B0C0C]" href="/Saurabh_Mojad_Resume.pdf" target="_blank" rel="noopener noreferrer">
              Download Resume ↓
            </a>
          </div>
          {/* Divider */}
          <div className="w-full h-[1px] bg-[#2f3131] mb-8"></div>
          {/* Contact Links Row */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <a className="font-['Inter'] text-[16px] text-[#747878] hover:text-[#F9F9F9] hover:underline transition-colors flex items-center gap-2" href="mailto:saurabhmojad2173@gmail.com">
              <span className="material-symbols-outlined text-sm">mail</span> saurabhmojad2173@gmail.com
            </a>
            <a className="font-['Inter'] text-[16px] text-[#747878] hover:text-[#F9F9F9] hover:underline transition-colors flex items-center gap-2" href="https://github.com/Saurabh-1706" target="_blank" rel="noopener noreferrer">
              <span className="material-symbols-outlined text-sm">code</span> github.com/Saurabh-1706
            </a>
            <a className="font-['Inter'] text-[16px] text-[#747878] hover:text-[#F9F9F9] hover:underline transition-colors flex items-center gap-2" href="https://linkedin.com/in/saurabh-mojad" target="_blank" rel="noopener noreferrer">
              <span className="material-symbols-outlined text-sm">link</span> linkedin.com/in/saurabh-mojad
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
