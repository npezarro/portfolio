#!/usr/bin/env node
// Generates project detail pages from project data
const fs = require('fs');
const path = require('path');

const projects = [
  // ---- 01: Claude Code Ecosystem ----
  {
    slug: 'autonomous-dev',
    name: 'Autonomous Dev Agent',
    category: 'Claude Code Ecosystem',
    catNum: '01',
    hue: 220,
    mono: 'AD',
    badges: ['Node.js', 'Claude CLI', 'PM2', 'Cron'],
    github: 'https://github.com/npezarro/autonomousDev',
    desc: 'Cron-scheduled system that wakes up every 30 minutes, surveys codebases for the highest-impact work, creates branches, implements features, and stages PRs for human review. Safety guardrails gate on token usage: proposal-only mode above 50%, full halt above 75%. Has been running continuously for months across 30+ repos.',
    features: [
      'Open-ended repository discovery across 30+ repos',
      'Agent profile injection for consistent behavior',
      'Post-agent verification (build + test gates)',
      'PR gating with human-in-the-loop review',
      'Usage-aware execution: proposal mode >50%, halt >75%',
      'Discord reporting for all actions taken',
    ],
    visual: 'terminal',
    terminalTitle: 'autonomous-dev — cron output',
    terminalContent: `<span class="prompt">$</span> <span class="cmd">autonomous-dev --run</span>
<span class="dim">[2026-05-12 08:00:01]</span> <span class="info">Scanning 32 repositories for open work...</span>
<span class="dim">[2026-05-12 08:00:04]</span> Found 7 candidates, ranking by impact...
<span class="dim">[2026-05-12 08:00:05]</span> <span class="success">Selected: browser-agent — fix CDP timeout on slow pages</span>
<span class="dim">[2026-05-12 08:00:06]</span> Creating branch: auto/fix-cdp-timeout
<span class="dim">[2026-05-12 08:00:08]</span> Spawning Claude CLI session...
<span class="dim">[2026-05-12 08:12:34]</span> Implementation complete. Running build...
<span class="dim">[2026-05-12 08:12:41]</span> <span class="success">✓ Build passed</span>
<span class="dim">[2026-05-12 08:12:42]</span> <span class="success">✓ Tests passed (47/47)</span>
<span class="dim">[2026-05-12 08:12:44]</span> Staging PR for review...
<span class="dim">[2026-05-12 08:12:45]</span> <span class="info">→ PR #142 created, posted to Discord</span>
<span class="dim">[2026-05-12 08:12:45]</span> Usage: 5h 34% | 7d 28%`,
    prev: null,
    next: 'agent-guidance',
  },
  {
    slug: 'agent-guidance',
    name: 'Agent Guidance',
    category: 'Claude Code Ecosystem',
    catNum: '01',
    hue: 160,
    mono: 'AG',
    badges: ['Markdown', 'Bash', 'Git'],
    github: 'https://github.com/npezarro/agentGuidance',
    desc: 'The instruction architecture that all my agents share. Hierarchical system of global rules, topic-specific guidance files, agent profiles with experience logs, and a cross-referenced knowledge base wiki. Currently 30+ guidance pages covering everything from git workflow to deployment checklists to debugging patterns.',
    features: [
      'Hierarchical instruction system (global → project → session)',
      '30+ topic-specific guidance documents',
      'Agent profiles with persistent experience logs',
      'Cross-referenced knowledge base wiki (31 pages)',
      'Automatic learning propagation from corrections',
      'Security scanner for sensitive identifier detection',
    ],
    visual: 'arch',
    archData: {
      rows: [
        { boxes: [{ text: 'agent.md', cls: 'accent' }], label: 'Global Rules' },
        { boxes: [{ text: 'Guidance Files', cls: 'cool' }, { text: 'Agent Profiles', cls: 'cool' }, { text: 'KnowledgeBase', cls: 'cool' }], label: 'Topic Layer' },
        { boxes: [{ text: 'CLAUDE.md (per repo)', cls: '' }], label: 'Project Layer' },
        { boxes: [{ text: 'Memory', cls: '' }, { text: 'PrivateContext', cls: '' }], label: 'Instance Layer' },
      ],
    },
    prev: 'autonomous-dev',
    next: 'claudenet',
  },
  {
    slug: 'claudenet',
    name: 'ClaudeNet',
    category: 'Claude Code Ecosystem',
    catNum: '01',
    hue: 270,
    mono: 'CN',
    badges: ['Express.js', 'SQLite', 'WebSocket', 'Bash CLI'],
    github: 'https://github.com/npezarro/claudeNet',
    desc: 'Async messaging service for Claude Code CLI instances to exchange implementation knowledge. Express.js + SQLite backend with web dashboard, bash CLI, autonomous polling worker, and a sensitivity scanner that flags potential secret leaks without blocking delivery.',
    features: [
      'Bidirectional connections with approval system',
      'Autonomous worker polling (30s intervals)',
      'Secret-leak sensitivity scanner',
      'Web dashboard (compose, threads, connections)',
      'Bash CLI for terminal-native messaging',
      'Human-in-the-loop thread modes (manual/autonomous)',
    ],
    visual: 'arch',
    archData: {
      rows: [
        { boxes: [{ text: 'Claude Instance A', cls: 'accent' }, { text: 'Claude Instance B', cls: 'accent' }], label: 'Clients' },
        { boxes: [{ text: 'ClaudeNet Server', cls: 'cool' }], label: 'Message Broker' },
        { boxes: [{ text: 'SQLite DB', cls: '' }, { text: 'Sensitivity Scanner', cls: '' }, { text: 'Web Dashboard', cls: '' }], label: 'Infrastructure' },
      ],
    },
    prev: 'agent-guidance',
    next: 'learning-agent',
  },
  {
    slug: 'learning-agent',
    name: 'Learning Agent',
    category: 'Claude Code Ecosystem',
    catNum: '01',
    hue: 30,
    mono: 'LA',
    badges: ['Node.js', 'Claude CLI', 'Git'],
    github: null,
    desc: 'Hourly automated system that reviews all session activity, detects uncaptured corrections and patterns in my interactions with Claude, and propagates them into the guidance system. Every interaction contains implicit lessons about how I want things done, and those should be learned systematically.',
    features: [
      'Five review passes (learnings, memory-only rules, corrections, prompt observations, profile updates)',
      'Staged PR workflow for human review',
      'Cross-references with knowledge base wiki',
      'Secrets hygiene scanning',
      'Usage-gated execution (respects token budgets)',
      'Discord reporting for all detected patterns',
    ],
    visual: 'flow',
    flowSteps: ['Review Sessions', 'Detect Corrections', 'Cross-Reference', 'Stage PR', 'Discord Report'],
    prev: 'claudenet',
    next: 'claude-bakeoff',
  },
  {
    slug: 'claude-bakeoff',
    name: 'Claude Bakeoff',
    category: 'Claude Code Ecosystem',
    catNum: '01',
    hue: 340,
    mono: 'CB',
    badges: ['Node.js', 'Bash', 'LLM-as-Judge'],
    github: 'https://github.com/npezarro/claude-bakeoff',
    desc: 'A/B testing framework for running controlled experiments on Claude CLI instruction environments. Test whether a guidance change actually improves output quality by running the same task under two different instruction sets and comparing results with LLM-as-judge evaluation.',
    features: [
      'Named instruction environments for isolation',
      'Pluggable execution platforms (CLI and Discord)',
      'Arena CLI commands: bake, judge, taste',
      'LLM-as-judge automated evaluation',
      'Systematic task evaluation with scoring',
      'Discord reporting with comparison results',
    ],
    visual: 'flow',
    flowSteps: ['Define Envs', 'Run Task (A)', 'Run Task (B)', 'LLM Judge', 'Score & Report'],
    prev: 'learning-agent',
    next: 'browser-agent',
  },
  // ---- 02: Developer Tools ----
  {
    slug: 'browser-agent',
    name: 'Browser Agent',
    category: 'Developer Tools',
    catNum: '02',
    hue: 200,
    mono: 'BA',
    badges: ['Chrome MV3', 'Node.js', 'CDP', 'Bash CLI'],
    github: 'https://github.com/npezarro/browser-agent',
    desc: 'Chrome extension plus relay server that gives Claude Code live control of a real browser tab, complete with existing cookies and login state. MV3 extension with 30+ commands, a Node.js relay server, and a bash CLI.',
    features: [
      '30+ commands: navigate, click, type, upload, screenshot',
      'CDP trusted input for sites checking isTrusted',
      'Network capture and request interception',
      'CSP bypass via Chrome DevTools Protocol',
      'Existing login session access (real cookies)',
      'Safety timer patterns for debugger attachment',
    ],
    visual: 'arch',
    archData: {
      rows: [
        { boxes: [{ text: 'Claude CLI', cls: 'accent' }], label: 'Consumer' },
        { boxes: [{ text: 'Bash CLI', cls: '' }, { text: 'Relay Server', cls: 'cool' }, { text: 'MV3 Extension', cls: '' }], label: 'Transport Layer' },
        { boxes: [{ text: 'Live Chrome Tab', cls: 'accent' }], label: 'Target' },
      ],
    },
    prev: 'claude-bakeoff',
    next: 'page-reader',
  },
  {
    slug: 'page-reader',
    name: 'Page Reader',
    category: 'Developer Tools',
    catNum: '02',
    hue: 140,
    mono: 'PR',
    badges: ['Node.js', 'Puppeteer'],
    github: 'https://github.com/npezarro/page-reader',
    desc: 'Node.js CLI that uses a headless browser to render JavaScript-heavy pages and extract clean text. The fallback every agent uses when default web tools return empty or broken content on SPAs, modern forums, and React apps.',
    features: [
      'Full JavaScript rendering via Puppeteer',
      'Clean text extraction from rendered DOM',
      '--text-only mode for minimal output',
      'Handles SPAs, React apps, and JS-rendered content',
      'Used as fallback across all agent sessions',
      'Fast startup with browser instance reuse',
    ],
    visual: 'terminal',
    terminalTitle: 'page-reader — CLI',
    terminalContent: `<span class="prompt">$</span> <span class="cmd">node page-reader/src/index.js --text-only "https://example.com/spa"</span>

<span class="dim">Launching headless browser...</span>
<span class="dim">Navigating to URL...</span>
<span class="dim">Waiting for JS render (networkidle0)...</span>
<span class="success">Page rendered successfully</span>

<span class="output">Example SPA - Dashboard
======================
Active Users: 1,247
Revenue Today: $34,891
...</span>`,
    prev: 'browser-agent',
    next: 'usage-monitor',
  },
  {
    slug: 'usage-monitor',
    name: 'Claude Usage Monitor',
    category: 'Developer Tools',
    catNum: '02',
    hue: 50,
    mono: 'UM',
    badges: ['Node.js', 'OAuth'],
    github: 'https://github.com/npezarro/claude-usage-monitor',
    desc: 'Queries the Claude Max OAuth usage endpoint for real-time 5-hour and 7-day utilization percentages. Powers the pre-flight usage gates that prevent autonomous agents from running when usage is high.',
    features: [
      'Real-time 5-hour and 7-day utilization tracking',
      '5-minute result caching to avoid rate limits',
      'Pre-flight gate for autonomous agent spawning',
      'Threshold-based blocking (75% warning, halt)',
      'Discord integration for usage alerts',
      'Cron-compatible output format',
    ],
    visual: 'terminal',
    terminalTitle: 'check-usage.sh — output',
    terminalContent: `<span class="prompt">$</span> <span class="cmd">check-usage.sh --gate</span>
<span class="info">5h: 22.0%</span> (resets May 12 4:00pm PT)
<span class="info">7d: 41.0%</span> (resets May 17 12:00pm PT)
Status: <span class="success">OK</span>
GATE: Usage at 41.0% (threshold 75%). <span class="success">OK to proceed.</span>

<span class="prompt">$</span> <span class="cmd">check-usage.sh --gate</span>  <span class="dim"># later that day...</span>
<span class="warning">5h: 78.0%</span> (resets May 12 9:00pm PT)
<span class="info">7d: 55.0%</span> (resets May 17 12:00pm PT)
Status: <span class="warning">HIGH</span>
GATE: Usage at 78.0% (threshold 75%). <span class="warning">BLOCKED.</span>`,
    prev: 'page-reader',
    next: 'token-tracker',
  },
  {
    slug: 'token-tracker',
    name: 'Claude Token Tracker',
    category: 'Developer Tools',
    catNum: '02',
    hue: 290,
    mono: 'TT',
    badges: ['Node.js'],
    github: 'https://github.com/npezarro/claude-token-tracker',
    desc: 'Per-component token usage tracking for Claude Code ecosystems. Breaks down where tokens are being spent across different agents and tasks.',
    features: [
      'Per-component token breakdown',
      'Agent vs interactive session tracking',
      'Historical usage trends',
      'Cost attribution by repository',
      'Integration with usage monitor',
      'Discord summary reports',
    ],
    visual: 'terminal',
    terminalTitle: 'token-tracker — daily report',
    terminalContent: `<span class="prompt">$</span> <span class="cmd">token-tracker report --today</span>

<span class="info">Token Usage — May 12, 2026</span>
<span class="dim">─────────────────────────────────────</span>
<span class="output">autonomous-dev     │ 847,231  │ 34.2%</span>
<span class="output">trading-agent      │ 412,089  │ 16.6%</span>
<span class="output">learning-agent     │ 289,441  │ 11.7%</span>
<span class="output">interactive (nick) │ 621,903  │ 25.1%</span>
<span class="output">other agents       │ 307,112  │ 12.4%</span>
<span class="dim">─────────────────────────────────────</span>
<span class="success">Total: 2,477,776 tokens</span>`,
    prev: 'usage-monitor',
    next: 'tray-notifier',
  },
  {
    slug: 'tray-notifier',
    name: 'Claude Tray Notifier',
    category: 'Developer Tools',
    catNum: '02',
    hue: 180,
    mono: 'TN',
    badges: ['Electron', 'macOS', 'GitHub Actions'],
    github: 'https://github.com/npezarro/claude-tray-notifier',
    desc: 'macOS menu bar app that surfaces notifications from Claude Code CLI sessions. Electron-based with shell installer and auto-update pipeline via SCP.',
    features: [
      'macOS menu bar integration',
      'Polls for session notifications',
      'Token and relay URL configuration',
      'Shell-based installer (unsigned app workaround)',
      'Auto-update pipeline via SCP',
      'GitHub Actions CI/CD for builds',
    ],
    visual: 'browser',
    browserUrl: 'claude-tray-notifier — macOS Menu Bar',
    browserContent: `<div style="text-align:center;padding:20px;">
      <div style="display:inline-flex;flex-direction:column;align-items:center;gap:12px;">
        <div style="width:240px;background:var(--bg-tertiary);border-radius:12px;padding:16px;border:1px solid var(--border-medium);text-align:left;">
          <div style="font-family:var(--mono);font-size:10px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:12px;">Claude Code Notifications</div>
          <div style="padding:10px;background:var(--bg-primary);border-radius:6px;margin-bottom:8px;border:1px solid var(--border-light);">
            <div style="font-size:12px;font-weight:600;color:var(--text-primary);margin-bottom:2px;">autonomous-dev</div>
            <div style="font-size:11px;color:var(--text-secondary);">PR #142 staged for review</div>
            <div style="font-size:10px;color:var(--text-tertiary);margin-top:4px;">2 min ago</div>
          </div>
          <div style="padding:10px;background:var(--bg-primary);border-radius:6px;border:1px solid var(--border-light);">
            <div style="font-size:12px;font-weight:600;color:var(--text-primary);margin-bottom:2px;">learning-agent</div>
            <div style="font-size:11px;color:var(--text-secondary);">3 new corrections captured</div>
            <div style="font-size:10px;color:var(--text-tertiary);margin-top:4px;">15 min ago</div>
          </div>
        </div>
      </div>
    </div>`,
    prev: 'token-tracker',
    next: 'phone-agent',
  },
  // ---- 03: Applied AI ----
  {
    slug: 'phone-agent',
    name: 'Phone Agent',
    category: 'Applied AI',
    catNum: '03',
    hue: 0,
    mono: 'PA',
    badges: ['WebRTC', 'Deepgram', 'Groq', 'ElevenLabs'],
    github: null,
    desc: 'AI phone calling system via Google Voice WebRTC interception. Deepgram for speech-to-text, Claude via Groq for conversation, ElevenLabs for text-to-speech. Makes actual phone calls with natural voice.',
    features: [
      'WebRTC audio stream capture from Google Voice',
      'Deepgram real-time speech-to-text',
      'Claude (via Groq Llama 3.3 70B) for conversation logic',
      'ElevenLabs natural text-to-speech',
      '--confirm required flag for safety',
      '10-min max duration, 3 calls/hour rate limit',
    ],
    visual: 'flow',
    flowSteps: ['Voice Input', 'Deepgram STT', 'Claude LLM', 'ElevenLabs TTS', 'Voice Output'],
    prev: 'tray-notifier',
    next: 'botlink',
  },
  {
    slug: 'botlink',
    name: 'BotLink',
    category: 'Applied AI',
    catNum: '03',
    hue: 260,
    mono: 'BL',
    badges: ['Next.js', 'Prisma', 'PostgreSQL', 'Tailwind'],
    github: null,
    desc: 'Professional network for AI agents. Think LinkedIn but for bots: profiles, feeds, discussions. Exploring what it looks like when AI agents have persistent public identities.',
    features: [
      'Bot registration with API key management',
      'Persistent public profiles with bios and skills',
      'Threaded discussions and feed system',
      'Connections and endorsements',
      'Search and pagination',
      'API-first architecture (SHA-256 hashed keys)',
    ],
    visual: 'browser',
    browserUrl: 'botlink — Bot Profiles',
    browserContent: `<div style="padding:16px;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div style="padding:14px;background:var(--bg-primary);border:1px solid var(--border-light);border-radius:8px;">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
            <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#8b5cf6,#06b6d4);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:600;color:white;">A</div>
            <div>
              <div style="font-size:13px;font-weight:600;color:var(--text-primary);">autonomous-dev</div>
              <div style="font-size:11px;color:var(--text-tertiary);">Development Agent</div>
            </div>
          </div>
          <div style="font-size:11px;color:var(--text-secondary);line-height:1.5;">Autonomous developer. Surveys codebases, implements features, stages PRs.</div>
        </div>
        <div style="padding:14px;background:var(--bg-primary);border:1px solid var(--border-light);border-radius:8px;">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
            <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#f97316,#eab308);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:600;color:white;">L</div>
            <div>
              <div style="font-size:13px;font-weight:600;color:var(--text-primary);">learning-agent</div>
              <div style="font-size:11px;color:var(--text-tertiary);">Knowledge Agent</div>
            </div>
          </div>
          <div style="font-size:11px;color:var(--text-secondary);line-height:1.5;">Reviews sessions, captures corrections, propagates learnings.</div>
        </div>
      </div>
    </div>`,
    prev: 'phone-agent',
    next: 'interview-practice',
  },
  {
    slug: 'interview-practice',
    name: 'Interview Practice',
    category: 'Applied AI',
    catNum: '03',
    hue: 120,
    mono: 'IP',
    badges: ['WebSocket', 'Speech API', 'Claude CLI', 'Express.js'],
    github: null,
    desc: 'Live audio PM mock interview tool. Claude CLI acts as the interviewer, browser handles TTS/STT, structured scoring rubric evaluates responses across 5 categories.',
    features: [
      'Live conversation with 15-second silence timeout',
      '50+ Microsoft Natural voices for TTS',
      'Structured scoring across 5 categories',
      'Text-only mode available',
      'Interview prep from 9+ company mappings',
      'Session JSON persistence for review',
    ],
    visual: 'browser',
    browserUrl: 'interview-practice — Mock Interview — Mock Interview',
    browserContent: `<div style="padding:20px;">
      <div style="max-width:400px;margin:0 auto;">
        <div style="text-align:center;margin-bottom:16px;">
          <div style="font-family:var(--font-display);font-size:18px;font-weight:600;color:var(--text-primary);margin-bottom:4px;">PM Interview — Microsoft</div>
          <div style="font-size:12px;color:var(--text-tertiary);">Round 2 of 4 · Product Sense</div>
        </div>
        <div style="padding:14px;background:var(--bg-primary);border:1px solid var(--border-light);border-radius:8px;margin-bottom:12px;">
          <div style="font-size:11px;color:var(--accent);font-family:var(--mono);margin-bottom:6px;">INTERVIEWER</div>
          <div style="font-size:13px;color:var(--text-secondary);line-height:1.5;">"How would you improve Microsoft Teams for hybrid work environments?"</div>
        </div>
        <div style="display:flex;justify-content:center;gap:12px;">
          <div style="width:48px;height:48px;border-radius:50%;border:2px solid var(--accent);display:flex;align-items:center;justify-content:center;">
            <div style="width:12px;height:12px;border-radius:50%;background:var(--accent);animation:pulse 1.5s ease-in-out infinite;"></div>
          </div>
        </div>
        <div style="text-align:center;margin-top:8px;font-size:11px;color:var(--text-tertiary);font-family:var(--mono);">LISTENING...</div>
      </div>
    </div>`,
    prev: 'botlink',
    next: 'trading-agent',
  },
  {
    slug: 'trading-agent',
    name: 'Trading Agent',
    category: 'Applied AI',
    catNum: '03',
    hue: 80,
    mono: 'TA',
    badges: ['Python', 'Alpaca API', 'SEC EDGAR', 'FRED'],
    github: null,
    desc: 'Autonomous swing trading system with three-loop architecture, 6 strategies, and SEC EDGAR/FRED data integration. Connected to Alpaca paper trading with bracket orders and drawdown circuit breakers.',
    features: [
      'Fast loop (30min), deep loop (pre/after-market), day trade loop (3min intraday)',
      '6 distinct trading strategies',
      'SEC EDGAR and FRED data integration',
      'Bracket orders with position sizing',
      'Drawdown circuit breaker for risk management',
      'Error handler (Sonnet diagnoses failures)',
    ],
    visual: 'arch',
    archData: {
      rows: [
        { boxes: [{ text: 'Fast Loop (30m)', cls: 'accent' }, { text: 'Deep Loop (Pre/Post)', cls: 'accent' }, { text: 'Day Trade (3m)', cls: 'accent' }], label: 'Execution Loops' },
        { boxes: [{ text: 'Strategy Engine', cls: 'cool' }], label: '6 Strategies' },
        { boxes: [{ text: 'SEC EDGAR', cls: '' }, { text: 'FRED', cls: '' }, { text: 'Alpaca API', cls: '' }], label: 'Data Sources' },
      ],
    },
    prev: 'interview-practice',
    next: 'auto-shorts',
  },
  {
    slug: 'auto-shorts',
    name: 'Auto Shorts',
    category: 'Applied AI',
    catNum: '03',
    hue: 15,
    mono: 'AS',
    badges: ['FFmpeg', 'YouTube API', 'MediaPipe', 'Claude Vision'],
    github: null,
    desc: 'YouTube Shorts generation pipeline. Takes source cooking videos, identifies clip-worthy moments, generates cuts with smart face-tracking crop, and uploads. Per-clip analytics and a learning engine that improves over time.',
    features: [
      'Smart face-tracking crop detection via MediaPipe',
      'Per-clip analytics (views, likes, watch %)',
      'Learning agent analyzes performance patterns',
      'Experimentation framework with auto-preset selection',
      'Stale job sweeper for pipeline hygiene',
      'Weekly learnings email digest',
    ],
    visual: 'flow',
    flowSteps: ['Source Video', 'Clip Detection', 'Face-Track Crop', 'Upload', 'Analyze & Learn'],
    prev: 'trading-agent',
    next: 'reddit-auto-hide',
  },
  // ---- 04: Automation & Utilities ----
  {
    slug: 'reddit-auto-hide',
    name: 'Reddit Auto-Hide',
    category: 'Automation & Utilities',
    catNum: '04',
    hue: 10,
    mono: 'RH',
    badges: ['Tampermonkey', 'JavaScript'],
    github: 'https://github.com/npezarro/reddit-auto-hide',
    desc: 'Tampermonkey userscript that auto-hides Reddit posts after you scroll past them. Cross-device sync via Reddit\'s native hide API. Works on old and new Reddit.',
    features: [
      'Automatic post hiding on scroll-past',
      'Cross-device sync via Reddit native hide API',
      'Works on old.reddit.com and new Reddit',
      'Toggle UI (show hidden, unhide all)',
      'SPA navigation handling',
      'IntersectionObserver for performance',
    ],
    visual: 'browser',
    browserUrl: 'reddit.com — with Auto-Hide active',
    browserContent: `<div style="padding:16px;">
      <div style="max-width:380px;margin:0 auto;">
        <div style="padding:12px;background:var(--bg-primary);border:1px solid var(--border-light);border-radius:6px;margin-bottom:8px;">
          <div style="font-size:13px;font-weight:600;color:var(--text-primary);margin-bottom:4px;">TIL about the Dunning-Kruger effect</div>
          <div style="font-size:11px;color:var(--text-tertiary);">r/todayilearned · 4.2k upvotes</div>
        </div>
        <div style="padding:12px;background:var(--bg-primary);border:1px solid var(--border-light);border-radius:6px;margin-bottom:8px;opacity:0.3;position:relative;">
          <div style="font-size:13px;font-weight:600;color:var(--text-primary);margin-bottom:4px;">What's your unpopular opinion?</div>
          <div style="font-size:11px;color:var(--text-tertiary);">r/AskReddit · 8.1k upvotes</div>
          <div style="position:absolute;top:50%;right:12px;transform:translateY(-50%);font-family:var(--mono);font-size:9px;color:var(--accent);letter-spacing:0.1em;text-transform:uppercase;">Hidden</div>
        </div>
        <div style="padding:12px;background:var(--bg-primary);border:1px solid var(--border-light);border-radius:6px;">
          <div style="font-size:13px;font-weight:600;color:var(--text-primary);margin-bottom:4px;">New study finds that...</div>
          <div style="font-size:11px;color:var(--text-tertiary);">r/science · 2.7k upvotes</div>
        </div>
      </div>
    </div>`,
    prev: 'auto-shorts',
    next: 'mic-volume-guard',
  },
  {
    slug: 'mic-volume-guard',
    name: 'Mic Volume Guard',
    category: 'Automation & Utilities',
    catNum: '04',
    hue: 320,
    mono: 'MV',
    badges: ['Windows', 'PowerShell'],
    github: 'https://github.com/npezarro/mic-volume-guard',
    desc: 'Windows background watchdog that keeps microphone recording devices at 100% volume. Solves an annoying behavior where apps reset mic levels.',
    features: [
      'Background watchdog process',
      'Monitors all recording devices',
      'Automatically resets to 100% when changed',
      'Low resource footprint',
      'Startup integration',
      'Solves persistent Windows mic reset bug',
    ],
    visual: 'terminal',
    terminalTitle: 'mic-volume-guard — running',
    terminalContent: `<span class="prompt">PS></span> <span class="cmd">.\\mic-volume-guard.ps1</span>
<span class="info">Mic Volume Guard started</span>
<span class="dim">Monitoring recording devices...</span>

<span class="dim">[14:22:01]</span> <span class="output">Microphone (Blue Yeti): 100%</span> <span class="success">OK</span>
<span class="dim">[14:23:15]</span> <span class="warning">Microphone (Blue Yeti): 47%</span> <span class="dim">(changed by Discord)</span>
<span class="dim">[14:23:15]</span> <span class="success">→ Reset to 100%</span>
<span class="dim">[14:30:02]</span> <span class="output">Microphone (Blue Yeti): 100%</span> <span class="success">OK</span>`,
    prev: 'reddit-auto-hide',
    next: 'free-games',
  },
  {
    slug: 'free-games',
    name: 'Free Games Pipeline',
    category: 'Automation & Utilities',
    catNum: '04',
    hue: 190,
    mono: 'FG',
    badges: ['Tampermonkey', 'Node.js', 'Express.js'],
    github: null,
    desc: 'Multi-platform free game discovery and auto-checkout. Scans Epic, GOG, Steam, and Amazon Prime Gaming. Tampermonkey scripts handle the actual claiming in the browser.',
    features: [
      'Multi-platform support (Epic, GOG, Steam, Amazon Prime)',
      'Server-side game discovery and orchestration',
      'Tampermonkey remote agent for browser claiming',
      '3-second polling cycle for responsive claiming',
      'Email notifications for code-required games',
      'Automatic library addition',
    ],
    visual: 'flow',
    flowSteps: ['Scan Stores', 'Detect Free', 'Queue Claim', 'TM Agent', 'Notify'],
    prev: 'mic-volume-guard',
    next: 'fb-marketplace',
  },
  {
    slug: 'fb-marketplace',
    name: 'FB Marketplace Poster',
    category: 'Automation & Utilities',
    catNum: '04',
    hue: 240,
    mono: 'FM',
    badges: ['Claude Vision', 'Browser Agent', 'Google Photos'],
    github: null,
    desc: 'Google Photos to Claude vision to browser-agent to Facebook listing. Takes photos of items, generates descriptions and pricing via Claude, posts the listing automatically.',
    features: [
      'Google Photos image extraction',
      'Claude vision for description generation',
      'Automatic pricing suggestions',
      'Browser-agent form filling on Facebook',
      'Buyer screening via custom Google Form',
      'Honest, casual tone detection',
    ],
    visual: 'flow',
    flowSteps: ['Photos', 'Claude Vision', 'Generate Listing', 'Browser Agent', 'Post to FB'],
    prev: 'free-games',
    next: 'grocery-genius',
  },
  {
    slug: 'grocery-genius',
    name: 'Grocery Genius',
    category: 'Automation & Utilities',
    catNum: '04',
    hue: 100,
    mono: 'GG',
    badges: ['Kroger API', 'Node.js'],
    github: 'https://github.com/npezarro/groceryGenius',
    desc: 'Kroger API integration for grocery price tracking and optimization. Compares prices across stores and finds the best deals.',
    features: [
      'Kroger API integration for real-time prices',
      'Cross-store price comparison',
      'Deal and sale tracking',
      'Shopping list optimization',
      'Price history tracking',
      'Weekly best-deal notifications',
    ],
    visual: 'terminal',
    terminalTitle: 'grocery-genius — price check',
    terminalContent: `<span class="prompt">$</span> <span class="cmd">grocery-genius check "organic milk"</span>

<span class="info">Searching Kroger stores near 94107...</span>

<span class="output">Organic Valley Whole Milk, 64oz</span>
  Kroger Market St    <span class="success">$5.49</span>  <span class="dim">(sale, reg $6.99)</span>
  Kroger 4th St       $6.99
  Kroger Potrero      $6.99

<span class="output">Horizon Organic 2%, 64oz</span>
  Kroger Market St    $6.29
  Kroger 4th St       <span class="success">$5.99</span>  <span class="dim">(sale, reg $6.29)</span>
  Kroger Potrero      $6.29

<span class="success">Best deal: Organic Valley @ Market St — $5.49</span>`,
    prev: 'fb-marketplace',
    next: null,
  },
];

// Template for project detail pages
function generatePage(p) {
  const prevLink = p.prev ? `<a href="${p.prev}.html" class="project-nav-prev"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Previous</a>` : '<span></span>';
  const nextLink = p.next ? `<a href="${p.next}.html" class="project-nav-next">Next <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>` : '<span></span>';

  const githubLink = p.github
    ? `<a href="${p.github}" target="_blank" rel="noopener" class="project-hero-link">View on GitHub <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M4 2H2v8h8V8M7 2h3m0 0v3m0-3L5 7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></a>`
    : '<span class="private-tag" style="font-size:11px;padding:4px 10px;">Private Repository</span>';

  let visualHtml = '';
  if (p.visual === 'terminal') {
    visualHtml = `
      <div class="project-visual">
        <div class="mockup-terminal">
          <div class="mockup-terminal-bar">
            <div class="mockup-terminal-dot"></div>
            <div class="mockup-terminal-dot"></div>
            <div class="mockup-terminal-dot"></div>
            <div class="mockup-terminal-title">${p.terminalTitle}</div>
          </div>
          <div class="mockup-terminal-body"><pre style="margin:0;white-space:pre-wrap;font-family:inherit;">${p.terminalContent}</pre></div>
        </div>
      </div>`;
  } else if (p.visual === 'browser') {
    visualHtml = `
      <div class="project-visual">
        <div class="mockup-browser">
          <div class="mockup-browser-bar">
            <div class="mockup-browser-dots"><span></span><span></span><span></span></div>
            <div class="mockup-browser-url">${p.browserUrl}</div>
          </div>
          <div class="mockup-browser-body">${p.browserContent}</div>
        </div>
      </div>`;
  } else if (p.visual === 'arch') {
    const rows = p.archData.rows.map(row => {
      const boxes = row.boxes.map(b => `<div class="arch-box ${b.cls ? 'arch-box--' + b.cls : ''}">${b.text}</div>`).join('\n              ');
      return `
          <div class="arch-label">${row.label}</div>
          <div class="arch-row">${boxes}</div>`;
    }).join('\n          <div class="arch-arrow--down">&#8595;</div>');
    visualHtml = `
      <div class="project-visual">
        <div class="mockup-arch">${rows}
        </div>
      </div>`;
  } else if (p.visual === 'flow') {
    const steps = p.flowSteps.map((step, i) => {
      const connector = i < p.flowSteps.length - 1 ? '<div class="flow-connector"></div>' : '';
      return `<div class="flow-step"><div class="flow-step-num">${i + 1}</div><div class="flow-step-label">${step}</div></div>${connector}`;
    }).join('\n            ');
    visualHtml = `
      <div class="project-visual">
        <div class="mockup-flow">
          <div class="flow-steps">${steps}</div>
        </div>
      </div>`;
  }

  const features = p.features.map(f => `          <li>${f}</li>`).join('\n');
  const badges = p.badges.map(b => `<span class="project-badge">${b}</span>`).join('\n            ');

  return `<!DOCTYPE html>
<html lang="en" data-mode="dark">
<head>
  <meta charset="UTF-8">
  <script>!function(){var s=localStorage.getItem('np_mode');if(s===null)s=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.setAttribute('data-mode',s)}();</script>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>${p.name} — Nick Pezarro</title>
  <meta name="description" content="${p.desc.slice(0, 160).replace(/"/g, '&quot;')}">
  <meta name="theme-color" content="#0c0b08" media="(prefers-color-scheme: dark)">
  <meta name="theme-color" content="#efece4" media="(prefers-color-scheme: light)">
  <link rel="stylesheet" href="../assets/style.css?v=1">
  <link rel="stylesheet" href="../assets/project.css?v=1">
  <script defer src="../assets/site.js?v=1"></script>
</head>
<body>
  <div class="container">

    <div class="sticky-chrome">
      <div class="unified-bar">
        <a href="../" class="nav-mark">
          <svg class="nav-glyph" aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 2h10v10H2z" stroke="currentColor" stroke-width="1.3"/>
            <path d="M5 5h4v4H5z" fill="currentColor" opacity="0.5"/>
          </svg>
          <span class="nav-text">Nick Pezarro</span>
        </a>
        <div aria-hidden="true"></div>
        <div class="unified-actions">
          <button class="mode-toggle" type="button" aria-label="Toggle color mode" data-mode-toggle>
            <span class="mode-toggle-track">
              <span class="mode-toggle-i" aria-hidden="true"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="1.8" stroke="currentColor" stroke-width="1.1"/><line x1="5" y1="0.5" x2="5" y2="2" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/><line x1="5" y1="8" x2="5" y2="9.5" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/><line x1="0.5" y1="5" x2="2" y2="5" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/><line x1="8" y1="5" x2="9.5" y2="5" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/><line x1="1.6" y1="1.6" x2="2.7" y2="2.7" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/><line x1="7.3" y1="7.3" x2="8.4" y2="8.4" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/><line x1="7.3" y1="2.7" x2="8.4" y2="1.6" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/><line x1="1.6" y1="8.4" x2="2.7" y2="7.3" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg></span>
              <span class="mode-toggle-thumb"></span>
              <span class="mode-toggle-o" aria-hidden="true"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M7.5 6A3.5 3.5 0 1 1 4 2a2.5 2.5 0 1 0 3.5 4z" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round"/></svg></span>
            </span>
          </button>
        </div>
      </div>
    </div>

    <main>
      <a href="../" class="back-link">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        All Projects
      </a>

      <section class="project-hero">
        <span class="project-hero-kicker">${p.catNum} &middot; ${p.category}</span>
        <h1 class="project-hero-title">${p.name}</h1>
        <p class="project-hero-subtitle">${p.desc}</p>
        <div class="project-hero-badges">
            ${badges}
        </div>
        ${githubLink}
      </section>

      ${visualHtml}

      <section class="project-features">
        <h3>Key Features</h3>
        <ul class="feature-list">
${features}
        </ul>
      </section>

      <nav class="project-nav">
        ${prevLink}
        ${nextLink}
      </nav>
    </main>

    <footer>
      <div class="footer-inner">
        <span class="footer-copy">&copy; 2026 Nick Pezarro</span>
        <ul class="footer-links">
          <li><a href="https://linkedin.com/in/npezarro" target="_blank" rel="noopener">LinkedIn</a></li>
          <li><a href="https://github.com/npezarro" target="_blank" rel="noopener">GitHub</a></li>
          <li><a href="https://tuller.medium.com" target="_blank" rel="noopener">Medium</a></li>
        </ul>
      </div>
    </footer>
  </div>
</body>
</html>`;
}

// Generate all pages
const outDir = path.join(__dirname, 'projects');
projects.forEach(p => {
  const html = generatePage(p);
  const filePath = path.join(outDir, `${p.slug}.html`);
  fs.writeFileSync(filePath, html, 'utf-8');
  console.log(`Generated: projects/${p.slug}.html`);
});

console.log(`\nDone! ${projects.length} project pages generated.`);
