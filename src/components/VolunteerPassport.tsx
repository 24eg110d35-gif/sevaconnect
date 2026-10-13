import React, { useState } from 'react';
import {
  Award,
  Clock,
  Calendar,
  CheckCircle2,
  Sparkles,
  Download,
  Share2,
  PlusCircle,
  ShieldCheck,
  ChevronRight,
  BookOpen,
  Utensils,
  TreePine,
  HeartPulse,
  HeartHandshake,
  User,
  GraduationCap
} from 'lucide-react';
import { VolunteerProfile, SevaDrive, SevaBadge } from '../types';

interface VolunteerPassportProps {
  volunteer: VolunteerProfile;
  allDrives: SevaDrive[];
  badges: SevaBadge[];
  onOpenCertificate: () => void;
  onOpenDriveDetails: (drive: SevaDrive) => void;
  onLogHours: (hours: number, driveTitle: string) => void;
}

export const VolunteerPassport: React.FC<VolunteerPassportProps> = ({
  volunteer,
  allDrives,
  badges,
  onOpenCertificate,
  onOpenDriveDetails,
  onLogHours,
}) => {
  const [showLogModal, setShowLogModal] = useState(false);
  const [manualHours, setManualHours] = useState('3.0');
  const [manualTitle, setManualTitle] = useState('Weekend Old Age Home Companionship');
  const [supervisorName, setSupervisorName] = useState('G. Sudhakar (Seva Coordinator)');

  const enrolledDrives = allDrives.filter((d) =>
    volunteer.enrolledDriveIds.includes(d.id)
  );

  const handleLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(manualHours);
    if (!isNaN(parsed) && parsed > 0 && manualTitle.trim()) {
      onLogHours(parsed, manualTitle);
      setShowLogModal(false);
    }
  };

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-amber-500" />;
      case 'Utensils':
        return <Utensils className="w-5 h-5 text-orange-500" />;
      case 'TreePine':
        return <TreePine className="w-5 h-5 text-emerald-500" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-blue-500" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-rose-500" />;
      default:
        return <Award className="w-5 h-5 text-purple-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Profile Header Card */}
      <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Background decorative circles */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4 sm:gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white text-2xl sm:text-3xl font-extrabold shadow-lg shrink-0">
              {volunteer.name.charAt(0)}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{volunteer.name}</h1>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified Sevadar</span>
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-neutral-300 mt-1">
                <span>{volunteer.email}</span>
                <span>•</span>
                <span>{volunteer.city}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-emerald-300">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Anurag University NSS Chapter</span>
                </span>
              </div>

              {/* Skills pills */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {volunteer.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-white/10 text-white text-[10px] font-medium px-2 py-0.5 rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Certificate & Action CTA */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenCertificate}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-neutral-950 font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Award className="w-4 h-4 text-neutral-950" />
              <span>Official Seva Certificate</span>
            </button>

            <button
              onClick={() => setShowLogModal(true)}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-semibold px-3.5 py-2.5 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-emerald-400" />
              <span>Log Past Seva</span>
            </button>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-white/10">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">{volunteer.totalHours} hrs</div>
            <div className="text-xs text-neutral-400 mt-0.5">Verified Seva Hours</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">{volunteer.drivesCompleted}</div>
            <div className="text-xs text-neutral-400 mt-0.5">Drives Completed</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-400">{volunteer.badges.length}</div>
            <div className="text-xs text-neutral-400 mt-0.5">Honor Badges Earned</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-400">Top 5%</div>
            <div className="text-xs text-neutral-400 mt-0.5">Campus Seva Leaderboard</div>
          </div>
        </div>
      </div>

      {/* Grid: Badges & Upcoming Drives */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2 Cols): My Registered Upcoming Drives */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-neutral-900">My Registered Seva Drives</h2>
              <p className="text-xs text-neutral-500">Upcoming volunteer commitments and meeting coordinates</p>
            </div>
            <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
              {enrolledDrives.length} Scheduled
            </span>
          </div>

          {enrolledDrives.length === 0 ? (
            <div className="bg-stone-50 border border-dashed border-stone-300 rounded-2xl p-8 text-center">
              <Calendar className="w-10 h-10 text-neutral-400 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-neutral-800">No upcoming drives yet</h3>
              <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                Explore open Seva drives and sign up to contribute your skills to local communities.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {enrolledDrives.map((drive) => (
                <div
                  key={drive.id}
                  className="bg-white border border-stone-200 rounded-2xl p-4 shadow-2xs hover:shadow-sm transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    <img
                      src={drive.imageUrl}
                      alt={drive.title}
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                        {drive.category}
                      </span>
                      <h4 className="text-sm font-bold text-neutral-900 mt-1 line-clamp-1">
                        {drive.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 mt-1">
                        <span>📅 {drive.date}</span>
                        <span>•</span>
                        <span>⏰ {drive.time}</span>
                        <span>•</span>
                        <span>📍 {drive.locality}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                    <button
                      onClick={() => onOpenDriveDetails(drive)}
                      className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-neutral-800 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      View Details
                    </button>
                    <div className="flex items-center gap-1 text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Ready</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Academic NSS / College Credit Summary */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center shrink-0">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-amber-950">University & NSS Community Credit Letter</h4>
                <p className="text-xs text-amber-800/90 mt-1 leading-relaxed">
                  Your logged <strong>{volunteer.totalHours} hours</strong> are audited against NGO Darpan records. You can download an official verification dossier stamped by SevaConnect for submission to your college Dean of Student Affairs or NSS Coordinator.
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <button
                    onClick={onOpenCertificate}
                    className="text-xs font-bold text-amber-900 bg-white border border-amber-300 px-3 py-1.5 rounded-lg hover:bg-amber-100 transition-colors cursor-pointer"
                  >
                    Generate Verified Dossier
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Honor Badges Showcase */}
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-neutral-900">Seva Badges of Honor</h2>
            <p className="text-xs text-neutral-500">Recognition for milestones achieved in community service</p>
          </div>

          <div className="space-y-3">
            {badges.map((badge) => {
              const isUnlocked = badge.unlocked || volunteer.badges.includes(badge.id);

              return (
                <div
                  key={badge.id}
                  className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3.5 ${
                    isUnlocked
                      ? 'bg-white border-stone-200 shadow-2xs'
                      : 'bg-stone-50/80 border-dashed border-stone-200 opacity-60'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isUnlocked
                        ? 'bg-amber-100 text-amber-700 shadow-2xs'
                        : 'bg-stone-200 text-neutral-400'
                    }`}
                  >
                    {getBadgeIcon(badge.icon)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-xs font-bold ${isUnlocked ? 'text-neutral-900' : 'text-neutral-500'}`}>
                        {badge.title}
                      </h4>
                      {isUnlocked && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                          Unlocked
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-neutral-600 mt-0.5 leading-snug">
                      {badge.description}
                    </p>
                    {badge.dateEarned && (
                      <div className="text-[10px] text-neutral-400 mt-1 font-medium">
                        Earned: {badge.dateEarned}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Manual Hours Logging Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200">
            <h3 className="text-base font-bold text-neutral-900 mb-1">Log Past Community Service Hours</h3>
            <p className="text-xs text-neutral-500 mb-4">
              Add hours from offline volunteering drives or independent seva activities for verification.
            </p>

            <form onSubmit={handleLogSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">Activity / Drive Title</label>
                <input
                  type="text"
                  required
                  value={manualTitle}
                  onChange={(e) => setManualTitle(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g. Free Tuition for Slum Children"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">Hours Dedicated</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    max="40"
                    required
                    value={manualHours}
                    onChange={(e) => setManualHours(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">Activity Date</label>
                  <input
                    type="date"
                    defaultValue="2026-10-12"
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">Supervisor / NGO Coordinator Name</label>
                <input
                  type="text"
                  required
                  value={supervisorName}
                  onChange={(e) => setSupervisorName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g. Ramesh Kumar (Robin Hood Army)"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="px-3 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs"
                >
                  Verify & Add Hours
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
