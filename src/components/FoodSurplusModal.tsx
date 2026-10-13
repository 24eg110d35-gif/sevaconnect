import React, { useState } from 'react';
import { X, UtensilsCrossed, Plus, Clock, MapPin, Phone, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';
import { SurplusDonation } from '../types';
import { CITIES } from '../data/mockData';

interface FoodSurplusModalProps {
  surplusItems: SurplusDonation[];
  currentCity: string;
  onClose: () => void;
  onAddSurplus: (item: SurplusDonation) => void;
  onClaimSurplus: (itemId: string, ngoName: string) => void;
}

export const FoodSurplusModal: React.FC<FoodSurplusModalProps> = ({
  surplusItems,
  currentCity,
  onClose,
  onAddSurplus,
  onClaimSurplus,
}) => {
  const [activeTab, setActiveTab] = useState<'browse' | 'post'>('browse');

  // New post form fields
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('+91 98480 12345');
  const [itemType, setItemType] = useState<SurplusDonation['itemType']>('cooked_food');
  const [quantityDesc, setQuantityDesc] = useState('');
  const [city, setCity] = useState(currentCity === 'All Cities' ? 'Hyderabad' : currentCity);
  const [address, setAddress] = useState('');
  const [bestBefore, setBestBefore] = useState('Tonight by 10:00 PM');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName.trim() || !quantityDesc.trim() || !address.trim()) return;

    const newItem: SurplusDonation = {
      id: `sur-${Date.now()}`,
      donorName: donorName.trim(),
      donorPhone: donorPhone.trim(),
      itemType,
      quantityDesc: quantityDesc.trim(),
      city,
      address: address.trim(),
      bestBefore: bestBefore.trim(),
      status: 'available',
      createdAt: 'Just now',
    };

    onAddSurplus(newItem);
    setActiveTab('browse');
    setQuantityDesc('');
    setAddress('');
  };

  const getItemTypeBadge = (type: SurplusDonation['itemType']) => {
    switch (type) {
      case 'cooked_food':
        return { label: '🍲 Cooked Food / Meals', bg: 'bg-orange-50 text-orange-800 border-orange-200' };
      case 'packaged_ration':
        return { label: '📦 Packaged Rations', bg: 'bg-amber-50 text-amber-800 border-amber-200' };
      case 'books_study':
        return { label: '📚 Study Books & Stationery', bg: 'bg-blue-50 text-blue-800 border-blue-200' };
      case 'clothes':
        return { label: '👕 Clean Clothes / Blankets', bg: 'bg-purple-50 text-purple-800 border-purple-200' };
      case 'medical_supplies':
        return { label: '💊 First Aid / Medical Kits', bg: 'bg-rose-50 text-rose-800 border-rose-200' };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-stone-200 relative my-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center">
              <UtensilsCrossed className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                <span>Annadanam & Surplus Rescue</span>
                <span className="text-[10px] bg-orange-100 text-orange-800 font-bold px-2 py-0.5 rounded-full">Zero Food Waste</span>
              </h2>
              <p className="text-xs text-neutral-500">
                Rescue extra cooked food from weddings/events or donate study kits to local shelters
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

        {/* Tab switch */}
        <div className="flex items-center gap-2 mb-5 bg-stone-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('browse')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'browse'
                ? 'bg-white text-neutral-900 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Browse Available Surplus ({surplusItems.filter(s => s.status === 'available').length})
          </button>
          <button
            onClick={() => setActiveTab('post')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'post'
                ? 'bg-white text-neutral-900 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            + Post Surplus Food / Items
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'browse' ? (
          <div className="space-y-3">
            {surplusItems.length === 0 ? (
              <div className="text-center py-8 text-neutral-500 text-xs">
                No surplus items listed right now. Post an item above if you have food or essentials to donate!
              </div>
            ) : (
              surplusItems.map((item) => {
                const badge = getItemTypeBadge(item.itemType);
                const isClaimed = item.status === 'claimed';

                return (
                  <div
                    key={item.id}
                    className={`p-4 rounded-xl border transition-all ${
                      isClaimed
                        ? 'bg-stone-50 border-stone-200 opacity-60'
                        : 'bg-white border-stone-200 shadow-2xs hover:shadow-xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${badge.bg}`}>
                            {badge.label}
                          </span>
                          <span className="text-[11px] text-neutral-400">{item.createdAt}</span>
                        </div>
                        <h4 className="text-sm font-bold text-neutral-900 mt-1.5">
                          {item.quantityDesc}
                        </h4>
                      </div>

                      {isClaimed ? (
                        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md shrink-0">
                          Claimed by {item.claimedByNGO || 'Local Shelter'}
                        </span>
                      ) : (
                        <button
                          onClick={() => onClaimSurplus(item.id, 'Youth Seva Shelter Partner')}
                          className="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-lg shadow-2xs transition-colors shrink-0 cursor-pointer"
                        >
                          Claim for Shelter
                        </button>
                      )}
                    </div>

                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-600">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                        <span className="truncate">{item.address}, {item.city}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>Pickup: {item.bestBefore}</span>
                      </div>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-neutral-500">
                      <span>Donor: <strong>{item.donorName}</strong></span>
                      <a
                        href={`tel:${item.donorPhone}`}
                        className="text-orange-700 font-semibold hover:underline flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3" />
                        <span>{item.donorPhone}</span>
                      </a>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">Donor Name / Event Hall *</label>
              <input
                type="text"
                required
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                placeholder="e.g. Sree Convention Center / Priya Wedding Reception"
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">Item Category *</label>
                <select
                  value={itemType}
                  onChange={(e) => setItemType(e.target.value as any)}
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-orange-500 bg-white"
                >
                  <option value="cooked_food">Fresh Cooked Food / Catering Meals</option>
                  <option value="packaged_ration">Packaged Rice / Groceries / Ration</option>
                  <option value="books_study">School Textbooks & Notebooks</option>
                  <option value="clothes">Blankets & Clean Clothes</option>
                  <option value="medical_supplies">Medical / First Aid Supplies</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">Pickup Contact Phone *</label>
                <input
                  type="text"
                  required
                  value={donorPhone}
                  onChange={(e) => setDonorPhone(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">Quantity & Description *</label>
              <input
                type="text"
                required
                value={quantityDesc}
                onChange={(e) => setQuantityDesc(e.target.value)}
                placeholder="e.g. Approx 80 meal packs (Pulao, Dal, Sabzi & Sweet) fresh from lunch event"
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">City *</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-orange-500 bg-white"
                >
                  {CITIES.filter(c => c !== 'All Cities').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">Best Before / Pickup Window *</label>
                <input
                  type="text"
                  required
                  value={bestBefore}
                  onChange={(e) => setBestBefore(e.target.value)}
                  placeholder="e.g. Tonight by 10:30 PM"
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">Exact Pickup Address & Landmark *</label>
              <textarea
                rows={2}
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. Main Kitchen Gate, Sree Convention, Near Uppal Metro Station"
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('browse')}
                className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-lg shadow-sm"
              >
                Post Surplus for Pickup
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
