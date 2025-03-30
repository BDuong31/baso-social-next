import Image from 'next/image';

//----------------------------------------------------------------------

// export default function Logo({ className }: { className?: string }) {
//   return (
//     <Image
//       src={'/img/logo.png'}
//       width={200}
//       height={200}
//       alt="logo"
//       className={`w-[60px] h-auto ${className}`}
//     />
//   );
// }

interface LogoProps {
  className?: string;
  color?: string;
  width?: number;
  height?: number;
}
export default function Logo({ className, color, width = 60, height = 60 }: LogoProps) {
  return (
    <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 390.443 499.333"
    width={width} 
    height={height}
    className={`w-[${width}px] h-auto ${className}`}
    >
      <defs>
        <linearGradient
          id="instagramGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop
            offset="0%"
            style={{
              stopColor: "#feda75",
              stopOpacity: 1,
            }}
          />
          <stop
            offset="25%"
            style={{
              stopColor: "#fa7e1e",
              stopOpacity: 1,
            }}
          />
          <stop
            offset="50%"
            style={{
              stopColor: "#d62976",
              stopOpacity: 1,
            }}
          />
          <stop
            offset="75%"
            style={{
              stopColor: "#962fbf",
              stopOpacity: 1,
            }}
          />
          <stop
            offset="100%"
            style={{
              stopColor: "#4f5bd5",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
      </defs>
        <path 
            fill={color ? color :  "url(#instagramGradient)" } 
            d="M 272.095 111.166 L 272.42 0.334 L 112.261 131.551 L 80.373 131.058 L 223.407 241.449 L 213.568 241.162 L 95.432 335.325 L 94.766 176.69 L 77.256 192.23 L 76.499 354.042 L 100.833 353.948 L 223.577 257.178 C 223.577 257.178 333.253 258.622 335.167 258.483 C 337.081 258.346 244.665 333.077 244.665 333.077 L 327.685 399.648 L 270.493 445.168 C 270.493 445.168 48.988 445.797 49.089 445.797 C 49.19 445.797 277.102 262.42 277.102 262.42 L 249.919 262.379 C 249.919 262.379 0.747 461.492 0.747 461.396 C 0.747 461.297 250.478 461.029 250.478 461.029 L 202.855 499.945 L 230.668 499.981 L 355.677 399.202 L 272.896 332.726 L 364.105 258.505 L 389.872 258.336 L 370.035 242.466 L 247.245 241.091 L 125.657 146.478 C 125.657 146.478 250.617 43.177 250.617 43.281 C 250.617 43.385 250.406 111.828 250.305 111.828 C 250.205 111.828 271.866 111.838 272.095 111.166 Z"        />
      </svg>

  );
}
