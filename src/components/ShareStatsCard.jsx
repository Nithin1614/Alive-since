import React, { useRef, useState } from 'react';
import { formatNumber } from '../utils/timeCalculations';
import html2canvas from 'html2canvas';
import confetti from 'canvas-confetti';
import { Share2, Copy, Download, Check } from 'lucide-react';

export const ShareStatsCard = ({ stats }) => {
  const cardRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [downloading, setDownloading] = useState(false);

  if (!stats) return null;

  const shareTitle = "Alive Since — Your life, measured in time";
  
  // Format share text without any emojis or symbols, with clear line breaks
  const shareText = 
`ALIVE SINCE STATS

Seconds Alive: ${formatNumber(stats.totalSeconds)} seconds
Days Alive: ${formatNumber(stats.totalDays)} days
Total Heartbeats: ${formatNumber(stats.heartbeats)} heartbeats
Total Breaths: ${formatNumber(stats.breaths)} breaths

Measure your life in time:`;

  const handleCopyText = () => {
    const fullTextToCopy = `${shareText}\n${window.location.href}`;
    navigator.clipboard.writeText(fullTextToCopy);
    setCopied(true);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
    setTimeout(() => setCopied(false), 3000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          handleCopyText();
        }
      }
    } else {
      // Fallback if Web Share API is unavailable
      handleCopyText();
      setShared(true);
      setTimeout(() => setShared(false), 3000);
    }
  };

  // Dedicated HTML5 Canvas 2D image generator for 100% reliable crisp image downloads
  const generateCanvasImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#0d0d0d';
    ctx.fillRect(0, 0, 1200, 630);

    // Subtle border
    ctx.strokeStyle = '#24221e';
    ctx.lineWidth = 4;
    ctx.strokeRect(40, 40, 1120, 550);

    // Label: ALIVE SINCE
    ctx.fillStyle = '#8a8377';
    ctx.font = '500 20px Inter, sans-serif';
    ctx.letterSpacing = '6px';
    ctx.fillText('ALIVE SINCE — YOU HAVE BEEN ALIVE FOR', 80, 110);

    // Main Big Seconds Number
    ctx.fillStyle = '#e2d9c8';
    ctx.font = '400 95px "DM Serif Display", Georgia, serif';
    ctx.fillText(formatNumber(stats.totalSeconds), 80, 230);

    // Sub-label: SECONDS (Proper vertical spacing below number)
    ctx.fillStyle = '#c4a47c';
    ctx.font = '600 22px Inter, sans-serif';
    ctx.letterSpacing = '8px';
    ctx.fillText('SECONDS', 80, 310);

    // Divider Line
    ctx.strokeStyle = '#24221e';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(80, 370);
    ctx.lineTo(1120, 370);
    ctx.stroke();

    // Bottom Stats Summary
    ctx.fillStyle = '#8a8377';
    ctx.font = '400 24px Inter, sans-serif';
    ctx.letterSpacing = '1px';
    
    const statsLine = `${formatNumber(stats.totalDays)} DAYS   •   ${formatNumber(stats.heartbeats)} HEARTBEATS   •   ${formatNumber(stats.breaths)} BREATHS`;
    ctx.fillText(statsLine, 80, 450);

    // Branding at bottom right
    ctx.fillStyle = '#c4a47c';
    ctx.font = '500 22px Inter, sans-serif';
    ctx.letterSpacing = '4px';
    ctx.fillText('ALIVESINCE.COM', 850, 530);

    return canvas.toDataURL('image/png');
  };

  const handleDownloadImage = async () => {
    setDownloading(true);
    try {
      let imageUri;
      if (cardRef.current) {
        try {
          const canvas = await html2canvas(cardRef.current, {
            backgroundColor: '#0d0d0d',
            scale: 2,
            logging: false,
            useCORS: true
          });
          imageUri = canvas.toDataURL('image/png');
        } catch (e) {
          console.warn('html2canvas fallback to Canvas2D renderer', e);
          imageUri = generateCanvasImage();
        }
      } else {
        imageUri = generateCanvasImage();
      }

      const link = document.createElement('a');
      link.href = imageUri;
      link.download = `alive-since-${stats.totalSeconds}-seconds.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Download failed, using fallback canvas', err);
      const fallbackUri = generateCanvasImage();
      const link = document.createElement('a');
      link.href = fallbackUri;
      link.download = `alive-since-stats.png`;
      link.click();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="mt-20 sm:mt-24">
      <p className="text-[var(--muted)] text-xs tracking-[0.3em] uppercase mb-8 font-medium">
        Share your stats
      </p>

      {/* Stylized Share Card */}
      <div 
        ref={cardRef} 
        style={{ backgroundColor: '#0d0d0d', color: '#e2d9c8' }}
        className="p-8 sm:p-12 border border-[var(--border)] rounded-xl relative overflow-hidden shadow-2xl"
      >
        <p className="text-[#8a8377] text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-4 font-medium">
          You have been alive for
        </p>

        <h3 className="font-display text-4xl sm:text-7xl font-normal text-[#e2d9c8] tracking-tight leading-normal my-3 sm:my-4">
          {formatNumber(stats.totalSeconds)}
        </h3>

        <p className="text-[#c4a47c] text-[11px] sm:text-xs tracking-[0.35em] uppercase mt-2 mb-8 font-semibold">
          Seconds
        </p>

        <div className="pt-6 border-t border-[#24221e] flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#8a8377]">
          <span><strong className="text-[#e2d9c8] font-medium">{formatNumber(stats.totalDays)}</strong> days</span>
          <span>•</span>
          <span><strong className="text-[#e2d9c8] font-medium">{formatNumber(stats.heartbeats)}</strong> heartbeats</span>
          <span>•</span>
          <span><strong className="text-[#e2d9c8] font-medium">{formatNumber(stats.breaths)}</strong> breaths</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
        <button
          onClick={handleCopyText}
          className="py-3 px-4 border border-[var(--gold)] text-[var(--text)] text-xs font-semibold tracking-widest uppercase hover:bg-[var(--gold)] hover:text-black transition-all duration-200 cursor-pointer rounded-lg text-center flex items-center justify-center gap-2"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-400" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Text</span>
            </>
          )}
        </button>

        <button
          onClick={handleShare}
          className="py-3 px-4 border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] text-xs font-semibold tracking-widest uppercase hover:border-[var(--text)] transition-all duration-200 cursor-pointer rounded-lg text-center flex items-center justify-center gap-2"
        >
          <Share2 className="w-4 h-4" />
          <span>{shared ? 'Link Shared!' : 'Share'}</span>
        </button>

        <button
          onClick={handleDownloadImage}
          disabled={downloading}
          className="py-3 px-4 border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] text-xs font-semibold tracking-widest uppercase hover:border-[var(--text)] transition-all duration-200 cursor-pointer rounded-lg text-center flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          <span>{downloading ? 'Generating...' : 'Download Image'}</span>
        </button>
      </div>
    </div>
  );
};
