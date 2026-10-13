import { SevaDrive, UrgentNeed, VolunteerProfile, SevaBadge, CommunityStory, SurplusDonation } from '../types';
import {
  INITIAL_DRIVES,
  INITIAL_URGENT_NEEDS,
  INITIAL_VOLUNTEER,
  INITIAL_BADGES,
  INITIAL_STORIES,
  INITIAL_SURPLUS,
} from '../data/mockData';

const STORAGE_KEYS = {
  DRIVES: 'sevaconnect_drives_v1',
  URGENT: 'sevaconnect_urgent_v1',
  VOLUNTEER: 'sevaconnect_volunteer_v1',
  BADGES: 'sevaconnect_badges_v1',
  STORIES: 'sevaconnect_stories_v1',
  SURPLUS: 'sevaconnect_surplus_v1',
};

export const getStoredDrives = (): SevaDrive[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DRIVES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.DRIVES, JSON.stringify(INITIAL_DRIVES));
      return INITIAL_DRIVES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_DRIVES;
  }
};

export const saveDrives = (drives: SevaDrive[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.DRIVES, JSON.stringify(drives));
  } catch (err) {
    console.error('Failed to save drives to localStorage', err);
  }
};

export const getStoredUrgentNeeds = (): UrgentNeed[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.URGENT);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.URGENT, JSON.stringify(INITIAL_URGENT_NEEDS));
      return INITIAL_URGENT_NEEDS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_URGENT_NEEDS;
  }
};

export const saveUrgentNeeds = (urgent: UrgentNeed[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.URGENT, JSON.stringify(urgent));
  } catch (err) {
    console.error('Failed to save urgent needs', err);
  }
};

export const getStoredVolunteer = (): VolunteerProfile => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.VOLUNTEER);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.VOLUNTEER, JSON.stringify(INITIAL_VOLUNTEER));
      return INITIAL_VOLUNTEER;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_VOLUNTEER;
  }
};

export const saveVolunteer = (vol: VolunteerProfile): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.VOLUNTEER, JSON.stringify(vol));
  } catch (err) {
    console.error('Failed to save volunteer profile', err);
  }
};

export const getStoredBadges = (): SevaBadge[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BADGES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.BADGES, JSON.stringify(INITIAL_BADGES));
      return INITIAL_BADGES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_BADGES;
  }
};

export const saveBadges = (badges: SevaBadge[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.BADGES, JSON.stringify(badges));
  } catch (err) {
    console.error('Failed to save badges', err);
  }
};

export const getStoredStories = (): CommunityStory[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STORIES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.STORIES, JSON.stringify(INITIAL_STORIES));
      return INITIAL_STORIES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_STORIES;
  }
};

export const saveStories = (stories: CommunityStory[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.STORIES, JSON.stringify(stories));
  } catch (err) {
    console.error('Failed to save stories', err);
  }
};

export const getStoredSurplus = (): SurplusDonation[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SURPLUS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.SURPLUS, JSON.stringify(INITIAL_SURPLUS));
      return INITIAL_SURPLUS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_SURPLUS;
  }
};

export const saveSurplus = (items: SurplusDonation[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.SURPLUS, JSON.stringify(items));
  } catch (err) {
    console.error('Failed to save surplus', err);
  }
};
