import {
  Blocks,
  Cpu,
  Factory,
  ClipboardCheck,
  Leaf,
  Network,
  Pickaxe,
  ScanLine,
  ShieldCheck,
  Waves,
  Zap,
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
  conferenceName: 'SRES-26',
  subtitle: 'International Conference On',
  theme: 'Sustainable and Resilient Engineering System',
  tagline: 'Organized by the Department of Civil Engineering, Amrutvahini College of Engineering, Sangamner.',
  date: '16 September 2026',
  venue: 'Amrutvahini College of Engineering, Sangamner, Maharashtra, India',
  description:
    'SRES-26 is focused on presenting and disseminating high-quality research and applied studies addressing sustainability and resilience in modern engineering systems across civil, electrical, and mechanical domains.',
  contactEmail: 'sres26@avcoe.org',
  contactPhone: '+91 98601 79804 / +91 99987 80784',
}

export const heroMetrics = [
  { value: '10', label: 'Conference themes' },
  { value: '16 Sep', label: 'Conference date' },
  { value: '25 May', label: 'Abstract deadline' },
  { value: 'AVCOE', label: 'Host institution' },
]

export const aboutCards = [
  {
    title: 'About Institute',
    text:
      'Established in 1983 by Amrutvahini Sheti and Shikshan Vikas Sanstha, the institute is AICTE approved, permanently affiliated to Savitribai Phule Pune University, accredited four times by NBA, and NAAC A+ certified.',
  },
  {
    title: 'Location & Venue',
    text:
      'AVCOE is located on the Nashik-Pune Highway (NH-50), around 5 km from Sangamner, 56 km from Nashik Road railway station, 50 km from Shirdi, and 150 km from Pune. The nearest airport is at Shirdi.',
  },
  {
    title: 'Who Should Attend?',
    text:
      'The conference is specifically targeted to researchers, faculty members, industry professionals, and graduate as well as undergraduate engineering students.',
  },
]

export const speakers = []

export const committee = {
  chiefPatrons: [
    {
      name: "Hon'ble Shri. Balasaheb B. Thorat",
      detail: 'Ex. Minister of Revenue, Maharashtra State. President, ASSVS',
    },
    {
      name: "Hon'ble Dr. Sudhir Tambe",
      detail: 'Ex. MLC, Maharashtra State. Trustee, ASSVS',
    },
  ],
  patrons: [
    "Hon'ble Mrs. Sharayu Deshmukh - Managing Trustee, ASSVS, Sangamner",
    'Shri. Anil B. Shinde - Chief Executive Officer, ASSVS',
    'Dr. Jyotiba B. Gurav - Director Academics, ASSVS',
    'Prof. V. B. Dhumal - Manager, ASSVS, Sangamner',
  ],
  conferenceChair: 'Dr. M. A. Venkatesh - Principal, AVCOE, Sangamner',
  conferenceSecretary: 'Dr. S. B. Kandekar - Head, Department of Civil Engineering, AVCOE, Sangamner',
  conveners: [
    'Dr. A. J. Mehetre - Department of Civil Engineering, AVCOE, Sangamner',
    'Dr. R. T. Sahu - Department of Civil Engineering, AVCOE, Sangamner',
  ],
  organizingCommittee: [
    'Dr. A. V. Navale',
    'Dr. R. S. Ingole',
    'Dr. (Mrs.) V. B. Navale',
    'Dr. Debarata Debnath',
    'Er. V. R. Rahane',
    'Er. V. P. Kulkarni',
    'Er. (Mrs.) A. R. Ghode',
    'Er. (Mrs.) M. D. Kokate',
    'Er. N. K. Kharinar',
    'Er. T. R. More',
    'Er. P. R. Chandane',
    'Er. D. R. Rahane',
    'Er. (Mrs.) C. M. Gunjal',
    'Er. (Mrs.) J. R. Gaikwad',
    'Er. C. S. Kadlag',
    'Er. J. B. Sangale',
    'Er. (Mrs.) M. R. Gadhe',
    'Er. A. P. Yadav',
    'Er. A. C. Pemgirikar',
    'Er. M. A. Navale',
    'Er. A. C. Bochare',
    'Er. S. R. Wale',
    'Dr. P. N. Nagre',
    'Dr. K. B. Deshmukh',
    'Dr. A. S. Pande',
    'Dr. Sahoo Subhashchandra',
  ],
  advisoryCommittee: [
    'Dr. Premlal Patel - Director, VNIT Nagpur',
    'Dr. D. G. Regulwar - Retired Professor, NIT Warangal / Chhatrapati Sambhaji Nagar',
    'Dr. Jayakumar K. V. - Outreach Advisor Officer, IIT Dharwad',
    'Dr. S. K. Jain - Professor, IIT Roorkee',
    'Dr. Sunil Thakare - BOS Chairman, SPPU Pune',
    'Dr. S. Y. Kute - Professor, K. K. Wagh College of Engineering, Nashik',
    'Dr. Sanjaykumar Yadav - Professor, SVNIT Surat',
    'Dr. Ramakant Jha - Professor, NIT Patna',
    'Dr. Sameer Bajpayee - Professor, NIT Raipur',
    'Dr. Hanuman D. Chalak - Professor, NIT Kurukshetra',
    'Dr. V. V. Srinivas - Professor, IISc Bangalore',
    'Dr. Upaka Rathnayake - Professor, ATU Sligo',
    'Dr. C. D. Modhera - Professor, SVNIT Surat',
    'Dr. Praveen Nagarajan - Professor, NIT Calicut',
    'Dr. Manikant Verma - Associate Professor, NIT Raipur',
    'Dr. L. Govindraju - Retired Professor, Visvesvaraya College of Engineering, Bangalore',
    'Dr. K. K. Sangle - Professor, VJTI Matunga Mumbai',
    'Dr. Istheyaq Ahmad - Associate Professor, NIT Raipur',
    'Dr. Rajkumar Sahoo - Associate Professor, NIT Raipur',
    'Dr. Meenu Ramdas - Associate Professor, IIT Bhubaneshwar',
    'Dr. Mohammad Achite - Professor, University of Blida, Algeria',
    'Dr. Viniarasi R. - Assistant Professor, IIT Roorkee',
    'Dr. Y. V. Navandar - Assistant Professor, NIT Calicut',
    'Dr. Patil Sunilkumar S. - Professor and Head, Walchand Institute of Technology, Solapur',
    'Dr. Sagar R. Chavan - Associate Professor, IIT Ropar',
    'Dr. Dharamveer Singh - Associate Professor, Symbiosis University',
    'Dr. Chintaman Bari - Scientist, CSIR-CRRI',
  ],
}

export const tracks = [
  {
    title: 'Sustainable and Climate-Resilient Infrastructure Systems',
    description: 'Infrastructure planning, design, and operation strategies focused on sustainability, adaptability, and long-term resilience.',
    icon: ScanLine,
  },
  {
    title: 'Renewable Energy Technologies and Energy Transition Pathways',
    description: 'Applied work on renewable systems, transition planning, and energy pathways for resilient engineering ecosystems.',
    icon: Zap,
  },
  {
    title: 'Smart Grids, Power Systems, and Energy Management',
    description: 'Power-system intelligence, smart-grid control, and efficient energy management approaches for modern infrastructure.',
    icon: Network,
  },
  {
    title: 'Resilient Infrastructure Assessment, Risk, and Reliability Analysis',
    description: 'Risk-informed evaluation, reliability analysis, and resilience assessment of infrastructure systems under multiple stresses.',
    icon: ShieldCheck,
  },
  {
    title: 'Advanced Sustainable Construction Materials and Methods',
    description: 'Construction materials, methods, and processes focused on sustainability, performance, and practical deployment.',
    icon: Blocks,
  },
  {
    title: 'Structural Health Monitoring and Intelligent Sensing Systems',
    description: 'Monitoring systems, sensor networks, and intelligent diagnostics for structural safety and performance.',
    icon: ScanLine,
  },
  {
    title: 'Energy-Efficient Mechanical, Thermal, and Fluid Engineering Systems',
    description: 'Mechanical and fluid engineering approaches centered on efficiency, thermal performance, and sustainable operation.',
    icon: Cpu,
  },
  {
    title: 'Digitalization, Automation, and Data-Driven Engineering Solutions',
    description: 'Automation, digital platforms, and data-driven methods supporting smarter engineering workflows and decisions.',
    icon: ClipboardCheck,
  },
  {
    title: 'Sustainable Manufacturing and Industrial Engineering Systems',
    description: 'Industrial systems, manufacturing efficiency, and sustainable engineering practices for production environments.',
    icon: Factory,
  },
  {
    title: 'Integrated Civil-Electrical-Mechanical Engineering for Smart Cities',
    description: 'Interdisciplinary civil, electrical, and mechanical engineering integration for next-generation smart-city systems.',
    icon: Pickaxe,
  },
]

export const scheduleHighlights = [
  'The detailed technical programme will be published after paper review, speaker confirmation, and final committee approval.',
  'Authors should currently focus on the brochure dates for abstract submission, acceptance, registration, and the conference day.',
  'The conference brochure confirms the event month and venue, while the full session schedule will be announced separately.',
]

export const themesOverview = [
  'The conference focuses on presenting and disseminating high-quality research and applied studies addressing sustainability and resilience in modern engineering systems.',
  'Drawing contributions from Civil, Electrical, and Mechanical Engineering, the event emphasizes integrated approaches for designing, operating, and managing infrastructure and energy systems capable of withstanding environmental, climatic, and technological stresses.',
  'By highlighting interdisciplinary methodologies and real-world applications, SRES-26 aims to bridge theory and practice for researchers, practitioners, policymakers, and graduate students.',
]

export const conferenceSchedule = []

export const scheduleAnnouncement = {
  title: 'Detailed schedule will be announced soon',
  description:
    'The brochure currently confirms the conference date, venue, and submission milestones. Session-wise scheduling will be released after paper review and final committee coordination.',
  checkpoints: [
    'Submission of Abstract: 25th May 2026',
    'Notification of Acceptance: 15th June 2026',
    'Last Date of Registration & Submission of Full-Length Paper: 15th July 2026',
    'Conference Date: 16th September 2026',
  ],
}

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
  domestic: {
    label: 'Domestic',
    badge: 'Indian delegates',
    note: 'Registration fees for Indian delegates are listed as per the brochure. The registration fee does not include publication charges.',
    plans: [
      {
        category: 'UG & PG Students',
        price: 'INR 500',
        accent: 'border-teal-300/70',
        tag: 'Student rate',
        features: ['Participation in conference activities', 'Best suited for undergraduate and postgraduate delegates', 'Registration fee does not include publication charges'],
      },
      {
        category: 'Research Scholars & Academicians',
        price: 'INR 1000',
        accent: 'border-sky-300/70',
        tag: 'Academic rate',
        features: ['Suitable for research scholars and faculty members', 'Supports participation in conference sessions', 'Registration fee does not include publication charges'],
      },
      {
        category: 'Industry / Corporate Professionals',
        price: 'INR 1500',
        accent: 'border-amber-300/70',
        tag: 'Professional rate',
        features: ['Designed for industry and corporate delegates', 'Conference participation and networking access', 'Registration fee does not include publication charges'],
      },
    ],
  },
  international: {
    label: 'International',
    badge: 'Foreign delegates',
    note: 'International participation is currently listed under the foreign delegate category. Registration fee does not include publication charges.',
    plans: [
      {
        category: 'Foreign Delegates',
        price: 'USD 50',
        accent: 'border-teal-300/70',
        tag: 'International',
        features: ['For overseas delegates and collaborators', 'Conference participation access', 'Registration fee does not include publication charges'],
      },
    ],
  },
}

export const registrationProcess = [
  'Choose the appropriate delegate category before starting the registration form.',
  'Complete the payment using NEFT, RTGS, or online transfer with the official beneficiary details.',
  'Provide the UTR / payment reference and upload proof in the registration form for verification.',
  'Wait for verification from the organizing team before final participation or publication-related follow-up.',
]

export const importantDates = [
  { label: 'Submission of Abstract', date: '25th May 2026' },
  { label: 'Notification of Acceptance', date: '15th June 2026' },
  { label: 'Last Date of Registration & Submission of Full-Length Paper', date: '15th July 2026' },
  { label: 'Conference Date', date: '16th September 2026' },
]

export const paymentInfo = {
  bank: 'Union Bank of India',
  accountName: 'Amrutvahini College of Engineering Sangamner',
  accountNumber: '322501010033387',
  ifsc: '',
  branch: '',
  acceptedModes: 'NEFT / RTGS / Online Payment is accepted.',
  qrCodePath: '',
  note:
    'Participants are expected to mention the UTR number and bank name for proper tracking of payment confirmation.',
}

export const submissionGuidelines = [
  'Submission should be prepared in a Word document on A4 paper using Times New Roman, 12-point font, single spacing, and standard margins.',
  'Authors may submit Research Articles, Review Articles, Survey Articles, or Case Studies.',
  'Abstracts should not exceed 350 words, and full-length papers should be limited to 7 pages or a maximum of 7000 words.',
  'References must be listed alphabetically at the end of the manuscript and formatted in APA style.',
  'Authors should check the originality of their work before submission; the organizing committee will also perform plagiarism checks as part of review.',
]

export const submissionProcess = [
  'Prepare the manuscript according to the author guidelines and abstract limit.',
  'Submit the author details and final manuscript through the portal for tracking and status updates.',
  'Keep the generated tracking ID safe to follow acceptance and review progress online.',
  'For submission assistance, authors can contact sres26@avcoe.org or the department coordinators listed on the brochure.',
]

export const footerLinks = [
  { label: 'Conference Themes', href: '/themes-schedule' },
  { label: 'Registration', href: '/registration' },
  { label: 'Submit Paper', href: '/submit-paper' },
  { label: 'Track Paper', href: '/track-paper' },
  { label: 'Admin Login', href: '/admin/login' },
]

export const socialLinks = [
  { label: 'Website', href: 'https://www.avcoe.org' },
  { label: 'Conference Mail', href: 'mailto:sres26@avcoe.org' },
  { label: 'Civil Dept', href: 'mailto:amol.mehetre@avcoe.org' },
]
