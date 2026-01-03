#!/bin/bash

# Quick Push Script für Inverted Mirror Editor
# Automatisches Git Add, Commit, Push

echo "📝 Inverted Mirror Editor - Git Quick Push"
echo "=========================================="
echo ""

# Zum Projekt-Verzeichnis wechseln
cd "$(dirname "$0")"

# Git Status zeigen
echo "📊 Aktuelle Änderungen:"
git status --short
echo ""

# Prüfen ob es Änderungen gibt
if [ -z "$(git status --porcelain)" ]; then
    echo "✅ Keine Änderungen zum Committen."
    exit 0
fi

# Commit Message abfragen
echo "💬 Commit Message eingeben:"
read -p "> " commit_msg

# Prüfen ob Message leer ist
if [ -z "$commit_msg" ]; then
    echo "❌ Commit Message darf nicht leer sein!"
    exit 1
fi

# Git Add, Commit, Push
echo ""
echo "📦 Staging changes..."
git add .

echo "💾 Creating commit..."
git commit -m "$commit_msg

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

echo "🚀 Pushing to GitHub..."
git push

# Erfolg prüfen
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Erfolgreich zu GitHub gepusht!"
    echo "🔗 https://github.com/JHAppsandBots/inverted-mirror-editor"
else
    echo ""
    echo "❌ Push fehlgeschlagen! Prüfe Fehlermeldung oben."
    exit 1
fi
