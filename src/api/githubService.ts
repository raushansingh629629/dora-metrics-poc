import { Octokit } from 'octokit';

const octokit = new Octokit({ 
  auth: ""
});

interface RepoWithBranches {
  name: string;
  owner: string;
  branchesCount: number;
  url: string;
  lastUpdated: string;
  language: string | null;
}


export const fetchReposWithManyBranches = async (minBranches: number = 30): Promise<RepoWithBranches[]> => {
  try {
    // Get all repositories (paginated)
    const repos = await octokit.paginate(octokit.rest.repos.listForAuthenticatedUser, {
      per_page: 100,
      affiliation: 'owner,collaborator', // Adjust as needed
    });

    const results: RepoWithBranches[] = [];

    // Process repositories in parallel with limited concurrency
    const batchSize = 5; // Avoid GitHub rate limits
    for (let i = 0; i < repos.length; i += batchSize) {
      const batch = repos.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map(async (repo) => {
          try {
            // Get branches (we only need the count)
            const { data: branches } = await octokit.rest.repos.listBranches({
              owner: repo.owner.login,
              repo: repo.name,
              per_page: minBranches + 1, // Optimize - we only need to know if > minBranches
            });

            if (branches.length > minBranches) {
              return {
                name: repo.name,
                owner: repo.owner.login,
                branchesCount: branches.length,
                url: repo.html_url,
              };
            }
            return null;
          } catch (error) {
            console.error(`Error processing ${repo.full_name}:`, error);
            return null;
          }
        })
      );

      results.push(...batchResults.filter(Boolean) as RepoWithBranches[]);
    }

    // Sort by branch count descending
    return results.sort((a, b) => b.branchesCount - a.branchesCount);
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw error;
  }
};

// Additional helper to get exact branch count for a repo
export const getExactBranchCount = async (owner: string, repo: string): Promise<number> => {
  const branches = await octokit.paginate(octokit.rest.repos.listBranches, {
    owner,
    repo,
    per_page: 100,
  });
  return branches.length;
};

export const fetchKoyaRepos = async (minBranches?: number): Promise<RepoWithBranches[]> => {
  try {
    // Fetch all repositories for the Koya organization
    const repos = await octokit.paginate(octokit.rest.repos.listForOrg, {
      org: 'raushansingh629',
      per_page: 100,
      sort: 'updated',
      direction: 'desc'
    });

    const results: RepoWithBranches[] = [];

    // Process repositories with controlled concurrency
    const BATCH_SIZE = 5;
    for (let i = 0; i < repos.length; i += BATCH_SIZE) {
      const batch = repos.slice(i, i + BATCH_SIZE);
      const batchResults = await Promise.all(
        batch.map(async (repo) => {
          try {
            // Only fetch branches if minBranches is specified
            let branchesCount = 0;
            if (minBranches) {
              const { data: branches } = await octokit.rest.repos.listBranches({
                owner: 'raushansingh629',
                repo: repo.name,
                per_page: minBranches ? minBranches + 1 : 1
              });
              branchesCount = branches.length;
              
              // Skip if doesn't meet minimum branch requirement
              if (minBranches && branchesCount <= minBranches) {
                return null;
              }
            }

            return {
              name: repo.name,
              owner: repo.owner?.login || 'raushansingh629',
              branchesCount,
              url: repo.html_url,
              lastUpdated: repo.updated_at,
              language: repo.language
            };
          } catch (error) {
            console.error(`Error processing ${repo.name}:`, error);
            return null;
          }
        })
      );

      results.push(...batchResults.filter(Boolean) as RepoWithBranches[]);
    }

    return results;
  } catch (error) {
    console.error('Error fetching Koya repositories:', error);
    throw error;
  }
};

export const getRepoDetails = async (repoName: string) => {
  return octokit.rest.repos.get({
    owner: 'raushansingh629',
    repo: repoName
  });
};