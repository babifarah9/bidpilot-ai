import React, { useState } from 'react';
import { CompanyProfile } from '../../types';
import { DEMO_COMPANY_PROFILE } from '../../data/demoData';
import { Building2, Save, RotateCcw, CheckCircle, Plus, Trash2 } from 'lucide-react';

type Props = {
  companyProfile: CompanyProfile;
  onSaveProfile: (profile: CompanyProfile) => void;
};

export const CompanyProfileView: React.FC<Props> = ({ companyProfile, onSaveProfile }) => {
  const [profile, setProfile] = useState<CompanyProfile>(companyProfile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(profile);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleLoadSample = () => {
    setProfile(DEMO_COMPANY_PROFILE);
    onSaveProfile(DEMO_COMPANY_PROFILE);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-teal-700 text-xs font-semibold uppercase tracking-wider mb-1">
            <Building2 className="w-4 h-4" />
            <span>Offeror Identity</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Company Profile</h1>
          <p className="text-sm text-slate-600 mt-1">
            BidPilot AI matches these corporate facts against opportunity requirements to calculate fit scores and draft proposals without inventing credentials.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleLoadSample}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-300 transition flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Load Sample Profile</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-sm flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <span>Company profile updated and saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100">1. Basic Corporate Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Company Name *</label>
              <input
                type="text"
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={profile.companyName}
                onChange={(e) => setProfile({ ...profile, companyName: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Industry *</label>
              <input
                type="text"
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={profile.industry}
                onChange={(e) => setProfile({ ...profile, industry: e.target.value })}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Company Description *</label>
              <textarea
                rows={3}
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={profile.companyDescription}
                onChange={(e) => setProfile({ ...profile, companyDescription: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Country</label>
              <input
                type="text"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={profile.country}
                onChange={(e) => setProfile({ ...profile, country: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Headquarters</label>
              <input
                type="text"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={profile.headquarters}
                onChange={(e) => setProfile({ ...profile, headquarters: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Company Size</label>
              <input
                type="text"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={profile.companySize}
                onChange={(e) => setProfile({ ...profile, companySize: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Years in Business</label>
              <input
                type="number"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={profile.yearsInBusiness}
                onChange={(e) => setProfile({ ...profile, yearsInBusiness: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>
        </div>

        {/* Capabilities & Certifications */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100">2. Capabilities & Certifications</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Core Capabilities (Comma Separated)
              </label>
              <textarea
                rows={3}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={profile.coreCapabilities.join(', ')}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    coreCapabilities: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                  })
                }
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Products & Services (Comma Separated)
              </label>
              <textarea
                rows={3}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={profile.productsAndServices.join(', ')}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    productsAndServices: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                  })
                }
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Certifications (Comma Separated)
              </label>
              <input
                type="text"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={profile.certifications.join(', ')}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    certifications: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                  })
                }
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Security Clearances
              </label>
              <input
                type="text"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={profile.securityClearances.join(', ')}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    securityClearances: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* Past Performance */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900">3. Past Performance</h2>
            <button
              type="button"
              onClick={() =>
                setProfile({
                  ...profile,
                  pastPerformance: [
                    ...profile.pastPerformance,
                    { client: '', projectTitle: '', contractValue: '', duration: '', description: '', relevance: '' }
                  ]
                })
              }
              className="px-3 py-1.5 bg-teal-50 text-teal-700 hover:bg-teal-100 text-xs font-semibold rounded-lg transition flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Contract Citation</span>
            </button>
          </div>

          <div className="space-y-4">
            {profile.pastPerformance.map((item, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 relative">
                <button
                  type="button"
                  onClick={() =>
                    setProfile({
                      ...profile,
                      pastPerformance: profile.pastPerformance.filter((_, i) => i !== idx)
                    })
                  }
                  className="absolute top-3 right-3 text-slate-400 hover:text-rose-600 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 uppercase">Client Agency</label>
                    <input
                      type="text"
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                      value={item.client}
                      onChange={(e) => {
                        const updated = [...profile.pastPerformance];
                        updated[idx].client = e.target.value;
                        setProfile({ ...profile, pastPerformance: updated });
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 uppercase">Project Title</label>
                    <input
                      type="text"
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                      value={item.projectTitle}
                      onChange={(e) => {
                        const updated = [...profile.pastPerformance];
                        updated[idx].projectTitle = e.target.value;
                        setProfile({ ...profile, pastPerformance: updated });
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 uppercase">Contract Value</label>
                    <input
                      type="text"
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                      value={item.contractValue}
                      onChange={(e) => {
                        const updated = [...profile.pastPerformance];
                        updated[idx].contractValue = e.target.value;
                        setProfile({ ...profile, pastPerformance: updated });
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 uppercase">Duration</label>
                    <input
                      type="text"
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                      value={item.duration}
                      onChange={(e) => {
                        const updated = [...profile.pastPerformance];
                        updated[idx].duration = e.target.value;
                        setProfile({ ...profile, pastPerformance: updated });
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-600 uppercase">Description & Scope</label>
                  <textarea
                    rows={2}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                    value={item.description}
                    onChange={(e) => {
                      const updated = [...profile.pastPerformance];
                      updated[idx].description = e.target.value;
                      setProfile({ ...profile, pastPerformance: updated });
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tone & Contact */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100">4. Proposal Preferences & Contact</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Preferred Proposal Tone</label>
              <select
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={profile.preferredProposalTone}
                onChange={(e) => setProfile({ ...profile, preferredProposalTone: e.target.value as any })}
              >
                <option value="Executive">Executive</option>
                <option value="Technical">Technical</option>
                <option value="Professional">Professional</option>
                <option value="Persuasive">Persuasive</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Contact Email</label>
              <input
                type="email"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={profile.contactInformation.email}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    contactInformation: { ...profile.contactInformation, email: e.target.value }
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-8 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm rounded-xl transition shadow-lg flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Company Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
};
