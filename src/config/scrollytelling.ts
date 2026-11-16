export interface ConstructionStage {
  id: string;
  phaseNumber: string;
  phaseLabel: string;
  title: string;
  subtitle: string;
  description: string;
  startProgress: number; // 0 to 1
  endProgress: number;   // 0 to 1
  startFrame: number;    // 1 to 1200
  endFrame: number;      // 1 to 1200
  metrics?: { label: string; value: string }[];
}

export const SCROLLYTELLING_CONFIG = {
  // Total extracted WebP video frames in /public/frames/
  frameCount: 1200,

  // Frame path generator: frame_00001.webp -> frame_01200.webp
  getFramePath: (index: number): string => {
    const clampedIndex = Math.max(1, Math.min(1200, index));
    const padded = String(clampedIndex).padStart(5, '0');
    return `/frames/frame_${padded}.webp`;
  },

  // Virtual scroll container height (delivers slow, cinematic scrubbing)
  scrollHeight: '900vh',

  // Inertial scrub smoothing (0.5 for fluid damping without lag)
  scrubDamping: 0.12,

  // Initial priority preloading batch size
  initialPreloadCount: 60,

  // Background lazy-loading batch size
  lazyBatchSize: 24,

  // 5 Storytelling Construction Stages mapped to the 1200 frames
  stages: [
    {
      id: 'site-groundwork',
      phaseNumber: '01',
      phaseLabel: 'SITE & GROUNDWORK',
      title: 'Earth & Topography',
      subtitle: 'SURVEY, EXCAVATION & SUB-BASE COMPACTION',
      description:
        'Precision geotechnical grading establishes the bedrock for the monolithic residence. Earthmoving machinery sculpts the natural contour of the land into engineered building plateaus.',
      startProgress: 0.04,
      endProgress: 0.22,
      startFrame: 1,
      endFrame: 260,
      metrics: [
        { label: 'Site Footprint', value: '1,450 m²' },
        { label: 'Excavation Depth', value: '-3.8 m' }
      ]
    },
    {
      id: 'foundation',
      phaseNumber: '02',
      phaseLabel: 'FOUNDATION',
      title: 'Monolithic Footing',
      subtitle: 'REINFORCED STEEL SKELETON & CONTINUOUS POUR',
      description:
        'A structural grid of high-tensile rebar cages is encased in 45-MPa waterproof concrete. Sub-slab vapor barriers and perimeter drainage systems guarantee lifelong structural integrity.',
      startProgress: 0.24,
      endProgress: 0.44,
      startFrame: 261,
      endFrame: 530,
      metrics: [
        { label: 'Reinforced Steel', value: '42 Tons' },
        { label: 'Concrete Volume', value: '620 m³' }
      ]
    },
    {
      id: 'structural-frame',
      phaseNumber: '03',
      phaseLabel: 'STRUCTURAL FRAME',
      title: 'Architectural Skeleton',
      subtitle: 'POST-TENSIONED BEAMS & UPPER FLOOR ELEVATION',
      description:
        'Vertical columns and post-tensioned horizontal beams define the double-height living volumes. Cantilevered floor decks project into the landscape, framing panoramic sightlines.',
      startProgress: 0.46,
      endProgress: 0.66,
      startFrame: 531,
      endFrame: 790,
      metrics: [
        { label: 'Ceiling Clearance', value: '4.2 m' },
        { label: 'Max Cantilever', value: '5.5 m' }
      ]
    },
    {
      id: 'enclosure-facade',
      phaseNumber: '04',
      phaseLabel: 'ENCLOSURE & FACADE',
      title: 'Envelope & Paneling',
      subtitle: 'ROOF CANOPY & FLOOR-TO-CEILING GLAZING',
      description:
        'Acoustically isolated floor-to-ceiling double glazing wraps the exterior envelope. Ventilated porcelain cladding and insulated roof parapets create a climate-responsive thermal barrier.',
      startProgress: 0.68,
      endProgress: 0.86,
      startFrame: 791,
      endFrame: 1030,
      metrics: [
        { label: 'Glazing Area', value: '380 m²' },
        { label: 'Thermal Efficiency', value: 'U-Value 0.8' }
      ]
    },
    {
      id: 'residence-completion',
      phaseNumber: '05',
      phaseLabel: 'THE MASTERPIECE',
      title: 'The Completed Residence',
      subtitle: 'BOTANICAL GROUNDS & ACCENT ILLUMINATION',
      description:
        'Mature specimen trees, travertine driveway paving, and a reflective infinity pool complete the architectural sanctuary. Warm architectural lighting articulates the villa at dusk.',
      startProgress: 0.88,
      endProgress: 1.0,
      startFrame: 1031,
      endFrame: 1200,
      metrics: [
        { label: 'Total Built Area', value: '820 m²' },
        { label: 'Project Status', value: 'Turnkey Handover' }
      ]
    }
  ] as ConstructionStage[],

  // Company and Consultation Stats
  companyStats: [
    { value: '18+', label: 'Years of Practice' },
    { value: '42', label: 'Private Estates Delivered' },
    { value: '14', label: 'International Design Awards' },
    { value: '100%', label: 'Turnkey Precision' }
  ]
};

