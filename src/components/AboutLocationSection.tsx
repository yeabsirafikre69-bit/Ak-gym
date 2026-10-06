import React, { useState } from 'react';
import { MapPin, Clock, Phone, Mail, Instagram, ArrowUpRight, Heart, MessageCircle, Award, Compass } from 'lucide-react';
import { GYM_INFO, FACILITY_IMAGE, COACHES, TESTIMONIALS, INSTAGRAM_POSTS } from '../data/gymData';

interface AboutLocationSectionProps {
  onOpenBooking: () => void;
}

export const AboutLocationSection: React.FC<AboutLocationSectionProps> = ({
  onOpenBooking,
}) => {
  const [selectedPost, setSelectedPost] = useState<typeof INSTAGRAM_POSTS[0] | null>(null);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.email || !contactForm.name) return;
    setContactSuccess(true);
    setTimeout(() => {
      setContactForm({ name: '', email: '', message: '' });
      setContactSuccess(false);
    }, 4000);
  };

  return (
    <section id="about" className="py-20 bg-[#0d0f15] border-b border-[#232630]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-red-500 mb-2">
              <span>Facility & Community</span>
              <span aria-hidden="true">·</span>
              <span>{GYM_INFO.handle}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
              ABOUT <span className="text-red-500">AK GYM 26</span> & LOCATION
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-400 max-w-md">
            Established in the heart of the Fitness District, AK GYM 26 is engineered for athletes who demand pristine equipment, elite coaching, and an authentic community.
          </p>
        </div>

        {/* Location & Facility Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Facility Visual & Bio */}
          <div className="lg:col-span-7 bg-[#12141e] rounded-2xl border border-[#232736] overflow-hidden flex flex-col justify-between">
            <div className="relative h-64 sm:h-72 w-full">
              <img
                src={FACILITY_IMAGE}
                alt="AK GYM 26 strength training floor and lifting platforms"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12141e] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                <span className="bg-[#0b0c10]/80 backdrop-blur-sm px-3 py-1 rounded text-white font-medium border border-[#2b3040]">
                  12,500 sq ft Precision Strength Arena
                </span>
                <span className="bg-red-600/90 text-white font-mono px-2.5 py-1 rounded font-bold">
                  @akgym26
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <h3 className="text-2xl font-extrabold uppercase text-white mb-3">
                Built For Performance, Zero Fluff
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                AK GYM 26 was born out of frustration with crowded big-box health clubs where equipment is broken and personal attention does not exist. We outfitted our floor with Olympic lifting platforms, competition Rogue racks, calibrated steel plates, custom sprint turf, and a recovery suite.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#202434] text-xs">
                <div>
                  <span className="text-slate-500 uppercase block text-[10px]">Floor Equipment</span>
                  <span className="text-slate-200 font-semibold">Rogue & Eleiko Barrels</span>
                </div>
                <div>
                  <span className="text-slate-500 uppercase block text-[10px]">Coaching Staff</span>
                  <span className="text-slate-200 font-semibold">100% Certified L2/L3</span>
                </div>
                <div>
                  <span className="text-slate-500 uppercase block text-[10px]">Recovery</span>
                  <span className="text-slate-200 font-semibold">Sauna & Cold Contrast</span>
                </div>
              </div>
            </div>
          </div>

          {/* Location & Operating Hours Card */}
          <div className="lg:col-span-5 bg-[#12141e] rounded-2xl border border-[#232736] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-400 mb-2">
                <Compass className="w-4 h-4" />
                <span>Visit The Facility</span>
              </div>
              <h3 className="text-2xl font-extrabold uppercase text-white mb-6">
                Location & Schedule
              </h3>

              {/* Operating Hours */}
              <div className="mb-6 p-4 rounded-xl bg-[#161926] border border-[#252a3b]">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                  <Clock className="w-4 h-4 text-red-500" />
                  <span>Operating Hours</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Monday – Friday:</span>
                    <span className="text-white font-mono font-medium">{GYM_INFO.operatingHours.weekdays}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Saturday:</span>
                    <span className="text-white font-mono font-medium">{GYM_INFO.operatingHours.saturday}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Sunday:</span>
                    <span className="text-white font-mono font-medium">{GYM_INFO.operatingHours.sunday}</span>
                  </div>
                </div>
              </div>

              {/* Physical Location */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#181c2b] border border-[#2b3145] text-red-500 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <span className="text-slate-400 uppercase text-[10px] block">Address</span>
                    <p className="text-white font-semibold text-sm">{GYM_INFO.address}</p>
                    <p className="text-slate-400">{GYM_INFO.city}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#181c2b] border border-[#2b3145] text-red-500 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <span className="text-slate-400 uppercase text-[10px] block">Direct Phone</span>
                    <a href={`tel:${GYM_INFO.phone}`} className="text-white font-semibold hover:text-red-400 transition-colors">
                      {GYM_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#181c2b] border border-[#2b3145] text-red-500 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <span className="text-slate-400 uppercase text-[10px] block">Email Inquiries</span>
                    <a href={`mailto:${GYM_INFO.email}`} className="text-white font-semibold hover:text-red-400 transition-colors">
                      {GYM_INFO.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#232736] flex flex-col gap-2.5">
              <a
                href={GYM_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-lg bg-[#181c2b] hover:bg-[#22273d] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-between border border-[#2b3145] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-pink-500" />
                  <span>Instagram Bio Details ({GYM_INFO.handle})</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </a>

              <button
                onClick={onOpenBooking}
                className="w-full py-3 px-4 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Schedule Facility Tour & Free Workout
              </button>
            </div>
          </div>
        </div>

        {/* Instagram Bio Feed Showcase (@akgym26) */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-red-500 mb-1">
                <span>Social Community</span>
                <span aria-hidden="true">·</span>
                <span>Live Feed</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold uppercase text-white">
                FOLLOW <span className="text-red-500">@AKGYM26</span> ON INSTAGRAM
              </h3>
            </div>
            <a
              href={GYM_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-slate-300 hover:text-white px-3 py-2 rounded-lg bg-[#161925] border border-[#262c3e] flex items-center gap-1.5 transition-colors"
            >
              <span>Follow @akgym26</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {INSTAGRAM_POSTS.map((post) => (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="group relative bg-[#131622] rounded-xl border border-[#242839] overflow-hidden cursor-pointer hover:border-red-500/60 transition-all flex flex-col"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-[#1a1e2b]">
                  <img
                    src={post.image}
                    alt={post.caption}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white font-semibold text-xs">
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4 fill-white text-white" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4 fill-white text-white" />
                      {post.comments}
                    </span>
                  </div>
                  <div className="absolute top-2 left-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-black/75 backdrop-blur-sm text-red-400 px-2 py-0.5 rounded border border-white/10">
                      {post.tag}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-2">
                    {post.caption}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-[#1f2434]">
                    <span>{post.date}</span>
                    <span className="text-red-400 font-semibold">View Post ↗</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coaches Roster */}
        <div className="mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-red-500 mb-2">
            <span>Leadership</span>
            <span aria-hidden="true">·</span>
            <span>Experienced Practitioners</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold uppercase text-white mb-8">
            ELITE COACHING ROSTER
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COACHES.map((coach, cIdx) => (
              <div
                key={cIdx}
                className="bg-[#12141f] rounded-xl border border-[#232738] p-5 flex flex-col justify-between hover:border-[#3a4158] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-red-400 font-semibold">{coach.experience}</span>
                    <Award className="w-4 h-4 text-amber-400" />
                  </div>
                  <h4 className="text-xl font-bold uppercase text-white mb-0.5">{coach.name}</h4>
                  <p className="text-xs font-medium text-slate-400 mb-3">{coach.role}</p>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{coach.bio}</p>
                </div>

                <div className="pt-3 border-t border-[#1e2334]">
                  <span className="text-[10px] uppercase text-slate-500 block mb-1">Certifications:</span>
                  <div className="flex flex-wrap gap-1 text-[10px] text-slate-300">
                    {coach.certifications.map((cert, certIdx) => (
                      <span key={certIdx} className="bg-[#191d2c] px-2 py-0.5 rounded border border-[#282e44]">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real Attributable Member Proof Testimonials */}
        <div className="mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-red-500 mb-2">
            <span>Member Evidence</span>
            <span aria-hidden="true">·</span>
            <span>Verified Results</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold uppercase text-white mb-8">
            ATHLETE TRANSFORMATIONS
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="bg-[#12141e] rounded-xl border border-[#232736] p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs text-red-400 font-bold uppercase tracking-wider mb-2">
                    {t.outcome}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1e2232] flex items-center justify-between text-xs">
                  <div>
                    <h5 className="font-bold text-white uppercase">{t.name}</h5>
                    <p className="text-slate-400 text-[11px]">{t.role} · {t.program}</p>
                  </div>
                  <span className="text-slate-500 text-[11px] font-mono">{t.monthsActive}mo member</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Contact Form */}
        <div className="bg-[#121520] rounded-2xl border border-[#24293a] p-6 sm:p-8">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-extrabold uppercase text-white mb-2">
              Have Questions Before Joining?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              Send a note to our front desk team. We respond within 30 minutes during operating hours.
            </p>

            {contactSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm">
                Message sent successfully! Our coaching team will reach out shortly.
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-semibold text-slate-400 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="e.g. Jordan Miller"
                      className="w-full bg-[#181c29] border border-[#2c3246] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-semibold text-slate-400 mb-1">Email or Phone</label>
                    <input
                      type="text"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="e.g. jordan@example.com"
                      className="w-full bg-[#181c29] border border-[#2c3246] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-400 mb-1">Your Question or Goals</label>
                  <textarea
                    rows={3}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Tell us about your fitness background, past injuries, or class inquiries..."
                    className="w-full bg-[#181c29] border border-[#2c3246] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-500">Or call directly at {GYM_INFO.phone}</span>
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors cursor-pointer"
                  >
                    Submit Question
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Instagram Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#12141d] border border-[#2a2f42] rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl">
            <div className="relative aspect-video w-full bg-black">
              <img
                src={selectedPost.image}
                alt={selectedPost.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-3 right-3 text-white bg-black/60 rounded-full p-1.5 hover:bg-black transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                <span className="font-bold text-red-400">@akgym26</span>
                <span>{selectedPost.date}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-4">
                {selectedPost.caption}
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-400 pb-4 border-b border-[#232738] mb-4">
                <span className="flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                  <strong className="text-white">{selectedPost.likes}</strong> likes
                </span>
                <span className="flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4 text-slate-400" />
                  <strong className="text-white">{selectedPost.comments}</strong> comments
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-500">Official Instagram channel</span>
                <a
                  href={GYM_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors flex items-center gap-1"
                >
                  <span>Open Instagram</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
