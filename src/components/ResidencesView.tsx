import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  X, 
  CheckCircle2,
  Compass,
  Award
} from 'lucide-react';

interface Project {
  id: string;
  number: string;
  title: string;
  location: string;
  category: 'coastal' | 'hillside' | 'desert' | 'alpine';
  area: string;
  year: string;
  image: string;
  tagline: string;
  materials: string[];
  description: string;
}

const PROJECTS: Project[] = [
  {
    id: 'villa-solis',
    number: '001',
    title: 'Villa Solis',
    location: 'Costa Brava, Spain',
    category: 'coastal',
    area: '1,420 m²',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    tagline: 'Cantilevered white travertine residence overlooking the Mediterranean.',
    materials: ['Cast-in-place Concrete', 'Roman Travertine', 'Triple Glazing', 'Brushed Bronze'],
    description:
      'Perched on a 45-degree granite cliff, Villa Solis features a 28-meter unsupported cantilever that floats above the sea. Subterranean anchoring with 18m rock bolts provides total seismic and wind isolation.'
  },
  {
    id: 'obsidian-pavilion',
    number: '002',
    title: 'The Obsidian Pavilion',
    location: 'Lake Como, Italy',
    category: 'hillside',
    area: '980 m²',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
    tagline: 'Dark fluted basalt monolith integrated into ancient terraced vineyards.',
    materials: ['Fluted Basalt', 'Smoked Oak', 'Bronze Louvers', 'Reflective Pool'],
    description:
      'Carved directly into Lombardy stone, this pavilion uses a green roof and passive geothermal cooling to blend seamlessly into the Alpine hillside while offering uninhibited lake views.'
  },
  {
    id: 'canyon-crest',
    number: '003',
    title: 'Canyon Crest Sanctuary',
    location: 'Beverly Hills, USA',
    category: 'hillside',
    area: '1,850 m²',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
    tagline: 'Post-tensioned architectural concrete framing the Los Angeles basin.',
    materials: ['Post-tensioned Slabs', 'Acoustic Glass', 'Calacatta Viola', 'Steel Portals'],
    description:
      'Engineered with column-free 60-foot glass spans, this estate creates an unbroken continuum between interior gallery living and exterior infinity terraces.'
  },
  {
    id: 'dune-house',
    number: '004',
    title: 'The Dune House',
    location: 'Al Zorah, UAE',
    category: 'desert',
    area: '2,100 m²',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=85',
    tagline: 'Rammed-earth and insulated concrete fortress framing desert dunes.',
    materials: ['Rammed Earth', 'Desert Limestone', 'Micro-perforated Screens', 'Shaded Courtyards'],
    description:
      'Responding to harsh desert climates, double-thick thermal mass walls keep interior ambient temperatures at 21°C year-round with 65% less energy than conventional villas.'
  },
  {
    id: 'alpine-monolith',
    number: '005',
    title: 'Alpine Monolith',
    location: 'St. Moritz, Switzerland',
    category: 'alpine',
    area: '1,150 m²',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85',
    tagline: 'Hand-chiseled granite and triple-glazed curtain walls in the high Alps.',
    materials: ['Swiss Granite', 'Larch Timber', 'Heated Concrete Decks', 'Aero-gel Insulation'],
    description:
      'Engineered to withstand 4-meter snow loads, this high-altitude refuge combines heavy alpine stone craftsmanship with aerospace-grade aerogel insulation.'
  },
  {
    id: 'kyoto-forest-villa',
    number: '006',
    title: 'Kyoto Forest Villa',
    location: 'Kyoto, Japan',
    category: 'coastal',
    area: '880 m²',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
    tagline: 'Charred Yakisugi cedar and board-formed concrete overlooking bamboo groves.',
    materials: ['Yakisugi Cedar', 'Board-formed Concrete', 'Tatami Weaves', 'Blackened Steel'],
    description:
      'A serene dialogue between traditional Japanese wood joinery and brutalist architectural concrete, centered around a courtyard of ancient moss and koi ponds.'
  }
];

export const ResidencesView: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'coastal' | 'hillside' | 'desert' | 'alpine'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden">
      
      {/* ================= HERO SECTION (ZERO WHITESPACE, NO REDUNDANT IMAGE) ================= */}
      <section className="relative pt-36 pb-16 lg:pt-40 lg:pb-20 overflow-hidden border-b border-slate-800/80">
        {/* Architectural Ambient Gradients */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute -top-36 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-orange-600/10 rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-10 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-10 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 text-center">
          
          {/* Category Badge */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm shadow-sm"
          >
            <Building2 className="w-4 h-4 text-orange-400 animate-pulse" /> Architectural Portfolio // Selected Residences
          </motion.div>

          {/* Centered Grand Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-[1.1] drop-shadow-md"
          >
            MONOLITHIC FORMS, <br className="hidden sm:inline" />
            <span className="text-orange-500 bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
              SCULPTED SANCTUARIES
            </span>
          </motion.h1>

          {/* Subtitle / Manifesto */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed font-normal max-w-2xl mx-auto"
          >
            Each private villa is engineered as an immutable architectural sculpture, tailored to the unique geology, natural light, and microclimate of its landscape. Discover our curated catalog of custom-commissioned residences.
          </motion.p>

          {/* Interactive Category Filter Pills with Live Item Counts */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap justify-center gap-2.5 mb-12"
          >
            {[
              { key: 'all', label: 'All Residences', count: PROJECTS.length },
              { key: 'coastal', label: 'Coastal', count: PROJECTS.filter(p => p.category === 'coastal').length },
              { key: 'hillside', label: 'Hillside', count: PROJECTS.filter(p => p.category === 'hillside').length },
              { key: 'desert', label: 'Desert', count: PROJECTS.filter(p => p.category === 'desert').length },
              { key: 'alpine', label: 'Alpine', count: PROJECTS.filter(p => p.category === 'alpine').length },
            ].map((cat) => {
              const isActive = filter === cat.key;
              return (
                <motion.button
                  key={cat.key}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(cat.key as any)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30 border border-orange-500'
                      : 'bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800 hover:border-orange-500/40'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-black ${
                    isActive ? 'bg-orange-700/80 text-white' : 'bg-slate-950 text-slate-400'
                  }`}>
                    {cat.count}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Integrated 4-Pillar Architectural Matrix (Eliminates Whitespace completely) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left"
          >
            {[
              {
                icon: Layers,
                discipline: "STRUCTURAL MASTERY",
                title: "Monolithic Cantilevers",
                desc: "Post-tensioned slabs extending up to 28m without vertical columns.",
                metric: "Cat 4 Seismic Rated"
              },
              {
                icon: Compass,
                discipline: "BIOCLIMATIC CORE",
                title: "Passive Solar Mass",
                desc: "Geothermal regulation and automated thermal buffering systems.",
                metric: "STC 55 Sound Decoupled"
              },
              {
                icon: ShieldCheck,
                discipline: "BESPOKE CRAFT",
                title: "Authentic Materiality",
                desc: "Board-formed volcanic concrete, charred Yakisugi, and bronze.",
                metric: "100% Sourced & Tested"
              },
              {
                icon: Award,
                discipline: "PORTFOLIO REACH",
                title: "42+ Commissions",
                desc: "Private estates delivered across Mediterranean cliffs and Alpine peaks.",
                metric: "$450M+ Delivered Assets"
              }
            ].map((card, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-orange-500/50 transition-all text-left shadow-lg group backdrop-blur-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-orange-600/10 border border-orange-500/30 flex items-center justify-center text-orange-400 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                      <card.icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold tracking-wider text-orange-400 uppercase bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                      {card.discipline}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-orange-400 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] font-semibold text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                  <span>{card.metric}</span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Quick Commission Telemetry Ribbon */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 pt-8 mt-8 border-t border-slate-800/80"
          >
            <span className="flex items-center gap-1.5 font-medium text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-orange-500" /> 100% Bespoke Structural Engineering
            </span>
            <span className="flex items-center gap-1.5 font-medium text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-orange-500" /> Geotechnical Rock Anchoring
            </span>
            <span className="flex items-center gap-1.5 font-medium text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-orange-500" /> Passive Bioclimatic Design
            </span>
            <span className="flex items-center gap-1.5 font-medium text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-orange-500" /> STC 55 Acoustic Isolation
            </span>
          </motion.div>

        </div>
      </section>

      {/* ================= PROJECTS GRID ================= */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
          
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project, idx) => (
                <motion.article
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{ y: -8, scale: 1.02, borderColor: 'rgba(249, 115, 22, 0.6)' }}
                  onClick={() => setSelectedProject(project)}
                  className="p-0 rounded-2xl bg-slate-900 border border-slate-800 transition-all group shadow-xl cursor-pointer flex flex-col justify-between overflow-hidden"
                >
                  {/* Card Image Area */}
                  <div className="relative w-full h-60 overflow-hidden bg-slate-950">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      loading="lazy" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                      <span className="px-3 py-1 rounded-lg bg-orange-600/90 backdrop-blur-md text-white text-[11px] font-black tracking-wider uppercase shadow-md">
                        NO. {project.number}
                      </span>
                      <span className="px-3 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-slate-200 text-[11px] font-semibold border border-slate-800">
                        {project.area}
                      </span>
                    </div>

                    {/* Bottom Category Pill */}
                    <div className="absolute bottom-3 left-4">
                      <span className="px-2.5 py-1 rounded-md bg-slate-900/90 text-orange-400 text-[10px] font-bold uppercase tracking-widest border border-slate-800 backdrop-blur-sm">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      {/* Meta: Location & Year */}
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                        <span className="flex items-center gap-1 font-medium text-slate-300">
                          <MapPin className="w-3.5 h-3.5 text-orange-400" /> {project.location}
                        </span>
                        <span className="flex items-center gap-1 font-semibold text-slate-400">
                          <Calendar className="w-3.5 h-3.5" /> {project.year}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                        {project.title}
                      </h3>

                      {/* Tagline */}
                      <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">
                        {project.tagline}
                      </p>

                      {/* Material Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.materials.slice(0, 3).map((mat) => (
                          <span 
                            key={mat} 
                            className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[10px] font-medium text-slate-300"
                          >
                            {mat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-orange-400">
                      <span>VIEW ARCHITECTURAL DOSSIER</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ================= KEY STATS BAR ================= */}
      <section className="bg-slate-900/80 border-t border-b border-slate-800 py-12">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { stat: "42+", label: "Estates Delivered Worldwide" },
            { stat: "100%", label: "Turnkey Structural Engineering" },
            { stat: "14", label: "International Design Honors" },
            { stat: "$450M+", label: "Portfolio Commission Value" }
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

      {/* ================= PROJECT DETAIL MODAL ================= */}
      <AnimatePresence>
        {selectedProject && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl lg:max-w-4xl w-full shadow-2xl relative overflow-hidden my-auto flex flex-col md:flex-row max-h-[88vh]"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-3.5 right-3.5 z-30 p-2 rounded-lg bg-slate-950/80 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer border border-slate-800 shadow-md"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Image Column - Minimized & Clearly Visible */}
              <div className="md:w-5/12 bg-slate-950 p-4 flex flex-col justify-between relative border-b md:border-b-0 md:border-r border-slate-800 shrink-0">
                <div className="relative w-full h-52 sm:h-64 md:h-full min-h-[220px] rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-contain md:object-cover md:object-center rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                  {/* Top Badge */}
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2.5 py-1 rounded-md bg-orange-600/90 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-wider shadow">
                      NO. {selectedProject.number}
                    </span>
                  </div>

                  {/* Bottom Image Info */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-slate-200">
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-sm border border-slate-800">
                      <MapPin className="w-3 h-3 text-orange-400" /> {selectedProject.location}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-sm font-bold text-orange-400 border border-slate-800">
                      {selectedProject.area}
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Body Column - Compact & Clean */}
              <div className="md:w-7/12 p-5 sm:p-6 flex flex-col justify-between overflow-y-auto max-h-[55vh] md:max-h-[85vh] space-y-4">
                <div>
                  <span className="text-orange-500 text-[10px] font-bold uppercase tracking-widest block mb-1">
                    Architectural Dossier // {selectedProject.category.toUpperCase()}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white mb-1">
                    {selectedProject.title}
                  </h2>
                  <p className="text-xs font-medium text-orange-400/90 italic mb-3">
                    {selectedProject.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Material Composition */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-orange-400" /> Material Composition & Structural Fabric
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedProject.materials.map((m) => (
                      <div key={m} className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                        <span className="truncate">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Structural Classification */}
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-orange-400" /> Structural Classification
                  </h4>
                  <p className="text-slate-400 text-[10px] sm:text-[11px] leading-relaxed">
                    Category: <span className="text-orange-400 font-bold">{selectedProject.category.toUpperCase()}</span> // Wind Load: Cat 4 // Seismic: Zone 4 // Acoustic Rating: STC 55
                  </p>
                </div>

                {/* Footer Buttons */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2.5">
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <a
                    href="#contact"
                    onClick={() => setSelectedProject(null)}
                    className="px-5 py-2 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-orange-600/30 transition-all cursor-pointer"
                  >
                    Inquire On Residence
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= FOOTER ================= */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-10">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-orange-600 flex items-center justify-center text-white font-bold">
              <Building2 className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-white tracking-wider">FORM <span className="text-orange-500">RESIDENCES</span></span>
          </div>

          <p className="text-xs text-slate-500 text-center md:text-left">
            © 2026 FORM Architecture Group. All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-xs font-medium text-slate-400">
            <a href="#" className="hover:text-orange-400 transition-colors">Private Client Dossier</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Terms of Commission</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Global Portfolio</a>
          </div>
        </div>
      </footer>

    </div>
  );
};
export default ResidencesView;
