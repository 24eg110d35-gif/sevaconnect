import React from 'react';
import { X, Printer, Download, Award, ShieldCheck, HeartHandshake, CheckCircle } from 'lucide-react';
import { VolunteerProfile } from '../types';

interface CertificateModalProps {
  volunteer: VolunteerProfile;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  volunteer,
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const certificateId = `SEVA-IND-2026-${volunteer.name.replace(/\s+/g, '').substring(0, 4).toUpperCase()}-9942`;
  const issuedDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl relative my-6">
        
        {/* Top Controls Bar (hidden during print) */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6 print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-600" />
            <h2 className="text-sm font-bold text-neutral-900">Official SevaConnect Certificate of Appreciation</h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-black text-white text-xs font-bold rounded-lg shadow-xs cursor-pointer transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* The Printable Certificate Container */}
        <div className="relative border-8 border-double border-amber-600/60 p-8 sm:p-10 bg-gradient-to-b from-[#FFFDF9] to-[#FAF7EE] text-neutral-900 rounded-xl shadow-inner font-serif select-none overflow-hidden">
          
          {/* Subtle Watermark Emblem Background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-4 pointer-events-none">
            <div className="w-96 h-96 rounded-full border-12 border-amber-800 flex items-center justify-center text-8xl font-black">
              सेवा
            </div>
          </div>

          {/* Certificate Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-sans font-bold tracking-widest text-amber-800 uppercase bg-amber-100/70 border border-amber-300 px-3 py-1 rounded-full">
              <span>॥ सेवा परमो धर्मः ॥</span>
            </div>

            <div className="text-xs uppercase tracking-widest text-neutral-500 font-sans font-semibold mt-2">
              SevaConnect National Volunteer Initiative • India
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide text-neutral-900 uppercase pt-1">
              Certificate of Appreciation
            </h1>
            <p className="text-xs italic text-amber-900 font-sans">
              For Exemplary & Selfless Dedication to Community Welfare
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center my-6 gap-2">
            <div className="h-px bg-amber-400 w-24" />
            <div className="w-2.5 h-2.5 bg-amber-600 rotate-45" />
            <div className="h-px bg-amber-400 w-24" />
          </div>

          {/* Recipient Details */}
          <div className="text-center space-y-3 font-sans">
            <p className="text-xs uppercase tracking-wider text-neutral-500">
              This is proudly conferred upon
            </p>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 border-b border-stone-300 pb-2 inline-block px-8 font-serif">
              {volunteer.name}
            </h2>

            <p className="text-xs sm:text-sm text-neutral-700 max-w-xl mx-auto leading-relaxed pt-2">
              In grateful acknowledgment of successfully completing{' '}
              <strong className="text-amber-900 font-bold">{volunteer.totalHours} Verified Hours</strong> of selfless community service across education mentoring, food security, and environmental restoration in partnership with verified NGO partners.
            </p>
          </div>

          {/* Certificate Verification Details & Seals */}
          <div className="mt-10 pt-6 border-t border-amber-200/80 grid grid-cols-3 gap-4 items-end text-center font-sans text-xs">
            {/* Left Signature */}
            <div>
              <div className="font-serif italic text-base text-neutral-800 mb-1">
                Prof. K. Venkateshwar
              </div>
              <div className="w-28 h-px bg-neutral-400 mx-auto mb-1" />
              <div className="text-[10px] font-bold text-neutral-700">Dean / Youth Coordinator</div>
              <div className="text-[9px] text-neutral-500">Anurag University NSS Wing</div>
            </div>

            {/* Center Official Gold Seal */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border-4 border-amber-600 bg-amber-50 flex flex-col items-center justify-center shadow-xs text-amber-800">
                <ShieldCheck className="w-6 h-6 text-amber-700" />
                <span className="text-[8px] font-bold tracking-tighter uppercase">Verified</span>
              </div>
              <div className="text-[9px] text-neutral-500 font-mono mt-1.5 font-bold">
                ID: {certificateId}
              </div>
            </div>

            {/* Right Signature */}
            <div>
              <div className="font-serif italic text-base text-neutral-800 mb-1">
                Rajiv S. Deshmukh
              </div>
              <div className="w-28 h-px bg-neutral-400 mx-auto mb-1" />
              <div className="text-[10px] font-bold text-neutral-700">Director of Partnerships</div>
              <div className="text-[9px] text-neutral-500">SevaConnect India Foundation</div>
            </div>
          </div>

          {/* Footer Timestamp */}
          <div className="mt-6 text-center text-[10px] text-neutral-400 font-sans">
            Date of Issue: {issuedDate} • Verified under Central NGO Darpan Protocol • Free Digital Credential
          </div>
        </div>

      </div>
    </div>
  );
};
