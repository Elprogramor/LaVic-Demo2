import type { SVGProps } from "react";

export type IconName =
  | "home" | "orders" | "box" | "boxes" | "users" | "handshake" | "megaphone"
  | "store" | "wallet" | "chart" | "settings" | "search" | "bell" | "plus"
  | "chevronDown" | "chevronRight" | "menu" | "close" | "filter" | "more"
  | "calendar" | "truck" | "card" | "check" | "clock" | "alert" | "export"
  | "edit" | "print" | "message" | "archive" | "refund" | "tag" | "layers" | "clipboard" | "swap"
  | "phone" | "mail" | "shield" | "lock" | "activity" | "monitor" | "key";

const paths: Record<IconName, React.ReactNode> = {
  home: <><path d="M3 10.8 12 3l9 7.8"/><path d="M5.5 9.5V21h13V9.5"/><path d="M9.5 21v-7h5v7"/></>,
  orders: <><path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z"/><path d="M9 8h6M9 12h6"/></>,
  box: <><path d="m4 7 8-4 8 4-8 4-8-4Z"/><path d="M4 7v10l8 4 8-4V7M12 11v10"/></>,
  boxes: <><path d="m3 7 5-3 5 3-5 3-5-3Z"/><path d="M3 7v6l5 3 5-3V7M8 10v6"/><path d="m11 13 5-3 5 3-5 3-5-3Z"/><path d="M11 13v6l5 3 5-3v-6M16 16v6"/></>,
  users: <><circle cx="9" cy="8" r="3"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0"/><circle cx="17" cy="9" r="2.5"/><path d="M15 15.5c3.8-.9 6 1.2 6 4.5"/></>,
  handshake: <><path d="m8 12 3 3c1 1 2.3 1 3.3 0l4.7-4.7"/><path d="m3 9 5-4 4 2 4-2 5 4"/><path d="m3 9 4 8 3-2M21 9l-4 8-3-2"/></>,
  megaphone: <><path d="M3 11v3l11 4V7L3 11Z"/><path d="M14 9c3 0 5-1.3 7-3v13c-2-1.7-4-3-7-3"/><path d="m6 15 1.5 5h4L10 16"/></>,
  store: <><path d="M4 10v11h16V10"/><path d="M3 10h18l-2-6H5l-2 6Z"/><path d="M8 21v-6h8v6"/></>,
  wallet: <><path d="M4 6h15a2 2 0 0 1 2 2v11H5a2 2 0 0 1-2-2V7a3 3 0 0 1 3-3h11"/><path d="M16 11h5v5h-5a2.5 2.5 0 0 1 0-5Z"/></>,
  chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M19 13.5a7.5 7.5 0 0 0 0-3l2-1.5-2-3.5-2.5 1a8 8 0 0 0-2.5-1.5L13.5 2h-4L9 5a8 8 0 0 0-2.5 1.5L4 5.5 2 9l2 1.5a7.5 7.5 0 0 0 0 3L2 15l2 3.5 2.5-1A8 8 0 0 0 9 19l.5 3h4l.5-3a8 8 0 0 0 2.5-1.5l2.5 1L21 15l-2-1.5Z"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z"/><path d="M10 21h4"/></>,
  plus: <path d="M12 5v14M5 12h14"/>,
  chevronDown: <path d="m7 10 5 5 5-5"/>,
  chevronRight: <path d="m10 7 5 5-5 5"/>,
  menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
  close: <path d="m6 6 12 12M18 6 6 18"/>,
  filter: <path d="M4 6h16M7 12h10M10 18h4"/>,
  more: <><circle cx="5" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none"/></>,
  calendar: <><path d="M5 3v4M19 3v4M3 9h18M5 5h14a2 2 0 0 1 2 2v14H3V7a2 2 0 0 1 2-2Z"/></>,
  truck: <><path d="M3 6h11v11H3V6ZM14 10h4l3 3v4h-7v-7Z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></>,
  card: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/></>,
  check: <path d="m5 12 4 4L19 6"/>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  alert: <><path d="M12 3 2.5 20h19L12 3Z"/><path d="M12 9v4M12 17h.01"/></>,
  export: <><path d="M12 3v12M7 8l5-5 5 5"/><path d="M5 13v7h14v-7"/></>,
  edit: <><path d="m4 16-.8 4.8L8 20l11-11-4-4L4 16Z"/><path d="m13.5 6.5 4 4"/></>,
  print: <><path d="M7 9V3h10v6M7 17v4h10v-4"/><path d="M5 9h14a2 2 0 0 1 2 2v6h-4v-3H7v3H3v-6a2 2 0 0 1 2-2Z"/></>,
  message: <path d="M4 5h16v12H9l-5 4V5Z"/>,
  archive: <><path d="M3 6h18v4H3V6ZM5 10v10h14V10M9 14h6"/></>,
  refund: <><path d="M4 8h11a5 5 0 1 1 0 10h-3"/><path d="m7 4-4 4 4 4"/></>,
  tag: <><path d="M3 12V4h8l10 10-7 7L3 12Z"/><circle cx="8" cy="8" r="1.5"/></>,
  layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/></>,
  clipboard: <><path d="M9 4h6l1 2h3v15H5V6h3l1-2Z"/><path d="M9 4v3h6V4M8 12h8M8 16h6"/></>,
  swap: <><path d="M4 7h13l-3-3M20 17H7l3 3"/><path d="M17 7l-3 3M7 17l3-3"/></>,
  phone: <path d="M5 3h4l2 5-2.5 1.8a15 15 0 0 0 5.7 5.7L16 13l5 2v4c0 1.1-.9 2-2 2C10.2 21 3 13.8 3 5a2 2 0 0 1 2-2Z"/>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>,
  shield: <><path d="M12 3 20 6v5c0 5-3.3 8.3-8 10-4.7-1.7-8-5-8-10V6l8-3Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></>,
  lock: <><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/></>,
  activity: <><path d="M3 12h4l2.2-5 4.1 10 2.3-5H21"/></>,
  monitor: <><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></>,
  key: <><circle cx="8" cy="15" r="4"/><path d="m11 12 8-8M15 8l2 2M17 6l2 2"/></>,
};

export function Icon({ name, size = 18, ...props }: SVGProps<SVGSVGElement> & { name: IconName; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      {paths[name]}
    </svg>
  );
}
