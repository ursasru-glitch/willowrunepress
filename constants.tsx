
import { CMSData } from './types';

export const INITIAL_CMS_DATA: CMSData = {
  settings: {
    siteName: "Willow Rune Press",
    tagline: "Stories with Substance and Heart",
    seoDescription: "An independent publishing studio and author co-op focused on emotionally resonant fiction and community-driven storytelling.",
    contactEmail: "hello@willowrune.press",
    socialLinks: [
      { platform: "Instagram", url: "https://instagram.com" },
      { platform: "Twitter", url: "https://twitter.com" },
      { platform: "Threads", url: "https://threads.net" }
    ]
  },
  authors: [
    {
      id: "a1",
      name: "Elara Thorne",
      bio: "Elara writes lyrical literary fiction set in the rugged landscapes of the Pacific Northwest.",
      longBio: "Elara Thorne is an award-winning novelist based in Seattle. Her work has appeared in numerous literary journals and explores the intersection of human memory and natural landscapes. When she's not writing, she's foraging for wild mushrooms or tending to her heirloom garden.",
      photo: "https://picsum.photos/seed/elara/600/600",
      socials: [{ platform: "Website", url: "#" }],
      pressInfo: "Represented by Willow Rune Press. Available for panels and readings."
    },
    {
      id: "a2",
      name: "Julian Vane",
      bio: "Julian explores the dark corners of the human psyche through speculative noir.",
      longBio: "Julian Vane's background in investigative journalism informs his sharp, gritty prose. His debut series 'Neon Shadows' has been praised for its atmospheric world-building and complex moral dilemmas.",
      photo: "https://picsum.photos/seed/julian/600/600",
      socials: [{ platform: "Twitter", url: "#" }]
    }
  ],
  books: [
    {
      id: "b1",
      title: "The Silent Forest",
      authorId: "a1",
      genre: "Literary Fiction",
      description: "A haunting tale of reconciliation and the secrets we leave behind in the woods.",
      coverImage: "https://picsum.photos/seed/forest/400/600",
      buyLinks: [{ platform: "Barnes & Noble", url: "#" }, { platform: "IndieBound", url: "#" }],
      publishedDate: "2023-11-12",
      isFeatured: true,
      excerpt: "The trees didn't speak in words, but in the slow, agonizing creaks of branches heavy with the weight of decades..."
    },
    {
      id: "b2",
      title: "Glass Horizons",
      authorId: "a2",
      genre: "Speculative Noir",
      description: "In a city where memories can be traded like currency, one detective finds a gap in his own history.",
      coverImage: "https://picsum.photos/seed/glass/400/600",
      buyLinks: [{ platform: "Amazon", url: "#" }],
      publishedDate: "2024-02-15",
      isFeatured: false
    }
  ],
  blogPosts: [
    {
      id: "p1",
      title: "The Art of Slow Publishing",
      excerpt: "Why we choose heart over volume in a fast-paced industry.",
      content: "At Willow Rune Press, we believe that books need time to breathe. In an era of rapid-fire releases, we're advocating for a return to the deliberate, the thoughtful, and the deeply edited...",
      authorId: "a1",
      date: "2024-03-20",
      image: "https://picsum.photos/seed/blog1/800/400",
      tags: ["Publishing", "Philosophy"]
    }
  ],
  products: [
    {
      id: "m1",
      name: "Willow Rune Tote Bag",
      price: 25.00,
      description: "Organic cotton canvas tote for your heavy reading list.",
      image: "https://picsum.photos/seed/tote/400/400",
      category: "Apparel"
    }
  ],
  events: [
    {
      id: "e1",
      title: "Spring Equinox Reading",
      date: "2024-04-21",
      time: "19:00",
      location: "Lighthouse Books, Portland",
      description: "Join our authors for an evening of readings and conversation about the changing seasons.",
      rsvpLink: "#",
      image: "https://picsum.photos/seed/event1/800/400"
    }
  ],
  resources: [
    {
      id: "r1",
      title: "Press Kit Boilerplate",
      description: "Official company descriptions and mission statement for media use.",
      version: "1.2",
      fileType: "PDF",
      downloadUrl: "#"
    }
  ],
  testimonials: [
    {
      id: "t1",
      quote: "Willow Rune is more than a publisher; it's a sanctuary for stories that matter.",
      author: "Literary Review Weekly",
      role: "Publication"
    }
  ]
};
