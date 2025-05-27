export default function OrnementVague({ className = '' }) {
  return (
    <svg viewBox="0 0 800 200" className={className} preserveAspectRatio="xMidYMid meet">
      <path
        d="M0,100 C100,150 200,50 300,100 C400,150 500,50 600,100 C700,150 800,50 900,100"
        fill="none"
        stroke="#B87333"
        strokeWidth="2"
        opacity="0.15"
      />
    </svg>
  )
}
