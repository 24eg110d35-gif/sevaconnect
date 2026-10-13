import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Award,
  Phone,
  MessageCircle,
  Share2,
  CalendarPlus,
  Users,
  Check,
  HeartHandshake,
  ExternalLink,
  Info
} from 'lucide-react';
import { SevaDrive, VolunteerProfile } from '../types';
import { CATEGORY_INFO } from '../data/mockData';

interface SevaDetailModalProps {
  drive: SevaDrive | null;
  volunteer: VolunteerProfile;
  onClose: () => void;
  onJoin: (drive: SevaDrive) => void;
  onLeave: (drive: SevaDrive) => void;
}

export const SevaDetailModal: React.FC<SevaDetailModalProps> = ({
  drive,
  volunteer,
  onClose,
  onJoin,
  onLeave,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  if (!drive) return null;

  const isEnrolled = volunteer.enrolledDriveIds.includes(drive.id) || drive.registeredUserIds.includes(volunteer.id);
  const spotsLeft = Math.max(0, drive.volunteersRequired - drive.volunteersRegistered);
  const cat = CATEGORY_INFO[drive.category] || CATEGORY_INFO['vidya'];

  // Calendar .ics download
  const downloadCalendarInvite = () => {
    const title = encodeURIComponent(drive.title);
    const details = encodeURIComponent(`${drive.shortDescription}\n\nVenue: ${drive.address}\nCoordinator: ${drive.contactNumber}`);
    const location = encodeURIComponent(drive.address);
    // Google Calendar URL
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(googleCalUrl, '_blank', 'noopener,noreferrer');
  };

  // WhatsApp share
  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(
      `🙏 Join me for "${drive.title}" organized by ${drive.ngoName}!\n📅 Date: ${drive.date} (${drive.time})\n📍 Location: ${drive.locality}, ${drive.city}\n\nJoin on SevaConnect:`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const copyShareLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Maps link
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${drive.title} ${drive.address} ${drive.city}`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 relative my-8">
        
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative h-60 w-full overflow-hidden bg-stone-900">
          <img
            src={drive.imageUrl}
            alt={drive.title}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Category Pill */}
          <div className="absolute top-4 left-4">
            <span className="bg-white/90 backdrop-blur-xs text-neutral-900 font-bold px-3 py-1 rounded-md text-xs shadow-xs">
              {cat.label}
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 text-xs text-stone-300 mb-1">
              <span>{drive.ngoName}</span>
              {drive.ngoVerified && (
                <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified NGO</span>
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold leading-tight text-white drop-shadow-sm">
              {drive.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Schedule & Venue Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-stone-50 p-4 rounded-xl border border-stone-200">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-neutral-800">Date & Schedule</div>
                <div className="text-xs text-neutral-600 mt-0.5">{drive.date}</div>
                <div className="text-xs text-neutral-500">{drive.time} ({drive.durationHours} hrs)</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-neutral-800">Venue & Locality</div>
                <div className="text-xs text-neutral-600 mt-0.5 leading-snug">{drive.address}</div>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 mt-1"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Detailed Agenda & Description */}
          <div>
            <h3 className="text-sm font-bold text-neutral-900 mb-2">About this Seva Drive</h3>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
              {drive.fullDescription}
            </p>
          </div>

          {/* Volunteer Status & Roster */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-700" />
                <span className="text-xs font-bold text-amber-950">Volunteer Roster</span>
              </div>
              <span className="text-xs font-semibold text-amber-800">
                {drive.volunteersRegistered} of {drive.volunteersRequired} Registered
              </span>
            </div>
            <div className="w-full bg-amber-200/60 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-600 h-full rounded-full transition-all"
                style={{
                  width: `${Math.min(100, Math.round((drive.volunteersRegistered / drive.volunteersRequired) * 100))}%`,
                }}
              />
            </div>
            <p className="text-[11px] text-amber-800/90 mt-2">
              {spotsLeft > 0
                ? `⚡ ${spotsLeft} volunteer spots still open. First-come registration applies.`
                : '✅ Target volunteer strength reached! You can still sign up as a backup reserve.'}
            </p>
          </div>

          {/* What to Expect / Perks */}
          <div>
            <h3 className="text-sm font-bold text-neutral-900 mb-2.5">What Volunteers Receive</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {drive.perks.map((perk, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-xs font-medium text-neutral-800"
                >
                  <Award className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>{perk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills / What you need */}
          <div>
            <h3 className="text-sm font-bold text-neutral-900 mb-2">Required Skills / Prerequisites</h3>
            <div className="flex flex-wrap gap-2">
              {drive.skillsRequired.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Coordinator & Direct Contact */}
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs text-neutral-500 font-medium">Seva Coordinator Hotline</div>
              <div className="text-sm font-bold text-neutral-900">{drive.contactNumber}</div>
              <div className="text-[11px] text-neutral-500">Available 8 AM - 8 PM for questions & directions</div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href={`tel:${drive.contactNumber}`}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white border border-stone-300 hover:bg-stone-100 rounded-lg text-xs font-bold text-neutral-800 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-neutral-600" />
                <span>Call</span>
              </a>

              <a
                href={`https://api.whatsapp.com/send?phone=${drive.contactNumber.replace(/[^0-9]/g, '')}&text=${encodeURIComponent(`Hello, I am inquiring about the Seva drive "${drive.title}" on SevaConnect.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Social Share & Calendar */}
          <div className="flex items-center justify-between pt-2 text-xs border-t border-stone-100 text-neutral-600">
            <div className="flex items-center gap-2">
              <button
                onClick={shareOnWhatsApp}
                className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-medium cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share with Friends</span>
              </button>
              <span>•</span>
              <button
                onClick={copyShareLink}
                className="text-neutral-600 hover:text-neutral-900 font-medium cursor-pointer"
              >
                {copiedLink ? '✓ Copied link!' : 'Copy link'}
              </button>
            </div>

            <button
              onClick={downloadCalendarInvite}
              className="inline-flex items-center gap-1 text-indigo-700 hover:text-indigo-800 font-medium cursor-pointer"
            >
              <CalendarPlus className="w-3.5 h-3.5" />
              <span>Add to Calendar</span>
            </button>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 bg-stone-50 border-t border-stone-200 rounded-b-2xl flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 cursor-pointer"
          >
            Close
          </button>

          {isEnrolled ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-700 font-bold bg-emerald-100 px-3 py-1.5 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>You are registered for this Seva</span>
              </div>
              <button
                onClick={() => onLeave(drive)}
                className="px-3 py-2 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              >
                Cancel Registration
              </button>
            </div>
          ) : (
            <button
              onClick={() => onJoin(drive)}
              className="px-6 py-2.5 text-sm font-extrabold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Confirm My Registration</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
