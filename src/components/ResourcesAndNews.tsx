import React, { useState } from 'react';
import { RECENT_NEWS, RESOURCE_GUIDES, TAX_DEADLINES, NewsArticle, ResourceGuide } from '../data/resourcesData';
import { CONTACT_INFO } from '../data/servicesData';
import { Newspaper, BookOpen, Calendar, ArrowRight, X, MessageSquare, Download, CheckCircle2, AlertCircle, FileText } from 'lucide-react';

interface ResourcesAndNewsProps {
  onOpenBooking: () => void;
  onPreFillContact: (message: string) => void;
}

export const ResourcesAndNews: React.FC<ResourcesAndNewsProps> = ({
  onOpenBooking,
  onPreFillContact,
}) => {
  const [activeTab, setActiveTab] = useState<'news' | 'guides' | 'calendar'>('news');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownload = (guide: ResourceGuide) => {
    setDownloadSuccess(guide.title);
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  const handleInquireAboutArticle = (article: NewsArticle) => {
    const text = `Hi Wealthnest Advisory, I read your bulletin regarding "${article.title}" and would like to understand its implications for my business.`;
    const url = `${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="resources" className="py-20 md:py-28 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="text-xs font-semibold text-[#1E3F35] tracking-wider uppercase">
            05. Resource Center & Regulatory Newsroom
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 [text-wrap:balance]">
            Timely Tax Advisories, Regulatory Updates & Practical Guides
          </h2>
          <p className="text-base text-slate-600">
            Stay ahead of IRS policy shifts, FinCEN transparency rules, multi-state nexus rulings, and executive cash management strategies curated by our senior advisors.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-2 mb-10 border-b border-slate-200 pb-4">
          <button
            onClick={() => setActiveTab('news')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'news'
                ? 'bg-[#1E3F35] text-white shadow-sm'
                : 'bg-[#F8FAF9] text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <Newspaper className="w-3.5 h-3.5" />
            <span>Recent Regulatory News & Tax Bulletins</span>
          </button>

          <button
            onClick={() => setActiveTab('guides')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'guides'
                ? 'bg-[#1E3F35] text-white shadow-sm'
                : 'bg-[#F8FAF9] text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Executive Playbooks & Downloadable Checklists</span>
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'calendar'
                ? 'bg-[#1E3F35] text-white shadow-sm'
                : 'bg-[#F8FAF9] text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Federal & State Compliance Deadlines</span>
          </button>
        </div>

        {/* TAB 1: RECENT NEWS & TAX BULLETINS */}
        {activeTab === 'news' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RECENT_NEWS.map((article) => (
              <div
                key={article.id}
                className="flex flex-col justify-between rounded-2xl bg-[#F8FAF9] border border-slate-200 p-6 sm:p-8 hover:border-slate-300 hover:shadow-sm transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3 pb-3 border-b border-slate-200">
                    <span className="font-mono text-[#1E3F35] font-bold">
                      {article.category}
                    </span>
                    <span className="text-slate-500">
                      {article.publishedDate} · {article.readTime}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-slate-500 block mb-1">
                    Authority: {article.sourceAuthority}
                  </span>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#1E3F35] transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
                    {article.summary}
                  </p>

                  <div className="p-3 rounded-lg bg-white border border-slate-200 mb-6">
                    <span className="text-[11px] font-bold text-[#1E3F35] uppercase tracking-wider block mb-1">
                      Action Item for Businesses:
                    </span>
                    <p className="text-xs text-slate-700">
                      {article.actionItem}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedArticle(article)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3F35] hover:text-[#163028] transition-colors"
                  >
                    <span>Read Advisory Analysis</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleInquireAboutArticle(article)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#1E3F35]" />
                    <span>WhatsApp Inquiry</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: DOWNLOADABLE PLAYBOOKS & CHECKLISTS */}
        {activeTab === 'guides' && (
          <div className="space-y-6">
            {downloadSuccess && (
              <div className="p-4 rounded-xl bg-[#EBF4EE] border border-[#D5E7DC] text-[#1E3F35] text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3F35] shrink-0" />
                  <span>
                    Successfully downloaded <strong className="text-slate-900">{downloadSuccess}</strong>. Our advisory team is available if you need help executing these steps.
                  </span>
                </div>
                <button
                  onClick={() => setDownloadSuccess(null)}
                  className="text-slate-500 hover:text-slate-700 text-xs font-semibold"
                >
                  Dismiss
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {RESOURCE_GUIDES.map((guide) => (
                <div
                  key={guide.id}
                  className="flex flex-col justify-between rounded-2xl bg-[#F8FAF9] border border-slate-200 p-6 sm:p-7 hover:border-slate-300 hover:shadow-sm transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-3 pb-3 border-b border-slate-200">
                      <span className="text-[#1E3F35] font-mono font-bold">
                        {guide.category}
                      </span>
                      <span className="text-slate-500 text-[11px] font-mono">
                        {guide.fileFormat}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {guide.title}
                    </h3>

                    <p className="text-xs text-slate-600 mb-5 leading-relaxed">
                      {guide.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
                        Included In This Toolkit:
                      </span>
                      {guide.keyTakeaways.map((point, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#1E3F35] shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <button
                      onClick={() => handleDownload(guide)}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-[#1E3F35] rounded-lg hover:bg-[#163028] transition-colors shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Resource Toolkit</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: TAX & COMPLIANCE DEADLINES CALENDAR */}
        {activeTab === 'calendar' && (
          <div className="rounded-2xl bg-[#F8FAF9] border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h3 className="text-xl font-bold text-slate-900">Annual Tax & Filing Calendar</h3>
              <p className="text-xs text-slate-500 mt-1">
                Mark these statutory milestones on your operating calendar to prevent automated IRS and state late filing penalties.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {TAX_DEADLINES.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-white border border-slate-200 flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-sm font-bold text-[#1E3F35]">
                        {item.date}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                          item.urgency === 'critical'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {item.urgency.toUpperCase()}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 mb-1.5">{item.title}</h4>
                    <p className="text-xs text-slate-600 mb-3">{item.applicableTo}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-500">
                    Required: {item.formNumber}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-[#EBF4EE]/70 border border-[#D5E7DC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#1E3F35] shrink-0" />
                <span>Need extension filings or penalty abatement representation for overdue returns?</span>
              </div>
              <button
                onClick={onOpenBooking}
                className="text-[#1E3F35] font-semibold hover:underline whitespace-nowrap"
              >
                Schedule Immediate Compliance Review →
              </button>
            </div>
          </div>
        )}

      </div>

      {/* ARTICLE READER MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 right-5 p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Close article modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-slate-500 pb-3 border-b border-slate-100">
                <span className="text-[#1E3F35] font-mono font-bold">
                  {selectedArticle.category}
                </span>
                <span aria-hidden="true">·</span>
                <span>{selectedArticle.publishedDate}</span>
                <span aria-hidden="true">·</span>
                <span>Source: {selectedArticle.sourceAuthority}</span>
              </div>

              <h2 className="text-2xl font-bold text-slate-900">
                {selectedArticle.title}
              </h2>

              <div className="p-3.5 rounded-xl bg-[#EBF4EE] border border-[#D5E7DC] text-xs text-slate-800 space-y-1">
                <span className="text-[#1E3F35] font-bold uppercase tracking-wider block">
                  Key Action Item:
                </span>
                <p>{selectedArticle.actionItem}</p>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed pt-2">
                {selectedArticle.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-500">
                  Have questions about this ruling?
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => handleInquireAboutArticle(selectedArticle)}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#1E3F35] rounded-lg hover:bg-[#163028]"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-white" />
                    <span>Inquire via WhatsApp</span>
                  </button>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="px-4 py-2 text-xs text-slate-500 hover:text-slate-800"
                  >
                    Close
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
