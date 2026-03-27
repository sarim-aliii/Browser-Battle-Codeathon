import { useEffect } from "react";
import gsap from "gsap";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(".preloader-container", { 
          yPercent: -100, // Slides up to reveal the site
          duration: 0.8, 
          ease: "power4.inOut", 
          onComplete 
        });
      }
    });

    // 1. Trace the SVG line
    tl.fromTo(".path-trace", 
      { strokeDasharray: 100, strokeDashoffset: 100 },
      { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" }
    )
    // 2. Fill the icon
    .to(".path-trace", { fill: "#f59e0b", duration: 0.3 }, "-=0.3")
    // 3. Pop outward slightly before exiting
    .to(".loader-logo", { scale: 1.1, duration: 0.2, ease: "back.out(2)" })
    .to(".loader-logo", { scale: 0, opacity: 0, duration: 0.4, ease: "power2.in" });

  }, [onComplete]);

  return (
    <div className="preloader-container fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950">
      {/* Replace path 'd' with your college's actual SVG logo path */}
      <svg className="loader-logo w-24 h-24" viewBox="0 0 24 24" fill="transparent" xmlns="http://www.w3.org/2000/svg">
        <path 
          className="path-trace" 
          d="M12 3L4 7V11C4 15.27 7.37 19.12 12 20C16.63 19.12 20 15.27 20 11V7L12 3Z" 
          stroke="#f59e0b" 
          strokeWidth="0.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          pathLength="100" // Crucial for easy GSAP animation
        />
      </svg>
    </div>
  );
}