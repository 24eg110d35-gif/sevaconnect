import React from 'react';
import { AlertTriangle, Phone, ArrowRight, ShieldAlert, Heart, Clock } from 'lucide-react';
import { UrgentNeed } from '../types';

interface UrgentAlertsBarProps {
  urgentNeeds: UrgentNeed[];
  onSelectUrgent: (item: UrgentNeed) => void;
  onViewAllUrgent: () => void;
}

export const UrgentAlertsBar: React.FC<UrgentAlertsBarProps> = ({
  urgentNeeds,
  onSelectUrgent,
  onViewAllUrgent,
}) => {
  const activeUrgent = urgentNeeds.filter((u) => !u.isResolved);

  if (activeUrgent.length === 0) return null;

  const topUrgent = activeUrgent[0];

  return (
    <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-200 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-300"></span>
            </span>
            <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px] bg-red-800/80 px-2 py-0.5 rounded border border-red-400/40">
              <ShieldAlert className="w-3.5 h-3.5 text-yellow-300" />
              <span>Urgent Need</span>
            </div>
            <p className="font-semibold text-white truncate max-w-md md:max-w-xl">
              {topUrgent.title}
            </p>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <span className="hidden md:flex items-center gap-1 text-red-100 text-xs">
              <Clock className="w-3.5 h-3.5" />
              {topUrgent.deadline}
            </span>

            <button
              onClick={() => onSelectUrgent(topUrgent)}
              className="bg-white text-red-700 hover:bg-yellow-50 font-bold px-3 py-1 rounded-md text-xs shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-red-600" />
              <span>Offer Help ({topUrgent.volunteersJoined}/{topUrgent.volunteersNeeded})</span>
            </button>

            {activeUrgent.length > 1 && (
              <button
                onClick={onViewAllUrgent}
                className="text-white hover:text-yellow-200 text-xs underline underline-offset-2 flex items-center gap-0.5 ml-1 cursor-pointer"
              >
                <span>+{activeUrgent.length - 1} more</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
