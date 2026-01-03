# Installation Guide - Inverted Mirror Editor for Obsidian

**Quick and easy installation guide**

---

## 📋 Prerequisites

- **Obsidian** 0.15.0 or later
- **Node.js** and **npm** (for building from source)
- Basic command line knowledge

---

## 🚀 Quick Install (Recommended)

### Step 1: Build the Plugin

```bash
# Navigate to plugin directory
cd "/path/to/texteditor/obsidian-plugin"

# Install dependencies
npm install

# Build the plugin
npm run build
```

This creates `main.js` in the plugin directory.

### Step 2: Copy to Your Vault

```bash
# Create plugin folder in your vault
mkdir -p "/path/to/your-vault/.obsidian/plugins/inverted-mirror-editor"

# Copy the three required files
cp main.js manifest.json styles.css "/path/to/your-vault/.obsidian/plugins/inverted-mirror-editor/"
```

**Required files:**
- `main.js` (built from TypeScript)
- `manifest.json` (plugin metadata)
- `styles.css` (styling)

### Step 3: Enable in Obsidian

1. **Restart Obsidian** completely (close all windows)
2. Open **Settings** → **Community Plugins**
3. If needed, click **"Turn on Community Plugins"**
4. Find **"Inverted Mirror Editor"** in the list
5. Toggle it **ON**

### Step 4: Verify Installation

1. Look for the **edit icon (✏️)** in the left ribbon
2. Open any note
3. Press `Cmd + P` (Command Palette)
4. Type "Open Current Note in Inverted"
5. The inverted editor should open!

---

## 🔧 Development Setup

For plugin development with auto-rebuild:

### Step 1: Create Symbolic Link

Instead of copying, link the development folder to your vault:

**macOS/Linux:**
```bash
ln -s "/path/to/texteditor/obsidian-plugin" "/path/to/vault/.obsidian/plugins/inverted-mirror-editor"
```

**Windows (as Administrator):**
```cmd
mklink /D "C:\path\to\vault\.obsidian\plugins\inverted-mirror-editor" "C:\path\to\texteditor\obsidian-plugin"
```

### Step 2: Start Development Server

```bash
cd "/path/to/texteditor/obsidian-plugin"
npm install
npm run dev
```

This watches for changes and rebuilds automatically.

### Step 3: Reload After Changes

- **Reload Obsidian:** `Cmd/Ctrl + R`
- Or restart Obsidian completely
- Changes to TypeScript are auto-rebuilt
- Changes to CSS require Obsidian reload

---

## 🗂️ Manual Installation (Alternative)

If you prefer to copy the entire folder:

### Option A: Copy Then Build

```bash
# Copy entire plugin folder to vault
cp -r "/path/to/texteditor/obsidian-plugin" "/path/to/vault/.obsidian/plugins/inverted-mirror-editor"

# Navigate to vault's plugin folder
cd "/path/to/vault/.obsidian/plugins/inverted-mirror-editor"

# Install and build
npm install
npm run build

# Restart Obsidian and enable
```

### Option B: Build Then Copy

```bash
# Build in source location
cd "/path/to/texteditor/obsidian-plugin"
npm install
npm run build

# Copy just the built files
mkdir -p "/path/to/vault/.obsidian/plugins/inverted-mirror-editor"
cp main.js manifest.json styles.css "/path/to/vault/.obsidian/plugins/inverted-mirror-editor/"

# Restart Obsidian and enable
```

---

## 🔍 Finding Your Vault Path

### macOS
Default location:
```
/Users/<YourName>/Documents/<VaultName>
```

Or check in Obsidian: Settings → Files & Links → Vault location

### Windows
Default location:
```
C:\Users\<YourName>\Documents\<VaultName>
```

### Linux
Default location:
```
/home/<YourName>/Documents/<VaultName>
```

### Plugin Folder Structure

After installation, you should have:
```
<your-vault>/
└── .obsidian/
    └── plugins/
        └── inverted-mirror-editor/
            ├── main.js          ← Required
            ├── manifest.json    ← Required
            └── styles.css       ← Required
```

---

## ✅ Verification Checklist

After installation, verify everything is working:

- [ ] Plugin appears in Community Plugins list
- [ ] Plugin can be enabled (toggle turns blue)
- [ ] Edit icon (✏️) appears in left ribbon
- [ ] Command "Open Current Note in Inverted" exists in palette
- [ ] Opening inverted view shows the editor
- [ ] Can type text at fixed point (top-right)
- [ ] Saving works (Cmd/Ctrl + S)

---

## 🐛 Troubleshooting

### Plugin Doesn't Appear

**Problem:** Not in Community Plugins list

**Solutions:**
```bash
# 1. Check folder name is exact
ls "/path/to/vault/.obsidian/plugins/"
# Should show: inverted-mirror-editor

# 2. Check files exist
ls "/path/to/vault/.obsidian/plugins/inverted-mirror-editor/"
# Should show: main.js, manifest.json, styles.css

# 3. Restart Obsidian completely
# Close all windows, then reopen
```

### "Failed to Load Plugin" Error

**Problem:** Plugin listed but shows error

**Solutions:**
```bash
# 1. Verify main.js was built
ls -lh "/path/to/vault/.obsidian/plugins/inverted-mirror-editor/main.js"
# Should show file size > 0 bytes

# 2. Check for build errors
cd "/path/to/texteditor/obsidian-plugin"
npm run build
# Should complete without errors

# 3. Check manifest.json syntax
cat "/path/to/vault/.obsidian/plugins/inverted-mirror-editor/manifest.json"
# Should be valid JSON
```

### Build Fails

**Problem:** npm run build fails with errors

**Solutions:**
```bash
# 1. Clear and reinstall dependencies
cd "/path/to/texteditor/obsidian-plugin"
rm -rf node_modules package-lock.json
npm install

# 2. Check Node.js version
node --version
# Should be v16.0.0 or higher

# 3. Try again
npm run build
```

### Commands Don't Appear

**Problem:** Plugin enabled but commands missing

**Solutions:**
1. **Reload Obsidian:** `Cmd/Ctrl + R`
2. **Check plugin version:**
   ```bash
   cat "/path/to/vault/.obsidian/plugins/inverted-mirror-editor/manifest.json" | grep version
   # Should show: "version": "0.1.0"
   ```
3. **Disable and re-enable plugin**
4. **Check console for errors:** `Cmd/Ctrl + Shift + I`

### Permission Denied

**Problem:** Cannot copy files or create folders

**Solutions:**
```bash
# Check vault permissions
ls -ld "/path/to/vault/.obsidian/plugins"

# Fix permissions if needed (macOS/Linux)
chmod -R u+w "/path/to/vault/.obsidian/plugins"

# On Windows, run terminal as Administrator
```

### Symbolic Link Issues

**Problem:** Link doesn't work or breaks

**Solutions:**
```bash
# Remove broken link
rm "/path/to/vault/.obsidian/plugins/inverted-mirror-editor"

# Recreate with absolute paths
ln -s "$(pwd)/path/to/texteditor/obsidian-plugin" "/absolute/path/to/vault/.obsidian/plugins/inverted-mirror-editor"

# Verify link
ls -l "/path/to/vault/.obsidian/plugins/inverted-mirror-editor"
```

---

## 🔄 Updating the Plugin

### Manual Installation Users

```bash
# 1. Navigate to source
cd "/path/to/texteditor/obsidian-plugin"

# 2. Pull latest changes (if from git)
git pull

# 3. Rebuild
npm run build

# 4. Copy to vault
cp main.js manifest.json styles.css "/path/to/vault/.obsidian/plugins/inverted-mirror-editor/"

# 5. Reload Obsidian
# Cmd/Ctrl + R
```

### Development Users

```bash
# 1. Pull latest changes
cd "/path/to/texteditor/obsidian-plugin"
git pull

# 2. Dev server rebuilds automatically
# Or manually: npm run build

# 3. Reload Obsidian
# Cmd/Ctrl + R
```

---

## 🗑️ Uninstalling

### Method 1: Via Obsidian

1. Go to **Settings** → **Community Plugins**
2. Find **"Inverted Mirror Editor"**
3. Click the **X** button
4. Confirm removal

### Method 2: Manual

```bash
# Remove plugin folder
rm -rf "/path/to/vault/.obsidian/plugins/inverted-mirror-editor"

# Restart Obsidian
```

**Note:** Your notes are not affected. The plugin only changes the editing view, not the file format.

---

## 📊 Installation Verification Script

Save this as `verify-install.sh`:

```bash
#!/bin/bash

VAULT_PATH="$1"
PLUGIN_DIR="$VAULT_PATH/.obsidian/plugins/inverted-mirror-editor"

echo "Checking installation..."

# Check plugin folder exists
if [ ! -d "$PLUGIN_DIR" ]; then
  echo "❌ Plugin folder not found"
  exit 1
fi

# Check required files
for file in main.js manifest.json styles.css; do
  if [ ! -f "$PLUGIN_DIR/$file" ]; then
    echo "❌ Missing: $file"
    exit 1
  fi
done

# Check main.js size
SIZE=$(stat -f%z "$PLUGIN_DIR/main.js" 2>/dev/null || stat -c%s "$PLUGIN_DIR/main.js" 2>/dev/null)
if [ "$SIZE" -lt 1000 ]; then
  echo "❌ main.js seems too small ($SIZE bytes)"
  exit 1
fi

# Check manifest validity
if ! python3 -c "import json; json.load(open('$PLUGIN_DIR/manifest.json'))" 2>/dev/null; then
  echo "❌ manifest.json is invalid JSON"
  exit 1
fi

echo "✅ Installation looks good!"
echo "   - Plugin folder: exists"
echo "   - Required files: present"
echo "   - main.js size: $SIZE bytes"
echo "   - manifest.json: valid"
echo ""
echo "Next: Enable plugin in Obsidian settings"
```

Usage:
```bash
chmod +x verify-install.sh
./verify-install.sh "/path/to/your-vault"
```

---

## 🎓 Next Steps

After successful installation:

1. **Read the guide:** [OBSIDIAN-GUIDE.md](OBSIDIAN-GUIDE.md)
2. **Configure settings:** Settings → Inverted Mirror Editor
3. **Try it out:** Open a note and use Command Palette
4. **Check usage examples:** See README.md

---

## 📞 Get Help

- **Documentation:** [OBSIDIAN-GUIDE.md](OBSIDIAN-GUIDE.md)
- **README:** [README.md](README.md)
- **Issues:** GitHub Issues (link TBD)
- **Console:** `Cmd/Ctrl + Shift + I` for error messages

---

**Happy inverted writing!** ✨

---

*Last updated: 2025-12-26*
