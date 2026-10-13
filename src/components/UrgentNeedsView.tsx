import React, { useState } from 'react';
import { Flame, ShieldAlert, Phone, Clock, MapPin, Users, Heart, CheckCircle2, Plus } from 'lucide-react';
import { UrgentNeed } from '../types';

interface UrgentNeedsViewProps {
  urgentNeeds: UrgentNeed[];
  onHelpUrgent: (urgentId: string) => void;
  onAddUrgent: (item: UrgentNeed) => void;
}

export const UrgentNeedsView: React.FC<UrgentNeedsViewProps> = ({
  urgentNeeds,
  onHelpUrgent,
  onAddUrgent,
}) => {
  const [showCreate, setShowCreate] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<UrgentNeed['category']>('blood');
  const [city, setCity] = useState('Hyderabad');
  const [location, setLocation] = useState('');
  const [deadline, setDeadline] = useState('Today by 5:00 PM');
  const [desc, setDesc] = useState('');
  const [phone, setPhone] = useState('+91 94401 22334');
  const [volunteersNeeded, setVolunteersNeeded] = useState('4');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !location.trim() || !phone.trim()) return;

    const newUrgent: UrgentNeed = {
      id: `urg-${Date.now()}`,
      title: title.trim(),
      category,
      city,
      location: location.trim(),
      urgencyLevel: 'critical',
      deadline,
      description: desc.trim() || title.trim(),
      contactNumber: phone.trim(),
      volunteersNeeded: parseInt(volunteersNeeded) || 2,
      volunteersJoined: 0,
      isResolved: false,
    };

    onAddUrgent(newUrgent);
    setTitle('');
    setLocation('');
    setShowCreate(false);
  };

  const getUrgencyBadge = (level: UrgentNeed['urgencyLevel']) => {
    switch (level) {
      case 'critical':
        return 'bg-red-600 text-white';
      case 'high':
        return 'bg-amber-600 text-white';
      default:
        return 'bg-blue-600 text-white';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-red-600 via-rose-700 to-amber-700 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
            <Flame className="w-4 h-4 text-yellow-300" />
            <span>Emergency Action Response</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Aapaatkaal: Urgent Community Needs
          </h1>
          <p className="text-xs sm:text-sm text-red-100 mt-1 max-w-xl leading-relaxed">
            Time-sensitive emergency requests: urgent blood requirements, immediate flood relief kit assembly, and emergency elderly assistance.
          </p>
        </div>

        <button
          onClick={() => setShowCreate(!showCreate)}
          className="self-start md:self-auto px-4 py-2.5 bg-white text-red-700 hover:bg-yellow-50 text-xs sm:text-sm font-extrabold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Post Emergency Request</span>
        </button>
      </div>

      {/* Composer if triggered */}
      {showCreate && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-red-200 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-600" />
              <span>Post Verified Urgent Community Request</span>
            </h3>
            <span className="text-[11px] text-neutral-400">Audited for medical / emergency safety</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Emergency Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Urgent: O- Negative Blood Donors Needed at NIMS Hospital"
              className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-red-500 bg-white"
              >
                <option value="blood">Blood Donor Requirement</option>
                <option value="disaster">Disaster / Flood Relief</option>
                <option value="food_emergency">Food & Water Shortage</option>
                <option value="elderly_urgent">Elderly / Medical Emergency</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">City *</label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">Deadline / Urgency *</label>
              <input
                type="text"
                required
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="e.g. Today by 4:00 PM"
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">Exact Hospital / Ward / Address *</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. NIMS Hospital Blood Bank, Punjagutta, Hyderabad"
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">Coordinator Direct Hotline *</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Emergency Details</label>
            <textarea
              rows={2}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Specify requirements, patient name/case number, or items to bring..."
              className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowCreate(false)}
              className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm"
            >
              Broadcast Emergency Need
            </button>
          </div>
        </form>
      )}

      {/* Urgent Requests List */}
      <div className="space-y-4">
        {urgentNeeds.map((item) => {
          const isResolved = item.isResolved || item.volunteersJoined >= item.volunteersNeeded;

          return (
            <div
              key={item.id}
              className={`p-6 rounded-2xl border transition-all ${
                isResolved
                  ? 'bg-stone-50 border-stone-200 opacity-60'
                  : 'bg-white border-red-200 shadow-md hover:border-red-300'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded ${getUrgencyBadge(item.urgencyLevel)}`}>
                      {item.urgencyLevel}
                    </span>
                    <span className="text-xs font-bold text-red-700 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{item.deadline}</span>
                    </span>
                    <span className="text-xs text-neutral-400">• {item.city}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-extrabold text-neutral-900">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-700 mt-2 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-neutral-600">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                      <span className="font-semibold text-neutral-800">{item.location}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Volunteers: <strong>{item.volunteersJoined} / {item.volunteersNeeded}</strong> joined</span>
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0">
                  <a
                    href={`tel:${item.contactNumber}`}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-neutral-800 font-bold text-xs rounded-xl transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-neutral-600" />
                    <span>{item.contactNumber}</span>
                  </a>

                  {isResolved ? (
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      <span>Volunteers Fulfilled</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => onHelpUrgent(item.id)}
                      className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Heart className="w-3.5 h-3.5 fill-white" />
                      <span>I Can Help</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
