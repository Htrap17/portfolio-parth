'use client'

import { projects } from '@/data/projects'
import ProjectCard from './ProjectCard'
import { motion } from 'framer-motion'

// Grid orchestrates stagger — each card is a "frame" placed in sequence
const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,   // 100ms between each frame — rhythmic, not rushed
      delayChildren:   0.05,
    },
  },
}

export default function ProjectGrid() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16"
      variants={gridVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
    >
      {projects.map((project, i) => (
        <ProjectCard key={project.id} project={project} index={i} />
      ))}
    </motion.div>
  )
}
