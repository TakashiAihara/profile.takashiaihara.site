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
  req[Request] --> task[Task on Kaneo board]
  task --> clone[Own clone via ccx]
  clone --> work[Agent works]
  work -->|decision needed| queue[Decision queue in markdown]
  queue -->|line comments in akapen| work
  work --> pr[Pull request]
  pr --> review[Adversarial + external reviews]
  review --> merge[Merge]
  merge --> retro[Retrospective]
  retro -->|new rule / skill / tool| rules[(Rules repository)]
  rules -.-> work
</pre>

## One session, one scope

- Each agent session owns exactly one task and works in its own clone of the repository.
- Clones are created by [ccx](https://github.com/TakashiAihara/ccx) as fully independent copies in under a second, so several sessions can check out the same branch without git worktrees.
- Every session is attached to a task on a self-hosted [Kaneo](https://kaneo.app) board through [kaneo-cli](https://github.com/TakashiAihara/kaneo-cli), so I can see which session is working on what, and the next step is recorded before a session leaves.

## Humans decide, agents keep moving

- Reversible choices are made by the agent and reported afterwards.
- Irreversible or outward-facing actions wait for my explicit approval.
- When a decision is needed, the agent queues it in a markdown file and keeps working on whatever does not depend on it. I answer with line comments in [akapen](https://github.com/TakashiAihara/akapen), which feeds the comments back to the session.
- Design discussions also happen in markdown reviewed line by line, not in a scrolling chat.

## Rules as code

- Agent behavior lives in a versioned repository: global instructions, task-specific skills, hooks that block known mistakes, and small CLIs.
- Changes to those rules go through pull requests like any other code.
- After each scope, the session runs a retrospective and turns what went wrong into a rule, a skill or a tool, so the same mistake is not repeated.

## Review and verification

- Every pull request gets an adversarial review by a dedicated agent playing the strictest human reviewer, plus independent reviews from other model families and CodeRabbit.
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
