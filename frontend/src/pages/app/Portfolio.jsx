import React, { useState } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code2, Palette, Database, Zap } from 'lucide-react';

export default function Portfolio() {
  const [hoveredProject, setHoveredProject] = useState(null);

  const techStack = [
    { name: 'React', icon: Code2, color: 'bg-blue-500' },
    { name: 'TypeScript', icon: Code2, color: 'bg-blue-600' },
    { name: 'Tailwind CSS', icon: Palette, color: 'bg-cyan-500' },
    { name: 'Node.js', icon: Zap, color: 'bg-green-500' },
    { name: 'PostgreSQL', icon: Database, color: 'bg-indigo-500' },
    { name: 'Next.js', icon: Code2, color: 'bg-slate-800' }
  ];

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack shopping platform with real-time inventory management',
      tech: ['React', 'Node.js', 'PostgreSQL'],
      color: 'from-purple-500 to-pink-500',
      size: 'large'
    },
    {
      id: 2,
      title: 'Task Manager Pro',
      description: 'Collaborative task management with team workflows',
      tech: ['Next.js', 'TypeScript'],
      color: 'from-blue-500 to-cyan-500',
      size: 'medium'
    },
    {
      id: 3,
      title: 'Analytics Dashboard',
      description: 'Real-time data visualization and reporting suite',
      tech: ['React', 'D3.js', 'Tailwind'],
      color: 'from-orange-500 to-red-500',
      size: 'medium'
    },
    {
      id: 4,
      title: 'Weather App',
      description: 'Beautiful weather forecasting with location-based alerts',
      tech: ['React', 'API Integration'],
      color: 'from-teal-500 to-green-500',
      size: 'small'
    },
    {
      id: 5,
      title: 'Social Feed',
      description: 'Dynamic content feed with infinite scroll and reactions',
      tech: ['Next.js', 'Node.js'],
      color: 'from-indigo-500 to-purple-500',
      size: 'small'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="relative z-10 max-w-4xl text-center">
          <div className="mb-6 inline-block">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center text-4xl font-bold transform -rotate-3 hover:rotate-0 transition-transform duration-300">
              JD
            </div>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            John Developer
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Full-stack developer crafting elegant solutions for complex problems. 
            Turning coffee into code since 2019.
          </p>
          <div className="flex gap-4 justify-center">
            <a href="#projects" className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
              View Work
            </a>
            <a href="#contact" className="px-8 py-4 border-2 border-slate-600 rounded-lg font-semibold hover:border-purple-500 hover:bg-slate-900 transition-all duration-300">
              Get in Touch
            </a>
          </div>
          <div className="flex gap-6 justify-center mt-12">
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Github size={24} /></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={24} /></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Mail size={24} /></a>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Tech Stack</h2>
          <p className="text-slate-400 text-center mb-16 max-w-2xl mx-auto">
            Technologies I work with to build modern, scalable applications
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {techStack.map((tech, idx) => (
              <div
                key={idx}
                className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-purple-500 transition-all duration-300 hover:transform hover:scale-105 group"
              >
                <div className={`${tech.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300`}>
                  <tech.icon className="text-white" size={24} />
                </div>
                <h3 className="font-semibold text-slate-200">{tech.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Featured Projects</h2>
          <p className="text-slate-400 text-center mb-16 max-w-2xl mx-auto">
            A selection of recent work that showcases my approach to problem-solving
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`
                  ${project.size === 'large' ? 'md:col-span-2 lg:row-span-2' : ''}
                  ${project.size === 'medium' ? 'lg:col-span-1' : ''}
                  bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8 
                  hover:border-purple-500 transition-all duration-300 group cursor-pointer
                  relative overflow-hidden
                `}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${project.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Code2 size={24} />
                    </div>
                    <ExternalLink 
                      className={`text-slate-400 group-hover:text-white transition-all duration-300 ${hoveredProject === project.id ? 'translate-x-1 -translate-y-1' : ''}`} 
                      size={20} 
                    />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 mb-6 flex-grow">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-slate-700/50 border border-slate-600 rounded-full text-sm text-slate-300 group-hover:border-purple-500/50 transition-colors duration-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="contact" className="py-24 px-6 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-3xl p-12 md:p-16 hover:border-purple-500/50 transition-all duration-300">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Let's Build Something Amazing
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Got a project in mind? I'm always open to discussing new opportunities, 
              creative ideas, or partnerships.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a 
                href="mailto:john@example.com" 
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-2"
              >
                <Mail size={20} />
                Send Email
              </a>
              <a 
                href="#" 
                className="px-8 py-4 border-2 border-slate-600 rounded-lg font-semibold hover:border-purple-500 hover:bg-slate-900 transition-all duration-300 inline-flex items-center justify-center gap-2"
              >
                <Linkedin size={20} />
                Connect on LinkedIn
              </a>
            </div>
            
            <p className="text-slate-500 text-sm">
              Based in San Francisco, CA • Available for remote work worldwide
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">© 2025 John Developer. Built with React & Tailwind.</p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">GitHub</a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">LinkedIn</a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}