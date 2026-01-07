import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  platform,
  jobit,
  tripguide,
  socketio,
} from "../assets";

export const navLinks = [
  { id: "about", title: "About" },
  { id: "work", title: "Work" },
  { id: "contact", title: "Contact" },
];

const services = [
  {
    title: "Full-Stack Web Developer",
    icon: "</>",
  },
  {
    title: "Backend & API Engineering",
    icon: "API",
  },
  {
    title: "Math & CS-Driven Problem Solving",
    icon: "Σ",
  },
  {
    title: "Building Faster with AI",
    icon: "AI",
  },
];

const technologies = [
  { name: "HTML 5", icon: html },
  { name: "CSS 3", icon: css },
  { name: "JavaScript", icon: javascript },
  { name: "TypeScript", icon: typescript },
  { name: "React JS", icon: reactjs },
  { name: "Redux Toolkit", icon: redux },
  { name: "Tailwind CSS", icon: tailwind },
  { name: "Node JS", icon: nodejs },
  { name: "MongoDB", icon: mongodb },
  { name: "Socket IO", icon: socketio },
  { name: "git", icon: git },
  { name: "figma", icon: figma },
  { name: "docker", icon: docker },
];

const experiences = [
  {
    title: "Product & Technical Operations (Part-Time)",
    company_name: "Biluibaba – Pet Store Startup",
    icon: web,
    iconBg: "#022c22",
    date: "2024 – Present",
    site: "https://biluibaba.com/",
    points: [
      "Overseeing the ongoing development of Biluibaba’s e-commerce platform for pet products, keeping track of new features and fixes.",
      "Performing functional testing end-to-end: checking critical flows, catching bugs, and reviewing the experience from a real user’s perspective.",
      "Acting as a bridge between the founder/business side and web developers by translating requirements into clear, actionable tasks.",
      "Writing structured reports on issues, edge cases, and UX problems, then prioritizing what needs to be fixed or improved first.",
      "Taking part in technical decisions around UI/UX choices, feature scope, and long-term maintainability of the platform.",
    ],
  },
  {
    title: "Independent Full-Stack Developer",
    company_name: "Self-Led Projects",
    icon: backend,
    iconBg: "#0f172a",
    date: "2024 – Present",
    points: [
      "Building full-stack web applications from scratch using React, Node.js, Express, MongoDB, and related tools.",
      {
        text: "Developed an online tuition platform MVP with real-time communication using Socket.io, focusing on stable functionality and scalability.",
        link: "https://teaching-platform-beige.vercel.app/",
        linkText: "Live site",
      },
      "Designing data models, APIs, and application structure with an emphasis on correctness, clarity, and long-term maintainability.",
      "Leveraging AI tools like ChatGPT as an engineering accelerator to quickly explore alternatives, debug issues, and iterate on design.",
      "Continuously studying CS concepts, mathematics, and system design to deepen problem-solving skills and architectural intuition.",
    ],
  },
];

const testimonials = [];

const projects = [
  {
    name: "Online Tutoring Platform",
    description:
      "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "mongodb", color: "green-text-gradient" },
      { name: "tailwind", color: "pink-text-gradient" },
    ],
    image: platform,
    source_code_link: "https://github.com/Shabbin/Tutogoggy",
  },
 
  
];

export { services, technologies, experiences, testimonials, projects };
