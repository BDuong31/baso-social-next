// 'use client';
// import React from 'react';
// import styled from 'styled-components';
// import { useTheme } from 'next-themes';
// const Switch = () => {
//   const { setTheme } = useTheme();
//   const [isChecked, setIsChecked] = React.useState(false);
//   const [mounted, setMounted] = React.useState(false); 
//   React.useEffect(() => {
//     setMounted(true); 
//   }, []);

//   if (!mounted) {
//     return null; 
//   }

//     const handleChange = () => {
//         const newTheme = isChecked ? 'dark' : 'light';
//         console.log(newTheme);
//         setIsChecked(!isChecked);
//         setTheme(newTheme); 
//     };
//   return (
//     <StyledWrapper>
//       <div className="toggle-cont">
//         <input className="toggle-input" id="toggle" name="toggle" type="checkbox" checked={isChecked} onChange={handleChange}/>
//         <label className="toggle-label" htmlFor="toggle">
//             <div className="cont-icon">
//                 <span Style="--width: 2; --deg: 25; --duration: 11" className="sparkle"></span>
//                 <span Style="--width: 1; --deg: 100; --duration: 18" className="sparkle"></span>
//                 <span Style="--width: 1; --deg: 280; --duration: 5"className="sparkle"></span>
//                 <span Style="--width: 2; --deg: 200; --duration: 3" className="sparkle"></span>
//                 <span Style="--width: 2; --deg: 30; --duration: 20" className="sparkle"></span>
//                 <span Style="--width: 2; --deg: 300; --duration: 9" className="sparkle"></span>
//                 <span Style="--width: 1; --deg: 250; --duration: 4" className="sparkle"></span>
//                 <span Style="--width: 2; --deg: 210; --duration: 8"className="sparkle"></span>
//                 <span Style="--width: 2; --deg: 100; --duration: 9"className="sparkle"></span>
//                 <span Style="--width: 1; --deg: 15; --duration: 13"className="sparkle"></span>
//                 <span Style="--width: 1; --deg: 75; --duration: 18"className="sparkle"></span>
//                 <span Style="--width: 2; --deg: 65; --duration: 6" className="sparkle"></span>
//                 <span Style="--width: 2; --deg: 50; --duration: 7" className="sparkle"></span>
//                 <span Style="--width: 1; --deg: 320; --duration: 5"className="sparkle"></span>
//                 <span Style="--width: 1; --deg: 220; --duration: 5" className="sparkle"></span>
//                 <span Style="--width: 1; --deg: 215; --duration: 2" className="sparkle"></span>
//                 <span Style="--width: 2; --deg: 135; --duration: 9" className="sparkle"></span>
//                 <span Style="--width: 2; --deg: 45; --duration: 4" className="sparkle"></span>
//                 <span Style="--width: 1; --deg: 78; --duration: 16" className="sparkle"></span>
//                 <span Style="--width: 1; --deg: 89; --duration: 19" className="sparkle"></span>
//                 <span Style="--width: 2; --deg: 65; --duration: 14" className="sparkle"></span>
//                 <span Style="--width: 2; --deg: 97; --duration: 1" className="sparkle"></span>
//                 <span Style="--width: 1; --deg: 174; --duration: 10" className="sparkle"></span>
//                 <span Style="--width: 1; --deg: 236; --duration: 5" className="sparkle"></span>
//                 <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 30 30"
//                 className="icon"
//                 >
//                 <path
//                     d="M0.96233 28.61C1.36043 29.0081 1.96007 29.1255 2.47555 28.8971L10.4256 25.3552C13.2236 24.11 16.4254 24.1425 19.2107 25.4401L27.4152 29.2747C27.476 29.3044 27.5418 29.3023 27.6047 29.32C27.6563 29.3348 27.7079 29.3497 27.761 29.3574C27.843 29.3687 27.9194 29.3758 28 29.3688C28.1273 29.3617 28.2531 29.3405 28.3726 29.2945C28.4447 29.262 28.5162 29.2287 28.5749 29.1842C28.6399 29.1446 28.6993 29.0994 28.7509 29.0477L28.9008 28.8582C28.9468 28.7995 28.9793 28.7274 29.0112 28.656C29.0599 28.5322 29.0811 28.4036 29.0882 28.2734C29.0939 28.1957 29.0868 28.1207 29.0769 28.0415C29.0705 27.9955 29.0585 27.9524 29.0472 27.9072C29.0295 27.8343 29.0302 27.7601 28.9984 27.6901L25.1638 19.4855C23.8592 16.7073 23.8273 13.5048 25.0726 10.7068L28.6145 2.75679C28.8429 2.24131 28.7318 1.63531 28.3337 1.2372C27.9165 0.820011 27.271 0.721743 26.7491 0.9961L19.8357 4.59596C16.8418 6.15442 13.2879 6.18696 10.2615 4.70062L1.80308 0.520214C1.7055 0.474959 1.60722 0.441742 1.50964 0.421943C1.44459 0.409215 1.37882 0.395769 1.3074 0.402133C1.14406 0.395769 0.981436 0.428275 0.818095 0.499692C0.77284 0.519491 0.719805 0.545671 0.67455 0.578198C0.596061 0.617088 0.524653 0.675786 0.4596 0.74084C0.394546 0.805894 0.335843 0.877306 0.296245 0.956502C0.263718 1.00176 0.237561 1.05477 0.217762 1.10003C0.152708 1.24286 0.126545 1.40058 0.120181 1.54978C0.120181 1.61483 0.126527 1.6735 0.132891 1.73219C0.15269 1.85664 0.178881 1.97332 0.237571 2.08434L4.41798 10.5427C5.91139 13.5621 5.8725 17.1238 4.3204 20.1099L0.720514 27.0233C0.440499 27.5536 0.545137 28.1928 0.96233 28.61Z"
//                 ></path>
//                 </svg>
//             </div>
//         </label>
//       </div>
//     </StyledWrapper>
//   );
// }

// const StyledWrapper = styled.div`
//   .toggle-cont {
//     --primary: #54a8fc;
//     --light: #d9d9d9;
//     --dark: #121212;
//     --gray: #414344;

//     position: relative;
//     z-index: 10;

//     width: fit-content;
//     height: 50px;

//     border-radius: 9999px;
//   }

//   .toggle-cont .toggle-input {
//     display: none;
//   }

//   .toggle-cont .toggle-label {
//     --gap: 5px;
//     --width: 35px;

//     top: 10px;
//     cursor: pointer;

//     position: relative;
//     display: inline-block;

//     padding: 0.5rem;
//     width: calc((var(--width) + var(--gap)) * 2);
//     height: 23px;
//     background-color: var(--dark);

//     border: 1px solid #777777;
//     border-bottom: 0;

//     border-radius: 9999px;
//     box-sizing: content-box;
//     transition: all 0.3s ease-in-out;
//   }
//   .toggle-label::before {
//     content: "";

//     position: absolute;
//     z-index: -10;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);

//     width: calc(100% + 1rem);
//     height: calc(100% + 1rem);
//     background-color: var(--gray);

//     border: 1px solid #777777;
//     border-bottom: 0;
//     border-radius: 9999px;

//     transition: all 0.3s ease-in-out;
//   }
//   .toggle-label::after {
//     content: "";

//     position: absolute;
//     z-index: -10;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);

//     width: 100%;
//     height: 100%;
//     background-image: radial-gradient(
//       circle at 50% -100%,
//       rgb(58, 155, 252) 0%,
//       rgba(12, 12, 12, 1) 80%
//     );

//     border-radius: 9999px;
//   }

//   .toggle-cont .toggle-label .cont-icon {
//     position: relative;

//     display: flex;
//     justify-content: center;
//     align-items: center;

//     position: relative;
//     width: var(--width);
//     height: 35px;
//     background-image: radial-gradient(
//       circle at 50% 0%,
//       #666666 0%,
//       var(--gray) 100%
//     );

//     border: 1px solid #aaaaaa;
//     border-bottom: 0;
//     border-radius: 9999px;
//     box-shadow: inset 0 -0.15rem 0.15rem var(--primary),
//       inset 0 0 0.5rem 0.75rem var(--second);

//     transition: transform 0.3s ease-in-out;
//   }

//   .cont-icon {
//     top: -6px;
//     left: -6px;
//     overflow: clip;
//     position: relative;
//   }

//   .cont-icon .sparkle {
//     position: absolute;
//     top: 50%;
//     left: 50%;

//     display: block;

//     width: calc(var(--width) * 1px);
//     aspect-ratio: 1;
//     background-color: var(--light);

//     border-radius: 50%;
//     transform-origin: 50% 50%;
//     rotate: calc(1deg * var(--deg));
//     transform: translate(-50%, -50%);
//     animation: sparkle calc(100s / var(--duration)) linear
//       calc(0s / var(--duration)) infinite;
//   }

//   @keyframes sparkle {
//     to {
//       width: calc(var(--width) * 0.5px);
//       transform: translate(2000%, -50%);
//     }
//   }

//   .cont-icon .icon {
//     width: 1.1rem;
//     fill: var(--light);
//   }

//   .toggle-cont:has(.toggle-input:checked) {
//     --checked: true;
//   }

//   @container style(--checked: true) {
//     .toggle-cont .toggle-label {
//       background-color: #41434400;

//       border: 1px solid #3d6970;
//       border-bottom: 0;
//     }

//     .toggle-cont .toggle-label::before {
//       box-shadow: 0 1rem 2.5rem -2rem #0080ff;
//     }

//     .toggle-cont .toggle-label .cont-icon {
//       overflow: visible;

//       background-image: radial-gradient(
//         circle at 50% 0%,
//         #045ab1 0%,
//         var(--primary) 100%
//       );

//       border: 1px solid var(--primary);
//       border-bottom: 0;

//       transform: translateX(calc((var(--gap) * 2) + 134%)) rotate(-225deg);
//     }

//     .toggle-cont .toggle-label .cont-icon .sparkle {
//       z-index: -10;

//       width: calc(var(--width) * 1.5px);
//       background-color: #acacac;

//       animation: sparkle calc(100s / var(--duration)) linear
//         calc(10s / var(--duration)) infinite;
//     }

//     @keyframes sparkle {
//       to {
//         width: calc(var(--width) * 1px);
//         transform: translate(5000%, -50%);
//       }
//     }
//   }`;


// export default Switch;
import React from 'react';
import styled from 'styled-components';
import { useTheme } from 'next-themes';

const Switch = () => {
  const {theme, setTheme } = useTheme();
  const [isChecked, setIsChecked] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
    setIsChecked(theme === 'dark');
  }, [theme]);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleChange = () => {
    const newTheme = isChecked ? 'light' : 'dark';
    setTimeout(() => {
      setIsChecked(!isChecked);
      setTheme(newTheme);
    },400);

  };
  return (
    <StyledWrapper>
      <label className="theme-switch">
        <input className="theme-switch__checkbox" type="checkbox" checked={isChecked} onChange={handleChange} />
        <div className="theme-switch__container">
          <div className="theme-switch__clouds" />
          <div className="theme-switch__stars-container">
            <svg fill="none" viewBox="0 0 144 55" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M135.831 3.00688C135.055 3.85027 134.111 4.29946 133 4.35447C134.111 4.40947 135.055 4.85867 135.831 5.71123C136.607 6.55462 136.996 7.56303 136.996 8.72727C136.996 7.95722 137.172 7.25134 137.525 6.59129C137.886 5.93124 138.372 5.39954 138.98 5.00535C139.598 4.60199 140.268 4.39114 141 4.35447C139.88 4.2903 138.936 3.85027 138.16 3.00688C137.384 2.16348 136.996 1.16425 136.996 0C136.996 1.16425 136.607 2.16348 135.831 3.00688ZM31 23.3545C32.1114 23.2995 33.0551 22.8503 33.8313 22.0069C34.6075 21.1635 34.9956 20.1642 34.9956 19C34.9956 20.1642 35.3837 21.1635 36.1599 22.0069C36.9361 22.8503 37.8798 23.2903 39 23.3545C38.2679 23.3911 37.5976 23.602 36.9802 24.0053C36.3716 24.3995 35.8864 24.9312 35.5248 25.5913C35.172 26.2513 34.9956 26.9572 34.9956 27.7273C34.9956 26.563 34.6075 25.5546 33.8313 24.7112C33.0551 23.8587 32.1114 23.4095 31 23.3545ZM0 36.3545C1.11136 36.2995 2.05513 35.8503 2.83131 35.0069C3.6075 34.1635 3.99559 33.1642 3.99559 32C3.99559 33.1642 4.38368 34.1635 5.15987 35.0069C5.93605 35.8503 6.87982 36.2903 8 36.3545C7.26792 36.3911 6.59757 36.602 5.98015 37.0053C5.37155 37.3995 4.88644 37.9312 4.52481 38.5913C4.172 39.2513 3.99559 39.9572 3.99559 40.7273C3.99559 39.563 3.6075 38.5546 2.83131 37.7112C2.05513 36.8587 1.11136 36.4095 0 36.3545ZM56.8313 24.0069C56.0551 24.8503 55.1114 25.2995 54 25.3545C55.1114 25.4095 56.0551 25.8587 56.8313 26.7112C57.6075 27.5546 57.9956 28.563 57.9956 29.7273C57.9956 28.9572 58.172 28.2513 58.5248 27.5913C58.8864 26.9312 59.3716 26.3995 59.9802 26.0053C60.5976 25.602 61.2679 25.3911 62 25.3545C60.8798 25.2903 59.9361 24.8503 59.1599 24.0069C58.3837 23.1635 57.9956 22.1642 57.9956 21C57.9956 22.1642 57.6075 23.1635 56.8313 24.0069ZM81 25.3545C82.1114 25.2995 83.0551 24.8503 83.8313 24.0069C84.6075 23.1635 84.9956 22.1642 84.9956 21C84.9956 22.1642 85.3837 23.1635 86.1599 24.0069C86.9361 24.8503 87.8798 25.2903 89 25.3545C88.2679 25.3911 87.5976 25.602 86.9802 26.0053C86.3716 26.3995 85.8864 26.9312 85.5248 27.5913C85.172 28.2513 84.9956 28.9572 84.9956 29.7273C84.9956 28.563 84.6075 27.5546 83.8313 26.7112C83.0551 25.8587 82.1114 25.4095 81 25.3545ZM136 36.3545C137.111 36.2995 138.055 35.8503 138.831 35.0069C139.607 34.1635 139.996 33.1642 139.996 32C139.996 33.1642 140.384 34.1635 141.16 35.0069C141.936 35.8503 142.88 36.2903 144 36.3545C143.268 36.3911 142.598 36.602 141.98 37.0053C141.372 37.3995 140.886 37.9312 140.525 38.5913C140.172 39.2513 139.996 39.9572 139.996 40.7273C139.996 39.563 139.607 38.5546 138.831 37.7112C138.055 36.8587 137.111 36.4095 136 36.3545ZM101.831 49.0069C101.055 49.8503 100.111 50.2995 99 50.3545C100.111 50.4095 101.055 50.8587 101.831 51.7112C102.607 52.5546 102.996 53.563 102.996 54.7273C102.996 53.9572 103.172 53.2513 103.525 52.5913C103.886 51.9312 104.372 51.3995 104.98 51.0053C105.598 50.602 106.268 50.3911 107 50.3545C105.88 50.2903 104.936 49.8503 104.16 49.0069C103.384 48.1635 102.996 47.1642 102.996 46C102.996 47.1642 102.607 48.1635 101.831 49.0069Z" clipRule="evenodd" fillRule="evenodd" />
            </svg>
          </div>
          <div className="theme-switch__circle-container">
            <div className="theme-switch__sun-moon-container">
              <div className="theme-switch__moon">
                <div className="theme-switch__spot" />
                <div className="theme-switch__spot" />
                <div className="theme-switch__spot" />
              </div>
            </div>
          </div>
          <div className="theme-switch__shooting-star" />
          <div className="theme-switch__shooting-star-2" />
          <div className="theme-switch__meteor" />
          <div className="theme-switch__stars-cluster">
            <div className="star" />
            <div className="star" />
            <div className="star" />
            <div className="star" />
            <div className="star" />
          </div>
          <div className="theme-switch__aurora" />
          <div className="theme-switch__comets">
            <div className="comet" />
            <div className="comet" />
          </div>
        </div>
      </label>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .theme-switch {
    --toggle-size: 16px;
    /* the size is adjusted using font-size,
       this is not transform scale,
       so you can choose any size */
    --container-width: 5.625em;
    --container-height: 2.5em;
    --container-radius: 6.25em;
    /* radius 0 - minecraft mode :) */
    --container-light-bg: #3d7eae;
    --container-night-bg: #1d1f2c;
    --circle-container-diameter: 3.375em;
    --sun-moon-diameter: 2.125em;
    --sun-bg: #ecca2f;
    --moon-bg: #c4c9d1;
    --spot-color: #959db1;
    --circle-container-offset: calc(
      (var(--circle-container-diameter) - var(--container-height)) / 2 * -1
    );
    --stars-color: #fff;
    --clouds-color: #f3fdff;
    --back-clouds-color: #aacadf;
    --transition: 0.5s cubic-bezier(0, -0.02, 0.4, 1.25);
    --circle-transition: 0.3s cubic-bezier(0, -0.02, 0.35, 1.17);
  }

  .theme-switch,
  .theme-switch *,
  .theme-switch *::before,
  .theme-switch *::after {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-size: var(--toggle-size);
  }

  .theme-switch__container {
    width: var(--container-width);
    height: var(--container-height);
    background-color: var(--container-light-bg);
    border-radius: var(--container-radius);
    overflow: hidden;
    cursor: pointer;
    -webkit-box-shadow:
      0em -0.062em 0.062em rgba(0, 0, 0, 0.25),
      0em 0.062em 0.125em rgba(255, 255, 255, 0.94);
    box-shadow:
      0em -0.062em 0.062em rgba(0, 0, 0, 0.25),
      0em 0.062em 0.125em rgba(255, 255, 255, 0.94);
    -webkit-transition: var(--transition);
    -o-transition: var(--transition);
    transition: var(--transition);
    position: relative;
    background-image: linear-gradient(
      to bottom,
      var(--container-light-bg) 0%,
      #5490c0 100%
    );
    transition: all var(--transition);
  }

  .theme-switch__container::before {
    content: "";
    position: absolute;
    z-index: 1;
    inset: 0;
    -webkit-box-shadow:
      0em 0.05em 0.187em rgba(0, 0, 0, 0.25) inset,
      0em 0.05em 0.187em rgba(0, 0, 0, 0.25) inset;
    box-shadow:
      0em 0.05em 0.187em rgba(0, 0, 0, 0.25) inset,
      0em 0.05em 0.187em rgba(0, 0, 0, 0.25) inset;
    border-radius: var(--container-radius);
  }

  .theme-switch__checkbox {
    display: none;
  }

  .theme-switch__circle-container {
    width: var(--circle-container-diameter);
    height: var(--circle-container-diameter);
    background-color: rgba(255, 255, 255, 0.1);
    position: absolute;
    left: var(--circle-container-offset);
    top: var(--circle-container-offset);
    border-radius: var(--container-radius);
    -webkit-box-shadow:
      inset 0 0 0 3.375em rgba(255, 255, 255, 0.1),
      inset 0 0 0 3.375em rgba(255, 255, 255, 0.1),
      0 0 0 0.625em rgba(255, 255, 255, 0.1),
      0 0 0 1.25em rgba(255, 255, 255, 0.1);
    box-shadow:
      inset 0 0 0 3.375em rgba(255, 255, 255, 0.1),
      inset 0 0 0 3.375em rgba(255, 255, 255, 0.1),
      0 0 0 0.625em rgba(255, 255, 255, 0.1),
      0 0 0 1.25em rgba(255, 255, 255, 0.1);
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-transition: var(--circle-transition);
    -o-transition: var(--circle-transition);
    transition: var(--circle-transition);
    pointer-events: none;
  }

  .theme-switch__sun-moon-container {
    pointer-events: auto;
    position: relative;
    z-index: 2;
    width: var(--sun-moon-diameter);
    height: var(--sun-moon-diameter);
    margin: auto;
    border-radius: var(--container-radius);
    background-color: var(--sun-bg);
    -webkit-box-shadow:
      0.062em 0.062em 0.062em 0em rgba(254, 255, 239, 0.61) inset,
      0em -0.062em 0.062em 0em #a1872a inset;
    box-shadow:
      0.062em 0.062em 0.062em 0em rgba(254, 255, 239, 0.61) inset,
      0em -0.062em 0.062em 0em #a1872a inset;
    -webkit-filter: drop-shadow(0.062em 0.125em 0.125em rgba(0, 0, 0, 0.25))
      drop-shadow(0em 0.062em 0.125em rgba(0, 0, 0, 0.25));
    filter: drop-shadow(0.062em 0.125em 0.125em rgba(0, 0, 0, 0.25))
      drop-shadow(0em 0.062em 0.125em rgba(0, 0, 0, 0.25));
    overflow: hidden;
    -webkit-transition: var(--transition);
    -o-transition: var(--transition);
    transition: var(--transition);
    transform: scale(1);
    transition: transform 0.3s ease;
  }

  .theme-switch__sun-moon-container:hover {
    transform: scale(1.1) rotate(5deg);
  }

  .theme-switch__moon {
    -webkit-transform: translateX(100%);
    -ms-transform: translateX(100%);
    transform: translateX(100%);
    width: 100%;
    height: 100%;
    background-color: var(--moon-bg);
    border-radius: inherit;
    -webkit-box-shadow:
      0.062em 0.062em 0.062em 0em rgba(254, 255, 239, 0.61) inset,
      0em -0.062em 0.062em 0em #969696 inset;
    box-shadow:
      0.062em 0.062em 0.062em 0em rgba(254, 255, 239, 0.61) inset,
      0em -0.062em 0.062em 0em #969696 inset;
    -webkit-transition: var(--transition);
    -o-transition: var(--transition);
    transition: var(--transition);
    position: relative;
    transition:
      all var(--transition),
      transform 0.3s ease;
  }

  .theme-switch__moon:hover {
    transform: rotate(15deg);
  }

  .theme-switch__spot {
    position: absolute;
    top: 0.75em;
    left: 0.312em;
    width: 0.75em;
    height: 0.75em;
    border-radius: var(--container-radius);
    background-color: var(--spot-color);
    -webkit-box-shadow: 0em 0.0312em 0.062em rgba(0, 0, 0, 0.25) inset;
    box-shadow: 0em 0.0312em 0.062em rgba(0, 0, 0, 0.25) inset;
    transition: background-color 0.3s ease;
  }

  .theme-switch__spot:nth-of-type(2) {
    width: 0.375em;
    height: 0.375em;
    top: 0.937em;
    left: 1.375em;
  }

  .theme-switch__spot:nth-last-of-type(3) {
    width: 0.25em;
    height: 0.25em;
    top: 0.312em;
    left: 0.812em;
  }

  .theme-switch__moon:hover .theme-switch__spot {
    background-color: #7a7f8c;
  }

  .theme-switch__clouds {
    width: 1.25em;
    height: 1.25em;
    background-color: var(--clouds-color);
    border-radius: var(--container-radius);
    position: absolute;
    bottom: -0.625em;
    left: 0.312em;
    -webkit-box-shadow:
      0.937em 0.312em var(--clouds-color),
      -0.312em -0.312em var(--back-clouds-color),
      1.437em 0.375em var(--clouds-color),
      0.5em -0.125em var(--back-clouds-color),
      2.187em 0 var(--clouds-color),
      1.25em -0.062em var(--back-clouds-color),
      2.937em 0.312em var(--clouds-color),
      2em -0.312em var(--back-clouds-color),
      3.625em -0.062em var(--clouds-color),
      2.625em 0em var(--back-clouds-color),
      4.5em -0.312em var(--clouds-color),
      3.375em -0.437em var(--back-clouds-color),
      4.625em -1.75em 0 0.437em var(--clouds-color),
      4em -0.625em var(--back-clouds-color),
      4.125em -2.125em 0 0.437em var(--back-clouds-color);
    box-shadow:
      0.937em 0.312em var(--clouds-color),
      -0.312em -0.312em var(--back-clouds-color),
      1.437em 0.375em var(--clouds-color),
      0.5em -0.125em var(--back-clouds-color),
      2.187em 0 var(--clouds-color),
      1.25em -0.062em var(--back-clouds-color),
      2.937em 0.312em var(--clouds-color),
      2em -0.312em var(--back-clouds-color),
      3.625em -0.062em var(--clouds-color),
      2.625em 0em var(--back-clouds-color),
      4.5em -0.312em var(--clouds-color),
      3.375em -0.437em var(--back-clouds-color),
      4.625em -1.75em 0 0.437em var(--clouds-color),
      4em -0.625em var(--back-clouds-color),
      4.125em -2.125em 0 0.437em var(--back-clouds-color);
    -webkit-transition: 0.5s cubic-bezier(0, -0.02, 0.4, 1.25);
    -o-transition: 0.5s cubic-bezier(0, -0.02, 0.4, 1.25);
    transition: 0.5s cubic-bezier(0, -0.02, 0.4, 1.25);
  }

  .theme-switch__stars-container {
    position: absolute;
    color: var(--stars-color);
    top: -100%;
    left: 0.312em;
    width: 2.75em;
    height: auto;
    -webkit-transition: var(--transition);
    -o-transition: var(--transition);
    transition: var(--transition);
  }

  /* actions */

  .theme-switch__checkbox:checked + .theme-switch__container {
    background-color: var(--container-night-bg);
    background-image: linear-gradient(
      to bottom,
      var(--container-night-bg) 0%,
      #2d3142 100%
    );
  }

  .theme-switch__checkbox:checked
    + .theme-switch__container
    .theme-switch__circle-container {
    left: calc(
      100% - var(--circle-container-offset) - var(--circle-container-diameter)
    );
  }

  .theme-switch__checkbox:checked
    + .theme-switch__container
    .theme-switch__circle-container:hover {
    left: calc(
      100% - var(--circle-container-offset) - var(--circle-container-diameter) -
        0.187em
    );
  }

  .theme-switch__circle-container:hover {
    left: calc(var(--circle-container-offset) + 0.187em);
  }

  .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__moon {
    -webkit-transform: translate(0);
    -ms-transform: translate(0);
    transform: translate(0);
  }

  .theme-switch__checkbox:checked
    + .theme-switch__container
    .theme-switch__clouds {
    bottom: -4.062em;
  }

  .theme-switch__checkbox:checked
    + .theme-switch__container
    .theme-switch__stars-container {
    top: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }

  .theme-switch__container:hover .theme-switch__clouds {
    transform: translateX(15px) scale(1.02);
  }

  .theme-switch__sun-moon-container::after {
    content: "";
    position: absolute;
    inset: -5px;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.2) 0%,
      transparent 70%
    );
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .theme-switch__sun-moon-container:hover::after {
    opacity: 1;
  }

  .theme-switch__shooting-star {
    position: absolute;
    width: 2px;
    height: 2px;
    background: white;
    top: 20%;
    left: -10%;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .theme-switch__shooting-star-2 {
    position: absolute;
    width: 1px;
    height: 1px;
    background: white;
    top: 35%;
    left: -10%;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .theme-switch__meteor {
    position: absolute;
    width: 3px;
    height: 3px;
    background: #ffd700;
    border-radius: 50%;
    top: -10%;
    left: 50%;
    opacity: 0;
    filter: blur(1px);
    transition: opacity 0.3s ease;
  }

  .theme-switch__checkbox:checked
    + .theme-switch__container
    .theme-switch__shooting-star {
    animation: shootingStar 2s linear infinite;
    opacity: 1;
  }

  .theme-switch__checkbox:checked
    + .theme-switch__container
    .theme-switch__shooting-star-2 {
    animation: shootingStar 3s linear infinite 1s;
    opacity: 1;
  }

  .theme-switch__checkbox:checked
    + .theme-switch__container
    .theme-switch__meteor {
    animation: meteor 4s linear infinite 2s;
    opacity: 1;
  }

  @keyframes shootingStar {
    0% {
      transform: translateX(0) translateY(0) rotate(45deg);
      opacity: 1;
    }
    100% {
      transform: translateX(150px) translateY(150px) rotate(45deg);
      opacity: 0;
    }
  }

  @keyframes meteor {
    0% {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
    100% {
      transform: translateY(150px) scale(0.3);
      opacity: 0;
    }
  }

  .theme-switch__stars-cluster {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .theme-switch__stars-cluster .star {
    position: absolute;
    width: 2px;
    height: 2px;
    background: white;
    border-radius: 50%;
    box-shadow: 0 0 4px 1px white;
  }

  .theme-switch__stars-cluster .star:nth-child(1) {
    top: 20%;
    left: 20%;
    animation: twinkle 1s infinite ease-in-out;
  }
  .theme-switch__stars-cluster .star:nth-child(2) {
    top: 30%;
    left: 55%;
    animation: twinkle 1s infinite ease-in-out 0.3s;
  }
  .theme-switch__stars-cluster .star:nth-child(3) {
    top: 40%;
    left: 80%;
    animation: twinkle 1s infinite ease-in-out 0.6s;
  }
  .theme-switch__stars-cluster .star:nth-child(4) {
    top: 60%;
    left: 30%;
    animation: twinkle 1s infinite ease-in-out 0.9s;
  }
  .theme-switch__stars-cluster .star:nth-child(5) {
    top: 70%;
    left: 65%;
    animation: twinkle 1s infinite ease-in-out 1.2s;
  }

  .theme-switch__aurora {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 20px;
    background: linear-gradient(
      90deg,
      rgba(0, 255, 255, 0) 0%,
      rgba(0, 255, 255, 0.2) 25%,
      rgba(128, 0, 255, 0.2) 50%,
      rgba(0, 255, 255, 0.2) 75%,
      rgba(0, 255, 255, 0) 100%
    );
    opacity: 0;
    filter: blur(4px);
    transform: translateY(-100%);
    transition: opacity 0.3s ease;
  }

  .theme-switch__comets {
    position: absolute;
    inset: 0;
    overflow: hidden;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .theme-switch__comets .comet {
    position: absolute;
    width: 2px;
    height: 2px;
    background: linear-gradient(90deg, white 0%, transparent 90%);
    border-radius: 50%;
    filter: blur(1px);
  }

  .theme-switch__comets .comet:nth-child(1) {
    top: 30%;
    left: -10%;
    animation: cometMove 4s linear infinite;
  }

  .theme-switch__comets .comet:nth-child(2) {
    top: 50%;
    left: -10%;
    animation: cometMove 6s linear infinite 2s;
  }

  @keyframes twinkle {
    0%,
    100% {
      opacity: 0.3;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.2);
    }
  }

  @keyframes cometMove {
    0% {
      transform: translateX(0) translateY(0) rotate(-45deg) scale(1);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateX(200px) translateY(200px) rotate(-45deg) scale(0.2);
      opacity: 0;
    }
  }

  .theme-switch__checkbox:checked
    + .theme-switch__container
    .theme-switch__stars-cluster {
    opacity: 1;
  }

  .theme-switch__checkbox:checked
    + .theme-switch__container
    .theme-switch__aurora {
    opacity: 1;
    animation: auroraWave 8s linear infinite;
  }

  .theme-switch__checkbox:checked
    + .theme-switch__container
    .theme-switch__comets {
    opacity: 1;
  }

  @keyframes auroraWave {
    0% {
      transform: translateY(-100%) translateX(-50%);
    }
    100% {
      transform: translateY(-100%) translateX(50%);
    }
  }`;

export default Switch;
