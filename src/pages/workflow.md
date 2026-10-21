---
layout: ../layouts/BlogPost.astro
title: How I Develop
description: TakashiAihara's development workflow with parallel AI coding agents
pubDate: 2026-10-15
---

I run many Claude Code sessions in parallel and keep myself in the loop only where a human decision matters. Most of the workflow below is backed by tools I built and publish on GitHub.

## The flow of one task

<pre class="mermaid">
flowchart TD
  req([Me, with a request]) --> task[Task on Kaneo board]
  task --> clone[Own clone via ccx]
  clone --> plan[Plan in markdown]
  plan -->|extract decisions| queue[Decision queue in markdown]
  plan <-->|line comments via MCP channel| me([Me, in akapen])
  queue <-->|answers via MCP channel| me
  plan --> work[Agent works]
  queue -->|decided| work
  work -->|new decision| queue
  me -->|question| qa[Q&A document in markdown]
  qa -->|answer, line comments via MCP channel| me
  work --> pr[Pull request]
  pr --> review[Adversarial review]
  pr --> ext[External reviews: Antigravity, Copilot, Codex, CodeRabbit]
  review --> merge[Merge]
  ext --> merge
  merge --> retro[Retrospective]
  retro -->|new rule / skill / tool| rules[(Rules repository)]
  rules -.-> work
  classDef human fill:#dbeafe,stroke:#1d4ed8,color:#1e3a8a
  classDef claude fill:#fde2c4,stroke:#c2410c,color:#7c2d12
  classDef other fill:#dcfce7,stroke:#15803d,color:#14532d
  classDef store fill:#f3f4f6,stroke:#6b7280,color:#374151
  class req,me human
  class task,clone,plan,work,queue,qa,pr,review,merge,retro claude
  class ext other
  class rules store
</pre>

<p><span style="background:#dbeafe;border:1px solid #1d4ed8;padding:0 0.4em">blue</span> is me, <span style="background:#fde2c4;border:1px solid #c2410c;padding:0 0.4em">orange</span> is Claude Code, <span style="background:#dcfce7;border:1px solid #15803d;padding:0 0.4em">green</span> is other AI agents, <span style="background:#f3f4f6;border:1px solid #6b7280;padding:0 0.4em">gray</span> is a repository.</p>

## One session, one scope

- Each agent session owns exactly one task and works in its own clone of the repository.
- Clones are created by [ccx](https://github.com/TakashiAihara/ccx) as fully independent copies in under a second, so several sessions can check out the same branch without git worktrees.
- Every session is attached to a task on a self-hosted [Kaneo](https://kaneo.app) board through [kaneo-cli](https://github.com/TakashiAihara/kaneo-cli), so I can see which session is working on what, and the next step is recorded before a session leaves.
- When a session wraps up, follow-ups that outlive it become new tasks on the board instead of notes in the chat, so a later session can pick them up.

## Sessions supported by ccx-agent

- A resident [ccx-agent](https://github.com/TakashiAihara/ccx) runs on every machine, takes Claude Code hook events and forwards them to one ccx-center, so a single CLI lists every session on every machine.
- It also stores live transcripts, so a finished session can be searched, or resumed on another machine.
- Idle sessions I opt in are kept warm by the agent, so their prompt cache stays hot while they wait for my answer.

## Humans decide, agents keep moving

- Reversible choices are made by the agent and reported afterwards.
- Irreversible or outward-facing actions wait for my explicit approval.
- Before implementing, the agent writes its plan as markdown and extracts every point that needs my decision into a separate decision queue, so the plan stays a plan and the questions are in one place.
- I review both in [akapen](https://github.com/TakashiAihara/akapen) with line comments: the plan for direction, the decision queue for answers.
- akapen is registered as a Claude Code MCP channel, so each comment is pushed into the running session the moment I write it. The session revises the plan or applies the decision and replies on the thread, so I steer from inside the loop instead of rewriting prompts.
- Decisions that come up during implementation go to the same queue, and the agent keeps working on whatever does not depend on them.
- When I ask a question, the answer goes into a Q&A document in markdown rather than the chat. Follow-ups are line comments on that document, so the answers stay readable later instead of scrolling away.
- Design discussions also happen in markdown reviewed line by line, not in a scrolling chat.

## Rules as code

- Agent behavior lives in a versioned repository: global instructions, task-specific skills, hooks that block known mistakes, and small CLIs.
- Changes to those rules go through pull requests like any other code.

## Every session ends with a retrospective

- When a session's scope is done, it runs a retrospective before closing instead of just stopping.
- The retrospective reads the session itself: my corrections, the comments I left in akapen, and the commands the agent actually ran.
- What went wrong becomes a new rule, a skill or a tool, and what was tedious becomes a candidate for automation. A reviewer agent decides which proposals to adopt, and they are merged through pull requests.
- The next session starts with the improved rules, so the development process itself improves one session at a time.

## Review and verification

- Every pull request gets an adversarial review by a dedicated agent playing the strictest human reviewer, plus independent reviews from other model families (Antigravity, GitHub Copilot, Codex and others) and CodeRabbit.
- Tests are checked with negative controls: the implementation is deliberately broken to confirm the test actually fails.
- When acceptance tests can be written first, implementation is delegated to a smaller model, while the main agent keeps the spec, the tests and the acceptance check.
- "Done" means the effect was observed, not that the code ran.

## Everything leaves a record

- Investigations, setups and abandoned attempts all end as a markdown note merged into a knowledge repository.
- Session history is searchable with [cchist](https://github.com/TakashiAihara/cchist), and commits and pull requests carry a session id so any change can be traced back to the conversation that produced it.

<script type="module">
  import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11.4.1/dist/mermaid.esm.min.mjs";
  mermaid.initialize({ startOnLoad: true, theme: "neutral" });
</script>
