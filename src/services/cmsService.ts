import { CMSData } from "../types";

const STORAGE_KEY = "wrp_cms_data_v1";

const defaultData: CMSData = {
  settings: {
    siteName: "Willow Rune Press",
    tagline: "Stories with substance & heart.",
    seoDescription: "An independent publishing studio dedicated to stories with substance and heart.",
    socialLinks: [
      { platform: "Instagram", url: "https://instagram.com" },
      { platform: "Twitter", url: "https://twitter.com" },
      { platform: "Threads", url: "https://threads.net" },
    ],
  },
  authors: [],
  books: [],
  blogPosts: [],
  products: [],
};

export const cmsService = {
  getData(): CMSData {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultData;
      return JSON.parse(raw) as CMSData;
    } catch {
      return defaultData;
    }
  },

  saveData(data: CMSData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  resetData() {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    window.location.hash = "#/home";
    window.location.reload();
  },
};
