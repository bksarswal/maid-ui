import Link from "next/link";
import { Home } from "lucide-react";

interface LogoInterface {
  showText?: boolean;
  size?: number;
}

const Logo = ({showText = true,size = 32}: LogoInterface) =>{
  return (
    <Link
      href="/"
      className="flex items-center gap-3 transition-opacity hover:opacity-80"
    >
      <div
        className="flex items-center justify-center rounded-xl bg-primary text-primary-foreground"
        style={{
          width: size,
          height: size,
        }}
      >
        <Home size={size * 0.6} />
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className="text-xl font-bold tracking-tight">
            MaidHire
          </span>
          <span className="text-xs text-muted-foreground">
            Find Trusted Maids
          </span>
        </div>
      )}
    </Link>
  );
}


export default Logo