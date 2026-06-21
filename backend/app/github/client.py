import httpx
import logging
from typing import Dict, Any

from app.core.config import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()

GITHUB_GRAPHQL_URL = "https://api.github.com/graphql"

GRAPHQL_QUERY = """
query($username: String!) {
  user(login: $username) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
            contributionLevel
          }
        }
      }
    }
    repositories(first: 100, ownerAffiliations: OWNER, orderBy: {field: STARGAZERS, direction: DESC}) {
      nodes {
        databaseId
        name
        nameWithOwner
        description
        url
        primaryLanguage {
          name
        }
        languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
          edges {
            size
            node {
              name
            }
          }
        }
        stargazerCount
        forkCount
        isPrivate
        isFork
        pushedAt
        createdAt
      }
    }
  }
}
"""

async def fetch_github_data() -> Dict[str, Any]:
    """
    Fetch repository stats and contribution calendar from GitHub GraphQL API.
    Raises Exception if API call fails or env is misconfigured.
    """
    token = settings.GITHUB_TOKEN
    username = settings.GITHUB_USERNAME

    if not token:
        raise ValueError("GITHUB_TOKEN environment variable is not configured.")
    if not username:
        raise ValueError("GITHUB_USERNAME environment variable is not configured.")

    headers = {
        "Authorization": f"Bearer {token}",
        "User-Agent": "FastAPI-Portfolio-App"
    }

    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.post(
            GITHUB_GRAPHQL_URL,
            json={"query": GRAPHQL_QUERY, "variables": {"username": username}},
            headers=headers
        )

        if response.status_code != 200:
            logger.error(f"GitHub GraphQL API returned status code {response.status_code}: {response.text}")
            raise Exception(f"GitHub API Error: HTTP {response.status_code}")

        res_json = response.json()
        if "errors" in res_json:
            errors = res_json["errors"]
            logger.error(f"GitHub GraphQL returned errors: {errors}")
            raise Exception(f"GitHub GraphQL Error: {errors[0]['message']}")

        # Validate structure
        user_data = res_json.get("data", {}).get("user")
        if not user_data:
            raise Exception(f"GitHub User '{username}' not found or token lacks permissions.")

        return user_data
