import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Zap, TrendingUp, Award, Gamepad2, Heart, Shield, Users, Sparkles, Menu, X as XIcon, Repeat2 } from "lucide-react";
import { AnimatedCard, AnimatedIcon } from "@/components/AnimatedCard";
import { PetAdoptionModal } from "@/components/PetAdoptionModal";
import { AnimatedBackground } from "@/components/AnimatedBackground";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAdoptOpen, setIsAdoptOpen] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState<number | undefined>(undefined);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adoptedPet, setAdoptedPet] = useState<{ name: string; type: string; image: string } | null>(null);

  // Fixed stats with pulse/glow animations
  const stats = { users: 12500, savings: 5000000, pets: 8500 };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const totalHeight = document.body.offsetHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { label: "Adopt", href: "#adopt" },
    { label: "Dashboard", href: "#dashboard" },
    { label: "Goals", href: "#goals" },
    { label: "Rewards", href: "#rewards" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const handleAdoptClick = (petId?: number) => {
    setSelectedPetId(petId);
    setIsAdoptOpen(true);
  };

  const handleAdoptSuccess = (petData: { name: string; type: string; image: string }) => {
    setAdoptedPet(petData);
    // Scroll to dashboard after adoption
    const dashboardSection = document.getElementById('dashboard');
    if (dashboardSection) {
      setTimeout(() => {
        dashboardSection.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-background text-foreground overflow-hidden">
        <AnimatedBackground />

        {/* Navigation */}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 w-full z-40 backdrop-blur-md bg-white/80 border-b border-border"
        >
          <div className="container flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
              >
                <img src="/images/logo.png" alt="SavePaw" className="w-8 h-8 animate-glow-pulse" />
                <span className="font-display font-bold text-2xl gradient-purple-orange-text">SavePaw</span>
              </motion.div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-semibold hover:text-primary transition-smooth relative group"
                  whileHover={{ scale: 1.05 }}
                >
                  {item.label}
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-purple-orange"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: mobileMenuOpen ? 1 : 0, height: mobileMenuOpen ? "auto" : 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-white border-t border-border"
          >
            <div className="container py-4 space-y-3">
              {navItems.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="block text-sm font-semibold hover:text-primary transition-smooth py-2"
                  whileHover={{ x: 10 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.nav>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
          <motion.div className="absolute inset-0 -z-10" style={{ y: scrollY * 0.5 }}>
            <img src="/images/hero_bg.png" alt="Hero Background" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/30 to-white" />
          </motion.div>

          <div className="container grid md:grid-cols-2 gap-12 items-center relative z-10">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <motion.div className="mb-4 inline-block" animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 3, repeat: Infinity }}>
                <span className="text-primary text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="w-4 h-4 animate-spin" /> Gamified Savings
                </span>
              </motion.div>
              <h1 className="text-7xl md:text-8xl font-display font-bold mb-6 leading-tight">
                Feed. Save.<br />
                <span className="gradient-purple-orange-text">Grow</span>. Win!
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
                Turn saving money into an exciting adventure. Adopt a virtual pet, care for it through deposits, and watch it grow as your savings increase.
              </p>
              
              <motion.div 
                className="mb-10 text-primary font-semibold hover:text-primary/80 cursor-pointer inline-flex items-center gap-2"
                whileHover={{ x: 5 }}
              >
                Learn More <ArrowRight className="w-5 h-5" />
              </motion.div>

              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search Bar Placeholder from Screenshot */}
                <div className="relative w-full max-w-md">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Search" 
                    className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth shadow-sm"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-end items-center"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl -z-10 animate-pulse" />
              <motion.img
                src="/images/pet.png"
                alt="SavePaw Pet"
                className="relative w-[90%] h-auto object-contain animate-float"
              />
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10 border-t border-border">
          <div className="container">
            <motion.div
              className="grid md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {[
                { label: "Active Savers", value: stats.users, icon: "👥" },
                { label: "Total Savings", value: `₹${(stats.savings / 100000).toFixed(1)}L`, icon: "💰" },
                { label: "Pets Adopted", value: stats.pets, icon: "🐾" },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="p-8 bg-white rounded-2xl border border-border text-center shadow-lg hover:shadow-xl transition-smooth"
                  whileHover={{ y: -10, scale: 1.05 }}
                >
                  <motion.div className="text-5xl mb-4" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                    {stat.icon}
                  </motion.div>
                  <motion.div className="text-4xl font-display font-bold gradient-purple-orange-text mb-2">
                    {stat.value}
                  </motion.div>
                  <p className="text-muted-foreground font-semibold">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Adopt Section */}
        <section id="adopt" className="py-24 border-t border-border">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl font-display font-bold mb-6">
                🐾 <span className="gradient-purple-orange-text">Adopt Your Pet</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Choose from 6 adorable pets and start your savings adventure today!
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                { id: 1, name: "Puppy", image: "/images/pet.png", desc: "Loyal and energetic" },
                { id: 2, name: "Kitten", image: "/images/kitten.png", desc: "Cute and playful" },
                { id: 3, name: "Birdie", image: "/images/birdie.png", desc: "Colorful and cheerful" },
              ].map((pet, idx) => (
                <AnimatedCard key={idx} delay={idx * 0.1} className="p-8 bg-white rounded-2xl border border-border text-center shadow-lg hover:shadow-2xl transition-smooth">
                  <motion.div className="mb-4 h-48 flex items-center justify-center" animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                    <img src={pet.image} alt={pet.name} className="max-h-full object-contain" />
                  </motion.div>
                  <h3 className="text-2xl font-display font-bold mb-2">{pet.name}</h3>
                  <p className="text-muted-foreground mb-6">{pet.desc}</p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button onClick={() => handleAdoptClick(pet.id)} className="w-full bg-gradient-purple-orange hover:opacity-90 text-white font-bold">
                      Adopt {pet.name}
                    </Button>
                  </motion.div>
                </AnimatedCard>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { id: 4, name: "Rabbit", image: "/images/rabbit.png", desc: "Soft and gentle" },
                { id: 5, name: "Hamster", image: "/images/hamster.png", desc: "Tiny and adorable" },
                { id: 6, name: "Turtle", image: "/images/turtle.png", desc: "Wise and calm" },
              ].map((pet, idx) => (
                <AnimatedCard key={idx} delay={(idx + 3) * 0.1} className="p-8 bg-white rounded-2xl border border-border text-center shadow-lg hover:shadow-2xl transition-smooth">
                  <motion.div className="mb-4 h-48 flex items-center justify-center" animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}>
                    <img src={pet.image} alt={pet.name} className="max-h-full object-contain" />
                  </motion.div>
                  <h3 className="text-2xl font-display font-bold mb-2">{pet.name}</h3>
                  <p className="text-muted-foreground mb-6">{pet.desc}</p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button onClick={() => handleAdoptClick(pet.id)} className="w-full bg-gradient-purple-orange hover:opacity-90 text-white font-bold">
                      Adopt {pet.name}
                    </Button>
                  </motion.div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Dashboard Section */}
        <section id="dashboard" className="py-24 bg-gradient-to-br from-purple-50 to-orange-50 border-t border-border">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl font-display font-bold mb-6">
                <div className="flex items-center justify-center gap-4">
                  <img src="/images/icon_dashboard.png" alt="Dashboard" className="w-16 h-16" />
                  <span className="gradient-purple-orange-text">Your Dashboard</span>
                </div>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Track your pet's growth and savings progress in real-time
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <AnimatedCard delay={0} className="p-8 bg-white rounded-2xl border border-border shadow-lg">
                <h3 className="text-2xl font-display font-bold mb-6">Your Pet</h3>
                <div className="text-center">
                  <motion.div className="mb-6 h-48 flex items-center justify-center animate-float">
                    <img src={adoptedPet ? adoptedPet.image : "/images/pet.png"} alt="Adopted Pet" className="max-h-full object-contain" />
                  </motion.div>
                  <p className="text-2xl font-bold mb-2">{adoptedPet ? adoptedPet.name : "No Pet Adopted Yet"}</p>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Health</p>
                      <motion.div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <motion.div className="bg-gradient-purple-orange h-full" initial={{ width: 0 }} whileInView={{ width: "85%" }} transition={{ duration: 1 }} />
                      </motion.div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Happiness</p>
                      <motion.div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <motion.div className="bg-gradient-purple-orange h-full" initial={{ width: 0 }} whileInView={{ width: "72%" }} transition={{ duration: 1, delay: 0.2 }} />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={0.1} className="p-8 bg-white rounded-2xl border border-border shadow-lg">
                <h3 className="text-2xl font-display font-bold mb-6">Savings Progress</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <p className="font-semibold">Total Saved</p>
                      <p className="text-primary font-bold">₹45,000</p>
                    </div>
                    <motion.div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                      <motion.div className="bg-gradient-purple-orange h-full" initial={{ width: 0 }} whileInView={{ width: "65%" }} transition={{ duration: 1.5 }} />
                    </motion.div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-muted-foreground">This Month</p>
                      <p className="text-2xl font-bold gradient-purple-orange-text">₹8,500</p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <p className="text-sm text-muted-foreground">This Year</p>
                      <p className="text-2xl font-bold gradient-purple-orange-text">₹45,000</p>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            </div>
          </div>
        </section>

        {/* Goals Section */}
        <section id="goals" className="py-24 border-t border-border">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl font-display font-bold mb-6">
                <div className="flex items-center justify-center gap-4">
                  <img src="/images/icon_goals.png" alt="Goals" className="w-16 h-16" />
                  <span className="gradient-purple-orange-text">Savings Goals</span>
                </div>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Create and track your savings goals
              </p>
            </motion.div>

            <motion.div
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {[
                { goal: "Grooming & Accessories Fund", target: "₹5,000", saved: "₹3,200", icon: "✨", progress: 64 },
                { goal: "Emergency Fund", target: "₹50,000", saved: "₹35,000", icon: "🚨", progress: 70 },
                { goal: "Education", target: "₹1,00,000", saved: "₹45,000", icon: "📚", progress: 45 },
                { goal: "Vacation", target: "₹75,000", saved: "₹28,000", icon: "✈️", progress: 37 },
                { goal: "Tech Gadget", target: "₹30,000", saved: "₹22,500", icon: "📱", progress: 75 },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="p-6 bg-white rounded-lg border border-border shadow-sm hover:shadow-md transition-smooth"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-3xl">{item.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold">{item.goal}</h3>
                      <p className="text-sm text-muted-foreground">{item.saved} / {item.target}</p>
                    </div>
                  </div>
                  <motion.div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden mb-2">
                    <motion.div
                      className="bg-gradient-purple-orange h-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.progress}%` }}
                      transition={{ duration: 1 }}
                    />
                  </motion.div>
                  <p className="text-right text-sm font-semibold text-primary">{item.progress}% Complete</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Roundup Section */}
        <section className="py-24 bg-gradient-to-br from-purple-50 to-orange-50 border-t border-border">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl font-display font-bold mb-6">
                <div className="flex items-center justify-center gap-4">
                  <img src="/images/icon_roundup.png" alt="Roundup" className="w-16 h-16" />
                  <span className="gradient-purple-orange-text">Automated Round-Up</span>
                </div>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Passively save by rounding up your transactions
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <AnimatedCard delay={0} className="p-8 bg-white rounded-2xl border border-border shadow-lg">
                <h3 className="text-2xl font-display font-bold mb-6">How It Works</h3>
                <div className="space-y-4">
                  {[
                    { step: 1, desc: "You spend ₹99 on coffee", icon: "☕" },
                    { step: 2, desc: "We round it up to ₹100", icon: "📈" },
                    { step: 3, desc: "₹1 goes to your savings", icon: "💰" },
                    { step: 4, desc: "Your pet gets fed! 🐾", icon: "🎉" },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-center gap-4 p-3 bg-purple-50 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="text-2xl">{item.icon}</div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold">Step {item.step}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatedCard>

              <AnimatedCard delay={0.1} className="p-8 bg-white rounded-2xl border border-border shadow-lg">
                <h3 className="text-2xl font-display font-bold mb-6">Your Stats</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-orange-50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">Total Rounded Up</p>
                    <motion.p
                      className="text-4xl font-display font-bold gradient-purple-orange-text"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ₹2,450
                    </motion.p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-purple-50 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground mb-1">Transactions</p>
                      <p className="text-2xl font-bold text-primary">245</p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground mb-1">Avg Round-Up</p>
                      <p className="text-2xl font-bold text-accent">₹10</p>
                    </div>
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="w-full bg-gradient-purple-orange hover:opacity-90 text-white font-bold py-3">
                      <Repeat2 className="mr-2 w-4 h-4" /> Enable Round-Up
                    </Button>
                  </motion.div>
                </div>
              </AnimatedCard>
            </div>
          </div>
        </section>

        {/* Rewards Section */}
        <section id="rewards" className="py-24 border-t border-border">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl font-display font-bold mb-6">
                <div className="flex items-center justify-center gap-4">
                  <img src="/images/icon_rewards.png" alt="Rewards" className="w-16 h-16" />
                  <span className="gradient-purple-orange-text">Rewards & Achievements</span>
                </div>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Unlock badges and rewards for your saving milestones
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {[
                { badge: "🌟", name: "First Deposit", desc: "Make your first deposit" },
                { badge: "💪", name: "Consistent Saver", desc: "Save for 30 days straight" },
                { badge: "🚀", name: "Rocket Start", desc: "Save ₹10,000 in a month" },
                { badge: "👑", name: "Savings King", desc: "Reach ₹1,00,000 saved" },
                { badge: "🎯", name: "Goal Master", desc: "Complete a savings goal" },
                { badge: "💎", name: "Diamond Tier", desc: "Reach ₹5,00,000 saved" },
                { badge: "🌈", name: "Rainbow Collector", desc: "Unlock all badge types" },
                { badge: "⭐", name: "Superstar", desc: "Reach level 50" },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="p-6 bg-white rounded-2xl border border-border text-center shadow-lg hover:shadow-xl transition-smooth"
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <motion.div className="text-6xl mb-3" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: idx * 0.1 }}>
                    {item.badge}
                  </motion.div>
                  <h3 className="font-display font-bold mb-1">{item.name}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-24 bg-gradient-to-br from-purple-50 to-orange-50 border-t border-border">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl font-display font-bold mb-6">Meet the Team</h2>
              <p className="text-xl text-muted-foreground">Built by passionate students from BGS College</p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {[
                { name: "Bindhu R", role: "AI & ML | Frontend Lead", college: "BGS College of Engineering" },
                { name: "Saadhana D V", role: "AI & ML | Backend", college: "BGS College of Engineering" },
                { name: "Umaima Tanveer", role: "AI & ML | Data & Design", college: "BGS College of Engineering" },
              ].map((member, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="p-8 bg-white rounded-2xl border border-border hover:border-primary transition-smooth text-center shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <motion.div
                    className="w-24 h-24 bg-gradient-purple-orange rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse-ring"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Users className="w-12 h-12 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-display font-bold mb-2 text-foreground">{member.name}</h3>
                  <p className="text-primary font-semibold mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.college}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 border-t border-border bg-white">
          <div className="container">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <img src="/images/logo.png" alt="SavePaw" className="w-8 h-8" />
                  <span className="font-display font-bold text-xl gradient-purple-orange-text">SavePaw</span>
                </div>
                <p className="text-muted-foreground">Gamified savings for Gen Z</p>
              </div>
              <div>
                <h4 className="font-display font-bold mb-4">Product</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <a href="#goals" className="hover:text-primary transition-smooth">
                      Goals
                    </a>
                  </li>
                  <li>
                    <a href="#adopt" className="hover:text-primary transition-smooth">
                      Adopt
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-display font-bold mb-4">Company</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <a href="#team" className="hover:text-primary transition-smooth">
                      Team
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary transition-smooth">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary transition-smooth">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-display font-bold mb-4">Legal</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <a href="#" className="hover:text-primary transition-smooth">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary transition-smooth">
                      Terms
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <motion.div
              className="border-t border-border pt-8 text-center text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p>&copy; 2025 SavePaw. Built with ❤️ by Bindhu R, Saadhana D V, and Umaima Tanveer for RBIH Ideathon.</p>
            </motion.div>
          </div>
        </footer>

        {/* Pet Adoption Modal */}
        <PetAdoptionModal 
          isOpen={isAdoptOpen} 
          onClose={() => setIsAdoptOpen(false)} 
          onAdoptSuccess={handleAdoptSuccess} 
          initialPetId={selectedPetId}
        />

        {/* Floating Scroll-to-Top Progress Button */}
        <motion.button
          onClick={scrollToTop}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: scrollY > 300 ? 1 : 0, opacity: scrollY > 300 ? 1 : 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full bg-white shadow-2xl flex items-center justify-center group"
        >
          {/* Circular Progress SVG */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="#E0DDF5"
              strokeWidth="4"
            />
            <motion.circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="4"
              strokeDasharray="176"
              animate={{ strokeDashoffset: 176 - (176 * scrollProgress) / 100 }}
              transition={{ duration: 0.1 }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6B4FFF" />
                <stop offset="100%" stopColor="#FF9500" />
              </linearGradient>
            </defs>
          </svg>
          
          <ArrowRight className="w-8 h-8 text-primary -rotate-90 relative z-10 group-hover:translate-y-[-2px] transition-transform" />
        </motion.button>
      </div>
    </>
  );
}
