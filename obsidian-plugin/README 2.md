# Inverted Mirror Editor - Obsidian Plugin

**Version:** 0.1.0
**Created:** 2025-12-26
**Author:** Johannes Hahn

[![Obsidian](https://img.shields.io/badge/Obsidian-0.15.0+-7C3AED?logo=obsidian&logoColor=white)](https://obsidian.md/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📝 What is This?

A revolutionary text editor plugin for Obsidian where **the cursor never moves**. Instead of chasing a moving cursor across your screen, text flows away from a fixed write point at the top-right corner.

```
Traditional Editor:          Inverted Mirror Editor:
H|                          ▶H|
He|                         ▶eH|
Hello|                      ▶lleH|
Hello World|                ▶dlroW lleH|
```

Your eyes stay in **one place**. Zero scrolling, zero cursor tracking, perfect context awareness.

---

## ✨ Key Features

- **🎯 Fixed Write Point** - Cursor stays at top-right corner
- **📚 Stack-Based Editing** - New lines appear at top, old ones flow down
- **🔄 Automatic Line Wrapping** - Cascading overflow handling
- **💾 File Integration** - Works with your existing Obsidian notes
- **⚡ Auto-Save** - Saves every 30 seconds (configurable)
- **📊 Real-Time Stats** - Character and line count
- **🎨 Theme-Aware** - Adapts to your Obsidian theme

---

## 🚀 Quick Start

### Installation

```bash
# 1. Navigate to plugin directory
cd "/path/to/texteditor/obsidian-plugin"

# 2. Install dependencies
npm install

# 3. Build plugin
npm run build

# 4. Copy to your vault
cp main.js manifest.json styles.css "/path/to/vault/.obsidian/plugins/inverted-mirror-editor/"

# 5. Restart Obsidian and enable plugin
```

### First Use

1. **Open any note** in Obsidian
2. **Press `Cmd + P`** (Command Palette)
3. **Type:** "Open Current Note in Inverted"
4. **Start writing!** Text appears at the fixed point (▶|)

---

## 📖 Usage

### Commands

| Command | Description |
|---------|-------------|
| **Open Current Note in Inverted Mirror Editor** | Opens active note in inverted view |
| **Open New Inverted Mirror Editor** | Opens blank inverted editor |

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + S` | Save to file |
| `Cmd/Ctrl + C` | Copy to clipboard |
| `Backspace` | Delete newest character |
| `Enter` | New line (appears at top) |

### Toolbar

- **💾 Save** - Manually save current content
- **📄 Save As New** - Create new file with timestamp
- **🗑️ Clear** - Delete all content
- **📋 Copy** - Copy to clipboard (normal format)

---

## 🎮 How It Works

### The Concept

In traditional editors, **you** track the cursor:
```
Line 1: H|
Line 2: He|
Line 3: Hello|  ← Where is it now?
```

In Inverted Mirror Editor, **text** moves away from a fixed point:
```
▶|              ← Always here (top-right)
Hello
World
Previous content
```

### Technical Implementation

**Internal Storage:**
```typescript
lines = [
  "olleH",      // "Hello" reversed (newest)
  "dlroW"       // "World" reversed (older)
]
```

**Saved to File:**
```markdown
World
Hello
```

Everything saves in **normal format** - only the editing view is inverted!

---

## ⚙️ Settings

**Access:** Settings → Inverted Mirror Editor

### Auto-Save
- **Default:** ON
- **Interval:** 30 seconds
- Automatically saves changes in background

### Max Line Length
- **Default:** 100
- **Range:** 20-150
- Characters per line before automatic wrapping

---

## 💡 Use Cases

### For Writers
✍️ Draft articles with earlier paragraphs always visible
📖 Maintain narrative flow with perfect context
🔍 Reference earlier points without scrolling

### For Researchers
📚 Build literature reviews with previous citations visible
💭 Connect ideas with earlier thoughts in view
📝 Take notes with chronological context

### For Programmers
💻 Write new code with previous functions visible
🐛 Debug with full context always present
📋 Document APIs with earlier examples in sight

### For Note-Takers
📓 Meeting notes with earlier discussion visible
✅ To-do lists that grow from top
🧠 Brainstorming with idea history present

---

## 🏗️ Project Structure

```
obsidian-plugin/
├── main.ts              # Plugin source code
│   ├── InvertedMirrorPlugin      # Main plugin class
│   ├── InvertedMirrorView        # Custom view implementation
│   └── InvertedMirrorSettingTab  # Settings UI
├── manifest.json        # Plugin metadata
├── styles.css           # Styling (theme-aware)
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript configuration
├── esbuild.config.mjs   # Build configuration
├── README.md            # This file
├── OBSIDIAN-GUIDE.md    # Comprehensive documentation
└── INSTALL.md           # Installation guide
```

---

## 🔧 Development

### Build Commands

```bash
# Install dependencies
npm install

# Development mode (auto-rebuild)
npm run dev

# Production build
npm run build
```

### Architecture

```
Plugin Registration:
  InvertedMirrorPlugin.onload()
    ├── Register custom view type
    ├── Add ribbon icon
    ├── Add commands
    └── Add settings tab

View Lifecycle:
  InvertedMirrorView.onOpen()
    ├── Create UI elements
    ├── Setup event listeners
    └── Initialize auto-save

Editing Flow:
  handleKeyDown()
    ├── insertCharacter() → prepend to line
    ├── checkLineWrap() → cascade overflow
    └── updateDisplay() → render view

Saving:
  saveToFile()
    ├── Reverse characters in each line
    ├── Reverse line order
    └── Write to vault
```

### Key Classes

**InvertedMirrorPlugin** - Main plugin
- Registers view type
- Adds commands and ribbon icon
- Manages settings

**InvertedMirrorView** - Custom view extending ItemView
- Handles editing logic
- Manages internal state
- Renders display
- Integrates with vault

**InvertedMirrorSettingTab** - Settings UI
- Auto-save toggle
- Max line length configuration

---

## 🐛 Troubleshooting

### Plugin Not Loading
```bash
# Check console for errors
Cmd/Ctrl + Shift + I

# Verify files exist
ls ~/.obsidian/plugins/inverted-mirror-editor/
# Should show: main.js, manifest.json, styles.css

# Rebuild plugin
npm run build
```

### Commands Not Showing
1. Reload Obsidian: `Cmd/Ctrl + R`
2. Disable and re-enable plugin
3. Check plugin version is 0.1.0+

### Save Not Working
1. Verify file permissions
2. Check auto-save setting
3. Try manual save: `Cmd/Ctrl + S`
4. Check console for errors

---

## 📚 Documentation

- **[OBSIDIAN-GUIDE.md](OBSIDIAN-GUIDE.md)** - Comprehensive guide
  - Detailed usage instructions
  - Technical architecture
  - FAQ and troubleshooting

- **[INSTALL.md](INSTALL.md)** - Installation guide
  - Step-by-step installation
  - Development setup
  - Verification steps

- **[Main Project](../README.md)** - Overall project
  - Web version
  - Concept documentation
  - Design philosophy

---

## 🗺️ Roadmap

### Planned Features

- [ ] **Undo/Redo** - Full undo history
- [ ] **Multiple Views** - Open multiple inverted editors
- [ ] **Customizable Position** - Choose fixed point location
- [ ] **Syntax Highlighting** - Code block support
- [ ] **Custom Themes** - Color customization
- [ ] **Import Wizard** - Convert existing notes
- [ ] **Vim Mode** - Vi-like keybindings (if possible)
- [ ] **Mobile Optimization** - Better touch support

### Known Limitations

- No undo/redo (planned for v0.2.0)
- Single inverted view at a time
- Fixed write point position (top-right only)
- Arrow key navigation disabled (by design)

---

## 🤝 Contributing

Contributions welcome! Areas of interest:

- Performance optimization
- Mobile experience
- Accessibility improvements
- Additional settings/customization
- Bug fixes

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🙏 Credits

**Concept & Implementation:** Johannes Hahn
**Inspired by:** Fixed-point writing paradigm
**Built with:** Obsidian Plugin API, TypeScript, CodeMirror
**Created:** 2025-12-26

---

## 🔗 Links

- **Main Project:** [Inverted Mirror Editor](../README.md)
- **Concept Documentation:** [CONCEPT.md](../docs/CONCEPT.md)
- **Technical Specification:** [SPECIFICATION.md](../docs/SPECIFICATION.md)
- **Web Version:** [src/](../src/)

---

## 📞 Support

- **Documentation:** See [OBSIDIAN-GUIDE.md](OBSIDIAN-GUIDE.md)
- **Issues:** GitHub Issues (link TBD)
- **Questions:** Check FAQ in guide

---

**"The cursor should serve the writer, not the other way around."**

---

*Last updated: 2025-12-26*
