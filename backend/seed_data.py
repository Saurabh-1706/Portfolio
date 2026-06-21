import asyncio
import os
import sys
import uuid
from datetime import date

# Ensure we can import app modules
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

from sqlalchemy import select, func
from app.core.database import async_session
from app.models.profile import Profile
from app.models.resume_entry import ResumeEntry
from app.models.project import Project
from app.models.skill import Skill
from app.models.blog import Blog

async def seed_data():
    print("Connecting to database to seed content...")
    async with async_session() as session:
        try:
            # 1. Seed Profile
            profile_stmt = select(func.count()).select_from(Profile)
            profile_count = (await session.execute(profile_stmt)).scalar()
            
            profile_id = uuid.uuid4()
            if profile_count == 0:
                print("Seeding Profile...")
                profile = Profile(
                    id=profile_id,
                    full_name="Saurabh",
                    headline="Full-Stack Engineer & AI Solutions Architect",
                    summary=(
                        "Saurabh is a full-stack developer specializing in building production-grade web applications "
                        "and AI-powered solutions. He has extensive experience working with Next.js, FastAPI, "
                        "PostgreSQL, Redis, and LangChain. Passionate about engineering clean code, performance optimization, "
                        "and designing intuitive AI agent workflows."
                    ),
                    looking_for="Senior Full-Stack Engineer, AI Engineer, or Technical Lead roles.",
                    skills=["React", "Next.js", "TypeScript", "Python", "FastAPI", "PostgreSQL", "Redis", "Docker", "LangChain", "LangGraph", "ChromaDB"],
                    email="saurabh@example.com",
                    github_url="https://github.com/Saurabh-1706",
                    linkedin_url="https://linkedin.com/in/saurabh",
                    is_published=True,
                    is_indexed=False
                )
                session.add(profile)
                print("Profile added!")
            else:
                print("Profile already exists. Skipping profile seeding.")
                # Fetch existing profile ID to link resume entries if needed
                profile_res = await session.execute(select(Profile.id).limit(1))
                profile_id = profile_res.scalar()

            # 2. Seed Resume Entries (Work Experience & Education)
            resume_stmt = select(func.count()).select_from(ResumeEntry)
            resume_count = (await session.execute(resume_stmt)).scalar()
            
            if resume_count == 0:
                print("Seeding Resume Entries...")
                entries = [
                    ResumeEntry(
                        title="Senior Full-Stack Engineer",
                        organization="Innovate AI Tech",
                        description=(
                            "Led development of core SaaS dashboards using Next.js and FastAPI. "
                            "Implemented vector database RAG pipelines that reduced customer support response times by 40%. "
                            "Optimized SQL queries and database indexes, accelerating load times by 25%."
                        ),
                        start_date=date(2024, 1, 1),
                        end_date=None,  # Current job
                        entry_type="work",
                        is_published=True,
                        is_indexed=False
                    ),
                    ResumeEntry(
                        title="Software Engineer",
                        organization="WebSolutions Corp",
                        description=(
                            "Built and maintained responsive react components. Developed REST APIs in Django. "
                            "Collaborated with UI/UX designers to implement clean layouts. Managed CI/CD pipelines via GitHub Actions."
                        ),
                        start_date=date(2022, 6, 15),
                        end_date=date(2023, 12, 31),
                        entry_type="work",
                        is_published=True,
                        is_indexed=False
                    ),
                    ResumeEntry(
                        title="Bachelor of Technology in Computer Science",
                        organization="Technical University",
                        description="Graduated with Honors. Specialization in Software Engineering and Database Management Systems.",
                        start_date=date(2018, 8, 1),
                        end_date=date(2022, 5, 30),
                        entry_type="education",
                        is_published=True,
                        is_indexed=False
                    )
                ]
                session.add_all(entries)
                print("Resume entries added!")
            else:
                print("Resume entries already exist. Skipping resume seeding.")

            # 3. Seed a Sample Project if none exist
            project_stmt = select(func.count()).select_from(Project)
            project_count = (await session.execute(project_stmt)).scalar()
            
            if project_count == 0:
                print("Seeding Sample Project...")
                project = Project(
                    title="AI Recruiter Chatbot Portfolio",
                    slug="ai-recruiter-chatbot-portfolio",
                    short_desc="A production-grade developer portfolio featuring a headless CMS and an AI recruiter assistant built on a LangGraph RAG workflow.",
                    full_desc="A production-grade developer portfolio featuring a headless CMS and an AI recruiter assistant built on a LangGraph RAG workflow.",
                    image_url="/images/projects/chatbot-cover.jpg",
                    github_url="https://github.com/Saurabh-1706/Portfolio",
                    live_demo_url="http://localhost:3000",
                    tech_stack=["Next.js 16", "Tailwind CSS v4", "FastAPI", "LangChain", "LangGraph", "ChromaDB", "PostgreSQL"],
                    challenges="Designing a document grader node in LangGraph to score vector search results and filter hallucination prompts.",
                    lessons_learned="Built an SSE streaming chat interface supporting real-time markdown answers and citation chips.",
                    metrics={"accuracy": "95%", "response_time": "SSE stream"},
                    sort_order=1,
                    is_published=True,
                    is_indexed=False
                )
                session.add(project)
                print("Sample project added!")
            else:
                print("Projects already exist. Skipping project seeding.")

            # 4. Seed Skills if none exist
            skills_stmt = select(func.count()).select_from(Skill)
            skills_count = (await session.execute(skills_stmt)).scalar()
            if skills_count == 0:
                print("Seeding Skills...")
                skills_data = [
                    # AI / ML
                    Skill(name="LangChain", category="AI / ML", proficiency=5, sort_order=0),
                    Skill(name="LangGraph", category="AI / ML", proficiency=5, sort_order=1),
                    Skill(name="OpenAI API", category="AI / ML", proficiency=5, sort_order=2),
                    Skill(name="ChromaDB", category="AI / ML", proficiency=4, sort_order=3),
                    Skill(name="RAG Pipelines", category="AI / ML", proficiency=5, sort_order=4),
                    Skill(name="Prompt Engineering", category="AI / ML", proficiency=4, sort_order=5),
                    
                    # Backend
                    Skill(name="FastAPI", category="Backend", proficiency=5, sort_order=0),
                    Skill(name="Python", category="Backend", proficiency=5, sort_order=1),
                    Skill(name="PostgreSQL", category="Backend", proficiency=5, sort_order=2),
                    Skill(name="Redis", category="Backend", proficiency=4, sort_order=3),
                    Skill(name="SQLAlchemy", category="Backend", proficiency=4, sort_order=4),
                    Skill(name="REST APIs", category="Backend", proficiency=5, sort_order=5),
                    
                    # Frontend
                    Skill(name="Next.js", category="Frontend", proficiency=4, sort_order=0),
                    Skill(name="React", category="Frontend", proficiency=4, sort_order=1),
                    Skill(name="TypeScript", category="Frontend", proficiency=4, sort_order=2),
                    Skill(name="Tailwind CSS", category="Frontend", proficiency=5, sort_order=3),
                    Skill(name="Framer Motion", category="Frontend", proficiency=3, sort_order=4),
                    
                    # Cloud / DevOps
                    Skill(name="Docker", category="Cloud / DevOps", proficiency=4, sort_order=0),
                    Skill(name="GitHub Actions", category="Cloud / DevOps", proficiency=4, sort_order=1),
                    Skill(name="Vercel", category="Cloud / DevOps", proficiency=4, sort_order=2),
                    Skill(name="Railway", category="Cloud / DevOps", proficiency=4, sort_order=3),
                    Skill(name="AWS", category="Cloud / DevOps", proficiency=3, sort_order=4),
                    Skill(name="CI/CD", category="Cloud / DevOps", proficiency=4, sort_order=5),
                ]
                session.add_all(skills_data)
                print("Skills added!")
            else:
                print("Skills already exist. Skipping skills seeding.")

            # 5. Seed Blogs if none exist
            blogs_stmt = select(func.count()).select_from(Blog)
            blogs_count = (await session.execute(blogs_stmt)).scalar()
            if blogs_count == 0:
                print("Seeding sample Blog...")
                sample_blog = Blog(
                    title="Building a Multi-Agent DevOps Copilot with LangGraph",
                    slug="multi-agent-devops-copilot-langgraph",
                    summary="A deep dive into orchestration, agent state coordination, and implementing reliable recovery loops in autonomous AI systems.",
                    content=(
                        "# Building a Multi-Agent DevOps Copilot with LangGraph\n\n"
                        "Autonomous AI agents are transforming how we manage systems. In this post, we explore "
                        "how to design, build, and deploy a multi-agent system using LangGraph that can automatically "
                        "triage DevOps incidents and suggest remediation steps.\n\n"
                        "## The Supervisor Agent Pattern\n\n"
                        "We implement a supervisor agent pattern to coordinate between different specialized agents: "
                        "Triage Agent, Runbook Searcher, and Resolution Drafter. This ensures separation of concerns "
                        "and reliable execution loops.\n\n"
                        "```python\n"
                        "from langgraph.graph import StateGraph\n"
                        "# Define workflow logic\n"
                        "workflow = StateGraph(DevOpsState)\n"
                        "```\n\n"
                        "## Results\n\n"
                        "The resulting copilot reduces average incident resolution time by up to 40%."
                    ),
                    tags=["LangGraph", "AI", "DevOps", "FastAPI"],
                    published=True,
                    views=142,
                    read_time=5
                )
                session.add(sample_blog)
                print("Sample blog added!")
            else:
                print("Blogs already exist. Skipping blog seeding.")

            await session.commit()
            print("\nSeeding finished successfully! Database is populated.")
        except Exception as e:
            await session.rollback()
            print(f"Error during seeding: {e}")

if __name__ == "__main__":
    asyncio.run(seed_data())
