import React, { useState, useEffect } from 'react';
import { Home, Calendar, CheckSquare, Bookmark, Clock, Zap, Shield, Users, ArrowRight, Menu, X, Check, Star, Play } from 'lucide-react';

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: CheckSquare,
      title: 'Smart Task Management',
      description: 'Organize your daily goals with an intuitive interface that helps you stay focused and productive.'
    },
    {
      icon: Clock,
      title: 'Built-in Focus Timer',
      description: 'Track your time with our elegant Pomodoro-style timer designed to maximize your concentration.'
    },
    {
      icon: Calendar,
      title: 'Event Scheduling',
      description: 'Never miss important deadlines with our streamlined event management system.'
    },
    {
      icon: Bookmark,
      title: 'Quick Bookmarks',
      description: 'Access your most-used tools and websites instantly from your personalized dashboard.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Built with modern technology for instant load times and seamless performance.'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your data stays with you. No tracking, no ads, just pure productivity.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Software Engineer',
      company: 'TechCorp',
      content: 'V-DASH transformed how I organize my work. The focus timer alone has doubled my productivity.',
      rating: 5
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Product Designer',
      company: 'DesignLab',
      content: 'Finally, a dashboard that doesn\'t overwhelm me. Clean, simple, and exactly what I needed.',
      rating: 5
    },
    {
      name: 'Emily Thompson',
      role: 'Freelance Writer',
      company: 'Independent',
      content: 'I\'ve tried dozens of productivity apps. V-DASH is the only one I actually use every single day.',
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: '0',
      description: 'Perfect for individuals getting started',
      features: [
        'Unlimited tasks & goals',
        'Focus timer',
        '10 bookmarks',
        'Event scheduling',
        'Basic analytics'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Pro',
      price: '9',
      description: 'For power users who want more',
      features: [
        'Everything in Free',
        'Unlimited bookmarks',
        'Advanced analytics',
        'Custom themes',
        'Priority support',
        'Cloud sync'
      ],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Team',
      price: '29',
      description: 'Built for teams and organizations',
      features: [
        'Everything in Pro',
        'Up to 10 team members',
        'Shared dashboards',
        'Team analytics',
        'Admin controls',
        'Dedicated support'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-lg border-b border-zinc-800' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center font-bold text-xl">
                V
              </div>
              <span className="text-xl font-bold">V-DASH</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-zinc-400 hover:text-white transition-colors">Features</a>
              <a href="#testimonials" className="text-zinc-400 hover:text-white transition-colors">Testimonials</a>
              <a href="#pricing" className="text-zinc-400 hover:text-white transition-colors">Pricing</a>
              <button className="px-6 py-2 bg-sky-500 hover:bg-sky-600 rounded-lg transition-colors font-medium">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4">
              <a href="#features" className="block text-zinc-400 hover:text-white transition-colors">Features</a>
              <a href="#testimonials" className="block text-zinc-400 hover:text-white transition-colors">Testimonials</a>
              <a href="#pricing" className="block text-zinc-400 hover:text-white transition-colors">Pricing</a>
              <button className="w-full px-6 py-2 bg-sky-500 hover:bg-sky-600 rounded-lg transition-colors font-medium">
                Get Started
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className=" inline-block mb-4 px-4 py-2 bg-sky-500/10 border border-sky-500/20 rounded-full text-sky-500 text-sm font-medium">
                 Your Personal Productivity Hub
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Focus on what
                <span className="text-sky-500"> matters</span>
              </h1>
              <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
                V-DASH is the minimalist dashboard that helps you organize tasks, track time, and achieve your goals without the clutter.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-sky-500 hover:bg-sky-600 rounded-lg transition-colors font-medium text-lg flex items-center justify-center gap-2 group">
                  Start Free Today
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-colors font-medium text-lg flex items-center justify-center gap-2">
                  <Play size={20} />
                  Watch Demo
                </button>
              </div>
              <div className="mt-8 flex items-center gap-8 text-sm text-zinc-500">
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-sky-500" />
                  No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-sky-500" />
                  Free forever plan
                </div>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="relative">
              <div className="absolute inset-0 bg-sky-500/20 blur-3xl rounded-full"></div>
              <div className="relative bg-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-12 bg-zinc-900 rounded-lg animate-pulse"></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-32 bg-zinc-900 rounded-lg animate-pulse"></div>
                    <div className="h-32 bg-zinc-900 rounded-lg animate-pulse"></div>
                  </div>
                  <div className="h-24 bg-sky-500/10 border border-sky-500/20 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-sky-500 mb-2">10K+</div>
              <div className="text-zinc-400">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-sky-500 mb-2">50K+</div>
              <div className="text-zinc-400">Tasks Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-sky-500 mb-2">4.9</div>
              <div className="text-zinc-400">User Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-sky-500 mb-2">99%</div>
              <div className="text-zinc-400">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything you need to
              <span className="text-sky-500"> stay productive</span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Powerful features wrapped in a beautiful, intuitive interface
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-zinc-950 border border-zinc-800 rounded-xl p-8 hover:border-sky-500/50 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-sky-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-sky-500 transition-colors">
                  <feature.icon size={28} className="text-sky-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Get started in
              <span className="text-sky-500"> three simple steps</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-sky-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-2xl font-semibold mb-3">Create Account</h3>
              <p className="text-zinc-400">Sign up in seconds with your email or social account</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-sky-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-2xl font-semibold mb-3">Setup Dashboard</h3>
              <p className="text-zinc-400">Customize your workspace with the tools you need</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-sky-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-2xl font-semibold mb-3">Start Working</h3>
              <p className="text-zinc-400">Begin your productive journey with V-DASH</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Loved by
              <span className="text-sky-500"> productive people</span>
            </h2>
            <p className="text-xl text-zinc-400">See what our users have to say</p>
          </div>

          <div className="relative">
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-8 md:p-12">
              <div className="flex mb-4">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <Star key={i} size={20} className="text-sky-500 fill-sky-500" />
                ))}
              </div>
              <p className="text-xl md:text-2xl mb-8 leading-relaxed text-zinc-300">
                "{testimonials[activeTestimonial].content}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center font-bold text-lg">
                  {testimonials[activeTestimonial].name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold">{testimonials[activeTestimonial].name}</div>
                  <div className="text-sm text-zinc-400">
                    {testimonials[activeTestimonial].role} at {testimonials[activeTestimonial].company}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeTestimonial ? 'bg-sky-500 w-8' : 'bg-zinc-700'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Simple,
              <span className="text-sky-500"> transparent pricing</span>
            </h2>
            <p className="text-xl text-zinc-400">Choose the plan that works for you</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index}
                className={`bg-black border rounded-xl p-8 ${
                  plan.popular 
                    ? 'border-sky-500 relative' 
                    : 'border-zinc-800'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-sky-500 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-zinc-400 mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold">${plan.price}</span>
                  <span className="text-zinc-400">/month</span>
                </div>
                <button className={`w-full py-3 rounded-lg font-medium transition-colors mb-6 ${
                  plan.popular
                    ? 'bg-sky-500 hover:bg-sky-600'
                    : 'bg-zinc-900 hover:bg-zinc-800'
                }`}>
                  {plan.cta}
                </button>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check size={20} className="text-sky-500 flex-shrink-0 mt-0.5" />
                      <span className="text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to boost your
            <span className="text-sky-500"> productivity?</span>
          </h2>
          <p className="text-xl text-zinc-400 mb-8">
            Join thousands of productive people using V-DASH today
          </p>
          <button className="px-8 py-4 bg-sky-500 hover:bg-sky-600 rounded-lg transition-colors font-medium text-lg inline-flex items-center gap-2 group">
            Get Started for Free
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-sm text-zinc-500 mt-4">No credit card required • Free forever plan available</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center font-bold">
                  V
                </div>
                <span className="text-lg font-bold">V-DASH</span>
              </div>
              <p className="text-zinc-400 text-sm">
                The minimalist productivity dashboard built for focus.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Roadmap</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
            <p>© 2024 V-DASH. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
              <a href="#" className="hover:text-white transition-colors">Discord</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}