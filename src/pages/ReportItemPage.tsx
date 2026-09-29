import React, { useState, useEffect } from 'react';
import { useItems } from '../context/ItemsContext';
import { ItemType, ItemCategory, CampusItem } from '../types';
import { CATEGORIES, CAMPUS_LOCATIONS } from '../data/sampleItems';
import {
  Upload,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  SearchCheck,
  Calendar,
  MapPin,
  Tag,
  User,
  Mail,
  Phone,
  ArrowRight,
  Sparkles,
  Camera,
  X,
} from 'lucide-react';

export const ReportItemPage: React.FC = () => {
  const { addItem, reportInitialType, setCurrentPage, setSelectedItemForModal } = useItems();

  const [type, setType] = useState<ItemType>(reportInitialType);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ItemCategory>('Electronics');
  const [description, setDescription] = useState('');
  const [locationPreset, setLocationPreset] = useState(CAMPUS_LOCATIONS[0]);
  const [locationCustom, setLocationCustom] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string>('');

  const [submittedItem, setSubmittedItem] = useState<CampusItem | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setType(reportInitialType);
  }, [reportInitialType]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, photo: 'File size must be under 5MB.' }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        setErrors((prev) => {
          const next = { ...prev };
          delete next.photo;
          return next;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = 'Item name is required.';
    } else if (title.trim().length < 3) {
      newErrors.title = 'Item name must be at least 3 characters.';
    }

    if (!category) {
      newErrors.category = 'Please choose a category.';
    }

    if (!description.trim()) {
      newErrors.description = 'Please provide a short description with identifying marks.';
    } else if (description.trim().length < 10) {
      newErrors.description = 'Please provide a bit more detail (at least 10 characters).';
    }

    const finalLocation = locationPreset === 'Other Campus Location' ? locationCustom : locationPreset;
    if (!finalLocation.trim()) {
      newErrors.location = 'Campus location is required.';
    }

    if (!date) {
      newErrors.date = 'Date is required.';
    }

    if (!contactName.trim()) {
      newErrors.contactName = 'Your name is required.';
    }

    if (!contactEmail.trim()) {
      newErrors.contactEmail = 'Your email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail.trim())) {
      newErrors.contactEmail = 'Please provide a valid email format (e.g. name@campus.edu).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const finalLocation =
      locationPreset === 'Other Campus Location' && locationCustom.trim()
        ? locationCustom.trim()
        : locationCustom.trim()
        ? `${locationPreset} (${locationCustom.trim()})`
        : locationPreset;

    const newItem = addItem({
      type,
      title: title.trim(),
      category,
      location: finalLocation,
      date,
      description: description.trim(),
      imageUrl: photoPreview || undefined,
      contactName: contactName.trim(),
      contactEmail: contactEmail.trim().toLowerCase(),
      contactPhone: contactPhone.trim() || undefined,
    });

    setSubmittedItem(newItem);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetForm = () => {
    setSubmittedItem(null);
    setTitle('');
    setDescription('');
    setLocationCustom('');
    setPhotoPreview('');
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {submittedItem ? (
        /* Submission Success Screen */
        <div className="bg-white rounded-2xl border border-emerald-200 p-8 sm:p-12 text-center shadow-lg space-y-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Published Successfully to CampusFind</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {submittedItem.type === 'lost' ? 'Lost Item Reported' : 'Found Item Reported!'}
            </h2>
            <p className="text-sm text-slate-600 max-w-lg mx-auto">
              Your report for <span className="font-semibold text-slate-900">"{submittedItem.title}"</span> is now active. College students can view it and reach out to you directly.
            </p>
          </div>

          {/* Quick Summary Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-left max-w-md mx-auto space-y-2 text-xs text-slate-700">
            <div className="flex justify-between">
              <span className="text-slate-500">Category:</span>
              <span className="font-semibold text-slate-900">{submittedItem.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Location:</span>
              <span className="font-semibold text-slate-900">{submittedItem.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Date:</span>
              <span className="font-semibold text-slate-900">{submittedItem.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Contact:</span>
              <span className="font-semibold text-slate-900">{submittedItem.contactName} ({submittedItem.contactEmail})</span>
            </div>
          </div>

          {/* Post Actions */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                setSelectedItemForModal(submittedItem);
              }}
              className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>View Full Listing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                setCurrentPage(submittedItem.type === 'lost' ? 'lost' : 'found');
              }}
              className="w-full sm:w-auto px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-lg text-xs font-semibold transition-colors"
            >
              Go to {submittedItem.type === 'lost' ? 'Lost Items' : 'Found Items'} Page
            </button>

            <button
              onClick={handleResetForm}
              className="w-full sm:w-auto px-5 py-2.5 text-blue-600 hover:text-blue-800 text-xs font-semibold underline"
            >
              Report Another Item
            </button>
          </div>
        </div>
      ) : (
        /* Report Form */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
              <span>Campus Reporting Form</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Report an Item
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Provide as much detail as possible to help identify the item and reconnect it safely with its owner.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Select Lost or Found */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                1. What are you reporting? <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3 max-w-md">
                <button
                  type="button"
                  onClick={() => setType('lost')}
                  className={`p-3.5 rounded-xl border text-left transition-all flex items-center gap-3 ${
                    type === 'lost'
                      ? 'border-blue-600 bg-blue-50/80 text-blue-900 ring-2 ring-blue-600/20 font-semibold'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      type === 'lost' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">I Lost Something</div>
                    <div className="text-[11px] text-slate-500 font-normal">Missing belonging</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setType('found')}
                  className={`p-3.5 rounded-xl border text-left transition-all flex items-center gap-3 ${
                    type === 'found'
                      ? 'border-blue-600 bg-blue-50/80 text-blue-900 ring-2 ring-blue-600/20 font-semibold'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      type === 'found' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <SearchCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">I Found Something</div>
                    <div className="text-[11px] text-slate-500 font-normal">Recovered on campus</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Step 2: Item Name & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Item Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. MacBook Air M2, Black Leather Wallet, Dorm Keys"
                  className={`w-full text-xs sm:text-sm px-3.5 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    errors.title ? 'border-red-300 bg-red-50/30' : 'border-slate-300'
                  }`}
                />
                {errors.title && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.title}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Category <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ItemCategory)}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Location & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Campus Location {type === 'lost' ? 'Lost' : 'Found'}</span> <span className="text-red-500">*</span>
                </label>
                <select
                  value={locationPreset}
                  onChange={(e) => setLocationPreset(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 mb-2"
                >
                  {CAMPUS_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  value={locationCustom}
                  onChange={(e) => setLocationCustom(e.target.value)}
                  placeholder="Specific room or area (e.g. 2nd floor silent study room, chair 14)"
                  className="w-full text-xs px-3.5 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Date {type === 'lost' ? 'Lost' : 'Found'}</span> <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            {/* Step 4: Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Detailed Description <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Include color, brand, stickers, scratches, case design, or any identifying marks. For laptops or phones, do not post full serial numbers publicly."
                className={`w-full text-xs sm:text-sm p-3.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  errors.description ? 'border-red-300 bg-red-50/30' : 'border-slate-300'
                }`}
              />
              {errors.description && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.description}</span>
                </p>
              )}
            </div>

            {/* Step 5: Upload Photo */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Upload Photo (Optional)
              </label>
              {photoPreview ? (
                <div className="relative w-48 h-36 rounded-lg overflow-hidden border border-slate-300 group">
                  <img
                    src={photoPreview}
                    alt="Uploaded preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setPhotoPreview('')}
                    className="absolute top-2 right-2 p-1 bg-slate-900/70 hover:bg-slate-900 text-white rounded-md transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="border-2 border-dashed border-slate-300 hover:border-blue-400 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-blue-50/30">
                  <Camera className="w-8 h-8 text-slate-400 mb-2" />
                  <span className="text-xs font-semibold text-slate-700">Click to upload an item image</span>
                  <span className="text-[11px] text-slate-400 mt-0.5">PNG, JPG, or WEBP up to 5MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              )}
              {errors.photo && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.photo}</span>
                </p>
              )}
            </div>

            {/* Step 6: Contact Information */}
            <div className="pt-4 border-t border-slate-200">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                Your Contact Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
                    <User className="w-3 h-3 text-slate-400" />
                    <span>Your Full Name</span> <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Jordan Miller"
                    className={`w-full text-xs px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                      errors.contactName ? 'border-red-300' : 'border-slate-300'
                    }`}
                  />
                  {errors.contactName && (
                    <p className="mt-1 text-[11px] text-red-600">{errors.contactName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
                    <Mail className="w-3 h-3 text-slate-400" />
                    <span>Campus Email</span> <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="e.g. j.miller@campus.edu"
                    className={`w-full text-xs px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                      errors.contactEmail ? 'border-red-300' : 'border-slate-300'
                    }`}
                  />
                  {errors.contactEmail && (
                    <p className="mt-1 text-[11px] text-red-600">{errors.contactEmail}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-slate-400" />
                    <span>Phone Number (Optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="(555) 000-0000"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Fields marked with <span className="text-red-500">*</span> are required.
              </span>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-sm transition-colors"
              >
                <span>Submit {type === 'lost' ? 'Lost Item' : 'Found Item'} Report</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
