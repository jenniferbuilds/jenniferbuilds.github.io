---
title: 'Building an AI Agent Runtime'
description: 'How tool calling, memory, skills, and workflows fit together in one system.'
pubDate: 2026-09-13
tags: ['Agent Runtime', 'Tool Calling', 'Memory', 'Skills']
category: 'AI & Agents'
featured: true
---

After building a few agents one tool at a time, I started extracting the plumbing into a runtime. These are my notes on how the pieces fit.

## The core loop

Everything hangs off one loop:

```
observe ──▶ decide ──▶ act ──▶ observe
   ▲                              │
   └────── memory ◀── result ◀────┘
```

The runtime's job is to make this loop *boring*: bounded, logged, interruptible, retryable. If your agent loop can't be paused and inspected, you don't have a runtime — you have a script.

## Tool registry, not tool pile

Tools are registered with more than a function:

```python
Tool(
    name='search_jobs',
    schema=SearchJobsInput,
    fn=search_jobs,
    timeout_s=20,
    cost='free' | 'paid',
    side_effects=False,
)
```

The metadata matters. Cost and side-effect flags let the runtime enforce budgets and ask for confirmation before a paid or mutating call — policy lives in the runtime, not in the prompt.

## Skills are versioned packages

A *skill* = instructions + the tools it assumes + examples. Packaging them (like `job-search@0.3`) means I can load, pin, and A/B them, and answer "what changed" when behavior drifts. Loading all skills into the system prompt doesn't scale past a handful; the runtime lists available skills and loads instructions on demand.

## Three memory layers

- **Scratchpad** — the working context of the current loop. Ephemeral by design.
- **Episodic** — what happened: actions, outcomes, timestamps. Append-only log, searchable. This is where "what did we try before?" gets answered.
- **Semantic** — distilled facts and preferences. Written *deliberately* (often by a reflect step), because memory written blindly becomes a vector database of noise.

The load-bearing insight: retrieval quality depends on what you write, not which embedding you pick.

## Workflows inside the runtime

Not everything is agentic. Deterministic sequences (fetch → parse → store) run as plain workflows — cheaper, testable, zero LLM cost. The agent calls workflows as tools. Agents for judgment, workflows for plumbing.

## The eval harness is part of the runtime

Every prompt, skill, or model change runs a small task suite with known-good outcomes. If the harness doesn't run before the deploy, regressions ship silently. This is the piece everyone bolts on later; it belongs in the foundation.

## What I'd change

Start with the harness and the episodic log. I built tool abstractions first and flew blind for weeks. Instrumentation first, cleverness second.
