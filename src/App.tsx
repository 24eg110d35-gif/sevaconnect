import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { UrgentAlertsBar } from './components/UrgentAlertsBar';
import { SevaCard } from './components/SevaCard';
import { SevaDetailModal } from './components/SevaDetailModal';
import { CreateSevaModal } from './components/CreateSevaModal';
import { VolunteerPassport } from './components/VolunteerPassport';
import { CertificateModal } from './components/CertificateModal';
import { SmartMatcherModal } from './components/SmartMatcherModal';
import { FoodSurplusModal } from './components/FoodSurplusModal';
import { CommunityFeed } from './components/CommunityFeed';
import { UrgentNeedsView } from './components/UrgentNeedsView';
import { Footer } from './components/Footer';

import {
  getStoredDrives,
  saveDrives,
  getStoredUrgentNeeds,
  saveUrgentNeeds,
  getStoredVolunteer,
  saveVolunteer,
  getStoredBadges,
  saveBadges,
  getStoredStories,
  saveStories,
  getStoredSurplus,
  saveSurplus,
} from './services/storage';

import { SevaDrive, UrgentNeed, VolunteerProfile, SevaBadge, CommunityStory, SurplusDonation } from './types';
import { Sparkles, HeartHandshake, CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  // Core Data State
  const [drives, setDrives] = useState<SevaDrive[]>(() => getStoredDrives());
  const [urgentNeeds, setUrgentNeeds] = useState<UrgentNeed[]>(() => getStoredUrgentNeeds());
  const [volunteer, setVolunteer] = useState<VolunteerProfile>(() => getStoredVolunteer());
  const [badges, setBadges] = useState<SevaBadge[]>(() => getStoredBadges());
  const [stories, setStories] = useState<CommunityStory[]>(() => getStoredStories());
  const [surplus, setSurplus] = useState<SurplusDonation[]>(() => getStoredSurplus());

  // Navigation & Filtering State
  const [activeTab, setActiveTab] = useState<string>('explore');
  const [selectedCity, setSelectedCity] = useState<string>('Hyderabad');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [weekendOnly, setWeekendOnly] = useState<boolean>(false);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [hasCertificateOnly, setHasCertificateOnly] = useState<boolean>(false);

  // Modals
  const [detailModalDrive, setDetailModalDrive] = useState<SevaDrive | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isMatcherOpen, setIsMatcherOpen] = useState<boolean>(false);
  const [isSurplusModalOpen, setIsSurplusModalOpen] = useState<boolean>(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);

  // Toast banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Synchronize to localStorage
  useEffect(() => {
    saveDrives(drives);
  }, [drives]);

  useEffect(() => {
    saveUrgentNeeds(urgentNeeds);
  }, [urgentNeeds]);

  useEffect(() => {
    saveVolunteer(volunteer);
  }, [volunteer]);

  useEffect(() => {
    saveBadges(badges);
  }, [badges]);

  useEffect(() => {
    saveStories(stories);
  }, [stories]);

  useEffect(() => {
    saveSurplus(surplus);
  }, [surplus]);

  // Join Seva Drive Action
  const handleJoinDrive = (drive: SevaDrive) => {
    if (volunteer.enrolledDriveIds.includes(drive.id)) {
      showToast(`You are already registered for "${drive.title}".`);
      return;
    }

    const updatedDrive: SevaDrive = {
      ...drive,
      volunteersRegistered: drive.volunteersRegistered + 1,
      registeredUserIds: [...drive.registeredUserIds, volunteer.id],
    };

    const updatedVolunteer: VolunteerProfile = {
      ...volunteer,
      enrolledDriveIds: [...volunteer.enrolledDriveIds, drive.id],
    };

    setDrives((prev) => prev.map((d) => (d.id === drive.id ? updatedDrive : d)));
    setVolunteer(updatedVolunteer);
    if (detailModalDrive?.id === drive.id) {
      setDetailModalDrive(updatedDrive);
    }

    showToast(`🎉 Registration Confirmed! You joined "${drive.title}". Added to your Seva Passport.`);
  };

  // Leave / Cancel Registration
  const handleLeaveDrive = (drive: SevaDrive) => {
    const updatedDrive: SevaDrive = {
      ...drive,
      volunteersRegistered: Math.max(0, drive.volunteersRegistered - 1),
      registeredUserIds: drive.registeredUserIds.filter((uid) => uid !== volunteer.id),
    };

    const updatedVolunteer: VolunteerProfile = {
      ...volunteer,
      enrolledDriveIds: volunteer.enrolledDriveIds.filter((id) => id !== drive.id),
    };

    setDrives((prev) => prev.map((d) => (d.id === drive.id ? updatedDrive : d)));
    setVolunteer(updatedVolunteer);
    if (detailModalDrive?.id === drive.id) {
      setDetailModalDrive(updatedDrive);
    }

    showToast(`Registration cancelled for "${drive.title}".`);
  };

  // Log Past Seva Hours
  const handleLogHours = (addedHours: number, title: string) => {
    const newTotal = Number((volunteer.totalHours + addedHours).toFixed(1));
    const newDrivesCount = volunteer.drivesCompleted + 1;

    let updatedBadges = [...badges];
    let newBadgesEarned = [...volunteer.badges];

    // Check Centurion milestone badge (50+ hours)
    if (newTotal >= 50 && !volunteer.badges.includes('badge-6')) {
      newBadgesEarned.push('badge-6');
      updatedBadges = updatedBadges.map((b) =>
        b.id === 'badge-6' ? { ...b, unlocked: true, dateEarned: 'Today' } : b
      );
    }

    // Check Vidya Jyoti if teaching
    if (title.toLowerCase().includes('teach') || title.toLowerCase().includes('vidya')) {
      if (!volunteer.badges.includes('badge-4')) {
        newBadgesEarned.push('badge-4');
        updatedBadges = updatedBadges.map((b) =>
          b.id === 'badge-4' ? { ...b, unlocked: true, dateEarned: 'Today' } : b
        );
      }
    }

    setBadges(updatedBadges);
    setVolunteer({
      ...volunteer,
      totalHours: newTotal,
      drivesCompleted: newDrivesCount,
      badges: newBadgesEarned,
    });

    showToast(`✨ ${addedHours} Seva Hours logged successfully! Total is now ${newTotal} hrs.`);
  };

  // Create New Seva Drive
  const handleCreateDrive = (newDrive: SevaDrive) => {
    setDrives((prev) => [newDrive, ...prev]);
    showToast(`🌟 Seva Drive published! Now open for volunteers.`);
  };

  // Help with Urgent Need
  const handleHelpUrgent = (urgentId: string) => {
    const updatedUrgent = urgentNeeds.map((u) => {
      if (u.id === urgentId) {
        return {
          ...u,
          volunteersJoined: u.volunteersJoined + 1,
          isResolved: u.volunteersJoined + 1 >= u.volunteersNeeded,
        };
      }
      return u;
    });

    setUrgentNeeds(updatedUrgent);

    // Unlock Life Saver badge if not yet unlocked
    if (!volunteer.badges.includes('badge-5')) {
      setVolunteer({
        ...volunteer,
        badges: [...volunteer.badges, 'badge-5'],
      });
      setBadges((prev) =>
        prev.map((b) => (b.id === 'badge-5' ? { ...b, unlocked: true, dateEarned: 'Today' } : b))
      );
    }

    showToast(`🙏 Thank you for stepping forward! Coordinator has been notified.`);
  };

  // Applaud Story
  const handleApplaudStory = (storyId: string) => {
    setStories((prev) =>
      prev.map((s) => {
        if (s.id === storyId) {
          const nextApplauded = !s.hasApplauded;
          return {
            ...s,
            applauseCount: nextApplauded ? s.applauseCount + 1 : s.applauseCount - 1,
            hasApplauded: nextApplauded,
          };
        }
        return s;
      })
    );
  };

  // Add Story
  const handleAddStory = (newStory: CommunityStory) => {
    setStories((prev) => [newStory, ...prev]);
    showToast(`✍️ Story shared on the Seva Wall! Thank you for inspiring others.`);
  };

  // Add Surplus item
  const handleAddSurplus = (newItem: SurplusDonation) => {
    setSurplus((prev) => [newItem, ...prev]);
    showToast(`🍲 Surplus listing broadcasted! Local shelters & volunteers alerted.`);
  };

  // Claim Surplus item
  const handleClaimSurplus = (itemId: string, ngoName: string) => {
    setSurplus((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? { ...item, status: 'claimed', claimedByNGO: ngoName }
          : item
      )
    );
    showToast(`✅ Claim confirmed! Contact donor for dispatch.`);
  };

  // Filtered Drives
  const filteredDrives = useMemo(() => {
    return drives.filter((drive) => {
      // City filter
      if (selectedCity !== 'All Cities' && drive.city.toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && drive.category !== selectedCategory) {
        return false;
      }

      // Weekend only
      if (weekendOnly) {
        const d = new Date(drive.date);
        const day = d.getDay();
        if (day !== 0 && day !== 6) return false; // 0 is Sunday, 6 is Saturday
      }

      // Verified NGO only
      if (verifiedOnly && !drive.ngoVerified) {
        return false;
      }

      // Certificate only
      if (hasCertificateOnly) {
        const hasCert = drive.perks.some((p) => p.toLowerCase().includes('certificate'));
        if (!hasCert) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = drive.title.toLowerCase().includes(q);
        const matchesLocality = drive.locality.toLowerCase().includes(q);
        const matchesDesc = drive.shortDescription.toLowerCase().includes(q) || drive.fullDescription.toLowerCase().includes(q);
        const matchesSkills = drive.skillsRequired.some((s) => s.toLowerCase().includes(q));
        const matchesNgo = drive.ngoName.toLowerCase().includes(q);
        if (!matchesTitle && !matchesLocality && !matchesDesc && !matchesSkills && !matchesNgo) {
          return false;
        }
      }

      return true;
    });
  }, [drives, selectedCity, selectedCategory, weekendOnly, verifiedOnly, hasCertificateOnly, searchQuery]);

  return (
    <div className="min-h-screen bg-stone-50/60 text-neutral-900 flex flex-col font-sans">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-neutral-900 text-white text-xs sm:text-sm font-semibold px-4 py-3 rounded-2xl shadow-xl border border-neutral-700 flex items-center gap-2.5 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        volunteer={volunteer}
        urgentNeeds={urgentNeeds}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        onOpenMatcher={() => setIsMatcherOpen(true)}
        onOpenSurplusModal={() => setIsSurplusModalOpen(true)}
      />

      {/* Urgent Emergency Alert Ticker */}
      <UrgentAlertsBar
        urgentNeeds={urgentNeeds}
        onSelectUrgent={() => setActiveTab('urgent')}
        onViewAllUrgent={() => setActiveTab('urgent')}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'explore' && (
          <div>
            {/* Hero & Category Discovery */}
            <HeroBanner
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              weekendOnly={weekendOnly}
              setWeekendOnly={setWeekendOnly}
              verifiedOnly={verifiedOnly}
              setVerifiedOnly={setVerifiedOnly}
              hasCertificateOnly={hasCertificateOnly}
              setHasCertificateOnly={setHasCertificateOnly}
              totalDrivesCount={drives.length}
              onOpenMatcher={() => setIsMatcherOpen(true)}
            />

            {/* Drives Grid Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-xl font-extrabold text-neutral-900">
                    Open Community Drives
                    {selectedCity !== 'All Cities' && <span className="text-orange-600 font-bold ml-1.5">in {selectedCity}</span>}
                  </h2>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Showing {filteredDrives.length} opportunities ready for your participation
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMatcherOpen(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-800 bg-purple-50 hover:bg-purple-100 border border-purple-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    <span>Match My Skills</span>
                  </button>

                  <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-800 bg-white hover:bg-stone-100 border border-stone-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                  >
                    <span>+ Post New Drive</span>
                  </button>
                </div>
              </div>

              {/* Drives Grid */}
              {filteredDrives.length === 0 ? (
                <div className="bg-white border border-dashed border-stone-300 rounded-3xl p-12 text-center max-w-lg mx-auto">
                  <HeartHandshake className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-neutral-800">No Seva drives match your search</h3>
                  <p className="text-xs text-neutral-500 mt-1">
                    Try clearing some quick filters or select "All Cities" to discover drives across other areas.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setWeekendOnly(false);
                      setVerifiedOnly(false);
                      setHasCertificateOnly(false);
                      setSelectedCity('All Cities');
                    }}
                    className="mt-4 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDrives.map((drive) => (
                    <SevaCard
                      key={drive.id}
                      drive={drive}
                      volunteer={volunteer}
                      onOpenDetails={(d) => setDetailModalDrive(d)}
                      onQuickJoin={handleJoinDrive}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Urgent Tab */}
        {activeTab === 'urgent' && (
          <UrgentNeedsView
            urgentNeeds={urgentNeeds}
            onHelpUrgent={handleHelpUrgent}
            onAddUrgent={(item) => setUrgentNeeds((prev) => [item, ...prev])}
          />
        )}

        {/* Annadanam / Surplus Tab */}
        {activeTab === 'surplus' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <FoodSurplusModal
              surplusItems={surplus}
              currentCity={selectedCity}
              onClose={() => setActiveTab('explore')}
              onAddSurplus={handleAddSurplus}
              onClaimSurplus={handleClaimSurplus}
            />
          </div>
        )}

        {/* Community Feed / Stories Tab */}
        {activeTab === 'stories' && (
          <CommunityFeed
            stories={stories}
            volunteer={volunteer}
            onApplaud={handleApplaudStory}
            onAddStory={handleAddStory}
          />
        )}

        {/* Passport / Profile Tab */}
        {activeTab === 'passport' && (
          <VolunteerPassport
            volunteer={volunteer}
            allDrives={drives}
            badges={badges}
            onOpenCertificate={() => setIsCertificateOpen(true)}
            onOpenDriveDetails={(d) => setDetailModalDrive(d)}
            onLogHours={handleLogHours}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      {detailModalDrive && (
        <SevaDetailModal
          drive={detailModalDrive}
          volunteer={volunteer}
          onClose={() => setDetailModalDrive(null)}
          onJoin={handleJoinDrive}
          onLeave={handleLeaveDrive}
        />
      )}

      {isCreateModalOpen && (
        <CreateSevaModal
          currentCity={selectedCity}
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleCreateDrive}
        />
      )}

      {isMatcherOpen && (
        <SmartMatcherModal
          drives={drives}
          volunteer={volunteer}
          currentCity={selectedCity}
          onClose={() => setIsMatcherOpen(false)}
          onOpenDriveDetails={(d) => {
            setIsMatcherOpen(false);
            setDetailModalDrive(d);
          }}
          onJoinDrive={handleJoinDrive}
        />
      )}

      {isSurplusModalOpen && (
        <FoodSurplusModal
          surplusItems={surplus}
          currentCity={selectedCity}
          onClose={() => setIsSurplusModalOpen(false)}
          onAddSurplus={handleAddSurplus}
          onClaimSurplus={handleClaimSurplus}
        />
      )}

      {isCertificateOpen && (
        <CertificateModal
          volunteer={volunteer}
          onClose={() => setIsCertificateOpen(false)}
        />
      )}

    </div>
  );
}
