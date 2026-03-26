import {
  Blocks,
  ClipboardCheck,
  Leaf,
  Network,
  Pickaxe,
  ScanLine,
  ShieldCheck,
  Waves,
} from 'lucide-react'

export const navigationLinks = [
  { label: 'Home', href: '/' },
  { label: 'Keynote Speakers', href: '/keynote-speakers' },
  { label: 'Committee', href: '/committee' },
  { label: 'Themes & Schedule', href: '/themes-schedule' },
  { label: 'Registration Details', href: '/registration' },
  { label: 'Important Dates', href: '/important-dates' },
  { label: 'Publications', href: '/publications' },
]

export const siteMeta = {
  conferenceName: 'CIVICON 2026',
  subtitle: 'International Conference',
  theme:
    'Smart, Sustainable and Resilient Civil Infrastructure for a Rapidly Urbanising World',
  tagline: 'Where structural thinking meets future-ready engineering research.',
  date: '12-13 February 2026',
  venue: 'Amrutvahini College of Engineering, Sangamner, Maharashtra',
  description:
    'CIVICON 2026 brings together researchers, practitioners, policymakers, and emerging scholars to examine resilient infrastructure, sustainable materials, digital construction workflows, and next-generation civil engineering systems.',
  contactEmail: 'civicon2026@avcoe.org',
  contactPhone: '+91 98765 43210',
}

export const heroMetrics = [
  { value: '20+', label: 'Expert sessions' },
  { value: '08', label: 'Research tracks' },
  { value: '15 Feb', label: 'Paper deadline' },
  { value: 'AVCOE', label: 'Host institution' },
]

export const aboutCards = [
  {
    title: 'About Institute',
    text:
      'Amrutvahini College of Engineering is a well-established autonomous institution known for practice-led engineering education, industry engagement, and a strong regional research network.',
  },
  {
    title: 'About University',
    text:
      'Affiliated academic systems and partner universities support multidisciplinary collaboration, publication pathways, and outreach across civil, environmental, and computational research domains.',
  },
  {
    title: 'About Civil Department',
    text:
      'The Department of Civil Engineering drives innovation in smart construction, transportation, geotechnics, environmental engineering, and resource-efficient infrastructure design.',
  },
]

export const speakers = [
  {
    name: 'Dr. Meera Kulkarni',
    designation: 'Professor, IIT Bombay',
    expertise: 'Smart materials and structural health monitoring',
    linkedin: 'https://www.linkedin.com',
    accent: 'from-teal-300 via-cyan-300 to-sky-500',
  },
  {
    name: 'Prof. Arvind Rao',
    designation: 'Director, Centre for Urban Systems',
    expertise: 'Sustainable mobility and transport planning',
    linkedin: 'https://www.linkedin.com',
    accent: 'from-emerald-300 via-teal-400 to-cyan-500',
  },
  {
    name: 'Dr. Nandita Sen',
    designation: 'Senior Scientist, CSIR-CBRI',
    expertise: 'Seismic resilience and disaster mitigation',
    linkedin: 'https://www.linkedin.com',
    accent: 'from-amber-200 via-orange-300 to-rose-400',
  },
  {
    name: 'Dr. Peter Fernandes',
    designation: 'Principal Consultant, BuildTech Global',
    expertise: 'Digital twins, BIM and construction analytics',
    linkedin: 'https://www.linkedin.com',
    accent: 'from-indigo-300 via-sky-400 to-teal-300',
  },
]

export const committee = {
  chiefPatron: {
    name: 'Dr. S. K. Jha',
    role: 'Chief Patron',
    detail: 'Principal, Amrutvahini College of Engineering',
  },
  patrons: [
    'Management Council, Amrutvahini Sheti & Shikshan Vikas Sanstha',
    'Dean, Faculty of Engineering and Technology',
    'Advisory Board, AVCOE Research and Innovation Cell',
  ],
  convener: 'Dr. Rutuja Deshmukh, Head, Department of Civil Engineering',
  chairs: [
    'Dr. Ajay Patil, Conference Chair',
    'Dr. Snehal Borse, Technical Program Chair',
    'Prof. Omkar Shinde, Publication Chair',
    'Prof. Priyanka Kale, Industry Engagement Chair',
  ],
  members: [
    'Research coordinators and track leads from structural, geotechnical, water resources, environmental, and transportation engineering.',
    'Faculty members overseeing review management, publication workflow, hospitality, sponsorships, and student volunteer operations.',
    'Industry advisors supporting applied sessions on sustainability, BIM, smart cities, and resilient infrastructure delivery.',
  ],
}

export const tracks = [
  {
    title: 'Smart Structures',
    description: 'Monitoring, diagnostics, digital twins, sensing systems, and structural performance engineering.',
    icon: ScanLine,
  },
  {
    title: 'Advanced Materials',
    description: 'Low-carbon concrete, composites, circular materials, and performance-based durability studies.',
    icon: Blocks,
  },
  {
    title: 'Water & Environment',
    description: 'Hydrology, treatment systems, watershed resilience, and climate-adaptive environmental engineering.',
    icon: Waves,
  },
  {
    title: 'Geotechnics & Foundations',
    description: 'Soil stabilization, tunnelling, slope safety, and data-informed ground improvement techniques.',
    icon: Pickaxe,
  },
  {
    title: 'Urban Mobility',
    description: 'Transport modelling, safer streets, multimodal systems, and mobility intelligence.',
    icon: Network,
  },
  {
    title: 'Construction Management',
    description: 'Lean delivery, BIM workflows, digital QA/QC, contracts, and risk-aware project execution.',
    icon: ClipboardCheck,
  },
  {
    title: 'Resilient Infrastructure',
    description: 'Disaster mitigation, retrofitting, infrastructure risk, and resilience planning frameworks.',
    icon: ShieldCheck,
  },
  {
    title: 'Sustainable Development',
    description: 'Green campuses, life-cycle assessment, circular design, and resource-efficient infrastructure.',
    icon: Leaf,
  },
]

export const scheduleHighlights = [
  'Day 1 opens with keynote plenaries, followed by thematic parallel tracks and a research networking salon.',
  'Day 2 focuses on advanced paper presentations, publication guidance, and academic-industry roundtables.',
  'Selected sessions will include moderated discussion panels and reviewer feedback clinics for early-stage scholars.',
]

export const themesOverview = [
  'CIVICON 2026 is curated around resilient infrastructure, sustainable materials, digital construction, transport intelligence, and climate-aware engineering systems.',
  'The programme is designed to balance keynote insight, applied technical sessions, and publication-oriented paper presentations across core civil engineering domains.',
  'Authors, scholars, and practitioners can quickly understand both the thematic breadth of the event and the flow of sessions through a two-mode page experience.',
]

export const conferenceSchedule = [
  {
    day: 'Day 1',
    date: '12 February 2026',
    label: 'Inaugural, keynote, and technical sessions',
    mode: 'Hybrid mode',
    sections: [
      {
        title: 'Inaugural Session',
        type: 'plenary',
        entries: [
          { time: '09:00 - 09:20', title: 'Opening and ceremonial welcome', speaker: 'Conference Secretariat and organizing committee' },
          { time: '09:20 - 09:40', title: 'Host institution address', speaker: 'Principal, Amrutvahini College of Engineering' },
          { time: '09:40 - 10:10', title: 'Conference vision keynote', speaker: 'Chief Guest and academic leadership' },
        ],
      },
      {
        title: 'Keynote Session I',
        type: 'keynote',
        coordinator: 'Session Coordinator: Dr. Rutuja Deshmukh',
        entries: [
          { time: '10:15 - 11:00', title: 'Resilient infrastructure for rapidly urbanising regions', speaker: 'International keynote speaker' },
          { time: '11:00 - 11:15', title: 'Interactive discussion and moderated Q&A', speaker: 'Session chair and delegates' },
        ],
      },
      {
        title: 'Tea Break',
        type: 'break',
        entries: [{ time: '11:15 - 11:35', title: 'Networking break', speaker: 'Delegates lounge' }],
      },
      {
        title: 'Technical Session I',
        type: 'parallel',
        entries: [
          { time: '11:45 - 13:15', title: 'Track A: Advanced structural engineering and materials', speaker: 'Parallel paper presentations' },
          { time: '11:45 - 13:15', title: 'Track B: Transportation infrastructure and mobility systems', speaker: 'Parallel paper presentations' },
        ],
      },
      {
        title: 'Lunch Break',
        type: 'break',
        entries: [{ time: '13:15 - 14:00', title: 'Hosted lunch and networking', speaker: 'Conference hospitality desk' }],
      },
      {
        title: 'Technical Session II',
        type: 'parallel',
        entries: [
          { time: '14:00 - 15:30', title: 'Track C: Geotechnics, foundations, and underground systems', speaker: 'Parallel paper presentations' },
          { time: '14:00 - 15:30', title: 'Track D: Water, environment, and sustainable development', speaker: 'Parallel paper presentations' },
        ],
      },
    ],
  },
  {
    day: 'Day 2',
    date: '13 February 2026',
    label: 'Publication, industry, and closing sessions',
    mode: 'On-campus mode',
    sections: [
      {
        title: 'Keynote Session II',
        type: 'keynote',
        coordinator: 'Session Coordinator: Prof. Snehal Borse',
        entries: [
          { time: '09:30 - 10:15', title: 'Digital project delivery and BIM-enabled civil systems', speaker: 'Industry keynote speaker' },
          { time: '10:15 - 10:30', title: 'Q&A and discussion', speaker: 'Session chair and delegates' },
        ],
      },
      {
        title: 'Publication Clinic',
        type: 'plenary',
        entries: [
          { time: '10:40 - 11:20', title: 'Camera-ready guidance and indexing expectations', speaker: 'Publication chair and editorial panel' },
          { time: '11:20 - 11:45', title: 'Author mentoring desk', speaker: 'Track coordinators' },
        ],
      },
      {
        title: 'Technical Session III',
        type: 'parallel',
        entries: [
          { time: '12:00 - 13:15', title: 'Track E: Construction management and smart site operations', speaker: 'Parallel paper presentations' },
          { time: '12:00 - 13:15', title: 'Track F: Resilience, retrofit, and climate adaptation', speaker: 'Parallel paper presentations' },
        ],
      },
      {
        title: 'Lunch and Networking',
        type: 'break',
        entries: [{ time: '13:15 - 14:00', title: 'Networking lunch', speaker: 'Delegates and invited experts' }],
      },
      {
        title: 'Industry and Closing Forum',
        type: 'plenary',
        entries: [
          { time: '14:00 - 15:00', title: 'Academic-industry roundtable on future-ready civil infrastructure', speaker: 'Industry advisors and faculty leaders' },
          { time: '15:00 - 15:30', title: 'Awards, closing remarks, and roadmap', speaker: 'Conference committee' },
        ],
      },
    ],
  },
]

export const pricing = [
  {
    category: 'Faculty',
    price: 'Rs. 5000',
    features: ['Conference kit and certificates', 'Proceedings access', 'All technical sessions'],
  },
  {
    category: 'Students',
    price: 'Rs. 4000',
    features: ['Discounted scholar access', 'Mentor feedback clinic', 'Presentation support session'],
  },
  {
    category: 'Attendee',
    price: 'Rs. 1000',
    features: ['Session access pass', 'Networking lounge entry', 'Participation certificate'],
  },
]

export const registrationPlans = {
  earlyBird: {
    label: 'Early Bird',
    badge: 'Priority pricing',
    note: 'Available before 15 March 2026. Ideal for early confirmations and department-sponsored delegates.',
    plans: [
      {
        category: 'Faculty',
        price: 'Rs. 4500',
        accent: 'border-teal-300/70',
        tag: 'Early saver',
        features: ['All technical sessions', 'Conference kit and proceedings', 'Lunch and refreshments', 'Priority help desk support'],
      },
      {
        category: 'Students',
        price: 'Rs. 3500',
        accent: 'border-sky-300/70',
        tag: 'Scholar rate',
        features: ['Technical sessions and certificates', 'Proceedings access', 'Mentor feedback clinic', 'Student networking circle'],
      },
      {
        category: 'Attendee',
        price: 'Rs. 800',
        accent: 'border-amber-300/70',
        tag: 'Observer pass',
        features: ['Day access to keynote and featured sessions', 'Participation certificate', 'Networking lounge access', 'Industry showcase entry'],
      },
    ],
  },
  regular: {
    label: 'Regular',
    badge: 'Standard pricing',
    note: 'For final confirmations closer to the conference dates. Includes the full standard participant package.',
    plans: [
      {
        category: 'Faculty',
        price: 'Rs. 5000',
        accent: 'border-teal-300/70',
        tag: 'Regular',
        features: ['All technical sessions', 'Conference kit and proceedings', 'Lunch and refreshments', 'Publication support desk'],
      },
      {
        category: 'Students',
        price: 'Rs. 4000',
        accent: 'border-sky-300/70',
        tag: 'Student offer',
        features: ['Technical sessions and certificates', 'Proceedings access', 'Mentor feedback clinic', 'Presentation support session'],
      },
      {
        category: 'Attendee',
        price: 'Rs. 1000',
        accent: 'border-amber-300/70',
        tag: 'Basic access',
        features: ['Session access pass', 'Networking lounge entry', 'Participation certificate', 'Industry insights sessions'],
      },
    ],
  },
}

export const registrationProcess = [
  'Complete the registration form with participant details and category.',
  'Submit the payment using the listed bank details or QR code.',
  'Upload the payment proof and provide the transaction reference in the form.',
  'Receive verification status and event joining instructions from the organizing team.',
]

export const importantDates = [
  { label: 'Abstract / Paper Submission Deadline', date: '15 February 2026' },
  { label: 'Acceptance Notification', date: '05 March 2026' },
  { label: 'Early Bird Registration', date: '15 March 2026' },
  { label: 'Late Registration Closes', date: '01 April 2026' },
]

export const paymentInfo = {
  bank: 'State Bank of India',
  accountName: 'AVCOE Civil Conference',
  accountNumber: '123456789012',
  ifsc: 'SBIN0001234',
  branch: 'Sangamner Branch',
  qrCodePath: '/uploads-demo/qr-placeholder.svg',
}

export const submissionGuidelines = [
  'Submit only original work relevant to CIVICON 2026 themes.',
  'Upload PDF files only; max size 10 MB.',
  'Use clear authorship, abstract, keywords, and references.',
  'Mention the preferred conference track during submission.',
  'Camera-ready instructions will be shared after acceptance.',
]

export const submissionProcess = [
  'Prepare your manuscript and abstract in PDF format.',
  'Complete the author details and paper metadata form.',
  'Upload the final PDF through the submission panel.',
  'Use the generated tracking ID to monitor review and decision updates.',
]

export const footerLinks = [
  { label: 'Conference Themes', href: '/themes-schedule' },
  { label: 'Registration', href: '/registration' },
  { label: 'Submit Paper', href: '/submit-paper' },
  { label: 'Track Paper', href: '/track-paper' },
  { label: 'Admin Login', href: '/admin/login' },
]

export const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com' },
  { label: 'Instagram', href: 'https://www.instagram.com' },
  { label: 'YouTube', href: 'https://www.youtube.com' },
]
