import React, { useState } from 'react';
import { useItems } from '../context/ItemsContext';
import {
  X,
  MapPin,
  Calendar,
  Mail,
  Phone,
  User,
  ShieldCheck,
  CheckCircle2,
  Send,
  AlertCircle,
  HelpCircle,
  Share2,
} from 'lucide-react';

export const ItemDetailModal: React.FC = () => {
  const { selectedItemForModal, setSelectedItemForModal, toggleResolveItem, addToast } = useItems();
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryContact, setInquiryContact] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySent, setInquirySent] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!selectedItemForModal) return null;

  const item = selectedItemForModal;
  const isLost = item.type === 'lost';
  const isResolved = item.status === 'resolved';

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryContact.trim() || !inquiryMessage.trim()) {
      addToast({
        type: 'error',
        title: 'Missing information',
        message: 'Please fill in your name, contact email/phone, and your message.',
      });
      return;
    }

    setInquirySent(true);
    addToast({
      type: 'success',
      title: 'Inquiry Sent Successfully',
      message: `Your message has been dispatched to ${item.contactName}. They will reply via ${inquiryContact}.`,
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast({
      type: 'info',
      title: 'Link Copied',
      message: 'Item details link copied to clipboard.',
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden my-6 border border-slate-200 transition-all max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isResolved ? 'bg-slate-400' : isLost ? 'bg-amber-500' : 'bg-blue-600'
              }`}
            />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              {isResolved
                ? 'Item Reconnected'
                : isLost
                ? 'Lost Item Listing'
                : 'Found Item Listing'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
              title="Share listing"
              aria-label="Share listing"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedItemForModal(null)}
              className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          {/* Main Visual if present */}
          {item.imageUrl && !imageError ? (
            <div className="w-full h-64 sm:h-72 rounded-xl overflow-hidden bg-slate-100 relative border border-slate-200">
              <img
                src={item.imageUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-full h-36 rounded-xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center text-slate-400">
              <HelpCircle className="w-10 h-10 mb-1 text-slate-400" />
              <p className="text-xs text-slate-500">No photo uploaded by student</p>
            </div>
          )}

          {/* Title & Metadata */}
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
              <span className="font-semibold text-blue-700">{item.category}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Reported {item.date}</span>
              </span>
              {isResolved && (
                <>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="text-emerald-700 font-medium">Reunited</span>
                </>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              {item.title}
            </h2>

            <div className="mt-2.5 flex items-start gap-2 text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200/80">
              <MapPin className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <span className="font-medium text-slate-900">Location:</span> {item.location}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Description & Details
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-white p-3 rounded-lg border border-slate-100 shadow-2xs">
              {item.description}
            </p>
          </div>

          {/* Reported By Section */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center justify-between">
              <span>Contact Information</span>
              <span className="text-[11px] font-normal text-slate-500 lowercase">
                verified student listing
              </span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-slate-700">
                <User className="w-4 h-4 text-slate-400 shrink-0" />
                <div>
                  <div className="text-xs text-slate-500">Contact Name</div>
                  <div className="font-medium text-slate-900">{item.contactName}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-slate-700">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <div>
                  <div className="text-xs text-slate-500">Campus Email</div>
                  <a
                    href={`mailto:${item.contactEmail}`}
                    className="font-medium text-blue-600 hover:underline break-all"
                  >
                    {item.contactEmail}
                  </a>
                </div>
              </div>

              {item.contactPhone && (
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <div className="text-xs text-slate-500">Phone / Text</div>
                    <a
                      href={`tel:${item.contactPhone}`}
                      className="font-medium text-slate-900 hover:text-blue-600"
                    >
                      {item.contactPhone}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Send Message / Claim Form */}
          <div className="border border-slate-200 rounded-xl p-4 sm:p-5 bg-white">
            <h4 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
              <Send className="w-4 h-4 text-blue-600" />
              <span>
                {isLost ? `Send message to ${item.contactName.split(' ')[0]}` : `Claim this item from ${item.contactName.split(' ')[0]}`}
              </span>
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              {isLost
                ? 'Did you find this item or have any information? Send a secure note directly.'
                : 'Is this your missing belonging? Describe verifying details (serial number, lock code, unique marks) to claim it.'}
            </p>

            {inquirySent ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <h5 className="text-sm font-semibold text-emerald-900">Inquiry Delivered</h5>
                  <p className="text-xs text-emerald-700 mt-1">
                    Your message has been dispatched to {item.contactName}. They have received your notification and will reach out shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setInquirySent(false);
                      setInquiryMessage('');
                    }}
                    className="mt-2 text-xs font-semibold text-emerald-800 underline"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder="e.g. Maya Lin"
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Your Email or Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={inquiryContact}
                      onChange={(e) => setInquiryContact(e.target.value)}
                      placeholder="e.g. maya@campus.edu or phone"
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Your Message / Proof of Ownership <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    placeholder={
                      isLost
                        ? 'e.g. Hi! I saw this item turned into the library front desk this morning...'
                        : 'e.g. Hello, I believe this is mine! It has my student ID sticker on the backside...'
                    }
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="text-[11px] text-slate-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                    <span>Campus safety guidelines apply</span>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Campus Safety Reminder */}
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <span className="font-semibold">Campus Exchange Safety Tip:</span> Meet in open, well-lit campus spaces (Student Union, Main Library front desk, or Campus Police safe zones). Never pay or wire money to claim items.
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => toggleResolveItem(item.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border ${
              isResolved
                ? 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                : 'border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isResolved ? 'Mark as Not Reunited' : 'Mark as Reunited with Owner'}</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedItemForModal(null)}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
