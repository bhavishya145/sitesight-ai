import React from 'react';
import { AlertCircle, ShieldCheck } from 'lucide-react';

interface HumanVerificationBannerProps {
  compact?: boolean;
  className?: string;
}

export const HumanVerificationBanner: React.FC<HumanVerificationBannerProps> = ({
  compact = false,
  className = '',
}) => {
  if (compact) {
    return (
      <div
        className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-md bg-[#101A2C]/5 border border-[#101A2C]/10 text-slate-700 ${className}`}
        role="note"
      >
        <ShieldCheck className="w-4 h-4 text-[#36C6B0] shrink-0" />
        <span className="font-medium">Engineering Protocol:</span>
        <span className="text-slate-600">
          AI stage assessments are automated estimates based on 2D images and require physical verification by a qualified engineer.
        </span>
      </div>
    );
  }

  return (
    <div
      className={`rounded-lg p-3.5 bg-amber-50/90 border border-amber-200/80 text-amber-950 flex items-start gap-3 text-xs leading-relaxed ${className}`}
      role="region"
      aria-label="Engineering Verification Advisory"
    >
      <AlertCircle className="w-4 h-4 text-[#FF8A32] shrink-0 mt-0.5" />
      <div>
        <span className="font-bold text-amber-900 block mb-0.5">
          Advisory Assessment Notice · Human Verification Required
        </span>
        <p className="text-amber-800">
          All construction stages, activities, and materials detected by SiteSight AI are model-derived visual estimates. They do not evaluate subsurface conditions, concrete compressive strengths, or concealed MEP installations. Certified progress sign-offs must be executed by the appointed site project engineer.
        </p>
      </div>
    </div>
  );
};
