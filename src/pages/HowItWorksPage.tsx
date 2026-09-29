import React, { useState } from 'react';
import { useItems } from '../context/ItemsContext';
import {
  FileText,
  Search,
  MessageCircle,
  ShieldCheck,
  Building2,
  ChevronDown,
  ChevronUp,
  Clock,
  Phone,
  AlertTriangle,
  Lock,
  Sparkles,
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const { openReportModalWithType, setCurrentPage } = useItems();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How do I prove an item belongs to me without giving away answers?',
      a: 'When contacting a finder, mention specific non-public details: the lockscreen wallpaper photo, unique stickers on a laptop, initials written on an inside label, or recent notifications. Never publicly post serial numbers or passwords on the open board.',
    },
    {
      q: 'What should I do if I lost my university Dorm Key or Student ID card?',
      a: 'First, check CampusFind under "Found Items" and filter by "Keys" or "ID & Cards". Second, immediately report the missing card to Campus Card Services to temporarily freeze building access and meal plan funds. If not found within 24 hours, Housing can issue a temporary room key.',
    },
    {
      q: 'Where are the physical safe drop-off desks on campus?',
      a: 'There are three official physical drop-off desks: The Student Union 1st floor information desk, the Main Library circulation desk, and Campus Public Safety dispatch. Finders can drop high-value items there for secure storage.',
    },
    {
      q: 'Is CampusFind free for all students, staff, and faculty?',
      a: 'Yes, 100% free and open to everyone in the university community. No accounts or credit cards are ever required.',
    },
    {
      q: 'What happens once an item is returned?',
      a: 'The student who posted the report can click "Mark as Reunited" on their item card. This updates the listing status to let the community know the item was successfully reconnected.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider px-3 py-1 bg-blue-50 rounded-full border border-blue-200">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Simple Campus Recovery Protocol</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          How CampusFind Works
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Reconnecting students with their lost items in 3 easy, secure steps.
        </p>
      </div>

      {/* 3 Main Steps Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {/* Step 1 */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs relative flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-extrabold text-lg flex items-center justify-center shadow-xs">
              1
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Report the Lost or Found Item
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Submit a quick 60-second report. Detail the item name, campus building or room, approximate date and time, and identifying marks. You can optionally upload a photo.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-blue-700">
            <FileText className="w-4 h-4" />
            <span>Instant live publication</span>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs relative flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-extrabold text-lg flex items-center justify-center shadow-xs">
              2
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Search for a Matching Item
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Use real-time search filters to look for items matching your description. Filter by campus hall, category (Electronics, Keys, IDs, Bags), and date reported.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-blue-700">
            <Search className="w-4 h-4" />
            <span>Live keyword matching</span>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs relative flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-extrabold text-lg flex items-center justify-center shadow-xs">
              3
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Contact & Return or Collect
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Click the Contact / Claim button to send a verified message. Arrange a safe pickup at a campus desk or meet in a busy university commons area during daylight.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-700">
            <MessageCircle className="w-4 h-4" />
            <span>Direct student-to-student handover</span>
          </div>
        </div>
      </div>

      {/* Safety Guidelines Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 shadow-lg">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-blue-300 text-xs font-semibold border border-slate-700">
            <ShieldCheck className="w-4 h-4" />
            <span>Campus Safety & Security Guidelines</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Best Practices for Returning & Claiming Items
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-sm text-white">
                <Building2 className="w-4 h-4 text-blue-400" />
                <span>Meet in Public Campus Spaces</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Always arrange exchanges at the Student Union atrium, Library front desk, or dining hall during regular operating hours.
              </p>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-sm text-white">
                <Lock className="w-4 h-4 text-blue-400" />
                <span>Verify Legitimate Ownership</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ask claimants to describe identifying characteristics not visible in photos (e.g. unlocking phone passcode, showing campus ID).
              </p>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-sm text-white">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Never Pay or Wire Money</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                CampusFind is a community service. Never pay fees, rewards, or shipping money before inspecting your recovered item in person.
              </p>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-sm text-white">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>Utilize Official Custody Desks</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                If schedules do not align, hand the item to the Campus Library or Student Union service desk and notify the owner to pick it up there.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Official Campus Desks Directory */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Designated Campus Drop-off Desks
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Physical locations that accept and safely log lost and found items.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-3">
            <div className="text-xs font-bold text-blue-700 uppercase tracking-wider">Desk 1</div>
            <h4 className="text-base font-bold text-slate-900">Student Union Information Desk</h4>
            <p className="text-xs text-slate-600">
              Located on the 1st Floor Central Lobby beside the Welcome Lounge.
            </p>
            <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 space-y-1">
              <div>Hours: Mon–Fri 8:00 AM – 9:00 PM</div>
              <div>Phone: (555) 012-3401</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-3">
            <div className="text-xs font-bold text-blue-700 uppercase tracking-wider">Desk 2</div>
            <h4 className="text-base font-bold text-slate-900">Main Library Circulation Desk</h4>
            <p className="text-xs text-slate-600">
              Ground floor main entrance. Ideal for books, chargers, tech accessories, and student IDs.
            </p>
            <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 space-y-1">
              <div>Hours: 24/7 during academic terms</div>
              <div>Phone: (555) 012-3402</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-3">
            <div className="text-xs font-bold text-blue-700 uppercase tracking-wider">Desk 3</div>
            <h4 className="text-base font-bold text-slate-900">Campus Safety Office</h4>
            <p className="text-xs text-slate-600">
              Campus Security Headquarters (East Gate Building). Accepts wallets, keys, and high-value tech.
            </p>
            <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 space-y-1">
              <div>Hours: 24/7 Security Dispatch</div>
              <div>Phone: (555) 019-9000</div>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions (FAQ) */}
      <div className="space-y-6 max-w-3xl mx-auto">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Common questions from college students about campus lost and found policies.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-semibold text-slate-900 hover:text-blue-600 text-sm"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Call to Action Bar */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center space-y-4 max-w-2xl mx-auto">
        <h3 className="text-xl font-bold text-slate-900">
          Ready to report or search for an item?
        </h3>
        <p className="text-xs sm:text-sm text-slate-600">
          Join thousands of classmates helping each other safeguard personal belongings.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => openReportModalWithType('lost')}
            className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors"
          >
            I Lost Something
          </button>
          <button
            onClick={() => openReportModalWithType('found')}
            className="w-full sm:w-auto px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-900 rounded-lg text-xs font-bold transition-colors"
          >
            I Found Something
          </button>
          <button
            onClick={() => setCurrentPage('search')}
            className="w-full sm:w-auto px-5 py-2.5 text-blue-700 hover:text-blue-900 text-xs font-bold underline"
          >
            Search Catalog
          </button>
        </div>
      </div>
    </div>
  );
};
