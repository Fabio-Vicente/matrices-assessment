import { Message } from "@/interfaces";

export const messages: Message[] = [
  {
    id: "1",
    subject: "Welcome to BMail",
    sender: {
      name: "BMail Team",
      email: "noreply@bmail.com",
    },
    recipients: [
      {
        name: "John Qian",
        email: "john@gmail.com",
      },
    ],
    date: new Date("2025-03-14T09:15:00"),
    isRead: true,
    isStarred: true,
    folder: "inbox",
    content: `Welcome to BMail! Your account is all set up and ready to go. Start exploring our features.`,
  },
  {
    id: "2",
    subject: "Project deadline reminder",
    sender: {
      name: "Lisa Wang",
      email: "lisa.wang@company.com",
    },
    recipients: [
      {
        name: "John Qian",
        email: "john@gmail.com",
      },
      {
        name: "David Kim",
        email: "david.kim@company.com",
      },
    ],
    date: new Date("2025-03-13T14:30:00"),
    isRead: true,
    isStarred: false,
    folder: "inbox",
    content: `Hi team, just a reminder that our project deadline is this Friday. Please submit your final reports.`,
  },
  {
    id: "3",
    subject: "Re: Project deadline reminder",
    sender: {
      name: "David Kim",
      email: "david.kim@company.com",
    },
    recipients: [
      {
        name: "John Qian",
        email: "john@gmail.com",
      },
      {
        name: "Lisa Wang",
        email: "lisa.wang@company.com",
      },
    ],
    date: new Date("2025-03-13T16:20:00"),
    isRead: false,
    isStarred: false,
    folder: "inbox",
    content: `Thanks Lisa! I'll have my section ready by Thursday afternoon.`,
    threadId: "2",
  },
  {
    id: "4",
    subject: "Monthly newsletter",
    sender: {
      name: "Local Library",
      email: "newsletter@library.org",
    },
    recipients: [
      {
        name: "John Qian",
        email: "john@gmail.com",
      },
    ],
    date: new Date("2025-03-13T09:00:00"),
    isRead: true,
    isStarred: false,
    folder: "inbox",
    content: `Check out our new arrivals and upcoming events this month at your local library.`,
  },
  {
    id: "5",
    subject: "Your subscription is expiring",
    sender: {
      name: "StreamingService",
      email: "billing@streamingservice.com",
    },
    recipients: [
      {
        name: "John Qian",
        email: "john@gmail.com",
      },
    ],
    date: new Date("2025-03-12T19:00:00"),
    isRead: true,
    isStarred: false,
    folder: "inbox",
    content: `Your monthly subscription will expire in 3 days. Renew now to continue enjoying our content.`,
  },
  {
    id: "6",
    subject: "Weekend hiking trip",
    sender: {
      name: "Outdoor Club",
      email: "info@outdoorclub.org",
    },
    recipients: [
      {
        name: "John Qian",
        email: "john@gmail.com",
      },
    ],
    date: new Date("2025-03-12T19:00:00"),
    isRead: false,
    isStarred: true,
    folder: "inbox",
    content: `Join us this Saturday for a scenic hike at Blue Mountain Trail. All skill levels welcome!`,
  },
  {
    id: "7",
    subject: "Coffee catch-up?",
    sender: {
      name: "Emma Thompson",
      email: "emma.t@gmail.com",
    },
    recipients: [
      {
        name: "John Qian",
        email: "john@gmail.com",
      },
    ],
    date: new Date("2025-03-12T11:45:00"),
    isRead: true,
    isStarred: false,
    folder: "inbox",
    content: `Hey! It's been a while. Want to grab coffee this week and catch up?`,
  },
  {
    id: "8",
    subject: "Re: Coffee catch-up?",
    sender: {
      name: "John Qian",
      email: "john@gmail.com",
    },
    recipients: [
      {
        name: "Emma Thompson",
        email: "emma.t@gmail.com",
      },
    ],
    date: new Date("2025-03-12T11:45:00"),
    isRead: true,
    isStarred: false,
    folder: "inbox",
    content: `Absolutely! I'd love to catch up. How about Thursday afternoon around 3 PM? There's a nice new cafe on 5th Street called Brew & Beans.`,
    threadId: "7",
  },
  {
    id: "9",
    subject: "Security update",
    sender: {
      name: "IT Department",
      email: "it@company.com",
    },
    recipients: [
      {
        name: "John Qian",
        email: "john@gmail.com",
      },
    ],
    date: new Date("2025-03-12T10:00:00"),
    isRead: true,
    isStarred: false,
    folder: "inbox",
    content: `Please update your password before the end of the week as part of our security policy.`,
  },
  {
    id: "10",
    subject: "Free iPhone 15 - Act Now!",
    sender: {
      name: "Deals4U",
      email: "no-reply@deals4u.biz",
    },
    recipients: [
      {
        name: "John Qian",
        email: "john@gmail.com",
      },
    ],
    date: new Date("2025-03-12T10:15:00"),
    isRead: false,
    isStarred: false,
    folder: "spam",
    content: `You've been selected to receive a FREE iPhone 15! Just pay shipping. Limited time offer!!!`,
  },
  {
    id: "11",
    subject: "Re: Lunch tomorrow?",
    sender: {
      name: "John Qian",
      email: "john@gmail.com",
    },
    recipients: [
      {
        name: "Sam Parker",
        email: "sam.parker@gmail.com",
      },
    ],
    date: new Date("2025-03-12T15:14:00"),
    isRead: true,
    isStarred: false,
    folder: "trash",
    content: `Sure! How about that new sushi place on Main Street?`,
  },
];
