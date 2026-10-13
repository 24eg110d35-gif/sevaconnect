import React from 'react';
import { HeartHandshake, Phone, ShieldCheck, Heart, Award, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-300 pt-12 pb-8 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & Motto */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Seva<span className="text-orange-500">Connect</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 max-w-md leading-relaxed">
              A grassroots volunteer network bringing together students, professionals, and verified non-profits across India. Dedicated to the eternal spirit of selfless community service.
            </p>

            <div className="inline-flex items-center gap-2 bg-neutral-800/80 border border-neutral-700/80 px-3 py-1.5 rounded-xl text-xs text-amber-400 font-semibold">
              <span>॥ वसुधैव कुटुम्बकम् • सेवा परमो धर्मः ॥</span>
            </div>
          </div>

          {/* Quick Helplines */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              National Support Helplines
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li className="flex items-center justify-between">
                <span>National Emergency:</span>
                <span className="font-bold text-white bg-neutral-800 px-2 py-0.5 rounded">112</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Elderly Helpline (ElderLine):</span>
                <span className="font-bold text-white bg-neutral-800 px-2 py-0.5 rounded">14567</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Childline India:</span>
                <span className="font-bold text-white bg-neutral-800 px-2 py-0.5 rounded">1098</span>
              </li>
              <li className="flex items-center justify-between">
                <span>National Blood Helpline:</span>
                <span className="font-bold text-white bg-neutral-800 px-2 py-0.5 rounded">104 / 1910</span>
              </li>
            </ul>
          </div>

          {/* Verification & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Volunteer Standards
            </h4>
            <div className="space-y-2 text-xs text-neutral-400">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Verified NGO partners with valid Darpan / 80G credentials</span>
              </div>
              <div className="flex items-start gap-2">
                <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Official certificates authenticated for university NSS & college credit</span>
              </div>
              <div className="flex items-start gap-2">
                <Heart className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>Zero fees. 100% voluntary, open, and community driven</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} SevaConnect India. Made with dedication for community empowerment.
          </div>
          <div className="flex items-center gap-4 text-neutral-400">
            <span>Hyderabad</span>
            <span>•</span>
            <span>Bengaluru</span>
            <span>•</span>
            <span>Delhi NCR</span>
            <span>•</span>
            <span>Mumbai</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
