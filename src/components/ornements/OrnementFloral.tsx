export default function OrnementFloral({ className = '' }) {
  return (
    <svg viewBox="0 0 400 400" className={className} preserveAspectRatio="xMidYMid meet">
      <g transform="translate(200, 200)">
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 360) / 24
          return (
            <circle
              key={i}
              cx={Math.cos((angle * Math.PI) / 180) * 140}
              cy={Math.sin((angle * Math.PI) / 180) * 140}
              r="4"
              fill="#FFD700"
              opacity="0.2"
            />
          )
        })}
      </g>
    </svg>
  )
}
