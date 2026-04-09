export type CreditRole =
  | 'Direction'
  | 'Cinematography'
  | 'Editing'
  | 'Sound Design'
  | 'Music'
  | 'Production'
  | 'Colour Grade'
  | 'Cast'
  | string

export type ProjectCategory = 'Short Film' | 'Music Video' | 'Experimental' | 'Commercial' | 'Documentary'
export type ProjectFormat    = 'Digital' | '16mm' | 'Super 8' | 'Anamorphic' | string

export type Still = {
  src:      string
  alt:      string
  caption?: string
}

export type Project = {
  id:          string
  slug:        string
  title:       string
  category:    ProjectCategory
  year:        number
  format?:     ProjectFormat
  role:        string
  synopsis:    string
  mood?:       string
  youtubeId:   string
  thumbnail:   string
  credits?:    Partial<Record<CreditRole, string>>
  stills?:     Still[]
  featured?:   boolean
  showreel?:   boolean
}

export const projects: Project[] = [
  {
    id:        'proj-001',
    slug:      'untitled-001',
    title:     'Kainchi',
    category:  'Short Film',
    year:      2024,
    format:    'Digital',
    role:      'Cinematographer / DOP',
    synopsis:  'A quiet study in light and absence. Two people in a room what remains unsaid fills the frame.',
    mood:      'Melancholic',
    youtubeId: 'jH8pdCJBQH0',
    thumbnail: 'https://img.youtube.com/vi/jH8pdCJBQH0/maxresdefault.jpg',
    credits:   { Direction: 'TBC', Cinematography: 'Parth Porwal', Editing: 'TBC' },
    stills:    [],
    featured:  true,
    showreel:  true,
  },
  {
    id:        'proj-002',
    slug:      'untitled-002',
    title:     'Anushruti Academy',
    category:  'Documentary',
    year:      2026,
    format:    'Digital',
    role:      'Cinematographer / DOP',
    synopsis:  'Movement as memory. A visual translation of sound into landscape and gesture.',
    mood:      'Intimate',
    youtubeId: 'vpOK0r0jlWs',
    thumbnail: 'https://img.youtube.com/vi/vpOK0r0jlWs/maxresdefault.jpg',
    credits:   { Direction: 'TBC', Cinematography: 'Parth Porwal' },
    stills:    [],
    featured:  true,
  },
  {
    id:        'proj-003',
    slug:      'untitled-003',
    title:     'Aaoge Tum Kabhi',
    category:  'Music Video',
    year:      2025,
    format:    'Digital',
    role:      'Cinematographer / DOP',
    synopsis:  'A single location. A shifting light. The architecture of a decision.',
    mood:      'Tense',
    youtubeId: 'IuIG7944SkM',
    thumbnail: 'https://img.youtube.com/vi/IuIG7944SkM/maxresdefault.jpg',
    credits:   { Direction: 'TBC', Cinematography: 'Parth Porwal' },
    stills:    [],
    featured:  true,
  },
  {
    id:        'proj-004',
    slug:      'untitled-004',
    title:     'Kasak',
    category:  'Short Film',
    year:      2025,
    format:    'Digital',
    role:      'Cinematographer / DOP',
    synopsis:  'Rhythm made visible. Each cut a breath, each frame a beat held one moment longer.',
    mood:      'Kinetic',
    youtubeId: 'ph4vPrZoBrE',
    thumbnail: 'https://img.youtube.com/vi/ph4vPrZoBrE/maxresdefault.jpg',
    credits:   { Direction: 'TBC', Cinematography: 'Parth Porwal' },
    stills:    [],
    featured:  true,
  },
  {
    id:        'proj-005',
    slug:      'untitled-005',
    title:     'Saanjh',
    category:  'Short Film',
    year:      2025,
    format:    'Digital',
    role:      'Cinematographer / DOP',
    synopsis:  'Distance as subject. The camera holds back and in that restraint, everything is revealed.',
    mood:      'Sparse',
    youtubeId: '70Gpk0TvJkI',
    thumbnail: 'https://img.youtube.com/vi/70Gpk0TvJkI/maxresdefault.jpg',
    credits:   { Direction: 'TBC', Cinematography: 'Parth Porwal' },
    stills:    [],
    featured:  true,
  },
  {
    id:        'proj-006',
    slug:      'untitled-006',
    title:     'Ishq Hai',
    category:  'Music Video',
    year:      2025,
    format:    'Digital',
    role:      'Cinematographer / DOP',
    synopsis:  'Form without narrative. An exercise in texture, duration, and the weight of stillness.',
    mood:      'Contemplative',
    youtubeId: '3XywsJ733E8',
    thumbnail: 'https://img.youtube.com/vi/3XywsJ733E8/hqdefault.jpg',
    credits:   { Direction: 'TBC', Cinematography: 'Parth Porwal' },
    stills:    [],
    featured:  true,
  },
  {
    id:        'proj-007',
    slug:      'untitled-007',
    title:     'Pehchaan',
    category:  'Short Film',
    year:      2024,
    format:    'Digital',
    role:      'Cinematographer / DOP',
    synopsis:  'A portrait in motion. The subject never looks at the camera and that refusal becomes the story.',
    mood:      'Elusive',
    youtubeId: 'GvoVxxQgxs8',
    thumbnail: 'https://img.youtube.com/vi/GvoVxxQgxs8/maxresdefault.jpg',
    credits:   { Direction: 'TBC', Cinematography: 'Parth Porwal' },
    stills:    [],
  },
  {
    id:        'proj-008',
    slug:      'untitled-008',
    title:     'DSA Diss Track',
    category:  'Music Video',
    year:      2024,
    format:    'Digital',
    role:      'Cinematographer / DOP',
    synopsis:  'The last hour of daylight. A story told entirely in the quality of available light.',
    mood:      'Golden',
    youtubeId: 'xsTOqDIvgAM',
    thumbnail: 'https://img.youtube.com/vi/xsTOqDIvgAM/maxresdefault.jpg',
    credits:   { Direction: 'TBC', Cinematography: 'Parth Porwal' },
    stills:    [],
  },
]

export const getProjectBySlug   = (slug: string) => projects.find((p) => p.slug === slug)
export const getFeaturedProjects = ()             => projects.filter((p) => p.featured)
export const getShowreel         = ()             => projects.find((p) => p.showreel)

// ── Collaborators / "Worked With" ────────────────────────────────────────────
export type Collaborator = {
  name:  string
  role:  string
  logo?: string   // path to /public/logos/*.svg or *.png when available
}

export const collaborators: Collaborator[] = [
  { name: 'Red Chief',      role: 'Brand / Client',   logo: '/logos/Red-Chief.png'        },
  { name: 'Furo',           role: 'Brand / Client',   logo: '/logos/furo.png'             },
  { name: 'Bonkers Corner', role: 'Brand / Client',   logo: '/logos/bonkers corners.png'  },
  { name: 'Ruchoks',        role: 'Brand / Client',   logo: '/logos/ruchoks.png'          },
  { name: 'Dibha',          role: 'Brand / Client',   logo: '/logos/Dibha-logo.png'       },
  { name: 'Loopworm',       role: 'Production House', logo: '/logos/Loopworm.png'         },
  { name: 'Linear Amptech', role: 'Brand / Client',   logo: '/logos/Linear Amptech.png'   },
  { name: 'TexHub',         role: 'Brand / Client',   logo: '/logos/texhub.png'           },
]
