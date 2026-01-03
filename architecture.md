# Architektur-Entscheidungen - Inverted Mirror Editor

**Version:** 1.0
**Erstellt:** 03.01.2026
**Letzte Aktualisierung:** 03.01.2026

---

## 🎯 Projekt-Übersicht

**Zweck:** Revolutionärer Text-Editor mit invertiertem Schreibparadigma
**Kern-Konzept:** Fixed write point (top-right), stack-based insertion, automatic cascading
**Zielgruppe:** Programmierer, kreative Schreiber, Menschen die mit neuem Schreibparadigma experimentieren

---

## 🏗️ Major Architektur-Entscheidungen

### 1. Warum Vanilla JavaScript statt Framework?

**Entscheidung:** Vanilla JavaScript (kein React, Vue, Angular)
**Datum:** Dezember 2025

#### Gründe ✅
- **Simplicität** - Projekt ist fokussiert, kein complex state management nötig
- **Zero Dependencies** - Läuft überall ohne npm install
- **Schnell** - Kein Framework-Overhead, instant loading
- **Lernkurve** - Jeder kann den Code verstehen
- **Portierbarkeit** - Einfach in andere Technologien zu portieren

#### Trade-offs ⚖️
**Nachteile ❌:**
- Kein Reactivity System (manuelles DOM-Update)
- Keine Component-Wiederverwendung
- Bei Wachstum: Code-Organisation schwieriger

**Warum akzeptabel:**
- App ist simpel (~300 Zeilen JavaScript)
- Proof-of-Concept Phase
- Performance kritisch (Framework wäre Overkill)

---

### 2. Warum Client-side only (kein Backend)?

**Entscheidung:** 100% Client-side, kein Server
**Datum:** Dezember 2025

#### Gründe ✅
- **Privacy** - Alle Daten bleiben lokal
- **Einfachheit** - Kein Backend-Code, keine Datenbank
- **Deployment** - Einfach Dateien hochladen, fertig!
- **Kosten** - Keine Server-Kosten
- **Offline** - Funktioniert ohne Internet

#### Trade-offs ⚖️
**Nachteile ❌:**
- Keine Cross-Device Sync
- Keine Cloud-Speicherung
- Keine Collaboration-Features

**Warum akzeptabel:**
- Zielgruppe: Lokale, private Nutzung
- Export/Import für "Sync" (manuell)
- PWA für Offline (zukünftig)

---

### 3. Warum Stack-based Insertion statt traditionellem Cursor?

**Entscheidung:** Fixed write point, stack-based insertion
**Datum:** Dezember 2025 (Kern-Konzept!)

#### Gründe ✅ (aus docs/CONCEPT.md)
- **Konstanter Fokus** - Augen bleiben an einem Punkt
- **Kontext-Bewusstsein** - Älterer Text bleibt sichtbar (unten)
- **Für Programmierer** - Neuer Code immer oben, Referenz-Code unten
- **Innovativ** - Niemand macht das so!

#### Trade-offs ⚖️
**Nachteile ❌:**
- **Lernkurve** - Ungewohnt für normale User
- **Editing** - Nur neuestes Zeichen löschbar (Backspace)
- **Kein Undo** - Noch nicht implementiert

**Warum akzeptabel:**
- Proof-of-Concept! Testen ob Konzept funktioniert
- Zielgruppe experimentiert gerne
- Undo/Redo kommt in v0.2.0

**Alternative:**
- Traditioneller Editor - Langweilig, gibt es schon tausende!

---

### 4. Warum Web-first statt Native App?

**Entscheidung:** Web-Version als erstes, native später
**Datum:** Dezember 2025

#### Gründe ✅
- **Rapid Prototyping** - HTML/CSS/JS schnell iterierbar
- **Cross-Platform Testing** - Funktioniert auf Mac, Windows, Linux
- **Einfaches Sharing** - Link senden, fertig!
- **Kein Store-Approval** - Sofort verfügbar

#### Trade-offs ⚖️
**Nachteile ❌:**
- Keine native Performance
- Kein App Store Presence
- Keine nativen OS-Features

**Warum akzeptabel:**
- MVP/Proof-of-Concept Phase
- Web-Performance ausreichend (Text-Editor, nicht Spiel!)
- Native Version wenn Konzept validiert

**Future:** iOS/macOS App mit SwiftUI (wenn erfolgreich)

---

### 5. Warum Obsidian Plugin zusätzlich?

**Entscheidung:** Parallel-Entwicklung eines Obsidian Plugins
**Datum:** Dezember 2025

#### Gründe ✅
- **Zielgruppe** - Viele Programmierer nutzen Obsidian
- **Integration** - Direkt in Workflow eingebunden
- **Distribution** - Obsidian Community Plugin Directory
- **Dogfooding** - Selbst nutzen zum Testen

#### Trade-offs ⚖️
**Aufwand:**
- Extra Codebase (TypeScript)
- Build-Prozess nötig (npm)
- Obsidian API lernen

**Warum akzeptabel:**
- Code-Reuse möglich (~70% gleiche Logik)
- Obsidian API gut dokumentiert
- Kleines Plugin (~400 Zeilen)

---

## 🔴 Bekannte Technical Debt

### 1. Kein Undo/Redo (Priorität: Hoch)
**Problem:** Nur Backspace für letztes Zeichen
**Impact:** User können Fehler nicht rückgängig machen
**Aufwand:** Mittel (~1-2 Tage)
**Lösung:**
```javascript
// Stack für History
let history = [];
let historyIndex = 0;

function saveState() {
    history = history.slice(0, historyIndex + 1);
    history.push(getCurrentState());
    historyIndex++;
}

function undo() {
    if (historyIndex > 0) {
        historyIndex--;
        restoreState(history[historyIndex]);
    }
}
```

### 2. Kein Dark Mode (Priorität: Mittel)
**Problem:** Nur helles Theme
**Impact:** Augenbelastung in dunkler Umgebung
**Aufwand:** Niedrig (~4 Stunden)
**Lösung:**
```css
[data-theme="dark"] {
    --bg-color: #1a1a1a;
    --text-color: #e0e0e0;
    --accent: #4a9eff;
}
```

### 3. Keine Syntax Highlighting (Priorität: Niedrig)
**Problem:** Code nicht farbig
**Impact:** Programmierer würden davon profitieren
**Aufwand:** Hoch (~1 Woche, Library-Integration)
**Lösung:** highlight.js oder Prism.js integrieren

---

## 🧩 Datenfluss & Architektur

### Web-Version

```
index.html (UI Structure)
    ↓
style.css (Mirroring Transforms)
    ↓
script.js (Editor Logic)
    ├── Stack-based Insertion
    ├── Line Wrapping Algorithm
    ├── Export/Import Functions
    └── Mirroring Toggles
    ↓
localStorage (optional, future)
```

**Kein State Management Framework!**
- Direktes DOM-Manipulation
- Event-Listener für User-Input
- Callbacks für Actions

### Obsidian Plugin

```
main.ts (Plugin Entry)
    ├── registerView()
    ├── addRibbonIcon()
    └── addCommand()
    ↓
InvertedMirrorView (Custom View)
    ├── Editor Logic (ähnlich script.js)
    ├── Obsidian API Integration
    └── File Sync (Obsidian Vault)
    ↓
Obsidian App (Host)
```

---

## 📊 Core Algorithm: Stack-based Insertion

```javascript
// Vereinfacht:
function insertCharacter(char) {
    // Füge Zeichen am Fixed Point ein (top-right)
    currentLine = char + currentLine;

    // Check if overflow (zu lang für Zeile)
    if (currentLine.length > MAX_WIDTH) {
        // Cascade: Ältestes Zeichen nach unten schieben
        let overflow = currentLine.substring(0, 1);
        currentLine = currentLine.substring(1);

        // Füge overflow zur nächsten Zeile hinzu
        lines.unshift(overflow + (lines[0] || ""));
    }
}

// NEUESTE immer oben rechts
// ÄLTESTE nach unten verschoben
// Time-flow inverted!
```

**Why it works:**
- Fixed Point: User weiß immer wo geschrieben wird
- Stack: Natürliche LIFO-Order (newest on top)
- Cascading: Automatic overflow handling

---

## 🔒 Security & Privacy

### Client-side Security
- **Kein Backend** - Keine Server-Exploits möglich
- **Kein localStorage (aktuell)** - Keine Persistierung
- **Keine Cookies** - Keine Tracking
- **Kein Analytics** - Zero Telemetrie

### Privacy-by-Design
- Alle Daten bleiben im Browser
- Export nur auf User-Aktion
- Keine Third-Party Scripts
- Keine API-Calls

**Sicherer geht's nicht!** ✅

---

## 🚀 Future Considerations

### 1. Progressive Web App (PWA)
**Wann:** v0.3.0
**Aufwand:** Mittel
**Nutzen:**
- Offline-Nutzung
- Installierbar (Home Screen)
- App-artiges Feeling

### 2. Native iOS/macOS App
**Wann:** Wenn Web-Version erfolgreich (> 1000 User)
**Aufwand:** Hoch
**Technologie:** SwiftUI
**Nutzen:**
- App Store Presence
- Native Performance
- iOS-spezifische Features

### 3. Collaborative Editing
**Wann:** Future (v2.0?)
**Aufwand:** Sehr hoch
**Technologie:** WebSocket + Backend
**Trade-off:** Komplexität vs. Feature-Wert

---

## 💡 Lessons Learned

### Was gut funktioniert:
- ✅ Vanilla JavaScript für MVP - Schnell, einfach
- ✅ Stack-based Insertion - Konzept funktioniert!
- ✅ Client-side only - Deployment trivial
- ✅ Web-first - Rapid testing möglich

### Was herausfordernd war:
- ⚠️ Line-Wrapping Algorithmus - Viele Edge-Cases
- ⚠️ Mirroring mit CSS Transforms - Browser-Kompatibilität
- ⚠️ Export-Formate - Inverted vs. Normal verwirrt User

### Was wir anders machen würden:
- 🔄 Früher TypeScript (für Obsidian Plugin gut, für Web nicht nötig)
- 🔄 Unit Tests von Anfang an (Line-Wrapping testen!)
- 🔄 Undo/Redo in v0.1.0 (Höhere Priorität!)

---

**Version:** 1.0
**Status:** Living Document
**Projekt:** Inverted Mirror Editor (Web + Obsidian)

---

*Diese Dokumentation erklärt das WHY, nicht nur das WHAT!*
