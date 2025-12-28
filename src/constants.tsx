
import { CMSData } from './types';

export const INITIAL_CMS_DATA: CMSData = {
  settings: {
    siteName: "Willow Rune Press",
    tagline: "Stories Change People. People Change the World",
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
      name: "Dennis Dippary",
      bio: "Elara writes lyrical literary fiction set in the rugged landscapes of the Pacific Northwest.",
      longBio: "Elara Thorne is an award-winning novelist based in Seattle. Her work has appeared in numerous literary journals and explores the intersection of human memory and natural landscapes. When she's not writing, she's foraging for wild mushrooms or tending to her heirloom garden.",
      photo: "https://picsum.photos/seed/elara/600/600",
      socials: [{ platform: "Website", url: "#" }],
      pressInfo: "Represented by Willow Rune Press. Available for panels and readings."
    },
    {
      id: "a2",
      name: "Skye Marie",
      bio: "Julian explores the dark corners of the human psyche through speculative noir.",
      longBio: "Julian Vane's background in investigative journalism informs his sharp, gritty prose. His debut series 'Neon Shadows' has been praised for its atmospheric world-building and complex moral dilemmas.",
      photo: "https://picsum.photos/seed/julian/600/600",
      socials: [{ platform: "Twitter", url: "#" }]
    }
  ],
  books: [
    {
      id: "b1",
      title: "Enough",
      authorId: "a1",
      genre: "LGBTQ+ Fiction",
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
    
      id: "p2",
      title: "Ghost Stories of Yore",
      excerpt: "Why telling ghost stories was a “thing” — and what people actually told",
      content: "Long before ghost stories became something we tell for a thrill, they were something people told for meaning.



In earlier centuries, stories of ghosts weren’t party tricks or seasonal entertainment. They were woven into everyday life — told by hearthlight, during long winter evenings, or shared quietly among neighbors who understood that the world was not as simple as it appeared.

Ghost stories existed because people needed them to.



Why ghost stories mattered

Before electricity, before modern medicine, before psychology had language for grief and trauma, stories were how people made sense of loss. Death was common. Mourning was public. And unanswered questions lingered.

Ghost stories gave voice to those questions.

They allowed people to talk about unfinished business, unresolved guilt, love that didn’t end cleanly, and the fear that something important might be left behind. A ghost wasn’t always something to fear — often, it was something to listen to.


The kinds of ghost stories people told

The ghosts of earlier storytelling traditions were rarely monsters. More often, they were mirrors.

Some spirits returned to right a wrong — a stolen inheritance, a broken promise, a betrayal that needed acknowledgment. Others appeared as warnings, reminders of moral boundaries, or symbols of consequences that could not be escaped.

There were domestic ghosts who lingered in familiar places, tied to homes, wells, crossroads, or family land. These stories reinforced belonging, ancestry, and memory. A place mattered because it remembered.

Religious ghost stories blurred the line between faith and folklore. Spirits might appear as souls in need of prayers, trapped between worlds not out of malice, but because they required help. Fear existed, but so did compassion.

And then there were the quiet stories — the ones about sounds at night, footsteps where no one stood, or the sense of being watched not with menace, but recognition.


Why they endured

Ghost stories survived because they carried emotional truth.

They acknowledged that love doesn’t always end neatly. That memory can be heavy. That places remember us. And that sometimes, the past asks to be seen before it can rest.

Even now, when we tell ghost stories, we aren’t just chasing fear. We’re reaching back toward an old human instinct — to explain what lingers, to honor what was, and to sit with the mystery rather than dismiss it.


  Why they still matter

Modern ghost stories may wear different clothes, but they serve the same purpose. They let us explore grief, regret, longing, and love in a way that feels safe — wrapped in shadows instead of confession.

Ghost stories of yore weren’t just about the dead.

They were about the living — and the things we carry with us long after the lights go out.",
      authorId: "a1",
      date: "2025-12-20", 
  image: "https://picsum.photos/seed/blog1/800/400",
      tags: ["Storytelling", "History"]
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
