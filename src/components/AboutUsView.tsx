import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  HardHat, 
  ShieldCheck, 
  Clock, 
  Award, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  FileText, 
  X, 
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface Leader {
  name: string;
  role: string;
  exp: string;
  desc: string;
  bio: string;
  projects: string[];
}

export const AboutUsView: React.FC = () => {
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);
  
  // Quote form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'General Construction',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', phone: '', service: 'General Construction', message: '' });
    }, 4000);
  };

  const leaders: Leader[] = [
    { 
      name: "Marcus Vance", 
      role: "CEO & Founder", 
      exp: "28 Years Experience", 
      desc: "Former Chief Structural Engineer overseeing landmark mega-structures across North America.",
      bio: "Marcus founded BuildPro in 2001 with a vision to revolutionize high-rise engineering through safety-first methodologies and advanced digital modeling. Under his leadership, BuildPro has completed over 450 major infrastructural and commercial projects.",
      projects: ["Metropolitan Tower (Chicago)", "Apex Financial Plaza", "Horizon Transit Hub"]
    },
    { 
      name: "Elena Rostova", 
      role: "VP of Engineering & BIM", 
      exp: "22 Years Experience", 
      desc: "Pioneered automated structural stress testing and digital twin coordination protocols.",
      bio: "Elena leads our 120+ strong engineering division. She spearheaded the adoption of real-time 3D BIM coordination, eliminating on-site collision errors by 99.4% across all active developments.",
      projects: ["Vertex Science Center", "Grand Skyline Residences", "Pacific Logistics Park"]
    },
    { 
      name: "David Chen", 
      role: "Chief Safety Officer", 
      exp: "25 Years Experience", 
      desc: "Holds a pristine OSHA safety record across 400+ high-rise construction projects.",
      bio: "David oversees our zero-accident safety culture. His rigorous continuous training protocols and daily hazard inspection routines have earned BuildPro the prestigious OSHA Gold Standard for 12 consecutive years.",
      projects: ["National Safety Audit Program", "Civic Arena Redevelopment", "Harbor Bridge Expansion"]
    },
    { 
      name: "Sarah Jenkins", 
      role: "Director of Sustainable Dev", 
      exp: "18 Years Experience", 
      desc: "Specializes in LEED Platinum materials sourcing and net-zero carbon building methods.",
      bio: "Sarah is a pioneer in green building technologies. She ensures every BuildPro project integrates energy-efficient HVAC architecture, recycled structural steel, and net-zero carbon concrete composites.",
      projects: ["EcoSphere Corporate Campus", "GreenValley Residential", "Solaris Energy Hub"]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden">

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-36 pb-24 lg:pt-44 lg:pb-32 overflow-hidden border-b border-slate-800/80">
        {/* Background Image & Ambient Gradients */}
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1.05, opacity: 0.4 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            src="/src/assets/images/hero_about_construction_1794813107821.jpg" 
            alt="BuildPro Construction Site" 
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
          {/* Ambient Glow Orb */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Content Container - Constrained and Centered */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            {/* Animated Badge */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm shadow-sm"
            >
              <HardHat className="w-4 h-4 text-orange-400 animate-pulse" /> About BuildPro Corporation
            </motion.div>

            {/* Headline with Fade-in and Glow */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-[1.1] drop-shadow-md"
            >
              BUILDING YOUR VISION, <br className="hidden sm:inline" />
              <span className="text-orange-500 bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">CREATING REALITY</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed font-normal max-w-2xl"
            >
              For over 25 years, BuildPro has stood at the forefront of engineering innovation, general construction, and large-scale infrastructural development. We transform complex architectural blueprints into landmark realities with uncompromising safety and precision.
            </motion.p>

            {/* Primary Action Buttons with Micro-interactions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4"
            >
              <motion.a 
                href="#story" 
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="px-6 py-3.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-orange-600/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                Explore Our Heritage <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.a>
              <motion.a 
                href="#contact" 
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="px-6 py-3.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer backdrop-blur-sm shadow-md"
              >
                Speak With Our Engineers
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= KEY STATS BAR ================= */}
      <section className="bg-slate-900/80 border-b border-slate-800 py-12 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { stat: "25+", label: "Years of Excellence" },
            { stat: "450+", label: "Completed Projects" },
            { stat: "120+", label: "Expert Engineers" },
            { stat: "99%", label: "On-Time Delivery" }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="p-4 border-r border-slate-800/80 last:border-r-0 cursor-default"
            >
              <div className="text-4xl lg:text-5xl font-black text-orange-500 tabular-nums mb-2">{item.stat}</div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= SECTION 1: COMPANY STORY ================= */}
      <section id="story" className="py-20 border-b border-slate-800/80 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <span className="text-orange-500 text-xs font-bold uppercase tracking-widest block mb-2">Chapter 01</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">COMPANY STORY & HERITAGE</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Left Image with Hover Zoom */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl group cursor-pointer">
                <img 
                  src="/src/assets/images/about_company_team_1794813107894.jpg" 
                  alt="BuildPro Engineering Team" 
                  className="w-full h-[360px] sm:h-[420px] object-cover group-hover:scale-108 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Building Success Through Expertise & Safety</h3>
              <p className="text-slate-300 leading-relaxed text-base">
                Founded in 2001, BuildPro has grown from a boutique general contracting firm into an industry-leading construction and infrastructure powerhouse. Our success is built upon a foundation of rigorous engineering discipline, transparent project management, and an unwavering zero-accident safety culture.
              </p>
              <p className="text-slate-300 leading-relaxed text-base">
                We partner with top-tier real estate developers, municipal agencies, and corporate enterprises to deliver iconic commercial complexes, sustainable residential developments, and critical infrastructure facilities across the nation.
              </p>

              {/* Sub-cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <motion.div 
                  whileHover={{ y: -4, borderColor: 'rgba(249, 115, 22, 0.5)' }}
                  className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3.5 transition-all shadow-md cursor-default"
                >
                  <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white text-sm">Turnkey Execution</h4>
                    <p className="text-xs text-slate-400 mt-1">From initial geotechnical survey to final interior fit-out.</p>
                  </div>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -4, borderColor: 'rgba(249, 115, 22, 0.5)' }}
                  className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3.5 transition-all shadow-md cursor-default"
                >
                  <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white text-sm">Advanced BIM Integration</h4>
                    <p className="text-xs text-slate-400 mt-1">Real-time 3D modeling and collision detection.</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 2: EXECUTIVE LEADERSHIP ================= */}
      <section id="leadership" className="py-20 border-b border-slate-800/80 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
          >
            <div>
              <span className="text-orange-500 text-xs font-bold uppercase tracking-widest block mb-2">Chapter 02</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">EXECUTIVE LEADERSHIP TEAM</h2>
            </div>
            <p className="text-xs text-slate-400">Click any leader card to view full executive background & project portfolio.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leaders.map((member, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02, borderColor: 'rgba(249, 115, 22, 0.6)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedLeader(member)}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 transition-all group shadow-xl cursor-pointer flex flex-col justify-between relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full blur-xl group-hover:bg-orange-500/15 transition-all pointer-events-none" />
                <div>
                  <motion.div 
                    whileHover={{ rotate: 8, scale: 1.1 }}
                    className="w-13 h-13 rounded-xl bg-orange-600/20 text-orange-500 flex items-center justify-center font-bold text-lg mb-5 group-hover:bg-orange-600 group-hover:text-white transition-colors shadow-sm"
                  >
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </motion.div>
                  <h4 className="text-base font-bold text-white mb-1 group-hover:text-orange-400 transition-colors">{member.name}</h4>
                  <p className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-2">{member.role}</p>
                  <p className="text-xs font-medium text-slate-400 mb-3">{member.exp}</p>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">{member.desc}</p>
                </div>
                <div className="pt-4 mt-5 border-t border-slate-800 text-xs text-orange-400 font-semibold flex items-center justify-between">
                  <span>Verified Executive</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADER DETAIL MODAL */}
      <AnimatePresence>
        {selectedLeader && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative"
            >
              <button 
                onClick={() => setSelectedLeader(null)}
                className="absolute top-6 right-6 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-orange-600/30">
                  {selectedLeader.name.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedLeader.name}</h3>
                  <p className="text-xs font-semibold text-orange-400 uppercase tracking-wider">{selectedLeader.role}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{selectedLeader.exp}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Executive Background</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">{selectedLeader.bio}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Key Landmark Projects</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedLeader.projects.map((proj: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-orange-300 font-medium">
                        {proj}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 flex justify-end">
                <button 
                  onClick={() => setSelectedLeader(null)}
                  className="px-6 py-2.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-md"
                >
                  Close Profile
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= SECTION 3: SAFETY & STANDARDS ================= */}
      <section id="safety" className="py-20 border-b border-slate-800/80 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <span className="text-orange-500 text-xs font-bold uppercase tracking-widest block mb-2">Chapter 03</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">SAFETY & QUALITY STANDARDS</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            {/* Left Certifications */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Uncompromising Safety & Quality Standards</h3>
              <p className="text-slate-300 leading-relaxed text-base">
                At BuildPro, safety is not merely a policy—it is our core operating principle. Every engineer, supervisor, and contractor on our sites undergoes rigorous continuous safety training exceeding national regulatory mandates.
              </p>
              <div className="space-y-4 pt-2">
                {[
                  { title: "OSHA Gold Safety Standard", desc: "Zero major incident rating maintained for 12 consecutive years.", icon: <ShieldCheck className="w-5 h-5" /> },
                  { title: "ISO 9001 Quality Management Certified", desc: "Strict end-to-end quality control on all construction materials.", icon: <Award className="w-5 h-5" /> },
                  { title: "LEED Platinum Accredited Builder", desc: "Committed to energy-efficient and eco-friendly structural design.", icon: <Building2 className="w-5 h-5" /> }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ x: 6, borderColor: 'rgba(249, 115, 22, 0.5)' }}
                    className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-4 transition-all shadow-sm cursor-default"
                  >
                    <div className="w-11 h-11 rounded-xl bg-orange-600/20 text-orange-500 flex items-center justify-center font-bold shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{item.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right BIM Hub Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7 }}
            >
              <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 p-6 sm:p-8 hover:border-orange-500/40 transition-colors">
                <h4 className="text-base font-bold text-white mb-5 flex items-center gap-2">
                  <FileText className="text-orange-500 w-5 h-5" /> Project Command Center & BIM Hub
                </h4>
                <div className="rounded-xl overflow-hidden mb-5 border border-slate-800 group">
                  <img 
                    src="/src/assets/images/project_management_hub_1794813107610.jpg" 
                    alt="BIM Command Center" 
                    className="w-full h-52 object-cover group-hover:scale-108 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed">
                  Our central engineering office utilizes advanced 3D building information modeling (BIM) to simulate structural loads, airflow dynamics, and MEP routing prior to breaking ground.
                </p>
                <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-800">
                  <span>Audited Annually</span>
                  <span className="text-orange-400 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-orange-400" /> 100% Compliance Verified
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 4: MILESTONES ================= */}
      <section id="milestones" className="py-20 border-b border-slate-800/80 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <span className="text-orange-500 text-xs font-bold uppercase tracking-widest block mb-2">Chapter 04</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">COMPANY MILESTONES & HISTORY</h2>
          </motion.div>

          {/* Centered Timeline with Constrained Width */}
          <div className="max-w-3xl mx-auto py-4">
            <div className="space-y-6 relative before:absolute before:inset-0 before:left-6 before:w-0.5 before:bg-slate-800">
              {[
                { year: "2001", title: "Company Founded", desc: "Established in Chicago as a boutique structural engineering and general contracting firm." },
                { year: "2008", title: "Regional Infrastructure Leader", desc: "Expanded operations across the Midwest, completing major municipal transit and commercial complexes." },
                { year: "2015", title: "High-Rise Commercial Milestone", desc: "Completed our first 45-story commercial skyscraper featuring advanced sustainable glass facades." },
                { year: "2020", title: "BIM & Digital Twin Innovation", desc: "Integrated real-time AI analytics and 3D digital twinning into all active construction sites." },
                { year: "2026", title: "National Enterprise Leader", desc: "Recognized as a premier tier-one construction developer with over 450 completed landmarks." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ x: 6 }}
                  className="flex items-start gap-5 relative cursor-pointer group"
                >
                  <motion.div 
                    whileHover={{ scale: 1.15 }}
                    className="w-12 h-12 rounded-xl bg-orange-600 text-white font-black text-sm flex items-center justify-center shrink-0 z-10 shadow-lg shadow-orange-600/30 group-hover:bg-orange-500 transition-colors"
                  >
                    {item.year.slice(2)}
                  </motion.div>
                  <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex-1 shadow-lg group-hover:border-orange-500/50 transition-colors">
                    <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">{item.year}</span>
                    <h4 className="text-base sm:text-lg font-bold text-white mt-1 mb-1.5">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 5: WHY CHOOSE US ================= */}
      <section id="why-us" className="py-20 border-b border-slate-800/80 scroll-mt-24 bg-slate-900/40">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <span className="text-orange-500 text-xs font-bold uppercase tracking-widest block mb-2">Chapter 05</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">WHY CHOOSE BUILD PRO?</h2>
            <p className="text-slate-400 text-sm leading-relaxed">We combine decades of hands-on field experience with cutting-edge engineering standards.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Users className="w-6 h-6" />, title: "Experienced Team", desc: "Over 120 certified engineers, project managers, and veteran master builders with centuries of combined expertise." },
              { icon: <Award className="w-6 h-6" />, title: "Quality Craftsmanship", desc: "Rigorous material sourcing, precision structural fabrication, and uncompromising architectural finish standards." },
              { icon: <ShieldCheck className="w-6 h-6" />, title: "Safety & Reliability", desc: "OSHA Gold standard compliance with zero tolerance for safety shortcuts across all active work sites." },
              { icon: <Clock className="w-6 h-6" />, title: "On-Time Delivery", desc: "Advanced schedule tracking, milestone transparency, and guaranteed project handover deadlines." }
            ].map((pillar, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.02, borderColor: 'rgba(249, 115, 22, 0.6)' }}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 transition-all group shadow-xl flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <motion.div 
                    whileHover={{ rotate: 12, scale: 1.15 }}
                    className="w-12 h-12 rounded-xl bg-orange-600/10 text-orange-500 flex items-center justify-center mb-5 group-hover:bg-orange-600 group-hover:text-white transition-colors shadow-sm"
                  >
                    {pillar.icon}
                  </motion.div>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">{pillar.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{pillar.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 6: CONTACT & QUOTE FORM ================= */}
      <section id="contact" className="py-20 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            
            {/* Left Side: Contact Information */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <div>
                <span className="text-orange-500 text-xs font-bold uppercase tracking-widest block mb-2">Get In Touch</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">CONNECT WITH OUR EXPERTS</h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Ready to discuss your next commercial development or infrastructure project? Our engineering consultants are available 24/7 to review your blueprints.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <motion.div 
                  whileHover={{ x: 6, borderColor: 'rgba(249, 115, 22, 0.5)' }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800 transition-all cursor-pointer shadow-sm"
                >
                  <div className="w-11 h-11 rounded-xl bg-orange-600/20 text-orange-500 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Call Us Today</h4>
                    <p className="text-base font-bold text-white mt-0.5">+123 456 7890</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 6, borderColor: 'rgba(249, 115, 22, 0.5)' }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800 transition-all cursor-pointer shadow-sm"
                >
                  <div className="w-11 h-11 rounded-xl bg-orange-600/20 text-orange-500 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Inquiry</h4>
                    <p className="text-base font-bold text-white mt-0.5">Info@buildpro.com</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 6, borderColor: 'rgba(249, 115, 22, 0.5)' }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800 transition-all cursor-pointer shadow-sm"
                >
                  <div className="w-11 h-11 rounded-xl bg-orange-600/20 text-orange-500 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Headquarters</h4>
                    <p className="text-base font-bold text-white mt-0.5">1234 Construction Ave, City, State 56789</p>
                  </div>
                </motion.div>
              </div>

              {/* Reference Screenshot Banner */}
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between shadow-xl"
              >
                <div>
                  <h4 className="font-bold text-white text-xs mb-1">Original Design Reference</h4>
                  <p className="text-[11px] text-slate-400">Extracted from BuildPro dark construction UI template.</p>
                </div>
                <a 
                  href="/assets/aistudio/latest_template_612dda8b.jpg" 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-orange-400 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shrink-0"
                >
                  View Screenshot <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            </motion.div>

            {/* Right Side: Request a Free Quote Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7 }}
              id="quote" 
              className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl scroll-mt-24"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-5">REQUEST A FREE QUOTE</h3>

              {formSubmitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Quote Request Received!</h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto">
                    Thank you, <span className="text-orange-400 font-semibold">{formData.name}</span>. Our lead estimator will contact you within 2 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">Your Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="John Doe" 
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">Your Email</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="john@company.com" 
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">Phone Number</label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+1 (555) 000-0000" 
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">Service Required</label>
                    <select 
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500 transition-colors"
                    >
                      <option value="General Construction">General Construction</option>
                      <option value="Project Management">Project Management & BIM</option>
                      <option value="Renovation & Infrastructure">Renovation & Infrastructure</option>
                      <option value="Sustainable & LEED Build">Sustainable & LEED Build</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">Project Details / Message</label>
                    <textarea 
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Describe your project scope, location, and timeline..." 
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500 transition-colors resize-none"
                    ></textarea>
                  </div>

                  <motion.button 
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-orange-600/30 transition-all cursor-pointer"
                  >
                    SEND REQUEST
                  </motion.button>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-10">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-orange-600 flex items-center justify-center text-white font-bold">
              <Building2 className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-white tracking-wider">BUILD <span className="text-orange-500">PRO</span></span>
          </div>

          <p className="text-xs text-slate-500 text-center md:text-left">
            © 2026 BuildPro Construction & Development Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-xs font-medium text-slate-400">
            <a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Safety Compliance</a>
          </div>
        </div>
      </footer>

    </div>
  );
};
export default AboutUsView;
