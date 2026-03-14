import Link from "next/link";

const NAV_ITEMS = [
  {
    href: "/game",
    title: "Game Mode",
    description: "Play four-player Enochian chess against AI or other players",
    icon: "♔",
    color: "text-[var(--color-fire)]",
  },
  {
    href: "/how-to-play",
    title: "How to Play",
    description: "Learn the rules, piece movements, alliances, and beginner tips",
    icon: "📜",
    color: "text-[var(--color-gold)]",
  },
  {
    href: "/divination",
    title: "Divination",
    description: "Perform readings using the Enochian chess divination system",
    icon: "☽",
    color: "text-[var(--color-water)]",
  },
  {
    href: "/encyclopedia",
    title: "Encyclopedia",
    description: "Explore the Golden Dawn system, pieces, and board attributions",
    icon: "📖",
    color: "text-[var(--color-air)]",
  },
  {
    href: "/multiplayer",
    title: "Online Play",
    description: "Create or join multiplayer sessions with real-time matchmaking",
    icon: "⚔",
    color: "text-[var(--color-fire)]",
  },
  {
    href: "/leaderboard",
    title: "Leaderboard",
    description: "Global rankings for players and practitioners",
    icon: "⚡",
    color: "text-[var(--color-earth)]",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center mb-16">
        <h1 className="text-5xl font-bold tracking-tight text-[var(--color-gold)] mb-4"
            style={{ fontFamily: "Cinzel, serif" }}>
          Enochian Chess
        </h1>
        <p className="text-[var(--color-muted)] text-lg">
          The Golden Dawn&apos;s four-player chess variant &amp; divination system
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl w-full">
        {NAV_ITEMS.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            className={`group block p-6 rounded-lg bg-[var(--color-card)] border border-[var(--color-border)] hover:border-[var(--color-gold-dark)] transition-colors${
              i === NAV_ITEMS.length - 1 && NAV_ITEMS.length % 2 === 1 ? " md:col-span-2" : ""
            }`}
          >
            <div className={`text-3xl mb-3 ${item.color}`}>{item.icon}</div>
            <h2 className="text-xl font-semibold mb-2 group-hover:text-[var(--color-gold)] transition-colors">
              {item.title}
            </h2>
            <p className="text-sm text-[var(--color-muted)]">{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
