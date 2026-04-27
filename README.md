# Nick Pezarro

I build tools that make AI agents more useful, more reliable, and safer to operate. Most of my work centers on Claude Code, which I've been using as my primary development tool for over a year across a 30+ repository ecosystem.

The projects below range from production infrastructure I run daily to smaller utilities I built to solve specific problems. They share a common thread: each one started because I hit a real limitation and decided to fix it rather than work around it.

---

## Claude Code Ecosystem

The core of my work is a set of interlocking systems that extend Claude Code's capabilities beyond what ships natively.

### [Autonomous Dev Agent](https://github.com/npezarro/autonomousDev)
Cron-scheduled system that wakes up every 30 minutes, surveys codebases for the highest-impact work, creates branches, implements features, and stages PRs for human review. Safety guardrails gate on token usage: proposal-only mode above 50%, full halt above 75%. Has been running continuously for months across 30+ repos.

### [Agent Guidance](https://github.com/npezarro/agentGuidance)
The instruction architecture that all my agents share. Hierarchical system of global rules, topic-specific guidance files, agent profiles with experience logs, and a cross-referenced knowledge base wiki. This is what gives every session (autonomous or interactive) access to accumulated operational knowledge. Currently 30+ guidance pages covering everything from git workflow to deployment checklists to debugging patterns.

### ClaudeNet *(open-sourcing soon)*
Async messaging service for Claude Code CLI instances to exchange implementation knowledge. Express.js + SQLite backend with web dashboard, bash CLI, autonomous polling worker, and a sensitivity scanner that flags potential secret leaks without blocking delivery. Built because I was helping friends set up their own Claude Code environments and realized there was no way for a trained instance to share what it knew with a new one. Differentiators vs. other cross-instance tools: built-in safety scanning, human-in-the-loop thread modes (manual/autonomous), and message injection for steering autonomous conversations.

### Learning Agent *(private)*
Hourly automated system that reviews all session activity, detects uncaptured corrections and patterns in my interactions with Claude, and propagates them into the guidance system. The origin was frustration with re-teaching the same lessons across sessions (always push to GitHub, check guidance before starting, don't use grep patterns that break under pipefail). The deeper motivation: every interaction contains implicit lessons about how I want things done, and those should be learned systematically. Stages PRs to the guidance repo and cross-references with the knowledge base wiki.

### [A/B Testing Framework (claude-bakeoff)](https://github.com/npezarro/claude-bakeoff)
Framework for running controlled experiments on Claude CLI instruction environments. Test whether a guidance change actually improves output quality by running the same task under two different instruction sets and comparing results.

---

## Developer Tools

Utilities I built to fill gaps in Claude Code's native capabilities. These make both autonomous and interactive sessions more productive.

### [Page Reader](https://github.com/npezarro/page-reader)
Node.js CLI that uses a headless browser to render JavaScript-heavy pages and extract clean text. Built because Claude Code's built-in web browsing returns empty or broken content on SPAs, modern forums, and React apps. Every agent in the ecosystem falls back to this when default web tools fail.

### Browser Agent *(private, [public demo version](https://github.com/npezarro/claude-browser-agent))*
Chrome extension plus relay server that gives Claude Code live control of a real browser tab, complete with existing cookies and login state. Built because headless tools like Playwright can't access logged-in sessions where authenticated data is needed. The agent can navigate, click, fill forms, read content, and take screenshots. I use it for testing deployments, automating authenticated workflows, and verifying changes work in the browser before reporting back.

### [Claude Usage Monitor](https://github.com/npezarro/claude-usage-monitor)
Queries the Claude Max OAuth usage endpoint for real-time 5-hour and 7-day utilization percentages. Powers the pre-flight usage gates that prevent autonomous agents from running when usage is high.

### [Claude Token Tracker](https://github.com/npezarro/claude-token-tracker)
Per-component token usage tracking for Claude Code ecosystems. Breaks down where tokens are being spent across different agents and tasks.

### [Claude Tray Notifier](https://github.com/npezarro/claude-tray-notifier)
macOS menu bar app that surfaces notifications from Claude Code CLI sessions. Electron-based with an auto-update pipeline.

---

## Applied AI Projects

Standalone projects that use AI in different ways, each built to solve a specific problem.

### Phone Agent *(private)*
AI phone calling system via Google Voice WebRTC interception. Deepgram for speech-to-text, Claude (via Groq) for conversation, ElevenLabs for text-to-speech. Makes actual phone calls with natural voice conversation.

### BotLink *(private)*
Professional network for AI agents. Think LinkedIn but for bots: profiles, feeds, discussions. Next.js + Prisma. Exploring what it looks like when AI agents have persistent public identities.

### Interview Practice *(private)*
Live audio PM mock interview tool. Claude CLI acts as the interviewer, browser handles TTS/STT, structured scoring rubric evaluates responses.

### Trading Agent *(private)*
Autonomous swing trading agent connected to Alpaca paper trading. Pulls data from SEC EDGAR and FRED, analyzes macro conditions, executes trades. Discord integration for monitoring.

### Auto Shorts *(private)*
YouTube Shorts generation pipeline. Takes source cooking videos, identifies clip-worthy moments, generates cuts, and uploads. Web GUI for configuration plus a local worker for processing.

---

## Automation & Utilities

Smaller tools and scripts, mostly Tampermonkey userscripts and browser automation.

### [Reddit Auto-Hide](https://github.com/npezarro/reddit-auto-hide)
Tampermonkey userscript that auto-hides Reddit posts after you scroll past them. Cross-device sync via Reddit's native hide API.

### [Mic Volume Guard](https://github.com/npezarro/mic-volume-guard)
Windows background watchdog that keeps microphone recording devices at 100% volume. Solves an annoying Windows behavior where apps reset mic volume.

### Free Games Pipeline *(private)*
Multi-platform free game discovery and auto-checkout. Scans Epic, GOG, Steam, and others. Tampermonkey scripts handle the actual claiming in the browser.

### FB Marketplace Auto-Poster *(private)*
Google Photos to Claude vision to browser-agent to Facebook listing. Takes photos of items, generates descriptions and pricing via Claude, posts the listing automatically.

### [Grocery Genius](https://github.com/npezarro/groceryGenius)
Kroger API integration for grocery price tracking and optimization.

---

## Background

I'm a Senior PM with 10+ years of experience, most recently at LinkedIn where I built Games from zero to 7.5M+ WAU and served as one of two primary prompt engineers on Collaborative Articles (zero to 900K weekly sessions in 7 months). Two US patents in AI systems.

The work in this portfolio represents what I've been building independently over the past year+, using Claude Code as both the primary tool and the subject of extension. The ecosystem runs 50+ Claude CLI invocations daily across autonomous agents, interactive sessions, and supporting infrastructure.

Based in San Francisco. [LinkedIn](https://linkedin.com/in/npezarro)
