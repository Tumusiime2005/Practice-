import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Check, Sparkles, AlertCircle, Copy, Code, Eye, HelpCircle } from 'lucide-react';
import { Challenge } from '../types/dashboard';
import { sounds } from '../utils/audio';

interface HtmlCssSandboxProps {
  challenges: Challenge[];
  onChallengePassed: (challenge: Challenge, xp: number) => void;
}

export const HtmlCssSandbox: React.FC<HtmlCssSandboxProps> = ({
  challenges,
  onChallengePassed,
}) => {
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>(challenges[0]?.id || '');
  const currentChallenge = challenges.find((c) => c.id === selectedChallengeId) || challenges[0];

  const [htmlCode, setHtmlCode] = useState(currentChallenge?.starterHtml || '');
  const [cssCode, setCssCode] = useState(currentChallenge?.starterCss || '');
  const [activeTab, setActiveTab] = useState<'both' | 'html' | 'css'>('both');
  const [copied, setCopied] = useState(false);
  const [testResults, setTestResults] = useState<{ id: string; passed: boolean; desc: string }[]>([]);
  const [tested, setTested] = useState(false);
  const [showHints, setShowHints] = useState(false);

  // Sync code when challenge changes
  useEffect(() => {
    if (currentChallenge) {
      setHtmlCode(currentChallenge.starterHtml);
      setCssCode(currentChallenge.starterCss);
      setTestResults([]);
      setTested(false);
      setShowHints(false);
    }
  }, [selectedChallengeId]);

  // Construct iframe srcDoc with sanitized styling
  const srcDoc = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            background-color: #0b0f19;
            color: #f1f5f9;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            padding: 16px;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          ${cssCode}
        </style>
      </head>
      <body>
        ${htmlCode}
      </body>
    </html>
  `;

  const handleReset = () => {
    if (currentChallenge) {
      setHtmlCode(currentChallenge.starterHtml);
      setCssCode(currentChallenge.starterCss);
      setTested(false);
      setTestResults([]);
      sounds.playClick();
    }
  };

  const handleRunTests = () => {
    if (!currentChallenge) return;
    const results = currentChallenge.testRules.map((rule) => ({
      id: rule.id,
      passed: rule.check(htmlCode, cssCode),
      desc: rule.description,
    }));

    setTestResults(results);
    setTested(true);

    const allPassed = results.every((r) => r.passed);
    if (allPassed) {
      sounds.playSuccess();
      onChallengePassed(currentChallenge, 150);
    } else {
      sounds.playAlert();
    }
  };

  const handleCopyCode = () => {
    const combined = `<!-- HTML -->\n${htmlCode}\n\n/* CSS */\n${cssCode}`;
    navigator.clipboard.writeText(combined);
    setCopied(true);
    sounds.playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  const allPassed = tested && testResults.length > 0 && testResults.every((r) => r.passed);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/95 overflow-hidden shadow-xl">
      {/* Sandbox Header */}
      <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-violet-950 border border-violet-500/30 text-violet-400">
              <Code className="w-4 h-4" />
            </span>
            <h2 className="text-base font-bold text-white tracking-tight">
              Live HTML & CSS Practice Sandbox
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Pick a challenge, tweak HTML & CSS in real-time, and run live verification tests with your friends.
          </p>
        </div>

        {/* Challenge selector segmented control */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
          {challenges.map((c) => {
            const isSelected = c.id === selectedChallengeId;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedChallengeId(c.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? c.accentColor === 'green'
                      ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 shadow-sm'
                      : c.accentColor === 'red'
                      ? 'bg-rose-950/90 text-rose-300 border border-rose-500/50 shadow-sm'
                      : 'bg-violet-950/90 text-violet-300 border border-violet-500/50 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <span>{c.title.split(' ')[0]}</span>
                <span className="hidden sm:inline">{c.title.split(' ').slice(1).join(' ')}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Instructions & Goal Banner */}
      <div className="px-5 py-3.5 bg-slate-950/40 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <span className="font-semibold text-white">Target Goal:</span>
          <span>{currentChallenge.instructions}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowHints(!showHints)}
            className="text-violet-400 hover:text-violet-300 flex items-center gap-1 cursor-pointer font-medium"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            {showHints ? 'Hide Hints' : 'View Hints'}
          </button>
          <span className="text-slate-600">|</span>
          <button
            onClick={handleCopyCode}
            className="text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer font-medium"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
        </div>
      </div>

      {/* Expandable Hints */}
      {showHints && (
        <div className="px-5 py-3 bg-violet-950/20 border-b border-violet-900/40 text-xs">
          <span className="font-bold text-violet-300 block mb-1">Friendly Squad Hints:</span>
          <ul className="list-disc list-inside space-y-1 text-slate-300">
            {currentChallenge.solutionHints.map((hint, i) => (
              <li key={i}>{hint}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Sandbox Grid: Code Editors on Left, Live Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
        {/* Left Side: Code Inputs (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-950/70">
          {/* Subheader with editor tabs */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800 bg-slate-900/80">
            <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800">
              <button
                onClick={() => setActiveTab('both')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  activeTab === 'both' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Split (HTML + CSS)
              </button>
              <button
                onClick={() => setActiveTab('html')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  activeTab === 'html' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                HTML Only
              </button>
              <button
                onClick={() => setActiveTab('css')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  activeTab === 'css' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                CSS Only
              </button>
            </div>

            <button
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer transition-colors"
              title="Reset starter template"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Starter
            </button>
          </div>

          {/* Editors Container */}
          <div className="flex-1 flex flex-col">
            {(activeTab === 'both' || activeTab === 'html') && (
              <div className="flex-1 flex flex-col border-b border-slate-800/80">
                <div className="px-3 py-1.5 bg-slate-900/50 text-[11px] font-mono text-emerald-400 flex items-center justify-between">
                  <span>index.html</span>
                  <span className="text-[10px] text-slate-500">Live Editable</span>
                </div>
                <textarea
                  value={htmlCode}
                  onChange={(e) => setHtmlCode(e.target.value)}
                  className="w-full h-36 lg:h-44 p-3 bg-slate-950 text-slate-200 font-mono text-xs leading-relaxed resize-none focus:outline-none focus:ring-1 focus:ring-violet-500"
                  spellCheck={false}
                  placeholder="<!-- Write HTML here -->"
                />
              </div>
            )}

            {(activeTab === 'both' || activeTab === 'css') && (
              <div className="flex-1 flex flex-col">
                <div className="px-3 py-1.5 bg-slate-900/50 text-[11px] font-mono text-violet-400 flex items-center justify-between">
                  <span>styles.css</span>
                  <span className="text-[10px] text-slate-500">Live Editable</span>
                </div>
                <textarea
                  value={cssCode}
                  onChange={(e) => setCssCode(e.target.value)}
                  className="w-full h-44 lg:h-52 p-3 bg-slate-950 text-slate-200 font-mono text-xs leading-relaxed resize-none focus:outline-none focus:ring-1 focus:ring-violet-500"
                  spellCheck={false}
                  placeholder="/* Write CSS here */"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Live Sandbox Output (5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col bg-slate-950">
          <div className="px-4 py-2.5 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
              <span>Live Output Preview</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Synced</span>
            </div>
          </div>

          {/* Sandboxed iframe */}
          <div className="flex-1 min-h-[260px] p-2 bg-slate-950 flex flex-col">
            <iframe
              title="Practice Sandbox"
              srcDoc={srcDoc}
              sandbox="allow-scripts"
              className="w-full flex-1 rounded-xl border border-slate-800/90 bg-[#0b0f19] shadow-inner"
            />
          </div>

          {/* Test verification footer */}
          <div className="p-4 border-t border-slate-800 bg-slate-900/60">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span>Squad Automated Checks</span>
              </div>
              <button
                onClick={handleRunTests}
                className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shadow-md shadow-emerald-950"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                Run Checks (+150 XP)
              </button>
            </div>

            {/* Test rules feedback */}
            {tested ? (
              <div className="space-y-2 mt-2">
                {testResults.map((r) => (
                  <div
                    key={r.id}
                    className={`flex items-start gap-2 text-xs p-2 rounded-lg border transition-colors ${
                      r.passed
                        ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                        : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
                    }`}
                  >
                    {r.passed ? (
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <span className="font-semibold">{r.desc}</span>
                      {!r.passed && (
                        <p className="text-[11px] text-rose-400/90 mt-0.5">
                          Tweak your code to satisfy this check.
                        </p>
                      )}
                    </div>
                  </div>
                ))}

                {allPassed && (
                  <div className="p-2.5 rounded-lg bg-violet-950/60 border border-violet-500/50 text-violet-200 text-xs flex items-center justify-between">
                    <span className="font-bold flex items-center gap-1.5">
                      🎉 Challenge Cleared! Squad earned +150 XP!
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                      Passed
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-400">
                Click <strong className="text-white">Run Checks</strong> to verify your HTML & CSS solution against the challenge criteria.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
