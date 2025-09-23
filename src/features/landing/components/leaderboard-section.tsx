import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Trophy, Medal, Award, TrendingUp, Heart, Eye } from 'lucide-react'

const topAuthors = [
  {
    rank: 1,
    name: 'Ahmad Rizki',
    nim: '2021001',
    projects: 12,
    totalLikes: 1250,
    totalViews: 15600,
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    rank: 2,
    name: 'Siti Nurhaliza',
    nim: '2021002',
    projects: 10,
    totalLikes: 980,
    totalViews: 12400,
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    rank: 3,
    name: 'Budi Santoso',
    nim: '2021003',
    projects: 8,
    totalLikes: 850,
    totalViews: 11200,
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    rank: 4,
    name: 'Maya Sari',
    nim: '2021004',
    projects: 9,
    totalLikes: 720,
    totalViews: 9800,
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    rank: 5,
    name: 'Doni Pratama',
    nim: '2021005',
    projects: 7,
    totalLikes: 650,
    totalViews: 8900,
    avatar: '/placeholder.svg?height=40&width=40',
  },
]

const topProjects = [
  {
    rank: 1,
    title: 'Smart Campus IoT System',
    author: 'Ahmad Rizki',
    likes: 245,
    views: 3200,
    tech: ['React', 'Node.js', 'IoT'],
  },
  {
    rank: 2,
    title: 'E-Learning Platform',
    author: 'Siti Nurhaliza',
    likes: 198,
    views: 2800,
    tech: ['Vue.js', 'Laravel', 'MySQL'],
  },
  {
    rank: 3,
    title: 'Mobile Attendance App',
    author: 'Budi Santoso',
    likes: 167,
    views: 2400,
    tech: ['Flutter', 'Firebase'],
  },
]

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="h-5 w-5 text-yellow-500" />
    case 2:
      return <Medal className="h-5 w-5 text-gray-400" />
    case 3:
      return <Award className="h-5 w-5 text-amber-600" />
    default:
      return <span className="text-muted-foreground font-bold">#{rank}</span>
  }
}

export default function LeaderboardSection() {
  return (
    <section id="leaderboard" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">
            Leaderboard <span className="text-primary">Bulan Ini</span>
          </h2>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            Kompetisi sehat antar developer. Leaderboard di-refresh setiap bulan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Top Authors */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Top Authors</h3>
              <Badge variant="outline" className="ml-auto">
                Per Author
              </Badge>
            </div>

            <div className="space-y-4">
              {topAuthors.map((author) => (
                <div
                  key={author.rank}
                  className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center justify-center w-8">
                    {getRankIcon(author.rank)}
                  </div>

                  <Avatar className="h-10 w-10">
                    <AvatarImage src={author.avatar || '/placeholder.svg'} alt={author.name} />
                    <AvatarFallback>
                      {author.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground">{author.name}</div>
                    <div className="text-sm text-muted-foreground">NIM: {author.nim}</div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">
                      {author.projects} projects
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {author.totalLikes}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {author.totalViews}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Top Projects */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Trophy className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Top Projects</h3>
              <Badge variant="outline" className="ml-auto">
                Per Project
              </Badge>
            </div>

            <div className="space-y-4">
              {topProjects.map((project) => (
                <div
                  key={project.rank}
                  className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex items-center justify-center w-8 mt-1">
                      {getRankIcon(project.rank)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground text-balance">{project.title}</h4>
                      <p className="text-sm text-muted-foreground">by {project.author}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {project.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {project.views}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Leaderboard akan di-refresh pada tanggal 1 setiap bulannya
          </p>
        </div>
      </div>
    </section>
  )
}
