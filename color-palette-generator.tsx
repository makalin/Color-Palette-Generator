import React, { useState, useEffect } from 'react';
import { Copy, RefreshCw, Save, Undo, Redo, Download, Sun, Moon } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ColorPaletteGenerator = () => {
  const [colors, setColors] = useState(['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD']);
  const [history, setHistory] = useState([['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD']]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCopied, setShowCopied] = useState(false);
  const [savedPalettes, setSavedPalettes] = useState([]);
  const [customColor, setCustomColor] = useState('');
  const [harmonyRule, setHarmonyRule] = useState('random');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Update history when colors change
    if (colors !== history[currentIndex]) {
      const newHistory = history.slice(0, currentIndex + 1);
      setHistory([...newHistory, colors]);
      setCurrentIndex(newHistory.length);
    }
  }, [colors]);

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const hexToHSL = (hex) => {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  };

  const HSLToHex = (h, s, l) => {
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    const toHex = x => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
  };

  const generateHarmoniousColors = (baseColor) => {
    const hsl = hexToHSL(baseColor);
    let colors = [];

    switch (harmonyRule) {
      case 'complementary':
        colors = [
          baseColor,
          HSLToHex((hsl.h + 180) % 360, hsl.s, hsl.l),
          HSLToHex((hsl.h + 180) % 360, hsl.s, hsl.l - 20),
          HSLToHex(hsl.h, hsl.s, hsl.l - 20),
          HSLToHex(hsl.h, hsl.s - 20, hsl.l),
        ];
        break;
      case 'analogous':
        colors = [
          baseColor,
          HSLToHex((hsl.h + 30) % 360, hsl.s, hsl.l),
          HSLToHex((hsl.h + 60) % 360, hsl.s, hsl.l),
          HSLToHex((hsl.h - 30) % 360, hsl.s, hsl.l),
          HSLToHex((hsl.h - 60) % 360, hsl.s, hsl.l),
        ];
        break;
      case 'triadic':
        colors = [
          baseColor,
          HSLToHex((hsl.h + 120) % 360, hsl.s, hsl.l),
          HSLToHex((hsl.h + 240) % 360, hsl.s, hsl.l),
          HSLToHex((hsl.h + 120) % 360, hsl.s - 20, hsl.l),
          HSLToHex((hsl.h + 240) % 360, hsl.s - 20, hsl.l),
        ];
        break;
      default:
        colors = Array(5).fill(null).map(generateRandomColor);
    }
    return colors;
  };

  const generateNewPalette = () => {
    const baseColor = generateRandomColor();
    const newColors = generateHarmoniousColors(baseColor);
    setColors(newColors);
  };

  const copyToClipboard = (color) => {
    navigator.clipboard.writeText(color);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const savePalette = () => {
    setSavedPalettes([...savedPalettes, [...colors]]);
  };

  const addCustomColor = (e) => {
    e.preventDefault();
    if (customColor.match(/^#[0-9A-F]{6}$/i)) {
      const newColors = generateHarmoniousColors(customColor);
      setColors(newColors);
      setCustomColor('');
    }
  };

  const undo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setColors(history[currentIndex - 1]);
    }
  };

  const redo = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setColors(history[currentIndex + 1]);
    }
  };

  const exportPalettes = () => {
    const data = {
      current: colors,
      saved: savedPalettes
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'color-palettes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`w-full max-w-4xl mx-auto p-6 space-y-6 transition-colors duration-200 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Color Palette Generator</h2>
          <div className="flex gap-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Select value={harmonyRule} onValueChange={setHarmonyRule}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select harmony" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="random">Random</SelectItem>
                <SelectItem value="complementary">Complementary</SelectItem>
                <SelectItem value="analogous">Analogous</SelectItem>
                <SelectItem value="triadic">Triadic</SelectItem>
              </SelectContent>
            </Select>
            <button
              onClick={generateNewPalette}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              <RefreshCw size={16} />
              Generate New
            </button>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <button
            onClick={undo}
            disabled={currentIndex === 0}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            <Undo size={20} />
          </button>
          <button
            onClick={redo}
            disabled={currentIndex === history.length - 1}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            <Redo size={20} />
          </button>
        </div>

        <div className="grid grid-cols-5 gap-4 h-48">
          {colors.map((color, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden shadow-lg"
              style={{ backgroundColor: color }}
            >
              <button
                onClick={() => copyToClipboard(color)}
                className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm flex items-center justify-center gap-2 opacity-0 hover:opacity-100 transition-opacity"
              >
                <Copy size={16} />
                {color}
              </button>
            </div>
          ))}
        </div>

        <form onSubmit={addCustomColor} className="flex gap-4">
          <input
            type="text"
            value={customColor}
            onChange={(e) => setCustomColor(e.target.value)}
            placeholder="#RRGGBB"
            className={`flex-1 p-2 border rounded ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
            pattern="^#[0-9A-Fa-f]{6}$"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Generate from Color
          </button>
        </form>

        <div className="flex gap-4">
          <button
            onClick={savePalette}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            <Save size={16} />
            Save Palette
          </button>
          <button
            onClick={exportPalettes}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            <Download size={16} />
            Export Palettes
          </button>
        </div>

        {showCopied && (
          <Alert className="fixed bottom-4 right-4">
            <AlertDescription>Color copied to clipboard!</AlertDescription>
          </Alert>
        )}

        {savedPalettes.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Saved Palettes</h3>
            <div className="space-y-4">
              {savedPalettes.map((palette, index) => (
                <div key={index} className="grid grid-cols-5 gap-4 h-12">
                  {palette.map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="rounded cursor-pointer"
                      style={{ backgroundColor: color }}
                      onClick={() => copyToClipboard(color)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorPaletteGenerator;
