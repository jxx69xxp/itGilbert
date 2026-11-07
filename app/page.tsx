"use client";

import type { FormEvent } from "react";
import FlyingDrone from "./FlyingDrone";

// ponytail: ported Stitch's vanilla DOM handlers as-is. Safe because this page holds no React
// state (nothing re-renders over the DOM edits). Move to useState if the page gains state.
const $ = (id: string) => document.getElementById(id)!;

// Swap a reel card's poster for Facebook's embedded player, in place.
function playReel(trigger: HTMLElement, reelUrl: string) {
  const media = trigger.closest(".reel-card")!.firstElementChild as HTMLElement;
  if (media.querySelector("iframe")) return;
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(reelUrl)}&show_text=false&autoplay=true`;
  iframe.title = "Facebook reel player";
  iframe.allow = "autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share";
  iframe.allowFullscreen = true;
  iframe.className = "absolute inset-0 z-20 w-full h-full border-0 bg-black";
  media.appendChild(iframe);
}

function selectPackage(pkgName: string) {
  ($("modal-package-input") as HTMLInputElement).value = pkgName;
  $("booking-modal").classList.remove("hidden");
}

function handleBookingSubmit(e: FormEvent) {
  e.preventDefault();
  $("booking-success-msg").classList.remove("hidden");
  setTimeout(() => {
    $("booking-modal").classList.add("hidden");
    $("booking-success-msg").classList.add("hidden");
  }, 3000);
}

export default function Home() {
  return (
    <><FlyingDrone /><header className="fixed top-0 left-0 w-full z-50 bg-surface-container-lowest/80 backdrop-blur-xl shadow-[0_16px_36px_-8px_rgba(0,0,0,0.6)]"><div className="h-20 w-full px-gutter lg:px-margin flex items-center justify-between gap-4"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-primary font-headline-sm font-bold border border-primary/30">G</div><div className="flex flex-col"><span className="font-headline-sm text-headline-sm uppercase text-on-surface leading-none tracking-tight">ItsGilbert</span><span className="font-label-technical text-label-technical uppercase text-primary tracking-widest">Mt. Capistrano Drone Works</span></div></div><nav className="hidden xl:flex items-center gap-6" data-active-classes="bg-surface-container-high text-primary font-bold"><a className="font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors py-2 px-3 rounded" data-path="portfolio-and-fb-reels" href="#reels-gallery">Portfolio &amp; FB Reels</a><a className="font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors py-2 px-3 rounded" data-path="services-and-rates" href="/services">Services &amp; Rates</a><a className="font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors py-2 px-3 rounded" data-path="drone-gear-and-telemetry" href="#reels-gallery">Drone Gear</a><a className="font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors py-2 px-3 rounded" data-path="about-gilbert" href="https://web.facebook.com/profile.php?id=100080806517537" rel="noopener noreferrer" target="_blank">About Gilbert</a><a className="font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors py-2 px-3 rounded" data-path="location-and-expeditions" href="#packages">Bukidnon Summit Expeditions</a></nav><div className="flex items-center gap-4"><div className="hidden sm:flex items-center gap-2"><a className="w-9 h-9 rounded flex items-center justify-center bg-surface-container-low text-on-surface-variant hover:text-[#1877F2] hover:bg-surface-container transition-colors" href="https://web.facebook.com/profile.php?id=100080806517537" rel="noopener noreferrer" target="_blank" title="Gilbert's Facebook Profile"><span className="material-symbols-outlined text-[18px]">movie</span></a><a className="w-9 h-9 rounded flex items-center justify-center bg-surface-container-low text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors" href="https://web.facebook.com/profile.php?id=100080806517537" rel="noopener noreferrer" target="_blank" title="Instagram / Socials"><span className="material-symbols-outlined text-[18px]">photo_camera</span></a><a className="w-9 h-9 rounded flex items-center justify-center bg-surface-container-low text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors" href="https://web.facebook.com/profile.php?id=100080806517537" rel="noopener noreferrer" target="_blank" title="TikTok"><span className="material-symbols-outlined text-[18px]">play_circle</span></a><a className="w-9 h-9 rounded flex items-center justify-center bg-surface-container-low text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors" href="https://web.facebook.com/profile.php?id=100080806517537" rel="noopener noreferrer" target="_blank" title="YouTube 4K"><span className="material-symbols-outlined text-[18px]">smart_display</span></a></div><a className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary text-on-secondary font-label-lg text-label-lg uppercase tracking-wider shadow-[0_0_18px_rgba(245,158,11,0.45)] hover:bg-secondary-fixed transition-all" href="#packages"><span className="material-symbols-outlined text-[18px]">flight_takeoff</span><span className="">Book Flight</span></a><a className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:opacity-90 transition-opacity" href="https://web.facebook.com/profile.php?id=100080806517537" rel="noopener noreferrer" target="_blank" title="Gilbert's FB Profile"><span className="material-symbols-outlined text-[18px]">person</span></a></div></div></header><main className="w-full pt-20 bg-background min-h-screen"><div className="flex flex-col w-full">
{/* Telemetry HUD Marquee Strip */}
<div className="w-full bg-surface-container-lowest text-on-surface-variant font-label-technical text-label-technical overflow-hidden border-none py-2 px-gutter lg:px-margin flex items-center justify-between gap-4 select-none">
<div className="flex items-center gap-6 overflow-x-auto whitespace-nowrap scrollbar-none">
<div className="flex items-center gap-2 text-primary">
<span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
<span className="tracking-widest uppercase">SYS.LIVE: MT. CAPISTRANO SUMMIT 610M ASL</span>
</div>
<span className="text-outline-variant">/</span>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[14px] text-secondary">air</span>
<span className="">WIND: 14 KTS (GUST 21) NNW</span>
</div>
<span className="text-outline-variant">/</span>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[14px] text-tertiary">wb_sunny</span>
<span className="">DAWN INVERSION: 92% VISIBILITY</span>
</div>
</div>
<div className="hidden md:flex items-center gap-4 text-on-surface text-opacity-80">
<span className="">D-LOG M 10-BIT</span>
<span className="text-secondary font-bold">PRO CINE 60FPS</span>
</div>
</div>
{/* Hero Section with Deep Visual Elevation & Overlay HUD */}
<section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-surface-container-lowest">
{/* Hero Background Image (Full-Bleed Panoramic Aerial) */}
<div className="absolute inset-0 z-0">
<img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwZxLJHVTuWvgn60YxBl8ui5PD0yMz2f0lOrsmJJ4giTi8HhalRMR7LuCSPBTNqxGYr7yGiVrpo9kiEA5j9n4ND0el71nR6WhWALka3kJIX2B23fs8TRsBzThV3Wgf_EzYr8fGRU99Vbt2Fvxmqz6Yuc97ASaMlmmIZMLN1JsBiebHmIv8pep9eL1hRzDtgKEccTaRyRS5gwH5aUBlMutt8sWw6RSOPsJHugp1wIFik-2vYI4cUJPS-g" alt="Mt. Capistrano Summit Aerial View" className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out opacity-75" />
{/* Dual Scrim Gradients */}
<div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-surface-container-lowest/80"></div>
<div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/40"></div>
</div>
{/* Hero Content Container */}
<div className="relative z-10 w-full px-gutter lg:px-margin pt-6 pb-12 lg:pt-10 lg:pb-16 flex-1 flex flex-col justify-between max-w-7xl mx-auto">
{/* Top Specs Bar */}
<div className="flex flex-wrap items-center justify-between gap-4 mb-6">
<div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-surface-container-high/90 backdrop-blur-md shadow-xl">
<span className="relative flex h-2.5 w-2.5">
<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
<span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
</span>
<span className="font-label-technical text-label-technical uppercase tracking-wider text-on-surface">Bukidnon Certified Flight Deck</span>
<span className="text-outline-variant font-mono">|</span>
<span className="font-label-technical text-label-technical text-secondary uppercase font-bold">Mt. Capistrano Specialist</span>
</div>
<div className="flex items-center gap-3">
<span className="px-3 py-1 rounded bg-surface-container/80 backdrop-blur-md font-label-technical text-label-technical text-primary">4K 60FPS HDR</span>
<span className="px-3 py-1 rounded bg-surface-container/80 backdrop-blur-md font-label-technical text-label-technical text-on-surface">D-LOG M 10-BIT</span>
<span className="px-3 py-1 rounded bg-surface-container/80 backdrop-blur-md font-label-technical text-label-technical text-secondary">FPV AGILITY</span>
</div>
</div>
{/* Hero Main Layout: Asymmetric Split Grid */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
{/* Left: Punchy Typography & Call to Actions */}
<div className="lg:col-span-8 space-y-5">
<div className="space-y-2">
<p className="font-label-lg text-label-lg uppercase tracking-widest text-primary flex items-center gap-2">
<span className="material-symbols-outlined text-[18px]">flight_takeoff</span>
              Certified Mountain FPV &amp; Aerial Cinematographer
            </p>
<h1 className="font-headline-lg lg:font-display-hero text-headline-lg lg:text-display-hero text-on-surface uppercase tracking-tight leading-none drop-shadow-2xl">
              Capturing Peak Moments From <span className="text-secondary italic">2,000 Feet</span> Above.
            </h1>
</div>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
            High-altitude cinematic drone reels, jaw-dropping sunrise cloud inversions, and knife-edge limestone ridge flyovers on Mt. Capistrano, Bukidnon. Built for climbers, couples, brands, and viral social storytelling.
          </p>
{/* CTAs & Fast Proof Badges */}
<div className="pt-2 flex flex-wrap items-center gap-4">
<a className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-secondary text-on-secondary font-label-lg text-label-lg uppercase tracking-wider shadow-[0_0_24px_rgba(245,158,11,0.5)] hover:scale-105 hover:bg-secondary-fixed transition-all duration-300" href="#reels-gallery">
<span className="material-symbols-outlined text-[20px]" style={{"fontVariationSettings": "'FILL' 1"}}>play_circle</span>
<span className="">Watch Viral FB Reels</span>
</a>
<a className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#1877F2] text-white font-label-lg text-label-lg uppercase tracking-wider hover:bg-[#1567d3] transition-all duration-300 shadow-xl" href="https://web.facebook.com/profile.php?id=100080806517537" rel="noopener noreferrer" target="_blank">
<span className="material-symbols-outlined text-[20px]">person</span>
<span className="">Gilbert on Facebook</span>
</a>
<a className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-surface-container-high/90 backdrop-blur-xl text-primary font-label-lg text-label-lg uppercase tracking-wider hover:bg-surface-variant transition-all duration-300 shadow-xl" href="#packages">
<span className="material-symbols-outlined text-[20px]">photo_camera</span>
<span className="">Shoot Rates &amp; Slots</span>
</a>
</div>
{/* Micro Proof Stats Row */}
<div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
<div className="p-3 rounded-lg bg-surface-container-low/70 backdrop-blur-md">
<div className="font-headline-sm text-headline-sm text-secondary font-bold">200+</div>
<div className="font-label-technical text-label-technical uppercase text-on-surface-variant">Hikes Documented</div>
</div>
<div className="p-3 rounded-lg bg-surface-container-low/70 backdrop-blur-md">
<div className="font-headline-sm text-headline-sm text-primary font-bold">1.2M+</div>
<div className="font-label-technical text-label-technical uppercase text-on-surface-variant">Total Reels Views</div>
</div>
<div className="p-3 rounded-lg bg-surface-container-low/70 backdrop-blur-md">
<div className="font-headline-sm text-headline-sm text-on-surface font-bold">100%</div>
<div className="font-label-technical text-label-technical uppercase text-on-surface-variant">Zero-Crash Record</div>
</div>
<div className="p-3 rounded-lg bg-surface-container-low/70 backdrop-blur-md">
<div className="font-headline-sm text-headline-sm text-tertiary font-bold">35 MIN</div>
<div className="font-label-technical text-label-technical uppercase text-on-surface-variant">Per Battery Bank</div>
</div>
</div>
</div>
{/* Right: Pilot Mini Profile Card Overhanging */}
<div className="lg:col-span-4 w-full">
<div className="relative rounded-2xl overflow-hidden bg-surface-container/85 backdrop-blur-2xl shadow-2xl p-5 flex flex-col gap-4 transform transition-all duration-300 hover:shadow-[0_20px_50px_rgba(16,185,129,0.15)]">
{/* Top Pilot Status */}
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="w-3 h-3 rounded-full bg-primary animate-ping"></span>
<span className="font-label-technical text-label-technical uppercase text-primary font-bold">Active On Ridge</span>
</div>
<span className="font-label-technical text-label-technical text-on-surface-variant font-mono">PILOT // GILBERT</span>
</div>
{/* Pilot Summit Thumbnail */}
<div className="relative w-full h-52 rounded-xl overflow-hidden shadow-inner group">
<img alt="Gilbert on Capistrano summit ridge with controller" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGkfR6Y9WG_ljXHZMUCT8VKjOlcai_gezb6K1Bf-TuuBjEq3UFjsmEuyoeYU2rKZnpqCk8VxGHf8iSpMb6dzZJmgXbC88ovTWZfVhkBxPu0mdajsFBZCXfrpEZ1BHhRPXqc7CiDnhnRyw2NZQNGoQ-wMKlCFwLV6AqxhtLKtxUYPXxEAtrDMCTIDnVa3r_w9eJRR0h7zFp_gXQ-j_QCLDofTRMVVZBHW6vs2z72OUbFPfLXMOV-DxOmg" />
<div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-90"></div>
<div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-on-surface font-label-technical text-label-technical">
<span className="bg-surface-container-lowest/80 px-2.5 py-1 rounded backdrop-blur-md flex items-center gap-1.5">
<span className="material-symbols-outlined text-secondary text-[14px]">my_location</span>
                  Summit 610m
                </span>
<span className="bg-surface-container-lowest/80 px-2.5 py-1 rounded backdrop-blur-md text-primary">DJI O3 PRO</span>
</div>
</div>
{/* Profile Excerpt */}
<div className="space-y-1">
<h3 className="font-headline-sm text-headline-sm text-on-surface">Gilbert "ItsGilbert"</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
                Resident drone master on Mt. Capistrano. Specialized in maneuvering razor-sharp limestone towers and fast dawn cloudbreaks.
              </p>
</div>
{/* Pilot Action & Telemetry button */}
<div className="pt-2 flex items-center justify-between gap-3">
<button className="w-full py-2.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider font-bold hover:bg-primary-fixed transition-colors flex items-center justify-center gap-2" onClick={() => { $('booking-modal').classList.remove('hidden'); }}>
<span className="material-symbols-outlined text-[16px]">calendar_month</span>
<span className="">Lock Climb Flight</span>
</button>
<a className="w-10 h-10 rounded-lg bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity flex-shrink-0" href="https://web.facebook.com/profile.php?id=100080806517537" rel="noopener noreferrer" target="_blank" title="View Gilbert's Official Facebook Profile">
<span className="material-symbols-outlined text-[18px]">share</span>
</a>
</div>
</div>
</div>
</div>
</div>
</section>
{/* Interactive Flight Telemetry & Environmental HUD Bar */}
<section className="w-full bg-surface-container-low px-gutter lg:px-margin py-8 shadow-xl">
<div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
<div className="flex items-center gap-4 p-4 rounded-xl bg-surface-container">
<div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[28px]">landscape</span>
</div>
<div>
<div className="font-label-technical text-label-technical uppercase text-on-surface-variant">Topographic Base</div>
<div className="font-headline-sm text-headline-sm text-on-surface">Mt. Capistrano</div>
<div className="font-body-sm text-body-sm text-secondary">Limestone Peak · Simaya, Malaybalay City</div>
</div>
</div>
<div className="flex items-center gap-4 p-4 rounded-xl bg-surface-container">
<div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[28px]">satellite_alt</span>
</div>
<div>
<div className="font-label-technical text-label-technical uppercase text-on-surface-variant">Signal &amp; Telemetry</div>
<div className="font-headline-sm text-headline-sm text-on-surface">15km Max Range</div>
<div className="font-body-sm text-body-sm text-primary">OcuSync 4.0 Dual-Band</div>
</div>
</div>
<div className="flex items-center gap-4 p-4 rounded-xl bg-surface-container">
<div className="w-12 h-12 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined text-[28px]">speed</span>
</div>
<div>
<div className="font-label-technical text-label-technical uppercase text-on-surface-variant">Peak FPV Velocity</div>
<div className="font-headline-sm text-headline-sm text-on-surface">140 KM/H</div>
<div className="font-body-sm text-body-sm text-tertiary">Manual Acro Ridge Dives</div>
</div>
</div>
<div className="flex items-center gap-4 p-4 rounded-xl bg-surface-container">
<div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[28px]">movie_filter</span>
</div>
<div>
<div className="font-label-technical text-label-technical uppercase text-on-surface-variant">Master Reel Turnaround</div>
<div className="font-headline-sm text-headline-sm text-on-surface">24 Hours</div>
<div className="font-body-sm text-body-sm text-secondary">Color Graded Reels Ready</div>
</div>
</div>
</div>
</section>
{/* Interactive Facebook Reels & 4K Aerial Video Gallery */}
<section className="w-full bg-background px-gutter lg:px-margin py-20" id="reels-gallery">
<div className="w-full max-w-7xl mx-auto space-y-12">
{/* Section Header with Meta Tags & Gilbert FB Profile Badge */}
<div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
<div className="space-y-3">
<div className="inline-flex items-center gap-2 text-primary font-label-technical text-label-technical uppercase tracking-widest">
<span className="material-symbols-outlined text-[16px]">videocam</span>
<span className="">Bukidnon Aerial Master Showcase — 5 Official Facebook Reels</span>
</div>
<h2 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-tight">
            Featured Facebook Reels &amp; Drone Flights
          </h2>
<p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Watch real summit moments captured on Mt. Capistrano. Tap play on any reel to watch it right here.
          </p>
</div>
{/* Official FB Profile Direct Link */}
<div className="flex items-center gap-3">
<a className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#1877F2] text-white font-label-md text-label-md uppercase tracking-wider font-bold hover:bg-[#1567d3] shadow-lg transition-all" href="https://web.facebook.com/profile.php?id=100080806517537" rel="noopener noreferrer" target="_blank">
<span className="material-symbols-outlined text-[18px]">account_circle</span>
<span className="">Follow ItsGilbert on FB</span>
</a>
</div>
</div>
{/* 5-Card Vertical Reels Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5" id="reel-items-grid">
{/* Reel 1 */}
<div className="reel-card group rounded-2xl overflow-hidden bg-surface-container-low shadow-xl hover:shadow-[0_20px_40px_rgba(24,119,242,0.3)] border border-surface-container-high hover:border-primary/50 transition-all duration-300 flex flex-col justify-between">
<div className="relative w-full aspect-[9/16] overflow-hidden bg-black">
<img alt="Mt. Capistrano Sunrise Sea of Clouds Flight" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwZxLJHVTuWvgn60YxBl8ui5PD0yMz2f0lOrsmJJ4giTi8HhalRMR7LuCSPBTNqxGYr7yGiVrpo9kiEA5j9n4ND0el71nR6WhWALka3kJIX2B23fs8TRsBzThV3Wgf_EzYr8fGRU99Vbt2Fvxmqz6Yuc97ASaMlmmIZMLN1JsBiebHmIv8pep9eL1hRzDtgKEccTaRyRS5gwH5aUBlMutt8sWw6RSOPsJHugp1wIFik-2vYI4cUJPS-g" />
<div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/30 to-transparent"></div>
<div className="absolute top-3 left-3 right-3 flex items-center justify-between">
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#1877F2] text-white font-label-technical text-[10px] uppercase font-bold shadow">
<span className="material-symbols-outlined text-[12px]">smart_display</span> REEL 01
      </span>
<span className="px-2 py-0.5 rounded-full bg-surface-container-lowest/80 text-secondary font-label-technical text-[10px] font-bold">
        VIRAL
      </span>
</div>
<button type="button" aria-label="Play Reel 1" className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#1877F2]/90 hover:bg-[#1877F2] text-white flex items-center justify-center shadow-[0_0_25px_rgba(24,119,242,0.7)] transform scale-90 group-hover:scale-100 transition-all duration-300" onClick={(e) => playReel(e.currentTarget, "https://web.facebook.com/share/r/1EvT5WPKrv/")}>
<span className="material-symbols-outlined text-[32px]" style={{"fontVariationSettings": "'FILL' 1"}}>play_arrow</span>
</button>
<div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-on-surface font-label-technical text-[11px]">
<span className="flex items-center gap-1 text-primary">
<span className="material-symbols-outlined text-[13px]">graphic_eq</span> Dawn Inversion
      </span>
<span className="text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[13px]">visibility</span> 320K
      </span>
</div>
</div>
<div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
<div>
<span className="font-label-technical text-[10px] uppercase tracking-wider text-secondary">Sunrise Sea of Clouds</span>
<h3 className="font-headline-sm text-[16px] leading-tight text-on-surface group-hover:text-primary transition-colors mt-0.5">
        Mt. Capistrano Sunrise Sea of Clouds Flight
      </h3>
</div>
<button type="button" className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#1877F2] text-white font-label-technical text-label-technical uppercase tracking-wider hover:bg-[#1567d3] shadow-md transition-all font-bold" onClick={(e) => playReel(e.currentTarget, "https://web.facebook.com/share/r/1EvT5WPKrv/")}>
<span className="material-symbols-outlined text-[14px]" style={{"fontVariationSettings": "\'FILL\' 1"}}>play_circle</span>
<span className="">Play Reel</span>
</button>
</div>
</div>
{/* Reel 2 */}
<div className="reel-card group rounded-2xl overflow-hidden bg-surface-container-low shadow-xl hover:shadow-[0_20px_40px_rgba(24,119,242,0.3)] border border-surface-container-high hover:border-primary/50 transition-all duration-300 flex flex-col justify-between">
<div className="relative w-full aspect-[9/16] overflow-hidden bg-black">
<img alt="Pinnacle Edge 360 Orbit &amp; Hiker Perspective" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5FmJOZEV9fdEVHYt9K6TBdeoqQVRvtO8-JlLS_Y7g2N47eX6N4WaXKRO_OgcxkrI3jxsfWrbG591AcBbgKvErm3uXm_yWOF2P9sFsgt63gHmZuS_jc4fyJccWMcFi0M8cZkVLXLIHm934sUWexDcQUBUszgrBLjFzGOZJcJZ1phVF_i-xUdB562BMpaLLnP0x8MmioN4hllj5qKYw70v6Vo32rYN4Qkm7TxtL6B_Q" />
<div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/30 to-transparent"></div>
<div className="absolute top-3 left-3 right-3 flex items-center justify-between">
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#1877F2] text-white font-label-technical text-[10px] uppercase font-bold shadow">
<span className="material-symbols-outlined text-[12px]">smart_display</span> REEL 02
      </span>
<span className="px-2 py-0.5 rounded-full bg-surface-container-lowest/80 text-primary font-label-technical text-[10px] font-bold">
        360° ORBIT
      </span>
</div>
<button type="button" aria-label="Play Reel 2" className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#1877F2]/90 hover:bg-[#1877F2] text-white flex items-center justify-center shadow-[0_0_25px_rgba(24,119,242,0.7)] transform scale-90 group-hover:scale-100 transition-all duration-300" onClick={(e) => playReel(e.currentTarget, "https://web.facebook.com/share/r/1J34qLBRoc/")}>
<span className="material-symbols-outlined text-[32px]" style={{"fontVariationSettings": "'FILL' 1"}}>play_arrow</span>
</button>
<div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-on-surface font-label-technical text-[11px]">
<span className="flex items-center gap-1 text-primary">
<span className="material-symbols-outlined text-[13px]">graphic_eq</span> Peak Summit POV
      </span>
<span className="text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[13px]">visibility</span> 195K
      </span>
</div>
</div>
<div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
<div>
<span className="font-label-technical text-[10px] uppercase tracking-wider text-primary">Summit Ledge Highlight</span>
<h3 className="font-headline-sm text-[16px] leading-tight text-on-surface group-hover:text-primary transition-colors mt-0.5">
        Pinnacle Edge 360 Orbit &amp; Hiker Perspective
      </h3>
</div>
<button type="button" className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#1877F2] text-white font-label-technical text-label-technical uppercase tracking-wider hover:bg-[#1567d3] shadow-md transition-all font-bold" onClick={(e) => playReel(e.currentTarget, "https://web.facebook.com/share/r/1J34qLBRoc/")}>
<span className="material-symbols-outlined text-[14px]" style={{"fontVariationSettings": "\'FILL\' 1"}}>play_circle</span>
<span className="">Play Reel</span>
</button>
</div>
</div>
{/* Reel 3 */}
<div className="reel-card group rounded-2xl overflow-hidden bg-surface-container-low shadow-xl hover:shadow-[0_20px_40px_rgba(24,119,242,0.3)] border border-surface-container-high hover:border-primary/50 transition-all duration-300 flex flex-col justify-between">
<div className="relative w-full aspect-[9/16] overflow-hidden bg-black">
<img alt="Extreme Limestone Cliff FPV Dive" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIGGFTVbXBN-NzavHcH5ng3EhcwdYT9Ws_9wLcV0XFYCa-4PhOTjUP8znrO_O7YHl5Wi-84jZTt004l-SfBRjT8U5WjxToGYGQnmEyCe2Gy2ZoQZpdKF1G_im32eZq29uU3a9KTdc4G1Tyf6WEt6OVvDc8sZcFkDPKwvBav89HHh2EVoFcJso4uWcsC-wHjCZVQaLQCisjgvbnlrP_FxnkND3keIENlkYVPremWsmV" />
<div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/30 to-transparent"></div>
<div className="absolute top-3 left-3 right-3 flex items-center justify-between">
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#1877F2] text-white font-label-technical text-[10px] uppercase font-bold shadow">
<span className="material-symbols-outlined text-[12px]">smart_display</span> REEL 03
      </span>
<span className="px-2 py-0.5 rounded-full bg-surface-container-lowest/80 text-tertiary font-label-technical text-[10px] font-bold">
        FPV ACRO
      </span>
</div>
<button type="button" aria-label="Play Reel 3" className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#1877F2]/90 hover:bg-[#1877F2] text-white flex items-center justify-center shadow-[0_0_25px_rgba(24,119,242,0.7)] transform scale-90 group-hover:scale-100 transition-all duration-300" onClick={(e) => playReel(e.currentTarget, "https://web.facebook.com/share/r/1Kop2xZqPw/")}>
<span className="material-symbols-outlined text-[32px]" style={{"fontVariationSettings": "'FILL' 1"}}>play_arrow</span>
</button>
<div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-on-surface font-label-technical text-[11px]">
<span className="flex items-center gap-1 text-primary">
<span className="material-symbols-outlined text-[13px]">graphic_eq</span> Acro Speed Dive
      </span>
<span className="text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[13px]">visibility</span> 240K
      </span>
</div>
</div>
<div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
<div>
<span className="font-label-technical text-[10px] uppercase tracking-wider text-tertiary">Cliff Wall Maneuver</span>
<h3 className="font-headline-sm text-[16px] leading-tight text-on-surface group-hover:text-primary transition-colors mt-0.5">
        Extreme Limestone Cliff FPV Dive
      </h3>
</div>
<button type="button" className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#1877F2] text-white font-label-technical text-label-technical uppercase tracking-wider hover:bg-[#1567d3] shadow-md transition-all font-bold" onClick={(e) => playReel(e.currentTarget, "https://web.facebook.com/share/r/1Kop2xZqPw/")}>
<span className="material-symbols-outlined text-[14px]" style={{"fontVariationSettings": "\'FILL\' 1"}}>play_circle</span>
<span className="">Play Reel</span>
</button>
</div>
</div>
{/* Reel 4 */}
<div className="reel-card group rounded-2xl overflow-hidden bg-surface-container-low shadow-xl hover:shadow-[0_20px_40px_rgba(24,119,242,0.3)] border border-surface-container-high hover:border-primary/50 transition-all duration-300 flex flex-col justify-between">
<div className="relative w-full aspect-[9/16] overflow-hidden bg-black">
<img alt="Golden Hour Summit Barkada Flyby" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDB0N845vXzktlZKtAgjjJyrabswurrPlVzSKDfIzyWlEor0QDocYT8n3MwSj-QGwD-jb3TuKnQqtIzSkWLAebgHpFGDws0rqh51eRgyheC6DE-gZlh_EApV-6NR3B2x7hzSo8qg-BH8ERx1GmV-GY-KVtethhiYFaMh2neDjktICATWny2esLT0LFKtBNJZV7vJdtbGIgwCIURj2pAptVAmZ3jmgS4Dn1wo5D6hQqi9a7aGgGdpOncAw" />
<div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/30 to-transparent"></div>
<div className="absolute top-3 left-3 right-3 flex items-center justify-between">
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#1877F2] text-white font-label-technical text-[10px] uppercase font-bold shadow">
<span className="material-symbols-outlined text-[12px]">smart_display</span> REEL 04
      </span>
<span className="px-2 py-0.5 rounded-full bg-surface-container-lowest/80 text-secondary font-label-technical text-[10px] font-bold">
        BARKADA
      </span>
</div>
<button type="button" aria-label="Play Reel 4" className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#1877F2]/90 hover:bg-[#1877F2] text-white flex items-center justify-center shadow-[0_0_25px_rgba(24,119,242,0.7)] transform scale-90 group-hover:scale-100 transition-all duration-300" onClick={(e) => playReel(e.currentTarget, "https://web.facebook.com/share/r/1FpiGrmxBS/")}>
<span className="material-symbols-outlined text-[32px]" style={{"fontVariationSettings": "'FILL' 1"}}>play_arrow</span>
</button>
<div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-on-surface font-label-technical text-[11px]">
<span className="flex items-center gap-1 text-primary">
<span className="material-symbols-outlined text-[13px]">graphic_eq</span> Barkada Cheers
      </span>
<span className="text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[13px]">visibility</span> 180K
      </span>
</div>
</div>
<div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
<div>
<span className="font-label-technical text-[10px] uppercase tracking-wider text-secondary">Group Ascent Celebration</span>
<h3 className="font-headline-sm text-[16px] leading-tight text-on-surface group-hover:text-primary transition-colors mt-0.5">
        Golden Hour Summit Barkada Flyby
      </h3>
</div>
<button type="button" className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#1877F2] text-white font-label-technical text-label-technical uppercase tracking-wider hover:bg-[#1567d3] shadow-md transition-all font-bold" onClick={(e) => playReel(e.currentTarget, "https://web.facebook.com/share/r/1FpiGrmxBS/")}>
<span className="material-symbols-outlined text-[14px]" style={{"fontVariationSettings": "\'FILL\' 1"}}>play_circle</span>
<span className="">Play Reel</span>
</button>
</div>
</div>
{/* Reel 5 */}
<div className="reel-card group rounded-2xl overflow-hidden bg-surface-container-low shadow-xl hover:shadow-[0_20px_40px_rgba(24,119,242,0.3)] border border-surface-container-high hover:border-primary/50 transition-all duration-300 flex flex-col justify-between">
<div className="relative w-full aspect-[9/16] overflow-hidden bg-black">
<img alt="Dawn Ridgeline Ascent &amp; Cloud Inversion" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGkfR6Y9WG_ljXHZMUCT8VKjOlcai_gezb6K1Bf-TuuBjEq3UFjsmEuyoeYU2rKZnpqCk8VxGHf8iSpMb6dzZJmgXbC88ovTWZfVhkBxPu0mdajsFBZCXfrpEZ1BHhRPXqc7CiDnhnRyw2NZQNGoQ-wMKlCFwLV6AqxhtLKtxUYPXxEAtrDMCTIDnVa3r_w9eJRR0h7zFp_gXQ-j_QCLDofTRMVVZBHW6vs2z72OUbFPfLXMOV-DxOmg" />
<div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/30 to-transparent"></div>
<div className="absolute top-3 left-3 right-3 flex items-center justify-between">
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#1877F2] text-white font-label-technical text-[10px] uppercase font-bold shadow">
<span className="material-symbols-outlined text-[12px]">smart_display</span> REEL 05
      </span>
<span className="px-2 py-0.5 rounded-full bg-surface-container-lowest/80 text-primary font-label-technical text-[10px] font-bold">
        DAWN ASCENT
      </span>
</div>
<button type="button" aria-label="Play Reel 5" className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#1877F2]/90 hover:bg-[#1877F2] text-white flex items-center justify-center shadow-[0_0_25px_rgba(24,119,242,0.7)] transform scale-90 group-hover:scale-100 transition-all duration-300" onClick={(e) => playReel(e.currentTarget, "https://web.facebook.com/share/r/1Hih4yyNNU/")}>
<span className="material-symbols-outlined text-[32px]" style={{"fontVariationSettings": "'FILL' 1"}}>play_arrow</span>
</button>
<div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-on-surface font-label-technical text-[11px]">
<span className="flex items-center gap-1 text-primary">
<span className="material-symbols-outlined text-[13px]">graphic_eq</span> Ridgeline Wind
      </span>
<span className="text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[13px]">visibility</span> 290K
      </span>
</div>
</div>
<div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
<div>
<span className="font-label-technical text-[10px] uppercase tracking-wider text-primary">Capistrano Ridge Pass</span>
<h3 className="font-headline-sm text-[16px] leading-tight text-on-surface group-hover:text-primary transition-colors mt-0.5">
        Dawn Ridgeline Ascent &amp; Cloud Inversion
      </h3>
</div>
<button type="button" className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#1877F2] text-white font-label-technical text-label-technical uppercase tracking-wider hover:bg-[#1567d3] shadow-md transition-all font-bold" onClick={(e) => playReel(e.currentTarget, "https://web.facebook.com/share/r/1Hih4yyNNU/")}>
<span className="material-symbols-outlined text-[14px]" style={{"fontVariationSettings": "\'FILL\' 1"}}>play_circle</span>
<span className="">Play Reel</span>
</button>
</div>
</div>
</div>
{/* Prominent Facebook Profile & Direct Messenger Connect Banner */}
<div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-[#1877F2]/20 via-surface-container-high to-surface-container border border-[#1877F2]/40 backdrop-blur-xl flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
<div className="flex items-center gap-5">
<div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#1877F2] shadow-lg flex-shrink-0">
<img alt="Gilbert Official Profile" className="w-full h-full object-cover object-top" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGkfR6Y9WG_ljXHZMUCT8VKjOlcai_gezb6K1Bf-TuuBjEq3UFjsmEuyoeYU2rKZnpqCk8VxGHf8iSpMb6dzZJmgXbC88ovTWZfVhkBxPu0mdajsFBZCXfrpEZ1BHhRPXqc7CiDnhnRyw2NZQNGoQ-wMKlCFwLV6AqxhtLKtxUYPXxEAtrDMCTIDnVa3r_w9eJRR0h7zFp_gXQ-j_QCLDofTRMVVZBHW6vs2z72OUbFPfLXMOV-DxOmg" />
</div>
<div className="space-y-1">
<div className="flex items-center gap-2">
<span className="font-headline-sm text-headline-sm text-on-surface font-bold">Follow ItsGilbert on Facebook</span>
<span className="material-symbols-outlined text-[#1877F2] text-[20px]" title="Verified Drone Creator">verified</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant max-w-xl">
  Connect with Gilbert on his personal Facebook profile for summit hike schedules, customized aerial inquiries, and new weekend Capistrano flight drops.
</p>
</div>
</div>
<div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
<a className="px-6 py-3 rounded-full bg-[#1877F2] text-white font-label-md text-label-md uppercase tracking-wider font-bold shadow-[0_0_20px_rgba(24,119,242,0.5)] hover:bg-[#1567d3] transition-all flex items-center justify-center gap-2 flex-1 sm:flex-initial whitespace-nowrap" href="https://web.facebook.com/profile.php?id=100080806517537" rel="noopener noreferrer" target="_blank">
<span className="material-symbols-outlined text-[18px]">person_add</span>
<span className="">Follow ItsGilbert on Facebook</span>
</a>
<a className="px-6 py-3 rounded-full bg-surface-container-highest text-primary font-label-md text-label-md uppercase tracking-wider font-bold border border-primary/30 hover:bg-surface-variant transition-all flex items-center justify-center gap-2 flex-1 sm:flex-initial whitespace-nowrap" href="https://web.facebook.com/profile.php?id=100080806517537" rel="noopener noreferrer" target="_blank">
<span className="material-symbols-outlined text-[18px]">chat</span>
<span className="">Message Gilbert on FB</span>
</a>
</div>
</div>
</div>
</section>
{/* Shoot Packages & Expedition Rates Section */}
<section className="w-full bg-surface-container-lowest px-gutter lg:px-margin py-20" id="packages">
<div className="w-full max-w-7xl mx-auto space-y-12">
{/* Heading */}
<div className="text-center max-w-3xl mx-auto space-y-3">
<span className="font-label-technical text-label-technical uppercase tracking-widest text-secondary">Simple &amp; Transparent Rates</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-tight">
          Drone Shoot Packages &amp; Summit Slots
        </h2>
<p className="font-body-md text-body-md text-on-surface-variant">
          Book Gilbert to accompany your hiking group, pre-nuptial team, or tourism campaign to the summit of Mt. Capistrano.
        </p>
</div>
{/* 3 Tier Package Grid */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
{/* Package 1: Individual / Duo Hiker Reel */}
<div className="rounded-2xl p-8 bg-surface-container-low flex flex-col justify-between shadow-xl hover:shadow-2xl transition-all">
<div className="space-y-6">
<div className="flex items-center justify-between">
<span className="font-label-technical text-label-technical uppercase tracking-wider text-on-surface-variant">Package A</span>
<span className="px-2.5 py-1 rounded bg-surface-container font-label-technical text-label-technical text-primary">Solos &amp; Couples</span>
</div>
<div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Summit Reel Quick</h3>
<div className="mt-2 flex items-baseline gap-1">
<span className="text-headline-lg font-headline-lg text-secondary font-bold">₱2,800</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">/ climb</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                Ideal for solo hikers or adventurous couples who want high-impact Reels for TikTok and Facebook.
              </p>
</div>
<ul className="space-y-3 font-body-sm text-body-sm text-on-surface">
<li className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
<span className="">2x Cinematic 9:16 Facebook Reels</span>
</li>
<li className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
<span className="">Peak 360 Orbit &amp; Pull-away shot</span>
</li>
<li className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
<span className="">Color-graded ready to post</span>
</li>
<li className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
<span className="">24-Hour Google Drive delivery</span>
</li>
</ul>
</div>
<div className="pt-8">
<button className="w-full py-3.5 rounded-xl bg-surface-container-high text-on-surface hover:text-primary hover:bg-surface-variant font-label-lg text-label-lg uppercase tracking-wider font-bold transition-all" onClick={() => { selectPackage('Summit Reel Quick (₱2,800)'); }}>
              Choose Package A
            </button>
</div>
</div>
{/* Package 2: The Group Summit Expedition (FEATURED) */}
<div className="relative rounded-2xl p-8 bg-surface-container shadow-2xl flex flex-col justify-between transform md:-translate-y-4">
<div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-secondary text-on-secondary font-label-technical text-label-technical uppercase tracking-wider font-bold shadow-lg">
            Most Popular For Barkadas
          </div>
<div className="space-y-6 pt-2">
<div className="flex items-center justify-between">
<span className="font-label-technical text-label-technical uppercase tracking-wider text-secondary font-bold">Package B</span>
<span className="px-2.5 py-1 rounded bg-secondary/10 font-label-technical text-label-technical text-secondary font-bold">Groups (4-12 Pax)</span>
</div>
<div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Full Barkada Expedition</h3>
<div className="mt-2 flex items-baseline gap-1">
<span className="text-headline-lg font-headline-lg text-secondary font-bold">₱4,500</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">/ group</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                Complete dawn ascent coverage from trail ridge to summit celebration. High group energy guaranteed.
              </p>
</div>
<ul className="space-y-3 font-body-sm text-body-sm text-on-surface">
<li className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
<span className="">Full Dawn Summit Climb Coverage (4 Batteries)</span>
</li>
<li className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
<span className="">4x Edited Viral Facebook Reels (Group &amp; Individual)</span>
</li>
<li className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
<span className="">1x Master 4K Widescreen Landscape Highlight (2 mins)</span>
</li>
<li className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
<span className="">All Raw Uncut 4K D-Log Video Files Included</span>
</li>
<li className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
<span className="">15 High-Res Aerial Stills (Print Quality)</span>
</li>
</ul>
</div>
<div className="pt-8">
<button className="w-full py-3.5 rounded-xl bg-secondary text-on-secondary hover:bg-secondary-fixed font-label-lg text-label-lg uppercase tracking-wider font-bold shadow-[0_0_20px_rgba(245,158,11,0.45)] transition-all" onClick={() => { selectPackage('Full Barkada Expedition (₱4,500)'); }}>
              Book Barkada Package
            </button>
</div>
</div>
{/* Package 3: Pre-Nup & Commercial Cine */}
<div className="rounded-2xl p-8 bg-surface-container-low flex flex-col justify-between shadow-xl hover:shadow-2xl transition-all">
<div className="space-y-6">
<div className="flex items-center justify-between">
<span className="font-label-technical text-label-technical uppercase tracking-wider text-on-surface-variant">Package C</span>
<span className="px-2.5 py-1 rounded bg-surface-container font-label-technical text-label-technical text-tertiary">Pre-Nup &amp; Brand</span>
</div>
<div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Cinema Master Tier</h3>
<div className="mt-2 flex items-baseline gap-1">
<span className="text-headline-lg font-headline-lg text-tertiary font-bold">₱8,500</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">/ day</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                Premium multi-location Bukidnon production. Includes FPV high-speed chase and dual-operator capability.
              </p>
</div>
<ul className="space-y-3 font-body-sm text-body-sm text-on-surface">
<li className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
<span className="">Capistrano + Pine Forest + Communal Ranch Option</span>
</li>
<li className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
<span className="">High-Speed FPV + Cine Drone Double Coverage</span>
</li>
<li className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
<span className="">Licensed Audio Scoring &amp; Cinematic Sound Design</span>
</li>
<li className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
<span className="">Full CAAP Permit Clearances Handled</span>
</li>
</ul>
</div>
<div className="pt-8">
<button className="w-full py-3.5 rounded-xl bg-surface-container-high text-on-surface hover:text-primary hover:bg-surface-variant font-label-lg text-label-lg uppercase tracking-wider font-bold transition-all" onClick={() => { selectPackage('Cinema Master Tier (₱8,500)'); }}>
              Choose Cinema Tier
            </button>
</div>
</div>
</div>
</div>
</section>
{/* Interactive Climbers Testimonials & Reviews */}
<section className="w-full bg-background px-gutter lg:px-margin py-20">
<div className="w-full max-w-7xl mx-auto space-y-10">
<div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
<div>
<span className="font-label-technical text-label-technical uppercase tracking-widest text-primary">Word From The Summit</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-tight">Hiker Stories &amp; Feedback</h2>
</div>
<div className="flex items-center gap-2 text-secondary">
<span className="material-symbols-outlined text-[20px]" style={{"fontVariationSettings": "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[20px]" style={{"fontVariationSettings": "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[20px]" style={{"fontVariationSettings": "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[20px]" style={{"fontVariationSettings": "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[20px]" style={{"fontVariationSettings": "'FILL' 1"}}>star</span>
<span className="font-headline-sm text-headline-sm text-on-surface ml-2">5.0 / 5.0</span>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
{/* Testimonial 1 */}
<div className="p-6 rounded-2xl bg-surface-container-low shadow-xl space-y-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold">
              KD
            </div>
<div>
<div className="font-headline-sm text-body-md text-on-surface font-bold">Kyle &amp; Danica</div>
<div className="font-label-technical text-label-technical text-on-surface-variant uppercase">Davao City Hikers</div>
</div>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            "We were terrified of the rocky ledge at first, but Gilbert guided us where to stand while keeping the drone hovering like a silent hawk. When he sent our FB Reel that same night, our families were stunned. Super professional!"
          </p>
<div className="font-label-technical text-label-technical text-primary uppercase">Package: Summit Reel Quick</div>
</div>
{/* Testimonial 2 */}
<div className="p-6 rounded-2xl bg-surface-container shadow-2xl space-y-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              MO
            </div>
<div>
<div className="font-headline-sm text-body-md text-on-surface font-bold">Mindanao Outdoor Club</div>
<div className="font-label-technical text-label-technical text-on-surface-variant uppercase">14-Pax Ascent</div>
</div>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            "The 360-degree orbit shot of our whole group on the pinnacle got over 50,000 views on our Facebook page within 48 hours. Gilbert knows every single angle of Mt. Capistrano like the back of his hand."
          </p>
<div className="font-label-technical text-label-technical text-secondary uppercase">Package: Full Barkada Expedition</div>
</div>
{/* Testimonial 3 */}
<div className="p-6 rounded-2xl bg-surface-container-low shadow-xl space-y-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-tertiary/20 flex items-center justify-center text-tertiary font-bold">
              RA
            </div>
<div>
<div className="font-headline-sm text-body-md text-on-surface font-bold">Reina &amp; Anton</div>
<div className="font-label-technical text-label-technical text-on-surface-variant uppercase">Pre-Nup Adventure</div>
</div>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            "He caught the sunrise breaking right through the cloud sea behind us at 5:35 AM. His timing was surgical. Our wedding teaser video looks like a multimillion-dollar fantasy movie."
          </p>
<div className="font-label-technical text-label-technical text-tertiary uppercase">Package: Cinema Master Tier</div>
</div>
</div>
</div>
</section>
{/* Interactive Flight Booking Modal Dialog */}
<div className="fixed inset-0 z-50 flex items-center justify-center bg-surface-container-lowest/80 backdrop-blur-md px-4 hidden" id="booking-modal">
<div className="w-full max-w-xl rounded-2xl bg-surface-container shadow-2xl p-6 md:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto">
<button className="absolute top-5 right-5 text-on-surface-variant hover:text-on-surface" onClick={() => { $('booking-modal').classList.add('hidden'); }}>
<span className="material-symbols-outlined text-[24px]">close</span>
</button>
<div>
<span className="font-label-technical text-label-technical uppercase text-primary">Booking Dispatch // Flight Slot</span>
<h3 className="font-headline-md text-headline-md text-on-surface">Schedule Mt. Capistrano Aerial Flight</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">Gilbert accommodates 1 dawn summit flight per morning for prime sunrise conditions.</p>
</div>
<form className="space-y-4" onSubmit={(e) => { handleBookingSubmit(e); }}>
<div>
<label className="block font-label-technical text-label-technical uppercase text-on-surface-variant mb-1">Target Shoot Package</label>
<input className="w-full px-4 py-3 rounded-lg bg-surface-container-high text-primary font-label-md text-label-md outline-none" id="modal-package-input" readOnly type="text" defaultValue="Full Barkada Expedition (₱4,500)" />
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div>
<label className="block font-label-technical text-label-technical uppercase text-on-surface-variant mb-1">Hiker / Group Lead Name</label>
<input className="w-full px-4 py-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm outline-none focus:ring-1 focus:ring-primary" placeholder="e.g. Juan dela Cruz" required type="text" />
</div>
<div>
<label className="block font-label-technical text-label-technical uppercase text-on-surface-variant mb-1">Mobile / WhatsApp</label>
<input className="w-full px-4 py-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm outline-none focus:ring-1 focus:ring-primary" placeholder="+63 9XX XXX XXXX" required type="tel" />
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div>
<label className="block font-label-technical text-label-technical uppercase text-on-surface-variant mb-1">Planned Hike Date</label>
<input className="w-full px-4 py-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm outline-none focus:ring-1 focus:ring-primary" required type="date" />
</div>
<div>
<label className="block font-label-technical text-label-technical uppercase text-on-surface-variant mb-1">Estimated Pax Count</label>
<input className="w-full px-4 py-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm outline-none focus:ring-1 focus:ring-primary" max="25" min="1" placeholder="e.g. 6" type="number" />
</div>
</div>
<div>
<label className="block font-label-technical text-label-technical uppercase text-on-surface-variant mb-1">Special Shots / Notes</label>
<textarea className="w-full px-4 py-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm outline-none focus:ring-1 focus:ring-primary" placeholder="e.g. We want sunrise cloud inversion pull-away and 360 pinnacle orbit..." rows={2}></textarea>
</div>
<div className="hidden p-3 rounded bg-primary/20 text-primary font-body-sm text-body-sm" id="booking-success-msg">
          Flight Slot Inquiry Received! Gilbert will message you on WhatsApp/SMS within 2 hours.
        </div>
<div className="pt-2">
<button className="w-full py-4 rounded-xl bg-secondary text-on-secondary font-label-lg text-label-lg uppercase tracking-wider font-bold shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:bg-secondary-fixed transition-all flex items-center justify-center gap-2" type="submit">
<span className="material-symbols-outlined text-[20px]">flight_takeoff</span>
<span className="">Confirm &amp; Check Availability</span>
</button>
</div>
</form>
</div>
</div>
{/* Interactive JavaScript Controller */}

</div></main><footer className="w-full bg-surface-container-lowest"><div className="w-full px-gutter lg:px-margin pt-space-xl pb-space-lg"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-space-lg"><div className="space-y-4"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-primary font-headline-sm font-bold border border-primary/30">G</div><span className="font-headline-sm text-headline-sm text-on-surface uppercase">ItsGilbert</span></div><p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Cinematic 4K FPV and aerial filming specialist based in Bukidnon, Philippines. Capturing dramatic limestone cliffs, sunrise inversions, and raw adventure storytelling across Mt. Capistrano and beyond.</p><div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container text-primary font-label-technical text-label-technical"><span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span><span className="">BASE: SAN FERNANDO &amp; MALAYBALAY, BUKIDNON</span></div></div><div className="space-y-3"><h4 className="font-headline-sm text-headline-sm text-on-surface uppercase">Aerial Portfolios</h4><ul className="space-y-2 font-body-sm text-body-sm text-on-surface-variant"><li className="hover:text-primary transition-colors cursor-pointer"><a href="https://web.facebook.com/share/r/1EvT5WPKrv/" rel="noopener noreferrer" target="_blank" className="">Reel 1: Sunrise Sea of Clouds</a></li><li className="hover:text-primary transition-colors cursor-pointer"><a href="https://web.facebook.com/share/r/1J34qLBRoc/" rel="noopener noreferrer" target="_blank" className="">Reel 2: Pinnacle Edge 360 Orbit</a></li><li className="hover:text-primary transition-colors cursor-pointer"><a href="https://web.facebook.com/share/r/1Kop2xZqPw/" rel="noopener noreferrer" target="_blank" className="">Reel 3: Extreme Limestone Cliff Dive</a></li><li className="hover:text-primary transition-colors cursor-pointer"><a href="https://web.facebook.com/share/r/1FpiGrmxBS/" rel="noopener noreferrer" target="_blank" className="">Reel 4: Summit Barkada Flyby</a></li><li className="hover:text-primary transition-colors cursor-pointer"><a href="https://web.facebook.com/share/r/1Hih4yyNNU/" rel="noopener noreferrer" target="_blank" className="">Reel 5: Dawn Ridgeline Ascent</a></li></ul></div><div className="space-y-3"><h4 className="font-headline-sm text-headline-sm text-on-surface uppercase">Navigation &amp; Social</h4><ul className="space-y-2 font-body-sm text-body-sm text-on-surface-variant"><li className="hover:text-[#1877F2] transition-colors"><a className="flex items-center gap-1.5" href="https://web.facebook.com/profile.php?id=100080806517537" rel="noopener noreferrer" target="_blank"><span className="material-symbols-outlined text-[16px]">person</span> Gilbert's Facebook Profile</a></li><li className="hover:text-primary transition-colors cursor-pointer"><a href="#packages" className="">Services &amp; Day-Rate Packages</a></li><li className="hover:text-primary transition-colors cursor-pointer"><a href="#reels-gallery" className="">All 5 Featured FB Reels</a></li><li className="hover:text-primary transition-colors cursor-pointer">Licensing &amp; Drone Permit Clearance</li><li className="hover:text-primary transition-colors cursor-pointer"><a href="#packages" className="">Book an Aerial Shoot</a></li></ul></div><div className="space-y-3"><h4 className="font-headline-sm text-headline-sm text-on-surface uppercase">Flight Dispatch &amp; Inquiries</h4><p className="font-body-sm text-body-sm text-on-surface-variant">Ready to film your summit ascent, brand campaign, or event?</p><div className="space-y-2 font-body-sm text-body-sm"><div className="flex items-center gap-2 text-on-surface-variant"><span className="material-symbols-outlined text-[#1877F2] text-[18px]">share</span><a className="hover:text-[#1877F2] transition-colors" href="https://web.facebook.com/profile.php?id=100080806517537" rel="noopener noreferrer" target="_blank">facebook.com/ItsGilbert</a></div><div className="flex items-center gap-2 text-on-surface-variant"><span className="material-symbols-outlined text-primary text-[18px]">mail</span><span className="">drone@itsgilbert.ph</span></div><div className="flex items-center gap-2 text-on-surface-variant"><span className="material-symbols-outlined text-secondary text-[18px]">call</span><span className="">+63 917 CAPISTRANO</span></div><div className="flex items-center gap-2 text-on-surface-variant"><span className="material-symbols-outlined text-tertiary text-[18px]">location_on</span><span className="">Bukidnon, Northern Mindanao, PH</span></div></div></div></div><div className="pt-space-md flex flex-col md:flex-row items-center justify-between gap-4"><p className="font-body-sm text-body-sm text-on-surface-variant">© 2025 ItsGilbert Aerial Cinematography. All rights reserved. Mt. Capistrano Series.</p><div className="flex items-center gap-6 font-label-technical text-label-technical uppercase text-on-surface-variant"><a className="hover:text-[#1877F2] transition-colors" href="https://web.facebook.com/profile.php?id=100080806517537" rel="noopener noreferrer" target="_blank">Gilbert on Facebook</a><span className="hover:text-primary cursor-pointer transition-colors">CAAP Compliant</span><span className="hover:text-primary cursor-pointer transition-colors">4K / 60FPS D-LOG</span><span className="hover:text-primary cursor-pointer transition-colors">Sub-250G &amp; Heavy Cine</span></div></div></div></footer>


</>
  );
}
