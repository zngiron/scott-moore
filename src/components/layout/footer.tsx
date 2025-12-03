export function Footer() {
  return (
    <footer className="relative min-h-[600px] overflow-hidden bg-black">
      {/* Decorative Circle */}
      <div className="pointer-events-none absolute -left-32 top-80 size-[800px]">
        <svg
          className="size-full"
          viewBox="0 0 800 800"
          fill="none"
          preserveAspectRatio="none"
        >
          <circle
            cx="400"
            cy="400"
            r="399"
            stroke="#d6d3d1"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative flex min-h-[500px] items-center px-6 py-24 md:px-36">
        <div className="flex w-full flex-col justify-between gap-12 lg:flex-row lg:items-start">
          {/* Left - Title */}
          <h2 className="font-display text-5xl font-light leading-tight text-stone-50 md:text-6xl">
            Contact
          </h2>

          {/* Right - Content */}
          <div className="flex max-w-xl flex-col gap-6">
            <p className="text-lg leading-7 text-white">
              Let's discuss how we can optimize your financial strategy and
              preserve your wealth for generations to come.
            </p>

            {/* Email */}
            <div className="flex flex-col text-white">
              <span className="text-sm leading-5">Email</span>
              <a
                href="mailto:hi@scottmoore.com"
                className="text-sm leading-5 underline transition-opacity hover:opacity-80"
              >
                hi@scottmoore.com
              </a>
            </div>

            {/* LinkedIn */}
            <div className="flex flex-col text-white">
              <span className="text-sm leading-5">LinkedIn</span>
              <a
                href="https://www.linkedin.com/in/scott-moore-78023a20"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm leading-5 underline transition-opacity hover:opacity-80"
              >
                linkedin/in/scott-moore-78023a20
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <p className="absolute bottom-8 left-6 text-sm text-white md:left-36">
        © 2025 Scott Moore. All rights reserved.
      </p>
    </footer>
  );
}
