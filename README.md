# Color Palette Generator

A modern, interactive color palette generator built with React and shadcn/ui components. Generate harmonious color combinations, save your favorite palettes, and export them for your projects.

## Features

- **Multiple Color Harmony Rules**
  - Random color generation
  - Complementary colors
  - Analogous colors
  - Triadic colors

- **Advanced Color Management**
  - Generate new color palettes with a single click
  - Input custom colors in hexadecimal format
  - Copy colors to clipboard with a click
  - Undo/Redo functionality for palette history

- **Palette Organization**
  - Save favorite palettes
  - Export all palettes to JSON
  - Dark/Light mode toggle
  - Visual color preview

## Installation

1. First, ensure you have the required dependencies:

```bash
npm install react lucide-react
```

2. Install the required shadcn/ui components:

```bash
npx shadcn-ui@latest add alert select
```

3. Add the component to your project:

```bash
# Copy the ColorPaletteGenerator.tsx file to your components directory
```

## Usage

```jsx
import ColorPaletteGenerator from './components/ColorPaletteGenerator';

function App() {
  return (
    <div>
      <ColorPaletteGenerator />
    </div>
  );
}
```

## Component Structure

The generator consists of several key features:

### Color Generation
- Uses HSL color space for generating harmonious color combinations
- Supports multiple color harmony rules (complementary, analogous, triadic)
- Generates random colors when no specific rule is selected

### Color Management
- Convert between hex and HSL color formats
- Save generated palettes
- Export palettes to JSON format
- Copy individual colors to clipboard

### User Interface
- Responsive grid layout for color display
- Interactive controls for palette generation
- Dark/Light mode toggle
- Undo/Redo functionality
- Custom color input support

## Props and Configuration

The component doesn't require any props and manages its own state internally. However, you can wrap it with your own state management if needed.

## Styling

The component uses Tailwind CSS for styling and is fully responsive. The dark/light mode toggle affects the entire component and properly handles color contrast.

## Examples

### Basic Implementation
```jsx
<ColorPaletteGenerator />
```

### Custom Color Generation
Users can input custom colors in hex format (#RRGGBB) to generate harmonious palettes based on that color.

### Saving and Exporting
- Click the "Save Palette" button to store your favorite combinations
- Use "Export Palettes" to download all palettes as a JSON file

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Credits

Built with:
- React
- shadcn/ui components
- Lucide React Icons
- Tailwind CSS
