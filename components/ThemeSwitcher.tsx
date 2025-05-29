import { Button } from "@/components/ui/button";
import { Sun, Moon, Laptop } from "lucide-react";
import { ThemeMode } from "@/hooks/useTheme";
import { useEffect, useState } from "react";

interface ThemeSwitcherProps {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

const themeCycle: ThemeMode[] = ['light', 'dark', 'system'];

export default function ThemeSwitcher({ theme, setTheme }: ThemeSwitcherProps) {
  const [currentIcon, setCurrentIcon] = useState(<Laptop className="h-5 w-5" />);

  useEffect(() => {
    switch (theme) {
      case 'light':
        setCurrentIcon(<Sun className="h-5 w-5" />);
        break;
      case 'dark':
        setCurrentIcon(<Moon className="h-5 w-5" />);
        break;
      case 'system':
      default:
        setCurrentIcon(<Laptop className="h-5 w-5" />);
        break;
    }
  }, [theme]);

  const handleClick = () => {
    const currentIndex = themeCycle.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeCycle.length;
    setTheme(themeCycle[nextIndex]);
  };

  const getAriaLabel = () => {
    switch (theme) {
      case 'light':
        return "Switch to dark theme";
      case 'dark':
        return "Switch to system theme";
      case 'system':
      default:
        return "Switch to light theme";
    }
  }

  return (
    <div className="flex items-center">
      <Button
        variant="ghost" 
        size="icon"
        onClick={handleClick}
        aria-label={getAriaLabel()}
      >
        {currentIcon}
      </Button>
    </div>
  );
}
