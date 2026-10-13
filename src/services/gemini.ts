import { GoogleGenAI } from '@google/genai';
import { SevaDrive } from '../types';

export interface MatchRecommendation {
  recommendedDriveIds: string[];
  personalizedMessage: string;
  suggestedAction: string;
}

export async function matchVolunteerWithSeva(
  query: string,
  drives: SevaDrive[],
  city: string
): Promise<MatchRecommendation> {
  const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (typeof process !== 'undefined' ? (process as any).env?.GEMINI_API_KEY : '');

  // Prepare drives context
  const drivesContext = drives.map(d => ({
    id: d.id,
    title: d.title,
    category: d.category,
    city: d.city,
    locality: d.locality,
    date: d.date,
    time: d.time,
    skills: d.skillsRequired.join(', '),
    desc: d.shortDescription,
  }));

  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are "Seva Sathi", a thoughtful Indian community service advisor for SevaConnect.
A volunteer says: "${query}"
Their current city context: "${city}"

Here is the list of currently open Seva drives:
${JSON.stringify(drivesContext, null, 2)}

Select the top 1 to 3 best matching drives. Return ONLY valid JSON with this exact structure:
{
  "recommendedDriveIds": ["id1", "id2"],
  "personalizedMessage": "Warm 2-3 sentence explanation connecting their skills and schedule to the chosen causes.",
  "suggestedAction": "One clear action tip for their first drive."
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      if (response.text) {
        const parsed = JSON.parse(response.text);
        if (Array.isArray(parsed.recommendedDriveIds) && parsed.recommendedDriveIds.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Gemini matching failed or not configured, using smart keyword fallback:', err);
    }
  }

  // Fallback heuristic matcher based on keywords
  const lower = query.toLowerCase();
  const scored = drives.map(drive => {
    let score = 0;
    if (city !== 'All Cities' && drive.city.toLowerCase() === city.toLowerCase()) score += 10;
    if (lower.includes('teach') || lower.includes('education') || lower.includes('kid') || lower.includes('math') || lower.includes('study')) {
      if (drive.category === 'vidya') score += 15;
    }
    if (lower.includes('food') || lower.includes('meal') || lower.includes('feed') || lower.includes('cook') || lower.includes('langar') || lower.includes('hunger')) {
      if (drive.category === 'annapoorna') score += 15;
    }
    if (lower.includes('tree') || lower.includes('green') || lower.includes('clean') || lower.includes('plant') || lower.includes('nature') || lower.includes('lake') || lower.includes('environment')) {
      if (drive.category === 'prakriti') score += 15;
    }
    if (lower.includes('doctor') || lower.includes('health') || lower.includes('blood') || lower.includes('medical') || lower.includes('elderly') || lower.includes('hospital')) {
      if (drive.category === 'aarogya' || drive.category === 'samaj') score += 15;
    }
    if (lower.includes('dog') || lower.includes('animal') || lower.includes('cat') || lower.includes('rescue')) {
      if (drive.category === 'jeev') score += 15;
    }
    if (lower.includes('weekend') || lower.includes('sunday') || lower.includes('saturday')) {
      score += 5;
    }
    return { drive, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const topDrives = scored.slice(0, 2).map(s => s.drive);

  const matchedIds = topDrives.length > 0 ? topDrives.map(d => d.id) : [drives[0].id];
  const primaryDrive = topDrives[0] || drives[0];

  return {
    recommendedDriveIds: matchedIds,
    personalizedMessage: `Based on your passion and schedule, "${primaryDrive.title}" is an ideal opportunity! You will be making an immediate, tangible impact alongside like-minded volunteers.`,
    suggestedAction: `Check the venue and bring a water bottle. Coordinators will provide orientation at the start!`,
  };
}
