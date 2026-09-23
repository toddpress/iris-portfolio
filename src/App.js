// src/App.jsx - Updated to include space theme
import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import "./space-theme.css"; // Import space theme styles
import SpaceBackground from "./components/SpaceBackground";
import RocketCursor from "./components/RocketCursor";
import AnimatedPlanet from "./components/AnimatedPlanet";
import "./planet-animations.css";
import ProjectVideo from "./components/ProjectVideo";
import { IridescentText } from "./components/effects/IridescentText";

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDemoVideo, setShowDemoVideo] = useState(false);

  // Handle scroll events to update active section and header style
  useEffect(() => {
    const handleScroll = () => {
      // Update header style when scrolled
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Update active section based on scroll position
      const sections = ["home", "about", "projects", "skills", "contact"];
      const scrollPosition = window.scrollY + 300;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + height
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to section when nav link is clicked
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Adjust for header height
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };

  // Projects data based on Iris's resume
  const projects = [
    {
      id: 1,
      title: "Booz Allen Hamilton",
      description:
        "Developing secure data submission tools to aid government compliance with data transparency requirements. Implementing frontend components using React while ensuring security best practices.",
      image: "/starkiller_flag.jpg",
      technologies: [
        "React",
        "REST APIs",
        "Docker",
        "Security",
        "A11y",
        "Spring MVC",
        "Enterprise Java",
      ],
      role: "Software Developer + Context Engineer",
      period: "January 2025 - Present",
    },
    {
      id: 2,
      title: "Stratos WMS",
      description:
        "Leading development of a warehouse management system with security-first approach. Building React frontend components with comprehensive testing for reliability.",
      image:
        "https://via.placeholder.com/600x400/2563eb/ffffff?text=Stratos+WMS",
      videoSrc: "/videos/stratos-demo.mp4",
      poster: "/stratos_poster.png",
      technologies: ["React", "Firestore", "Security", "Testing"],
      role: "Project Lead",
      period: "August 2024 - Present",
    },
    {
      id: 3,
      title: "NASA L'SPACE Program",
      description:
        "Led team in developing mission concept documentation and proposals for NASA evaluation. Coordinated with NASA scientists and students to develop innovative technology concepts.",
      image:
        "https://via.placeholder.com/600x400/2563eb/ffffff?text=NASA+L'SPACE",
      technologies: [
        "Project Management",
        "Documentation",
        "Technical Evaluation",
      ],
      role: "Deputy Project Manager & Software Developer",
      period: "January 2023 - July 2024",
    },
    {
      id: 4,
      title: "UPGRID",
      description:
        "Architected and implemented responsive web applications using React and JavaScript. Implemented security protocols to protect sensitive client data and prevent common vulnerabilities.",
      image: "https://via.placeholder.com/600x400/2563eb/ffffff?text=UPGRID",
      technologies: ["React", "JavaScript", "MongoDB", "CI/CD"],
      role: "Full-Stack Developer",
      period: "July 2019 - June 2024",
    },
  ];

  // Skills data based on Iris's resume
  const skills = [
    {
      category: "Languages",
      items: ["Java", "Python", "JavaScript", "HTML", "CSS"],
    },
    {
      category: "Frameworks & Tools",
      items: ["React", "GitHub", "Spring Boot", "Docker", "CI/CD"],
    },
    {
      category: "Databases & Cloud",
      items: ["MongoDB", "SQL", "Google Cloud Firestore", "Firebase", "Linux"],
    },
    {
      category: "Professional Skills",
      items: [
        "Agile/Scrum",
        "Project Management",
        "UI/UX Design",
        "Mobile App Development",
        "Security Best Practices",
      ],
    },
  ];

  return (
    <div className="min-h-screen dark-theme">
      {/* Space Background */}
      <SpaceBackground />

      {/* Rocket Cursor */}
      <RocketCursor />

      {/* Header/Navigation */}
      <header
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          isScrolled ? "scrolled py-3" : "py-4"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#home"
              className="text-xl md:text-2xl font-bold text-blue-500"
              onClick={() => scrollToSection("home")}
            >
              Iris <span className="text-gray-400">Carrigg</span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <NavLink
                isActive={activeSection === "home"}
                onClick={() => scrollToSection("home")}
              >
                Home
              </NavLink>
              <NavLink
                isActive={activeSection === "about"}
                onClick={() => scrollToSection("about")}
              >
                About
              </NavLink>
              <NavLink
                isActive={activeSection === "projects"}
                onClick={() => scrollToSection("projects")}
              >
                Projects
              </NavLink>
              <NavLink
                isActive={activeSection === "skills"}
                onClick={() => scrollToSection("skills")}
              >
                Skills
              </NavLink>
              <NavLink
                isActive={activeSection === "contact"}
                onClick={() => scrollToSection("contact")}
              >
                Contact
              </NavLink>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-0.5 bg-gray-300 transition-all duration-300 ${isMenuOpen ? "transform rotate-45 translate-y-1" : "mb-1.5"}`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-gray-300 transition-all duration-300 ${isMenuOpen ? "opacity-0" : "mb-1.5"}`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-gray-300 transition-all duration-300 ${isMenuOpen ? "transform -rotate-45 -translate-y-1" : ""}`}
              ></span>
            </button>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`md:hidden transition-all duration-300 overflow-hidden ${
              isMenuOpen ? "max-h-60 opacity-100 mt-4" : "max-h-0 opacity-0"
            }`}
          >
            <div className="py-2 space-y-2">
              <MobileNavLink
                isActive={activeSection === "home"}
                onClick={() => scrollToSection("home")}
              >
                Home
              </MobileNavLink>
              <MobileNavLink
                isActive={activeSection === "about"}
                onClick={() => scrollToSection("about")}
              >
                About
              </MobileNavLink>
              <MobileNavLink
                isActive={activeSection === "projects"}
                onClick={() => scrollToSection("projects")}
              >
                Projects
              </MobileNavLink>
              <MobileNavLink
                isActive={activeSection === "skills"}
                onClick={() => scrollToSection("skills")}
              >
                Skills
              </MobileNavLink>
              <MobileNavLink
                isActive={activeSection === "contact"}
                onClick={() => scrollToSection("contact")}
              >
                Contact
              </MobileNavLink>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center pt-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                  Hi, I'm <span className="text-blue-500"><IridescentText>Iris Carrigg</IridescentText></span>
                </h1>
                <h2 className="text-lg sm:text-xl lg:text-2xl text-gray-400 mb-6">
                  Full-Stack Software Developer
                </h2>
                <p className="text-gray-300 max-w-xl mx-auto lg:mx-0 mb-8">
                  I'm a passionate software developer with experience in
                  building secure, responsive web applications and leading
                  development teams. Currently based in Charleston, SC.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <a
                    href="#projects"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("projects");
                    }}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium shadow-sm hover:bg-blue-600 transition-colors glow"
                  >
                    View My Projects
                  </a>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("contact");
                    }}
                    className="px-6 py-3 border border-blue-500 text-blue-500 rounded-lg font-medium hover:bg-blue-500/10 transition-colors"
                  >
                    Contact Me
                  </a>
                </div>

                {/* Social Links */}
                <div className="mt-8 flex justify-center lg:justify-start space-x-4">
                  <SocialLink
                    href="https://github.com/iris-c-iris"
                    label="GitHub"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.11.82-.26.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.124-.303-.535-1.524.118-3.176 0 0 1.006-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.625-5.48 5.92.43.372.824 1.102.824 2.222v3.293c0 .32.217.694.825.577C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                  </SocialLink>
                  <SocialLink
                    href="https://www.linkedin.com/in/-iris-c/"
                    label="LinkedIn"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                    </svg>
                  </SocialLink>
                </div>
              </div>
              <div className="flex-1 flex justify-center lg:justify-end">
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 transform hover:scale-105 transition-transform duration-500">
                  {/* Animated Alien Planet */}
                  <AnimatedPlanet />

                  {/* Caption tag */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-gray-900/50 backdrop-blur-sm ring-1 ring-blue-400/15 text-[10px] uppercase tracking-[0.2em] text-blue-200/85 whitespace-nowrap">
                    <span
                      className="w-1 h-1 rounded-full bg-cyan-300/80 shadow-[0_0_6px_rgba(103,232,249,0.7)]"
                      aria-hidden="true"
                    />
                    Evolves over time
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              About <span className="text-blue-500">Me</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h3 className="text-2xl font-bold mb-4">
                  A passionate Software Developer based in Charleston, SC
                </h3>
                <p className="text-gray-300 mb-6">
                  I'm a full-stack developer with experience in building secure,
                  responsive web applications and leading development teams. I
                  specialize in React, JavaScript, and backend technologies like
                  Java and MongoDB.
                </p>
                <p className="text-gray-300 mb-6">
                  Currently pursuing a Bachelor of Science in Software
                  Engineering at College of Charleston with a minor in
                  International Studies, graduating in May 2025. I combine
                  technical expertise with project management skills to deliver
                  high-quality software solutions.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 border border-gray-700 rounded-lg bg-gray-800/50 glow">
                    <div className="text-2xl font-bold text-blue-400">8+</div>
                    <div className="text-sm text-gray-400">
                      Years Experience
                    </div>
                  </div>
                  <div className="text-center p-4 border border-gray-700 rounded-lg bg-gray-800/50 glow">
                    <div className="text-2xl font-bold text-blue-400">10+</div>
                    <div className="text-sm text-gray-400">Projects</div>
                  </div>
                  <div className="text-center p-4 border border-gray-700 rounded-lg bg-gray-800/50 glow">
                    <div className="text-2xl font-bold text-blue-400">3+</div>
                    <div className="text-sm text-gray-400">
                      Leadership Roles
                    </div>
                  </div>
                  <div className="text-center p-4 border border-gray-700 rounded-lg bg-gray-800/50 glow">
                    <div className="text-2xl font-bold text-blue-400">5+</div>
                    <div className="text-sm text-gray-400">Technologies</div>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2 relative">
                <div className="relative w-full max-w-md mx-auto rounded-lg shadow-xl overflow-hidden aspect-square bg-gray-800 glow">
                  {/* Second profile image - if available, otherwise use the same one */}
                  <img
                    src="/iris-profile.jpg"
                    alt="Iris Carrigg"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.parentElement.innerHTML = `
                        <div class="w-full h-full bg-gray-700 flex items-center justify-center text-gray-400">
                          <svg class="w-24 h-24" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      `;
                    }}
                  />
                </div>

                {/* Floating education card */}
                <div className="absolute -bottom-8 -right-8 bg-gray-800 rounded-lg shadow-lg p-4 max-w-xs border border-blue-500/30 glow">
                  <h4 className="font-bold text-blue-500 mb-2">Education</h4>
                  <p className="font-medium text-gray-200">
                    B.S. Software Engineering
                  </p>
                  <p className="text-sm text-gray-400">
                    College of Charleston, 2025
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Minor in International Studies
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              My <span className="text-blue-500">Projects</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="project-card bg-gray-800/70 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg glow"
                >
                  {/* Project Image / Video */}
                  <div className="project-media-frame aspect-video overflow-hidden relative">
                    <ProjectMedia project={project} />
                  </div>

                  {/* Project Content */}
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-100">
                        {project.title}
                      </h3>
                      <span className="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-full">
                        {project.period}
                      </span>
                    </div>

                    <p className="text-blue-400 font-medium text-sm mb-3">
                      {project.role}
                    </p>

                    <p className="text-gray-300 text-sm mb-4">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-gray-700 text-blue-300 px-2 py-1 rounded-full text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* GitHub Button */}
            <div className="text-center mt-12">
              <a
                href="https://github.com/iris-c-iris"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium shadow-sm hover:bg-blue-600 transition-colors glow"
              >
                See More on GitHub
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.11.82-.26.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.124-.303-.535-1.524.118-3.176 0 0 1.006-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.625-5.48 5.92.43.372.824 1.102.824 2.222v3.293c0 .32.217.694.825.577C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              My <span className="text-blue-500">Skills</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {skills.map((skillGroup, idx) => (
                <div
                  key={idx}
                  className="bg-gray-800/70 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 glow"
                >
                  <h3 className="text-xl font-bold mb-5 text-blue-400">
                    {skillGroup.category}
                  </h3>
                  <div className="space-y-4">
                    {skillGroup.items.map((skill, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-300 font-medium">
                            {skill}
                          </span>
                          <span className="text-gray-400 text-sm">
                            {85 + Math.floor(Math.random() * 15)}%
                          </span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                            style={{
                              width: `${85 + Math.floor(Math.random() * 15)}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Get In <span className="text-blue-500">Touch</span>
            </h2>
            <p className="text-gray-300 text-center max-w-3xl mx-auto mb-12">
              Have a project in mind? Looking to collaborate or hire me? Feel
              free to reach out!
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <div className="bg-gray-800/70 rounded-lg shadow-md p-6 md:p-8 glow">
                  <h3 className="text-xl font-bold mb-6 text-gray-100">
                    Contact Information
                  </h3>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-blue-500/20 p-3 rounded-full text-blue-400 mr-4">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-200">Email</h4>
                        <a
                          href="mailto:iriscarrigg@gmail.com"
                          className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                        >
                          iriscarrigg@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-blue-500/20 p-3 rounded-full text-blue-400 mr-4">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-200">Location</h4>
                        <p className="text-gray-400">
                          Charleston, South Carolina
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Social Media Links */}
                  <div className="mt-8">
                    <h4 className="text-lg font-semibold mb-4 text-gray-200">
                      Find me on
                    </h4>
                    <div className="flex space-x-4">
                      <a
                        href="https://github.com/iris-c-iris"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-700 hover:bg-blue-500 hover:text-white text-gray-300 p-3 rounded-full transition-colors duration-300"
                        aria-label="GitHub"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.11.82-.26.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.124-.303-.535-1.524.118-3.176 0 0 1.006-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.625-5.48 5.92.43.372.824 1.102.824 2.222v3.293c0 .32.217.694.825.577C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                      <a
                        href="https://www.linkedin.com/in/-iris-c/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-700 hover:bg-blue-500 hover:text-white text-gray-300 p-3 rounded-full transition-colors duration-300"
                        aria-label="LinkedIn"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <div className="bg-gray-800/70 rounded-lg shadow-md p-6 md:p-8 glow">
                  <h3 className="text-xl font-bold mb-6 text-gray-100">
                    Send Me a Message
                  </h3>

                  <form>
                    <div className="grid grid-cols-1 gap-5">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-gray-300 font-medium mb-2"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-gray-200"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-gray-300 font-medium mb-2"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-gray-200"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-gray-300 font-medium mb-2"
                        >
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-gray-200"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-gray-300 font-medium mb-2"
                        >
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows="5"
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 resize-none text-gray-200"
                          required
                        ></textarea>
                      </div>

                      <div>
                        <button
                          type="submit"
                          className="w-full bg-blue-500 text-white font-medium py-2.5 px-5 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors duration-300 glow"
                        >
                          Send Message
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About Column */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xl font-bold mb-4">Iris Carrigg</h3>
              <p className="text-gray-300 mb-6 max-w-md">
                Full-stack software developer passionate about creating secure,
                responsive applications with modern technologies. Currently
                based in Charleston, SC.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/iris-c-iris"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-blue-500 p-2 rounded-full transition-colors duration-300"
                  aria-label="GitHub"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.11.82-.26.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.124-.303-.535-1.524.118-3.176 0 0 1.006-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.625-5.48 5.92.43.372.824 1.102.824 2.222v3.293c0 .32.217.694.825.577C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/-iris-c/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-blue-500 p-2 rounded-full transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 relative pb-2 before:absolute before:bottom-0 before:left-0 before:w-12 before:h-0.5 before:bg-blue-500">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#home"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("home");
                    }}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("about");
                    }}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("projects");
                    }}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    href="#skills"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("skills");
                    }}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                  >
                    Skills
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("contact");
                    }}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4 relative pb-2 before:absolute before:bottom-0 before:left-0 before:w-12 before:h-0.5 before:bg-blue-500">
                Contact
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="text-blue-400 mr-3 mt-0.5">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-300">iriscarrigg@gmail.com</span>
                </li>

                <li className="flex items-start">
                  <div className="text-blue-400 mr-3 mt-0.5">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-300">
                    Charleston, South Carolina
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 mt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>
              © {new Date().getFullYear()} Iris Carrigg. All rights reserved
              <span className="sr-only"> by Todd Pressley</span>.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Helper Components
const ProjectMedia = ({ project }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  if (project.videoSrc) {
    const handlePlay = () => {
      const el = videoRef.current;
      if (!el) return;
      const result = el.play();
      if (result && typeof result.catch === "function") {
        result.catch(() => setIsPlaying(false));
      }
    };

    return (
      <>
        <video
          ref={videoRef}
          className={`project-media-image w-full h-full object-cover bg-black${isPlaying ? " is-playing" : ""}`}
          controls={isPlaying}
          preload="metadata"
          poster={project.poster}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        >
          <source src={project.videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Wash + play chip live at the frame level; reveal is driven by .project-card:hover in CSS. */}
        <div className="project-media-wash" aria-hidden="true" />
        {!isPlaying && (
          <button
            type="button"
            onClick={handlePlay}
            aria-label={`Play ${project.title} demo`}
            className="absolute inset-0 flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <span className="project-play-chip flex items-center justify-center w-16 h-16 rounded-full bg-white/95 shadow-xl shadow-black/40 ring-1 ring-white/40">
              <svg
                className="w-8 h-8 text-blue-600 translate-x-0.5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </>
    );
  }

  return (
    <>
      {!imageFailed && (
        <>
          <img
            src={project.image}
            alt={project.title}
            className="project-media-image w-full h-full object-cover"
            onError={() => setImageFailed(true)}
          />
          {/* Mirrors the video card's hover wash for visual consistency. */}
          <div className="project-media-wash" aria-hidden="true" />
        </>
      )}
      {imageFailed && (
        <div
          className="project-media-fallback absolute inset-0 flex flex-col items-center justify-center"
          role="img"
          aria-label={`${project.title} — Interactive demo coming soon`}
        >
          <span className="project-media-fallback__label">{project.title}</span>
          <span className="project-media-fallback__note">
            Interactive Demo Coming Soon
          </span>
        </div>
      )}
    </>
  );
};

const NavLink = ({ isActive, children, ...props }) => (
  <a
    className={`font-medium transition-colors duration-300 ${
      isActive ? "text-blue-400" : "text-gray-200 hover:text-blue-400"
    }`}
    {...props}
  >
    {children}
  </a>
);

const MobileNavLink = ({ isActive, children, ...props }) => (
  <a
    className={`block py-2 px-4 font-medium transition-colors duration-300 ${
      isActive
        ? "text-blue-400 bg-gray-800 rounded-md"
        : "text-gray-200 hover:text-blue-400 hover:bg-gray-800 hover:rounded-md"
    }`}
    {...props}
  >
    {children}
  </a>
);

const SocialLink = ({ href, label, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-gray-700 hover:bg-blue-500 hover:text-white text-gray-300 p-2 rounded-full transition-colors duration-300"
    aria-label={label}
  >
    {children}
  </a>
);

export default App;
