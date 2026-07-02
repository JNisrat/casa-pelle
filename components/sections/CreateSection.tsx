export function CreateSection() {
  return (
    <section
      id="create"
      className="flex h-svh flex-col overflow-hidden bg-white"
      data-testid="create-section"
    >
      <h2 className="shrink-0 px-6 pt-20 pb-10 text-center font-display text-[45px] font-medium md:px-16 lg:px-28">
        How we create our bags
      </h2>
      <div className="relative mx-auto min-h-0 w-full max-w-[var(--max-width)] flex-1 overflow-hidden px-6 md:px-16 lg:px-28">
        <video
          src="/images/Video%20Project%2016.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          aria-label="Craftsman creating leather bags"
        />
      </div>
    </section>
  );
}
