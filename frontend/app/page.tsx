
import FadeUpObserver from "@/components/FadeUpObserver";
import CountUp from "@/components/CountUp";

export const revalidate = 7200;



export default function HomePage() {


  return (
    <>
      <FadeUpObserver />
      
      {/* 2. Hero */}
      <section className="min-h-screen pt-20 flex flex-col md:flex-row relative max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-section-gap">
        {/* Left Column */}
        <div className="flex-1 flex flex-col justify-center relative py-12 md:py-0 z-10">
          <div className="max-w-xl">
            {/* Stats */}
            <div className="flex gap-8 mb-8 text-secondary font-label-caps text-label-caps uppercase hero-fade-up" style={{ transitionDelay: '0ms' }}>
              <div><span className="text-primary font-bold block text-lg">+5</span> Production Projects</div>
              <div><span className="text-primary font-bold block text-lg">+4</span> AI Applications</div>
            </div>
            {/* Headline */}
            <h1 className="font-display text-display text-primary mb-6 hero-fade-up" style={{ transitionDelay: '100ms' }}>Hello</h1>
            <p className="font-headline-md text-headline-md text-secondary mb-12 max-w-md hero-fade-up" style={{ transitionDelay: '200ms' }}>
              — I'm Saurabh, building intelligent web applications with AI.
            </p>
            {/* Footer elements */}
            <div className="flex items-center gap-12 mt-auto hero-fade-up" style={{ transitionDelay: '400ms' }}>
              <div className="text-secondary font-label-caps text-label-caps uppercase flex items-center gap-2">
                Scroll down 
                <span className="material-symbols-outlined text-sm animate-bounce">arrow_downward</span>
              </div>
            </div>
          </div>
        </div>
        {/* Right Column (Portrait) */}
        <div className="flex-1 relative min-h-[50vh] md:min-h-screen -mx-margin-mobile md:mx-0 hero-fade-up" style={{ transitionDelay: '500ms' }}>
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
          <div className="relative min-h-[620px] md:min-h-[500px] fade-up mt-8 md:mt-0">
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
            <div className="absolute bottom-0 left-0 right-0 flex flex-col md:flex-row gap-4 z-20">
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
            <div className="md:col-span-2 bg-[#F8F8F8] border border-[#E5E5E5] rounded-[16px] p-[24px] shadow-lg bento-card flex flex-col gap-6 fade-up" style={{ transitionDelay: '0ms' }}>
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
            <div className="md:col-span-1 bg-[#F8F8F8] border border-[#E5E5E5] rounded-[16px] p-[24px] shadow-lg bento-card flex flex-col gap-6 fade-up" style={{ transitionDelay: '50ms' }}>
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
            <div className="md:col-span-1 md:row-span-2 bg-[#F8F8F8] border border-[#E5E5E5] rounded-[16px] p-[24px] shadow-lg bento-card flex flex-col gap-6 fade-up" style={{ transitionDelay: '100ms' }}>
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
            <div className="md:col-span-1 bg-[#F8F8F8] border border-[#E5E5E5] rounded-[16px] p-[24px] shadow-lg bento-card flex flex-col gap-6 fade-up" style={{ transitionDelay: '150ms' }}>
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
            <div className="md:col-span-1 bg-[#F8F8F8] border border-[#E5E5E5] rounded-[16px] p-[24px] shadow-lg bento-card flex flex-col gap-6 fade-up" style={{ transitionDelay: '200ms' }}>
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
            <div className="md:col-span-1 bg-[#0B0C0C] rounded-[16px] p-[24px] shadow-lg bento-card flex flex-col justify-center gap-8 fade-up" style={{ transitionDelay: '250ms' }}>
              <div>
                <div className="font-['Sora'] text-[48px] font-semibold text-[#F9F9F9] leading-tight">
                  <CountUp end={25} suffix="+" />
                </div>
                <div className="font-['Inter'] text-[12px] font-semibold tracking-[0.1em] text-[#8a8989] uppercase">Tools &amp; Frameworks</div>
              </div>
              <div>
                <div className="font-['Sora'] text-[48px] font-semibold text-[#F9F9F9] leading-tight">
                  <CountUp end={8} />
                </div>
                <div className="font-['Inter'] text-[12px] font-semibold tracking-[0.1em] text-[#8a8989] uppercase">Categories</div>
              </div>
            </div>
            {/* Mobile (col-span-2) */}
            <div className="md:col-span-2 bg-[#F8F8F8] border border-[#E5E5E5] rounded-[16px] p-[24px] shadow-lg bento-card flex flex-col gap-6 fade-up" style={{ transitionDelay: '300ms' }}>
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

      {/* Featured Projects */}
      <section className="py-[120px] bg-[#F9F9F9]" id="work">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          {/* Header */}
          <div className="mb-12 relative fade-up visible">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-[2px] h-[48px] bg-[#0B0C0C]"></div>
              <div className="font-['Inter'] text-[12px] font-semibold tracking-[0.1em] text-[#444747] uppercase">WORK</div>
            </div>
            <h2 className="font-['Sora'] text-[48px] font-semibold tracking-[-0.03em] text-[#0B0C0C] mb-4">Featured Projects</h2>
            <p className="font-['Inter'] text-[18px] text-[#444747] max-w-[480px]">
              A selection of things I have built and shipped.
            </p>
          </div>
          {/* Project Cards List */}
          <div className="flex flex-col gap-[48px]">
            {/* Card 1: IntelliTrack (Image Right) */}
            <div className="project-card bg-[#FFFFFF] border border-[#E5E5E5] rounded-[24px] p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center fade-up group" style={{ transitionDelay: '0ms' }}>
              <div className="flex-1 order-2 md:order-1">
                <span className="inline-block bg-[#0B0C0C] text-[#F9F9F9] px-4 py-2 rounded-full font-['Inter'] text-[12px] font-semibold tracking-wide mb-6">AI · Full Stack · Developer Tools</span>
                <h3 className="font-['Sora'] text-[32px] font-semibold text-[#0B0C0C] mb-4">IntelliTrack</h3>
                <p className="font-['Inter'] text-[16px] leading-[28px] text-[#444747] mb-8">
                  AI-powered GitHub issue intelligence platform — semantic duplicate detection, GPT-4o risk scoring, automated triage, and downloadable PDF reports for any public repository.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 border border-[#E5E5E5] rounded-full font-['Inter'] text-[12px] text-[#444747]">Next.js</span>
                  <span className="px-3 py-1 border border-[#E5E5E5] rounded-full font-['Inter'] text-[12px] text-[#444747]">FastAPI</span>
                  <span className="px-3 py-1 border border-[#E5E5E5] rounded-full font-['Inter'] text-[12px] text-[#444747]">MongoDB</span>
                  <span className="px-3 py-1 border border-[#E5E5E5] rounded-full font-['Inter'] text-[12px] text-[#444747]">OpenAI API</span>
                  <span className="px-3 py-1 border border-[#E5E5E5] rounded-full font-['Inter'] text-[12px] text-[#444747]">ChromaDB</span>
                  <span className="px-3 py-1 border border-[#E5E5E5] rounded-full font-['Inter'] text-[12px] text-[#444747]">OAuth2</span>
                  <span className="px-3 py-1 border border-[#E5E5E5] rounded-full font-['Inter'] text-[12px] text-[#444747]">JWT</span>
                </div>
                <div className="flex flex-row gap-3 mt-8">
                  <a href="https://git-intellisolve.vercel.app/" target="_blank" className="bg-[#0B0C0C] text-[#F9F9F9] rounded-full px-[28px] py-[12px] font-['Inter'] text-[14px] font-semibold transition-all duration-150 hover:bg-[#2f3131] hover:-translate-y-[2px] flex items-center justify-center">Live Demo ↗</a>
                  <a href="https://github.com/Saurabh-1706/AI_github_ticket_system" target="_blank" className="bg-[#FFFFFF] border border-[#0B0C0C] text-[#0B0C0C] rounded-full px-[28px] py-[12px] font-['Inter'] text-[14px] font-semibold transition-all duration-150 hover:bg-[#F3F3F4] hover:-translate-y-[2px] flex items-center justify-center">View Code ↗</a>
                </div>
              </div>
              <div className="flex-1 order-1 md:order-2 w-full overflow-hidden">
                <div className="rounded-xl overflow-hidden border border-[#E5E5E5] shadow-sm bg-surface-container-low">
                  <img alt="IntelliTrack Dashboard" className="w-full h-auto inner-image block hover-zoom-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAruJyqQTSpbeACVJfv--nlTIkX_IKFIBVixdbDhbR50TKc2aoodJW-PguVsCAvyy6nGCEIV4aERd5zISWAYXiQlNNxRUVpoSXZo5jSRqApKWZRbwa3jdiO5ysYdTn2uwZkKN4US7LP4ZEpkxqsBu5e9nD69dA19A_i88h1hXUje4nUiQrSmbZsfSirQpnqqcmAoGSRLFegRkifWmWyJqO83-UZmpeQvRhthe09ARdo9LBe-y3hs9YigUgYvdMOVfD6DEvlK-W05oND" />
                </div>
              </div>
            </div>
            {/* Card 2: FitSaaS (Image Left) */}
            <div className="project-card bg-[#FFFFFF] border border-[#E5E5E5] rounded-[24px] p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center fade-up group" style={{ transitionDelay: '150ms' }}>
              <div className="flex-1 w-full overflow-hidden">
                <div className="rounded-xl overflow-hidden border border-[#E5E5E5] shadow-sm bg-surface-container-low">
                  <img alt="FitSaaS Dashboard" className="w-full h-auto inner-image block hover-zoom-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2P7Dn2IwM5O-eCGvyAs0naW2noqer1aj2vhpDL3k6TNVAqTHAxpS6OS2AIc9ekpqpTfSAkL0FgAT4nmUQ1adBMdkrwVtNgVkVNKdMY4XXPCfHj75wTzHRUm5ZFbsoeBycB45lY1vbP6WqrTc86jzPehuL__WsRCpYBRkPzZ6Xoxm7pnjevh78B8LtKrSVq54BcDaHyOh8XMdenYPN4s_QxzUJ656GDD39n5pD2uJQGjFgzoL3qg5Hp4WAsJHMhNq4-77eTTzspmlY" />
                </div>
              </div>
              <div className="flex-1">
                <span className="inline-block bg-[#0B0C0C] text-[#F9F9F9] px-4 py-2 rounded-full font-['Inter'] text-[12px] font-semibold tracking-wide mb-6">SaaS · Multi-tenant · Full Stack</span>
                <h3 className="font-['Sora'] text-[32px] font-semibold text-[#0B0C0C] mb-4">FitSaaS</h3>
                <p className="font-['Inter'] text-[16px] leading-[28px] text-[#444747] mb-8">
                  Multi-tenant gym management SaaS with role-based access control, member management, attendance tracking, and branded dashboards for each gym — built for scale.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 border border-[#E5E5E5] rounded-full font-['Inter'] text-[12px] text-[#444747]">Next.js</span>
                  <span className="px-3 py-1 border border-[#E5E5E5] rounded-full font-['Inter'] text-[12px] text-[#444747]">FastAPI</span>
                  <span className="px-3 py-1 border border-[#E5E5E5] rounded-full font-['Inter'] text-[12px] text-[#444747]">MongoDB</span>
                  <span className="px-3 py-1 border border-[#E5E5E5] rounded-full font-['Inter'] text-[12px] text-[#444747]">JWT</span>
                  <span className="px-3 py-1 border border-[#E5E5E5] rounded-full font-['Inter'] text-[12px] text-[#444747]">Tailwind CSS</span>
                  <span className="px-3 py-1 border border-[#E5E5E5] rounded-full font-['Inter'] text-[12px] text-[#444747]">RBAC</span>
                </div>
                <div className="flex flex-row gap-3 mt-8">
                  <a href="https://gymsphere-hub.vercel.app/" target="_blank" className="bg-[#0B0C0C] text-[#F9F9F9] rounded-full px-[28px] py-[12px] font-['Inter'] text-[14px] font-semibold transition-all duration-150 hover:bg-[#2f3131] hover:-translate-y-[2px] flex items-center justify-center">Live Demo ↗</a>
                  <a href="https://github.com/Saurabh-1706/Gym_management_system" target="_blank" className="bg-[#FFFFFF] border border-[#0B0C0C] text-[#0B0C0C] rounded-full px-[28px] py-[12px] font-['Inter'] text-[14px] font-semibold transition-all duration-150 hover:bg-[#F3F3F4] hover:-translate-y-[2px] flex items-center justify-center">View Code ↗</a>
                </div>
              </div>
            </div>
            {/* Card 3: RAG Knowledge Assistant (Image Right) */}
            <div className="project-card bg-[#FFFFFF] border border-[#E5E5E5] rounded-[24px] p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center fade-up group" style={{ transitionDelay: '300ms' }}>
              <div className="flex-1 order-2 md:order-1">
                <span className="inline-block bg-[#0B0C0C] text-[#F9F9F9] px-4 py-2 rounded-full font-['Inter'] text-[12px] font-semibold tracking-wide mb-6">AI · LLM · Python</span>
                <h3 className="font-['Sora'] text-[32px] font-semibold text-[#0B0C0C] mb-4">RAG Knowledge Assistant</h3>
                <p className="font-['Inter'] text-[16px] leading-[28px] text-[#444747] mb-8">
                  Modular RAG pipeline exploring 6 retrieval strategies — hybrid search, Cohere reranking, multi-query RRF, and semantic chunking — with source citations and configurable retrieval modes.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 border border-[#E5E5E5] rounded-full font-['Inter'] text-[12px] text-[#444747]">Python</span>
                  <span className="px-3 py-1 border border-[#E5E5E5] rounded-full font-['Inter'] text-[12px] text-[#444747]">LangChain</span>
                  <span className="px-3 py-1 border border-[#E5E5E5] rounded-full font-['Inter'] text-[12px] text-[#444747]">ChromaDB</span>
                  <span className="px-3 py-1 border border-[#E5E5E5] rounded-full font-['Inter'] text-[12px] text-[#444747]">OpenAI API</span>
                  <span className="px-3 py-1 border border-[#E5E5E5] rounded-full font-['Inter'] text-[12px] text-[#444747]">FastAPI</span>
                  <span className="px-3 py-1 border border-[#E5E5E5] rounded-full font-['Inter'] text-[12px] text-[#444747]">SentenceTransformers</span>
                </div>
                <div className="flex flex-row gap-3 mt-8">
                  <a href="https://tinyurl.com/rag-knowledge-assistant-demo" target="_blank" className="bg-[#0B0C0C] text-[#F9F9F9] rounded-full px-[28px] py-[12px] font-['Inter'] text-[14px] font-semibold transition-all duration-150 hover:bg-[#2f3131] hover:-translate-y-[2px] flex items-center justify-center">Watch Demo ▶</a>
                  <a href="https://github.com/Saurabh-1706/rag-knowledge-assistant" target="_blank" className="bg-[#FFFFFF] border border-[#0B0C0C] text-[#0B0C0C] rounded-full px-[28px] py-[12px] font-['Inter'] text-[14px] font-semibold transition-all duration-150 hover:bg-[#F3F3F4] hover:-translate-y-[2px] flex items-center justify-center">View Code ↗</a>
                </div>
              </div>
              <div className="flex-1 order-1 md:order-2 w-full overflow-hidden">
                <div className="rounded-xl overflow-hidden border border-[#E5E5E5] shadow-sm bg-surface-container-low">
                  <img alt="RAG Knowledge Assistant Interface" className="w-full h-auto inner-image block hover-zoom-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5Cr-CmEZUMAtDzZrQlArxDqyLNfVQ3K73429CjU-HI0idsqI1YxSPA4ysc1Jl2Rq3vg8281vIqD70X3AwoMvTlVMnjHbF7a91gh3Jal4ICaY4669OHYYOc_4iYGTnagkct5HmTfKbUqwwNnHXjmgecT6jDcEmuoRPJkmqHcMwwTAp7UvinMherUPUvGSoPr4rRSkuSbuFkjFzGjrcwwMtbBcplDmmrK3lxZ6s6SDraDHd4m9iohJTXlgDtLT6oXDYFJalT3lyQ6Ql" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-[#0B0C0C] py-[120px] text-center" id="contact">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          {/* Section Label */}
          <div className="flex flex-col items-center mb-12">
            <span className="font-['Inter'] text-[12px] font-semibold tracking-[0.1em] text-[#747878] uppercase mb-4">CONTACT</span>
            <div className="w-12 h-[1px] bg-[#2f3131]"></div>
          </div>
          {/* Headline */}
          <h2 className="font-['Sora'] text-[40px] md:text-[72px] font-semibold tracking-[-0.04em] text-[#F9F9F9] leading-tight mb-4">
            <span className="inline-block fade-up" style={{ transitionDelay: '0ms' }}>Let's</span>{' '}
            <span className="inline-block fade-up" style={{ transitionDelay: '80ms' }}>Build</span><br/>
            <span className="inline-block fade-up" style={{ transitionDelay: '160ms' }}>Something</span>{' '}
            <span className="inline-block fade-up" style={{ transitionDelay: '240ms' }}>Together.</span>
          </h2>
          {/* Subtext */}
          <p className="font-['Inter'] text-[18px] font-normal text-[#747878] mb-12 max-w-xl mx-auto fade-up" style={{ transitionDelay: '320ms' }}>
            Open to full-time roles, freelance projects, and collaborations.
          </p>
          {/* Buttons */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-20 fade-up" style={{ transitionDelay: '400ms' }}>
            <a className="bg-[#F9F9F9] text-[#0B0C0C] px-8 py-[14px] rounded-full font-semibold transition-all duration-150 hover:opacity-90 hover:scale-[1.02] inline-block" href="mailto:saurabhmojad2173@gmail.com">
              Get In Touch →
            </a>
            <a className="border border-[#444747] text-[#F9F9F9] px-8 py-[14px] rounded-full font-semibold transition-all duration-150 hover:bg-[#F9F9F9] hover:text-[#0B0C0C] hover:scale-[1.02] inline-block" href="/Saurabh_Mojad_Resume.pdf" target="_blank" rel="noopener noreferrer">
              Download Resume ↓
            </a>
          </div>
          {/* Divider */}
          <div className="w-full h-[1px] bg-[#2f3131] mb-8"></div>
          {/* Contact Links Row */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 fade-up" style={{ transitionDelay: '480ms' }}>
            <a className="font-['Inter'] text-[16px] text-[#747878] hover:text-[#F9F9F9] hover:underline transition-all duration-150 hover:scale-110 flex items-center gap-2" href="mailto:saurabhmojad2173@gmail.com">
              <span className="material-symbols-outlined text-sm">mail</span> saurabhmojad2173@gmail.com
            </a>
            <a className="font-['Inter'] text-[16px] text-[#747878] hover:text-[#F9F9F9] hover:underline transition-all duration-150 hover:scale-110 flex items-center gap-2" href="https://github.com/Saurabh-1706" target="_blank" rel="noopener noreferrer">
              <span className="material-symbols-outlined text-sm">code</span> github.com/Saurabh-1706
            </a>
            <a className="font-['Inter'] text-[16px] text-[#747878] hover:text-[#F9F9F9] hover:underline transition-all duration-150 hover:scale-110 flex items-center gap-2" href="https://linkedin.com/in/saurabh-mojad" target="_blank" rel="noopener noreferrer">
              <span className="material-symbols-outlined text-sm">link</span> linkedin.com/in/saurabh-mojad
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
