export interface IUserSearchResultItem {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

export interface IUserSearchApiResponse {
  total_count: number;
  incomplete_results: boolean;
  items: IUserSearchResultItem[];
}

export interface IUserProfile {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string | null;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface Follower {
  login: string;
  avatar_url: string;
}

export interface Following {
  login: string;
  avatar_url: string;
}

export interface Repo {
  name: string;
  html_url: string;
}

export interface User {
  login: string;
  id: number;
  avatar_url: string;
}




