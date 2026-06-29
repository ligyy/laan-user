"use client";
import { useEffect, useState } from "react";
import * as motion from "framer-motion/client";
import { cn } from "@/lib/utils";

type Testimonial = {
  _id: string;
  name: string;
  initials: string;
  title: string;
  quote: string;
  rating: number;
};

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    _id: "1",
    initials: "AN",
    name: "Amara Nwosu",
    title: "Founder, Loom & Stone",
    rating: 5,
    quote: "From the first call, the team understood exactly what our brand needed. The new site cut our checkout drop-off in half within a month of launch."
  },
  {
    _id: "2",
    initials: "RK",
    name: "Rohan Kapoor",
    title: "Director, PurpleWorld Tours",
    rating: 5,
    quote: "Clear communication at every stage, and they actually delivered on the timeline they promised. Rare to find a dev partner this reliable."
  },
  {
    _id: "3",
    initials: "SF",
    name: "Sara Fathima",
    title: "Ops Lead, Laan Atelier",
    rating: 5,
    quote: "The admin panel they built is so intuitive that our whole team picked it up in a day. Genuinely feels custom-built for how we work."
  }
];

export default function TestimonialsCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const api = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!api) {
      setTestimonials(DEFAULT_TESTIMONIALS);
      return;
    }
    fetch(`${api}/testimonial/list`)
      .then(async res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (data.testimonials && data.testimonials.length > 0) {
          setTestimonials(data.testimonials);
        } else {
          setTestimonials(DEFAULT_TESTIMONIALS);
        }
      })
      .catch((err) => {
        console.error(err);
        setTestimonials(DEFAULT_TESTIMONIALS);
      });
  }, [api]);

  const CSS = `
    .client-voices-section {
      background-color: #F8F5F0;
      padding: 80px 0;
      width: 100%;
      overflow: hidden;
    }
    @media (max-width: 768px) {
      .client-voices-section {
        padding: 48px 0;
      }
    }

    .testimonial-card {
      background-color: #FFFFFF;
      border: 1px solid rgba(74, 44, 29, 0.08);
      border-radius: 24px;
      padding: 32px;
      box-shadow: 0 2px 12px rgba(74, 44, 29, 0.04);
      transition: background-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease;
      display: flex;
      flex-direction: column;
      height: 100%;
      text-align: left;
    }
    
    .testimonial-card:focus-visible {
      outline: 2px solid #4A2C1D;
      outline-offset: 4px;
    }

    @media (max-width: 768px) {
      .testimonial-card {
        padding: 24px;
        border-radius: 20px;
      }
    }

    @media (min-width: 768px) {
      .testimonial-card:hover {
        background-color: #E8DFD4;
        border-color: rgba(74, 44, 29, 0.15);
        box-shadow: 0 8px 32px rgba(74, 44, 29, 0.08);
        transform: translateY(-4px);
      }
    }
    
    @media (max-width: 767px) {
      .testimonial-card:active, .testimonial-card:hover {
        background-color: #E8DFD4;
        border-color: rgba(74, 44, 29, 0.15);
      }
    }

    .marquee-container {
      width: 100%;
      overflow: hidden;
      position: relative;
    }
    
    .marquee-track {
      display: flex;
      gap: 24px;
      width: max-content;
      will-change: transform;
      animation: marquee-scroll 40s linear infinite;
    }
    
    .marquee-container:hover .marquee-track,
    .marquee-container:active .marquee-track,
    .marquee-container:focus-within .marquee-track {
      animation-play-state: paused;
    }

    @keyframes marquee-scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    
    @media (prefers-reduced-motion: reduce) {
      .marquee-track {
        animation: none !important;
        flex-wrap: wrap;
        width: auto;
        justify-content: center;
        padding: 0 20px;
      }
      .marquee-item {
        width: 100% !important;
        margin-bottom: 24px;
      }
    }
  `;

  // Provide 4 sets to allow seamless looping even on ultra-wide desktop monitors
  const marqueeCards = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

  const renderCard = (t: Testimonial) => (
    <div 
      className="testimonial-card w-full"
      key={t._id + "-" + Math.random().toString(36).substr(2, 9)} 
      tabIndex={0}
      aria-label={`Testimonial from ${t.name}, ${t.title}`}
    >
      <div className="text-[#4A2C1D] opacity-30 text-[48px] font-serif leading-none mb-4">"</div>
      
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="text-[#C4A882] text-[16px]">
            {i < t.rating ? "★" : "☆"}
          </span>
        ))}
      </div>
      
      <p className="text-[#4A2C1D] text-[15px] leading-[1.7] font-normal flex-grow">
        {t.quote}
      </p>
      
      <div className="w-full h-[1px] bg-[#4A2C1D] opacity-10 my-[24px]" />
      
      <div className="flex items-center gap-4">
        <div className="w-[40px] md:w-[48px] h-[40px] md:h-[48px] rounded-full bg-[#4A2C1D] text-[#F8F5F0] text-[16px] font-semibold flex items-center justify-center shrink-0">
          {t.initials}
        </div>
        <div>
          <div className="text-[#4A2C1D] text-[15px] font-semibold">
            {t.name}
          </div>
          <div className="text-[#4A2C1D] opacity-60 text-[13px] font-normal mt-0.5">
            {t.title}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="client-voices-section">
      <style>{CSS}</style>
      
      <div className="flex flex-col items-center mb-10 md:mb-16 px-4">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-8 h-px bg-[#4A2C1D] opacity-60" />
          <span className="text-[#4A2C1D] opacity-60 text-[12px] uppercase tracking-[0.2em] font-medium">
            CLIENT VOICES
          </span>
          <div className="w-8 h-px bg-[#4A2C1D] opacity-60" />
        </div>
        
        <h2 
          className="text-[#4A2C1D] text-[32px] md:text-[48px] font-semibold leading-[1.2] max-w-[600px] text-center"
          style={{ fontFamily: "Playfair Display, Georgia, serif" }}
        >
          Stories from people we've worked with
        </h2>
        
        <p className="text-[#4A2C1D] opacity-70 text-[16px] leading-[1.6] max-w-[640px] text-center mt-4 font-sans">
          Real feedback from clients who trusted us with their projects, from the first brief to the final launch.
        </p>
      </div>

      {/* Infinite Marquee */}
      <div className="marquee-container">
        <div className="marquee-track">
          {marqueeCards.map((t, index) => (
            <div key={`${t._id}-${index}`} className="marquee-item w-[85vw] md:w-[450px] shrink-0">
               {renderCard(t)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
