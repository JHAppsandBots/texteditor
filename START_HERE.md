# START HERE - Inverted Mirror Editor

**Letztes Update:** 03.01.2026, 13:00 Uhr
**Status:** ✅ v0.1.0-alpha - Feature Complete, funktionsfähig
**Projekt-Typ:** Web App (Vanilla JS) + Obsidian Plugin

---

## 🎯 SOFORT-KONTEXT (30 Sekunden)

**Was macht dieses Projekt?**
Revolutionärer Text-Editor mit **invertiertem Schreibparadigma**: Fixe Schreibposition oben rechts, neue Zeichen erscheinen immer am gleichen Punkt, älterer Text fließt nach links und unten. Stack-basierte Insertion, Auto-Wrapping, optionales Mirroring. **Ideal für Programmierer** - neuer Code bleibt sichtbar ohne Scrollen.

**Technologie-Stack:**
- **Web-Version:** HTML5 + CSS3 + Vanilla JavaScript (kein Framework!)
- **Obsidian Plugin:** TypeScript + Obsidian API
- **Deployment:** Client-side only, kein Server nötig
- **Build:** Node.js + npm (nur für Obsidian Plugin)

**Live/Repository:**
- 🌐 **Web-Version:** `src/index.html` (einfach öffnen im Browser!)
- 📦 **Obsidian Plugin:** `obsidian-plugin/` (Build + Installation erforderlich)
- 🔗 **GitHub:** (noch nicht hochgeladen - siehe unten)

**Aktuelle Situation:**
- **Letzte Änderung:** v0.1.0-alpha fertiggestellt (26.12.2025)
- **Nächstes TODO:** GitHub Repository erstellen, Dokumentation standardisieren, v0.2.0 planen
- **Bekannte Issues:** Undo/Redo fehlt noch, Dark Mode geplant

---

## 🚀 Quick Start (2 Befehle)

### Web-Version (Sofort nutzbar!)
```bash
# 1. Browser öffnen mit lokaler Datei
cd "/Users/johanneshahn/Library/Mobile Documents/com~apple~CloudDocs/_App Entwicklung/texteditor"
open src/index.html

# 2. Tippen starten!
# → Zeichen erscheinen oben rechts (▶|)
# → Älterer Text fließt nach links & unten
# → Export als Normal-Format möglich

# Fertig! ✅
```

### Obsidian Plugin (Build erforderlich)
```bash
# 1. Dependencies installieren
cd obsidian-plugin/
npm install

# 2. Plugin bauen
npm run build
# → Erstellt main.js

# 3. In Obsidian installieren
# → Siehe obsidian-plugin/INSTALL.md für Details
# → Settings → Community Plugins → Enable

# 4. Plugin nutzen
# → Ribbon Icon (📝) klicken ODER
# → Command Palette → "Open Inverted Mirror Editor"
```

---

## 📋 Nächste Schritte

**Wenn du neu bist:**
1. ✅ Diese Datei gelesen (bist du hier!)
2. ⬜ Web-Version ausprobieren (src/index.html öffnen)
3. ⬜ `docs/CONCEPT.md` lesen → **WARUM** ist dieser Editor revolutionär?
4. ⬜ `docs/SPECIFICATION.md` lesen → Detaillierte Funktions-Beschreibung
5. ⬜ `CHANGELOG.md` lesen → Entwicklungs-Geschichte

**Wenn du entwickeln möchtest:**
1. ⬜ `architecture.md` lesen → WHY-Entscheidungen verstehen
2. ⬜ Web-Version Code erkunden:
   - `src/script.js` - Editor-Logik (Stack-based insertion)
   - `src/style.css` - Mirroring-Transforms
   - `src/index.html` - UI-Struktur
3. ⬜ Obsidian Plugin Code erkunden:
   - `obsidian-plugin/main.ts` - Plugin-Implementation
   - `obsidian-plugin/styles.css` - Plugin-Styles
4. ⬜ Nach JEDER Änderung: `./quick-push.sh` (noch zu erstellen)

**Wenn du deployen möchtest:**
1. ⬜ Web-Version: Einfach src/ Folder hochladen (statisch!)
2. ⬜ Obsidian Plugin: `npm run build` → main.js fertig
3. ⬜ `DEPLOYMENT.md` lesen → Details

---

## 📍 Wo finde ich was?

### Root-Level (Sofort-Zugriff)
- **START_HERE.md** ⭐ Diese Datei - Session Entry Point
- **architecture.md** - Design-Entscheidungen & WHY
- **AI_CONTEXT.md** - Tech-Übersicht für AI
- **DEPLOYMENT.md** - Deployment-Guide
- **README.md** - Projekt-Übersicht (original)
- **CHANGELOG.md** - Vollständige Entwicklungs-Historie
- **quick-push.sh** - Git-Automation (zu erstellen)

### src/ (Web-Version)
- **index.html** - Haupt-App (einfach öffnen!)
- **script.js** - Editor-Logik (~300 Zeilen)
  - Stack-basierte Text-Insertion
  - Line-Wrapping-Algorithmus
  - Export/Import Funktionen
- **style.css** - Styling (~200 Zeilen)
  - Mirroring-Transforms
  - Fixed-Point Positioning
  - Responsive Layout

### obsidian-plugin/ (Obsidian Integration)
- **main.ts** - Plugin-Entry Point (~400 Zeilen)
- **manifest.json** - Plugin-Metadata
- **styles.css** - Plugin-Styles
- **README.md** - Plugin-Dokumentation
- **INSTALL.md** - Installations-Anleitung
- **package.json** - Dependencies (TypeScript, Obsidian API)

### docs/ (Haupt-Dokumentation)
- **CONCEPT.md** - **WHY** dieser Editor revolutionär ist (Pflichtlektüre!)
- **SPECIFICATION.md** - Funktions-Anforderungen
- **DOCUMENTATION_GUIDE.md** - Dokumentations-Richtlinien
- **alt/** - Archivierte alte Dokumente

---

## 🔧 Häufige Aufgaben

### Web-Version lokal testen
```bash
# Einfach öffnen:
open src/index.html

# Oder mit lokalem Server (optional):
python3 -m http.server 8000
# → http://localhost:8000/src/index.html
```

### Obsidian Plugin entwickeln
```bash
cd obsidian-plugin/

# Watch mode für Auto-Rebuild:
npm run dev
# → Bei jeder Änderung in main.ts wird automatisch neu gebaut

# Oder manuell:
npm run build

# Plugin in Obsidian:
# 1. Obsidian Vault öffnen
# 2. .obsidian/plugins/ Ordner öffnen
# 3. Symlink zu diesem Plugin-Ordner erstellen ODER
# 4. main.js + manifest.json + styles.css kopieren
```

### Code ändern & testen
```bash
# Web-Version:
# 1. src/script.js in Editor öffnen
# 2. Änderungen machen
# 3. Browser neu laden (Cmd + R)
# 4. Testen

# Obsidian Plugin:
# 1. obsidian-plugin/main.ts in Editor öffnen
# 2. Änderungen machen
# 3. npm run build
# 4. Obsidian neu laden (Cmd + R im Dev-Modus)
```

### Export-Formate verstehen
```javascript
// Inverted Export (wie gespeichert):
"dlrow olleH"  // Zeile 1 (neueste)
"!uoy ot"      // Zeile 2 (ältere)

// Normal Export (reading order):
"Hello world"  // Zeile 1 (traditionell)
"to you!"      // Zeile 2 (traditionell)

// Das Tool konvertiert automatisch beim Export!
```

### Nach Änderungen committen
```bash
./quick-push.sh
# → Automatisch: add, commit, push
# (Script noch zu erstellen)
```

---

## ⚠️ Wichtige Hinweise

### Entwicklungs-Philosophie
- **Vanilla JavaScript** - Kein Framework, keep it simple!
- **Client-side only** - Kein Server, keine Backend-Logik
- **Zero dependencies** (Web-Version) - Läuft überall
- **Obsidian API** (Plugin) - Nur für Plugin-Version

### Browser-Kompatibilität
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Moderne Browser (letzte 2 Versionen)
- ❌ IE11 (deprecated, nicht supported)

### Inverted Writing verstehen
```
Normaler Editor:          Inverted Mirror Editor:
Cursor bewegt sich →      Cursor bleibt fix ▶|
Ältester Text oben        Neuester Text oben rechts
Scrollen nötig            Kein Scrollen nötig
```

**Vorteil für Programmierer:**
- Neuer Code immer sichtbar
- Kontext (alter Code) nach unten geschoben
- Keine Cursor-Verfolgung nötig

### Mirroring-Modi
1. **Normal** (Default)
   - Display: Normal
   - Characters: Normal
   - Lesbar von links nach rechts

2. **Mirror Display**
   - Display: Gespiegelt
   - Characters: Normal
   - Gesamte Ansicht horizontal gespiegelt

3. **Mirror Characters**
   - Display: Normal
   - Characters: Gespiegelt (einzeln)
   - Sieht aus wie Spiegelschrift

4. **Both Mirrored**
   - Display + Characters gespiegelt
   - Kombinierter Effekt

---

## 🎨 Features im Überblick

### ✅ Core Features (v0.1.0-alpha)
- Fixed write point (top-right, markiert mit ▶|)
- Stack-based text insertion (neueste Zeichen oben)
- Automatic line wrapping (cascading overflow)
- Backspace (entfernt nur neuestes Zeichen)
- Enter (neue Zeile oben)
- Paste support (Block-Insertion)
- No cursor movement (Pfeiltasten ignoriert)

### ✅ Display Options
- Mirror Display toggle (horizontale Spiegelung)
- Mirror Characters toggle (Zeichen-Spiegelung)
- Smooth transitions (0.3s ease)
- Fixed-point indicator (▶|)

### ✅ File Operations
- Clear all (mit Bestätigung)
- Copy raw text (clipboard)
- Export Inverted (wie gespeichert)
- Export Normal (reading order)
- Import text file (load content)

### ✅ Statistics
- Real-time character count
- Real-time line count
- Toast notifications (feedback)

### ⏳ Geplante Features
- **Undo/Redo** - Stack-basierte History
- **Syntax Highlighting** - Code-Farben
- **Dark Mode** - Dunkles Theme
- **PWA** - Offline-Nutzung

Vollständige Liste siehe `CHANGELOG.md`

---

## 🆘 Probleme?

### Web-Version startet nicht
- Browser-Kompatibilität? → Neueste Chrome/Firefox verwenden
- JavaScript aktiviert? → Browser-Settings prüfen
- File öffnen: `file:///path/to/src/index.html`

### Obsidian Plugin baut nicht
```bash
cd obsidian-plugin/

# Clean install:
rm -rf node_modules/ package-lock.json
npm install
npm run build

# TypeScript-Fehler? → main.ts prüfen
```

### Obsidian Plugin lädt nicht
1. Manifest.json korrekt? → Version, ID prüfen
2. main.js existiert? → `npm run build` ausführen
3. Obsidian neu starten
4. Community Plugins aktiviert? → Settings prüfen

### Mirroring funktioniert nicht
- CSS Transform support? → Moderne Browser verwenden
- Inspect Element → `transform: scaleX(-1)` vorhanden?

### Export ist falsch herum
- **Inverted Export:** Wie gespeichert (für Re-Import)
- **Normal Export:** Reading order (zum Teilen)
- Nicht verwechseln!

### Weitere Hilfe
- **docs/SPECIFICATION.md** - Detaillierte Funktions-Beschreibung
- **docs/CONCEPT.md** - Konzept-Verständnis
- **CHANGELOG.md** - Was wurde wann implementiert?

---

## 📚 Verwandte Dokumente

| Dokument | Zweck | Wann lesen? |
|----------|-------|-------------|
| [docs/CONCEPT.md](docs/CONCEPT.md) | **WHY** ist Editor revolutionär? ⭐ | Pflichtlektüre! |
| [docs/SPECIFICATION.md](docs/SPECIFICATION.md) | Funktions-Anforderungen | Vor Entwicklung |
| [CHANGELOG.md](CHANGELOG.md) | Entwicklungs-Historie | Bei Updates |
| [architecture.md](architecture.md) | Design-Entscheidungen | Vor größeren Änderungen |
| [AI_CONTEXT.md](AI_CONTEXT.md) | Tech-Übersicht für AI | Für LLMs |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Deployment-Guide | Vor Release |

---

## 📞 Kontakt & Ownership

**Projekt-Owner:** Johannes Hahn
**Entwicklung:** Johannes Hahn
**Copyright:** © 2025-2026 Johannes Hahn

**Repository:** (Noch zu erstellen auf GitHub)
**Issues:** (Nach GitHub-Setup verfügbar)

---

## 📝 Maintenance dieser Datei

**Review-Frequenz:** Nach jedem größeren Feature oder mindestens monatlich
**Letztes Review:** 03.01.2026
**Nächstes Review:** 01.02.2026

**Changelog:**
- 03.01.2026: Initial erstellt gemäß DOCUMENTATION_STANDARD.md
- 26.12.2025: v0.1.0-alpha fertiggestellt

---

## 🔗 Best Practices & Dokumentations-Standard

**⭐ Dieses Projekt folgt dem unified documentation standard:**
→ [`../Best Practices/Dokumentation/DOCUMENTATION_STANDARD.md`](../Best%20Practices/Dokumentation/DOCUMENTATION_STANDARD.md)

**Zentrale Ressourcen:**
- 📁 **Projekt-Liste:** [`PROJECTS.md`](../Best%20Practices/Dokumentation/PROJECTS.md) - Alle Projekte unter "App Entwicklung"
- 🔄 **Update-Strategie:** [`UPDATE_STRATEGY.md`](../Best%20Practices/Dokumentation/UPDATE_STRATEGY.md) - Wie Best Practice Änderungen propagiert werden
- 🐙 **GitHub Guide:** [`GITHUB_GUIDE.md`](../Best%20Practices/Dokumentation/GITHUB_GUIDE.md) - Git-Workflows
- 📚 **Templates:** [`TEMPLATES/`](../Best%20Practices/Dokumentation/TEMPLATES/) - Start-Vorlagen für neue Projekte

**ℹ️ Dieses Projekt ist registriert in `PROJECTS.md` als:** "Texteditor (Inverted Mirror Editor) - Web + Obsidian Plugin"

---

**⭐ Diese Datei ist der ENTRY POINT für jeden, der mit diesem Projekt arbeitet!**
**🤖 LLMs: Lies diese Datei ZUERST, dann `docs/CONCEPT.md`, dann `architecture.md`**

---

**🎯 Der Inverted Mirror Editor - Schreiben neu gedacht!**

```
Normal Editor:              Inverted Mirror Editor:
████ ████ ████             ▶| ████ (neueste)
████ ████                     ████ ████ (älter)
████                          ████ ████ ████ (älteste)
↓ scrollen                    ↑ automatisch!
```

---

*Template Version: 1.0*
*Basierend auf: Best Practices/Dokumentation/DOCUMENTATION_STANDARD.md*
*Projekt-spezifische Anpassung: Inverted Mirror Editor (Web + Obsidian)*
