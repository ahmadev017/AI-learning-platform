"use client"
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { Sparkle, Brain, Video, BookOpen, ShieldCheck } from "lucide-react";
import Link from "next/link";
export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div>
        
      </div>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-24 bg-gradient-to-br from-blue-100 to-purple-100">
        
        
        <h1 className="text-4xl md:text-6xl font-bold max-w-4xl leading-tight">
          Learn Smarter with AI
        </h1>
        <p className="text-lg md:text-xl mt-4 max-w-xl text-gray-600">
          Build personalized courses, unlock deep understanding, and accelerate your journey—powered by AI.
        </p>
        <Link href={'/workspace'}><Button className="mt-6 text-lg px-8 py-4">
          <Sparkle className="mr-2 h-5 w-5" />
          Start Free
        </Button></Link>
        
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-12">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div>
            <Brain className="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <h3 className="font-bold text-xl">AI-Generated Courses</h3>
            <p className="text-gray-600 mt-2">Create entire courses based on a topic or idea using cutting-edge AI.</p>
          </div>
          <div>
            <Video className="w-12 h-12 mx-auto text-purple-600 mb-4" />
            <h3 className="font-bold text-xl">Video + Text Content</h3>
            <p className="text-gray-600 mt-2">Deliver content in the format your audience learns best with video and notes.</p>
          </div>
          <div>
            <BookOpen className="w-12 h-12 mx-auto text-orange-600 mb-4" />
            <h3 className="font-bold text-xl">Structured Learning</h3>
            <p className="text-gray-600 mt-2">Chapters, topics, durations—all handled by AI to keep your content organized.</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-gray-50 py-20 px-6">
        <h2 className="text-3xl font-semibold text-center mb-10">Flexible Pricing</h2>
        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8 text-center">
          <div className="border p-8 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold">Free Plan</h3>
            <p className="text-gray-600 my-4">Get started with up to 3 course generations.</p>
            <h4 className="text-2xl font-bold mb-4">$0 / month</h4>
            <Link href={'/workspace'}><Button variant="outline">Try Free</Button></Link>
            
          </div>
          <div className="border p-8 rounded-xl shadow-lg bg-white">
            <h3 className="text-xl font-bold text-purple-600">Starter Plan</h3>
            <p className="text-gray-600 my-4">Unlimited course creation, HD videos, and premium support.</p>
            <h4 className="text-2xl font-bold mb-4">$12 / month</h4>
            <Link href={'/workspace/billing'}><Button>Upgrade Now</Button></Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-12">What Learners Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Sarah Malik",
              feedback: "I created a React course in 5 minutes. The AI structured it better than I could!",
            },
            {
              name: "Ali Khan",
              feedback: "This platform saved me weeks of work and helped me launch my course fast.",
            },
            {
              name: "Ayesha Noor",
              feedback: "The video and chapter breakdown was spot on. Loved the personalized feel!",
            },
          ].map(({ name, feedback }, i) => (
            <div key={i} className="border p-6 rounded-xl shadow-sm">
              <p className="italic text-gray-700">“{feedback}”</p>
              <p className="mt-4 font-semibold">{name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} AI Learnify. All rights reserved.
      </footer>
    </main>
  );
}

