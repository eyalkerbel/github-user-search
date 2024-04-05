import axios from 'axios';
import {IUserProfile, IUserSearchApiResponse, IUserSearchResultItem, Repo} from "../types";
import {ITEM_PER_LOAD_MORE} from "../const";

const BASE_URL = 'https://api.github.com';


export const searchUsers = async (query: string, page: number = 1, perPage: number = ITEM_PER_LOAD_MORE): Promise<IUserSearchResultItem[]> => {
  try {
    const response = await axios.get<IUserSearchApiResponse>(`${BASE_URL}/search/users`, {
      params: { q: query, page, per_page: perPage },
    });
    return response.data.items;
  } catch (error) {
    console.error("Failed to search users", error);
    throw error;
  }
};

export const fetchUserProfile = async (username: string): Promise<IUserProfile> => {
  try {
    const response = await axios.get<IUserProfile>(`${BASE_URL}/users/${username}`, {},
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user profile", error);
    throw error;
  }
};

export const fetchUserFollowers = async (username: string | null): Promise<IUserSearchResultItem[]> => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}/followers`, {
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user Followers", error);
    throw error;
  }
};

export const fetchUserFollowing = async (username: string | null): Promise<IUserSearchResultItem[]> => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}/following`, {
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user Followers", error);
    throw error;
  }
};

export const fetchUserRepos = async (username: string | null ): Promise<Repo[]> => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user Followers", error);
    throw error;
  }
};


