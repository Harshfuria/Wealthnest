import React, { useState, useEffect, useRef } from 'react';
import {
  Video,
  Play,
  Download,
  Sparkles,
  Clapperboard,
  Monitor,
  Smartphone,
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  Film
} from 'lucide-react';

interface PresetPrompt {
  id: string;
  title: string;
  aspectRatio: '16:9' | '9:16';
  prompt: string;
  badge: string;
}

export const VeoVideoStudio: React.FC = () => {
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [prompt, setPrompt] = useState<string>(
    'A high-end corporate financial boardroom with digital holographic charts displaying invoice factoring and asset-based lending liquidity turning into growth capital.'
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressMessage, setProgressMessage] = useState('Initializing Veo 3 video engine...');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const pollIntervalRef = useRef<any>(null);
  const timerRef = useRef<any>(null);

  const presets: PresetPrompt[] = [
    {
      id: 'capital-16-9',
      title: 'Commercial Capital & ABL (16:9)',
      aspectRatio: '16:9',
      prompt:
        'A sleek corporate boardroom with digital holographic charts displaying invoice factoring and asset-based lending liquidity turning into growth capital.',
      badge: 'Executive Briefing',
    },
    {
      id: 'cfo-16-9',
      title: 'Virtual CFO Financial Runway (16:9)',
      aspectRatio: '16:9',
      prompt:
        'Cinematic modern financial analytics dashboard showing rolling 13-week cash projections, gross margin optimization, and runway forecasting with elegant motion.',
      badge: 'Board Presentation',
    },
    {
      id: 'tax-9-16',
      title: 'Corporate Tax & Nexus (9:16)',
      aspectRatio: '9:16',
      prompt:
        'Dynamic vertical motion reel highlighting audit-proof tax documentation, S-Corp K-1 schedules, and multi-state nexus compliance with clean minimalist typography.',
      badge: 'Mobile Story',
    },
    {
      id: 'collections-9-16',
      title: 'AR Collections & Recovery (9:16)',
      aspectRatio: '9:16',
      prompt:
        'A professional business workflow showing aging accounts receivable ledgers getting audited, reconciled, and settled with structured payment timelines.',
      badge: 'Mobile Explainer',
    },
  ];

  // Reassuring status messages for video generation
  const reassuringMessages = [
    'Initializing Google Veo 3 video synthesis engine...',
    'Interpreting financial prompt semantics and scene composition...',
    'Rendering frame-by-frame visual continuity and studio lighting...',
    'Simulating cinematic camera panning and depth of field...',
    'Synthesizing ultra-smooth motion vectors and textures...',
    'Encoding high-definition MP4 master video stream...',
    'Finalizing video render for download and playback...',
  ];

  useEffect(() => {
    if (isGenerating) {
      let step = 0;
      const messageInterval = setInterval(() => {
        step = (step + 1) % reassuringMessages.length;
        setProgressMessage(reassuringMessages[step]);
      }, 7000);

      const timer = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);

      timerRef.current = timer;

      return () => {
        clearInterval(messageInterval);
        clearInterval(timer);
      };
    } else {
      setElapsedSeconds(0);
    }
  }, [isGenerating]);

  // Clean up object URLs
  useEffect(() => {
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [videoUrl]);

  const handleApplyPreset = (preset: PresetPrompt) => {
    setAspectRatio(preset.aspectRatio);
    setPrompt(preset.prompt);
  };

  const handleGenerateVideo = async () => {
    if (!prompt.trim() || isGenerating) return;

    setErrorMsg(null);
    setIsGenerating(true);
    setProgressMessage('Submitting prompt to veo-3.1-fast-generate-preview...');

    try {
      // Step 1: Start video generation
      const startRes = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt.trim(),
          aspectRatio,
        }),
      });

      const startData = await startRes.json();

      if (!startRes.ok || startData.error) {
        throw new Error(startData.error || 'Failed to initiate video generation.');
      }

      const operationName = startData.operationName;
      if (!operationName) {
        throw new Error('No operation ID returned from video engine.');
      }

      // Step 2: Poll operation status every 5 seconds
      pollIntervalRef.current = setInterval(async () => {
        try {
          const statusRes = await fetch('/api/video-status', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ operationName }),
          });

          const statusData = await statusRes.json();

          if (statusData.error) {
            clearInterval(pollIntervalRef.current);
            setIsGenerating(false);
            setErrorMsg(`Generation halted: ${statusData.error}`);
            return;
          }

          if (statusData.done) {
            clearInterval(pollIntervalRef.current);
            setProgressMessage('Video render completed! Downloading MP4 stream...');

            // Step 3: Download generated video binary
            const downloadRes = await fetch('/api/video-download', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ operationName }),
            });

            if (!downloadRes.ok) {
              const errJson = await downloadRes.json().catch(() => ({}));
              throw new Error(errJson.error || 'Failed to download generated MP4 file.');
            }

            const videoBlob = await downloadRes.blob();
            const url = URL.createObjectURL(videoBlob);
            setVideoUrl(url);
            setIsGenerating(false);
          }
        } catch (pollErr: any) {
          console.error('Polling error:', pollErr);
          clearInterval(pollIntervalRef.current);
          setIsGenerating(false);
          setErrorMsg(pollErr.message || 'Error occurred while polling video status.');
        }
      }, 5000);

    } catch (err: any) {
      console.error(err);
      setIsGenerating(false);
      setErrorMsg(err.message || 'Could not start Veo 3 video generation.');
    }
  };

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainingSecs = sec % 60;
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  return (
    <section id="video-studio" className="py-20 md:py-28 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#1E3F35] tracking-wider uppercase">
            <Film className="w-4 h-4 text-[#1E3F35]" />
            <span>Google Veo 3 AI Video Generation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 [text-wrap:balance]">
            Client & Executive Video Briefing Studio
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Generate high-impact video explainers and boardroom visual briefings from text descriptions using the flagship <span className="text-[#1E3F35] font-mono text-xs font-semibold">veo-3.1-fast-generate-preview</span> model with landscape 16:9 and portrait 9:16 aspect ratios.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-[#F8FAF9] border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
            
            {/* Aspect Ratio Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block">
                1. Select Video Aspect Ratio (Required)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAspectRatio('16:9')}
                  className={`p-3.5 rounded-xl border flex items-center justify-center gap-3 transition-all ${
                    aspectRatio === '16:9'
                      ? 'bg-[#EBF4EE] border-[#1E3F35] text-[#1E3F35] shadow-xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  <Monitor className={`w-5 h-5 ${aspectRatio === '16:9' ? 'text-[#1E3F35]' : 'text-slate-400'}`} />
                  <div className="text-left">
                    <div className="text-xs font-bold">16:9 Landscape</div>
                    <div className="text-[10px] text-slate-500">Executive & Boardroom</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setAspectRatio('9:16')}
                  className={`p-3.5 rounded-xl border flex items-center justify-center gap-3 transition-all ${
                    aspectRatio === '9:16'
                      ? 'bg-[#EBF4EE] border-[#1E3F35] text-[#1E3F35] shadow-xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  <Smartphone className={`w-5 h-5 ${aspectRatio === '9:16' ? 'text-[#1E3F35]' : 'text-slate-400'}`} />
                  <div className="text-left">
                    <div className="text-xs font-bold">9:16 Portrait</div>
                    <div className="text-[10px] text-slate-500">Mobile Shorts & Reels</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Presets Grid */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span className="font-semibold uppercase tracking-wider text-slate-700">2. Financial Presets</span>
                <span>Click to auto-fill</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {presets.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleApplyPreset(preset)}
                    className="p-3 text-left rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#1E3F35]/40 transition-all flex flex-col justify-between space-y-1 shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-900">{preset.title}</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#EBF4EE] text-[#1E3F35] border border-[#D5E7DC]">
                        {preset.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-2">
                      {preset.prompt}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Textarea */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block">
                3. Video Script & Visual Prompt
              </label>
              <textarea
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the scenes, financial visuals, motion, lighting, and concepts..."
                className="w-full bg-white border border-slate-300 rounded-xl p-3.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E3F35] focus:ring-1 focus:ring-[#1E3F35] leading-relaxed"
                disabled={isGenerating}
              />
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>Model: <span className="font-mono text-[#1E3F35]">veo-3.1-fast-generate-preview</span></span>
                <span>Aspect: {aspectRatio} · Resolution: 720p</span>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Launch Action */}
            <button
              type="button"
              onClick={handleGenerateVideo}
              disabled={isGenerating || !prompt.trim()}
              className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                isGenerating || !prompt.trim()
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-[#1E3F35] hover:bg-[#163028] text-white shadow-sm'
              }`}
            >
              <Clapperboard className="w-4 h-4" />
              <span>
                {isGenerating ? `Generating Video (${formatTimer(elapsedSeconds)})...` : 'Generate Video with Veo 3'}
              </span>
            </button>

          </div>

          {/* Video Preview / Render Column */}
          <div className="lg:col-span-5 bg-[#F8FAF9] border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between min-h-[460px] shadow-xs">
            
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3F35]">
                  Veo 3 Playback Stage
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  {aspectRatio === '16:9' ? '16:9 Landscape' : '9:16 Portrait'}
                </span>
              </div>

              {/* State 1: Generating Loading Screen with reassuring messages */}
              {isGenerating && (
                <div className="p-8 rounded-xl bg-white border border-[#D5E7DC] flex flex-col items-center justify-center text-center space-y-4 my-6 shadow-xs">
                  <div className="relative">
                    <div className="w-14 h-14 border-3 border-slate-200 border-t-[#1E3F35] rounded-full animate-spin" />
                    <Sparkles className="w-5 h-5 text-[#1E3F35] absolute inset-0 m-auto animate-pulse" />
                  </div>

                  <div className="space-y-1">
                    <div className="text-sm font-bold text-slate-900">
                      Rendering HD Video
                    </div>
                    <p className="text-xs text-[#1E3F35] font-semibold animate-pulse">
                      {progressMessage}
                    </p>
                  </div>

                  <div className="font-mono text-xs text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                    Elapsed: {formatTimer(elapsedSeconds)}
                  </div>

                  <p className="text-[11px] text-slate-500 max-w-xs leading-relaxed">
                    Veo 3 synthesizes cinematic visuals, realistic lighting, and smooth motion trajectories. This process typically takes 1 to 2 minutes.
                  </p>
                </div>
              )}

              {/* State 2: Completed Video Player */}
              {videoUrl && !isGenerating && (
                <div className="space-y-4 my-2">
                  <div
                    className={`relative mx-auto rounded-xl overflow-hidden border border-slate-300 bg-black shadow-lg ${
                      aspectRatio === '16:9' ? 'w-full aspect-video' : 'w-[240px] aspect-[9/16]'
                    }`}
                  >
                    <video
                      src={videoUrl}
                      controls
                      autoPlay
                      loop
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                    <span className="flex items-center gap-1 text-[#1E3F35] font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Render Complete</span>
                    </span>
                    <span className="font-mono text-[11px]">veo-3.1-fast-generate-preview</span>
                  </div>
                </div>
              )}

              {/* State 3: Idle Placeholder */}
              {!videoUrl && !isGenerating && (
                <div className="p-8 rounded-xl bg-white border border-dashed border-slate-300 flex flex-col items-center justify-center text-center space-y-3 my-8">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400">
                    <Video className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-slate-800">
                      No Video Generated Yet
                    </div>
                    <p className="text-[11px] text-slate-500 max-w-xs">
                      Select an aspect ratio (16:9 or 9:16), choose a financial preset or enter custom prompt, and click generate.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            {videoUrl && !isGenerating && (
              <div className="pt-4 border-t border-slate-200 flex gap-2">
                <a
                  href={videoUrl}
                  download={`wealthnest-${aspectRatio === '16:9' ? 'landscape' : 'portrait'}-briefing.mp4`}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#1E3F35] hover:bg-[#163028] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Download MP4</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setVideoUrl(null);
                  }}
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs transition-colors"
                  title="Generate another"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
