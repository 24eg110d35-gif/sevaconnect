import React, { useState } from 'react';
import { X, Plus, ShieldCheck, Calendar, Clock, MapPin, Users, Award, Image, Sparkles } from 'lucide-react';
import { SevaDrive, SevaCategory } from '../types';
import { CITIES } from '../data/mockData';

interface CreateSevaModalProps {
  currentCity: string;
  onClose: () => void;
  onCreate: (newDrive: SevaDrive) => void;
}

export const CreateSevaModal: React.FC<CreateSevaModalProps> = ({
  currentCity,
  onClose,
  onCreate,
}) => {
  const [title, setTitle] = useState('');
  const [ngoName, setNgoName] = useState('Anurag Youth Seva Chapter');
  const [ngoVerified, setNgoVerified] = useState(true);
  const [category, setCategory] = useState<SevaCategory>('vidya');
  const [city, setCity] = useState(currentCity === 'All Cities' ? 'Hyderabad' : currentCity);
  const [locality, setLocality] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('2026-10-24');
  const [time, setTime] = useState('09:00 AM - 12:30 PM');
  const [durationHours, setDurationHours] = useState('3.5');
  const [volunteersRequired, setVolunteersRequired] = useState('15');
  const [shortDesc, setShortDesc] = useState('');
  const [fullDesc, setFullDesc] = useState('');
  const [skills, setSkills] = useState('Basic English, Enthusiasm, Patience');
  const [perks, setPerks] = useState('Certificate of Appreciation, Chai & Refreshments, NSS Credit');
  const [contactNumber, setContactNumber] = useState('+91 98490 12345');
  const [imageUrl, setImageUrl] = useState(
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80'
  );

  const imagePresets = [
    { label: 'Education / School', url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80' },
    { label: 'Food / Meals', url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80' },
    { label: 'Tree / Lake Cleaning', url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80' },
    { label: 'Healthcare & Elderly', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80' },
    { label: 'Animal Care', url: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !locality.trim() || !address.trim()) return;

    const newDrive: SevaDrive = {
      id: `seva-${Date.now()}`,
      title: title.trim(),
      ngoId: `ngo-${Date.now()}`,
      ngoName: ngoName.trim(),
      ngoVerified,
      category,
      shortDescription: shortDesc.trim() || title,
      fullDescription: fullDesc.trim() || shortDesc.trim() || title,
      city,
      locality: locality.trim(),
      address: address.trim(),
      date,
      time,
      durationHours: parseFloat(durationHours) || 3,
      volunteersRequired: parseInt(volunteersRequired) || 10,
      volunteersRegistered: 1, // creator counts or starts at 1
      skillsRequired: skills.split(',').map((s) => s.trim()).filter(Boolean),
      perks: perks.split(',').map((p) => p.trim()).filter(Boolean),
      isUrgent: false,
      imageUrl,
      contactNumber: contactNumber.trim(),
      registeredUserIds: ['vol-user-1'],
      createdAt: new Date().toISOString().split('T')[0],
    };

    onCreate(newDrive);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-stone-200 relative my-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
              +
            </div>
            <div>
              <h2 className="text-base font-bold text-neutral-900">Post a New Seva Drive</h2>
              <p className="text-xs text-neutral-500">Mobilize passionate volunteers for your community initiative</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">
              Drive Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Weekend Spoken English & Math Teaching for Govt School Kids"
              className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-orange-500 text-neutral-900"
            />
          </div>

          {/* Organization & Verified Check */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                NGO / Organizing Youth Chapter *
              </label>
              <input
                type="text"
                required
                value={ngoName}
                onChange={(e) => setNgoName(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as SevaCategory)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-orange-500 bg-white"
              >
                <option value="vidya">Vidya (Education & Literacy)</option>
                <option value="annapoorna">Annapoorna (Food Relief & Langar)</option>
                <option value="prakriti">Prakriti (Environment & Lake Cleaning)</option>
                <option value="aarogya">Aarogya (Healthcare & Blood Camps)</option>
                <option value="jeev">Jeev Seva (Animal Care & Feeding)</option>
                <option value="samaj">Samaj Seva (Elder & Community Care)</option>
                <option value="aapaatkaal">Aapaatkaal (Urgent Community Support)</option>
              </select>
            </div>
          </div>

          {/* Location fields */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">City *</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-orange-500 bg-white"
              >
                {CITIES.filter((c) => c !== 'All Cities').map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-neutral-700 mb-1">Locality / Area *</label>
              <input
                type="text"
                required
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                placeholder="e.g. Ghatkesar / Korremula Road"
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Full Venue Address *</label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. Zilla Parishad High School, Near Korremula Bus Stop, Ghatkesar"
              className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Date, Time, Duration, Volunteers Required */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">Date *</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">Time Slot *</label>
              <input
                type="text"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="09:00 AM - 12:00 PM"
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">Hours *</label>
              <input
                type="number"
                step="0.5"
                min="1"
                max="12"
                required
                value={durationHours}
                onChange={(e) => setDurationHours(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">Volunteers *</label>
              <input
                type="number"
                min="2"
                max="500"
                required
                value={volunteersRequired}
                onChange={(e) => setVolunteersRequired(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Descriptions */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Short Summary (1-2 sentences) *</label>
            <input
              type="text"
              required
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              placeholder="e.g. Mentor grade 6 students with hands-on science experiments and interactive fun math games."
              className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Full Agenda & Volunteer Instructions</label>
            <textarea
              rows={3}
              value={fullDesc}
              onChange={(e) => setFullDesc(e.target.value)}
              placeholder="Provide agenda breakdown, meeting point instructions, what materials to bring..."
              className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Perks & Skills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">Perks Provided (comma separated)</label>
              <input
                type="text"
                value={perks}
                onChange={(e) => setPerks(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">Skills Needed (comma separated)</label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Contact Number & Image Preset */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">Coordinator Phone / WhatsApp *</label>
              <input
                type="text"
                required
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">Cover Image Preset</label>
              <select
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-orange-500 bg-white"
              >
                {imagePresets.map((p, idx) => (
                  <option key={idx} value={p.url}>{p.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 rounded-xl shadow-md cursor-pointer transition-all"
            >
              Publish Seva Drive
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
