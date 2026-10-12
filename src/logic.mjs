export const hours = [
  { day: "Sunday", open: 840, close: 1320, label: "2 pm – 10 pm" },
  { day: "Monday", open: 450, close: 1440, label: "7:30 am – midnight" },
  { day: "Tuesday", open: 450, close: 1440, label: "7:30 am – midnight" },
  { day: "Wednesday", open: 450, close: 1440, label: "7:30 am – midnight" },
  { day: "Thursday", open: 450, close: 1440, label: "7:30 am – midnight" },
  { day: "Friday", open: 450, close: 1020, label: "7:30 am – 5 pm" },
  { day: "Saturday", open: 570, close: 1020, label: "9:30 am – 5 pm" },
];
export function shopStatus(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const part = (type) => parts.find((p) => p.type === type)?.value;
  const today = hours.find((h) => h.day === part("weekday"));
  const minute = Number(part("hour")) * 60 + Number(part("minute"));
  const open = minute >= today.open && minute < today.close;
  const next =
    minute < today.open ? today : hours[(hours.indexOf(today) + 1) % 7];
  const fmt = (n) =>
    n === 1440
      ? "midnight"
      : `${Math.floor(n / 60) % 12 || 12}${n % 60 ? ":30" : ""} ${n < 720 ? "am" : "pm"}`;
  return {
    open,
    day: today.day,
    label: open
      ? `Open until ${fmt(today.close)}`
      : `Opens ${next === today ? "today" : next.day} at ${fmt(next.open)}`,
  };
}
export const money = (value) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    value,
  );
export function filterMenu(items, category, query, preference, favorites = []) {
  return items.filter(
    (item) =>
      (category === "All" || item.category === category) &&
      `${item.name} ${item.description}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()) &&
      (preference === "All" ||
        (preference === "Iced" && item.iced) ||
        (preference === "Hot" && item.hot) ||
        (preference === "Caffeine-free" && item.caffeineFree) ||
        (preference === "Saved" && favorites.includes(item.id))),
  );
}
