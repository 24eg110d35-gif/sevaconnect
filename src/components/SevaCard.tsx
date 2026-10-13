import React from 'react';
import { Calendar, Clock, MapPin, CheckCircle2, ShieldCheck, Award, Users, ArrowUpRight, HeartHandshake } from 'lucide-react';
import { SevaDrive, VolunteerProfile } from '../types';
import { CATEGORY_INFO } from '../data/mockData';

interface SevaCardProps {
  drive: SevaDrive;
  volunteer: VolunteerProfile;
  onOpenDetails: (drive: SevaDrive) => void;
  onQuickJoin: (drive: SevaDrive) => void;
}

export const SevaCard: React.FC<SevaCardProps> = ({
  drive,
  volunteer,
  onOpenDetails,
  onQuickJoin,
}) => {
  const isEnrolled = volunteer.enrolledDriveIds.includes(drive.id) || drive.registeredUserIds.includes(volunteer.id);
  const spotsLeft = Math.max(0, drive.volunteersRequired - drive.volunteersRegistered);
  const fillPercentage = Math.min(100, Math.round((drive.volunteersRegistered / drive.volunteersRequired) * 100));
  const cat = CATEGORY_INFO[drive.category] || CATEGORY_INFO['vidya'];

  // Formatted date
  const dateObj = new Date(drive.date);
  const formattedDate = dateObj.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  return (
    <div className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md hover:border-stone-300 transition-all flex flex-col justify-between">
      {/* Top Banner Image with Overlays */}
      <div className="relative h-44 w-full overflow-hidden bg-stone-100">
        <img
          src={drive.imageUrl}
          alt={drive.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-white/95 backdrop-blur-xs text-neutral-800 shadow-2xs`}>
            <span>{cat.label.split(' ')[0]}</span>
          </span>
        </div>

        {/* Duration / Urgent Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          {drive.isUrgent && (
            <span className="bg-red-600 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow-xs">
              Urgent
            </span>
          )}
          <span className="bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded">
            {drive.durationHours} hrs
          </span>
        </div>

        {/* Date & Time overlay bottom of image */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1.5 font-semibold drop-shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-amber-300" />
            <span>{formattedDate}</span>
            <span className="opacity-70">•</span>
            <span>{drive.time.split(' - ')[0]}</span>
          </div>
          <span className="text-[11px] text-stone-200 drop-shadow-sm bg-black/40 px-1.5 py-0.5 rounded">
            {spotsLeft > 0 ? `${spotsLeft} spots left` : 'Full'}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* NGO Name with Verified Badge */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-1.5">
            <span className="font-semibold text-neutral-700 truncate">{drive.ngoName}</span>
            {drive.ngoVerified && (
              <span className="inline-flex items-center text-emerald-600" title="Darpan Verified NGO">
                <ShieldCheck className="w-3.5 h-3.5 fill-emerald-100" />
              </span>
            )}
          </div>

          {/* Title */}
          <h3
            onClick={() => onOpenDetails(drive)}
            className="text-base font-bold text-neutral-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug cursor-pointer"
          >
            {drive.title}
          </h3>

          {/* Short Description */}
          <p className="mt-2 text-xs text-neutral-600 line-clamp-2 leading-relaxed">
            {drive.shortDescription}
          </p>

          {/* Location */}
          <div className="mt-3 flex items-center gap-1.5 text-xs text-neutral-500">
            <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
            <span className="truncate font-medium">{drive.locality}, {drive.city}</span>
          </div>

          {/* Volunteer Spots Progress Bar */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-[11px] mb-1 font-medium text-neutral-600">
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3 text-neutral-400" />
                <span>Volunteers: {drive.volunteersRegistered} / {drive.volunteersRequired}</span>
              </span>
              <span className="text-[10px] text-neutral-400">{fillPercentage}% filled</span>
            </div>
            <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  fillPercentage >= 90
                    ? 'bg-amber-500'
                    : 'bg-emerald-600'
                }`}
                style={{ width: `${fillPercentage}%` }}
              />
            </div>
          </div>

          {/* Perks Preview */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {drive.perks.slice(0, 2).map((perk, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 bg-stone-100 text-neutral-700 text-[10px] font-medium px-2 py-0.5 rounded-md"
              >
                <Award className="w-2.5 h-2.5 text-amber-600" />
                <span>{perk}</span>
              </span>
            ))}
            {drive.perks.length > 2 && (
              <span className="text-[10px] text-neutral-400 self-center">
                +{drive.perks.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-2">
          <button
            onClick={() => onOpenDetails(drive)}
            className="flex-1 py-2 px-3 text-xs font-semibold text-neutral-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors text-center cursor-pointer"
          >
            Details & Agenda
          </button>

          {isEnrolled ? (
            <button
              onClick={() => onOpenDetails(drive)}
              className="py-2 px-3.5 text-xs font-bold text-emerald-800 bg-emerald-100 rounded-lg flex items-center gap-1 cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Enrolled</span>
            </button>
          ) : (
            <button
              onClick={() => onQuickJoin(drive)}
              className="py-2 px-4 text-xs font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 rounded-lg shadow-2xs transition-all flex items-center gap-1 cursor-pointer"
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Join Seva</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
