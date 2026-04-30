import { useEffect, useState } from "react";
import { Moon, Sun, Settings2, Type } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

type Theme = "light" | "dark";

const THEME_KEY = "pref:theme";
const FONT_KEY = "pref:font-scale";

const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem(THEME_KEY) as Theme | null;
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const getInitialScale = (): number => {
  if (typeof window === "undefined") return 1;
  const stored = parseFloat(localStorage.getItem(FONT_KEY) ?? "");
  return Number.isFinite(stored) && stored >= 0.85 && stored <= 1.3 ? stored : 1;
};

export const ThemeSettings = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [scale, setScale] = useState<number>(getInitialScale);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.fontSize = `${scale * 100}%`;
    localStorage.setItem(FONT_KEY, String(scale));
  }, [scale]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:border-ring";

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
      <Button
        type="button"
        size="icon"
        variant="outline"
        onClick={toggleTheme}
        aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
        className={`rounded-full shadow-md backdrop-blur bg-background/80 ${focusRing}`}
      >
        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            size="icon"
            variant="outline"
            aria-label="Open display settings"
            className={`rounded-full shadow-md backdrop-blur bg-background/80 ${focusRing} data-[state=open]:ring-2 data-[state=open]:ring-ring data-[state=open]:ring-offset-2 data-[state=open]:ring-offset-background`}
          >
            <Settings2 className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" side="top" className="w-64 p-3">
          <DropdownMenuLabel className="flex items-center gap-2">
            <Type className="h-4 w-4" />
            Text size
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="px-1 py-2 space-y-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>A</span>
              <span className="tabular-nums">{Math.round(scale * 100)}%</span>
              <span className="text-base">A</span>
            </div>
            <Slider
              min={85}
              max={130}
              step={5}
              value={[Math.round(scale * 100)]}
              onValueChange={(v) => setScale((v[0] ?? 100) / 100)}
              aria-label="Adjust font size"
              className="[&_[role=slider]]:focus-visible:ring-4 [&_[role=slider]]:focus-visible:ring-ring/60 [&_[role=slider]]:focus-visible:ring-offset-2 [&_[role=slider]]:focus-visible:ring-offset-background [&_[role=slider]]:focus-visible:scale-110 [&_[role=slider]]:transition-transform"
            />
            <div className="flex justify-between gap-2">
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => setScale(1)}
                className={`text-xs ${focusRing}`}
              >
                Reset
              </Button>
              <div className="flex gap-1">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => setScale((s) => Math.max(0.85, +(s - 0.05).toFixed(2)))}
                  aria-label="Decrease font size"
                  className={focusRing}
                >
                  −
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => setScale((s) => Math.min(1.3, +(s + 0.05).toFixed(2)))}
                  aria-label="Increase font size"
                  className={focusRing}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};