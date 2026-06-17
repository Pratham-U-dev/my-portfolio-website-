'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useForm, ValidationError } from '@formspree/react';
import CustomCursor from '@/components/CustomCursor';
import DotGridBackground from '@/components/DotGridBackground';
import Preloader from '@/components/Preloader';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import BackToTopButton from '@/components/BackToTopButton';
import TiltCard from '@/components/TiltCard';
import ChaiCup from '@/components/ChaiCup';
import profilePic from '@/assets/.aistudio/profile.png';

export default function PortfolioPage() {
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [state, handleSubmit] = useForm('xeewpnyv');

  useEffect(() => {
    if (state.succeeded) {
      setContactSubmitted(true);
      const timer = setTimeout(() => setContactSubmitted(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [state.succeeded]);

  useEffect(() => {
    // Reveal Animations (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          if (entry.target.tagName.toLowerCase() === 'section') {
            setActiveSection(entry.target.id);
          }
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.fade-in-up, section').forEach(el => {
      observer.observe(el);
    });

    // Navbar Scroll Effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Education', id: 'education' },
  ];

  return (
    <>
      <Preloader />
      <CustomCursor />
      <DotGridBackground />
      <ScrollProgressBar />
      <BackToTopButton />

      {/* Header */}
      <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${scrolled ? 'scrolled' : ''}`}>
        <div className="container-custom nav-container relative">
          <a href="#" className="logo">
            <svg className="logo-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" opacity="0.3"/>
              <path d="M12 4C9.24 4 7 6.24 7 9c0 2.85 2.92 7.21 5 9.88 2.08-2.67 5-7.03 5-9.88 0-2.76-2.24-5-5-5z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Pratham <span className="text-blue-400">U</span>
          </a>
          
          <nav className="nav-links hidden md:flex items-center gap-8 relative">
            {navLinks.map(link => (
              <a 
                key={link.name} 
                href={`#${link.id}`} 
                className={`text-xs uppercase tracking-widest transition-all ${activeSection === link.id ? 'text-white border-b-2 border-blue-400 pb-1' : 'text-white/60 hover:text-white'}`}
              >
                {link.name}
              </a>
            ))}
            <a href="#contact" className="btn-custom btn-outline-dark z-20">
              <span>Contact</span>
            </a>
          </nav>

          <button 
            className="md:hidden text-white w-6 h-6 relative z-50 focus:outline-none" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span className={`block absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'}`} />
            <span className={`block absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`block absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-[72px] left-0 w-full bg-black/95 backdrop-blur-xl transition-all duration-300 border-b border-white/10 ${isMobileMenuOpen ? 'opacity-100 translate-y-0 visible shadow-2xl' : 'opacity-0 -translate-y-4 invisible'}`}>
          <div className="flex flex-col py-6 px-6 gap-6">
            {navLinks.map(link => (
              <a key={link.name} href={`#${link.id}`} className="text-zinc-400 hover:text-white text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                {link.name}
              </a>
            ))}
            <a href="#contact" className="btn-custom bg-blue-400 text-black py-3 mt-4" onClick={() => setIsMobileMenuOpen(false)}>
              Contact
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section id="hero" className="hero-section min-h-screen flex items-center">
          <div className="ambient-blob"></div>
          <div className="container-custom hero-container">
            <div className="hero-content fade-in-up">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-[1px] w-8 bg-blue-400"></span>
                <span className="hero-badge text-blue-400 text-xs font-semibold tracking-[0.3em] uppercase m-0 p-0 shadow-none border-none bg-transparent">
                  MANGALURU, KARNATAKA
                </span>
              </div>
              <h1 className="hero-title text-6xl md:text-7xl font-bold text-white tracking-tighter leading-[0.9] mb-6">
                <span className="text-transparent bg-clip-text bg-[length:200%] bg-gradient-to-r from-white via-blue-400 to-white animate-[gradientShift_4s_ease_infinite]">AI & Machine Learning</span><br/>Engineering Student
              </h1>
              <p className="hero-desc text-lg max-w-md text-zinc-400 leading-relaxed mb-8">
                Building practical, AI-powered applications. I combine rapid backend prototyping with clean, intuitive frontend design to make everyday tasks easier.
              </p>
              <div className="hero-actions flex flex-col sm:flex-row gap-4">
                <a href="#projects" className="btn-custom btn-primary z-20" style={{ padding: '10px 20px', fontSize: '13px' }}>
                  <span>VIEW PROJECTS</span>
                </a>
                <a href="https://github.com/Pratham-U-dev" target="_blank" rel="noreferrer" className="btn-custom btn-outline-dark z-20" style={{ padding: '10px 20px', fontSize: '13px' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                  <span>GITHUB PROFILE</span>
                </a>
                <a href="https://www.linkedin.com/in/pratham-u/" target="_blank" rel="noreferrer" className="btn-custom btn-outline-dark z-20" style={{ padding: '10px 20px', fontSize: '13px' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  <span>LINKEDIN PROFILE</span>
                </a>
              </div>
            </div>

            <div className="hero-image fade-in-up flex-1 flex justify-center lg:justify-end w-full" style={{ transitionDelay: '0.2s' }}>
              <TiltCard>
                <div className="relative w-80 h-[420px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 flex">
                  <div className="w-full h-full rounded-xl overflow-hidden bg-zinc-900 border border-white/5 relative">
                    <Image src={profilePic} alt="Profile Picture" fill sizes="(max-width: 768px) 100vw, 350px" className="object-cover" priority />
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="section-pad relative z-10 overflow-hidden">
          <div className="section-watermark" aria-hidden="true">01</div>
          <div className="container-custom relative z-10 fade-in-up">
            <div className="section-header mb-12">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px bg-zinc-800 w-8" />
                <span className="text-xs font-bold tracking-[0.3em] text-zinc-400 uppercase">ABOUT</span>
              </div>
              <h2 className="section-title text-4xl font-bold tracking-tighter mb-4">About Me</h2>
              <p className="section-subtitle text-lg text-zinc-400">My professional objective and focus.</p>
            </div>
            <div className="max-w-3xl text-xl text-zinc-300 leading-relaxed space-y-6">
              <p>
                I am an Artificial Intelligence and Machine Learning Engineering student who enjoys turning ideas into practical, user-focused products. My interest in technology began in school through simple web development experiments and grew into a passion for building solutions that make everyday tasks easier.
              </p>
              <p>
                Over time, I became particularly interested in AI and Machine Learning because of their ability to uncover patterns, automate processes, and create intelligent applications that solve real-world problems. Since then, I have worked on projects that combine AI, software development, and modern web technologies to transform ideas into functional products.
              </p>
              <p>
                My approach to development is highly iterative. I enjoy rapidly prototyping, testing concepts, and refining solutions based on user needs and feedback. While I leverage modern AI tools to accelerate development, I focus on product design, problem-solving, user experience, and ensuring that the final solution delivers real value.
              </p>
              <p>
                I am currently seeking opportunities to learn from experienced engineers, deepen my understanding of scalable software systems, and contribute to teams building impactful technology. My goal is to combine strong engineering fundamentals with AI-driven innovation to create products that are both useful and meaningful.
              </p>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="section-pad relative z-10 overflow-hidden">
          <div className="section-watermark" aria-hidden="true">02</div>
          <div className="container-custom relative z-10">
            <div className="section-header fade-in-up mb-16">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px bg-zinc-800 w-8" />
                <span className="text-xs font-bold tracking-[0.3em] text-zinc-400 uppercase">SKILLS</span>
              </div>
              <h2 className="section-title text-4xl text-white tracking-tighter font-bold mb-4">Technical Skills</h2>
              <p className="section-subtitle text-zinc-400">Technologies and tools I work with.</p>
            </div>
            
            <div className="skills-grid">
              {/* Category 1 */}
              <TiltCard className="skill-category fade-in-up group rounded-xl p-8 border border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-3 transition-colors group-hover:text-blue-400">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                  Languages
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {['Java', 'Python', 'C/C++', 'C#', 'JavaScript', 'TypeScript', 'HTML5/CSS3', 'SQL', 'R'].map(s => <span key={s} className="skill-badge">{s}</span>)}
                </div>
              </TiltCard>

              {/* Category 2 */}
              <TiltCard className="skill-category fade-in-up group rounded-xl p-8 border border-white/10 bg-white/5 backdrop-blur-xl" style={{ transitionDelay: '0.1s' }}>
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-3 transition-colors group-hover:text-blue-400">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                  Frontend Frameworks
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {['React', 'Tailwind CSS', 'Material-UI', 'Vite', 'Expo'].map(s => <span key={s} className="skill-badge">{s}</span>)}
                </div>
              </TiltCard>

              {/* Category 3 */}
              <TiltCard className="skill-category fade-in-up group rounded-xl p-8 border border-white/10 bg-white/5 backdrop-blur-xl" style={{ transitionDelay: '0.2s' }}>
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-3 transition-colors group-hover:text-blue-400">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="8" rx="2"></rect><rect x="2" y="14" width="20" height="8" rx="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
                  Backend Frameworks
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {['Node.js', 'Express.js', 'FastAPI', 'Flask'].map(s => <span key={s} className="skill-badge">{s}</span>)}
                </div>
              </TiltCard>

              {/* Category 4 */}
              <TiltCard className="skill-category fade-in-up group rounded-xl p-8 border border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-3 transition-colors group-hover:text-blue-400">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
                  Databases & Cloud
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {['PostgreSQL', 'MySQL', 'MongoDB', 'Supabase', 'Firebase', 'Google Cloud', 'Netlify', 'Vercel', 'Render'].map(s => <span key={s} className="skill-badge">{s}</span>)}
                </div>
              </TiltCard>

              {/* Category 5 */}
              <TiltCard className="skill-category fade-in-up group rounded-xl p-8 border border-white/10 bg-white/5 backdrop-blur-xl" style={{ transitionDelay: '0.1s' }}>
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-3 transition-colors group-hover:text-blue-400">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                  AI & ML Tools
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {['scikit-learn', 'pandas', 'NumPy', 'Matplotlib', 'OpenCV'].map(s => <span key={s} className="skill-badge">{s}</span>)}
                </div>
              </TiltCard>

              {/* Category 6 */}
              <TiltCard className="skill-category fade-in-up group rounded-xl p-8 border border-white/10 bg-white/5 backdrop-blur-xl" style={{ transitionDelay: '0.2s' }}>
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-3 transition-colors group-hover:text-blue-400">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
                  DevOps & Automation
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {['Git', 'GitHub', 'Docker', 'n8n', 'UiPath'].map(s => <span key={s} className="skill-badge">{s}</span>)}
                </div>
              </TiltCard>
            </div>
          </div>
        </section>

        {/* ECOSYSTEM */}
        <section id="ecosystem" className="py-24 overflow-hidden relative z-10">
          <div className="container-custom fade-in-up mb-12">
             <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tighter text-white mb-4">Works seamlessly with your tech stack</h2>
                <p className="text-zinc-400">Integrating with my favorite technologies</p>
             </div>
          </div>
          
          <div className="carousel-wrapper fade-in-up hidden md:flex" style={{ transitionDelay: '0.1s' }}>
             <div className="animate-partner-carousel">
                {[
                  { id: 'react', file: 'react/react-original.svg' },
                  { id: 'nextjs', file: 'nextjs/nextjs-original.svg' },
                  { id: 'nodejs', file: 'nodejs/nodejs-original.svg' },
                  { id: 'mongodb', file: 'mongodb/mongodb-original-wordmark.svg' },
                  { id: 'postgresql', file: 'postgresql/postgresql-original-wordmark.svg' },
                  { id: 'python', file: 'python/python-original.svg' },
                  { id: 'docker', file: 'docker/docker-original-wordmark.svg' },
                  { id: 'tailwindcss', file: 'tailwindcss/tailwindcss-original.svg' }
                ].map((icon, i) => (
                  <div key={i} className="carousel-item-box bg-white/5 border border-white/10">
                    <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon.file}`} alt={icon.id} width={48} height={48} className="brightness-200 grayscale opacity-70 hover:opacity-100 transition-opacity" style={{ filter: 'invert(1) grayscale(100%) brightness(2)' }} />
                  </div>
                ))}
             </div>
             <div className="animate-partner-carousel" aria-hidden="true">
                {[
                  { id: 'react', file: 'react/react-original.svg' },
                  { id: 'nextjs', file: 'nextjs/nextjs-original.svg' },
                  { id: 'nodejs', file: 'nodejs/nodejs-original.svg' },
                  { id: 'mongodb', file: 'mongodb/mongodb-original-wordmark.svg' },
                  { id: 'postgresql', file: 'postgresql/postgresql-original-wordmark.svg' },
                  { id: 'python', file: 'python/python-original.svg' },
                  { id: 'docker', file: 'docker/docker-original-wordmark.svg' },
                  { id: 'tailwindcss', file: 'tailwindcss/tailwindcss-original.svg' }
                ].map((icon, i) => (
                  <div key={i+"dup"} className="carousel-item-box bg-white/5 border border-white/10">
                    <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon.file}`} alt={icon.id} width={48} height={48} className="brightness-200 grayscale opacity-70 hover:opacity-100 transition-opacity" style={{ filter: 'invert(1) grayscale(100%) brightness(2)' }} />
                  </div>
                ))}
             </div>
          </div>
          <div className="carousel-wrapper fade-in-up hidden md:flex" style={{ transitionDelay: '0.2s', paddingTop: 0 }}>
             <div className="animate-partner-carousel-reverse">
                {[
                  { id: 'express', file: 'express/express-original-wordmark.svg' },
                  { id: 'supabase', file: 'supabase/supabase-original.svg' },
                  { id: 'vercel', file: 'vercel/vercel-original-wordmark.svg' },
                  { id: 'html5', file: 'html5/html5-original.svg' },
                  { id: 'css3', file: 'css3/css3-original.svg' },
                  { id: 'git', file: 'git/git-original.svg' },
                  { id: 'github', file: 'github/github-original-wordmark.svg' },
                  { id: 'ubuntu', file: 'ubuntu/ubuntu-original.svg' }
                ].map((icon, i) => (
                  <div key={i} className="carousel-item-box bg-white/5 border border-white/10">
                    <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon.file}`} alt={icon.id} width={48} height={48} className="brightness-200 grayscale opacity-70 hover:opacity-100 transition-opacity" style={{ filter: 'invert(1) grayscale(100%) brightness(2)' }} />
                  </div>
                ))}
             </div>
             <div className="animate-partner-carousel-reverse" aria-hidden="true">
                {[
                  { id: 'express', file: 'express/express-original-wordmark.svg' },
                  { id: 'supabase', file: 'supabase/supabase-original.svg' },
                  { id: 'vercel', file: 'vercel/vercel-original-wordmark.svg' },
                  { id: 'html5', file: 'html5/html5-original.svg' },
                  { id: 'css3', file: 'css3/css3-original.svg' },
                  { id: 'git', file: 'git/git-original.svg' },
                  { id: 'github', file: 'github/github-original-wordmark.svg' },
                  { id: 'ubuntu', file: 'ubuntu/ubuntu-original.svg' }
                ].map((icon, i) => (
                  <div key={i+"dup"} className="carousel-item-box bg-white/5 border border-white/10">
                    <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon.file}`} alt={icon.id} width={48} height={48} className="brightness-200 grayscale opacity-70 hover:opacity-100 transition-opacity" style={{ filter: 'invert(1) grayscale(100%) brightness(2)' }} />
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="section-pad relative z-10 overflow-hidden">
          <div className="section-watermark" aria-hidden="true">03</div>
          <div className="container-custom relative z-10 md:px-0">
             <div className="section-header fade-in-up mb-16 md:px-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-px bg-zinc-800 w-8" />
                  <span className="text-xs font-bold tracking-[0.3em] text-zinc-400 uppercase">PROJECTS</span>
                </div>
                <h2 className="section-title text-4xl tracking-tighter font-bold text-white mb-4">Featured Projects</h2>
                <p className="section-subtitle text-zinc-400">Scroll sideways to view</p>
             </div>

             <div className="projects-grid md:px-6">
                {/* P1 */}
                <TiltCard className="project-card border-white/10">
                   <div className="project-header">
                      <h3 className="project-title text-xl">ShieldVision</h3>
                      <div className="project-links">
                        <a href="https://github.com/Pratham-U-dev" target="_blank" rel="noreferrer" aria-label="GitHub Repository"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>
                      </div>
                   </div>
                   <div className="project-tech">
                      {['Next.js', 'MongoDB', 'Clerk', 'Python'].map(t=><span key={t} className="tech-tag">{t}</span>)}
                   </div>
                   <div className="project-content-reveal">
                      <p className="project-desc">AI-powered debit card fraud detection interface built for FinTech applications, designed to seamlessly identify anomalous transaction patterns.</p>
                      <ul className="project-bullets">
                        <li>Secured <strong className="text-white">Top 30 state-wide rank</strong> in the HACKTRIX hackathon.</li>
                        <li>Engineered secure authentication workflows with Clerk & MongoDB.</li>
                      </ul>
                   </div>
                </TiltCard>

                {/* P2 */}
                <TiltCard className="project-card border-white/10" style={{ transitionDelay: '0.1s' }}>
                   <div className="project-header">
                      <h3 className="project-title text-xl">Aetherion</h3>
                      <div className="project-links">
                        <a href="https://github.com/Pratham-U-dev" target="_blank" rel="noreferrer" aria-label="GitHub Repository"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>
                      </div>
                   </div>
                   <div className="project-tech">
                      {['React.js', 'Supabase', 'Solidity', 'Aptos'].map(t=><span key={t} className="tech-tag">{t}</span>)}
                   </div>
                   <div className="project-content-reveal">
                      <p className="project-desc">A robust blockchain-based certificate verification platform preventing academic credential forgery using decentralized ledgers.</p>
                      <ul className="project-bullets">
                        <li>Deployed smart contracts on the Aptos network.</li>
                        <li>Integrated Supabase PostgreSQL for high-speed metadata querying.</li>
                      </ul>
                   </div>
                </TiltCard>

                {/* P3 */}
                <TiltCard className="project-card border-white/10" style={{ transitionDelay: '0.2s' }}>
                   <div className="project-header">
                      <h3 className="project-title text-xl">Tech Pack</h3>
                      <div className="project-links">
                        <a href="https://github.com/Pratham-U-dev" target="_blank" rel="noreferrer" aria-label="GitHub Repository"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>
                      </div>
                   </div>
                   <div className="project-tech">
                      {['Node.js', 'EJS', 'Gemini API', 'PostgreSQL'].map(t=><span key={t} className="tech-tag">{t}</span>)}
                   </div>
                   <div className="project-content-reveal">
                      <p className="project-desc">An AI-assisted documentation tool that automates the generation of complex product specs and technical manuals.</p>
                      <ul className="project-bullets">
                        <li>Automated documentation workflows using the Gemini API.</li>
                        <li>Built a scalable Node.js backend to handle heavy text-processing loads.</li>
                      </ul>
                   </div>
                </TiltCard>
             </div>
          </div>
        </section>

        {/* EDUCATION SECTION */}
        <section id="education" className="section-pad z-10 relative overflow-hidden">
          <div className="section-watermark" aria-hidden="true">04</div>
          <div className="container-custom">
            <div className="section-header fade-in-up mb-16">
               <div className="flex items-center gap-4 mb-4">
                  <div className="h-px bg-zinc-800 w-8" />
                  <span className="text-xs font-bold tracking-[0.3em] text-zinc-400 uppercase">MILESTONES</span>
                </div>
               <h2 className="section-title text-4xl font-bold tracking-tighter text-white mb-4">Education & Achievements</h2>
               <p className="section-subtitle text-zinc-400">Academic background and key progress.</p>
            </div>
            
            <div className="timeline relative">
              <div className="timeline-item fade-in-up group">
                <div className="timeline-marker" />
                <TiltCard className="timeline-content bg-white/5 border border-white/10 group-hover:border-blue-400/40">
                   <h3 className="timeline-title text-white">B.E. in Artificial Intelligence & Machine Learning</h3>
                   <div className="timeline-org text-blue-400">St. Joseph Engineering College, Mangaluru</div>
                   <div className="timeline-date font-mono">2023 – 2027</div>
                   <p className="timeline-desc mt-2">
                     <strong className="text-zinc-300">CGPA: 9.28 / 10.0</strong><br/>
                     Relevant Coursework: Machine Learning, Database Management Systems (DBMS), Operating Systems (OS), Deep Learning.
                   </p>
                </TiltCard>
              </div>

              <div className="timeline-item fade-in-up group">
                <div className="timeline-marker" />
                <TiltCard className="timeline-content bg-white/5 border border-white/10 group-hover:border-blue-400/40">
                   <h3 className="timeline-title text-white">Class 12 (Pre-University)</h3>
                   <div className="timeline-org text-blue-400">MGC PU College</div>
                   <div className="timeline-date font-mono">Graduated 2023</div>
                   <p className="timeline-desc mt-2">
                     <strong className="text-zinc-300">Score: 92.5%</strong><br/>
                     Completed core science curriculum with high distinction.
                   </p>
                </TiltCard>
              </div>

              <div className="timeline-item fade-in-up group">
                <div className="timeline-marker" />
                <TiltCard className="timeline-content bg-white/5 border border-white/10 group-hover:border-blue-400/40">
                   <h3 className="timeline-title text-white">Class 10 (High School)</h3>
                   <div className="timeline-org text-blue-400">MGC Higher Primary School</div>
                   <div className="timeline-date font-mono">Graduated 2021</div>
                   <p className="timeline-desc mt-2">
                     <strong className="text-zinc-300">Score: 95.68%</strong>
                   </p>
                </TiltCard>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer id="contact">
        <div className="container-custom fade-in-up">
          <div className="footer-grid items-center">
            <div className="footer-info">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px bg-zinc-800 w-8" />
                <span className="text-xs font-bold tracking-[0.3em] text-zinc-400 uppercase">CONTACT</span>
              </div>
              <h2 className="text-5xl font-bold tracking-tighter text-white mb-6">Let&apos;s build together.</h2>
              <p className="text-lg text-zinc-400 leading-relaxed max-w-md mb-8">
                I&apos;m always open to discussing product design work, AI integrations, and full-stack engineering opportunities.
              </p>
              
              <form className="flex flex-col gap-4 max-w-md relative z-20" onSubmit={handleSubmit}>
                <div className="group relative">
                  <input type="email" name="email" required placeholder="Enter your email" className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-blue-400/60 focus:ring-1 focus:ring-blue-400/60 transition-all placeholder:text-zinc-600" />
                  <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-400 text-xs mt-1" />
                </div>
                <div className="group relative">
                  <textarea name="message" required rows={3} placeholder="Your message" className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-blue-400/60 focus:ring-1 focus:ring-blue-400/60 transition-all placeholder:text-zinc-600 resize-none" />
                  <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400 text-xs mt-1" />
                </div>
                <button type="submit" disabled={state.submitting} className="btn-custom text-white border-white/10 hover:border-blue-400/60 py-4 mt-2 w-full disabled:opacity-50 text-center block">
                  <span>{state.submitting ? 'Sending...' : contactSubmitted ? 'Message Sent ✓' : 'Send Message'}</span>
                </button>
              </form>
            </div>

            <div className="flex flex-col items-center gap-8 border-l border-white/10 pl-8 ml-auto">
               <ChaiCup submitted={contactSubmitted} />
               <div className="contact-links pl-0 items-start w-full gap-4 mt-6">
                 <a href="mailto:pratham.u05@gmail.com" className="contact-link hover-underline-slide">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    pratham.u05@gmail.com
                 </a>
                 <a href="tel:+917619581697" className="contact-link hover-underline-slide">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    +91 7619581697
                 </a>
                 <a href="https://www.linkedin.com/in/pratham-u/" target="_blank" rel="noreferrer" className="contact-link hover-underline-slide">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    LinkedIn Profile
                 </a>
               </div>
            </div>
          </div>
          <div className="footer-bottom mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between text-zinc-400 font-mono text-xs">
            <span>&copy; {new Date().getFullYear()} Pratham U. All rights reserved.</span>
            <span>Handcrafted in India</span>
          </div>
        </div>
      </footer>
    </>
  );
}
