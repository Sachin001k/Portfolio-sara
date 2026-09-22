// Sara Hulyalkar's portfolio content. Edit the values below — nothing
// else in the codebase needs to change to update the site's text.
//
// Items marked "[placeholder]" are gaps in the source material (no
// document explained them) — swap in the real detail when it's ready.

export const siteConfig = {
  name: "Sara Hulyalkar",
  pronouns: "she/her",
  tags: ["ballet dancer", "STEM researcher", "student innovator"],
  heroIntro:
    "I'm Sara — a Class 11 student at Dhirubhai Ambani International School who builds things at the intersection of ballet, learning science, and design. From a wearable sensor system that catches unsafe ballet footwork to an app that turns study notes into music, I like taking things I love and asking how they could work better.",
  location: "Mumbai, India",
  resumeUrl: "#",
  email: "hello@example.com",
  socials: {
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/in/",
    youtube: "https://youtube.com/",
  },
};

export const about = {
  heading: "About Me",
  paragraphs: [
    "I'm Sara Hulyalkar, a Class 11 student at Dhirubhai Ambani International School. I've trained as a ballet dancer since I was three years old, and over the last few years I've kept finding myself drawn to one question: how do you take something you love — dance, studying, entrepreneurship — and rebuild it with better tools?",
    "That question has taken me from designing a wearable sensor system that flags unsafe ballet footwork, to building an app that turns study notes into music, to co-founding a school club that teaches students how to think like founders. I care about work that's rigorous enough to hold up as research and useful enough that real people actually want it.",
  ],
};

export type ResearchItem = {
  tag: string;
  title: string;
  description: string;
  bullets: string[];
  images: { src: string; alt: string }[];
};

export const research: ResearchItem[] = [
  {
    tag: "EdTech · Science Award",
    title: "EduBeats",
    description:
      "A semantic-to-music encoding system that turns study notes into personalised, neurodiversity-inclusive soundscapes. Phase 1 was a working prototype (Python, gTTS, pydub, librosa) tested with 208 students — 92.9% said it helped them retain material. Phase 2 built a novel NLP pipeline (spaCy, sentence-transformers, music21) that encodes the meaning of text into music, rated by listeners for musical coherence (3.83/5).",
    bullets: [
      "Submitted to the 2026 S.T. Yau High School Science Award (Asia), Computer Science category — shortlisted (Comp-220)",
      "Supervised by Mr. Aman Kesarwani, Pangea Society",
      'Also awarded a CREST Gold Award (British Science Association) for an earlier version, "Turning Study Notes into Soundscapes for Better Learning"',
    ],
    images: [
      {
        src: "/images/edubeats/crest-certificate.png",
        alt: "CREST Gold Award certificate awarded to Sara Hulyalkar",
      },
    ],
  },
  {
    tag: "Wearable Hardware · Ballet Science",
    title: "EquiPointe",
    description:
      'An IMU + FSR-based wearable system, built with research partner Anshul Bhatt and internally code-named "IRIS," that quantifies unsafe ballet footwork in real time — specifically sickling and rolling, two of the most common causes of dancer injury. Two hardware iterations (FSR402 pressure sensors + MPU6050 IMU + a Madgwick filter) reached 80–89% accuracy classifying risky footwork, backed by a custom live-calibration dashboard for capturing and logging session data.',
    bullets: [
      "Includes a full literature-review logbook and a conference-style presentation poster",
      "Custom dashboard software for live sensor calibration and session data capture",
    ],
    images: [
      {
        src: "/images/equipointe/prototype-shoe.jpeg",
        alt: "Prototype ballet shoe fitted with EquiPointe sensors and control box",
      },
      {
        src: "/images/equipointe/imu-sensor-closeup.jpeg",
        alt: "Close-up of the MPU6050 IMU sensor mounted on the shoe",
      },
      {
        src: "/images/equipointe/dashboard-calibration.jpeg",
        alt: "EquiPointe dashboard software showing live sensor calibration and risk readout",
      },
    ],
  },
  {
    tag: "Independent Research",
    title: "Research Papers",
    description:
      "Two independent papers exploring the economics and engineering of performing arts. \"Exploring Sensor-Based Wearable Technology For Ballet Training\" is the academic paper behind EquiPointe — covering ballet injury biomechanics, the economic cost of injury, and the Indian dance-training market. \"An In-Depth Analysis on the Economic Viability of Integrating Recent Technology Developments in Performing Arts Education\" applies the Baumol Cost Disease theory to performing-arts institutions, from Broadway to Indian conservatories, tied to India's National Education Policy 2020.",
    bullets: [],
    images: [],
  },
];

export const ballet = {
  heading: "Ballet",
  description:
    "Sara has trained as a ballet dancer since the age of three. Her years on pointe are the throughline behind both EquiPointe and her ballet research paper — technology projects that grew directly out of her own training.",
  video: {
    src: "/videos/ballet-performance.mp4",
    poster: undefined as string | undefined,
  },
};

export const movementLiteracy = {
  heading: "Movement Literacy",
  description:
    'A movement-education curriculum Sara designed herself, extending her ballet training into a teaching program for young dancers. She started with session-by-session lesson plans blending ballet-derived exercises with body-awareness games, then developed it into a formal curriculum proposal — complete with philosophy, eight curriculum modules, a safety framework, and institutional implementation models — written for physiotherapist review.',
  images: [
    { src: "/images/movement-literacy/session-1.jpg", alt: "Movement Literacy session in progress" },
    { src: "/images/movement-literacy/session-2.jpg", alt: "Movement Literacy session in progress" },
    { src: "/images/movement-literacy/session-3.jpg", alt: "Movement Literacy session in progress" },
  ],
};

export type SchoolRoleItem = {
  role: string;
  context: string;
  image: string;
};

export const schoolRoles: SchoolRoleItem[] = [
  {
    role: "MUN Head Chair",
    context: 'Head Chair at DAIMUN 2025 — "Polycrisis: Navigating a New Global Order"',
    image: "/images/leadership/mun-head-chair.png",
  },
  {
    role: "Student Council",
    context: "[placeholder — add year/role details]",
    image: "/images/leadership/student-council.png",
  },
  {
    role: "Sports Day House Captain",
    context: "[placeholder — add year/house details]",
    image: "/images/leadership/sports-day-house-captain.png",
  },
  {
    role: "House Spirit",
    context: "[placeholder — add event context]",
    image: "/images/leadership/house-spirit.png",
  },
  {
    role: "Swimming Gala",
    context: "[placeholder — add event context]",
    image: "/images/leadership/swimming-gala.png",
  },
  {
    role: "Teachers' Day",
    context: "[placeholder — add event context]",
    image: "/images/leadership/teachers-day.png",
  },
];

export const tspClub = {
  name: "Tech-Sociopreneurship Club (TSP)",
  description:
    'Co-founded with classmates Divina Minocha and Lavanya Gupta, the Tech-Sociopreneurship Club blends AI, business, and social entrepreneurship into a two-semester curriculum, including mock investor panels. Club meeting minutes trace its own path from early brainstorming to a concrete concept, "StudyCycle" (a credit-based textbook and notes marketplace), showcased at a school-wide investor-pitch exhibition, "Business Bazaar."',
  image: {
    src: "/images/tsp-club/founders-forum.png",
    alt: "Tech-Sociopreneurship Club members at the Founders Forum",
  },
};

export const internship = {
  title: "BondboT — AI Support Chatbot",
  description:
    "Built with fellow interns Diya and Grace for a bond-trading platform, BondboT is a rulebook-grounded support chatbot, built with Zapier, designed to help a growing platform scale customer support without scaling headcount.",
};

export type AwardItem = {
  title: string;
  issuer: string;
  image: string;
};

export const awards: AwardItem[] = [
  {
    title: "Excellence in STEM",
    issuer: "DAIS Annual Awards Ceremony 2025–26, Class 11",
    image: "/images/awards/excellence-in-stem.png",
  },
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
];
