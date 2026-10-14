/**
 * C+ the inline icon set, from the approved prototype (proto/direction-c-plus 0a8b611, components/proto-cplus/Icons.tsx), unchanged.
 */
const P: Record<string, string> = {
  search: 'M10.5 3.5a7 7 0 1 1 0 14 7 7 0 0 1 0-14Zm5 12 5 5',
  page: 'M5 3.5h10l4 4v13H5zM15 3.5v4h4M8.5 11h7M8.5 14.5h7M8.5 18h4',
  form: 'M4 4.5h16v15H4zM7.5 9h9M7.5 12.5h9M7.5 16h5',
  cursor: 'M6 3.5l12 7-5.5 1.5L10 17.5z M12.5 12l4.5 6',
  check: 'M4.5 12.5l5 5 10-11',
  cross: 'M6 6l12 12M18 6 6 18',
  chart: 'M4 20.5h16M7 17v-5M12 17V7M17 17v-8',
  eyeoff: 'M3 12s3.5-6.5 9-6.5S21 12 21 12s-3.5 6.5-9 6.5S3 12 3 12Zm9-3a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM4 4l16 16',
  wrench: 'M14.5 4a4.5 4.5 0 0 0-4.2 6.1L4 16.4 7.6 20l6.3-6.3A4.5 4.5 0 0 0 20 9.5l-2.7 2.7-3.5-.7-.7-3.5L15.8 5.3 14.5 4Z',
  build: 'M4 20.5h16M6 20.5v-9l6-5 6 5v9M10 20.5v-5h4v5',
  devices: 'M3.5 6h12v9h-12zM2 18h15M18 9h4v11h-4z',
  message: 'M4 5h16v11H9l-5 4z',
  user: 'M12 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8ZM4.5 20.5c1.2-3.6 4-5.5 7.5-5.5s6.3 1.9 7.5 5.5',
  phone: 'M7 3.5h3l1.5 4.5L9.3 9.6a11 11 0 0 0 5.1 5.1l1.6-2.2 4.5 1.5v3c0 1.4-1.1 2.5-2.5 2.5C10.4 19.5 4.5 13.6 4.5 6c0-1.4 1.1-2.5 2.5-2.5Z',
  key: 'M8 14.5a4.5 4.5 0 1 1 3.9-6.7L20.5 8v3.5H18V14h-3v-2.5h-3.1A4.5 4.5 0 0 1 8 14.5Zm-1-4.5h.1',
  clock: 'M12 3.5a8.5 8.5 0 1 1 0 17 8.5 8.5 0 0 1 0-17ZM12 7.5V12l3 2',
  arrow: 'M4 12h15M13.5 6.5 19 12l-5.5 5.5',
  target: 'M12 3.5a8.5 8.5 0 1 1 0 17 8.5 8.5 0 0 1 0-17Zm0 4a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 4h.1',
};

export function Icon({ name, size = 24, className }: { name: string; size?: number; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <path d={P[name] || P.target} />
    </svg>
  );
}
