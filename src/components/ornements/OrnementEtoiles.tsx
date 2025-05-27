export default function OrnementEtoiles({ className = '' }) {
  const stars = Array.from({ length: 20 }).map((_, i) => ({
    cx: Math.random() * 400,
    cy: Math.random() * 400,
    r: 0.8 + Math.random() * 1.5,
  }))

  return (
    <svg viewBox="0 0 400 400" className={className} preserveAspectRatio="xMidYMid slice">
      {stars.map((star, i) => (
        <circle
          key={i}
          cx={star.cx}
          cy={star.cy}
          r={star.r}
          fill="#FFD700"
          opacity={0.1 + Math.random() * 0.2}
        />
      ))}
    </svg>
  )
}
