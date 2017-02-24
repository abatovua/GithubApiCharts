interface Owner {
  id: number;
  avatar_url: string;
  login: string;
  html_url: string;
}

interface Repo {
  id: number;
  owner: Owner;
  created_at: string;
  forks: number;
  html_url: string;
  language: string;
  name: string;
  score: number;
  svn_url: string;
}
