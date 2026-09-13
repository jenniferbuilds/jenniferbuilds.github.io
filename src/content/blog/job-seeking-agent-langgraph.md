---
title: 'Designing a Job-Seeking Agent with LangGraph'
description: 'Architecture for search, ranking, resume tailoring, and application tracking.'
pubDate: 2026-09-12
tags: ['LangGraph', 'AI Agents', 'Projects']
category: 'AI & Agents'
featured: true
---

Job hunting is a pipeline problem, not a chat problem. This is how I structured it as a graph instead of a free-form agent.

## Why a graph, not a free-form agent

The stages are known in advance: find postings → dedupe → rank by fit → tailor the resume → track the application. When the path *can* be enumerated, a workflow beats an open-ended agent: deterministic order, retryable nodes, testable edges, and cheap to run. LangGraph gives me that, plus checkpoints where a human should sign off.

## The graph

```
fetch_jobs ──▶ dedupe ──▶ rank ──▶ tailor ──▶ review ──▶ track
                │            │          │          │
              drop         score      LLM      human in
              dupes        fit       rewrite   the loop
```

- **fetch_jobs** — pull from sources, normalize into a common `Posting` schema. Pure code, no LLM.
- **dedupe** — same role posted on five boards; fuzzy-match on company + title + description hash.
- **rank** — embed both resume and JD, cosine similarity as a *feature* (not a verdict), combined with hard constraints (location, level, salary band) into a fit score.
- **tailor** — LLM rewrites bullets to surface relevant experience. Constraint: it may reorder and rephrase, never invent.
- **review** — graph *pauses* here. I read the tailored resume and the match rationale, approve or reject.
- **track** — persist to a store: status, dates, links, notes.

## State schema

```python
class JobState(TypedDict):
    postings: list[Posting]
    ranked: list[RankedPosting]
    tailored: ResumeDraft | None
    decision: Literal['approved', 'rejected'] | None
    errors: list[NodeError]
```

Keep state explicit and boring. If a node can retry, it must be able to rebuild its outputs from state alone.

## Lessons so far

- **Ranking is the node worth investing in.** A weak tailor is annoying; a weak ranker wastes the entire pipeline.
- **Human checkpoints are features, not friction.** Interrupting before `tailor → track` is what makes this trustworthy.
- **Log why, not just what.** Each ranked posting stores the reasons. Debugging "why was this skipped" should take seconds.

Next: evaluation — a small labeled set of postings to regression-test the ranker when I tweak prompts or weights.
