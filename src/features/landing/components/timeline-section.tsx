import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Heart, MessageCircle, Eye, Star, ExternalLink } from 'lucide-react'

const recentProjects = [
  {
    id: 1,
    title: 'Smart Campus Navigation App',
    author: 'Ahmad Rizki',
    authorAvatar: '/placeholder.svg?height=40&width=40',
    description:
      'Aplikasi navigasi kampus menggunakan AR dan machine learning untuk membantu mahasiswa baru',
    technologies: ['React Native', 'TensorFlow', 'Firebase', 'ARCore'],
    likes: 42,
    comments: 8,
    views: 156,
    image: '/placeholder.svg?height=200&width=300',
    postedAt: '2 jam yang lalu',
    featured: true,
  },
  {
    id: 2,
    title: 'E-Learning Platform POLNES',
    author: 'Siti Nurhaliza',
    authorAvatar: '/placeholder.svg?height=40&width=40',
    description:
      'Platform pembelajaran online dengan fitur video conference dan assignment management',
    technologies: ['Next.js', 'PostgreSQL', 'WebRTC', 'Prisma'],
    likes: 38,
    comments: 12,
    views: 203,
    image: '/placeholder.svg?height=200&width=300',
    postedAt: '4 jam yang lalu',
    featured: false,
  },
  {
    id: 3,
    title: 'IoT Greenhouse Monitoring',
    author: 'Bayu Pratama',
    authorAvatar: '/placeholder.svg?height=40&width=40',
    description: 'Sistem monitoring greenhouse otomatis dengan sensor IoT dan dashboard real-time',
    technologies: ['Arduino', 'Node.js', 'MongoDB', 'Socket.io'],
    likes: 29,
    comments: 6,
    views: 134,
    image: '/placeholder.svg?height=200&width=300',
    postedAt: '6 jam yang lalu',
    featured: false,
  },
  {
    id: 4,
    title: 'Blockchain Voting System',
    author: 'Dewi Kartika',
    authorAvatar: '/placeholder.svg?height=40&width=40',
    description: 'Sistem voting digital menggunakan blockchain untuk transparansi dan keamanan',
    technologies: ['Solidity', 'Web3.js', 'React', 'Ethereum'],
    likes: 51,
    comments: 15,
    views: 287,
    image: '/placeholder.svg?height=200&width=300',
    postedAt: '8 jam yang lalu',
    featured: true,
  },
]

export default function TimelineSection() {
  return (
    <section
      id="timeline"
      className="py-20 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">
            Proyek <span className="text-primary">Terbaru</span>
          </h2>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            Jelajahi karya-karya terbaru dari pengguna lainnya yang penuh inovasi
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid gap-6 md:grid-cols-2">
            {recentProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="group bg-transparent">
              Lihat Semua Proyek
              <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: (typeof recentProjects)[number] }) {
  return (
    <Card
      key={project.id}
      className="group overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-all duration-300"
    >
      {project.featured && (
        <div className="bg-gradient-to-r from-primary to-chart-3 p-1">
          <div className="bg-card px-3 py-1">
            <div className="flex items-center gap-1 text-xs font-medium text-primary">
              <Star className="h-3 w-3 fill-current" />
              Featured Project
            </div>
          </div>
        </div>
      )}

      <div className="relative overflow-hidden">
        <img
          src={project.image || '/placeholder.svg'}
          alt={project.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Button
          size="sm"
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          variant="secondary"
        >
          <ExternalLink className="h-3 w-3" />
        </Button>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={project.authorAvatar || '/placeholder.svg'}
            alt={project.author}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="font-medium text-sm text-foreground">{project.author}</p>
            <p className="text-xs text-muted-foreground">{project.postedAt}</p>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-1 mb-4">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span>{project.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>{project.comments}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{project.views}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
