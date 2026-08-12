import React from 'react';

export const BlogSection = () => {
  const articles = [
    {
      title: "Zodiac Sign by Birthday",
      desc: "Every sign, every date. The full guide to Western astrology.",
      href: "#zodiac"
    },
    {
      title: "What Your Birth Month Says About You",
      desc: "The science behind birth month effects on personality and health.",
      href: "#birth-month"
    },
    {
      title: "Life Expectancy by Country",
      desc: "Full global rankings and the five factors that drive the differences.",
      href: "#life-expectancy-blog"
    },
    {
      title: "Milestone Birthdays: 30, 40, 50, 60",
      desc: "What the science actually says about every major milestone birthday.",
      href: "#milestones"
    }
  ];

  return (
    <div id="blog" className="mt-24 sm:mt-28">
      <div className="flex items-baseline justify-between mb-8">
        <p className="text-[var(--muted)] text-xs tracking-[0.3em] uppercase font-medium">
          From the blog
        </p>
        <a 
          href="#blog-all" 
          className="text-xs tracking-widest uppercase text-[var(--muted)] hover:text-[var(--gold)] transition-colors duration-200"
        >
          All articles →
        </a>
      </div>

      <div className="grid sm:grid-cols-2 gap-px border border-[var(--border)] bg-[var(--border)]">
        {articles.map((art, idx) => (
          <a
            key={idx}
            href={art.href}
            className="group bg-[var(--bg)] px-6 py-6 hover:bg-[var(--surface)] transition-colors duration-150 block"
          >
            <h3 className="text-sm font-medium text-[var(--text)] mb-1.5 group-hover:text-[var(--gold)] transition-colors duration-200">
              {art.title}
            </h3>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              {art.desc}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};
