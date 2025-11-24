import React, { useState, useEffect } from "react";
import {
  Calendar,
  CheckSquare,
  Bookmark,
  Clock,
  Zap,
  Shield,
  Users,
  ArrowRight,
  Menu,
  X,
  Check,
  Star,
  Play,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CountUp } from "../../Components/CountUp";
import { Link } from "react-router-dom";
import useStore from "../../Store";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const user = useStore((s) => s.user);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: CheckSquare,
      title: "Smart Task Management",
      description:
        "Organize your daily goals with an intuitive interface that helps you stay focused and productive.",
    },
    {
      icon: Clock,
      title: "Built-in Focus Timer",
      description:
        "Track your time with our elegant Pomodoro-style timer designed to maximize your concentration.",
    },
    {
      icon: Calendar,
      title: "Event Scheduling",
      description:
        "Never miss important deadlines with our streamlined event management system.",
    },
    {
      icon: Bookmark,
      title: "Quick Bookmarks",
      description:
        "Access your most-used tools and websites instantly from your personalized dashboard.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Built with modern technology for instant load times and seamless performance.",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description:
        "Your data stays with you. No tracking, no ads, just pure productivity.",
    },
  ];

  const testimonials = [
    {
      name: "Prasant Patil",
      role: "Founder",
      company: "LaTeXWriter & V-Dash",
      content:
        "V-DASH transformed how I organize my work. The focus timer alone has doubled my productivity.",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "Product Designer",
      company: "DesignLab",
      content:
        "Finally, a dashboard that doesn't overwhelm me. Clean, simple, and exactly what I needed.",
      rating: 5,
    },
    {
      name: "Emily Thompson",
      role: "Freelance Writer",
      company: "Independent",
      content:
        "I've tried dozens of productivity apps. V-DASH is the only one I actually use every single day.",
      rating: 5,
    },
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "0",
      description: "Perfect for individuals getting started",
      features: [
        "Unlimited tasks & goals",
        "Focus timer",
        "10 bookmarks",
        "Event scheduling",
        "Basic analytics",
      ],
      cta: "Get Started",
      popular: true,
    },
    {
      name: "Pro",
      price: "9",
      description: "For power users who want more",
      features: [
        "Everything in Free",
        "Unlimited bookmarks",
        "Advanced analytics",
        "Custom themes",
        "Priority support",
        "Cloud sync",
      ],
      cta: "Coming Soon",
      popular: false,
    },
    {
      name: "Team",
      price: "29",
      description: "Built for teams and organizations",
      features: [
        "Everything in Pro",
        "Up to 10 team members",
        "Shared dashboards",
        "Team analytics",
        "Admin controls",
        "Dedicated support",
      ],
      cta: "Coming Soon",
      popular: false,
    },
  ];
  return (
    <div className="bg-black text-white min-h-screen selection:bg-sky-500/30 selection:text-sky-200 overflow-hidden">
      {/* Background Ambient Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-sky-600/20 rounded-full blur-[120px] animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[100px]" />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="/" >
              <span className="bg-gradient-to-br from-sky-500 to-sky-300 bg-clip-text text-transparent font-bold text-xl">
  V-DASH
</span>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
              >
                Features
              </a>
              <a
                href="#testimonials"
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
              >
                Testimonials
              </a>
              <a
                href="#pricing"
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
              >
                Pricing
              </a>
              {user ? <Link
                to={`/app`}
                className="px-6 py-2 bg-white text-black hover:bg-zinc-200 rounded-full font-medium text-sm hover:scale-105 transition-all duration-500"
              >
                Go to app
              </Link> : <Link
                to={`/register`}
                className="px-6 py-2 bg-white text-black hover:bg-zinc-200 rounded-full font-medium text-sm hover:scale-105 transition-all duration-500"
              >
                Get Started
              </Link>}
              
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-zinc-400 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden overflow-hidden"
              >
                <div className="py-4 space-y-4 border-t border-zinc-800 mt-4">
                  <a
                    href="#features"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-zinc-400 hover:text-white transition-colors"
                  >
                    Features
                  </a>
                  <a
                    href="#testimonials"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-zinc-400 hover:text-white transition-colors"
                  >
                    Testimonials
                  </a>
                  <a
                    href="#pricing"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-zinc-400 hover:text-white transition-colors"
                  >
                    Pricing
                  </a>
                  {user ? <Link
                    to={`/app`}
                    className="w-full px-6 py-3 bg-white text-black rounded-lg transition-colors font-medium"
                  >
                    Go to app
                  </Link> : <Link
                    to={`/register`}
                    className="w-full px-6 py-3 bg-white text-black rounded-lg transition-colors font-medium"
                  >
                    Get Started
                  </Link>}
                  
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-sky-500/10 border border-sky-500/20 rounded-full text-sky-400 text-sm font-medium"
              >
                <Zap size={14} className="fill-current" />
                Your Personal Productivity Hub
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-7xl font-bold mb-6 leading-[1.1] tracking-tight"
              >
                Focus on what
                <br />
                <span className="text-gradient">matters most.</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-xl text-zinc-400 mb-8 leading-relaxed max-w-lg"
              >
                V-DASH is the minimalist dashboard that helps you organize
                tasks, track time, and achieve your goals without the clutter.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  to={`/register`}
                  className="px-8 py-4 bg-sky-500 hover:bg-sky-400 rounded-xl transition-all font-semibold text-lg flex items-center justify-center gap-2 group shadow-[0_0_40px_-10px_rgba(14,165,233,0.5)]"
                >
                  Start Free Today
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
                <motion.button
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: "rgba(39, 39, 42, 1)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl transition-all font-medium text-lg flex items-center justify-center gap-2"
                >
                  <Play size={20} className="fill-current" />
                  Watch Demo
                </motion.button>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="mt-10 flex items-center gap-8 text-sm text-zinc-500"
              >
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-sky-500/20 flex items-center justify-center">
                    <Check size={12} className="text-sky-400" />
                  </div>
                  No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-sky-500/20 flex items-center justify-center">
                    <Check size={12} className="text-sky-400" />
                  </div>
                  Free forever plan
                </div>
              </motion.div>
            </motion.div>

            {/* Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative perspective-1000"
            >
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut",
                }}
                className="relative z-10 bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl"
              >
                <div className="bg-black rounded-xl border border-zinc-800 p-6 overflow-hidden">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>

                  <div className="space-y-4">
                    <div className="h-16 bg-zinc-900/50 rounded-lg border border-zinc-800/50 flex items-center px-4">
                      <div className="w-8 h-8 rounded-full bg-zinc-800 animate-pulse"></div>
                      <div className="ml-4 h-4 w-32 bg-zinc-800 rounded animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-40 bg-zinc-900/50 rounded-lg border border-zinc-800/50 p-4 space-y-3">
                        <h6 className="text-xs text-sky-400">Track Event</h6>
                        <div className="flex items-center justify-between p-3 bg-zinc-900  group  rounded hover:bg-zinc-800 transition-colors">
                          <h3 className="text-xs text-white/50">
                            Metting With Investor
                          </h3>

                          <span className="text-xs  italic text-white/20">
                            at 1 pm
                          </span>
                        </div>{" "}
                        <div className="flex items-center justify-between p-3 bg-zinc-900  group  rounded hover:bg-zinc-800 transition-colors">
                          <h3 className="text-xs text-white/50">
                            Metting With Investor
                          </h3>

                          <span className="text-xs  italic text-white/20">
                            at 4 pm
                          </span>
                        </div>
                      </div>
                      <div className="h-40 bg-gradient-to-br from-sky-500/10 to-purple-500/10 rounded-lg border border-sky-500/20 p-4 flex flex-col justify-center items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-sky-500/20 mb-2 flex items-center justify-center">
                          <Clock className="text-sky-400" size={20} />
                        </div>
                        <div className="text-2xl font-bold text-white tabular-nums">
                          25:00
                        </div>
                        <div className="text-xs text-sky-400">Focus Mode</div>
                      </div>
                    </div>
                    <div className="h-32 bg-zinc-900/50 rounded-lg border border-zinc-800/50 p-4">
                      <div className="h-full w-full flex items-end justify-between gap-2">
                        {[40, 70, 45, 90, 60, 75, 50].map((h, i) => (
                          <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ duration: 1, delay: 0.8 + i * 0.1 }}
                            className="w-full bg-zinc-800 rounded-t-sm hover:bg-sky-500 transition-colors"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Decorative elements behind preview */}
              <div className="absolute -inset-4 bg-gradient-to-r from-sky-500 to-purple-600 rounded-3xl blur-2xl opacity-20 -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 border-y border-white/5 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Active Users", value: 10, suffix: "K+" },
              { label: "Tasks Completed", value: 50, suffix: "K+" },
              { label: "User Rating", value: 4.9, suffix: "", decimals: 1 },
              { label: "Uptime", value: 99, suffix: "%" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-4"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                  <CountUp
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                </div>
                <div className="text-zinc-500 font-medium text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything you need to
              <span className="text-gradient"> stay productive</span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Powerful features wrapped in a beautiful, intuitive interface
              designed to get out of your way.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-zinc-900/30 border border-white/5 rounded-2xl p-8 hover:border-sky-500/30 hover:bg-zinc-900/60 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-sky-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-sky-500 transition-colors duration-300 shadow-lg shadow-sky-900/5">
                  <feature.icon
                    size={28}
                    className="text-sky-500 group-hover:text-white transition-colors duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-zinc-100">
                  {feature.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 px-6 bg-zinc-900/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Get started in
              <span className="text-gradient"> three simple steps</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connector Line */}
            <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-sky-500/20 to-transparent"></div>

            {[
              {
                title: "Create Account",
                desc: "Sign up in seconds with your email or social account",
              },
              {
                title: "Setup Dashboard",
                desc: "Customize your workspace with the tools you need",
              },
              {
                title: "Start Working",
                desc: "Begin your productive journey with V-DASH",
              },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                className="text-center relative"
              >
                <div className="w-16 h-16 bg-black border border-zinc-800 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 relative z-10 shadow-xl">
                  <span className="text-gradient">{idx + 1}</span>
                </div>
                <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                <p className="text-zinc-400 max-w-xs mx-auto">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <motion.section
        id="testimonials"
        className="py-32 px-6 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Loved by
              <span className="text-gradient"> productive people</span>
            </h2>
            <p className="text-xl text-zinc-400">
              See what our users have to say
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="relative min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-zinc-900/40 border border-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 text-center md:text-left"
              >
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="shrink-0">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-sky-500 to-purple-500 p-[2px]">
                      <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center text-2xl font-bold">
                        {testimonials[activeTestimonial].name.charAt(0)}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-center md:justify-start mb-4">
                      {[...Array(testimonials[activeTestimonial].rating)].map(
                        (_, i) => (
                          <Star
                            key={i}
                            size={20}
                            className="text-sky-500 fill-sky-500"
                          />
                        )
                      )}
                    </div>
                    <p className="text-xl md:text-2xl mb-6 leading-relaxed text-zinc-200 italic">
                      "{testimonials[activeTestimonial].content}"
                    </p>
                    <div>
                      <div className="font-bold text-white text-lg">
                        {testimonials[activeTestimonial].name}
                      </div>
                      <div className="text-sky-400 text-sm font-medium">
                        {testimonials[activeTestimonial].role},{" "}
                        {testimonials[activeTestimonial].company}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeTestimonial
                      ? "bg-sky-500 w-8"
                      : "bg-zinc-800 w-2 hover:bg-zinc-700"
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Pricing */}
      <section id="pricing" className="py-32 px-6 bg-black relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Simple,
              <span className="text-gradient"> transparent pricing</span>
            </h2>
            <p className="text-xl text-zinc-400">
              Choose the plan that works for you
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 items-start">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -10 }}
                className={`bg-zinc-900/20 border rounded-2xl p-8 relative group transition-all duration-300 ${
                  plan.popular
                    ? "border-sky-500/50 bg-zinc-900/40 shadow-2xl shadow-sky-900/10 z-10"
                    : "border-zinc-800 hover:border-zinc-700"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-sky-500 text-white rounded-full text-xs font-bold tracking-wide uppercase shadow-lg shadow-sky-500/30">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2 text-white">
                  {plan.name}
                </h3>
                <p className="text-zinc-500 text-sm mb-6 h-10">
                  {plan.description}
                </p>
                <div className="mb-8 flex items-baseline">
                  <span className="text-5xl font-bold tracking-tight text-white">
                    ${plan.price}
                  </span>
                  <span className="text-zinc-500 ml-2">/month</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-sky-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={12} className="text-sky-400" />
                      </div>
                      <span className="text-zinc-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-4 rounded-xl font-semibold transition-all duration-200 ${
                    plan.popular
                      ? "bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/25"
                      : "bg-zinc-800 hover:bg-zinc-700 text-white"
                  }`}
                >
                  {plan.cta}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/50 to-black"></div>

        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] mask-gradient"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
            Ready to boost your
            <br />
            <span className="text-gradient">productivity?</span>
          </h2>
          <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
            Join thousands of productive people using V-DASH today. Build habits
            that stick.
          </p>
          <Link
            to={`/register`}
            className="px-10 py-5 bg-white text-black rounded-full font-bold text-lg inline-flex items-center gap-2 group shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-500"
          >
            Get Started for Free
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <p className="text-sm text-zinc-500 mt-6">
            No credit card required • Free forever plan available
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-16 px-6 bg-black z-10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center font-bold text-white text-sm">
                  V
                </div>
                <span className="text-lg font-bold">V-DASH</span>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed">
                The minimalist productivity dashboard built for focus. Organize
                less, do more.
              </p>
            </div>

            {[
              {
                header: "Product",
                links: ["Features", "Pricing", "Roadmap", "Changelog"],
              },
              {
                header: "Company",
                links: ["About", "Blog", "Careers", "Contact"],
              },
              { header: "Legal", links: ["Privacy", "Terms", "Security"] },
            ].map((column, idx) => (
              <div key={idx}>
                <h4 className="font-semibold mb-6 text-white">
                  {column.header}
                </h4>
                <ul className="space-y-3 text-sm text-zinc-500">
                  {column.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="hover:text-sky-400 transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-600">
            <p>© 2024 V-DASH. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Twitter
              </a>
              <a href="#" className="hover:text-white transition-colors">
                GitHub
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Discord
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
