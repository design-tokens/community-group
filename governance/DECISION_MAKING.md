# **Design Tokens Community Group \- Decision-Making Framework**

**Last updated 12/16/2025**

## Overview

The Decision-Making Framework implements a tiered decision-making system that matches the approval process to the impact of the change in order to remove the need for full consensus on every decision while maintaining community input for significant changes.

## Core Principles

- **Right-sized process**: Match the process weight to the decision impact
- **Transparent by default**: All decisions happen in public spaces
- **Time-bounded**: Every decision has a clear timeline
- **Action-oriented**: Require specific alternatives, not just objections
- **Clear ownership**: Every decision has clear approvers

## Decision Tiers

### Tier 1: Editorial Changes (Immediate)

#### Scope

Typo fixes, grammar corrections, formatting improvements, documentation updates, meeting notes

#### Process

- Any editor can merge immediately
- Create PR for transparency and history
- Use `editorial` GitHub label

#### Examples

Fixing spelling errors, updating formatting for consistency, correcting broken links in documentation

### Tier 2: Standard Changes (3-week review)

#### Scope

Bug fixes, clarifying examples, small non-conflicting additions, updating references, new features, minor breaking changes, new token types

#### Process

- Create PR with `standard-change` label
- Post PR link and a brief summary to the DTCG Slack channel and the email list.
- 3-week comment period
- Need approval from 2 editors
- No unresolved objections from editors

#### Examples

Adding HSL examples to complement RGB, clarifying token usage, fixing incorrect code samples, adding new token properties

### Tier 3: Major Decisions (6-week full process)

#### Scope

New specification modules, major breaking changes, architectural decisions, deprecating features, governance changes, ecosystem-wide changes

#### Process

- Create formal proposal in `/proposals` directory
- Add `major-decision` label
- Include RFC summary (problem, solution, impact, alternatives)
- Announce the formal proposal in Slack, GitHub Discussions, and the email list (using the RFC summary).
- 4-week RFC period with at least one public meeting
- Author creates response document addressing feedback
- 1-week voting period (need 2/3 majority of editors). The result of the vote and a record of editor attendance/voting will be published per the Communication and Transparency section.
- 1-week final objection period

#### RFC Summary Format

- **Problem**: What issue does this solve?
- **Solution**: Brief technical description
- **Impact**: Breaking changes? Implementation effort? Migration path?
- **Alternatives**: What other approaches were considered?

## Communication and Transparency

To ensure the community is informed and can participate effectively, all key group activities and decisions will follow a clear communication process.

- **Meeting Announcements:** Agendas and a meeting announcement will be shared on Slack\* and the email list at least 24 hours in advance of any scheduled general or focused working session.
- **Meeting Notes and Minutes:**
  - Notes for all general and focused working sessions will be finalized and posted to the GitHub repository within 48 hours of the meeting conclusion.
  - A summary of the notes, along with a direct link, will be distributed to the email list shortly after posting to GitHub.
- **Contribution and Attendance Records (Transparency):**
  - Attendance at meetings (for Active Contributor qualification) and formal voting records (for Tier 3 decisions) will be tracked transparently and made available in a publicly accessible record in the GitHub repository.
- **Quarterly Communication Roll-up:** The Chair will send a monthly update to the email list summarizing key actions, upcoming decisions, and progress across all specification modules.

## Objection Handling

**Valid objections must**:

- Be technically grounded with specific rationale
- Propose alternatives or improvements
- Be submitted during comment period
- Address new issues not previously discussed

**Resolution process** (max 1 week):

1. Direct discussion between objector and proposer
2. Group facilitation if needed
3. Editor vote if unresolved

## Special Circumstances

### Emergency Process

For critical issues (security, major bugs):

- Any 2 editors can approve immediate fix
- Create documenting PR within 24 hours
- Full review at next meeting

### Experimental Features

For testing new ideas:

- Add as "experimental" using Tier 2 process
- Clearly marked as unstable
- Tier 3 process to promote to stable

## Decision Records

All Tier 3 decisions require a brief record:

- Date, tier, status, links
- Summary of decision and rationale
- Impact and follow-up actions

## Timeline Notes

- December 15 \- January 5: Process paused
- Major conferences: Can extend deadlines by 1 week
- Must announce timeline exceptions when creating PR/Issue

## Review

This framework will be reviewed after 6 months or 20 decisions, whichever comes first. Updates use Tier 3 process (Tier 2 for minor clarifications).
