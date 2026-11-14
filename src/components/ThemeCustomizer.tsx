"use client";

import React, { useState, useEffect, useRef } from "react";
import { Palette, RotateCcw, X } from "lucide-react";

export const THEME_PRESETS: Record<string, string> = {
  "Default": "font-family: \"Geist Mono\", \"Geist Mono Fallback\"; --font-sans: \"Geist Mono\", \"Geist Mono Fallback\"; color-scheme: dark; --radius: 0.45rem; scrollbar-gutter: stable;",
  "Caffeine": "font-family: \"Geist Mono\", \"Geist Mono Fallback\"; --font-sans: \"Geist Mono\", \"Geist Mono Fallback\"; color-scheme: dark; --radius: 0.45rem; scrollbar-gutter: stable; --background: oklch(0.18 0 0); --foreground: oklch(0.95 0 0); --card: oklch(0.21 0 0); --card-foreground: oklch(0.95 0 0); --popover: oklch(0.21 0 0); --popover-foreground: oklch(0.95 0 0); --primary: oklch(0.92 0.05 66.17); --primary-foreground: oklch(0.20 0.02 200.20); --secondary: oklch(0.32 0.02 63.70); --secondary-foreground: oklch(0.92 0.05 66.17); --muted: oklch(0.25 0 0); --muted-foreground: oklch(0.77 0 0); --accent: oklch(0.29 0 0); --accent-foreground: oklch(0.95 0 0); --destructive: oklch(0.63 0.19 33.34); --border: oklch(0.24 0.01 91.75); --input: oklch(0.40 0 0); --ring: oklch(0.92 0.05 66.17); --chart-1: oklch(0.92 0.05 66.17); --chart-2: oklch(0.32 0.02 63.70); --chart-3: oklch(0.29 0 0); --chart-4: oklch(0.35 0.02 67.00); --chart-5: oklch(0.92 0.05 67.09); --sidebar: oklch(0.21 0.01 285.89); --sidebar-foreground: oklch(0.97 0.00 286.38); --sidebar-primary: oklch(0.49 0.22 264.38); --sidebar-primary-foreground: oklch(1.00 0 0); --sidebar-accent: oklch(0.27 0.01 286.03); --sidebar-accent-foreground: oklch(0.97 0.00 286.38); --sidebar-border: oklch(0.27 0.01 286.03); --sidebar-ring: oklch(0.87 0.01 286.29);",
  "Claude": "font-family: \"Geist Mono\", \"Geist Mono Fallback\"; --font-sans: \"Geist Mono\", \"Geist Mono Fallback\"; color-scheme: dark; --radius: 0.45rem; scrollbar-gutter: stable; --background: oklch(0.27 0.00 106.64); --foreground: oklch(0.81 0.01 93.01); --card: oklch(0.27 0.00 106.64); --card-foreground: oklch(0.98 0.01 95.10); --popover: oklch(0.31 0.00 106.60); --popover-foreground: oklch(0.92 0.00 106.48); --primary: oklch(0.67 0.13 38.76); --primary-foreground: oklch(1.00 0 0); --secondary: oklch(0.98 0.01 95.10); --secondary-foreground: oklch(0.31 0.00 106.60); --muted: oklch(0.22 0.00 106.71); --muted-foreground: oklch(0.77 0.02 99.07); --accent: oklch(0.21 0.01 95.42); --accent-foreground: oklch(0.97 0.01 98.88); --destructive: oklch(0.64 0.21 25.33); --border: oklch(0.36 0.01 106.89); --input: oklch(0.43 0.01 100.22); --ring: oklch(0.59 0.17 253.06); --chart-1: oklch(0.56 0.13 43.00); --chart-2: oklch(0.69 0.16 290.41); --chart-3: oklch(0.21 0.01 95.42); --chart-4: oklch(0.31 0.05 289.32); --chart-5: oklch(0.56 0.13 42.06); --sidebar: oklch(0.24 0.00 67.71); --sidebar-foreground: oklch(0.81 0.01 93.01); --sidebar-primary: oklch(0.33 0 0); --sidebar-primary-foreground: oklch(0.99 0 0); --sidebar-accent: oklch(0.17 0.00 106.62); --sidebar-accent-foreground: oklch(0.81 0.01 93.01); --sidebar-border: oklch(0.94 0 0); --sidebar-ring: oklch(0.77 0 0);",
  "Corporate": "font-family: \"Geist Mono\", \"Geist Mono Fallback\"; --font-sans: \"Geist Mono\", \"Geist Mono Fallback\"; color-scheme: dark; --radius: 0.45rem; scrollbar-gutter: stable; --background: oklch(0.26 0.03 262.71); --foreground: oklch(0.93 0.01 264.60); --card: oklch(0.2938 0.0398 256.22); --card-foreground: oklch(0.93 0.01 264.60); --popover: oklch(0.2938 0.0398 256.22); --popover-foreground: oklch(0.93 0.01 264.60); --primary: oklch(0.56 0.24 260.95); --primary-foreground: oklch(1.00 0 0); --secondary: oklch(0.35 0.04 262.16); --secondary-foreground: oklch(0.93 0.01 264.60); --muted: oklch(0.30 0.03 261.75); --muted-foreground: oklch(0.71 0.02 261.33); --accent: oklch(0.33 0.04 264.82); --accent-foreground: oklch(0.93 0.01 264.60); --destructive: oklch(0.64 0.21 25.33); --border: oklch(0.35 0.04 262.16); --input: oklch(0.35 0.04 262.16); --ring: oklch(0.56 0.24 260.95); --chart-1: oklch(0.56 0.24 260.95); --chart-2: oklch(0.48 0.20 260.48); --chart-3: oklch(0.69 0.17 256.00); --chart-4: oklch(0.43 0.16 259.85); --chart-5: oklch(0.29 0.07 260.37); --sidebar: oklch(0.26 0.03 262.71); --sidebar-foreground: oklch(0.93 0.01 264.60); --sidebar-primary: oklch(0.56 0.24 260.95); --sidebar-primary-foreground: oklch(1.00 0 0); --sidebar-accent: oklch(0.33 0.04 264.82); --sidebar-accent-foreground: oklch(0.93 0.01 264.60); --sidebar-border: oklch(0.35 0.04 262.16); --sidebar-ring: oklch(0.56 0.24 260.95);",
  "Ghibli Studio": "font-family: \"Geist Mono\", \"Geist Mono Fallback\"; --font-sans: \"Geist Mono\", \"Geist Mono Fallback\"; color-scheme: dark; --radius: 0.45rem; scrollbar-gutter: stable; --background: oklch(0.20 0.01 48.35); --foreground: oklch(0.88 0.05 79.26); --card: oklch(0.25 0.01 56.14); --card-foreground: oklch(0.88 0.05 79.26); --popover: oklch(0.25 0.01 56.14); --popover-foreground: oklch(0.88 0.05 79.26); --primary: oklch(0.64 0.05 115.39); --primary-foreground: oklch(0.98 0.01 3.71); --secondary: oklch(0.33 0.02 60.70); --secondary-foreground: oklch(0.88 0.05 83.41); --muted: oklch(0.27 0.01 39.35); --muted-foreground: oklch(0.74 0.06 79.81); --accent: oklch(0.33 0.02 60.70); --accent-foreground: oklch(0.86 0.05 84.50); --destructive: oklch(0.63 0.24 29.21); --border: oklch(0.33 0.02 60.70); --input: oklch(0.33 0.02 60.70); --ring: oklch(0.64 0.05 115.39); --chart-1: oklch(0.66 0.19 41.68); --chart-2: oklch(0.70 0.12 183.20); --chart-3: oklch(0.48 0.08 211.46); --chart-4: oklch(0.84 0.17 85.07); --chart-5: oklch(0.74 0.17 60.21); --sidebar: oklch(0.23 0.01 56.09); --sidebar-foreground: oklch(0.88 0.05 79.26); --sidebar-primary: oklch(0.64 0.05 115.39); --sidebar-primary-foreground: oklch(0.98 0.01 3.71); --sidebar-accent: oklch(0.33 0.02 60.70); --sidebar-accent-foreground: oklch(0.86 0.05 84.50); --sidebar-border: oklch(0.33 0.02 60.70); --sidebar-ring: oklch(0.64 0.05 115.39);",
  "Marvel": "font-family: \"Geist Mono\", \"Geist Mono Fallback\"; --font-sans: \"Geist Mono\", \"Geist Mono Fallback\"; color-scheme: dark; --radius: 0.45rem; scrollbar-gutter: stable; --background: oklch(0.1744 0.0088 31.22); --foreground: oklch(0.95 0.01 25.23); --card: oklch(0.2177 0.0067 34.3); --card-foreground: oklch(0.95 0.01 25.23); --popover: oklch(0.18 0.01 29.18); --popover-foreground: oklch(0.95 0.01 25.23); --primary: oklch(0.5502 0.22 27.03); --primary-foreground: oklch(0.98 0.01 100.72); --secondary: oklch(0.50 0.14 249.16); --secondary-foreground: oklch(0.98 0.01 100.72); --muted: oklch(0.20 0.01 18.05); --muted-foreground: oklch(0.70 0.01 25.22); --accent: oklch(0.59 0.12 78.11); --accent-foreground: oklch(0.95 0.01 25.23); --destructive: oklch(0.56 0.23 29.23); --border: oklch(0.3235 0.0086 17.61); --input: oklch(0.38 0.01 17.71); --ring: oklch(0.49 0.14 250.75); --chart-1: oklch(0.64 0.25 26.85); --chart-2: oklch(0.66 0.19 250.17); --chart-3: oklch(0.78 0.16 87.01); --chart-4: oklch(0.68 0.15 144.94); --chart-5: oklch(0.75 0.15 304.74); --sidebar: oklch(0.14 0.01 33.25); --sidebar-foreground: oklch(0.95 0.01 25.23); --sidebar-primary: oklch(0.50 0.14 249.16); --sidebar-primary-foreground: oklch(0.98 0.01 100.72); --sidebar-accent: oklch(0.59 0.12 78.11); --sidebar-accent-foreground: oklch(0.95 0.01 25.23); --sidebar-border: oklch(0.32 0.01 27.45 / 30%); --sidebar-ring: oklch(0.50 0.14 249.16); --shadow-color: oklch(0 0 0 / 0.01); --shadow-opacity: 0.01; --shadow-blur: 3px; --shadow-spread: 0px; --shadow-offset-x: 0px; --shadow-offset-y: 1px;",
  "Material Design": "font-family: \"Geist Mono\", \"Geist Mono Fallback\"; --font-sans: \"Geist Mono\", \"Geist Mono Fallback\"; color-scheme: dark; --radius: 0.45rem; scrollbar-gutter: stable; --background: oklch(0.15 0.01 317.69); --foreground: oklch(0.95 0.01 321.50); --card: oklch(0.22 0.02 322.13); --card-foreground: oklch(0.95 0.01 321.50); --popover: oklch(0.22 0.02 322.13); --popover-foreground: oklch(0.95 0.01 321.50); --primary: oklch(0.60 0.22 279.81); --primary-foreground: oklch(0.98 0.01 321.51); --secondary: oklch(0.45 0.03 294.79); --secondary-foreground: oklch(0.95 0.01 321.50); --muted: oklch(0.22 0.01 319.50); --muted-foreground: oklch(0.70 0.01 320.70); --accent: oklch(0.35 0.06 299.57); --accent-foreground: oklch(0.95 0.01 321.50); --destructive: oklch(0.57 0.23 29.21); --border: oklch(0.40 0.04 309.35); --input: oklch(0.40 0.04 309.35); --ring: oklch(0.50 0.15 294.97); --chart-1: oklch(0.50 0.25 274.99); --chart-2: oklch(0.60 0.15 150.16); --chart-3: oklch(0.65 0.20 309.96); --chart-4: oklch(0.60 0.17 132.98); --chart-5: oklch(0.60 0.20 255.25); --sidebar: oklch(0.20 0.01 317.74); --sidebar-foreground: oklch(0.95 0.01 321.50); --sidebar-primary: oklch(0.59 0.11 225.82); --sidebar-primary-foreground: oklch(0.95 0.01 321.50); --sidebar-accent: oklch(0.30 0.01 319.52); --sidebar-accent-foreground: oklch(0.95 0.01 321.50); --sidebar-border: oklch(0.35 0.01 319.53 / 30%); --sidebar-ring: oklch(0.59 0.11 225.82); --shadow-color: oklch(0 0 0 / 0.01); --shadow-opacity: 0.01; --shadow-blur: 3px; --shadow-spread: 0px; --shadow-offset-x: 0px; --shadow-offset-y: 1px;",
  "Modern Minimal": "font-family: \"Geist Mono\", \"Geist Mono Fallback\"; --font-sans: \"Geist Mono\", \"Geist Mono Fallback\"; color-scheme: dark; --radius: 0.45rem; scrollbar-gutter: stable; --background: oklch(0.20 0 0); --foreground: oklch(0.92 0 0); --card: oklch(0.27 0 0); --card-foreground: oklch(0.92 0 0); --popover: oklch(0.27 0 0); --popover-foreground: oklch(0.92 0 0); --primary: oklch(0.62 0.19 259.76); --primary-foreground: oklch(1.00 0 0); --secondary: oklch(0.27 0 0); --secondary-foreground: oklch(0.92 0 0); --muted: oklch(0.27 0 0); --muted-foreground: oklch(0.72 0 0); --accent: oklch(0.38 0.14 265.59); --accent-foreground: oklch(0.88 0.06 254.63); --destructive: oklch(0.64 0.21 25.39); --border: oklch(0.37 0 0); --input: oklch(0.37 0 0); --ring: oklch(0.62 0.19 259.76); --chart-1: oklch(0.71 0.14 254.69); --chart-2: oklch(0.62 0.19 259.76); --chart-3: oklch(0.55 0.22 262.96); --chart-4: oklch(0.49 0.22 264.43); --chart-5: oklch(0.42 0.18 265.55); --sidebar: oklch(0.21 0.01 285.93); --sidebar-foreground: oklch(0.99 0 0); --sidebar-primary: oklch(0.49 0.24 264.40); --sidebar-primary-foreground: oklch(0.99 0 0); --sidebar-accent: oklch(0.27 0.01 286.10); --sidebar-accent-foreground: oklch(0.99 0 0); --sidebar-border: oklch(1.00 0 0 / 10%); --sidebar-ring: oklch(0.55 0.02 285.93); --shadow-color: oklch(0 0 0 / 0.01); --shadow-opacity: 0.01; --shadow-blur: 3px; --shadow-spread: 0px; --shadow-offset-x: 0px; --shadow-offset-y: 1px;",
  "Nature": "font-family: \"Geist Mono\", \"Geist Mono Fallback\"; --font-sans: \"Geist Mono\", \"Geist Mono Fallback\"; color-scheme: dark; --radius: 0.45rem; scrollbar-gutter: stable; --background: oklch(0.31 0.03 150.45); --foreground: oklch(0.84 0.01 145.33); --card: oklch(0.35 0.03 149.75); --card-foreground: oklch(0.84 0.01 145.33); --popover: oklch(0.33 0.03 146.53); --popover-foreground: oklch(0.94 0.01 72.65); --primary: oklch(0.67 0.16 144.06); --primary-foreground: oklch(0.99 0.02 145.33); --secondary: oklch(0.39 0.03 143.09); --secondary-foreground: oklch(0.90 0.02 142.94); --muted: oklch(0.29 0.03 147.05); --muted-foreground: oklch(0.69 0.02 150.35); --accent: oklch(0.58 0.14 144.14); --accent-foreground: oklch(0.94 0.01 72.65); --destructive: oklch(0.54 0.19 26.90); --border: oklch(0.39 0.03 143.09); --input: oklch(0.39 0.03 143.09); --ring: oklch(0.67 0.16 144.06); --chart-1: oklch(0.77 0.12 145.23); --chart-2: oklch(0.72 0.14 144.92); --chart-3: oklch(0.67 0.16 144.06); --chart-4: oklch(0.63 0.15 144.32); --chart-5: oklch(0.58 0.14 144.14); --sidebar: oklch(0.27 0.03 150.18); --sidebar-foreground: oklch(0.94 0.01 72.65); --sidebar-primary: oklch(0.67 0.16 144.06); --sidebar-primary-foreground: oklch(0.22 0.05 145.34); --sidebar-accent: oklch(0.58 0.14 144.14); --sidebar-accent-foreground: oklch(0.94 0.01 72.65); --sidebar-border: oklch(0.39 0.03 143.09); --sidebar-ring: oklch(0.67 0.16 144.06); --shadow-color: oklch(0 0 0 / 0.01); --shadow-opacity: 0.01; --shadow-blur: 3px; --shadow-spread: 0px; --shadow-offset-x: 0px; --shadow-offset-y: 1px;",
  "Perplexity": "font-family: \"Geist Mono\", \"Geist Mono Fallback\"; --font-sans: \"Geist Mono\", \"Geist Mono Fallback\"; color-scheme: dark; --radius: 0.45rem; scrollbar-gutter: stable; --background: oklch(0.21 0.02 224.44); --foreground: oklch(0.8107 0.0396 226.16); --card: oklch(0.23 0.03 216.05); --card-foreground: oklch(0.702 0.0417 225.62); --popover: oklch(0.23 0.03 216.05); --popover-foreground: oklch(0.9369 0.049 196.35); --primary: oklch(0.72 0.12 209.78); --primary-foreground: oklch(1.00 0 0); --secondary: oklch(0.27 0.01 286.10); --secondary-foreground: oklch(0.97 0.00 264.70); --muted: oklch(0.1843 0.0157 227.35); --muted-foreground: oklch(0.5814 0.0301 223.57); --accent: oklch(0.1694 0.0235 210.7); --accent-foreground: oklch(0.97 0.00 264.70); --destructive: oklch(0.64 0.21 25.33); --border: oklch(0.3611 0.0177 213.28); --input: oklch(0.29 0.00 286.27); --ring: oklch(0.72 0.12 209.78); --chart-1: oklch(0.72 0.12 209.78); --chart-2: oklch(0.79 0.12 208.87); --chart-3: oklch(0.76 0.11 208.84); --chart-4: oklch(0.83 0.10 208.33); --chart-5: oklch(0.57 0.10 213.38); --sidebar: oklch(0.19 0 0); --sidebar-foreground: oklch(0.97 0.00 264.70); --sidebar-primary: oklch(0.72 0.12 209.78); --sidebar-primary-foreground: oklch(1.00 0 0); --sidebar-accent: oklch(0.24 0.00 286.20); --sidebar-accent-foreground: oklch(0.97 0.00 264.70); --sidebar-border: oklch(0.29 0.00 286.27); --sidebar-ring: oklch(0.72 0.12 209.78); --shadow-color: oklch(0 0 0 / 0.01); --shadow-opacity: 0.01; --shadow-blur: 3px; --shadow-spread: 0px; --shadow-offset-x: 0px; --shadow-offset-y: 1px;",
  "Slack": "font-family: \"Geist Mono\", \"Geist Mono Fallback\"; --font-sans: \"Geist Mono\", \"Geist Mono Fallback\"; color-scheme: dark; --radius: 0.45rem; scrollbar-gutter: stable; --background: oklch(0.23 0.01 255.60); --foreground: oklch(0.93 0 0); --card: oklch(0.26 0.01 255.58); --card-foreground: oklch(0.93 0 0); --popover: oklch(0.2298 0.0107 260.68); --popover-foreground: oklch(0.93 0 0); --primary: oklch(0.58 0.14 327.21); --primary-foreground: oklch(1.00 0 0); --secondary: oklch(0.30 0.01 248.05); --secondary-foreground: oklch(0.93 0 0); --muted: oklch(0.26 0.01 255.58); --muted-foreground: oklch(0.68 0 0); --accent: oklch(0.33 0.03 326.23); --accent-foreground: oklch(0.93 0 0); --destructive: oklch(0.59 0.22 11.50); --border: oklch(0.30 0.01 268.37); --input: oklch(0.30 0.01 268.37); --ring: oklch(0.58 0.14 327.21); --chart-1: oklch(0.58 0.14 327.21); --chart-2: oklch(0.77 0.13 223.19); --chart-3: oklch(0.69 0.14 160.23); --chart-4: oklch(0.59 0.22 11.50); --chart-5: oklch(0.80 0.15 82.64); --sidebar: oklch(0.23 0.01 255.60); --sidebar-foreground: oklch(0.93 0 0); --sidebar-primary: oklch(0.58 0.14 327.21); --sidebar-primary-foreground: oklch(1.00 0 0); --sidebar-accent: oklch(0.33 0.03 326.23); --sidebar-accent-foreground: oklch(0.93 0 0); --sidebar-border: oklch(0.30 0.01 268.37); --sidebar-ring: oklch(0.58 0.14 327.21); --shadow-color: oklch(0 0 0 / 0.01); --shadow-opacity: 0.01; --shadow-blur: 3px; --shadow-spread: 0px; --shadow-offset-x: 0px; --shadow-offset-y: 1px;",
  "Pastel Dreams": "font-family: \"Geist Mono\", \"Geist Mono Fallback\"; --font-sans: \"Geist Mono\", \"Geist Mono Fallback\"; color-scheme: dark; --radius: 0.45rem; scrollbar-gutter: stable; --background: oklch(0.22 0.01 56.04); --foreground: oklch(0.93 0.03 272.79); --card: oklch(0.28 0.03 307.23); --card-foreground: oklch(0.93 0.03 272.79); --popover: oklch(0.28 0.03 307.23); --popover-foreground: oklch(0.93 0.03 272.79); --primary: oklch(0.79 0.12 295.75); --primary-foreground: oklch(0.22 0.01 56.04); --secondary: oklch(0.34 0.04 308.85); --secondary-foreground: oklch(0.87 0.01 258.34); --muted: oklch(0.28 0.03 307.23); --muted-foreground: oklch(0.71 0.02 261.32); --accent: oklch(0.39 0.05 304.64); --accent-foreground: oklch(0.87 0.01 258.34); --destructive: oklch(0.81 0.10 19.57); --border: oklch(0.34 0.04 308.85); --input: oklch(0.34 0.04 308.85); --ring: oklch(0.79 0.12 295.75); --chart-1: oklch(0.79 0.12 295.75); --chart-2: oklch(0.71 0.16 293.54); --chart-3: oklch(0.61 0.22 292.72); --chart-4: oklch(0.54 0.25 293.01); --chart-5: oklch(0.49 0.24 292.58); --sidebar: oklch(0.34 0.04 308.85); --sidebar-foreground: oklch(0.93 0.03 272.79); --sidebar-primary: oklch(0.79 0.12 295.75); --sidebar-primary-foreground: oklch(0.22 0.01 56.04); --sidebar-accent: oklch(0.39 0.05 304.64); --sidebar-accent-foreground: oklch(0.87 0.01 258.34); --sidebar-border: oklch(0.34 0.04 308.85); --sidebar-ring: oklch(0.79 0.12 295.75); --shadow-color: oklch(0 0 0 / 0.01); --shadow-opacity: 0.01; --shadow-blur: 3px; --shadow-spread: 0px; --shadow-offset-x: 0px; --shadow-offset-y: 1px;"
};

export const AVAILABLE_FONTS = [
  { label: "Geist Mono", value: "'Geist Mono', monospace" },
  { label: "Inter", value: "'Inter', sans-serif" },
  { label: "IBM Plex Sans", value: "'IBM Plex Sans', sans-serif" },
  { label: "Roboto", value: "'Roboto', sans-serif" },
  { label: "JetBrains Mono", value: "'JetBrains Mono', monospace" },
];

export function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [preset, setPreset] = useState("Default");
  const [font, setFont] = useState("'Geist Mono', monospace");
  const [colorMode, setColorMode] = useState<"light" | "dark" | "system">("light");
  const [radius, setRadius] = useState("0.625rem");
  const [layout, setLayout] = useState<"compact" | "full">("compact");
  const [scale, setScale] = useState<"sm" | "md" | "lg">("md");
  const [sidebarVariant, setSidebarVariant] = useState<"default" | "inset" | "floating">("inset");
  const [sidebarMode, setSidebarMode] = useState<"default" | "icon" | "full">("default");

  const popoverRef = useRef<HTMLDivElement>(null);

  // Apply settings to documentElement
  const applySettings = (settings: {
    preset: string;
    font: string;
    colorMode: "light" | "dark" | "system";
    radius: string;
    layout: "compact" | "full";
    scale: "sm" | "md" | "lg";
    sidebarVariant: "default" | "inset" | "floating";
    sidebarMode: "default" | "icon" | "full";
  }) => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;

    // 1. Color mode
    let effectiveDark = settings.colorMode === "dark";
    if (settings.colorMode === "system") {
      effectiveDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    if (effectiveDark) {
      root.classList.add("dark");
      root.classList.remove("light");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      root.style.colorScheme = "light";
    }

    // 2. Preset styles
    const presetStyle = THEME_PRESETS[settings.preset];
    if (presetStyle) {
      const pairs = presetStyle.split(";").filter(p => p.trim());
      pairs.forEach(pair => {
        const [k, v] = pair.split(":");
        if (k && v) {
          root.style.setProperty(k.trim(), v.trim());
        }
      });
    }

    // 3. Font
    root.style.setProperty("font-family", settings.font);
    root.style.setProperty("--font-sans", settings.font);
    root.style.setProperty("--font-geist-mono", settings.font);
    document.body.style.fontFamily = settings.font;

    // 4. Radius
    root.style.setProperty("--radius", settings.radius);

    // 5. Scale
    if (settings.scale === "md") {
      root.removeAttribute("data-theme-scale");
    } else {
      root.setAttribute("data-theme-scale", settings.scale);
    }

    // 6. Layout
    root.setAttribute("data-content-layout", settings.layout);

    // 7. Sidebar variant
    const wrapper = document.querySelector('[data-slot="sidebar-wrapper"]');
    if (wrapper) {
      wrapper.setAttribute("data-variant", settings.sidebarVariant);
    }

    // 8. Sidebar state
    const sidebar = document.querySelector('[data-slot="sidebar"]');
    if (sidebar) {
      sidebar.setAttribute("data-state", settings.sidebarMode === "icon" ? "collapsed" : "expanded");
    }

    // Persist
    localStorage.setItem("cargorix_theme_settings", JSON.stringify(settings));
  };

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("cargorix_theme_settings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPreset(parsed.preset || "Default");
        setFont(parsed.font || "'Geist Mono', monospace");
        setColorMode(parsed.colorMode || "light");
        setRadius(parsed.radius || "0.625rem");
        setLayout(parsed.layout || "compact");
        setScale(parsed.scale || "md");
        setSidebarVariant(parsed.sidebarVariant || "inset");
        setSidebarMode(parsed.sidebarMode || "default");
        applySettings(parsed);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Update handler
  const updateSetting = (key: string, val: any) => {
    const updated = {
      preset: key === "preset" ? val : preset,
      font: key === "font" ? val : font,
      colorMode: key === "colorMode" ? val : colorMode,
      radius: key === "radius" ? val : radius,
      layout: key === "layout" ? val : layout,
      scale: key === "scale" ? val : scale,
      sidebarVariant: key === "sidebarVariant" ? val : sidebarVariant,
      sidebarMode: key === "sidebarMode" ? val : sidebarMode,
    };
    if (key === "preset") setPreset(val);
    if (key === "font") setFont(val);
    if (key === "colorMode") setColorMode(val);
    if (key === "radius") setRadius(val);
    if (key === "layout") setLayout(val);
    if (key === "scale") setScale(val);
    if (key === "sidebarVariant") setSidebarVariant(val);
    if (key === "sidebarMode") setSidebarMode(val);

    applySettings(updated);
  };

  // Reset to default
  const handleReset = () => {
    const defaultSettings = {
      preset: "Default",
      font: "'Geist Mono', monospace",
      colorMode: "light" as const,
      radius: "0.625rem",
      layout: "compact" as const,
      scale: "md" as const,
      sidebarVariant: "inset" as const,
      sidebarMode: "default" as const,
    };
    setPreset("Default");
    setFont("'Geist Mono', monospace");
    setColorMode("light");
    setRadius("0.625rem");
    setLayout("compact");
    setScale("md");
    setSidebarVariant("inset");
    setSidebarMode("default");
    applySettings(defaultSettings);
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block" ref={popoverRef}>
      <button
        type="button"
        aria-label="Customize theme"
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex size-9 items-center justify-center rounded-md border border-input bg-background text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        <Palette className="size-4" />
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-label="Theme Customizer"
          className="bg-popover text-popover-foreground fixed md:absolute right-4 md:right-0 top-16 md:top-12 z-50 flex max-h-[85vh] w-80 flex-col gap-4 overflow-y-auto rounded-xl p-5 shadow-2xl ring-1 ring-border border border-border backdrop-blur-md"
        >
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div>
              <h4 className="font-semibold text-sm">Theme Customizer</h4>
              <p className="text-xs text-muted-foreground mt-0.5">Customize your template styling.</p>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleReset}
                title="Reset to Default"
                className="size-7 rounded-md flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground text-xs"
              >
                <RotateCcw className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="size-7 rounded-md flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground text-xs"
              >
                <X className="size-3.5" />
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Theme Preset</label>
            <select
              value={preset}
              onChange={(e) => updateSetting("preset", e.target.value)}
              className="h-8 w-full rounded-md border border-input bg-background px-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            >
              {Object.keys(THEME_PRESETS).map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Font</label>
            <select
              value={font}
              onChange={(e) => updateSetting("font", e.target.value)}
              className="h-8 w-full rounded-md border border-input bg-background px-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            >
              {AVAILABLE_FONTS.map((f) => (
                <option key={f.label} value={f.value}>{f.label}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Color Mode</label>
            <div className="grid grid-cols-3 gap-1 rounded-lg bg-muted p-1 text-xs">
              {(["light", "dark", "system"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => updateSetting("colorMode", mode)}
                  className={`py-1 text-center font-medium capitalize rounded-md transition-colors ${
                    colorMode === mode
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Radius</label>
            <div className="grid grid-cols-3 gap-1 rounded-lg bg-muted p-1 text-xs">
              {[
                { label: "SM", value: "0.45rem" },
                { label: "MD", value: "0.625rem" },
                { label: "LG", value: "0.85rem" },
              ].map((r) => (
                <button
                  key={r.label}
                  type="button"
                  onClick={() => updateSetting("radius", r.value)}
                  className={`py-1 text-center font-medium rounded-md transition-colors ${
                    radius === r.value
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Content Layout</label>
            <div className="grid grid-cols-2 gap-1 rounded-lg bg-muted p-1 text-xs">
              {(["compact", "full"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => updateSetting("layout", l)}
                  className={`py-1 text-center font-medium capitalize rounded-md transition-colors ${
                    layout === l
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Scale</label>
            <div className="grid grid-cols-3 gap-1 rounded-lg bg-muted p-1 text-xs">
              {(["sm", "md", "lg"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => updateSetting("scale", s)}
                  className={`py-1 text-center font-medium uppercase rounded-md transition-colors ${
                    scale === s
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Sidebar Variant</label>
            <div className="grid grid-cols-3 gap-1 rounded-lg bg-muted p-1 text-xs">
              {(["default", "inset", "floating"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => updateSetting("sidebarVariant", v)}
                  className={`py-1 text-center font-medium capitalize rounded-md transition-colors ${
                    sidebarVariant === v
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Sidebar Mode</label>
            <div className="grid grid-cols-3 gap-1 rounded-lg bg-muted p-1 text-xs">
              {(["default", "icon", "full"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => updateSetting("sidebarMode", m)}
                  className={`py-1 text-center font-medium capitalize rounded-md transition-colors ${
                    sidebarMode === m
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
