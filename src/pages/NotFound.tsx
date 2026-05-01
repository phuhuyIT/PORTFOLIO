import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-8xl font-black italic text-accent drop-shadow-[0_0_15px_rgba(255,45,45,0.3)]">404</h1>
        <p className="mb-8 text-2xl font-mono uppercase tracking-widest text-muted-foreground">System Error: Route Not Found</p>
        <a href="/" className="pill liquid-glass-accent text-accent">
          Initialize Return Sequence
        </a>
      </div>
    </div>
  );
};

export default NotFound;
