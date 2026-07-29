// The small 3-color dash motif the reference site repeats as a section
// divider: sage/indigo/a muted third tone instead of their teal/orange/yellow.
export function DashDivider() {
  return (
    <div className="flex justify-center gap-1.5 my-5">
      <span className="w-6 h-[3px] rounded-full bg-wtl-sage" />
      <span className="w-6 h-[3px] rounded-full bg-wtl-indigo" />
      <span className="w-6 h-[3px] rounded-full bg-ink/30" />
    </div>
  )
}
