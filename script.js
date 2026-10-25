/* =========================================================
   Onboarding Buddy System — script.js
   Vanilla JavaScript, no framework dependencies.
   All data is sample/fictional for prototype purposes.
   ========================================================= */

'use strict';

/* =========================================================
   SECTION 1 — SAMPLE DATA
   ========================================================= */

/** Onboarding checklist tasks */
const CHECKLIST_ITEMS = [
  { id: 'c01', title: 'Attend New Student Orientation',       desc: 'Join the official orientation session at the Main Hall.',       category: 'Orientation', priority: 'high' },
  { id: 'c02', title: 'Collect Your Student ID Card',         desc: 'Visit the Registrar\'s Office with your admission letter.',     category: 'Admin',       priority: 'high' },
  { id: 'c03', title: 'Register for Classes',                 desc: 'Log in to the student portal and enroll in your courses.',      category: 'Academic',    priority: 'high' },
  { id: 'c04', title: 'Set Up University Email',              desc: 'Activate your @mapleridge.edu email account.',                  category: 'Admin',       priority: 'high' },
  { id: 'c05', title: 'Tour the Library',                     desc: 'Get your library card and explore research resources.',         category: 'Academic',    priority: 'medium' },
  { id: 'c06', title: 'Visit the Health & Wellness Center',   desc: 'Register with campus health services and get a health check.',  category: 'Health',      priority: 'medium' },
  { id: 'c07', title: 'Join a Student Club',                  desc: 'Explore clubs at the Student Union Fair and sign up.',          category: 'Social',      priority: 'medium' },
  { id: 'c08', title: 'Meet Your Academic Advisor',           desc: 'Schedule a meeting to plan your first semester.',              category: 'Academic',    priority: 'high' },
  { id: 'c09', title: 'Find Your Buddy Match',                desc: 'Use the Buddy Directory to connect with a senior student.',    category: 'Social',      priority: 'medium' },
  { id: 'c10', title: 'Explore the Campus Map',               desc: 'Familiarise yourself with key buildings and facilities.',      category: 'Orientation', priority: 'low' },
  { id: 'c11', title: 'Set Up Online Banking / Fee Payment',  desc: 'Link your student account for tuition and fee payments.',      category: 'Admin',       priority: 'high' },
  { id: 'c12', title: 'Download the Campus App',              desc: 'Install the MRU mobile app for timetables and news.',          category: 'Orientation', priority: 'low' },
];

/** Colour map for task badges */
const PRIORITY_STYLES = {
  high:   { bg: 'bg-red-100',    text: 'text-red-700'   },
  medium: { bg: 'bg-amber-100',  text: 'text-amber-700' },
  low:    { bg: 'bg-slate-100',  text: 'text-slate-600' },
};

const CATEGORY_COLORS = {
  Orientation: '#dbeafe',
  Admin:       '#fef9c3',
  Academic:    '#dcfce7',
  Health:      '#fce7f3',
  Social:      '#ede9fe',
};

/** Senior buddy profiles */
const BUDDY_PROFILES = [
  {
    id: 'b01', name: 'Aisha Malik',     avatar: '👩🏽‍💼',
    program: 'Computer Science',        year: 3,
    interests: ['Hackathons', 'Machine Learning', 'Chess', 'Hiking'],
    intro: 'Hey! I love helping newcomers navigate the CS department. Reach out for tips on research opportunities and coding clubs.',
    email: 'a.malik@mapleridge.edu',
  },
  {
    id: 'b02', name: 'Carlos Rivera',   avatar: '👨🏻‍🎓',
    program: 'Business Administration', year: 4,
    interests: ['Entrepreneurship', 'Football', 'Finance', 'Photography'],
    intro: 'Excited to share everything I know about business school, internships, and building a strong professional network.',
    email: 'c.rivera@mapleridge.edu',
  },
  {
    id: 'b03', name: 'Priya Sharma',    avatar: '👩🏽‍🔬',
    program: 'Biology',                 year: 2,
    interests: ['Research', 'Yoga', 'Cooking', 'Environment'],
    intro: 'Lab life can be intense — I can help you settle into science programs and find great study spots.',
    email: 'p.sharma@mapleridge.edu',
  },
  {
    id: 'b04', name: 'James Okonkwo',   avatar: '👨🏿‍🎨',
    program: 'Fine Arts',               year: 3,
    interests: ['Painting', 'Photography', 'Jazz', 'Film'],
    intro: 'Arts student here! I can show you the best studios, galleries, and creative communities on campus.',
    email: 'j.okonkwo@mapleridge.edu',
  },
  {
    id: 'b05', name: 'Sophie Nguyen',   avatar: '👩🏻‍⚕️',
    program: 'Nursing',                 year: 4,
    interests: ['Volunteering', 'Running', 'Mental Health', 'Cooking'],
    intro: 'Nursing is demanding but rewarding. I\'m here to support healthcare students with study strategies and wellbeing.',
    email: 's.nguyen@mapleridge.edu',
  },
  {
    id: 'b06', name: 'Luca Bianchi',    avatar: '👨🏼‍💻',
    program: 'Computer Science',        year: 2,
    interests: ['Open Source', 'Gaming', 'Music Production', 'Chess'],
    intro: 'First-gen student who figured it all out by asking questions. Happy to be your go-to person for CS queries!',
    email: 'l.bianchi@mapleridge.edu',
  },
  {
    id: 'b07', name: 'Fatima Al-Hassan', avatar: '👩🏾‍⚖️',
    program: 'Law',                     year: 3,
    interests: ['Debate', 'Human Rights', 'Reading', 'Tennis'],
    intro: 'Law school is a different world. I can guide you through moot courts, study groups, and internship applications.',
    email: 'f.alhassan@mapleridge.edu',
  },
  {
    id: 'b08', name: 'Ethan Chow',      avatar: '👨🏻‍🏫',
    program: 'Education',              year: 4,
    interests: ['Teaching', 'Basketball', 'Hiking', 'Volunteering'],
    intro: 'Future teacher who loves community building. Ask me about practicum placements and student organisations.',
    email: 'e.chow@mapleridge.edu',
  },
];

/** Campus facilities */
const CAMPUS_FACILITIES = [
  { id: 'f01', name: 'Main Library',              emoji: '📚', category: 'Academic', location: 'Central Campus, Block A',  desc: 'Four floors of study spaces, digital resources, 24/7 access rooms, and research support staff.' },
  { id: 'f02', name: 'Student Union Building',    emoji: '🏛️', category: 'Social',   location: 'Central Campus, Block B',  desc: 'Hub for student clubs, the SU café, event hall, printing, and ATM machines.' },
  { id: 'f03', name: 'Health & Wellness Center',  emoji: '🏥', category: 'Health',   location: 'North Campus, Block C',    desc: 'General practitioners, mental health counsellors, physiotherapy, and vaccination services.' },
  { id: 'f04', name: 'Sports Complex',            emoji: '🏊', category: 'Sport',    location: 'East Campus, Block D',     desc: 'Olympic-size pool, gym, basketball courts, squash courts, and a running track.' },
  { id: 'f05', name: 'Engineering Labs',          emoji: '🔬', category: 'Academic', location: 'West Campus, Block E',     desc: 'Fully equipped labs for electronics, materials science, software development, and robotics.' },
  { id: 'f06', name: 'Arts & Performance Center', emoji: '🎭', category: 'Culture',  location: 'South Campus, Block F',    desc: 'Concert hall, rehearsal rooms, fine arts studios, gallery space, and pottery workshops.' },
  { id: 'f07', name: 'International Students Office', emoji: '🌍', category: 'Support', location: 'Admin Building, Ground Floor', desc: 'Visa advice, cultural adjustment support, international buddy programme, and social events.' },
  { id: 'f08', name: 'Career Development Center', emoji: '💼', category: 'Support',  location: 'Admin Building, 2nd Floor', desc: 'Resume workshops, mock interviews, job boards, internship listings, and employer networking.' },
  { id: 'f09', name: 'Campus Cafeteria & Food Court', emoji: '🍽️', category: 'Food', location: 'Central Campus, Ground Level', desc: 'Multicultural food stalls, vegetarian and halal options, meal-plan redemption, and outdoor seating.' },
  { id: 'f10', name: 'Registrar\'s Office',       emoji: '🗂️', category: 'Admin',    location: 'Admin Building, 1st Floor', desc: 'Course registration, transcript requests, examination schedules, and fee payments.' },
  { id: 'f11', name: 'Accommodation Office',      emoji: '🏠', category: 'Support',  location: 'Admin Building, Ground Floor', desc: 'On-campus housing applications, off-campus listings, and tenancy advice.' },
  { id: 'f12', name: 'IT Help Desk',              emoji: '💻', category: 'Support',  location: 'Library, Ground Floor',    desc: 'Student email setup, Wi-Fi troubleshooting, software licenses, and device loans.' },
];

/**
 * FAQ knowledge base — 30 entries covering key university onboarding topics.
 * Each entry has a keywords array (used for scoring) and a plain-text answer.
 * This is sample data for a prototype; it does not represent real university policy.
 */
const FAQ_KB = [
  // ----- Registration & Enrolment -----
  {
    keywords: ['register', 'enroll', 'enrollment', 'enrolment', 'sign up', 'classes', 'courses', 'subjects', 'subject'],
    answer: 'To register for classes, log in to the student portal at portal.mapleridge.edu. Course registration opens two weeks before each semester starts. If you need help choosing subjects, make an appointment with your Academic Advisor first. Contact the Registrar\'s Office (Admin Building, 1st Floor) for registration issues.',
  },
  // ----- Student ID -----
  {
    keywords: ['student id', 'id card', 'identification', 'collect id', 'get id', 'student card'],
    answer: 'Collect your student ID card from the Registrar\'s Office (Admin Building, 1st Floor). Bring your official admission letter and a valid government-issued photo ID. Processing takes approximately 15 minutes and the card is issued on the spot.',
  },
  // ----- University Email -----
  {
    keywords: ['email', 'email account', 'university email', 'mapleridge email', 'activate email', 'set up email'],
    answer: 'Activate your @mapleridge.edu email at accounts.mapleridge.edu. Use your student number as the initial password, then change it immediately. Your university email is required to access the student portal, library databases, and official communications. Visit the IT Help Desk (Library, Ground Floor) if you have activation issues.',
  },
  // ----- Library -----
  {
    keywords: ['library', 'books', 'research', 'study space', 'borrow', 'library card', 'databases', 'journal'],
    answer: 'The Main Library (Central Campus, Block A) is open 24 hours a day, 7 days a week. Use your student ID as your library card. You can borrow up to 10 books at a time for 3 weeks. Silent study rooms are on the 3rd and 4th floors, and group study rooms can be booked online at library.mapleridge.edu.',
  },
  // ----- Health & Wellness -----
  {
    keywords: ['health', 'doctor', 'medical', 'counselling', 'counseling', 'mental health', 'wellness', 'sick', 'gp', 'physiotherapy'],
    answer: 'The Health & Wellness Center (North Campus, Block C) offers general practitioner services, mental health counselling, and physiotherapy. Book appointments online at health.mapleridge.edu or call ext. 4200. Walk-in slots are available Monday–Friday, 8 AM – 10 AM. All services are free for enrolled students.',
  },
  // ----- Orientation -----
  {
    keywords: ['orientation', 'welcome week', 'orientation week', 'first week', 'induction', 'welcome day'],
    answer: 'Orientation Week runs during the first full week of each semester. It includes a campus tour, faculty meet-and-greets, a student club fair, IT account setup sessions, and a welcome concert. Attendance is strongly recommended. Check the Events tab in this app for the full schedule and times.',
  },
  // ----- Student Clubs & Societies -----
  {
    keywords: ['club', 'society', 'association', 'student organisation', 'student organization', 'student union', 'extracurricular', 'activities'],
    answer: 'Maple Ridge University has over 80 registered student clubs covering sports, arts, culture, technology, volunteering, and more. Visit the Student Union Building (Central Campus, Block B) during the Club Fair in Welcome Week, or browse all clubs at union.mapleridge.edu. Joining a club is one of the best ways to meet people and settle in.',
  },
  // ----- Buddy Programme -----
  {
    keywords: ['buddy', 'mentor', 'senior student', 'peer mentor', 'buddy programme', 'buddy program', 'match', 'find buddy'],
    answer: 'The Buddy Programme pairs new students with experienced senior students from the same or a related study programme. Use the Buddy Directory tab in this app to browse senior profiles and find your best match based on your programme and interests. Your buddy can answer informal questions, show you around campus, and introduce you to the community.',
  },
  // ----- Scholarships & Financial Aid -----
  {
    keywords: ['scholarship', 'financial aid', 'bursary', 'grant', 'fee', 'tuition', 'payment', 'money', 'fund', 'finance'],
    answer: 'Information about scholarships, bursaries, and financial aid is available through the Student Finance Office (Admin Building, Ground Floor) and at finance.mapleridge.edu. Eligibility criteria and deadlines vary by award. This app does not hold live financial data — always check the official university website for current amounts and closing dates.',
  },
  // ----- Accommodation -----
  {
    keywords: ['accommodation', 'housing', 'dorm', 'dormitory', 'residence', 'on campus', 'off campus', 'room', 'hostel'],
    answer: 'Apply for on-campus accommodation through the Accommodation Office (Admin Building, Ground Floor) or at housing.mapleridge.edu. On-campus rooms are allocated on a first-come, first-served basis. Off-campus rental listings and flatmate boards are also available through the Accommodation Office. Apply early — rooms fill quickly.',
  },
  // ----- Timetable & Schedule -----
  {
    keywords: ['timetable', 'schedule', 'lecture', 'class time', 'room', 'class location', 'when', 'where is my class'],
    answer: 'Your personalised timetable is available in the student portal at portal.mapleridge.edu after you have completed course registration. Any room changes or lecture cancellations are posted there and sent to your university email. The campus app also shows your daily schedule.',
  },
  // ----- Wi-Fi & Internet -----
  {
    keywords: ['wifi', 'wi-fi', 'internet', 'network', 'eduroam', 'connect', 'connection', 'online'],
    answer: 'Connect to campus Wi-Fi using the MRU-Secure or eduroam networks. Log in with your full university email address and password. eduroam also works at other universities worldwide. For setup help or connection problems, visit the IT Help Desk (Library, Ground Floor) or call ext. 5100.',
  },
  // ----- Sports & Fitness -----
  {
    keywords: ['gym', 'sports', 'swimming', 'fitness', 'exercise', 'pool', 'basketball', 'squash', 'running', 'track', 'sport complex'],
    answer: 'The Sports Complex (East Campus, Block D) includes an Olympic-size pool, a full gym, basketball and squash courts, and an outdoor running track. Access is free with your student ID — no separate membership fee. Facilities can be booked in advance at sports.mapleridge.edu. The complex is open 6 AM – 10 PM daily.',
  },
  // ----- Transport & Parking -----
  {
    keywords: ['bus', 'transport', 'parking', 'shuttle', 'how to get', 'getting here', 'directions', 'public transport', 'route'],
    answer: 'A free campus shuttle runs between the main campus gates and the central bus terminal every 30 minutes on weekdays. Public bus routes 12 and 17 stop at the campus main entrance. Parking permits for on-campus parking are available from the Security Office at Gate 1. Cycling racks are available near all major buildings.',
  },
  // ----- Exams & Grades -----
  {
    keywords: ['exam', 'examination', 'assessment', 'grades', 'gpa', 'transcript', 'results', 'marks', 'score', 'grading'],
    answer: 'Exam schedules are published on the student portal approximately four weeks before the exam period begins. Transcript requests can be made at the Registrar\'s Office or online. Grade disputes must be submitted in writing to your faculty within 10 business days of result release. GPA is calculated using the university grading policy available at registrar.mapleridge.edu.',
  },
  // ----- Career & Internships -----
  {
    keywords: ['career', 'internship', 'job', 'cv', 'resume', 'interview', 'employment', 'work', 'placement', 'graduate'],
    answer: 'The Career Development Center (Admin Building, 2nd Floor) offers one-on-one CV reviews, mock interviews, career workshops, and access to the MRU Job Board. Visit careers.mapleridge.edu for upcoming employer networking events, internship listings, and graduate programme opportunities. Appointments can be booked online.',
  },
  // ----- Food & Dining -----
  {
    keywords: ['food', 'canteen', 'cafeteria', 'meal plan', 'halal', 'vegetarian', 'vegan', 'eat', 'dining', 'lunch', 'breakfast', 'dinner'],
    answer: 'The Campus Cafeteria (Central Campus, Ground Level) serves breakfast, lunch, and dinner. Options include multicultural cuisine, halal-certified meals, vegetarian, and vegan choices. Meal plans can be loaded at the Student Finance Office or the cafeteria cashier. Outdoor seating is available in the Central Courtyard.',
  },
  // ----- Password & IT Account -----
  {
    keywords: ['password', 'reset password', 'locked out', 'account', 'login', 'log in', 'access', 'it help', 'helpdesk'],
    answer: 'To reset your university account password, visit accounts.mapleridge.edu/reset or go to the IT Help Desk (Library, Ground Floor, ext. 5100). The IT Help Desk is open Monday–Friday, 8 AM – 8 PM, and Saturday, 9 AM – 5 PM. They can also help with device setup, software licences, and VPN access.',
  },
  // ----- International Students -----
  {
    keywords: ['international', 'visa', 'immigration', 'foreign student', 'study permit', 'overseas'],
    answer: 'The International Students Office (Admin Building, Ground Floor) supports students from overseas with visa guidance, immigration advice, cultural adjustment support, and an international buddy programme. They also run regular cultural exchange events. Reach them at international@mapleridge.edu or ext. 3300.',
  },
  // ----- Printing -----
  {
    keywords: ['printing', 'print', 'photocopy', 'scan', 'printer', 'copy'],
    answer: 'Print and photocopy stations are available in the Student Union Building (Level 1) and on every floor of the Main Library. Load printing credits onto your student ID at any credit top-up terminal around campus. Black-and-white printing costs $0.10 per page and colour costs $0.40 per page (sample pricing).',
  },
  // ----- Academic Preparation -----
  {
    keywords: ['academic', 'prepare', 'preparation', 'study', 'tips', 'how to study', 'first year', 'advice', 'succeed'],
    answer: 'To prepare for your first semester: (1) Meet your Academic Advisor early to plan your course load. (2) Attend all orientation sessions — they explain assessment formats and expectations. (3) Visit the library to set up database access before lectures begin. (4) Form a study group with classmates in the first week. (5) Use the Learning Support Center (Student Union Building, Level 2) for free tutoring.',
  },
  // ----- Tutoring & Learning Support -----
  {
    keywords: ['tutor', 'tutoring', 'learning support', 'academic support', 'help with study', 'writing', 'maths', 'math', 'english', 'writing centre'],
    answer: 'The Learning Support Center (Student Union Building, Level 2) offers free peer tutoring in mathematics, academic writing, languages, and sciences. Book a session at learning.mapleridge.edu. The Writing Centre specialises in essay structure, referencing, and academic English. All sessions are available in-person and online.',
  },
  // ----- Research Opportunities -----
  {
    keywords: ['research', 'research opportunity', 'lab assistant', 'undergraduate research', 'professor', 'project'],
    answer: 'Undergraduate research opportunities are available across all faculties. Check the Research Office noticeboard (Admin Building, 3rd Floor) or the student portal\'s Research Board for current openings. You can also contact faculty members directly by email to express interest in joining a research project. Many research roles are paid or offer course credit.',
  },
  // ----- Mental Health & Stress -----
  {
    keywords: ['stress', 'anxiety', 'depressed', 'struggling', 'overwhelmed', 'mental', 'wellbeing', 'support', 'crisis'],
    answer: 'If you are feeling stressed, anxious, or overwhelmed, you are not alone — transitioning to university is a significant life change. The Health & Wellness Center (North Campus, Block C) offers free, confidential counselling sessions. You can book at health.mapleridge.edu or walk in. For urgent mental health support, call the MRU Student Support Line: ext. 4999 (available 24/7).',
  },
  // ----- Campus Safety -----
  {
    keywords: ['safety', 'security', 'safe', 'emergency', 'lost', 'theft', 'incident', 'campus security'],
    answer: 'Campus security operates 24/7. In an emergency, call ext. 0000 from any campus phone or dial the security mobile line at +1-555-SAFE (7233). Security offices are located at Gate 1 and Gate 3. Campus is covered by CCTV and emergency call stations are installed at key locations. Report a non-urgent incident at security.mapleridge.edu.',
  },
  // ----- Student Rights & Complaints -----
  {
    keywords: ['rights', 'complaint', 'grievance', 'unfair', 'discrimination', 'appeal', 'dispute', 'student rights'],
    answer: 'Students\' rights are protected under the MRU Student Charter. If you experience discrimination, unfair treatment, or have a grievance, contact the Student Advocacy Office (Student Union Building, Level 1) or email advocacy@mapleridge.edu. They provide free, confidential advice and can represent you in formal processes. Academic grade appeals are handled by the Registrar\'s Office.',
  },
  // ----- Campus Events & Social Life -----
  {
    keywords: ['events', 'social', 'party', 'concert', 'festival', 'community', 'meetup', 'social life', 'fun'],
    answer: 'Campus events are listed in the Events tab of this app and at events.mapleridge.edu. The Student Union organises weekly social events, themed nights, cultural festivals, and sporting competitions throughout the year. Follow @MRUStudentUnion on social media for last-minute updates and free-ticket giveaways.',
  },
  // ----- Academic Advisor -----
  {
    keywords: ['academic advisor', 'advisor', 'adviser', 'counselor', 'guidance', 'course plan', 'degree plan'],
    answer: 'Every student is assigned a dedicated Academic Advisor based on their study programme. Your advisor\'s contact details are in the student portal under "My Advisor". Schedule your first meeting during Orientation Week to map out your semester and discuss prerequisites. Advisors can also help if you are considering a programme change or need to defer a subject.',
  },
  // ----- Graduation & Degree Requirements -----
  {
    keywords: ['graduate', 'graduation', 'degree', 'requirements', 'credit', 'credit hours', 'units', 'complete degree'],
    answer: 'Degree requirements — including total credit hours, core subjects, and electives — are published in the Academic Handbook on the student portal. Check your degree progress regularly in the portal\'s "My Degree Audit" section. To be eligible for graduation, submit a graduation application through the Registrar\'s Office at least one semester before your expected completion date.',
  },
  // ----- Disability & Accessibility Services -----
  {
    keywords: ['disability', 'accessibility', 'accessible', 'special needs', 'accommodation plan', 'learning disability', 'impairment'],
    answer: 'The Disability & Accessibility Services Office (Admin Building, Ground Floor) supports students with physical, sensory, and learning disabilities. They can arrange exam accommodations, note-taking support, assistive technology, and accessible housing. Contact access@mapleridge.edu as early as possible — ideally before your first semester starts.',
  },
  // ----- Campus App & Technology -----
  {
    keywords: ['campus app', 'mobile app', 'app', 'download app', 'mru app', 'phone', 'notification'],
    answer: 'The MRU Campus App is available free on iOS and Android. It shows your personalised timetable, library bookings, campus maps, event listings, and real-time shuttle tracking. Download it by searching "Maple Ridge University" in the App Store or Google Play, then log in with your university email and password.',
  },
];

/** Suggested questions displayed as quick-start pills in the AI Assistant */
const SUGGESTED_QUESTIONS = [
  'How do I register for classes?',
  'Where can I collect my student ID?',
  'How do I activate my university email?',
  'Where is the Health & Wellness Center?',
  'Are there sports facilities on campus?',
  'How do I find a buddy mentor?',
  'What support is available for mental health?',
  'How do I prepare for my first semester?',
  'Where can I get tutoring help?',
  'What clubs and societies can I join?',
];

/** Announcements & events feed */
const ANNOUNCEMENTS = [
  {
    id: 'e01', type: 'event', day: '05', month: 'Aug',
    title: 'Welcome Week Kick-off Ceremony',
    body: 'Join us at the Main Auditorium for the official start of Welcome Week. All new students are encouraged to attend.',
    badge: 'Event', badgeColor: 'bg-blue-100 text-blue-700',
  },
  {
    id: 'e02', type: 'event', day: '06', month: 'Aug',
    title: 'Campus-Wide Guided Tour',
    body: 'Meet your tour guide at the Central Campus Fountain at 10:00 AM. Tours run every hour until 3:00 PM.',
    badge: 'Event', badgeColor: 'bg-blue-100 text-blue-700',
  },
  {
    id: 'e03', type: 'announcement', day: '07', month: 'Aug',
    title: 'Student ID Collection Opens',
    body: 'The Registrar\'s Office begins issuing student ID cards from 8:00 AM. Bring your admission letter and a valid photo ID.',
    badge: 'Announcement', badgeColor: 'bg-purple-100 text-purple-700',
  },
  {
    id: 'e04', type: 'event', day: '08', month: 'Aug',
    title: 'Club & Society Fair',
    body: 'Explore over 80 student clubs and organisations at the Student Union Building. Free refreshments provided.',
    badge: 'Event', badgeColor: 'bg-blue-100 text-blue-700',
  },
  {
    id: 'e05', type: 'deadline', day: '12', month: 'Aug',
    title: 'Class Registration Deadline',
    body: 'Ensure you have registered for all your courses on the student portal before this date to avoid a late enrolment fee.',
    badge: 'Deadline', badgeColor: 'bg-red-100 text-red-700',
  },
  {
    id: 'e06', type: 'announcement', day: '09', month: 'Aug',
    title: 'IT Help Desk Extended Hours',
    body: 'During Welcome Week the IT Help Desk operates from 7:00 AM – 10:00 PM to assist with account setup and Wi-Fi issues.',
    badge: 'Announcement', badgeColor: 'bg-purple-100 text-purple-700',
  },
  {
    id: 'e07', type: 'event', day: '10', month: 'Aug',
    title: 'Buddy Match-Up Social',
    body: 'Newly matched students and their buddies are invited to a casual social at the Student Union Courtyard, 5:00 PM.',
    badge: 'Event', badgeColor: 'bg-blue-100 text-blue-700',
  },
  {
    id: 'e08', type: 'deadline', day: '15', month: 'Aug',
    title: 'Accommodation Application Deadline',
    body: 'If you haven\'t already applied for on-campus housing, submit your application by this date via housing.mapleridge.edu.',
    badge: 'Deadline', badgeColor: 'bg-red-100 text-red-700',
  },
  {
    id: 'e09', type: 'announcement', day: '11', month: 'Aug',
    title: 'Mental Health Workshop: "Starting Strong"',
    body: 'A free workshop for new students on managing transition stress and building resilience. Health & Wellness Center, 2:00 PM.',
    badge: 'Announcement', badgeColor: 'bg-purple-100 text-purple-700',
  },
  {
    id: 'e10', type: 'event', day: '13', month: 'Aug',
    title: 'Evening Welcome Concert',
    body: 'Wind down Welcome Week with live music from student bands at the Arts & Performance Center. Free entry with student ID.',
    badge: 'Event', badgeColor: 'bg-blue-100 text-blue-700',
  },
];

/* =========================================================
   SECTION 2 — STATE & LOCALSTORAGE
   ========================================================= */

const LS_KEY = 'obs_state_v1';

/** Default application state */
function defaultState() {
  return {
    completedTasks: [],        // array of task id strings
    activeView:     'dashboard',
    checklistTab:   'All',
    eventFilter:    'all',
    isDarkMode:     false,     // persisted dark-mode preference
  };
}

/** Load state from localStorage, merge with defaults */
function loadState() {
  try {
    const stored = localStorage.getItem(LS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return Object.assign(defaultState(), parsed);
    }
  } catch (e) {
    console.warn('Could not load saved state:', e);
  }
  return defaultState();
}

/** Persist current state to localStorage */
function saveState() {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Could not save state:', e);
  }
}

let state = loadState();

/* =========================================================
   SECTION 2b — DARK MODE
   ========================================================= */

/**
 * Apply or remove the "dark" class on <html> and update the toggle button
 * icon + aria-pressed to match the current state.
 */
function applyDarkMode(isDark) {
  document.documentElement.classList.toggle('dark', isDark);
  const btn      = document.getElementById('darkToggle');
  const iconSun  = document.getElementById('iconSun');
  const iconMoon = document.getElementById('iconMoon');
  if (btn)      btn.setAttribute('aria-pressed', String(isDark));
  if (iconSun)  iconSun.classList.toggle('hidden',  !isDark);
  if (iconMoon) iconMoon.classList.toggle('hidden',  isDark);
}

/** Toggle dark mode, persist the preference, and re-apply styles. */
function toggleDarkMode() {
  state.isDarkMode = !state.isDarkMode;
  applyDarkMode(state.isDarkMode);
  saveState();
}

/* =========================================================
   SECTION 3 — UTILITY HELPERS
   ========================================================= */

/** Escape HTML to prevent XSS when inserting user input into innerHTML */
function escHtml(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

/** Format a time string like "14:23" */
function nowTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/** Compute progress percentage */
function calcProgress() {
  return CHECKLIST_ITEMS.length === 0 ? 0
    : Math.round((state.completedTasks.length / CHECKLIST_ITEMS.length) * 100);
}

/** Update the SVG progress ring */
function updateRing(elementId, pct) {
  const circle = document.getElementById(elementId);
  if (!circle) return;
  const circumference = 213.63; // 2π × 34
  const offset = circumference - (pct / 100) * circumference;
  circle.style.strokeDashoffset = offset;
}

/** Derive a friendly progress label */
function progressLabel(pct) {
  if (pct === 0)   return 'Getting started…';
  if (pct < 25)    return 'Early days!';
  if (pct < 50)    return 'Making progress';
  if (pct < 75)    return 'Halfway there!';
  if (pct < 100)   return 'Almost done!';
  return '🎉 All done!';
}

/* =========================================================
   SECTION 4 — NAVIGATION
   ========================================================= */

function switchView(viewId) {
  // Hide all views
  document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
  // Show target view
  const target = document.getElementById('view-' + viewId);
  if (target) target.classList.remove('hidden');

  // Update desktop nav active state
  document.querySelectorAll('.nav-btn').forEach(btn => {
    const isActive = btn.dataset.view === viewId;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-current', isActive ? 'page' : 'false');
  });

  // Update mobile nav active state
  document.querySelectorAll('.nav-btn-mobile').forEach(btn => {
    const isActive = btn.dataset.view === viewId;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-current', isActive ? 'page' : 'false');
  });

  // Close mobile menu
  document.getElementById('mobileMenu').classList.add('hidden');
  document.getElementById('menuToggle').setAttribute('aria-expanded', 'false');

  state.activeView = viewId;
  saveState();

  // Scroll to top of page when switching views
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Re-render relevant views
  if (viewId === 'dashboard')  renderDashboard();
  if (viewId === 'checklist')  renderChecklist();
  if (viewId === 'buddies')    renderBuddies();
  if (viewId === 'campus')     renderCampus();
  if (viewId === 'assistant')  renderAssistant();
  if (viewId === 'events')     renderEvents();
}

/* =========================================================
   SECTION 5 — DASHBOARD RENDER
   ========================================================= */

function renderDashboard() {
  const pct = calcProgress();

  // Progress ring and label
  updateRing('dashboardRingFill', pct);
  const pctEl = document.getElementById('dashboardProgressPct');
  if (pctEl) pctEl.textContent = pct + '%';
  const labelEl = document.getElementById('dashboardProgressLabel');
  if (labelEl) labelEl.textContent = progressLabel(pct);

  // Stat cards
  document.getElementById('statTasksDone').textContent    = state.completedTasks.length;
  document.getElementById('statTasksTotal').textContent   = CHECKLIST_ITEMS.length;
  document.getElementById('statBuddyCount').textContent   = BUDDY_PROFILES.length;
  document.getElementById('statFacilityCount').textContent = CAMPUS_FACILITIES.length;

  // Upcoming activities — show the next 3 events
  const container = document.getElementById('upcomingActivities');
  const upcoming = ANNOUNCEMENTS.filter(a => a.type === 'event').slice(0, 3);
  container.innerHTML = upcoming.map(ev => `
    <div class="activity-card">
      <p class="activity-date">${ev.month} ${ev.day}</p>
      <p class="activity-title">${escHtml(ev.title)}</p>
      <p class="activity-location">${escHtml(ev.body.slice(0, 80))}…</p>
    </div>
  `).join('');
}

/* =========================================================
   SECTION 6 — CHECKLIST RENDER
   ========================================================= */

function renderChecklist(filterCat) {
  if (filterCat !== undefined) {
    state.checklistTab = filterCat;
    saveState();
  }
  const activeTab = state.checklistTab || 'All';

  const pct = calcProgress();

  // Update progress bar
  const fill = document.getElementById('checklistProgressFill');
  const pctLabel = document.getElementById('checklistProgressPct');
  const bar = document.getElementById('checklistProgressBar');
  if (fill) fill.style.width = pct + '%';
  if (pctLabel) pctLabel.textContent = pct + '%';
  if (bar) bar.setAttribute('aria-valuenow', pct);

  // Build category tab list
  const categories = ['All', ...new Set(CHECKLIST_ITEMS.map(i => i.category))];
  const tabsEl = document.getElementById('checklistTabs');
  tabsEl.innerHTML = categories.map(cat => `
    <button class="cat-tab${cat === activeTab ? ' active' : ''}"
            data-cat="${escHtml(cat)}"
            role="tab"
            aria-selected="${cat === activeTab}"
            aria-label="Show ${cat} tasks">
      ${escHtml(cat)}
    </button>
  `).join('');

  // Filtered items
  const items = activeTab === 'All'
    ? CHECKLIST_ITEMS
    : CHECKLIST_ITEMS.filter(i => i.category === activeTab);

  const listEl = document.getElementById('checklistItems');
  listEl.innerHTML = items.map(item => {
    const done = state.completedTasks.includes(item.id);
    const ps = PRIORITY_STYLES[item.priority] || PRIORITY_STYLES.low;
    return `
      <div class="checklist-item${done ? ' done' : ''}" data-id="${item.id}">
        <input type="checkbox" class="task-checkbox" id="task-${item.id}"
               ${done ? 'checked' : ''}
               aria-label="${escHtml(item.title)}" />
        <label for="task-${item.id}" class="flex-1 cursor-pointer">
          <p class="task-title">${escHtml(item.title)}</p>
          <p class="task-desc">${escHtml(item.desc)}</p>
        </label>
        <span class="task-badge ${ps.bg} ${ps.text}">${item.priority}</span>
      </div>
    `;
  }).join('');
}

/* =========================================================
   SECTION 7 — BUDDY DIRECTORY RENDER
   ========================================================= */

/** Collect unique programs and interests from buddy data */
const ALL_PROGRAMS   = [...new Set(BUDDY_PROFILES.map(b => b.program))].sort();
const ALL_INTERESTS  = [...new Set(BUDDY_PROFILES.flatMap(b => b.interests))].sort();

function populateBuddyFilters() {
  // Matcher dropdowns
  const progSel = document.getElementById('matchProgram');
  ALL_PROGRAMS.forEach(p => {
    const o = document.createElement('option');
    o.value = p; o.textContent = p;
    progSel.appendChild(o);
  });

  [document.getElementById('matchInterest1'), document.getElementById('matchInterest2')].forEach(sel => {
    ALL_INTERESTS.forEach(i => {
      const o = document.createElement('option');
      o.value = i; o.textContent = i;
      sel.appendChild(o);
    });
  });

  // Directory filter
  const filterSel = document.getElementById('buddyFilterProgram');
  ALL_PROGRAMS.forEach(p => {
    const o = document.createElement('option');
    o.value = p; o.textContent = p;
    filterSel.appendChild(o);
  });
}

function renderBuddies(matchedIds) {
  const filterProgram = document.getElementById('buddyFilterProgram').value;
  const searchQuery   = document.getElementById('buddySearch').value.trim().toLowerCase();

  let buddies = BUDDY_PROFILES;

  if (filterProgram) buddies = buddies.filter(b => b.program === filterProgram);
  if (searchQuery)   buddies = buddies.filter(b =>
    b.name.toLowerCase().includes(searchQuery) ||
    b.interests.some(i => i.toLowerCase().includes(searchQuery))
  );

  const grid = document.getElementById('buddyGrid');
  if (buddies.length === 0) {
    grid.innerHTML = '<p class="col-span-full text-center text-muted py-12">No buddies match your filters.</p>';
    return;
  }

  grid.innerHTML = buddies.map(b => {
    const isMatch = matchedIds && matchedIds.includes(b.id);
    return `
      <div class="buddy-card${isMatch ? ' buddy-card-match' : ''}"
           role="button" tabindex="0"
           data-buddy="${b.id}"
           aria-label="View profile of ${escHtml(b.name)}">
        <div class="p-5">
          <div class="flex items-center gap-3 mb-3">
            <div class="buddy-avatar bg-blue-50">${b.avatar}</div>
            <div>
              <p class="font-semibold text-slate-800 text-sm">${escHtml(b.name)}</p>
              <p class="text-xs text-muted">${escHtml(b.program)} · Year ${b.year}</p>
              ${isMatch ? '<span class="text-xs font-semibold text-accent">✓ Best Match</span>' : ''}
            </div>
          </div>
          <p class="text-xs text-slate-600 line-clamp-3">${escHtml(b.intro)}</p>
          <div class="mt-3 flex flex-wrap gap-1">
            ${b.interests.slice(0,3).map(i =>
              `<span class="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">${escHtml(i)}</span>`
            ).join('')}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function findBuddyMatches() {
  const program   = document.getElementById('matchProgram').value;
  const interest1 = document.getElementById('matchInterest1').value;
  const interest2 = document.getElementById('matchInterest2').value;

  if (!program && !interest1 && !interest2) {
    document.getElementById('matchResult').textContent = 'Please select at least one criterion.';
    return;
  }

  const scored = BUDDY_PROFILES.map(b => {
    let score = 0;
    if (program && b.program === program) score += 3;
    if (interest1 && b.interests.includes(interest1)) score += 2;
    if (interest2 && b.interests.includes(interest2)) score += 2;
    return { buddy: b, score };
  }).filter(x => x.score > 0).sort((a, b) => b.score - a.score);

  const matchedIds = scored.map(x => x.buddy.id);
  const resultEl = document.getElementById('matchResult');

  if (matchedIds.length === 0) {
    resultEl.textContent = 'No exact matches found — try different criteria.';
    renderBuddies(null);
  } else {
    resultEl.textContent = `Found ${matchedIds.length} match${matchedIds.length > 1 ? 'es' : ''}! Best matches are highlighted.`;
    // Clear directory filter so all results show
    document.getElementById('buddyFilterProgram').value = '';
    document.getElementById('buddySearch').value = '';
    renderBuddies(matchedIds);
    // Scroll down to the grid
    document.getElementById('buddyGrid').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function openBuddyModal(buddyId) {
  const b = BUDDY_PROFILES.find(x => x.id === buddyId);
  if (!b) return;

  document.getElementById('buddyModalContent').innerHTML = `
    <div class="flex items-center gap-4 mb-5">
      <div class="buddy-avatar bg-blue-50" style="width:4.5rem;height:4.5rem;font-size:2rem;">${b.avatar}</div>
      <div>
        <h2 id="buddyModalName" class="text-xl font-bold text-primary">${escHtml(b.name)}</h2>
        <p class="text-sm text-muted">${escHtml(b.program)} · Year ${b.year}</p>
      </div>
    </div>
    <p class="text-sm text-slate-700 leading-relaxed mb-5">${escHtml(b.intro)}</p>
    <div class="mb-5">
      <p class="text-xs font-semibold text-muted uppercase tracking-wide mb-2">Interests</p>
      <div class="flex flex-wrap gap-2">
        ${b.interests.map(i =>
          `<span class="text-xs bg-teal-50 text-teal-700 border border-teal-200 px-2.5 py-1 rounded-full font-medium">${escHtml(i)}</span>`
        ).join('')}
      </div>
    </div>
    <a href="mailto:${escHtml(b.email)}"
       class="btn-primary inline-block text-center w-full mt-2 text-sm">
      ✉️ Contact ${escHtml(b.name.split(' ')[0])}
    </a>
    <p class="text-xs text-muted text-center mt-2">${escHtml(b.email)}</p>
  `;

  const modal = document.getElementById('buddyModal');
  modal.classList.remove('hidden');
  document.getElementById('buddyModalClose').focus();
}

/* =========================================================
   SECTION 8 — CAMPUS GUIDE RENDER
   ========================================================= */

function populateCampusFilter() {
  const categories = [...new Set(CAMPUS_FACILITIES.map(f => f.category))].sort();
  const sel = document.getElementById('campusFilter');
  categories.forEach(cat => {
    const o = document.createElement('option');
    o.value = cat; o.textContent = cat;
    sel.appendChild(o);
  });
}

function renderCampus() {
  const q   = document.getElementById('campusSearch').value.trim().toLowerCase();
  const cat = document.getElementById('campusFilter').value;

  let facilities = CAMPUS_FACILITIES;
  if (q)   facilities = facilities.filter(f =>
    f.name.toLowerCase().includes(q)   ||
    f.desc.toLowerCase().includes(q)   ||
    f.location.toLowerCase().includes(q)
  );
  if (cat) facilities = facilities.filter(f => f.category === cat);

  const grid  = document.getElementById('campusGrid');
  const none  = document.getElementById('campusNoResults');

  if (facilities.length === 0) {
    grid.innerHTML = '';
    none.classList.remove('hidden');
    return;
  }

  none.classList.add('hidden');
  grid.innerHTML = facilities.map(f => `
    <div class="facility-card">
      <div class="facility-icon">${f.emoji}</div>
      <p class="facility-name">${escHtml(f.name)}</p>
      <p class="facility-desc">${escHtml(f.desc)}</p>
      <span class="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full self-start">${escHtml(f.category)}</span>
      <p class="facility-location">📍 ${escHtml(f.location)}</p>
    </div>
  `).join('');
}

/* =========================================================
   SECTION 9 — AI ASSISTANT
   ========================================================= */

let chatHistory = [];   // { role: 'user'|'bot', text, time }

function renderAssistant() {
  // Only render the welcome message on first load
  if (chatHistory.length === 0) {
    chatHistory.push({
      role: 'bot',
      text: 'Hi! I\'m your Onboarding Buddy Assistant 🤖. I can answer questions about university life, campus facilities, orientation, and more. What would you like to know?',
      time: nowTime(),
    });
  }
  renderChatMessages();
  renderSuggestedQuestions();
}

function renderChatMessages() {
  const container = document.getElementById('chatMessages');
  container.innerHTML = chatHistory.map(msg => `
    <div>
      <div class="chat-msg ${msg.role}${msg.typing ? ' typing' : ''}${msg.isError ? ' error' : ''}">${escHtml(msg.text)}</div>
      <p class="chat-timestamp">${msg.time}</p>
    </div>
  `).join('');
  // Scroll to the latest message
  container.scrollTop = container.scrollHeight;
}

function renderSuggestedQuestions() {
  const container = document.getElementById('suggestedQuestions');
  container.innerHTML = SUGGESTED_QUESTIONS.map(q => `
    <button class="suggested-q" aria-label="Ask: ${escHtml(q)}">${escHtml(q)}</button>
  `).join('');
}

/**
 * lookupFAQ — keyword-scoring FAQ matcher.
 *
 * Splits the query into individual words and counts how many of each FAQ
 * entry's keywords appear anywhere in the lowercased query string.
 * Also awards a bonus point for whole-word matches to favour precision.
 * Returns the answer from the highest-scoring entry, or null if nothing
 * scores above zero.
 */
function lookupFAQ(query) {
  const lower = query.toLowerCase().trim();

  const scored = FAQ_KB.map(entry => {
    let score = 0;
    entry.keywords.forEach(kw => {
      if (lower.includes(kw)) {
        score += 1;
        // Bonus: whole-word match (e.g. "id" shouldn't match "video")
        const wordBoundary = new RegExp('\\b' + kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b');
        if (wordBoundary.test(lower)) score += 1;
      }
    });
    return { entry, score };
  }).filter(x => x.score > 0).sort((a, b) => b.score - a.score);

  return scored.length > 0 ? scored[0].entry.answer : null;
}

/**
 * sendMessage — local FAQ-based assistant.
 * Matches the user's question against FAQ_KB using lookupFAQ(),
 * shows a brief typing indicator for a natural feel, then displays the result.
 * No network calls are made. This is a prototype, not a real AI model.
 */
function sendMessage(text) {
  const trimmed = text.trim();
  if (!trimmed) return;

  const sendBtn   = document.getElementById('chatSendBtn');
  const chatInput = document.getElementById('chatInput');

  // Disable controls while "processing" to prevent double-submits
  sendBtn.disabled   = true;
  chatInput.disabled = true;
  chatInput.value    = '';

  // Show the user's message immediately
  chatHistory.push({ role: 'user', text: trimmed, time: nowTime() });
  renderChatMessages();

  // Show a brief typing indicator before the reply appears
  chatHistory.push({ role: 'bot', text: 'Looking up your question…', time: nowTime(), typing: true });
  renderChatMessages();

  setTimeout(() => {
    // Remove typing indicator
    chatHistory = chatHistory.filter(m => !m.typing);

    const answer = lookupFAQ(trimmed);

    const reply = answer
      ? answer
      : 'I\'m sorry, I don\'t have a specific answer for that in my current knowledge base. For accurate information, please contact the relevant university office directly — for example, the Registrar\'s Office, IT Help Desk, Health & Wellness Center, or Student Union. They\'re all listed in the Campus Guide tab.';

    chatHistory.push({ role: 'bot', text: reply, time: nowTime() });

    // Re-enable controls
    sendBtn.disabled   = false;
    chatInput.disabled = false;
    chatInput.focus();
    renderChatMessages();
  }, 650);
}

/* =========================================================
   SECTION 10 — EVENTS & ANNOUNCEMENTS RENDER
   ========================================================= */

function renderEvents(filter) {
  if (filter !== undefined) state.eventFilter = filter;
  const active = state.eventFilter || 'all';

  // Update filter chip active states
  document.querySelectorAll('.filter-chip').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === active);
  });

  const items = active === 'all'
    ? ANNOUNCEMENTS
    : ANNOUNCEMENTS.filter(a => a.type === active);

  const feed = document.getElementById('eventFeed');
  feed.innerHTML = items.map(ev => `
    <article class="event-card" aria-label="${escHtml(ev.badge)}: ${escHtml(ev.title)}">
      <div class="event-date-block" aria-label="${ev.month} ${ev.day}">
        <p class="event-day">${ev.day}</p>
        <p class="event-month">${ev.month}</p>
      </div>
      <div class="flex-1">
        <span class="event-badge ${ev.badgeColor}">${escHtml(ev.badge)}</span>
        <h3 class="event-title">${escHtml(ev.title)}</h3>
        <p class="event-body">${escHtml(ev.body)}</p>
      </div>
    </article>
  `).join('');
}

/* =========================================================
   SECTION 11 — EVENT LISTENERS
   ========================================================= */

function attachEventListeners() {
  /* ----- Navigation ----- */
  document.querySelectorAll('[data-view]').forEach(btn => {
    btn.addEventListener('click', () => switchView(btn.dataset.view));
  });

  /* ----- Dark mode toggle ----- */
  document.getElementById('darkToggle').addEventListener('click', toggleDarkMode);

  /* ----- Mobile menu toggle ----- */
  document.getElementById('menuToggle').addEventListener('click', function () {
    const menu = document.getElementById('mobileMenu');
    const expanded = this.getAttribute('aria-expanded') === 'true';
    menu.classList.toggle('hidden', expanded);
    this.setAttribute('aria-expanded', String(!expanded));
  });

  /* ----- Checklist: checkbox toggle ----- */
  document.getElementById('checklistItems').addEventListener('change', e => {
    if (e.target.matches('.task-checkbox')) {
      const id = e.target.closest('.checklist-item').dataset.id;
      if (e.target.checked) {
        if (!state.completedTasks.includes(id)) state.completedTasks.push(id);
      } else {
        state.completedTasks = state.completedTasks.filter(t => t !== id);
      }
      saveState();
      renderChecklist();
      // Update dashboard ring if it is visible
      if (state.activeView === 'checklist') {
        const pct = calcProgress();
        updateRing('dashboardRingFill', pct);
      }
    }
  });

  /* ----- Checklist: category tab click ----- */
  document.getElementById('checklistTabs').addEventListener('click', e => {
    if (e.target.matches('.cat-tab')) {
      renderChecklist(e.target.dataset.cat);
    }
  });

  /* ----- Checklist: reset ----- */
  document.getElementById('resetChecklistBtn').addEventListener('click', () => {
    if (confirm('Reset all tasks to incomplete? Your progress will be cleared.')) {
      state.completedTasks = [];
      saveState();
      renderChecklist();
    }
  });

  /* ----- Buddy matcher ----- */
  document.getElementById('findMatchBtn').addEventListener('click', findBuddyMatches);

  /* ----- Buddy filter / search (live) ----- */
  document.getElementById('buddyFilterProgram').addEventListener('change', () => renderBuddies());
  document.getElementById('buddySearch').addEventListener('input', () => renderBuddies());

  /* ----- Buddy card click → modal ----- */
  document.getElementById('buddyGrid').addEventListener('click', e => {
    const card = e.target.closest('[data-buddy]');
    if (card) openBuddyModal(card.dataset.buddy);
  });
  document.getElementById('buddyGrid').addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      const card = e.target.closest('[data-buddy]');
      if (card) { e.preventDefault(); openBuddyModal(card.dataset.buddy); }
    }
  });

  /* ----- Buddy modal close ----- */
  document.getElementById('buddyModalClose').addEventListener('click', () => {
    document.getElementById('buddyModal').classList.add('hidden');
  });
  document.getElementById('buddyModal').addEventListener('click', e => {
    if (e.target === document.getElementById('buddyModal')) {
      document.getElementById('buddyModal').classList.add('hidden');
    }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') document.getElementById('buddyModal').classList.add('hidden');
  });

  /* ----- Campus search + filter (live) ----- */
  document.getElementById('campusSearch').addEventListener('input', renderCampus);
  document.getElementById('campusFilter').addEventListener('change', renderCampus);

  /* ----- AI Assistant: send button ----- */
  document.getElementById('chatSendBtn').addEventListener('click', () => {
    sendMessage(document.getElementById('chatInput').value);
  });

  /* ----- AI Assistant: Enter key in input ----- */
  document.getElementById('chatInput').addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e.target.value);
    }
  });

  /* ----- Suggested questions ----- */
  document.getElementById('suggestedQuestions').addEventListener('click', e => {
    if (e.target.matches('.suggested-q')) {
      sendMessage(e.target.textContent.trim());
    }
  });

  /* ----- Events filter chips ----- */
  document.querySelectorAll('.filter-chip').forEach(btn => {
    btn.addEventListener('click', () => renderEvents(btn.dataset.filter));
  });
}

/* =========================================================
   SECTION 12 — INITIALISATION
   ========================================================= */

function init() {
  // Restore dark-mode preference immediately (before first render avoids flash)
  applyDarkMode(state.isDarkMode || false);

  // Populate dynamic dropdowns that only need to run once
  populateBuddyFilters();
  populateCampusFilter();

  // Attach all event listeners
  attachEventListeners();

  // Restore previous view or default to dashboard
  switchView(state.activeView || 'dashboard');
}

// Boot the application once the DOM is ready
document.addEventListener('DOMContentLoaded', init);
