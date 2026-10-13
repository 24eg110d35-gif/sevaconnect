import React from 'react';
import { Search, Sparkles, Award, Users, HeartHandshake, ShieldCheck, Calendar, Filter, X } from 'lucide-react';
import { CATEGORY_INFO } from '../data/mockData';
import { SevaCategory } from '../types';

interface HeroBannerProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  weekendOnly: boolean;
  setWeekendOnly: (val: boolean) => void;
  verifiedOnly: boolean;
  setVerifiedOnly: (val: boolean) => void;
  hasCertificateOnly: boolean;
  setHasCertificateOnly: (val: boolean) => void;
  totalDrivesCount: number;
  onOpenMatcher: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  weekendOnly,
  setWeekendOnly,
  verifiedOnly,
  setVerifiedOnly,
  hasCertificateOnly,
  setHasCertificateOnly,
  totalDrivesCount,
  onOpenMatcher,
}) => {
  const categories = Object.keys(CATEGORY_INFO);

  return (
    <div className="relative bg-gradient-to-b from-amber-50/70 via-stone-50 to-neutral-50 border-b border-stone-200/80 pt-8 pb-8 px-4 sm:px-6 lg:px-8">
      {/* Decorative backdrop glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-r from-amber-200/40 via-orange-200/30 to-emerald-200/30 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Top Tagline & Headline */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 bg-orange-100/80 border border-orange-200/80 text-orange-900 px-3 py-1 rounded-full text-xs font-semibold mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>Connecting Passionate Volunteers with Verified Local Causes</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
            Give a few hours of <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Seva</span>.<br className="hidden sm:inline" />
            Create a lifetime of impact.
          </h1>

          <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            Find teaching circles, hunger relief langars, lake restoration drives, and emergency healthcare volunteering. Every contribution is verified with official certificates.
          </p>

          {/* Quick Stats Pill Strip */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto text-left">
            <div className="bg-white/80 backdrop-blur-xs border border-stone-200 rounded-xl p-3 shadow-2xs">
              <div className="flex items-center gap-2 text-orange-600 mb-1">
                <HeartHandshake className="w-4 h-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">Seva Hours</span>
              </div>
              <div className="text-lg font-extrabold text-neutral-900">12,850+</div>
              <div className="text-[10px] text-neutral-500">Selfless service logged</div>
            </div>

            <div className="bg-white/80 backdrop-blur-xs border border-stone-200 rounded-xl p-3 shadow-2xs">
              <div className="flex items-center gap-2 text-emerald-600 mb-1">
                <Users className="w-4 h-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">Active Sevadars</span>
              </div>
              <div className="text-lg font-extrabold text-neutral-900">3,420+</div>
              <div className="text-[10px] text-neutral-500">Students & citizens</div>
            </div>

            <div className="bg-white/80 backdrop-blur-xs border border-stone-200 rounded-xl p-3 shadow-2xs">
              <div className="flex items-center gap-2 text-indigo-600 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">Verified NGOs</span>
              </div>
              <div className="text-lg font-extrabold text-neutral-900">92+</div>
              <div className="text-[10px] text-neutral-500">Darpan & 80G audited</div>
            </div>

            <div className="bg-white/80 backdrop-blur-xs border border-stone-200 rounded-xl p-3 shadow-2xs">
              <div className="flex items-center gap-2 text-amber-600 mb-1">
                <Award className="w-4 h-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">Certificates</span>
              </div>
              <div className="text-lg font-extrabold text-neutral-900">100% Free</div>
              <div className="text-[10px] text-neutral-500">College credit ready</div>
            </div>
          </div>
        </div>

        {/* Search & AI Match CTA */}
        <div className="max-w-3xl mx-auto mb-6">
          <div className="flex flex-col sm:flex-row gap-2.5 items-stretch bg-white p-2 rounded-2xl shadow-md border border-stone-200">
            <div className="flex-1 flex items-center px-3 gap-2.5">
              <Search className="w-5 h-5 text-neutral-400 shrink-0" />
              <input
                type="text"
                placeholder="Search drives by name, locality (e.g. Uppal, Malkajgiri), cause, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-neutral-400 hover:text-neutral-600 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              onClick={onOpenMatcher}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm transition-all shrink-0 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-purple-200" />
              <span>Ask Seva Sathi (AI Match)</span>
            </button>
          </div>

          {/* Quick Filter Toggles */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-600">
            <div className="flex items-center gap-1.5 font-medium">
              <Filter className="w-3.5 h-3.5 text-neutral-400" />
              <span>Quick Filters:</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setWeekendOnly(!weekendOnly)}
                className={`px-2.5 py-1 rounded-full border text-xs font-medium transition-colors cursor-pointer ${
                  weekendOnly
                    ? 'bg-amber-100 border-amber-300 text-amber-900 font-semibold'
                    : 'bg-white border-stone-200 text-neutral-600 hover:bg-stone-50'
                }`}
              >
                📅 Weekends Only
              </button>

              <button
                onClick={() => setVerifiedOnly(!verifiedOnly)}
                className={`px-2.5 py-1 rounded-full border text-xs font-medium transition-colors cursor-pointer ${
                  verifiedOnly
                    ? 'bg-emerald-100 border-emerald-300 text-emerald-900 font-semibold'
                    : 'bg-white border-stone-200 text-neutral-600 hover:bg-stone-50'
                }`}
              >
                🛡️ Verified NGO Partners
              </button>

              <button
                onClick={() => setHasCertificateOnly(!hasCertificateOnly)}
                className={`px-2.5 py-1 rounded-full border text-xs font-medium transition-colors cursor-pointer ${
                  hasCertificateOnly
                    ? 'bg-blue-100 border-blue-300 text-blue-900 font-semibold'
                    : 'bg-white border-stone-200 text-neutral-600 hover:bg-stone-50'
                }`}
              >
                📜 Certificate Guaranteed
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar justify-start sm:justify-center">
          {categories.map((catKey) => {
            const info = CATEGORY_INFO[catKey];
            const isSelected = selectedCategory === catKey;

            return (
              <button
                key={catKey}
                onClick={() => setSelectedCategory(catKey)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 border cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm scale-102'
                    : 'bg-white text-neutral-700 border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                }`}
              >
                <span>{info.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
