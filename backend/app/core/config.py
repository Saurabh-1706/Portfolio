"""
Application configuration using Pydantic Settings.
Loads from environment variables / .env file.
"""
from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    # App
    APP_NAME: str = "Portfolio API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True

    # Database
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/portfolio"

    # Redis
    REDIS_URL: str = "redis://localhost:6379"

    # ChromaDB (HTTP client pointing at the Docker service)
    CHROMA_HOST: str = "localhost"
    CHROMA_PORT: int = 8001

    # OpenAI
    OPENAI_API_KEY: str = ""

    # GitHub
    GITHUB_TOKEN: str = ""
    GITHUB_USERNAME: str = ""

    # Cloudinary
    CLOUDINARY_CLOUD_NAME: str = ""
    CLOUDINARY_API_KEY: str = ""
    CLOUDINARY_API_SECRET: str = ""

    # Clerk
    CLERK_SECRET_KEY: str = ""

    # CORS
    ALLOWED_ORIGINS: str = "http://localhost:3000"

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
    }

    @property
    def cors_origins(self) -> list[str]:
        return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",")]


@lru_cache()
def get_settings() -> Settings:
    return Settings()
