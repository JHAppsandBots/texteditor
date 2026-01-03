# Inverted Mirror Editor
**Created:** 2025-12-25
**Last Updated:** 2025-12-25
**Status:** Initial Development (Feature Complete for v0.1.0-alpha)
**Version:** 0.1.0-alpha

---

## Overview

A revolutionary text editor with an unconventional writing paradigm that's surprisingly intuitive:
- **Fixed write point** at top-right corner (cursor never moves)
- **Stack-based insertion**: new characters always appear at the fixed point, older text flows left and down
- **Auto-wrapping**: text automatically wraps to new lines when reaching the left edge
- **Optional mirroring**: toggle character and display mirroring for different visual modes
- **No cursor movement**: all input happens at the fixed point - your eyes never need to track the cursor

This creates a unique writing experience where the time flow is inverted (newest = top-right, oldest = bottom-left) with perfect context awareness. **Ideal for programmers** who need to write new code while maintaining visibility of earlier code without scrolling.

---

## Quick Start

### Web Version
1. Open `src/index.html` in a modern web browser
2. Start typing - characters appear at the top-right fixed point (marked with ▶|)
3. Watch as older text flows left and down automatically
4. Try the display toggles to experiment with mirroring modes
5. Export in normal format to save your text in traditional reading order

**Requirements:**
- Modern web browser (Chrome, Firefox, Safari, Edge - last 2 versions)
- JavaScript enabled
- No server required (runs entirely client-side)

### Obsidian Plugin
1. Follow the [installation guide](obsidian-plugin/INSTALL.md)
2. Enable the plugin in Obsidian Settings → Community Plugins
3. Click the edit icon (📝) in the ribbon or use Command Palette
4. Start writing in the Inverted Mirror Editor within Obsidian!

**Requirements:**
- Obsidian 0.15.0 or later
- Node.js and npm (for building)

See [obsidian-plugin/README.md](obsidian-plugin/README.md) for detailed usage.

---

## Project Structure

```
texteditor/
├── README.md                          # This file
├── CHANGELOG.md                       # Development history
├── docs/
│   ├── DOCUMENTATION_GUIDE.md         # How to document this project
│   ├── SPECIFICATION.md               # Functional requirements
│   ├── CONCEPT.md                     # Why this editor is revolutionary
│   └── alt/                           # Archived documents
├── src/                               # Web version
│   ├── index.html                     # Main application
│   ├── style.css                      # Styling and mirroring
│   └── script.js                      # Editor logic
└── obsidian-plugin/                   # Obsidian plugin
    ├── main.ts                        # Plugin implementation
    ├── manifest.json                  # Plugin metadata
    ├── styles.css                     # Plugin styles
    ├── README.md                      # Plugin documentation
    ├── INSTALL.md                     # Installation guide
    └── package.json                   # Dependencies
```

---

## Key Features

### Core Functionality
- ✅ **Fixed write point** (top-right) - cursor never moves
- ✅ **Stack-based text insertion** - newest at top, oldest at bottom
- ✅ **Automatic line wrapping** - cascading overflow when reaching left edge
- ✅ **Backspace** removes newest character only
- ✅ **Enter** adds line breaks (new line appears at top)
- ✅ **No cursor movement** - arrows/clicks don't change write point
- ✅ **Paste support** - inserts block of text at fixed point

### Display Options
- ✅ **Mirror Display toggle** - horizontally flips entire editor view
- ✅ **Mirror Characters toggle** - mirrors individual characters
- ✅ **Default: normal characters** - toggle to enable mirroring
- ✅ **Smooth transitions** - 0.3s ease animations

### File Operations
- ✅ **Clear all content** (with confirmation)
- ✅ **Copy raw text** to clipboard (unmirrored)
- ✅ **Export Inverted** - save in raw inverted format
- ✅ **Export Normal** - save in traditional reading order
- ✅ **Import text file** - load content into editor

### Statistics & Feedback
- ✅ **Real-time character count**
- ✅ **Real-time line count**
- ✅ **Toast notifications** for all operations
- ✅ **Visual feedback** for actions

### Future Enhancements
- ⏳ Undo/Redo functionality
- ⏳ Syntax highlighting for code
- ⏳ Dark mode theme
- ⏳ PWA support for offline use

---

## Documentation

- **[Concept](docs/CONCEPT.md)**: Why this editor is revolutionary (highly recommended read!)
- **[Specification](docs/SPECIFICATION.md)**: Detailed functional requirements
- **[Documentation Guide](docs/DOCUMENTATION_GUIDE.md)**: How to maintain project documentation
- **[Changelog](CHANGELOG.md)**: Development history and all features

---

## Development Notes

### Technology Stack
- **HTML5**: Structure
- **CSS3**: Layout and mirroring (`transform: scaleX(-1)`)
- **Vanilla JavaScript**: Logic (no frameworks)

### Design Decisions
1. **Web-first approach**: Rapid prototyping and cross-platform testing
2. **No frameworks**: Keep it simple and dependency-free
3. **Client-side only**: No server needed, easy to share and test

### Future Considerations
- Convert to Progressive Web App (PWA) for installability
- Native iOS/macOS version if concept proves valuable
- Undo/Redo stack implementation

---

## For LLM/AI Assistants

When working on this project:
1. **Read** `docs/DOCUMENTATION_GUIDE.md` first to understand documentation standards
2. **Consult** `docs/SPECIFICATION.md` for functional requirements
3. **Update** CHANGELOG.md with all changes (use timestamps)
4. **Update** this README's "Last Updated" timestamp when making changes
5. **Archive** superseded documents to `docs/alt/` with date prefix

---

## License

[To be determined]

---

## Contact

[To be added]

---

**Legend:**
- ✅ Implemented
- ⏳ Planned
- 🔄 In Progress
- ❌ Not Planned
