/**
 * Mock data for Tracker Dashboard
 * 
 * NOTE: Pure design pass. Do not wire real API endpoints yet.
 * Every mock dataset is flagged with a TODO comment for future backend wiring.
 */

// TODO: replace with real user session data
export const mockUserData = {
  name: "Subhani",
  email: "subhani@tracker.pro",
  avatarInitial: "S"
};

// TODO: replace with real weather API data
export const mockWeatherData = {
  temperature: 24,
  unit: "°C",
  condition: "Partly Cloudy",
  location: "Lahore, PK",
  high: 28,
  low: 18,
  humidity: "52%"
};

// TODO: replace with real stat totals from API
export const mockStatsData = {
  todos: {
    total: 28,
    active: 5,
    completed: 23,
    subtext: "5 pending action"
  },
  trackers: {
    total: 12,
    running: 1,
    completed: 11,
    subtext: "1 session active"
  },
  events: {
    total: 19,
    upcoming: 4,
    past: 15,
    subtext: "4 upcoming this week"
  }
};

// TODO: replace with real streak data
export const mockStreakData = [
  { day: "Sep 10", streak: 2, value: 4 },
  { day: "Sep 11", streak: 3, value: 6 },
  { day: "Sep 12", streak: 4, value: 5 },
  { day: "Sep 13", streak: 5, value: 8 },
  { day: "Sep 14", streak: 6, value: 7 },
  { day: "Sep 15", streak: 7, value: 11 },
  { day: "Sep 16", streak: 8, value: 9 },
  { day: "Sep 17", streak: 9, value: 13 },
  { day: "Sep 18", streak: 10, value: 12 },
  { day: "Sep 19", streak: 11, value: 15 },
  { day: "Sep 20", streak: 12, value: 14 },
  { day: "Sep 21", streak: 13, value: 18 },
  { day: "Sep 22", streak: 14, value: 20 },
  { day: "Sep 23", streak: 15, value: 22 }
];

// TODO: replace with real daily counts
export const mockTodayActivity = {
  todosToday: 5,
  tracksToday: 3,
  eventsToday: 2
};

// TODO: replace with real weekly contribution data
export const mockWeeklyContributions = [
  { day: "Mon", fullDay: "Monday", todos: 4, trackers: 2, events: 1, total: 7 },
  { day: "Tue", fullDay: "Tuesday", todos: 6, trackers: 3, events: 2, total: 11 },
  { day: "Wed", fullDay: "Wednesday", todos: 7, trackers: 4, events: 2, total: 13, isToday: true },
  { day: "Thu", fullDay: "Thursday", todos: 5, trackers: 2, events: 1, total: 8 },
  { day: "Fri", fullDay: "Friday", todos: 8, trackers: 4, events: 3, total: 15 },
  { day: "Sat", fullDay: "Saturday", todos: 3, trackers: 2, events: 1, total: 6 },
  { day: "Sun", fullDay: "Sunday", todos: 2, trackers: 1, events: 1, total: 4 }
];

// TODO: replace with real calendar events data
export const mockUpcomingEvents = [
  {
    id: "evt-1",
    title: "Sprint Architecture & API Review",
    time: "02:30 PM - 03:45 PM",
    dateBadge: "TODAY",
    dateFormatted: "Wed, Sep 23",
    category: "Engineering",
    location: "Google Meet"
  },
  {
    id: "evt-2",
    title: "Tracker Milestone Progress Demo",
    time: "10:00 AM - 11:15 AM",
    dateBadge: "TOMORROW",
    dateFormatted: "Thu, Sep 24",
    category: "Product",
    location: "Conference Room A"
  },
  {
    id: "evt-3",
    title: "Database Performance & Indexing Sync",
    time: "04:00 PM - 05:00 PM",
    dateBadge: "FRI",
    dateFormatted: "Fri, Sep 25",
    category: "Infrastructure",
    location: "Tech Lounge"
  },
  {
    id: "evt-4",
    title: "Design System & Dashboard Polish",
    time: "11:30 AM - 12:30 PM",
    dateBadge: "MON",
    dateFormatted: "Mon, Sep 28",
    category: "Design",
    location: "Studio 2"
  }
];

// TODO: replace with real active tracker data from backend/timer service
export const mockTopRunningTracker = {
  id: "trk-top-1",
  title: "Full-Stack Development",
  project: "Tracker Core",
  initialElapsedSeconds: 5240, // 01:27:20
  isRunning: true
};
