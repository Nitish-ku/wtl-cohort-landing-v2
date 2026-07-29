// A soft wave divider between two differently-colored sections, matching the
// reference site's rhythm (it never uses a hard rectangular cut between
// color blocks). `fill` should be the color of the section this wave leads
// INTO; `flip` mirrors it vertically for the transition back out.
export function Wave({ fill, flip = false }) {
  return (
    <div className={flip ? 'rotate-180' : ''} style={{ lineHeight: 0 }}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-[50px] block">
        <path
          d="M0,32 C240,80 480,0 720,24 C960,48 1200,72 1440,32 L1440,80 L0,80 Z"
          fill={fill}
        />
      </svg>
    </div>
  )
}
