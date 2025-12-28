// Temporary stub so builds succeed.
// Replace with real CMS logic once wired.
export const cmsService = {
  async listPosts() {
    return [];
  },
  async getPost(_id: string) {
    return null;
  },
  async savePost(_data: any) {
    return { ok: true };
  },
};

