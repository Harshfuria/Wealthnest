import React, { useState } from 'react';
import {
  MapPin,
  Search,
  Navigation,
  ExternalLink,
  Building2,
  Landmark,
  Scale,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  Compass,
  Star
} from 'lucide-react';

interface GroundingChunk {
  maps?: {
    uri?: string;
    title?: string;
    placeAnswerSources?: {
      reviewSnippets?: Array<{
        reviewText?: string;
        uri?: string;
        reviewerName?: string;
      }>;
    };
  };
  web?: {
    uri?: string;
    title?: string;
  };
}

export const MapsGroundingLocator: React.FC = () => {
  const [locationInput, setLocationInput] = useState('New York, NY');
  const [category, setCategory] = useState<string>('irs');
  const [isLoading, setIsLoading] = useState(false);
  const [resultText, setResultText] = useState<string | null>(null);
  const [groundingChunks, setGroundingChunks] = useState<GroundingChunk[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);

  const categories = [
    {
      id: 'irs',
      label: 'IRS Assistance Centers',
      icon: Landmark,
      queryTemplate: 'Find official IRS Taxpayer Assistance Centers and federal tax filing offices in or near ',
    },
    {
      id: 'lenders',
      label: 'Commercial & ABL Lenders',
      icon: Scale,
      queryTemplate: 'Find commercial banking centers, asset-based lenders (ABL), and business loan offices in or near ',
    },
    {
      id: 'sba',
      label: 'SBA & Business Centers',
      icon: Building2,
      queryTemplate: 'Find SBA (Small Business Administration) district offices, SCORE mentoring, and economic development centers in or near ',
    },
    {
      id: 'notary',
      label: 'Notary & Escrow Services',
      icon: FileCheck,
      queryTemplate: 'Find certified public notary, financial document signing, and commercial escrow offices near ',
    },
  ];

  const handleFetchNearby = async (cityOrZip?: string, coords?: { lat: number; lng: number }) => {
    const loc = cityOrZip || locationInput.trim();
    if (!loc && !coords) return;

    setIsLoading(true);
    setErrorMsg(null);

    const activeCat = categories.find((c) => c.id === category) || categories[0];
    const fullQuery = coords
      ? `${activeCat.queryTemplate} my current geographical coordinates (${coords.lat}, ${coords.lng}). List exact street addresses, operating hours, and official Google Maps places.`
      : `${activeCat.queryTemplate} ${loc}. List exact street addresses, operating hours, and official Google Maps places.`;

    try {
      const response = await fetch('/api/maps-grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: fullQuery,
          lat: coords?.lat,
          lng: coords?.lng,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to retrieve location data via Google Maps grounding.');
      }

      setResultText(data.text);
      setGroundingChunks(data.groundingChunks || []);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Error executing Google Maps grounding search.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseGeolocation = () => {
    if (!navigator.geolocation) {
      setErrorMsg('Geolocation is not supported by your browser.');
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserCoords(coords);
        setLocationInput(`GPS: ${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`);
        handleFetchNearby(undefined, coords);
      },
      (err) => {
        setIsLoading(false);
        setErrorMsg('Unable to retrieve location. Please type a city or zip code manually.');
      }
    );
  };

  // Extract all valid map links
  const mapPlaces = groundingChunks.filter((chunk) => chunk.maps && chunk.maps.uri);

  return (
    <section id="locator" className="py-20 md:py-28 bg-[#F8FAF9] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#1E3F35] tracking-wider uppercase">
            <Compass className="w-4 h-4 text-[#1E3F35]" />
            <span>Google Maps Grounded Intelligence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 [text-wrap:balance]">
            Locate Financial Centers, IRS Offices & Certified Lending Partners
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Directly grounded in real-time Google Maps place data via <span className="text-[#1E3F35] font-mono text-xs font-semibold">gemini-3.5-flash</span>. Discover verified regional IRS Taxpayer Assistance Centers, commercial lenders, and business financial facilities.
          </p>
        </div>

        {/* Interactive Search Console */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
          
          {/* Category selection tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = category === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                    isSelected
                      ? 'bg-[#EBF4EE] border-[#1E3F35] text-[#1E3F35] font-semibold shadow-xs'
                      : 'bg-[#F8FAF9] border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-[#1E3F35]' : 'text-slate-400'}`} />
                  <div>
                    <div className="text-xs font-semibold">{cat.label}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Search bar & Geolocation action */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <MapPin className="w-4 h-4 text-[#1E3F35] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                placeholder="Enter City, State, or Zip Code (e.g., Dallas, TX or 10001)..."
                className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E3F35] focus:ring-1 focus:ring-[#1E3F35]"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleUseGeolocation}
                title="Use current geolocation"
                className="px-3.5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-[#1E3F35]" />
                <span className="hidden md:inline">Use Location</span>
              </button>

              <button
                type="button"
                onClick={() => handleFetchNearby()}
                disabled={isLoading}
                className="px-5 py-3 rounded-xl bg-[#1E3F35] hover:bg-[#163028] text-white text-xs font-bold flex items-center gap-2 transition-colors shadow-sm whitespace-nowrap"
              >
                <Search className="w-4 h-4 text-white" />
                <span>{isLoading ? 'Locating Places...' : 'Search Places'}</span>
              </button>
            </div>
          </div>

          {/* Quick Location Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-500">
            <span className="text-[11px] text-slate-500">Popular Hubs:</span>
            {['New York, NY', 'Dallas, TX', 'Los Angeles, CA', 'Miami, FL', 'Chicago, IL', 'Atlanta, GA'].map((city) => (
              <button
                key={city}
                onClick={() => {
                  setLocationInput(city);
                  handleFetchNearby(city);
                }}
                className="px-2.5 py-1 rounded-md bg-[#F8FAF9] hover:bg-slate-100 border border-slate-200 text-[11px] text-slate-600 hover:text-slate-900 transition-colors"
              >
                {city}
              </button>
            ))}
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Loading state indicator */}
          {isLoading && (
            <div className="p-8 rounded-xl bg-[#F8FAF9] border border-slate-200 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-8 h-8 border-2 border-[#1E3F35] border-t-transparent rounded-full animate-spin" />
              <div className="text-xs text-slate-700 font-medium">
                Querying Google Maps API with <span className="font-mono text-[#1E3F35]">gemini-3.5-flash</span>...
              </div>
              <p className="text-[11px] text-slate-500 max-w-sm">
                Retrieving live coordinates, place URIs, and operating details from Google Maps database.
              </p>
            </div>
          )}

          {/* Results Display */}
          {resultText && !isLoading && (
            <div className="space-y-6 pt-4 border-t border-slate-200">
              
              {/* Synthesized overview */}
              <div className="p-5 rounded-xl bg-[#F8FAF9] border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1E3F35] uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3F35]" />
                  <span>Google Maps Grounded Synthesis</span>
                </div>
                <div className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
                  {resultText}
                </div>
              </div>

              {/* Verified Place Cards with required clickable Google Maps links */}
              {mapPlaces.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#1E3F35]" />
                      <span>Verified Google Maps Place Links ({mapPlaces.length})</span>
                    </h4>
                    <span className="text-[11px] text-slate-500 font-mono">
                      Real-time Grounding Chunks
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mapPlaces.map((chunk, idx) => {
                      const place = chunk.maps!;
                      const reviewSnippets = place.placeAnswerSources?.reviewSnippets || [];

                      return (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-white border border-slate-200 hover:border-[#1E3F35]/50 transition-all flex flex-col justify-between space-y-3 shadow-xs"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-1.5">
                              <h5 className="text-sm font-bold text-slate-900 tracking-tight">
                                {place.title || `Place Reference #${idx + 1}`}
                              </h5>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#EBF4EE] text-[#1E3F35] border border-[#D5E7DC] font-mono font-medium">
                                Verified
                              </span>
                            </div>

                            {/* Review snippets if present */}
                            {reviewSnippets.length > 0 && (
                              <div className="space-y-2 mt-2 pt-2 border-t border-slate-100">
                                {reviewSnippets.map((snippet, sIdx) => (
                                  <div key={sIdx} className="text-[11px] text-slate-700 italic bg-[#F8FAF9] p-2 rounded border border-slate-200 flex items-start gap-1.5">
                                    <Star className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
                                    <span>
                                      "{snippet.reviewText}"
                                      {snippet.reviewerName && <span className="text-slate-500 font-normal ml-1">— {snippet.reviewerName}</span>}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Direct clickable Google Maps link as required by Skill */}
                          {place.uri && (
                            <a
                              href={place.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-between w-full p-2.5 rounded-lg bg-[#EBF4EE] hover:bg-[#D5E7DC] text-[#1E3F35] border border-[#D5E7DC] text-xs font-semibold transition-colors"
                            >
                              <span className="flex items-center gap-1.5">
                                <Navigation className="w-3.5 h-3.5" />
                                <span>Open Location on Google Maps</span>
                              </span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
