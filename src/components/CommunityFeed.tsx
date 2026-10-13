import React, { useState } from 'react';
import { Heart, MessageSquare, Send, Sparkles, MapPin, UserCheck, Plus, Check } from 'lucide-react';
import { CommunityStory, VolunteerProfile } from '../types';
import { CATEGORY_INFO } from '../data/mockData';

interface CommunityFeedProps {
  stories: CommunityStory[];
  volunteer: VolunteerProfile;
  onApplaud: (storyId: string) => void;
  onAddStory: (story: CommunityStory) => void;
}

export const CommunityFeed: React.FC<CommunityFeedProps> = ({
  stories,
  volunteer,
  onApplaud,
  onAddStory,
}) => {
  const [showCompose, setShowCompose] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<any>('vidya');
  const [city, setCity] = useState(volunteer.city);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newStory: CommunityStory = {
      id: `story-${Date.now()}`,
      authorName: volunteer.name,
      authorRole: 'Active Volunteer, Anurag University Chapter',
      ngoName: 'Community Seva Volunteer',
      title: title.trim(),
      content: content.trim(),
      category,
      city,
      date: 'Just now',
      applauseCount: 1,
      hasApplauded: true,
    };

    onAddStory(newStory);
    setTitle('');
    setContent('');
    setShowCompose(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Feed Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-emerald-500/10 p-6 rounded-3xl border border-stone-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-700 bg-orange-100 px-2.5 py-0.5 rounded-full mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>Real Stories of Seva & Human Impact</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900">
            Voices from the Ground
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1">
            Read heartwarming memories and reflections shared by volunteers and coordinators.
          </p>
        </div>

        <button
          onClick={() => setShowCompose(!showCompose)}
          className="self-start sm:self-auto px-4 py-2 bg-neutral-900 hover:bg-black text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Share Your Seva Story</span>
        </button>
      </div>

      {/* Composer Card if open */}
      {showCompose && (
        <form onSubmit={handleSubmit} className="bg-white p-5 rounded-2xl border border-stone-300 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-neutral-900">Share Your Volunteer Experience</h3>
          
          <div>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your story a meaningful headline..."
              className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-orange-500 bg-white"
              >
                <option value="vidya">Vidya (Education)</option>
                <option value="annapoorna">Annapoorna (Food Relief)</option>
                <option value="prakriti">Prakriti (Environment)</option>
                <option value="aarogya">Aarogya (Healthcare)</option>
                <option value="jeev">Jeev Seva (Animal Care)</option>
                <option value="samaj">Samaj Seva (Elder Care)</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City (e.g. Hyderabad)"
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div>
            <textarea
              rows={3}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What happened? What did you feel? How did it change your perspective?"
              className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowCompose(false)}
              className="px-3 py-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-lg shadow-xs"
            >
              Publish to Seva Wall
            </button>
          </div>
        </form>
      )}

      {/* Stories list */}
      <div className="space-y-4">
        {stories.map((story) => {
          const cat = CATEGORY_INFO[story.category] || CATEGORY_INFO['vidya'];

          return (
            <div
              key={story.id}
              className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-xs hover:shadow-sm transition-all"
            >
              {/* Author & Category Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center font-bold text-sm">
                    {story.authorName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-neutral-900">{story.authorName}</span>
                      <span className="text-[10px] text-neutral-400">• {story.date}</span>
                    </div>
                    <div className="text-xs text-neutral-500">
                      {story.authorRole} {story.ngoName && `• ${story.ngoName}`}
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-neutral-700">
                  {cat.label.split(' ')[0]} • {story.city}
                </span>
              </div>

              {/* Story Content */}
              <h3 className="text-base font-bold text-neutral-900 mb-2 leading-snug">
                {story.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
                {story.content}
              </p>

              {story.imageUrl && (
                <div className="mt-3.5 rounded-xl overflow-hidden max-h-72">
                  <img
                    src={story.imageUrl}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Interaction Bar */}
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-neutral-500">
                <button
                  onClick={() => onApplaud(story.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                    story.hasApplauded
                      ? 'bg-rose-50 text-rose-700'
                      : 'hover:bg-stone-100 text-neutral-700'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${story.hasApplauded ? 'fill-rose-600 text-rose-600' : 'text-neutral-500'}`} />
                  <span>{story.applauseCount} Pranam / Kudos</span>
                </button>

                <div className="text-[11px] text-neutral-400">
                  Shared from {story.city}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
