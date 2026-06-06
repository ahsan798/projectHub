import { cn } from '@/utils/cn';

interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeStyles = {
  sm:  'w-7 h-7 text-xs',
  md:  'w-9 h-9 text-sm',
  lg:  'w-11 h-11 text-base',
};

/** Deterministic hue from a string — always same color for same name */
function hueFromName(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}

export function Avatar({ name, size = 'md', className }: AvatarProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const hue = hueFromName(name);
  const bgColor = `hsl(${hue} 60% 40%)`;
  const textColor = `hsl(${hue} 30% 90%)`;

  return (
    <span
      role="img"
      aria-label={name}
      title={name}
      className={cn(
        'inline-flex items-center justify-center rounded-full font-semibold shrink-0 select-none',
        sizeStyles[size],
        className,
      )}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {initials}
    </span>
  );
}
