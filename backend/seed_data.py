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

            await session.commit()
            print("\nSeeding finished successfully! Database is populated.")
        except Exception as e:
            await session.rollback()
            print(f"Error during seeding: {e}")

if __name__ == "__main__":
    asyncio.run(seed_data())
