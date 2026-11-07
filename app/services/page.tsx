"use client";

import type { FormEvent } from "react";

// ponytail: ported Stitch's vanilla DOM handlers as-is. Safe because this page holds no React
// state (nothing re-renders over the DOM edits). Move to useState if the page gains state.
const $ = (id: string) => document.getElementById(id)!;

type Mode = "session" | "expedition";
const pricingData = {
  session: {
    solo: { price: "₱2,500", usd: "($45 USD)", note: "Standard 1-Day Summit Push" },
    group: { price: "₱4,500", usd: "($80 USD)", note: "Up to 8 Hikers / Crew" },
    prenup: { price: "₱8,500", usd: "($150 USD)", note: "Couples • Brands • Tourism" },
  },
  expedition: {
    solo: { price: "₱3,800", usd: "($68 USD)", note: "Overnight Camp & Sunset/Sunrise" },
    group: { price: "₱7,000", usd: "($125 USD)", note: "2-Day Overnighter • Full Campfire Coverage" },
    prenup: { price: "₱12,500", usd: "($225 USD)", note: "Overnight VIP Tent + 2 Golden Hours" },
  },
};
const PILL = "px-6 py-2 rounded-full font-label-lg text-label-lg transition-all flex items-center gap-2 ";
const PILL_OFF = PILL + "text-on-surface-variant hover:text-on-surface";

function setPricingMode(mode: Mode) {
  $("btn-session").className = mode === "session" ? PILL + "bg-primary text-on-primary shadow-sm" : PILL_OFF;
  $("btn-expedition").className = mode === "expedition" ? PILL + "bg-secondary text-on-secondary shadow-sm" : PILL_OFF;
  for (const [tier, d] of Object.entries(pricingData[mode])) {
    $(`price-${tier}`).textContent = d.price;
    $(`usd-${tier}`).textContent = d.usd;
    $(`note-${tier}`).textContent = d.note;
  }
}

let addonTotal = 0;
function toggleAddon(button: HTMLElement, amount: number) {
  const on = button.dataset.selected !== "true";
  button.dataset.selected = String(on);
  button.textContent = on ? "Added ✓" : "Add to Climb";
  button.classList.toggle("bg-primary", on);
  button.classList.toggle("text-on-primary", on);
  button.classList.toggle("bg-surface-container-highest", !on);
  button.classList.toggle("text-on-surface", !on);
  addonTotal += on ? amount : -amount;
  $("addon-total-price").textContent = "₱" + addonTotal.toLocaleString();
}

function toggleFaq(button: HTMLElement) {
  const answer = button.parentElement!.querySelector(".faq-answer")!;
  const icon = button.querySelector<HTMLElement>(".material-symbols-outlined")!;
  const opening = answer.classList.contains("hidden");
  document.querySelectorAll(".faq-answer").forEach((el) => el.classList.add("hidden"));
  document.querySelectorAll<HTMLElement>(".faq-item .material-symbols-outlined").forEach((el) => (el.style.transform = "rotate(0deg)"));
  if (opening) {
    answer.classList.remove("hidden");
    icon.style.transform = "rotate(180deg)";
  }
}

function handleBookingSubmit(e: FormEvent) {
  e.preventDefault();
  $("booking-success").classList.remove("hidden");
  setTimeout(() => $("booking-success").scrollIntoView({ behavior: "smooth" }), 100);
}

export default function Services() {
  return (
    <><header className="fixed top-0 left-0 w-full z-50 bg-surface-container-lowest/80 backdrop-blur-xl shadow-[0_16px_36px_-8px_rgba(0,0,0,0.6)]"><div className="h-20 w-full px-gutter lg:px-margin flex items-center justify-between gap-4"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-primary font-headline-sm font-bold border border-primary/30">G</div><div className="flex flex-col"><span className="font-headline-sm text-headline-sm uppercase text-on-surface leading-none tracking-tight">ItsGilbert</span><span className="font-label-technical text-label-technical uppercase text-primary tracking-widest">Mt. Capistrano Drone Works</span></div></div><nav className="hidden xl:flex items-center gap-6" data-active-classes="bg-surface-container-high text-primary font-bold"><a className="font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors py-2 px-3 rounded" data-path="portfolio-and-fb-reels" href="/#reels-gallery">Portfolio &amp; FB Reels</a><a className="font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors py-2 px-3 rounded" data-path="services-and-rates" href="/services">Services &amp; Rates</a><a className="font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors py-2 px-3 rounded" data-path="drone-gear-and-telemetry" href="/#reels-gallery">Drone Gear</a><a className="font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors py-2 px-3 rounded" data-path="about-gilbert" href="https://web.facebook.com/profile.php?id=100080806517537" rel="noopener noreferrer" target="_blank">About Gilbert</a><a className="font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors py-2 px-3 rounded" data-path="location-and-expeditions" href="/#packages">Bukidnon Summit Expeditions</a></nav><div className="flex items-center gap-4"><div className="hidden sm:flex items-center gap-2"><a className="w-9 h-9 rounded flex items-center justify-center bg-surface-container-low text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors" href="https://web.facebook.com/profile.php?id=100080806517537" rel="noopener noreferrer" target="_blank" title="Facebook Reels"><span className="material-symbols-outlined text-[18px]">movie</span></a><a className="w-9 h-9 rounded flex items-center justify-center bg-surface-container-low text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors" href="https://web.facebook.com/profile.php?id=100080806517537" rel="noopener noreferrer" target="_blank" title="Instagram"><span className="material-symbols-outlined text-[18px]">photo_camera</span></a><a className="w-9 h-9 rounded flex items-center justify-center bg-surface-container-low text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors" href="https://web.facebook.com/profile.php?id=100080806517537" rel="noopener noreferrer" target="_blank" title="TikTok"><span className="material-symbols-outlined text-[18px]">play_circle</span></a><a className="w-9 h-9 rounded flex items-center justify-center bg-surface-container-low text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors" href="https://web.facebook.com/profile.php?id=100080806517537" rel="noopener noreferrer" target="_blank" title="YouTube 4K"><span className="material-symbols-outlined text-[18px]">smart_display</span></a></div><a className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary text-on-secondary font-label-lg text-label-lg uppercase tracking-wider shadow-[0_0_18px_rgba(245,158,11,0.45)] hover:bg-secondary-fixed transition-all" data-path="book-a-flight" href="#booking-inquiry"><span className="material-symbols-outlined text-[18px]">flight_takeoff</span><span>Book Flight</span></a><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main className="w-full pt-20 bg-background min-h-screen"><div className="flex flex-col w-full">
{/* Top Technical Breadcrumb & Telemetry Ticker */}
<section className="w-full bg-surface-container-lowest px-gutter lg:px-margin py-3">
<div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 font-label-technical text-label-technical text-on-surface-variant">
<div className="flex items-center gap-3">
<span className="inline-block w-2 h-2 rounded-full bg-primary animate-ping"></span>
<span className="text-primary tracking-widest uppercase">DISPATCH: ACTIVE PILOT ON-SITE</span>
<span className="text-outline-variant">/</span>
<span className="text-on-surface">LOC: MT. CAPISTRANO, SIMAYA, MALAYBALAY CITY (610 MASL)</span>
</div>
<div className="flex items-center gap-6">
<span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[15px] text-tertiary">air</span> WIND RESIST: 12 M/S</span>
<span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[15px] text-secondary">videocam</span> 4K 60FPS D-LOG</span>
<span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[15px] text-primary">battery_charging_full</span> RAPID HUB DISPATCH</span>
</div>
</div>
</section>
{/* Editorial Section Header with Live Flight Booking Toggle */}
<section className="relative w-full px-gutter lg:px-margin pt-12 pb-16 overflow-hidden">
{/* Atmospheric Ambient Glows */}
<div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[320px] bg-primary/5 rounded-full blur-[140px] pointer-events-none"></div>
<div className="absolute -top-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none"></div>
<div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
<div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface-container-high shadow-inner">
<span className="material-symbols-outlined text-secondary text-[16px]">verified</span>
<span className="font-label-technical text-label-technical text-secondary uppercase tracking-widest">OFFICIAL 2025 ADVENTURE FILM PACKAGES</span>
</div>
<h1 className="font-headline-lg text-headline-lg lg:text-display-hero lg:font-display-hero text-on-surface tracking-tight">
        Transparent Mountain Shoot Rates &amp; Packages
      </h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
        Professional 4K drone cinematography tailored for solo hikers, groups, pre-nup shoots, and adventure tourism in Mt. Capistrano, Malaybalay &amp; San Fernando, Bukidnon.
      </p>
{/* Billing Mode Segmented Switch */}
<div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
<div className="bg-surface-container-high p-1 rounded-full flex items-center shadow-lg">
<button className="px-6 py-2 rounded-full font-label-lg text-label-lg transition-all bg-primary text-on-primary shadow-sm flex items-center gap-2" id="btn-session" onClick={() => { setPricingMode('session'); }}>
<span className="material-symbols-outlined text-[18px]">hiking</span>
<span>Per Hike Session</span>
</button>
<button className="px-6 py-2 rounded-full font-label-lg text-label-lg transition-all text-on-surface-variant hover:text-on-surface flex items-center gap-2" id="btn-expedition" onClick={() => { setPricingMode('expedition'); }}>
<span className="material-symbols-outlined text-[18px]">landscape</span>
<span>Full Expedition / Overnight</span>
</button>
</div>
<span className="font-label-technical text-label-technical text-tertiary px-3 py-1 bg-surface-container rounded-full flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">bolt</span> ALL SLOTS INCLUDE SD-CARD TRANSFER &amp; DRIVE LINK
        </span>
</div>
</div>
</section>
{/* Pricing Cards Showcase */}
<section className="w-full px-gutter lg:px-margin pb-20 relative z-10">
<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
{/* Card 1: Solo Hiker Peak Reel */}
<div className="group relative flex flex-col justify-between rounded-xl bg-surface-container-low/80 backdrop-blur-xl p-8 shadow-xl transition-all duration-300 hover:scale-[1.01] hover:bg-surface-container">
<div className="space-y-6">
<div className="flex items-center justify-between">
<span className="font-label-technical text-label-technical uppercase tracking-wider text-primary px-3 py-1 bg-surface-container-highest rounded-full">
              Trail Single
            </span>
<span className="font-label-technical text-label-technical text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">timer</span> 24h Turnaround
            </span>
</div>
<div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Solo Hiker Peak Reel</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
              Designed for trail runners, solo backpackers, and digital creators wanting razor-sharp peak proof.
            </p>
</div>
{/* Dynamic Pricing Block */}
<div className="py-4 bg-surface-container-lowest/60 rounded-xl px-5 flex items-baseline justify-between">
<div>
<div className="flex items-baseline gap-2">
<span className="font-headline-lg text-headline-lg text-on-surface" id="price-solo">₱2,500</span>
<span className="font-label-md text-label-md text-on-surface-variant" id="usd-solo">($45 USD)</span>
</div>
<span className="font-label-technical text-label-technical text-primary" id="note-solo">Standard 1-Day Summit Push</span>
</div>
<span className="material-symbols-outlined text-outline text-3xl">flight</span>
</div>
{/* Feature Checklist */}
<div className="space-y-3 pt-2">
<div className="font-label-technical text-label-technical uppercase tracking-wider text-outline">Flight Deliverables</div>
<div className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">check_circle</span>
<span className="font-body-md text-body-md text-on-surface"><strong>1 High-Altitude</strong> Summit Flight (18-22 mins airtime)</span>
</div>
<div className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">check_circle</span>
<span className="font-body-md text-body-md text-on-surface"><strong>2 Edited Vertical Reels</strong> (9:16 vertical 4K with trending sound/color grade)</span>
</div>
<div className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">check_circle</span>
<span className="font-body-md text-body-md text-on-surface"><strong>10 Ultra-HD</strong> Raw Drone Aerial Stills</span>
</div>
<div className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">check_circle</span>
<span className="font-body-md text-body-md text-on-surface"><strong>24-Hour Express Turnaround</strong> delivered via secure Google Drive</span>
</div>
<div className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">check_circle</span>
<span className="font-body-md text-body-md text-on-surface">Basic summit ridge safety brief &amp; flight spotter coordination</span>
</div>
</div>
</div>
<div className="pt-8 mt-6">
<a className="w-full py-3.5 px-6 rounded-full bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-lg text-label-lg uppercase tracking-wider flex items-center justify-center gap-2 transition-all" href="#booking-inquiry">
<span>Select Solo Reel</span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</a>
</div>
</div>
{/* Card 2: Summit Barkada / Group Special (Featured / Highlighted) */}
<div className="group relative flex flex-col justify-between rounded-xl bg-surface-container p-8 shadow-2xl transition-all duration-300 hover:scale-[1.02] shadow-[0_20px_50px_rgba(238,152,0,0.18)] lg:-mt-4 lg:mb-[-1rem]">
{/* Gradient Ambient Halo */}
<div className="absolute inset-0 rounded-xl bg-gradient-to-b from-secondary/15 via-transparent to-primary/5 pointer-events-none"></div>
<div className="relative z-10 space-y-6">
<div className="flex items-center justify-between">
<span className="font-label-technical text-label-technical uppercase tracking-wider text-on-secondary-container bg-secondary-container px-3.5 py-1 rounded-full shadow-sm font-bold flex items-center gap-1.5">
<span className="material-symbols-outlined text-[14px]">star</span> BEST VALUE • MOST POPULAR
            </span>
<span className="font-label-technical text-label-technical text-secondary flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">bolt</span> 3 Full Batteries
            </span>
</div>
<div>
<div className="flex items-center gap-2">
<h3 className="font-headline-sm text-headline-sm text-on-surface">Summit Barkada / Group Special</h3>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
              The flagship adventure film package for trekking groups, hiking cliques, and trail families conquering the limestone pinnacles together.
            </p>
</div>
{/* Highlight Preview Frame */}
<div className="relative rounded-xl overflow-hidden shadow-lg aspect-video bg-surface-container-lowest">
<img className="w-full h-full object-cover" data-alt="High angle drone photograph looking straight down at the rugged limestone pinnacles of Mt Capistrano in Bukidnon Philippines with a group of cheerful hikers standing triumphantly on the razor edge rocks overlooking misty green rice paddies and morning valley fog, natural cinematic sunlight, atmospheric mountain grandeur" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5FmJOZEV9fdEVHYt9K6TBdeoqQVRvtO8-JlLS_Y7g2N47eX6N4WaXKRO_OgcxkrI3jxsfWrbG591AcBbgKvErm3uXm_yWOF2P9sFsgt63gHmZuS_jc4fyJccWMcFi0M8cZkVLXLIHm934sUWexDcQUBUszgrBLjFzGOZJcJZ1phVF_i-xUdB562BMpaLLnP0x8MmioN4hllj5qKYw70v6Vo32rYN4Qkm7TxtL6B_Q" />
<div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 via-transparent to-transparent flex items-end p-3">
<span className="font-label-technical text-label-technical text-secondary flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">photo_camera</span> SUMMIT PINNACLE ORBIT INCLUDED
              </span>
</div>
</div>
{/* Dynamic Pricing Block */}
<div className="py-4 bg-surface-container-lowest rounded-xl px-5 flex items-baseline justify-between shadow-inner">
<div>
<div className="flex items-baseline gap-2">
<span className="font-headline-lg text-headline-lg text-secondary" id="price-group">₱4,500</span>
<span className="font-label-md text-label-md text-on-surface-variant" id="usd-group">($80 USD)</span>
</div>
<span className="font-label-technical text-label-technical text-on-surface-variant" id="note-group">Up to 8 Hikers / Crew</span>
</div>
<span className="font-label-technical text-label-technical uppercase px-2.5 py-1 bg-surface-container-high rounded text-primary">Priority 48H Edit</span>
</div>
{/* Feature Checklist */}
<div className="space-y-3 pt-2">
<div className="font-label-technical text-label-technical uppercase tracking-wider text-secondary">Expedition Package Deliverables</div>
<div className="flex items-start gap-3">
<span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">check_circle</span>
<span className="font-body-md text-body-md text-on-surface"><strong>3 Full Battery Drone Flights</strong> (Ascent Trail Run, Summit Pinnacle 360° Orbit, Cliff Edge Pose)</span>
</div>
<div className="flex items-start gap-3">
<span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">check_circle</span>
<span className="font-body-md text-body-md text-on-surface"><strong>4 High-Energy Edited Reels</strong> + 1 Master 16:9 4K Cinematic Montage (2 mins with licensed score)</span>
</div>
<div className="flex items-start gap-3">
<span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">check_circle</span>
<span className="font-body-md text-body-md text-on-surface"><strong>Group wide-angle summit reveal</strong> shots framing the whole valley floor below</span>
</div>
<div className="flex items-start gap-3">
<span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">check_circle</span>
<span className="font-body-md text-body-md text-on-surface"><strong>25+ Color-Graded Summit Photos</strong> &amp; uncompressed D-Log camera masters</span>
</div>
<div className="flex items-start gap-3">
<span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">check_circle</span>
<span className="font-body-md text-body-md text-on-surface"><strong>Priority edit delivery</strong> within 48 hours for immediate trail flex</span>
</div>
</div>
</div>
<div className="pt-8 mt-6 relative z-10">
<a className="w-full py-4 px-6 rounded-full bg-secondary text-on-secondary hover:bg-secondary-fixed font-headline-sm text-headline-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(255,185,95,0.4)] transition-all" href="#booking-inquiry">
<span className="material-symbols-outlined text-[20px]">flight_takeoff</span>
<span>Book Group Special</span>
</a>
</div>
</div>
{/* Card 3: Ultimate Adventure & Pre-Nup Expedition */}
<div className="group relative flex flex-col justify-between rounded-xl bg-surface-container-low/80 backdrop-blur-xl p-8 shadow-xl transition-all duration-300 hover:scale-[1.01] hover:bg-surface-container">
<div className="space-y-6">
<div className="flex items-center justify-between">
<span className="font-label-technical text-label-technical uppercase tracking-wider text-tertiary px-3 py-1 bg-surface-container-highest rounded-full">
              Cinematic Masterclass
            </span>
<span className="font-label-technical text-label-technical text-primary flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">wb_twilight</span> 4:00 AM Call Time
            </span>
</div>
<div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Ultimate Adventure &amp; Pre-Nup</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
              Unrivaled sunrise golden hour aerials with sea of clouds coverage, cinematic FPV dives, and dedicated mountain logistical support.
            </p>
</div>
{/* Dynamic Pricing Block */}
<div className="py-4 bg-surface-container-lowest/60 rounded-xl px-5 flex items-baseline justify-between">
<div>
<div className="flex items-baseline gap-2">
<span className="font-headline-lg text-headline-lg text-on-surface" id="price-prenup">₱8,500</span>
<span className="font-label-md text-label-md text-on-surface-variant" id="usd-prenup">($150 USD)</span>
</div>
<span className="font-label-technical text-label-technical text-tertiary" id="note-prenup">Couples • Brands • Tourism</span>
</div>
<span className="material-symbols-outlined text-outline text-3xl">camera</span>
</div>
{/* Feature Checklist */}
<div className="space-y-3 pt-2">
<div className="font-label-technical text-label-technical uppercase tracking-wider text-outline">VIP Shoot Features</div>
<div className="flex items-start gap-3">
<span className="material-symbols-outlined text-tertiary text-[20px] shrink-0 mt-0.5">check_circle</span>
<span className="font-body-md text-body-md text-on-surface"><strong>Sunrise Sea of Clouds Golden Hour</strong> dedicated shoot (Ascent kicks off at 04:00 AM)</span>
</div>
<div className="flex items-start gap-3">
<span className="material-symbols-outlined text-tertiary text-[20px] shrink-0 mt-0.5">check_circle</span>
<span className="font-body-md text-body-md text-on-surface"><strong>5 Heavy Battery Packs coverage</strong> with aggressive FPV cliff-dive chase sequences</span>
</div>
<div className="flex items-start gap-3">
<span className="material-symbols-outlined text-tertiary text-[20px] shrink-0 mt-0.5">check_circle</span>
<span className="font-body-md text-body-md text-on-surface"><strong>Dedicated Mountain Porter assistance</strong> to haul outfit changes, lighting, &amp; drone rigs</span>
</div>
<div className="flex items-start gap-3">
<span className="material-symbols-outlined text-tertiary text-[20px] shrink-0 mt-0.5">check_circle</span>
<span className="font-body-md text-body-md text-on-surface"><strong>Full 4K Color Graded Highlight Film</strong> with tailored sound design &amp; dialogue audio syncing</span>
</div>
<div className="flex items-start gap-3">
<span className="material-symbols-outlined text-tertiary text-[20px] shrink-0 mt-0.5">check_circle</span>
<span className="font-body-md text-body-md text-on-surface"><strong>Unlimited RAW ProRes / DNG stills</strong> delivered on a sanitized 64GB high-speed thumb drive</span>
</div>
</div>
</div>
<div className="pt-8 mt-6">
<a className="w-full py-3.5 px-6 rounded-full bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-lg text-label-lg uppercase tracking-wider flex items-center justify-center gap-2 transition-all" href="#booking-inquiry">
<span>Reserve Expedition Tier</span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</a>
</div>
</div>
</div>
</section>
{/* Interactive Flight Telemetry & Equipment Rig Section */}
<section className="w-full bg-surface-container-low px-gutter lg:px-margin py-20 relative">
<div className="max-w-7xl mx-auto space-y-12">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
<div>
<span className="font-label-technical text-label-technical uppercase tracking-widest text-primary">MISSION TELEMETRY • HARDWARE SPECS</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface mt-2">What Powers Your Mountain Flight</h2>
</div>
<p className="font-body-md text-body-md text-on-surface-variant max-w-md">
          Flying high on Mt. Capistrano demands extreme wind-shear resistance, redundant signal relays, and thermal management in high-altitude tropical humidity.
        </p>
</div>
{/* Bento Visual Rig Display */}
<div className="grid grid-cols-1 md:grid-cols-12 gap-6">
{/* Main Pilot Photo Showcase */}
<div className="md:col-span-5 rounded-xl overflow-hidden bg-surface-container-highest relative min-h-[360px] shadow-xl">
<img className="w-full h-full object-cover" data-alt="Gilbert the outdoor drone videographer wearing an athletic black technical shell jacket and cap, sitting focused on the rugged limestone cliff summit of Mt Capistrano Bukidnon holding an advanced DJI drone remote controller with antennas extended, expansive hazy valley landscape background under dramatic atmospheric morning clouds" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIGGFTVbXBN-NzavHcH5ng3EhcwdYT9Ws_9wLcV0XFYCa-4PhOTjUP8znrO_O7YHl5Wi-84jZTt004l-SfBRjT8U5WjxToGYGQnmEyCe2Gy2ZoQZpdKF1G_im32eZq29uU3a9KTdc4G1Tyf6WEt6OVvDc8sZcFkDPKwvBav89HHh2EVoFcJso4uWcsC-wHjCZVQaLQCisjgvbnlrP_FxnkND3keIENlkYVPremWsmV" />
<div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/30 to-transparent p-6 flex flex-col justify-end">
<span className="font-label-technical text-label-technical text-secondary uppercase">GILBERT IN COMMAND</span>
<span className="font-headline-sm text-headline-sm text-on-surface">Experienced Mountain Drone Operator</span>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">150+ Successful Summit Missions across Northern Mindanao karst peaks.</p>
</div>
</div>
{/* Telemetry HUD & Rig Stats */}
<div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
<div className="p-6 rounded-xl bg-surface-container shadow-md space-y-3">
<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
<span className="material-symbols-outlined">radar</span>
</div>
<h4 className="font-headline-sm text-headline-sm text-on-surface">15km O3+ Video Feed</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Zero lag live HD stream down to the viewing monitor so hiking clients can watch the framing from safe ledge spots.</p>
<div className="pt-2 font-label-technical text-label-technical text-primary">LATENCY: 28MS • BITRATE: 50MBPS</div>
</div>
<div className="p-6 rounded-xl bg-surface-container shadow-md space-y-3">
<div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined">speed</span>
</div>
<h4 className="font-headline-sm text-headline-sm text-on-surface">Level 6 Wind Resistance</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Capistrano's pinnacle generates severe gust vortices; our Cine Rigs hold rock-solid horizon lock even at 35km/h wind gusts.</p>
<div className="pt-2 font-label-technical text-label-technical text-secondary">STABILIZATION: 3-AXIS MECHANICAL GIMBAL</div>
</div>
<div className="p-6 rounded-xl bg-surface-container shadow-md space-y-3">
<div className="w-10 h-10 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined">hdr_on</span>
</div>
<h4 className="font-headline-sm text-headline-sm text-on-surface">10-Bit D-Log M Color</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Preserving over 1 billion colors: deep green Bukidnon rice fields, golden morning sunlight, and raw jagged limestone contrast.</p>
<div className="pt-2 font-label-technical text-label-technical text-tertiary">CODEC: H.265 / ALL-I 4K RESOLUTION</div>
</div>
<div className="p-6 rounded-xl bg-surface-container shadow-md space-y-3">
<div className="w-10 h-10 rounded-full bg-primary-fixed-dim/10 flex items-center justify-center text-primary-fixed-dim">
<span className="material-symbols-outlined">cloud_sync</span>
</div>
<h4 className="font-headline-sm text-headline-sm text-on-surface">Rapid AirDrop &amp; Cloud Sync</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Don't wait days. Receive sneak-peek raw footage while sipping Bukidnon brewed coffee at the mountain foot trailhead camp.</p>
<div className="pt-2 font-label-technical text-label-technical text-primary-fixed-dim">TRANSFER: 105MB/S FIELD OFFLOAD</div>
</div>
</div>
</div>
</div>
</section>
{/* Add-Ons & Gear Upgrades Modular Table */}
<section className="w-full px-gutter lg:px-margin py-20">
<div className="max-w-5xl mx-auto space-y-8">
<div className="text-center space-y-3">
<span className="font-label-technical text-label-technical uppercase tracking-widest text-secondary">CUSTOMIZE YOUR ASCENT</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface">Expedition Add-Ons &amp; Modular Extras</h2>
<p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
          Scale your drone production with custom flight time, FPV high-velocity dives, or lightning-fast turnaround.
        </p>
</div>
<div className="bg-surface-container rounded-xl overflow-hidden shadow-xl">
<div className="divide-y divide-surface-container-highest">
{/* Item 1 */}
<div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-surface-container-high transition-colors">
<div className="space-y-1">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-secondary text-[22px]">flash_on</span>
<h4 className="font-headline-sm text-headline-sm text-on-surface">Same-Day Quick Cut for Social Stories</h4>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant max-w-xl">
                Immediate 15-second teaser reel edited and color-corrected on Gilbert's mobile workstation at the jump-off station within 3 hours post-climb.
              </p>
</div>
<div className="flex items-center justify-between sm:justify-end gap-6 shrink-0">
<div className="text-right">
<span className="font-headline-sm text-headline-sm text-secondary">+₱800</span>
<span className="block font-label-technical text-label-technical text-on-surface-variant">($15 USD)</span>
</div>
<button className="addon-btn px-4 py-2 rounded-full bg-surface-container-highest hover:bg-primary hover:text-on-primary text-on-surface font-label-technical text-label-technical uppercase transition-all" onClick={(e) => { toggleAddon(e.currentTarget, 800); }}>
                Add to Climb
              </button>
</div>
</div>
{/* Item 2 */}
<div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-surface-container-high transition-colors">
<div className="space-y-1">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary text-[22px]">battery_saver</span>
<h4 className="font-headline-sm text-headline-sm text-on-surface">Extra Battery High-Altitude Flight</h4>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant max-w-xl">
                An additional 20 minutes of flight time for creative personal poses, couple shots, or cinematic slow pans over the eastern cliffs.
              </p>
</div>
<div className="flex items-center justify-between sm:justify-end gap-6 shrink-0">
<div className="text-right">
<span className="font-headline-sm text-headline-sm text-primary">+₱600</span>
<span className="block font-label-technical text-label-technical text-on-surface-variant">($11 USD / pack)</span>
</div>
<button className="addon-btn px-4 py-2 rounded-full bg-surface-container-highest hover:bg-primary hover:text-on-primary text-on-surface font-label-technical text-label-technical uppercase transition-all" onClick={(e) => { toggleAddon(e.currentTarget, 600); }}>
                Add to Climb
              </button>
</div>
</div>
{/* Item 3 */}
<div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-surface-container-high transition-colors">
<div className="space-y-1">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-tertiary text-[22px]">rocket_launch</span>
<h4 className="font-headline-sm text-headline-sm text-on-surface">FPV High-Speed Cliff Chase &amp; Dive</h4>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant max-w-xl">
                Breathtaking acrobatic FPV drone pilot maneuvers: racing downhill at 90km/h grazing limestone overhangs and ascending directly above your summit party.
              </p>
</div>
<div className="flex items-center justify-between sm:justify-end gap-6 shrink-0">
<div className="text-right">
<span className="font-headline-sm text-headline-sm text-tertiary">+₱1,500</span>
<span className="block font-label-technical text-label-technical text-on-surface-variant">($27 USD)</span>
</div>
<button className="addon-btn px-4 py-2 rounded-full bg-surface-container-highest hover:bg-primary hover:text-on-primary text-on-surface font-label-technical text-label-technical uppercase transition-all" onClick={(e) => { toggleAddon(e.currentTarget, 1500); }}>
                Add to Climb
              </button>
</div>
</div>
{/* Item 4 */}
<div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-surface-container-high transition-colors">
<div className="space-y-1">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-on-surface text-[22px]">hiking</span>
<h4 className="font-headline-sm text-headline-sm text-on-surface">Assisted Trail Porterage (Camera + Props)</h4>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant max-w-xl">
                Need extra wardrobe, formal dresses, or heavy hydration gear hauled to the summit? We arrange registered local Manobo / Bukidnon mountain porters.
              </p>
</div>
<div className="flex items-center justify-between sm:justify-end gap-6 shrink-0">
<div className="text-right">
<span className="font-headline-sm text-headline-sm text-on-surface">+₱1,000</span>
<span className="block font-label-technical text-label-technical text-on-surface-variant">($18 USD / guide)</span>
</div>
<button className="addon-btn px-4 py-2 rounded-full bg-surface-container-highest hover:bg-primary hover:text-on-primary text-on-surface font-label-technical text-label-technical uppercase transition-all" onClick={(e) => { toggleAddon(e.currentTarget, 1000); }}>
                Add to Climb
              </button>
</div>
</div>
</div>
{/* Add-on Running Total Bar */}
<div className="bg-surface-container-lowest p-5 flex flex-wrap items-center justify-between gap-4" id="addon-summary-bar">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-secondary">shopping_bag</span>
<span className="font-body-sm text-body-sm text-on-surface">Selected Add-Ons Total:</span>
<span className="font-headline-sm text-headline-sm text-secondary" id="addon-total-price">₱0</span>
</div>
<span className="font-label-technical text-label-technical text-outline uppercase">Automatically factored into flight dispatch inquiry</span>
</div>
</div>
</div>
</section>
{/* Trail Location & Flight Safety Map Card */}
<section className="w-full px-gutter lg:px-margin pb-16">
<div className="max-w-7xl mx-auto rounded-xl bg-surface-container overflow-hidden shadow-xl">
<div className="grid grid-cols-1 lg:grid-cols-12">
<div className="lg:col-span-7 p-8 lg:p-12 space-y-6">
<span className="font-label-technical text-label-technical uppercase tracking-widest text-primary">SITIO BINALBAGAN • BRGY. SIMAYA • MALAYBALAY CITY</span>
<h3 className="font-headline-lg text-headline-lg text-on-surface">How We Coordinate Your Climb</h3>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Mt. Capistrano stands out with its dramatic karst limestone rock monoliths. Hikes typically begin at Barangay Managok or San Fernando jump-off stations at 3:30 AM to catch the sunrise cloud sea inversion.
          </p>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
<div className="p-4 rounded-xl bg-surface-container-low space-y-1">
<span className="font-label-technical text-label-technical text-secondary uppercase">SUMMIT ELEVATION</span>
<p className="font-headline-sm text-headline-sm text-on-surface">~610m / 2,000+ ft</p>
<span className="font-body-sm text-body-sm text-on-surface-variant">1–2 hr ascent: 300+ stairs, bamboo trail, rope &amp; rock scramble</span>
</div>
<div className="p-4 rounded-xl bg-surface-container-low space-y-1">
<span className="font-label-technical text-label-technical text-tertiary uppercase">RECOMMENDED FLIGHT WINDOW</span>
<p className="font-headline-sm text-headline-sm text-on-surface">05:30 AM – 08:30 AM</p>
<span className="font-body-sm text-body-sm text-on-surface-variant">Optimal cloud &amp; morning sun angle</span>
</div>
</div>
<div className="flex items-center gap-3 pt-2 text-on-surface-variant font-body-sm text-body-sm">
<span className="material-symbols-outlined text-primary text-[20px]">shield</span>
<span>All flights operate in compliance with Philippine Civil Aviation (CAAP) mountain safety codes.</span>
</div>
</div>
<div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
<div className="w-full h-full bg-cover bg-center min-h-[320px]" data-location="Mt. Capistrano, Malaybalay, Bukidnon, Philippines" style={{"backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD6SdhxW8vUFChxmlHbOvqZJjZFzLexq2ZIra0Br2d8sInOR--Fv9n83GoaOo31frEdzHL8Dn0sWpiTH-Lp1XBcy7fbSVpiHKGL8P5Dk9yzxU06HC6YmSlwp4rSSlqz79YmiyMWo0Fu0eK2EPjHExpaXCKEo2Pajnajh6A6NuBYtu_7G2vpXtXHXsRCRUn_CUlFv4-NwnSGZvU0mUQFZOcCkGUBISvat11jwzw8yst4')"}}>
{/* Simulated HUD Overlay on Map */}
<div className="w-full h-full bg-surface-container-lowest/40 backdrop-blur-[2px] p-6 flex flex-col justify-between">
<div className="flex justify-between items-center">
<span className="px-3 py-1 rounded-full bg-surface-container-lowest/80 text-primary font-label-technical text-label-technical">GPS: 8.0163° N, 125.1856° E</span>
<span className="w-3 h-3 rounded-full bg-primary animate-ping"></span>
</div>
<div className="p-4 rounded-xl bg-surface-container-lowest/90 backdrop-blur-md space-y-1">
<div className="font-label-technical text-label-technical text-secondary uppercase tracking-widest">TAKEOFF / LANDING ZONE</div>
<div className="font-headline-sm text-headline-sm text-on-surface">Peak Rock Spire #2</div>
<div className="font-body-sm text-body-sm text-on-surface-variant">Designated safe launch clearing away from trail crowd footpaths.</div>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
{/* Interactive FAQ Accordion */}
<section className="w-full px-gutter lg:px-margin py-16 bg-surface-container-lowest">
<div className="max-w-4xl mx-auto space-y-10">
<div className="text-center space-y-2">
<span className="font-label-technical text-label-technical uppercase tracking-widest text-primary">KNOW BEFORE WE TAKE FLIGHT</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface">Frequently Asked Questions</h2>
<p className="font-body-md text-body-md text-on-surface-variant">Clear policies on mountain weather, guide fees, and gear protection.</p>
</div>
<div className="space-y-3" id="faq-container">
{/* FAQ 1 */}
<div className="faq-item rounded-xl bg-surface-container-low transition-all">
<button className="w-full p-6 text-left flex items-center justify-between gap-4 font-headline-sm text-headline-sm text-on-surface" onClick={(e) => { toggleFaq(e.currentTarget); }}>
<span>What happens if weather or heavy rain prevents drone flight?</span>
<span className="material-symbols-outlined transition-transform duration-300 text-primary">expand_more</span>
</button>
<div className="faq-answer hidden px-6 pb-6 font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Mountain safety comes first. If Bukidnon weather brings severe squalls or heavy rain at sunrise, we hold flight readiness until skies clear. If conditions remain unsafe throughout your climb, your deposit is 100% transferable to another climb date, or refunded minus a minimal trail assistance fee (₱500) if Gilbert already accompanied your ascent.
          </div>
</div>
{/* FAQ 2 */}
<div className="faq-item rounded-xl bg-surface-container-low transition-all">
<button className="w-full p-6 text-left flex items-center justify-between gap-4 font-headline-sm text-headline-sm text-on-surface" onClick={(e) => { toggleFaq(e.currentTarget); }}>
<span>Do these packages include the local Barangay hiking permit &amp; guide fee?</span>
<span className="material-symbols-outlined transition-transform duration-300 text-primary">expand_more</span>
</button>
<div className="faq-answer hidden px-6 pb-6 font-body-md text-body-md text-on-surface-variant leading-relaxed">
            No, the packages cover all drone videography, editing, and pilot services. The local DENR/LGU environmental fee (₱50/head) and accredited local trail guide fees (typically ₱500 per group of 5) are paid directly at the Barangay registration office at the foot of Mt. Capistrano. However, Gilbert can assist with advance guide slot reservations.
          </div>
</div>
{/* FAQ 3 */}
<div className="faq-item rounded-xl bg-surface-container-low transition-all">
<button className="w-full p-6 text-left flex items-center justify-between gap-4 font-headline-sm text-headline-sm text-on-surface" onClick={(e) => { toggleFaq(e.currentTarget); }}>
<span>How and when do I receive the finished videos and raw files?</span>
<span className="material-symbols-outlined transition-transform duration-300 text-primary">expand_more</span>
</button>
<div className="faq-answer hidden px-6 pb-6 font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Immediately upon descending to the trailhead campsite, we can provide all uncompressed RAW D-Log video clips and DNG photos straight to your Android or Apple iPhone via lightning/USB-C reader. Fully edited reels with color grading and music tracks are sent via a high-speed private Google Drive folder within 24 to 48 hours depending on your selected tier.
          </div>
</div>
{/* FAQ 4 */}
<div className="faq-item rounded-xl bg-surface-container-low transition-all">
<button className="w-full p-6 text-left flex items-center justify-between gap-4 font-headline-sm text-headline-sm text-on-surface" onClick={(e) => { toggleFaq(e.currentTarget); }}>
<span>Can Gilbert fly for sunrise pre-nup or couple shoots with formal outfits?</span>
<span className="material-symbols-outlined transition-transform duration-300 text-primary">expand_more</span>
</button>
<div className="faq-answer hidden px-6 pb-6 font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Yes! The 'Ultimate Adventure &amp; Pre-Nup Expedition' tier is created specifically for this. We start the ascent at 4:00 AM with headlamps, coordinate with porters to pack dresses and suits safely to the peak, and set up designated dressing breaks so you can pose in pristine attire against the golden morning mist.
          </div>
</div>
</div>
</div>
</section>
{/* High-Converting Booking Inquiry Form & Calendar Anchor */}
<section className="w-full px-gutter lg:px-margin py-20 relative" id="booking-inquiry">
{/* Subtle glow backdrop */}
<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-80 bg-secondary/10 rounded-full blur-[140px] pointer-events-none"></div>
<div className="max-w-4xl mx-auto rounded-xl bg-surface-container p-8 lg:p-14 shadow-2xl relative z-10 space-y-8">
<div className="space-y-3">
<span className="font-label-technical text-label-technical text-secondary uppercase tracking-widest flex items-center gap-2">
<span className="inline-block w-2.5 h-2.5 rounded-full bg-secondary"></span> FLIGHT DISPATCH CALENDAR
        </span>
<h2 className="font-headline-lg text-headline-lg text-on-surface">Reserve Gilbert for Your Climb Date</h2>
<p className="font-body-md text-body-md text-on-surface-variant">
          Book at least 3-5 days ahead for weekend sunrise slots. Complete the flight briefing below for quick date locking via SMS or Messenger.
        </p>
</div>
<form className="space-y-6" id="climb-booking-form" onSubmit={(e) => { handleBookingSubmit(e); }}>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="space-y-2">
<label className="font-label-lg text-label-lg text-on-surface flex items-center gap-1.5">
<span>Your Name / Lead Hiker</span>
<span className="text-secondary">*</span>
</label>
<input className="w-full px-4 py-3 rounded-lg bg-surface-container-high text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:bg-surface-container-highest transition-all" placeholder="e.g. John Emmanuel Cruz" required type="text" />
</div>
<div className="space-y-2">
<label className="font-label-lg text-label-lg text-on-surface flex items-center gap-1.5">
<span>Mobile Phone / WhatsApp</span>
<span className="text-secondary">*</span>
</label>
<input className="w-full px-4 py-3 rounded-lg bg-surface-container-high text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:bg-surface-container-highest transition-all" placeholder="+63 917 000 0000" required type="tel" />
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
<div className="space-y-2">
<label className="font-label-lg text-label-lg text-on-surface flex items-center gap-1.5">
<span>Target Climb Date</span>
<span className="text-secondary">*</span>
</label>
<input className="w-full px-4 py-3 rounded-lg bg-surface-container-high text-on-surface focus:outline-none focus:bg-surface-container-highest transition-all" required type="date" />
</div>
<div className="space-y-2">
<label className="font-label-lg text-label-lg text-on-surface flex items-center gap-1.5">
<span>Flight Package</span>
<span className="text-secondary">*</span>
</label>
<select className="w-full px-4 py-3 rounded-lg bg-surface-container-high text-on-surface focus:outline-none focus:bg-surface-container-highest transition-all" id="selected-package-input">
<option value="group">Summit Barkada / Group Special (₱4,500)</option>
<option value="solo">Solo Hiker Peak Reel (₱2,500)</option>
<option value="prenup">Ultimate Adventure &amp; Pre-Nup (₱8,500)</option>
</select>
</div>
<div className="space-y-2">
<label className="font-label-lg text-label-lg text-on-surface flex items-center gap-1.5">
<span>Total Number of Hikers</span>
</label>
<input className="w-full px-4 py-3 rounded-lg bg-surface-container-high text-on-surface focus:outline-none focus:bg-surface-container-highest transition-all" max="25" min="1" type="number" defaultValue="4" />
</div>
</div>
<div className="space-y-2">
<label className="font-label-lg text-label-lg text-on-surface">Special Requests / Trail Notes</label>
<textarea className="w-full px-4 py-3 rounded-lg bg-surface-container-high text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:bg-surface-container-highest transition-all" placeholder="e.g. We are celebrating a birthday at the summit rock, will need 1 outfit change for photos, starting jump-off at 4:30 AM." rows={3}></textarea>
</div>
<div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
<div className="flex items-center gap-2 font-label-technical text-label-technical text-tertiary">
<span className="material-symbols-outlined text-[18px]">verified_user</span>
<span>NO PAYMENT REQUIRED UNTIL CLIMB DATE CONFIRMATION</span>
</div>
<button className="w-full sm:w-auto px-8 py-4 rounded-full bg-secondary text-on-secondary hover:bg-secondary-fixed font-headline-sm text-headline-sm uppercase tracking-wider shadow-[0_0_24px_rgba(255,185,95,0.4)] transition-all flex items-center justify-center gap-3" type="submit">
<span className="material-symbols-outlined text-[20px]">send</span>
<span>Submit Flight Reservation</span>
</button>
</div>
{/* Success Toast Mockup */}
<div className="hidden p-4 rounded-lg bg-primary/20 text-primary font-body-md text-body-md flex items-center gap-3" id="booking-success">
<span className="material-symbols-outlined text-primary">check_circle</span>
<span>Thank you! Gilbert will contact your number within 2 hours to confirm your Mt. Capistrano flight slot.</span>
</div>
</form>
</div>
</section>
</div>
</main><footer className="w-full bg-surface-container-lowest"><div className="w-full px-gutter lg:px-margin pt-space-xl pb-space-lg"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-space-lg"><div className="space-y-4"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-primary font-headline-sm font-bold border border-primary/30">G</div><span className="font-headline-sm text-headline-sm text-on-surface uppercase">ItsGilbert</span></div><p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Cinematic 4K FPV and aerial filming specialist based in Bukidnon, Philippines. Capturing dramatic limestone cliffs, sunrise inversions, and raw adventure storytelling across Mt. Capistrano and beyond.</p><div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container text-primary font-label-technical text-label-technical"><span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span><span>BASE: SAN FERNANDO &amp; MALAYBALAY, BUKIDNON</span></div></div><div className="space-y-3"><h4 className="font-headline-sm text-headline-sm text-on-surface uppercase">Aerial Portfolios</h4><ul className="space-y-2 font-body-sm text-body-sm text-on-surface-variant"><li className="hover:text-primary transition-colors cursor-pointer">Mt. Capistrano Sunrise Summit Reels</li><li className="hover:text-primary transition-colors cursor-pointer">Bukidnon Pine Forest FPV Chases</li><li className="hover:text-primary transition-colors cursor-pointer">Pre-Nup &amp; Elopement Mountain Shoots</li><li className="hover:text-primary transition-colors cursor-pointer">Adventure Tourism &amp; Eco-Commercials</li><li className="hover:text-primary transition-colors cursor-pointer">Topographic Scouting &amp; 4K Raw Stills</li></ul></div><div className="space-y-3"><h4 className="font-headline-sm text-headline-sm text-on-surface uppercase">Navigation</h4><ul className="space-y-2 font-body-sm text-body-sm text-on-surface-variant"><li className="hover:text-primary transition-colors cursor-pointer">Services &amp; Day-Rate Packages</li><li className="hover:text-primary transition-colors cursor-pointer">Custom Drone Rig &amp; Camera Specs</li><li className="hover:text-primary transition-colors cursor-pointer">Flight Safety &amp; Weather Advisories</li><li className="hover:text-primary transition-colors cursor-pointer">Licensing &amp; Drone Permit Clearance</li><li className="hover:text-primary transition-colors cursor-pointer">Book an Aerial Shoot</li></ul></div><div className="space-y-3"><h4 className="font-headline-sm text-headline-sm text-on-surface uppercase">Flight Dispatch &amp; Inquiries</h4><p className="font-body-sm text-body-sm text-on-surface-variant">Ready to film your summit ascent, brand campaign, or event?</p><div className="space-y-2 font-body-sm text-body-sm"><div className="flex items-center gap-2 text-on-surface-variant"><span className="material-symbols-outlined text-primary text-[18px]">mail</span><span>drone@itsgilbert.ph</span></div><div className="flex items-center gap-2 text-on-surface-variant"><span className="material-symbols-outlined text-secondary text-[18px]">call</span><span>+63 917 CAPISTRANO</span></div><div className="flex items-center gap-2 text-on-surface-variant"><span className="material-symbols-outlined text-tertiary text-[18px]">location_on</span><span>Bukidnon, Northern Mindanao, PH</span></div></div></div></div><div className="pt-space-md flex flex-col md:flex-row items-center justify-between gap-4"><p className="font-body-sm text-body-sm text-on-surface-variant">© 2025 ItsGilbert Aerial Cinematography. All rights reserved. Mt. Capistrano Series.</p><div className="flex items-center gap-6 font-label-technical text-label-technical uppercase text-on-surface-variant"><span className="hover:text-primary cursor-pointer transition-colors">CAAP Compliant</span><span className="hover:text-primary cursor-pointer transition-colors">4K / 60FPS D-LOG</span><span className="hover:text-primary cursor-pointer transition-colors">Sub-250G &amp; Heavy Cine</span></div></div></div></footer></>
  );
}
