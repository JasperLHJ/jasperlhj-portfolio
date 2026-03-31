export interface Profile {
  name: string
  title: string
  tagline: string
  bio: string
  location: string
  email: string
  /** International number digits only (no + or spaces), e.g. 60123456789 for wa.me */
  whatsappPhone?: string
  social: {
    github: string
    linkedin: string
  }
  specializations?: Array<{
    icon: string
    title: string
    description: string
  }>
}

export interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  url: string
  year: string
  featured: boolean
  image: string
  images: string[]
}
