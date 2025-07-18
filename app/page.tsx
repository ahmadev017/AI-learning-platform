"use client"
import { Button } from "@/components/ui/button";
import { 
  Sparkles, Menu, ArrowRight, Play, Brain, Zap, BookOpen, Target, Users, Clock, TrendingUp,
  Star, Quote, Check, Crown, Rocket, ChevronDown, ChevronUp, Twitter, Linkedin, Github, Mail
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from 'next/link'

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);
  const [visibleFeatures, setVisibleFeatures] = useState<boolean[]>([]);
  const [visibleTestimonials, setVisibleTestimonials] = useState<boolean[]>([]);
  
  const featuresRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsHeroVisible(true);
  }, []);

  // Intersection Observer for Features
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleFeatures(prev => {
              const newVisible = [...prev];
              newVisible[index] = true;
              return newVisible;
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    const featureElements = featuresRef.current?.querySelectorAll('[data-index]');
    featureElements?.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Intersection Observer for Testimonials
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-card-index') || '0');
            setVisibleTestimonials(prev => {
              const newVisible = [...prev];
              newVisible[index] = true;
              return newVisible;
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    const cardElements = testimonialsRef.current?.querySelectorAll('[data-card-index]');
    cardElements?.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Personalization",
      description: "Our advanced AI analyzes your learning style, pace, and goals to create perfectly tailored courses just for you.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: BookOpen,
      title: "Adaptive Learning Paths",
      description: "Dynamic course structures that evolve based on your progress, ensuring optimal learning efficiency.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Target,
      title: "Goal-Oriented Learning",
      description: "Set specific learning objectives and let our AI create the most efficient path to achieve them.",
      gradient: "from-green-500 to-teal-500"
    },
    {
      icon: Users,
      title: "Collaborative Learning",
      description: "Connect with peers, join study groups, and learn together in our vibrant community.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Learn at your own pace with personalized schedules that fit your lifestyle and commitments.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: TrendingUp,
      title: "Progress Analytics",
      description: "Detailed insights and analytics to track your learning journey and celebrate achievements.",
      gradient: "from-pink-500 to-rose-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      company: "Google",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=150&h=150&fit=crop&crop=face",
      content: "MindSpark completely transformed how I learn new programming languages. The AI-generated courses are incredibly personalized and effective.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Product Manager",
      company: "Microsoft",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: "I've never experienced such adaptive learning. The platform knows exactly what I need to focus on and adjusts in real-time.",
      rating: 5
    },
    {
      name: "Emily Johnson",
      role: "UX Designer",
      company: "Figma",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: "The personalized learning paths helped me master design thinking in weeks, not months. Simply incredible technology.",
      rating: 5
    },
    {
      name: "David Park",
      role: "Data Scientist",
      company: "Netflix",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "MindSpark's AI understands my learning style better than I do. The progress analytics keep me motivated every day.",
      rating: 5
    },
    {
      name: "Lisa Thompson",
      role: "Marketing Director",
      company: "Stripe",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      content: "Finally, a learning platform that adapts to my busy schedule. The flexible pacing is a game-changer for working professionals.",
      rating: 5
    },
    {
      name: "Alex Kumar",
      role: "Startup Founder",
      company: "TechCorp",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      content: "MindSpark helped me quickly upskill my team. The collaborative features make learning together seamless and engaging.",
      rating: 5
    }
  ];

  const plans = [
    {
      name: "Starter",
      price: "Free",
      period: "forever",
      description: "Perfect for exploring AI-powered learning",
      icon: Sparkles,
      features: [
        "3 AI-generated courses per month",
        "Basic progress tracking",
        "Community access",
        "Mobile app access",
        "Email support"
      ],
      popular: false,
      gradient: "from-gray-500 to-gray-600"
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      description: "Ideal for serious learners and professionals",
      icon: Crown,
      features: [
        "Unlimited AI-generated courses",
        "Advanced analytics & insights",
        "Priority support",
        "Collaborative learning tools",
        "Custom learning paths",
        "Offline course downloads",
        "Integration with popular tools"
      ],
      popular: true,
      gradient: "from-purple-500 to-blue-500"
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "per month",
      description: "For teams and organizations",
      icon: Rocket,
      features: [
        "Everything in Pro",
        "Team management dashboard",
        "Advanced reporting",
        "Custom branding",
        "SSO integration",
        "Dedicated account manager",
        "On-premise deployment option",
        "24/7 phone support"
      ],
      popular: false,
      gradient: "from-indigo-500 to-purple-600"
    }
  ];

  const faqs = [
    {
      question: "How does MindSpark's AI personalization work?",
      answer: "Our AI analyzes your learning style, pace, preferences, and goals through initial assessments and ongoing interactions. It then creates customized course content, adjusts difficulty levels, and recommends learning paths that match your unique needs."
    },
    {
      question: "Can I try MindSpark before committing to a paid plan?",
      answer: "Absolutely! We offer a free Starter plan that includes 3 AI-generated courses per month. Additionally, all paid plans come with a 14-day free trial, no credit card required."
    },
    {
      question: "What types of courses can the AI generate?",
      answer: "MindSpark can create courses on virtually any topic - from programming and data science to creative writing and business skills. The AI draws from a vast knowledge base and can adapt content for different skill levels and learning objectives."
    },
    {
      question: "How accurate and up-to-date is the course content?",
      answer: "Our AI is trained on the latest information and is regularly updated. We also have a team of experts who review and validate course content to ensure accuracy, especially for technical and rapidly evolving subjects."
    },
    {
      question: "Can I use MindSpark for team training?",
      answer: "Yes! Our Enterprise plan is specifically designed for teams and organizations. It includes team management features, progress tracking for multiple users, and collaborative learning tools."
    },
    {
      question: "Is my learning data secure and private?",
      answer: "Absolutely. We take privacy seriously and use enterprise-grade security measures. Your learning data is encrypted, never shared with third parties, and you have full control over your information."
    },
    {
      question: "Can I access courses offline?",
      answer: "Yes, Pro and Enterprise users can download courses for offline access through our mobile app. This is perfect for learning on the go without an internet connection."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel your subscription at any time from your account settings. There are no cancellation fees, and you'll continue to have access until the end of your billing period."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                MindSpark
              </span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-purple-600 transition-colors">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-purple-600 transition-colors">Pricing</a>
              <a href="#testimonials" className="text-gray-600 hover:text-purple-600 transition-colors">Testimonials</a>
              <a href="#faq" className="text-gray-600 hover:text-purple-600 transition-colors">FAQ</a>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-600 hover:text-purple-600">
                Sign In
              </Button>
              <Link href={"/workspace"}>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                Get Started
              </Button></Link>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
              <nav className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-600 hover:text-purple-600">Features</a>
                <a href="#pricing" className="text-gray-600 hover:text-purple-600">Pricing</a>
                <a href="#testimonials" className="text-gray-600 hover:text-purple-600">Testimonials</a>
                <a href="#faq" className="text-gray-600 hover:text-purple-600">FAQ</a>
                <div className="flex flex-col space-y-2 pt-4">
                  <Button variant="ghost">Sign In</Button>
                  <Link href={"/workspace"}>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-500">Get Started</Button></Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30 overflow-hidden relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-br from-green-400/10 to-teal-400/10 rounded-full blur-xl animate-bounce delay-2000"></div>
          
          {/* Floating geometric shapes */}
          <div className="absolute top-20 right-1/4 w-4 h-4 bg-purple-500/30 rotate-45 animate-spin-slow"></div>
          <div className="absolute top-40 left-1/3 w-3 h-3 bg-blue-500/40 rounded-full animate-bounce-slow delay-500"></div>
          <div className="absolute bottom-20 right-1/3 w-5 h-5 bg-pink-500/30 rotate-12 animate-float"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge with slide-in animation */}
            <div className={`inline-flex items-center px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-purple-200/50 mb-8 shadow-lg transform transition-all duration-1000 ${
              isHeroVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <Sparkles className="w-4 h-4 text-purple-600 mr-2 animate-spin-slow" />
              <span className="text-sm font-medium text-purple-700">AI-Powered Learning Revolution</span>
            </div>

            {/* Main headline with staggered animation */}
            <div className="mb-6">
              <h1 className={`text-5xl md:text-7xl font-bold leading-tight transform transition-all duration-1000 delay-200 ${
                isHeroVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}>
                <span className="bg-gradient-to-r from-gray-900 via-purple-800 to-blue-800 bg-clip-text text-transparent animate-gradient-x">
                  Unlock Your
                </span>
              </h1>
              <h1 className={`text-5xl md:text-7xl font-bold leading-tight transform transition-all duration-1000 delay-400 ${
                isHeroVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}>
                <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent animate-gradient-x">
                  Learning Potential
                </span>
              </h1>
            </div>

            {/* Description with fade-in */}
            <p className={`text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed transform transition-all duration-1000 delay-600 ${
              isHeroVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              Create personalized learning courses in seconds with AI. From beginner to expert, 
              MindSpark adapts to your pace and learning style.
            </p>

            {/* CTA buttons with staggered slide-up */}
            <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 transform transition-all duration-1000 delay-800 ${
              isHeroVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}>
              <Link href={"/workspace"}>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 px-8 py-4 text-lg group animate-pulse-gentle"
              >
                Start Learning Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
              </Button></Link>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-gray-300 hover:border-purple-300 hover:bg-purple-50 px-8 py-4 text-lg group hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-125 transition-transform duration-300" />
                Watch Demo
              </Button>
            </div>

            {/* Stats with individual reveal animations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              {[
                { icon: Brain, stat: "50k+", label: "Courses Generated", delay: "delay-1000" },
                { icon: Zap, stat: "98%", label: "Success Rate", delay: "delay-1200" },
                { icon: Sparkles, stat: "10M+", label: "Learners Worldwide", delay: "delay-1400" }
              ].map((item, index) => (
                <div key={index} className={`text-center transform transition-all duration-1000 ${item.delay} ${
                  isHeroVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
                }`}>
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:rotate-3 group">
                    <item.icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1 animate-counter">{item.stat}</div>
                  <div className="text-gray-600">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} id="features" className="py-20 bg-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-full blur-lg animate-bounce-slow delay-1000"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">
              <span className="bg-gradient-to-r from-gray-900 to-purple-800 bg-clip-text text-transparent">
                Powerful Features for
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent animate-gradient-x">
                Modern Learning
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Experience the future of education with cutting-edge AI technology designed to maximize your learning potential.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                data-index={index}
                className={`group p-8 bg-white rounded-2xl border border-gray-200 hover:border-purple-200 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 ${
                  visibleFeatures[index] 
                    ? 'animate-scale-in opacity-100' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  transitionDelay: `${index * 0.1}s`
                }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-xl`}>
                  <feature.icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-700 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {feature.description}
                </p>
                
                {/* Animated underline effect */}
                <div className="mt-4 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} id="testimonials" className="py-20 bg-gradient-to-br from-slate-50 to-purple-50/30 relative overflow-hidden">
        {/* Floating animated elements */}
        <div className="absolute top-20 left-1/4 w-20 h-20 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-1/3 w-16 h-16 bg-gradient-to-br from-blue-300/20 to-cyan-300/20 rounded-full blur-lg animate-bounce-slow"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">
              <span className="bg-gradient-to-r from-gray-900 to-purple-800 bg-clip-text text-transparent">
                Loved by Learners
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent animate-gradient-x">
                Worldwide
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Join thousands of professionals who have accelerated their careers with MindSpark.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                data-card-index={index}
                className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 transform border border-gray-100 group ${
                  visibleTestimonials[index] 
                    ? `animate-slide-in-up opacity-100` 
                    : 'opacity-0 translate-y-12'
                } hover:-translate-y-2 hover:rotate-1`}
                style={{ 
                  animationDelay: `${index * 0.15}s`,
                  transitionDelay: `${index * 0.1}s`
                }}
              >
                {/* Star rating with staggered animation */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 text-yellow-400 fill-current transform transition-all duration-300 hover:scale-125 ${
                        visibleTestimonials[index] ? 'animate-scale-in' : ''
                      }`}
                      style={{ animationDelay: `${(index * 0.15) + (i * 0.1)}s` }}
                    />
                  ))}
                </div>
                
                <Quote className="w-8 h-8 text-purple-300 mb-4 group-hover:text-purple-400 transition-colors duration-300 group-hover:scale-110 transform transition-transform" />
                
                <p className="text-gray-700 mb-6 leading-relaxed italic group-hover:text-gray-800 transition-colors duration-300">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center">
                  <div className="relative overflow-hidden rounded-full mr-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">{testimonial.name}</div>
                    <div className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{testimonial.role} at {testimonial.company}</div>
                  </div>
                </div>

                {/* Animated border effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm transform scale-105 group-hover:scale-110 transition-transform duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-purple-800 bg-clip-text text-transparent">
                Simple, Transparent
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Pricing
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect plan for your learning journey. Upgrade or downgrade at any time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <div 
                key={index}
                className={`relative p-8 rounded-2xl border-2 transition-all duration-300 transform hover:-translate-y-2 ${
                  plan.popular 
                    ? 'border-purple-300 bg-gradient-to-br from-purple-50 to-blue-50 shadow-2xl scale-105' 
                    : 'border-gray-200 bg-white hover:border-purple-200 hover:shadow-xl'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className={`w-16 h-16 bg-gradient-to-br ${plan.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    {plan.price !== "Free" && <span className="text-gray-500 ml-2">/{plan.period}</span>}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full py-3 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white shadow-lg hover:shadow-xl' 
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  } transition-all duration-300`}
                >
                  {plan.price === "Free" ? "Get Started" : "Start Free Trial"}
                </Button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">All plans include a 14-day free trial. No credit card required.</p>
            <p className="text-sm text-gray-500">
              Need a custom plan? <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">Contact our sales team</a>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gradient-to-br from-slate-50 to-purple-50/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-purple-800 bg-clip-text text-transparent">
                Frequently Asked
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about MindSpark and our AI-powered learning platform.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="mb-4 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <button
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0">
                    {openFAQIndex === index ? (
                      <ChevronUp className="w-6 h-6 text-purple-600" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                </button>
                
                {openFAQIndex === index && (
                  <div className="px-8 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <a 
              href="#" 
              className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium text-lg group"
            >
              Contact our support team
              <ChevronDown className="w-5 h-5 ml-2 transform rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">MindSpark</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                Revolutionizing education with AI-powered personalized learning. 
                Join millions of learners who are advancing their careers with MindSpark.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mobile App</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 MindSpark. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
