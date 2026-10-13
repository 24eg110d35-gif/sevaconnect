import React, { useState } from 'react';
import { X, Sparkles, Send, CheckCircle2, HeartHandshake, Loader2, ArrowRight } from 'lucide-react';
import { SevaDrive, VolunteerProfile } from '../types';
import { matchVolunteerWithSeva, MatchRecommendation } from '../services/gemini';

interface SmartMatcherModalProps {
  drives: SevaDrive[];
  volunteer: VolunteerProfile;
  currentCity: string;
  onClose: () => void;
  onOpenDriveDetails: (drive: SevaDrive) => void;
  onJoinDrive: (drive: SevaDrive) => void;
}

export const SmartMatcherModal: React.FC<SmartMatcherModalProps> = ({
  drives,
  volunteer,
  currentCity,
  onClose,
  onOpenDriveDetails,
  onJoinDrive,
}) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MatchRecommendation | null>(null);

  const presets = [
    'I have 3 hours on Sunday morning near Uppal and want to teach kids basic math.',
    'I want to join a hot meal distribution langar for hungry citizens this weekend.',
    'I am looking for an outdoor tree planting or lake cleanup drive with friends.',
    'I can assist doctors or elderly citizens during medical checkup camps.',
  ];

  const handleSearch = async (textToSearch: string) => {
    if (!textToSearch.trim()) return;
    setLoading(true);
    try {
      const match = await matchVolunteerWithSeva(textToSearch, drives, currentCity);
      setResult(match);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const matchedDrives = result
    ? drives.filter((d) => result.recommendedDriveIds.includes(d.id))
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-stone-200 relative my-6">
        
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-purple-600 animate-pulse" />
            </div>
            <div>
              <h2 className="text-base font-bold text-neutral-900 flex items-center gap-1.5">
                <span>Seva Sathi AI Matcher</span>
                <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-1.5 py-0.2 rounded uppercase">Smart Match</span>
              </h2>
              <p className="text-xs text-neutral-500">
                Describe your availability, skills, or what you feel called to do
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Query Input */}
        <div className="space-y-3">
          <div className="relative">
            <textarea
              rows={3}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., I'm a college student with 4 free hours on Saturday morning in Hyderabad. I love working with children or planting saplings..."
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-purple-500 text-neutral-800 placeholder:text-neutral-400"
            />
          </div>

          {/* Preset Prompts */}
          <div>
            <div className="text-[11px] font-semibold text-neutral-500 mb-1.5">Quick Suggestions:</div>
            <div className="flex flex-wrap gap-1.5">
              {presets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(preset);
                    handleSearch(preset);
                  }}
                  className="text-[11px] text-left bg-stone-100 hover:bg-purple-50 hover:text-purple-700 border border-stone-200 hover:border-purple-200 text-neutral-700 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={() => handleSearch(query)}
            disabled={loading || !query.trim()}
            className="w-full py-2.5 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 disabled:opacity-50 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Analyzing best Seva matches...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-purple-200" />
                <span>Find My Ideal Seva Match</span>
              </>
            )}
          </button>
        </div>

        {/* Match Results */}
        {result && (
          <div className="mt-6 pt-5 border-t border-stone-200 space-y-4">
            
            {/* AI Advisor Message */}
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-3.5 text-xs text-purple-950">
              <div className="font-bold text-purple-900 flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span>Seva Sathi Recommendation</span>
              </div>
              <p className="leading-relaxed">{result.personalizedMessage}</p>
              {result.suggestedAction && (
                <div className="mt-2 text-[11px] font-medium text-purple-800 bg-purple-100/70 p-2 rounded-lg">
                  💡 <strong>Tip:</strong> {result.suggestedAction}
                </div>
              )}
            </div>

            {/* Matched Drive Cards */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold text-neutral-800">Recommended Opportunities:</div>
              {matchedDrives.map((drive) => {
                const isEnrolled = volunteer.enrolledDriveIds.includes(drive.id);

                return (
                  <div
                    key={drive.id}
                    className="p-3 bg-white border border-stone-200 rounded-xl shadow-2xs hover:shadow-xs transition-all flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={drive.imageUrl}
                        alt={drive.title}
                        className="w-12 h-12 rounded-lg object-cover shrink-0"
                      />
                      <div>
                        <div className="text-[10px] font-bold uppercase text-orange-600">
                          {drive.category} • {drive.city}
                        </div>
                        <h4 className="text-xs font-bold text-neutral-900 line-clamp-1">
                          {drive.title}
                        </h4>
                        <div className="text-[11px] text-neutral-500">
                          {drive.date} • {drive.time.split(' - ')[0]}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onOpenDriveDetails(drive)}
                        className="px-2.5 py-1 text-xs font-semibold text-neutral-700 hover:bg-stone-100 rounded-md cursor-pointer"
                      >
                        Details
                      </button>
                      {isEnrolled ? (
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                          Enrolled
                        </span>
                      ) : (
                        <button
                          onClick={() => onJoinDrive(drive)}
                          className="px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-lg shadow-2xs cursor-pointer flex items-center gap-1"
                        >
                          <HeartHandshake className="w-3 h-3" />
                          <span>Join</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
