import React from 'react';
import { HeartHandshake, Bell, MapPin, PlusCircle, Sparkles, User, Award, Flame, UtensilsCrossed, MessageSquare } from 'lucide-react';
import { CITIES } from '../data/mockData';
import { VolunteerProfile, UrgentNeed } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  volunteer: VolunteerProfile;
  urgentNeeds: UrgentNeed[];
  onOpenCreateModal: () => void;
  onOpenMatcher: () => void;
  onOpenSurplusModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedCity,
  setSelectedCity,
  volunteer,
  urgentNeeds,
  onOpenCreateModal,
  onOpenMatcher,
  onOpenSurplusModal,
}) => {
  const unresolvedUrgentCount = urgentNeeds.filter(u => !u.isResolved).length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      {/* Top micro bar for mission reminder */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-emerald-700 text-white text-xs font-medium py-1 px-4 text-center tracking-wide flex items-center justify-center gap-2">
        <span className="font-semibold">॥ सेवा परमो धर्मः ॥</span>
        <span className="hidden sm:inline opacity-90">• Service to humanity is the supreme duty</span>
        <span className="hidden md:inline bg-white/20 px-2 py-0.5 rounded text-[11px] ml-2">Over 12,800+ volunteer hours delivered</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo */}
          <button 
            onClick={() => setActiveTab('explore')}
            className="flex items-center gap-3 text-left focus:outline-hidden group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-neutral-900">Seva<span className="text-orange-600">Connect</span></span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">India</span>
              </div>
              <p className="text-[11px] text-neutral-500 hidden sm:block">Connecting Volunteers with Real Community Needs</p>
            </div>
          </button>

          {/* City Selector */}
          <div className="hidden lg:flex items-center bg-stone-100 rounded-lg px-2.5 py-1.5 border border-stone-200">
            <MapPin className="w-4 h-4 text-orange-600 mr-1.5 shrink-0" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-transparent text-xs font-semibold text-neutral-800 focus:outline-hidden cursor-pointer pr-2"
            >
              {CITIES.map((city) => (
                <option key={city} value={city}>
                  {city === 'All Cities' ? '🇮🇳 All Over India' : `📍 ${city}`}
                </option>
              ))}
            </select>
          </div>

          {/* Primary Nav Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* AI Matcher Button */}
            <button
              onClick={onOpenMatcher}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 px-3 py-2 rounded-lg transition-colors shadow-2xs"
              title="AI Seva Sathi Matcher"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
              <span className="hidden md:inline">Seva Sathi</span>
              <span className="hidden sm:inline text-purple-500 text-[10px] uppercase font-bold">AI</span>
            </button>

            {/* Food / Resource Surplus Button */}
            <button
              onClick={onOpenSurplusModal}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-orange-800 bg-orange-50 hover:bg-orange-100 border border-orange-200 px-3 py-2 rounded-lg transition-colors"
              title="Donate Surplus Food or Essentials"
            >
              <UtensilsCrossed className="w-3.5 h-3.5 text-orange-600" />
              <span>Annadanam</span>
            </button>

            {/* Post Seva Drive (NGO / Organizers) */}
            <button
              onClick={onOpenCreateModal}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 px-3.5 py-2 rounded-lg shadow-sm shadow-orange-600/20 transition-all hover:shadow"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Post Seva Drive</span>
              <span className="sm:hidden">Post</span>
            </button>

            {/* Volunteer Passport / Profile */}
            <button
              onClick={() => setActiveTab('passport')}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                activeTab === 'passport'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900 ring-2 ring-emerald-500/20'
                  : 'bg-white hover:bg-stone-50 border-stone-200 text-neutral-700'
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[11px] font-bold">
                {volunteer.name.charAt(0)}
              </div>
              <div className="text-left hidden md:block leading-tight">
                <div className="text-[11px] font-bold text-neutral-800 truncate max-w-[90px]">{volunteer.name.split(' ')[0]}</div>
                <div className="text-[10px] text-emerald-700 font-semibold">{volunteer.totalHours} hrs Seva</div>
              </div>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 no-scrollbar border-t border-stone-100 text-xs font-medium">
          <button
            onClick={() => setActiveTab('explore')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
              activeTab === 'explore'
                ? 'bg-neutral-900 text-white font-semibold shadow-2xs'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-stone-100'
            }`}
          >
            🌟 Explore Seva Drives
          </button>

          <button
            onClick={() => setActiveTab('urgent')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
              activeTab === 'urgent'
                ? 'bg-red-600 text-white font-semibold shadow-2xs'
                : 'text-red-700 hover:bg-red-50'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Emergency Needs</span>
            {unresolvedUrgentCount > 0 && (
              <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full ${
                activeTab === 'urgent' ? 'bg-white text-red-600' : 'bg-red-600 text-white'
              }`}>
                {unresolvedUrgentCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('surplus')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
              activeTab === 'surplus'
                ? 'bg-orange-600 text-white font-semibold'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-stone-100'
            }`}
          >
            🍲 Annadanam (Food Rescue)
          </button>

          <button
            onClick={() => setActiveTab('stories')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
              activeTab === 'stories'
                ? 'bg-neutral-900 text-white font-semibold'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-stone-100'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Impact Stories</span>
          </button>

          <button
            onClick={() => setActiveTab('passport')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
              activeTab === 'passport'
                ? 'bg-emerald-700 text-white font-semibold'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-stone-100'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>My Seva Passport & Certificate</span>
          </button>

          {/* Mobile city selector inside tabs if small screen */}
          <div className="lg:hidden ml-auto flex items-center shrink-0">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-stone-100 text-neutral-800 text-[11px] font-semibold rounded px-2 py-1 border border-stone-200"
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
