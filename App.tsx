
import React, { useState, useEffect, createContext, useContext } from 'react';
import { CMSData, Book, Author } from './types';
import { cmsService } from './services/cmsService';
import { Button, Section, Card } from './components/UI';

// --- Context ---
interface CMSContextType {
  data: CMSData;
  updateData: (newData: CMSData) => void;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) throw new Error("useCMS must be used within CMSProvider");
  return context;
};

// --- Main App Component ---
const App: React.FC = () => {
  const [data, setData] = useState<CMSData>(cmsService.getData());
  const [isAdmin, setIsAdmin] = useState(false);
  const [view, setView] = useState<'home' | 'books' | 'authors' | 'about' | 'blog' | 'shop' | 'admin' | 'contact' | 'submissions' | 'press' | 'bookings'>('home');

  const updateData = (newData: CMSData) => {
    setData(newData);
    cmsService.saveData(newData);
  };

  // Simple Hash Routing Simulation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '') || 'home';
      setView(hash as any);
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isAdmin]);

  const navigate = (to: string) => {
    window.location.hash = `#/${to}`;
  };

  return (
    <CMSContext.Provider value={{ data, updateData, isAdmin, setIsAdmin }}>
      <div className="min-h-screen flex flex-col">
        <Header navigate={navigate} activeView={view} />
        <main className="flex-grow">
          <PageContent view={view} navigate={navigate} />
        </main>
        <Footer navigate={navigate} />
      </div>
    </CMSContext.Provider>
  );
};

export default App;

// --- Sub-components ---

const Header: React.FC<{ navigate: (to: string) => void, activeView: string }> = ({ navigate, activeView }) => {
  const { isAdmin } = useCMS();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Books', id: 'books' },
    { label: 'Authors', id: 'authors' },
    { label: 'Shop', id: 'shop' },
    { label: 'Journal', id: 'blog' },
    { label: 'About', id: 'about' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-primary-bg/80 backdrop-blur-md border-b border-divider-color/20 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('home')}>
          <div className="w-8 h-8 bg-navy rounded-full"></div>
          <span className="text-xl font-bold tracking-tight text-navy uppercase serif">Willow Rune</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`text-sm font-medium tracking-wide transition-colors uppercase ${activeView === item.id ? 'text-sage' : 'text-navy hover:text-sage'}`}
            >
              {item.label}
            </button>
          ))}
          <Button variant="primary" onClick={() => navigate('contact')}>Contact</Button>
          {isAdmin && (
            <button onClick={() => navigate('admin')} className="text-xs font-mono text-sage border border-sage px-2 py-1 rounded">ADMIN</button>
          )}
        </div>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4 flex flex-col gap-4">
          {navItems.map(item => (
            <button key={item.id} onClick={() => { navigate(item.id); setIsMenuOpen(false); }} className="text-left py-2 border-b border-divider-color/10 uppercase tracking-widest text-sm">{item.label}</button>
          ))}
          <Button variant="primary" onClick={() => { navigate('contact'); setIsMenuOpen(false); }}>Contact</Button>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC<{ navigate: (to: string) => void }> = ({ navigate }) => {
  const { data, setIsAdmin, isAdmin } = useCMS();
  return (
    <footer className="bg-navy text-primary-bg py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-2xl font-bold serif mb-4">Willow Rune Press</h2>
          <p className="max-w-md text-primary-bg/70 leading-relaxed mb-6">
            An independent publishing studio dedicated to stories with substance and heart. We believe in the power of slow publishing and enduring narratives.
          </p>
          <div className="flex gap-4">
            {data.settings.socialLinks.map(s => (
              <a key={s.platform} href={s.url} className="text-primary-bg/50 hover:text-primary-bg transition-colors">{s.platform}</a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-bold uppercase tracking-widest text-xs mb-6 text-sage">Navigation</h3>
          <ul className="space-y-3 text-sm text-primary-bg/70">
            <li className="hover:text-primary-bg cursor-pointer" onClick={() => navigate('books')}>The Catalog</li>
            <li className="hover:text-primary-bg cursor-pointer" onClick={() => navigate('authors')}>Our Authors</li>
            <li className="hover:text-primary-bg cursor-pointer" onClick={() => navigate('blog')}>The Journal</li>
            <li className="hover:text-primary-bg cursor-pointer" onClick={() => navigate('about')}>About the Studio</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold uppercase tracking-widest text-xs mb-6 text-sage">Studio</h3>
          <ul className="space-y-3 text-sm text-primary-bg/70">
            <li className="hover:text-primary-bg cursor-pointer" onClick={() => navigate('press')}>Press & Media</li>
            <li className="hover:text-primary-bg cursor-pointer" onClick={() => navigate('submissions')}>Submissions</li>
            <li className="hover:text-primary-bg cursor-pointer" onClick={() => navigate('bookings')}>Bookings</li>
            <li className="hover:text-primary-bg cursor-pointer" onClick={() => setIsAdmin(!isAdmin)}>{isAdmin ? 'Exit Admin' : 'Admin Login'}</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-primary-bg/10 flex flex-col md:flex-row justify-between text-xs text-primary-bg/40">
        <p>&copy; {new Date().getFullYear()} Willow Rune Press. All Rights Reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <span className="hover:text-primary-bg cursor-pointer">Privacy Policy</span>
          <span className="hover:text-primary-bg cursor-pointer">Terms & Conditions</span>
        </div>
      </div>
    </footer>
  );
};

const PageContent: React.FC<{ view: string, navigate: (to: string) => void }> = ({ view, navigate }) => {
  switch (view) {
    case 'home': return <HomeView navigate={navigate} />;
    case 'books': return <BooksView />;
    case 'authors': return <AuthorsView />;
    case 'about': return <AboutView />;
    case 'blog': return <BlogView />;
    case 'shop': return <ShopView />;
    case 'contact': return <ContactView />;
    case 'admin': return <AdminDashboard />;
    case 'submissions': return <SubmissionsView />;
    case 'press': return <PressView />;
    case 'bookings': return <BookingsView />;
    default: return <HomeView navigate={navigate} />;
  }
};

// --- Reusable Form Handler ---
const useFormspree = (endpoint: string) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return { status, handleSubmit };
};

// --- Views ---

const HomeView: React.FC<{ navigate: (to: string) => void }> = ({ navigate }) => {
  const { data } = useCMS();
  const featuredBook = data.books.find(b => b.isFeatured) || data.books[0];

  return (
    <div>
      <Section className="min-h-[70vh] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <span className="inline-block py-1 px-3 bg-secondary-bg text-navy text-[10px] font-bold tracking-[0.2em] uppercase rounded-full mb-6">
              Independent Publishing Studio
            </span>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 serif">
              Stories with <span className="italic">substance</span> & heart.
            </h1>
            <p className="text-xl text-sage max-w-lg mb-10 leading-relaxed">
              We curate a collection of emotionally resonant fiction, championing voices that linger long after the final page is turned.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" onClick={() => navigate('books')}>Browse the Catalog</Button>
              <Button variant="secondary" onClick={() => navigate('about')}>Our Mission</Button>
            </div>
          </div>
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-sage/20 rounded-lg blur-xl group-hover:bg-sage/30 transition-all duration-700"></div>
              <img
                src={featuredBook.coverImage}
                alt="Featured Book"
                className="relative w-72 md:w-96 h-auto rounded shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 shadow-xl rounded-lg hidden md:block border border-divider-color/10">
                <p className="text-[10px] uppercase tracking-widest font-bold text-sage mb-1">Featured Release</p>
                <p className="font-bold text-sm serif">{featuredBook.title}</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section bgColor="secondary">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold serif mb-4">Our Collaborators</h2>
            <p className="text-navy/60">Meet the voices behind the stories.</p>
          </div>
          <Button variant="secondary" onClick={() => navigate('authors')}>View All Authors</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.authors.slice(0, 4).map(author => (
            <Card key={author.id} className="p-6 text-center group cursor-pointer" onClick={() => navigate('authors')}>
              <img src={author.photo} alt={author.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover filter grayscale group-hover:grayscale-0 transition-all" />
              <h3 className="font-bold serif text-lg mb-2">{author.name}</h3>
              <p className="text-xs text-navy/60 line-clamp-2">{author.bio}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold serif mb-6">Join the Literary Community</h2>
          <p className="text-lg text-sage mb-10">Get updates on new releases, author events, and behind-the-scenes glimpses into our publishing process.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input type="email" placeholder="Your email address" className="flex-grow px-6 py-3 rounded-full bg-white border border-divider-color/30 focus:outline-none focus:ring-2 focus:ring-sage" />
            <Button variant="primary">Get Updates</Button>
          </div>
          <p className="text-[10px] text-navy/40 mt-6 uppercase tracking-widest">NO SPAM. JUST STORIES. UNsubscribe ANYTIME.</p>
        </div>
      </Section>
    </div>
  );
};

const BooksView: React.FC = () => {
  const { data } = useCMS();
  const [filter, setFilter] = useState('All');
  const genres = ['All', ...new Set(data.books.map(b => b.genre))];
  const filteredBooks = filter === 'All' ? data.books : data.books.filter(b => b.genre === filter);

  return (
    <Section>
      <div className="mb-12">
        <h1 className="text-5xl font-bold serif mb-6">The Catalog</h1>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {genres.map(g => (
            <button
              key={g}
              onClick={() => setFilter(g)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all ${filter === g ? 'bg-navy text-primary-bg border-navy' : 'bg-transparent border-navy/20 text-navy hover:border-navy'}`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
        {filteredBooks.map(book => (
          <div key={book.id} className="group cursor-pointer">
            <div className="aspect-[2/3] overflow-hidden rounded-lg mb-6 shadow-md transition-shadow group-hover:shadow-2xl">
              <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-sage mb-2">{book.genre}</p>
            <h3 className="text-xl font-bold serif mb-1 group-hover:text-sage transition-colors">{book.title}</h3>
            <p className="text-sm text-navy/60 italic mb-4">by {data.authors.find(a => a.id === book.authorId)?.name}</p>
            <Button variant="secondary" className="w-full text-xs">View Details</Button>
          </div>
        ))}
      </div>
    </Section>
  );
};

const AuthorsView: React.FC = () => {
  const { data } = useCMS();
  return (
    <Section>
      <h1 className="text-5xl font-bold serif mb-12">Our Authors</h1>
      <div className="space-y-24">
        {data.authors.map((author, idx) => (
          <div key={author.id} className={`flex flex-col lg:flex-row gap-12 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
            <div className="flex-1">
              <img src={author.photo} alt={author.name} className="w-full h-[500px] object-cover rounded-lg shadow-xl" />
            </div>
            <div className="flex-1 space-y-6">
              <h2 className="text-4xl font-bold serif">{author.name}</h2>
              <div className="w-12 h-1 bg-sage"></div>
              <p className="text-lg leading-relaxed text-navy/80">{author.longBio}</p>
              <div className="pt-6 flex gap-4">
                <Button variant="primary">Author Books</Button>
                <Button variant="secondary">Contact Info</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

const AboutView: React.FC = () => (
  <Section>
    <div className="max-w-3xl mx-auto">
      <h1 className="text-5xl font-bold serif mb-8">About Willow Rune</h1>
      <p className="text-xl leading-relaxed mb-8 serif italic">"A good book is an event in my life."</p>
      <p className="text-lg text-navy/70 leading-relaxed mb-6">
        Willow Rune Press was founded on the belief that storytelling is an essential human act. In a landscape often dominated by algorithm-driven content, we choose to focus on the human element: the specific, the poignant, and the profoundly true.
      </p>
      <p className="text-lg text-navy/70 leading-relaxed mb-12">
        As an independent studio and author co-op, we prioritize creative freedom and artistic integrity. Our authors are partners in every sense of the word, working together to build a community that celebrates the written word in all its complexity.
      </p>
    </div>
  </Section>
);

const ContactView: React.FC = () => {
  const { status, handleSubmit } = useFormspree('https://formspree.io/f/mykyzeye');

  return (
    <Section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h1 className="text-5xl font-bold serif mb-8">Get in Touch</h1>
          <p className="text-lg text-navy/60 mb-12">Whether you're a reader with a question or a bookstore interested in stocking our titles, we'd love to hear from you.</p>
          <div className="space-y-6">
            <div>
              <h4 className="font-bold uppercase tracking-widest text-[10px] text-sage mb-2">General Email</h4>
              <p className="text-xl">hello@willowrune.press</p>
            </div>
          </div>
        </div>
        <Card className="p-8">
          {status === 'success' ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold serif mb-4">Message Sent!</h3>
              <p>We'll get back to you as soon as we can.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest">Name</label>
                  <input required name="name" type="text" className="w-full p-3 bg-white/50 border border-divider-color/20 rounded focus:outline-none focus:ring-1 focus:ring-sage" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest">Email</label>
                  <input required name="email" type="email" className="w-full p-3 bg-white/50 border border-divider-color/20 rounded focus:outline-none focus:ring-1 focus:ring-sage" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest">Message</label>
                <textarea required name="message" rows={4} className="w-full p-3 bg-white/50 border border-divider-color/20 rounded focus:outline-none focus:ring-1 focus:ring-sage"></textarea>
              </div>
              <Button type="submit" variant="primary" className="w-full" disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </Button>
              {status === 'error' && <p className="text-red-500 text-xs text-center mt-2">Something went wrong. Please try again.</p>}
            </form>
          )}
        </Card>
      </div>
    </Section>
  );
};

const SubmissionsView: React.FC = () => {
  const { status, handleSubmit } = useFormspree('https://formspree.io/f/mgoevael');
  return (
    <Section>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold serif mb-8">Submissions</h1>
        <p className="text-lg text-navy/60 mb-12">Willow Rune Press is currently seeking emotionally resonant fiction with a strong sense of place. Please use the form below to submit your query and first 10 pages.</p>
        <Card className="p-8">
          {status === 'success' ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold serif mb-4">Submission Received</h3>
              <p>Our editorial team will review your work and respond within 8-12 weeks.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2"><label className="text-xs font-bold uppercase tracking-widest">Full Name</label><input required name="name" type="text" className="w-full p-3 bg-white/50 border border-divider-color/20 rounded" /></div>
                <div className="space-y-2"><label className="text-xs font-bold uppercase tracking-widest">Email</label><input required name="email" type="email" className="w-full p-3 bg-white/50 border border-divider-color/20 rounded" /></div>
              </div>
              <div className="space-y-2"><label className="text-xs font-bold uppercase tracking-widest">Project Title</label><input required name="title" type="text" className="w-full p-3 bg-white/50 border border-divider-color/20 rounded" /></div>
              <div className="space-y-2"><label className="text-xs font-bold uppercase tracking-widest">Genre</label><input required name="genre" type="text" className="w-full p-3 bg-white/50 border border-divider-color/20 rounded" /></div>
              <div className="space-y-2"><label className="text-xs font-bold uppercase tracking-widest">Query Letter</label><textarea required name="query" rows={6} className="w-full p-3 bg-white/50 border border-divider-color/20 rounded"></textarea></div>
              <div className="space-y-2"><label className="text-xs font-bold uppercase tracking-widest">Links to Samples (Dropbox/Gdrive)</label><input name="sample_link" type="text" className="w-full p-3 bg-white/50 border border-divider-color/20 rounded" /></div>
              <Button type="submit" variant="primary" className="w-full" disabled={status === 'loading'}>{status === 'loading' ? 'Uploading...' : 'Submit Query'}</Button>
            </form>
          )}
        </Card>
      </div>
    </Section>
  );
};

const PressView: React.FC = () => {
  const { status, handleSubmit } = useFormspree('https://formspree.io/f/meeqoaqk');
  return (
    <Section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h1 className="text-5xl font-bold serif mb-8">Press & Media</h1>
          <p className="text-lg text-navy/60 mb-8">For review copy requests, interview inquiries, and high-resolution assets, please contact our media team.</p>
          <div className="space-y-4 text-sm text-navy/70">
            <p className="font-bold tracking-widest uppercase text-xs text-sage">Official Boilerplate</p>
            <p>Willow Rune Press is an independent publishing studio and author co-op founded in 2023, dedicated to literary fiction with substance and heart.</p>
          </div>
        </div>
        <Card className="p-8">
          <h3 className="font-bold serif text-xl mb-6">Media Inquiry Form</h3>
          {status === 'success' ? <div className="text-center py-12"><p>Thank you for your inquiry. Our media team will respond shortly.</p></div> : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required name="publication" placeholder="Publication / Organization" type="text" className="w-full p-3 bg-white/50 border border-divider-color/20 rounded" />
              <input required name="name" placeholder="Your Name" type="text" className="w-full p-3 bg-white/50 border border-divider-color/20 rounded" />
              <input required name="email" placeholder="Your Email" type="email" className="w-full p-3 bg-white/50 border border-divider-color/20 rounded" />
              <textarea required name="request" placeholder="Nature of Request" rows={4} className="w-full p-3 bg-white/50 border border-divider-color/20 rounded"></textarea>
              <Button type="submit" variant="primary" className="w-full" disabled={status === 'loading'}>Send Inquiry</Button>
            </form>
          )}
        </Card>
      </div>
    </Section>
  );
};

const BookingsView: React.FC = () => {
  const { status, handleSubmit } = useFormspree('https://formspree.io/f/xbdjlgjw');
  return (
    <Section>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold serif mb-8">Bookings & Appearances</h1>
        <p className="text-lg text-navy/60 mb-12">Interested in hosting one of our authors for a reading, panel, or workshop? Please provide event details below.</p>
        <Card className="p-8">
          {status === 'success' ? <div className="text-center py-12"><p>Booking request sent! We'll coordinate with the author and get back to you.</p></div> : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input required name="event_name" placeholder="Event Name" type="text" className="w-full p-3 bg-white/50 border border-divider-color/20 rounded" />
                <input required name="date" type="date" className="w-full p-3 bg-white/50 border border-divider-color/20 rounded" />
              </div>
              <input required name="location" placeholder="Location / Virtual" type="text" className="w-full p-3 bg-white/50 border border-divider-color/20 rounded" />
              <select required name="author" className="w-full p-3 bg-white/50 border border-divider-color/20 rounded">
                <option value="">Select Author</option>
                <option value="Elara Thorne">Elara Thorne</option>
                <option value="Julian Vane">Julian Vane</option>
              </select>
              <textarea required name="details" placeholder="Event Details & Compensation" rows={4} className="w-full p-3 bg-white/50 border border-divider-color/20 rounded"></textarea>
              <Button type="submit" variant="primary" className="w-full" disabled={status === 'loading'}>Request Booking</Button>
            </form>
          )}
        </Card>
      </div>
    </Section>
  );
};

const BlogView: React.FC = () => {
  const { data } = useCMS();
  return (
    <Section>
      <h1 className="text-5xl font-bold serif mb-12">The Journal</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {data.blogPosts.map(post => (
          <article key={post.id} className="group">
            <div className="aspect-video overflow-hidden rounded-lg mb-6 shadow-sm">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
            </div>
            <div className="flex gap-2 mb-4">
              {post.tags.map(t => <span key={t} className="text-[10px] px-2 py-0.5 border border-sage text-sage uppercase font-bold tracking-widest rounded">{t}</span>)}
            </div>
            <h2 className="text-2xl font-bold serif mb-3 group-hover:text-sage transition-colors">{post.title}</h2>
            <p className="text-navy/60 text-sm mb-6 line-clamp-3">{post.excerpt}</p>
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] text-navy/40">
              <span>{new Date(post.date).toLocaleDateString()}</span>
              <span className="cursor-pointer hover:text-navy">Read Article &rarr;</span>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
};

const ShopView: React.FC = () => {
  const { data } = useCMS();
  return (
    <Section>
      <h1 className="text-5xl font-bold serif mb-12">The Shop</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {data.products.map(product => (
          <div key={product.id} className="group">
            <div className="aspect-square bg-white rounded-lg p-8 mb-6 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
               <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain" />
            </div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-sage mb-1">{product.category}</p>
            <h3 className="font-bold serif mb-1">{product.name}</h3>
            <p className="text-navy/60 text-sm mb-4">${product.price.toFixed(2)}</p>
            <Button variant="secondary" className="w-full text-xs">Add to Cart</Button>
          </div>
        ))}
      </div>
    </Section>
  );
};

// --- ADMIN DASHBOARD ---

const AdminDashboard: React.FC = () => {
  const { data, updateData } = useCMS();
  const [activeTab, setActiveTab] = useState<'settings' | 'books' | 'authors' | 'blog'>('settings');

  const handleUpdateSetting = (key: string, value: any) => {
    updateData({
      ...data,
      settings: { ...data.settings, [key]: value }
    });
  };

  return (
    <div className="min-h-screen bg-navy/5 flex">
      <aside className="w-64 bg-navy text-primary-bg p-8 shrink-0">
        <h2 className="text-xl font-bold serif mb-12 tracking-tight">Studio Admin</h2>
        <nav className="space-y-1">
          {(['settings', 'books', 'authors', 'blog'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-4 py-3 rounded text-sm font-medium uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-sage text-navy' : 'hover:bg-white/10 text-primary-bg/60'}`}
            >
              {tab}
            </button>
          ))}
        </nav>
        <div className="mt-auto pt-24">
          <button
             onClick={() => cmsService.resetData()}
             className="text-[10px] font-bold uppercase tracking-widest text-red-400/60 hover:text-red-400 transition-colors"
          >
            Reset Factory Data
          </button>
        </div>
      </aside>

      <main className="flex-grow p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {activeTab === 'settings' && (
            <div className="space-y-12">
              <header className="flex justify-between items-end border-b border-navy/10 pb-6">
                <div>
                  <h1 className="text-3xl font-bold serif">Site Configuration</h1>
                  <p className="text-navy/50 text-sm">Control your global brand settings.</p>
                </div>
              </header>
              <section className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-50">Studio Name</label>
                  <input
                    value={data.settings.siteName}
                    onChange={(e) => handleUpdateSetting('siteName', e.target.value)}
                    className="w-full p-4 border border-navy/10 rounded-lg focus:ring-2 focus:ring-sage focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-50">Hero Tagline</label>
                  <input
                    value={data.settings.tagline}
                    onChange={(e) => handleUpdateSetting('tagline', e.target.value)}
                    className="w-full p-4 border border-navy/10 rounded-lg focus:ring-2 focus:ring-sage focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-50">Global SEO Description</label>
                  <textarea
                    value={data.settings.seoDescription}
                    onChange={(e) => handleUpdateSetting('seoDescription', e.target.value)}
                    rows={4}
                    className="w-full p-4 border border-navy/10 rounded-lg focus:ring-2 focus:ring-sage focus:outline-none"
                  />
                </div>
              </section>
            </div>
          )}

          {activeTab === 'books' && (
            <div className="space-y-8">
              <header className="flex justify-between items-end border-b border-navy/10 pb-6">
                <div>
                  <h1 className="text-3xl font-bold serif">Book Catalog</h1>
                  <p className="text-navy/50 text-sm">Manage your published titles and metadata.</p>
                </div>
                <Button variant="primary">Add New Title</Button>
              </header>
              <div className="grid gap-4">
                {data.books.map(book => (
                  <div key={book.id} className="bg-white p-6 rounded-lg border border-navy/5 flex items-center gap-6">
                    <img src={book.coverImage} className="w-12 h-16 object-cover rounded shadow" />
                    <div className="flex-grow">
                      <h4 className="font-bold serif">{book.title}</h4>
                      <p className="text-xs text-navy/40 uppercase tracking-widest">{book.genre} &bull; Published {book.publishedDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'authors' && (
            <div className="space-y-8">
               <header className="flex justify-between items-end border-b border-navy/10 pb-6">
                <div>
                  <h1 className="text-3xl font-bold serif">Author Roster</h1>
                  <p className="text-navy/50 text-sm">Manage author profiles and bios.</p>
                </div>
                <Button variant="primary">Add New Author</Button>
              </header>
              <div className="grid grid-cols-2 gap-6">
                {data.authors.map(author => (
                  <div key={author.id} className="bg-white p-6 rounded-lg border border-navy/5">
                    <div className="flex items-center gap-4 mb-4">
                      <img src={author.photo} className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <h4 className="font-bold serif">{author.name}</h4>
                        <p className="text-xs text-navy/40">Active Member</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'blog' && (
             <div className="space-y-8">
               <header className="flex justify-between items-end border-b border-navy/10 pb-6">
                <div>
                  <h1 className="text-3xl font-bold serif">The Journal</h1>
                  <p className="text-navy/50 text-sm">Draft and publish editorial content.</p>
                </div>
                <Button variant="primary">New Post</Button>
              </header>
              <div className="space-y-4">
                {data.blogPosts.map(post => (
                  <div key={post.id} className="bg-white p-6 rounded-lg border border-navy/5 group cursor-pointer hover:border-sage/50 transition-all">
                     <div className="flex justify-between items-start mb-2">
                       <h4 className="font-bold serif text-xl group-hover:text-sage transition-colors">{post.title}</h4>
                       <span className="text-[10px] bg-sage/10 text-sage font-bold uppercase tracking-widest px-2 py-0.5 rounded">Published</span>
                     </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
