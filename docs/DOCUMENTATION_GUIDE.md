# Documentation Guide
**Created:** 2025-12-25
**Last Updated:** 2025-12-25

## Purpose
This guide defines how all documentation in this project should be created, maintained, and organized. It ensures consistency for human developers and LLMs working on this project.

---

## Core Principles

1. **Timestamp Everything**: Every document must have creation and last-updated timestamps
2. **Keep It Current**: Remove or archive outdated information
3. **Clear Structure**: Use consistent formatting and hierarchy
4. **Context for LLMs**: Write assuming the reader has no prior context
5. **Version Control Through Archiving**: Move superseded docs to `docs/alt/` with timestamps

---

## File Structure

```
texteditor/
├── README.md                    # Project overview, quick start
├── CHANGELOG.md                 # All changes with timestamps
├── docs/
│   ├── DOCUMENTATION_GUIDE.md   # This file
│   ├── SPECIFICATION.md         # Functional specification
│   ├── ARCHITECTURE.md          # Technical architecture (if needed)
│   └── alt/                     # Archived/superseded documents
│       └── YYYY-MM-DD_filename.md
└── src/                         # Source code
    ├── index.html
    ├── style.css
    └── script.js
```

---

## Document Types

### 1. README.md (Project Root)
- **Purpose**: First point of contact, project overview
- **Must Include**:
  - Project name and brief description
  - Creation and last-updated timestamps
  - Quick start instructions
  - Link to main specification
  - Current status
  - Links to other key docs

### 2. SPECIFICATION.md
- **Purpose**: Defines WHAT the software should do (no implementation details)
- **Must Include**:
  - Timestamps
  - Functional requirements
  - User interactions
  - Expected behaviors
  - Edge cases

### 3. CHANGELOG.md
- **Purpose**: Chronological record of all changes
- **Format**:
  ```markdown
  # Changelog

  ## [YYYY-MM-DD HH:MM] - Description
  ### Added
  - Feature X

  ### Changed
  - Updated Y

  ### Fixed
  - Bug Z

  ### Removed
  - Deprecated feature W
  ```

### 4. Architecture/Technical Docs (Optional)
- **Purpose**: Explains HOW things are implemented
- **Must Include**:
  - Timestamps
  - Technology stack
  - Key design decisions
  - File structure
  - Data flow

---

## Timestamp Format

**Use ISO 8601 dates:**
- Date only: `YYYY-MM-DD` (e.g., 2025-12-25)
- Date and time: `YYYY-MM-DD HH:MM` (e.g., 2025-12-25 14:30)
- Use 24-hour format

**Placement:**
```markdown
# Document Title
**Created:** 2025-12-25
**Last Updated:** 2025-12-25 14:30
```

---

## When to Update vs Archive

### Update Existing Doc When:
- Fixing typos or clarifying existing content
- Adding new information that extends (not replaces) current content
- Updating status or progress
- **Action**: Update "Last Updated" timestamp

### Archive to `docs/alt/` When:
- Complete rewrite of a document
- Major architectural changes that invalidate old docs
- Specification changes that make old spec obsolete
- **Action**:
  1. Copy old file to `docs/alt/YYYY-MM-DD_filename.md`
  2. Add note in new file: "Supersedes: `alt/2025-12-25_filename.md`"
  3. Update both timestamps

---

## Writing Style

### For Humans:
- Use clear, concise language
- Break complex topics into sections
- Use examples where helpful
- Assume reader is competent but unfamiliar with this specific project

### For LLMs:
- Be explicit about context
- Define acronyms and project-specific terms
- Link related documents
- Include file paths when referencing code
- State assumptions clearly

---

## Code Comments

### Inline Comments:
```javascript
// Brief explanation of WHY, not WHAT
// Good: "Prevent race condition when user types quickly"
// Bad:  "Set timeout to 100ms"
```

### File Headers:
```javascript
/**
 * Inverted Mirror Editor - Main Logic
 * Created: 2025-12-25
 *
 * Implements the stack-based text insertion with fixed write point.
 * See: docs/SPECIFICATION.md for functional requirements
 */
```

---

## Review Checklist

Before committing documentation:
- [ ] Timestamps present and updated?
- [ ] All links working?
- [ ] Obsolete information removed or archived?
- [ ] Clear for someone with no context?
- [ ] Formatting consistent with this guide?
- [ ] Code references include file paths?

---

## Questions?

If this guide doesn't cover a situation:
1. Use best judgment following the core principles
2. Document your decision
3. Update this guide if the situation is likely to recur

---

**Note**: This is a living document. Update it as the project's documentation needs evolve.
