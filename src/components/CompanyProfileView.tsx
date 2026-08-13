import React, { useState } from 'react';
import { CompanyProfile, PastPerformanceItem, KeyPersonnelItem } from '../types';
import { DEMO_COMPANY_PROFILE } from '../data/demoData';
import { Building2, Save, Sparkles, Plus, Trash2, CheckCircle, ShieldAlert } from 'lucide-react';

interface CompanyProfileViewProps {
  profile: CompanyProfile;
  onSaveProfile: (profile: CompanyProfile) => void;
  onProceedToUpload?: () => void;
}

export const CompanyProfileView: React.FC<CompanyProfileViewProps> = ({
  profile: initialProfile,
  onSaveProfile,
  onProceedToUpload
}) => {
  const [profile, setProfile] = useState<CompanyProfile>(initialProfile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleInputChange = (field: keyof CompanyProfile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: keyof CompanyProfile, valueStr: string) => {
    const arr = valueStr.split('\n').filter(s => s.trim().length > 0);
    setProfile(prev => ({ ...prev, [field]: arr }));
  };

  const handleLoadSample = () => {
    setProfile(DEMO_COMPANY_PROFILE);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(profile);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Past Performance Handlers
  const addPastPerformance = () => {
    const newItem: PastPerformanceItem = {
      id: `pp-${Date.now()}`,
      clientName: '',
      projectTitle: '',
      contractValue: '',
      periodOfPerformance: '',
      relevance: '',
      keyResults: ''
    };
    setProfile(prev => ({ ...prev, pastPerformance: [...prev.pastPerformance, newItem] }));
  };

  const updatePastPerformance = (id: string, field: keyof PastPerformanceItem, value: string) => {
    setProfile(prev => ({
      ...prev,
      pastPerformance: prev.pastPerformance.map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const removePastPerformance = (id: string) => {
    setProfile(prev => ({
      ...prev,
      pastPerformance: prev.pastPerformance.filter(item => item.id !== id)
    }));
  };

  // Key Personnel Handlers
  const addKeyPersonnel = () => {
    const newItem: KeyPersonnelItem = {
      id: `kp-${Date.now()}`,
      name: '',
      role: '',
      yearsExperience: 5,
      securityClearance: 'None',
      certifications: [],
      bio: ''
    };
    setProfile(prev => ({ ...prev, keyPersonnel: [...prev.keyPersonnel, newItem] }));
  };

  const updateKeyPersonnel = (id: string, field: keyof KeyPersonnelItem, value: any) => {
    setProfile(prev => ({
      ...prev,
      keyPersonnel: prev.keyPersonnel.map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const removeKeyPersonnel = (id: string) => {
    setProfile(prev => ({
      ...prev,
      keyPersonnel: prev.keyPersonnel.filter(item => item.id !== id)
    }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-slate-800">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-6 h-6 text-teal-700" />
            <h1 className="text-2xl font-bold text-slate-900">Company Profile</h1>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            BidPilot AI uses this profile to calculate opportunity fit, evaluate clearances, and ground proposal drafts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleLoadSample}
            className="px-3.5 py-2 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold border border-teal-200 flex items-center gap-2 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>Load Sample Profile (Apex Tech)</span>
          </button>

          {onProceedToUpload && (
            <button
              type="button"
              onClick={onProceedToUpload}
              className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-colors"
            >
              Proceed to Upload RFP →
            </button>
          )}
        </div>
      </div>

      {savedSuccess && (
        <div className="mb-6 p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <span>Company Profile saved successfully! BidPilot AI will ground proposal drafts in this profile.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            1. Core Company Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Company Name *</label>
              <input
                type="text"
                required
                value={profile.companyName}
                onChange={e => handleInputChange('companyName', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-teal-500 focus:outline-none"
                placeholder="e.g. Acme Tech Solutions Inc."
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Industry / Sector</label>
              <input
                type="text"
                value={profile.industry}
                onChange={e => handleInputChange('industry', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-teal-500 focus:outline-none"
                placeholder="e.g. IT & Federal Contracting"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Years in Business</label>
              <input
                type="number"
                value={profile.yearsInBusiness}
                onChange={e => handleInputChange('yearsInBusiness', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Country</label>
              <input
                type="text"
                value={profile.country}
                onChange={e => handleInputChange('country', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Headquarters Location</label>
              <input
                type="text"
                value={profile.headquarters}
                onChange={e => handleInputChange('headquarters', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-teal-500 focus:outline-none"
                placeholder="e.g. Arlington, VA"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Company Size</label>
              <input
                type="text"
                value={profile.companySize}
                onChange={e => handleInputChange('companySize', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-teal-500 focus:outline-none"
                placeholder="e.g. 50-100 employees"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block font-bold text-slate-700 mb-1">Company Overview & Mission Description</label>
            <textarea
              rows={3}
              value={profile.companyDescription}
              onChange={e => handleInputChange('companyDescription', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-teal-500 focus:outline-none"
              placeholder="Describe what your company does, core focus areas, and history..."
            />
          </div>
        </div>

        {/* Capabilities, Certifications & Clearances */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            2. Capabilities, Certifications & Clearances
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Core Capabilities (1 per line)</label>
              <textarea
                rows={4}
                value={(profile.coreCapabilities || []).join('\n')}
                onChange={e => handleArrayChange('coreCapabilities', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-teal-500 focus:outline-none font-mono text-xs"
                placeholder="Cloud Architecture & Migration&#10;Zero Trust Cybersecurity&#10;Real-time Data Analytics"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Products & Services (1 per line)</label>
              <textarea
                rows={4}
                value={(profile.productsAndServices || []).join('\n')}
                onChange={e => handleArrayChange('productsAndServices', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-teal-500 focus:outline-none font-mono text-xs"
                placeholder="GovCloud Suite&#10;CyberShield Monitoring&#10;Consulting Services"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Certifications & Accreditations (1 per line)</label>
              <textarea
                rows={3}
                value={(profile.certifications || []).join('\n')}
                onChange={e => handleArrayChange('certifications', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-teal-500 focus:outline-none font-mono text-xs"
                placeholder="ISO 27001:2022&#10;CMMI Services Level 3&#10;SBA 8(a) Certified"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Facility & Personnel Security Clearances (1 per line)</label>
              <textarea
                rows={3}
                value={(profile.securityClearances || []).join('\n')}
                onChange={e => handleArrayChange('securityClearances', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-teal-500 focus:outline-none font-mono text-xs"
                placeholder="Facility Security Clearance (FSC): Top Secret / Secret&#10;Secret Cleared Engineers"
              />
            </div>
          </div>
        </div>

        {/* Past Performance */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">
              3. Past Performance & Relevant Projects
            </h2>
            <button
              type="button"
              onClick={addPastPerformance}
              className="px-3 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Contract Record</span>
            </button>
          </div>

          <div className="space-y-4">
            {(profile.pastPerformance || []).map((pp, idx) => (
              <div key={pp.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-3 relative">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span>Contract Record #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => removePastPerformance(pp.id)}
                    className="text-rose-600 hover:text-rose-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-600 mb-1 font-semibold">Client Name / Agency</label>
                    <input
                      type="text"
                      value={pp.clientName}
                      onChange={e => updatePastPerformance(pp.id, 'clientName', e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white"
                      placeholder="e.g. US Department of Transportation"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 mb-1 font-semibold">Project Title</label>
                    <input
                      type="text"
                      value={pp.projectTitle}
                      onChange={e => updatePastPerformance(pp.id, 'projectTitle', e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white"
                      placeholder="e.g. Cloud Telemetry Analytics Engine"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-600 mb-1 font-semibold">Contract Value</label>
                      <input
                        type="text"
                        value={pp.contractValue}
                        onChange={e => updatePastPerformance(pp.id, 'contractValue', e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white"
                        placeholder="$2.5M"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 mb-1 font-semibold">Period</label>
                      <input
                        type="text"
                        value={pp.periodOfPerformance}
                        onChange={e => updatePastPerformance(pp.id, 'periodOfPerformance', e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white"
                        placeholder="2022-2024"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 mb-1 font-semibold">Scope & Technical Relevance</label>
                    <input
                      type="text"
                      value={pp.relevance}
                      onChange={e => updatePastPerformance(pp.id, 'relevance', e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white"
                      placeholder="Deployed multi-cloud Zero Trust architecture..."
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1 font-semibold">Key Quantifiable Results</label>
                    <input
                      type="text"
                      value={pp.keyResults}
                      onChange={e => updatePastPerformance(pp.id, 'keyResults', e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white"
                      placeholder="Reduced operational costs by 28%, 99.99% uptime..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Personnel */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">
              4. Key Personnel & Proposed Team Leads
            </h2>
            <button
              type="button"
              onClick={addKeyPersonnel}
              className="px-3 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Person</span>
            </button>
          </div>

          <div className="space-y-4">
            {(profile.keyPersonnel || []).map((kp, idx) => (
              <div key={kp.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-3">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span>Key Person #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeKeyPersonnel(kp.id)}
                    className="text-rose-600 hover:text-rose-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-slate-600 mb-1 font-semibold">Full Name & Degrees</label>
                    <input
                      type="text"
                      value={kp.name}
                      onChange={e => updateKeyPersonnel(kp.id, 'name', e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white"
                      placeholder="Dr. Marcus Vance, PhD"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 mb-1 font-semibold">Proposed Role</label>
                    <input
                      type="text"
                      value={kp.role}
                      onChange={e => updateKeyPersonnel(kp.id, 'role', e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white"
                      placeholder="Program Manager"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 mb-1 font-semibold">Years Experience</label>
                    <input
                      type="number"
                      value={kp.yearsExperience}
                      onChange={e => updateKeyPersonnel(kp.id, 'yearsExperience', parseInt(e.target.value) || 0)}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 mb-1 font-semibold">Clearance Level</label>
                    <input
                      type="text"
                      value={kp.securityClearance || ''}
                      onChange={e => updateKeyPersonnel(kp.id, 'securityClearance', e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white"
                      placeholder="Top Secret / Secret"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 mb-1 font-semibold">Summary Bio & Notable Achievements</label>
                  <input
                    type="text"
                    value={kp.bio}
                    onChange={e => updateKeyPersonnel(kp.id, 'bio', e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white"
                    placeholder="18 years managing federal DoD/DHS cloud programs..."
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Proposal Preferences & Contact */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 text-xs">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            5. Proposal Preferences & Contact Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Preferred Proposal Writing Tone</label>
              <select
                value={profile.preferredProposalTone}
                onChange={e => handleInputChange('preferredProposalTone', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-teal-500 focus:outline-none bg-white"
              >
                <option value="Formal Government">Formal Government / Federal</option>
                <option value="Executive">Executive / Strategic</option>
                <option value="Technical">Technical / Engineering Rigorous</option>
                <option value="Persuasive">Persuasive / Value-Driven</option>
                <option value="Professional">Professional Enterprise</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Target Proposal Budget Range</label>
              <input
                type="text"
                value={profile.estimatedProposalBudget}
                onChange={e => handleInputChange('estimatedProposalBudget', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-teal-500 focus:outline-none"
                placeholder="$1,000,000 - $5,000,000"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Contact Person Name</label>
              <input
                type="text"
                value={profile.contactName}
                onChange={e => handleInputChange('contactName', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-teal-500 focus:outline-none"
                placeholder="Sarah Jenkins, VP Proposals"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Contact Email</label>
              <input
                type="email"
                value={profile.contactEmail}
                onChange={e => handleInputChange('contactEmail', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-teal-500 focus:outline-none"
                placeholder="proposals@acme.com"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Contact Phone</label>
              <input
                type="text"
                value={profile.contactPhone}
                onChange={e => handleInputChange('contactPhone', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-teal-500 focus:outline-none"
                placeholder="+1 (703) 555-0100"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-4">
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-md flex items-center gap-2 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Company Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
};
