---
title: 'What Actually Makes an AI Agent?'
description: 'From LLM calls to tools, memory, planning, and execution — a working definition that holds up in practice.'
pubDate: 2026-09-11
tags: ['AI Agents', 'LLMs', 'Tool Calling']
category: 'AI & Agents'
featured: true
---

Every demo these days is an "agent". Most of them aren't. Here's the definition I actually work with.

## A working definition

A single LLM call is not an agent. A chain of LLM calls isn't one either. To me, an agent is a system where **the model decides what happens next based on what it observes**:

```
while not done:
    observation = environment.read()
    action = model.decide(observation, memory)
    result = environment.execute(action)
    memory.append(action, result)
```

If there is no loop where outcomes feed back into decisions, it's a pipeline — useful, but not an agent.

## The four ingredients

1. **Tools** — functions the model can invoke, with schemas it can reason about. An agent without tools is a chatbot.
2. **Memory** — at minimum a working scratchpad; ideally episodic (what happened) and semantic (facts worth keeping).
3. **Planning** — decomposing a goal into steps. Sometimes explicit (a planner node), often implicit in the reasoning tokens.
4. **Execution environment** — something that runs actions, returns observations, and enforces *stop conditions*.

## The autonomy spectrum

Not all "agents" are equally agentic:

- **Scripted workflow** — steps hard-coded; LLM fills in the blanks.
- **LLM router** — the model picks among pre-built branches.
- **Guarded agent** — free-form loop, but with budgets, allowlists, and human checkpoints.
- **Open-ended agent** — sets its own sub-goals. Rarely what you want in production.

Most good systems sit left of center. Autonomy is a budget, not a feature.

## RAG is not an agent

RAG is retrieve-then-generate in a single pass. No decisions, no loop. It's a *capability* — often one of the best tools to put behind an agent — but by itself it's retrieval plus generation, nothing more.

## A checklist I actually use

- Can it choose between more than one action?
- Does an action's result change what it does next?
- Can it recover when a tool fails?
- Does it know when to stop?

If the first two answers are "no", you have a workflow. That's fine — workflows are cheaper, testable, and deterministic. Reach for agency only when the path genuinely can't be enumerated in advance.
