// Sara Hulyalkar's portfolio content. Edit the values below — nothing
// else in the codebase needs to change to update the site's text.
//
// Items marked "[pending]" are waiting on confirmation from Sara/Khushi.
// They're left empty (and hidden on the page) rather than shown as
// placeholder text — fill them in once the detail is confirmed.

import type { MediaItem } from "@/components/Gallery";
import type { DocumentItem } from "@/components/DocumentLink";

export type SiteConfig = {
  name: string;
  /** Hero portrait; the "S" monogram shows while this is empty. */
  photo: string;
  pronouns: string;
  tags: string[];
  heroIntro: string;
  location: string;
  resumeUrl: string;
  email: string;
  socials: { label: string; href: string }[];
};

export type TextSection = {
  heading: string;
  description: string;
  gallery: MediaItem[];
};

export const siteConfig: SiteConfig = {
  name: "Sara Hulyalkar",
  photo: "/images/profile/sara-portrait.jpg",
  pronouns: "she/her",
  tags: ["Ballet Dancer", "STEM Researcher", "Student Innovator"],
  heroIntro:
    "I'm Sara, a Class 12 student at Dhirubhai Ambani International School. I love building at the intersection of engineering, business, and human experience. From developing wearable sensors to improving ballet technique to creating an app that turns study notes into music, I enjoy turning problems I care about into technological solutions. What excites me just as much as building a product is figuring out how to bring it to life: understanding the people it serves, designing a viable business model, and finding ways to scale its impact. I want to bridge the gap between what technology makes possible and what people actually need.",
  location: "Mumbai, India",
  // Empty links are hidden; the Contact section (and its nav link / hero
  // button) is hidden entirely while it has nothing to link to.
  // [pending] approved résumé PDF (suggested path: /documents/resume.pdf)
  resumeUrl: "",
  // [pending] approved public email and profile URLs
  email: "",
  socials: [],
};

export function hasContact(config: SiteConfig) {
  return config.email !== "" || config.socials.length > 0;
}

export const about = {
  heading: "About Me",
  paragraphs: [
    "I've trained as a ballet dancer since I was three years old, and over the last few years I've kept finding myself drawn to one question: how do you take something you love — dance, studying, entrepreneurship — and rebuild it with better tools?",
    "That question has taken me from designing a wearable sensor system that flags unsafe ballet footwork, to building an app that turns study notes into music, to co-founding a school club that teaches students how to think like founders. I care about work that's rigorous enough to hold up as research and useful enough that real people actually want it.",
  ],
};

export type PitchVideo = {
  eyebrow: string;
  heading: string;
  description: string;
  /** Empty hides the whole section. */
  video: string;
  poster: string;
  duration: string;
};

// Sara's one-minute pitch, shown right after About Me.
export const pitch: PitchVideo = {
  eyebrow: "Video · 1 min",
  heading: "Why I build",
  description:
    "A one-minute pitch: how years of ballet training led me to build EquiPointe, the shoe that corrects you.",
  video: "/videos/why-i-build.mp4",
  poster: "/images/misc/why-i-build-poster.jpg",
  duration: "1:05",
};

export type ResearchItem = {
  tag: string;
  title: string;
  description: string;
  bullets: string[];
  gallery: MediaItem[];
  documents: DocumentItem[];
};

export const research: ResearchItem[] = [
  {
    tag: "EdTech · Science Award",
    title: "EduBeats",
    description:
      "A semantic-to-music encoding system that turns study notes into personalised, neurodiversity-inclusive soundscapes. Phase 1 was a working prototype (Python, gTTS, pydub, librosa) tested with 50 student volunteers; 92.9% said it helped them retain material. Phase 2 built a novel NLP pipeline (spaCy, sentence-transformers, music21) that encodes the meaning of text into music, rated by listeners for musical coherence (3.83/5).",
    bullets: [
      "Submitted to the 2026 S.T. Yau High School Science Award (Asia), Computer Science category — shortlisted (Comp-220)",
      "Supervised by Mr. Aman Kesarwani, Pangea Society",
      'Also awarded a CREST Gold Award (British Science Association) for an earlier version, "Turning Study Notes into Soundscapes for Better Learning"',
    ],
    gallery: [
      {
        type: "image",
        src: "/images/edubeats/crest-certificate.png",
        alt: "CREST Gold Award certificate awarded to Sara Hulyalkar",
      },
    ],
    documents: [
      { title: "S.T. Yau Research Report (Comp-220)", href: "/documents/edubeats/comp220-research-report.pdf" },
      { title: "CREST Research Report", href: "/documents/edubeats/crest-research-report.pdf" },
    ],
  },
  {
    tag: "Wearable Hardware · Ballet Science",
    title: "EquiPointe",
    description:
      "EquiPointe is a wearable technology project combining biomechanics, embedded sensing, and machine learning to improve ballet technique and reduce injury risk. An externally mounted IMU sensor detects ankle sickling and rolling, translating movement data into actionable insights through a risk-analysis dashboard and corrective training videos. The project explores how real-time sensor analytics can make dance training more objective and personalized, bridging engineering innovation with performing arts.",
    bullets: [
      "Includes a full literature-review logbook and a conference-style presentation poster",
      "Custom dashboard software for live sensor calibration and session data capture",
    ],
    gallery: [
      {
        type: "image",
        src: "/images/equipointe/prototype-shoe.jpeg",
        alt: "Refined prototype: a ballet shoe fitted with EquiPointe sensors and control box",
      },
      {
        type: "image",
        src: "/images/equipointe/prototype-iteration-1.jpeg",
        alt: "Earlier prototype: a full-leg sensor rig worn over ballet shoes",
      },
      {
        type: "image",
        src: "/images/equipointe/sensor-pads-closeup.jpeg",
        alt: "Close-up of the FSR pressure sensor pads",
      },
      {
        type: "image",
        src: "/images/equipointe/imu-sensor-closeup.jpeg",
        alt: "Close-up of the MPU6050 IMU sensor mounted on the shoe",
      },
      {
        type: "image",
        src: "/images/equipointe/dashboard-calibration.jpeg",
        alt: "EquiPointe dashboard software showing live sensor calibration and risk readout",
      },
      {
        type: "image",
        src: "/images/equipointe/dashboard-capture.jpeg",
        alt: "EquiPointe dashboard software showing session data capture",
      },
      {
        type: "video",
        src: "/videos/equipointe-test-1.mp4",
        poster: "/images/equipointe/test-1-poster.jpg",
        alt: "EquiPointe prototype testing footage",
      },
      {
        type: "video",
        src: "/videos/equipointe-test-2.mp4",
        poster: "/images/equipointe/test-2-poster.jpg",
        alt: "EquiPointe prototype testing footage",
      },
    ],
    documents: [
      { title: "Literature Review Logbook", href: "/documents/equipointe/iris-logbook.pdf" },
      { title: "Competition Poster", href: "/documents/equipointe/iris-poster.pdf" },
      { title: "Presentation Deck", href: "/documents/equipointe/iris-presentation.pdf" },
    ],
  },
  {
    tag: "Independent Research",
    title: "Research Papers",
    description:
      "Two independent papers exploring the economics and engineering of performing arts. \"Exploring Sensor-Based Wearable Technology For Ballet Training\" is the academic paper behind EquiPointe — covering ballet injury biomechanics, the economic cost of injury, and the Indian dance-training market. \"An In-Depth Analysis on the Economic Viability of Integrating Recent Technology Developments in Performing Arts Education\" applies the Baumol Cost Disease theory to performing-arts institutions, from Broadway to Indian conservatories, tied to India's National Education Policy 2020.",
    bullets: [],
    gallery: [],
    documents: [
      { title: "Sensor-Based Wearable Technology For Ballet Training", href: "/documents/research/ballet-wearable-tech-paper.pdf" },
      { title: "Economic Viability of Technology in Performing Arts Education", href: "/documents/research/economic-viability-paper.pdf" },
    ],
  },
];

export const ballet: TextSection = {
  heading: "Ballet",
  description:
    "Sara has trained as a ballet dancer since the age of three. Her years on pointe are the throughline behind both EquiPointe and her ballet research paper — technology projects that grew directly out of her own training.",
  gallery: [
    { type: "video", src: "/videos/ballet/performance.mp4", poster: "/images/ballet/performance-poster.jpg", alt: "Ballet performance" },
    { type: "video", src: "/videos/ballet/practice-1.mp4", poster: "/images/ballet/practice-1-poster.jpg", alt: "Ballet practice session" },
    { type: "video", src: "/videos/ballet/clip-1.mp4", poster: "/images/ballet/clip-1-poster.jpg", alt: "Ballet training clip" },
    { type: "video", src: "/videos/ballet/clip-2.mp4", poster: "/images/ballet/clip-2-poster.jpg", alt: "Ballet training clip" },
    { type: "video", src: "/videos/ballet/clip-3.mp4", poster: "/images/ballet/clip-3-poster.jpg", alt: "Ballet training clip" },
    { type: "video", src: "/videos/ballet/clip-4.mp4", poster: "/images/ballet/clip-4-poster.jpg", alt: "Ballet training clip" },
  ],
};

export const movementLiteracy: TextSection = {
  heading: "Movement Literacy",
  description:
    "I designed a movement literacy curriculum that extends my ballet training into a teaching program for young dancers. I started with session-by-session lesson plans blending ballet-derived exercises with body-awareness games, then developed them into a formal curriculum proposal — complete with a philosophy, eight curriculum modules, a safety framework, and institutional implementation models — written for physiotherapist review.",
  gallery: [
    { type: "image", src: "/images/movement-literacy/session-1.jpg", alt: "Movement Literacy session in progress" },
    { type: "image", src: "/images/movement-literacy/session-2.jpg", alt: "Movement Literacy session in progress" },
    { type: "image", src: "/images/movement-literacy/session-3.jpg", alt: "Movement Literacy session in progress" },
    { type: "image", src: "/images/movement-literacy/session-4.jpg", alt: "Movement Literacy session in progress" },
    { type: "image", src: "/images/movement-literacy/session-5.jpg", alt: "Movement Literacy session in progress" },
    { type: "image", src: "/images/movement-literacy/session-6.jpg", alt: "Movement Literacy session in progress" },
  ],
};

export type SchoolRoleItem = {
  /** Small label above the title, e.g. "Club". */
  label?: string;
  role: string;
  context: string;
  documents?: DocumentItem[];
  gallery: MediaItem[];
};

export const schoolRoles: SchoolRoleItem[] = [
  {
    role: "House Captain — Panthers House",
    context:
      "House Captain of Panthers House. Elected by a school-wide teacher panel. Led 250+ students; organised inter-house competitions and campus engagement initiatives.",
    gallery: [
      { type: "image", src: "/images/leadership/student-council.png", alt: "Student Council — Sara Hulyalkar, Panther House Captain" },
      { type: "image", src: "/images/leadership/sports-day-house-captain.png", alt: "Leading Panthers house on Sports Day" },
      { type: "video", src: "/videos/march-past.mp4", poster: "/images/misc/march-past-poster.jpg", alt: "Sports Day march past — first place" },
      { type: "image", src: "/images/leadership/house-spirit.png", alt: "House Spirit day, Panthers house" },
      { type: "image", src: "/images/leadership/house-spirit-2.png", alt: "House Spirit day, Panthers house" },
      { type: "image", src: "/images/leadership/house-spirit-3.png", alt: "Annual Athletic Meet, Panthers house" },
      { type: "image", src: "/images/leadership/swimming-gala.png", alt: "Swimming Gala" },
      { type: "image", src: "/images/leadership/teachers-day.png", alt: "Teachers' Day" },
      { type: "image", src: "/images/leadership/interhouse-football.png", alt: "Inter-house football" },
      { type: "image", src: "/images/leadership/interhouse-table-tennis.png", alt: "Inter-house table tennis" },
    ],
  },
  {
    label: "Club",
    role: "Tech-Sociopreneurship Club (TSP)",
    context:
      "I founded and led DAIS's Tech-Sociopreneurship Club, mentoring 12 student ventures in technology-driven innovation, business model development, and social impact. I onboarded 5 judges and organized Founders' Forum, showcasing 3 winning social enterprises that applied entrepreneurial thinking to community challenges.",
    documents: [{ title: "Club Proposal", href: "/documents/tsp-club/tsp-club-proposal.pdf" }],
    gallery: [
      { type: "image", src: "/images/tsp-club/founders-forum.png", alt: "Tech-Sociopreneurship Club members at the Founders Forum" },
      { type: "image", src: "/images/tsp-club/club-meeting.png", alt: "Tech-Sociopreneurship Club meeting" },
      { type: "image", src: "/images/tsp-club/ideation-session.png", alt: "Tech-Sociopreneurship Club ideation session" },
      { type: "image", src: "/images/tsp-club/judging-rubric.png", alt: "Founders Forum judging rubric" },
    ],
  },
  {
    role: "MUN Head Chair",
    context: "Head Chair at DAIMUN 2026",
    gallery: [
      { type: "image", src: "/images/leadership/daimun-2026-1.jpg", alt: "MUN Head Chair at DAIMUN 2026" },
      { type: "image", src: "/images/leadership/daimun-2026-2.jpg", alt: "MUN Head Chair at DAIMUN 2026" },
    ],
  },
];

export const internship: Internship = {
  // [pending] confirm company spelling (BondbloX vs BondBloxx)
  title: "BondbloX | Exploring Technology in Finance",
  description:
    "During my internship at BondbloX, I gained exposure to the intersection of financial services, technology, and business. The experience helped me explore how financial products are developed and delivered, and how technology can make financial markets more accessible and efficient. My internship culminated in creating an AI-based chatbot for the BondbloX website and a bond recommendation engine to be included on the website.",
  documents: [{ title: "BondboT Presentation", href: "/documents/internship/bondbot-presentation.pdf" }],
};

export type Internship = {
  title: string;
  description: string;
  documents: DocumentItem[];
};

export type AwardItem = {
  title: string;
  issuer: string;
  image: string;
};

export const awards: AwardItem[] = [
  {
    title: "CREST Gold Award",
    issuer:
      'British Science Association, for "Turning Study Notes into Soundscapes for Better Learning" (16 Oct 2025)',
    image: "/images/edubeats/crest-certificate.png",
  },
  {
    title: "S.T. Yau High School Science Award (Asia)",
    issuer: "Shortlisted, Computer Science category (Comp-220)",
    image: "/images/edubeats/st-yau-shortlist.png",
  },
  {
    title: "M&TSI Summer Scholar",
    issuer:
      "Management & Technology Summer Institute, University of Pennsylvania (2026). Selected for the pre-college program; scored 92.07% (A-).",
    image: "/images/awards/mtsi-summer-scholar.jpg",
  },
  {
    title: "Excellence in STEM",
    issuer: "DAIS Annual Awards Ceremony 2025–26, Class 11",
    image: "/images/awards/excellence-in-stem.png",
  },
  {
    title: "Academic Excellence Award",
    issuer: "For scoring 40+/42 in both terms, Class 11",
    image: "/images/awards/academic-excellence.jpg",
  },
];

// Everything the site renders. The admin panel saves an edited copy of
// this to Supabase; see src/lib/content.ts.
export type SiteContent = {
  siteConfig: SiteConfig;
  about: { heading: string; paragraphs: string[] };
  pitch: PitchVideo;
  research: ResearchItem[];
  ballet: TextSection;
  movementLiteracy: TextSection;
  schoolRoles: SchoolRoleItem[];
  internship: Internship;
  awards: AwardItem[];
};

export const defaultContent: SiteContent = {
  siteConfig,
  about,
  pitch,
  research,
  ballet,
  movementLiteracy,
  schoolRoles,
  internship,
  awards,
};
