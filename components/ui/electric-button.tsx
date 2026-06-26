"use client";

import * as React from "react";
import styled from "styled-components";

type ElectricButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  activeLabel?: React.ReactNode;
};

const PARTICLES = [
  ["-45deg", "53%", "15%", "4em", "0.7", "0.15"],
  ["150deg", "40%", "70%", "7.5em", "0.8", "0.08"],
  ["10deg", "90%", "65%", "7em", "0.6", "0.25"],
  ["-120deg", "15%", "10%", "4em", "1", "0"],
  ["-175deg", "10%", "25%", "5.25em", "0.6", "0.32"],
  ["-18deg", "80%", "25%", "4.75em", "0.5", "0.4"],
  ["-30deg", "60%", "45%", "9em", "0.9", "0.5"],
  ["175deg", "9%", "30%", "6em", "0.95", "0.6"],
  ["-10deg", "89%", "25%", "4.5em", "0.55", "0.67"],
  ["-140deg", "40%", "10%", "5em", "0.85", "0.75"],
  ["90deg", "45%", "65%", "4em", "0.5", "0.83"],
  ["30deg", "70%", "80%", "6.5em", "0.75", "0.92"],
];

const splitText = (text: React.ReactNode) =>
  String(text ?? "")
    .split("")
    .map((char, index) => (
      <span key={`${char}-${index}`} style={{ "--i": index + 1 } as React.CSSProperties}>
        <span>{char === " " ? "\u00a0" : char}</span>
      </span>
    ));

const ElectricButton = React.forwardRef<HTMLButtonElement, ElectricButtonProps>(
  ({ children, activeLabel = children, className, type = "button", onClick, ...props }, ref) => {
    const [active, setActive] = React.useState(false);

    return (
      <StyledWrapper className={className}>
        <button
          ref={ref}
          type={type}
          className={`electric-button ${active ? "is-active" : ""}`}
          onClick={(event) => {
            setActive((value) => !value);
            onClick?.(event);
          }}
          {...props}
        >
          <span className="splash" aria-hidden="true">
            <svg width={423} height={274} viewBox="0 0 423 274" fill="none" stroke="currentColor">
              <path d="M93.3368 136.663C49.6104 128.127 30.5087 134.168 2.08112 145.122" strokeLinecap="round" />
              <path d="M94.6914 170.451C55.042 190.819 43.7361 207.401 28.1198 233.623" strokeLinecap="round" />
              <path d="M147.365 181.074C124.487 219.412 123.652 239.483 124.252 270.021" strokeLinecap="round" />
              <path d="M209.461 179.848L209.461 271.744" strokeLinecap="round" />
              <path d="M271.59 181.074C294.468 219.412 295.303 239.483 294.703 270.021" strokeLinecap="round" />
              <path d="M327.264 170.451C366.913 190.819 378.219 207.401 393.835 233.623" strokeLinecap="round" />
              <path d="M329.618 136.663C373.345 128.127 392.446 134.168 420.874 145.122" strokeLinecap="round" />
              <path d="M328.313 104.665C355.465 69.244 373.772 61.0955 402.313 50.4414" strokeLinecap="round" />
              <path d="M268.666 93.3922C282.624 50.9621 297.219 37.204 320.646 17.6894" strokeLinecap="round" />
              <path d="M209.461 93.5837L209.461 1.68781" strokeLinecap="round" />
              <path d="M150.289 93.3922C136.331 50.9621 121.736 37.204 98.3089 17.6894" strokeLinecap="round" />
              <path d="M93.6422 104.665C66.4898 69.244 48.1828 61.0955 19.6421 50.4414" strokeLinecap="round" />
            </svg>
          </span>
          <span className="button-frame">
            <span className="particles" aria-hidden="true">
              {PARTICLES.map(([angle, x, y, distance, scale, time], index) => (
                <span
                  key={index}
                  className="particle"
                  style={
                    {
                      "--a": angle,
                      "--x": x,
                      "--y": y,
                      "--d": distance,
                      "--f": scale,
                      "--t": time,
                    } as React.CSSProperties
                  }
                />
              ))}
            </span>
            <span className="electric" aria-hidden="true" />
            <span className="glass" aria-hidden="true" />
            <span className="reflex" aria-hidden="true" />
            <span className="outline" aria-hidden="true">
              <span className="rainbow" />
            </span>
            <span className="text">
              <span className="state-1">{splitText(children)}</span>
              <span className="state-2">{splitText(activeLabel)}</span>
            </span>
            <span className="liquid" aria-hidden="true">
              <span className="wave" />
            </span>
            <span className="bg" aria-hidden="true" />
          </span>
        </button>
        <svg className="svg-turbulence" aria-hidden="true" width={0} height={0}>
          <defs>
            <filter id="electric-button-displace-0" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="260px" height="520px">
              <feTurbulence type="turbulence" baseFrequency="0.020" numOctaves={9} seed={1} result="n1" />
              <feOffset in="n1" dx={0} dy={140} result="o1" />
              <feTurbulence type="turbulence" baseFrequency="0.020" numOctaves={9} seed={2} result="n2" />
              <feOffset in="n2" dx={98} dy={0} result="o2" />
              <feBlend in="o1" in2="o2" mode="color-dodge" result="cn" />
              <feDisplacementMap in="SourceGraphic" in2="cn" scale={16} xChannelSelector="R" yChannelSelector="B" />
            </filter>
            <filter id="electric-button-displace-1" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="260px" height="520px">
              <feTurbulence type="turbulence" baseFrequency="0.019" numOctaves={9} seed={3} result="n1" />
              <feOffset in="n1" dx={0} dy={220} result="o1" />
              <feTurbulence type="turbulence" baseFrequency="0.021" numOctaves={9} seed={4} result="n2" />
              <feOffset in="n2" dx={160} dy={0} result="o2" />
              <feBlend in="o1" in2="o2" mode="color-dodge" result="cn" />
              <feDisplacementMap in="SourceGraphic" in2="cn" scale={18} xChannelSelector="R" yChannelSelector="B" />
            </filter>
            <filter id="electric-button-displace-2" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="260px" height="520px">
              <feTurbulence type="turbulence" baseFrequency="0.022" numOctaves={8} seed={5} result="n1" />
              <feOffset in="n1" dx={0} dy={310} result="o1" />
              <feTurbulence type="turbulence" baseFrequency="0.018" numOctaves={9} seed={6} result="n2" />
              <feOffset in="n2" dx={230} dy={0} result="o2" />
              <feBlend in="o1" in2="o2" mode="color-dodge" result="cn" />
              <feDisplacementMap in="SourceGraphic" in2="cn" scale={20} xChannelSelector="R" yChannelSelector="B" />
            </filter>
            <filter id="electric-button-displace-3" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="260px" height="520px">
              <feTurbulence type="turbulence" baseFrequency="0.020" numOctaves={9} seed={7} result="n1" />
              <feOffset in="n1" dx={0} dy={420} result="o1" />
              <feTurbulence type="turbulence" baseFrequency="0.023" numOctaves={8} seed={8} result="n2" />
              <feOffset in="n2" dx={320} dy={0} result="o2" />
              <feBlend in="o1" in2="o2" mode="color-dodge" result="cn" />
              <feDisplacementMap in="SourceGraphic" in2="cn" scale={22} xChannelSelector="R" yChannelSelector="B" />
            </filter>
          </defs>
        </svg>
      </StyledWrapper>
    );
  },
);

ElectricButton.displayName = "ElectricButton";

const StyledWrapper = styled.span`
  display: inline-flex;
  position: relative;
  isolation: isolate;
  --radius: 50px;

  @keyframes electricSwap {
    0%,
    100% {
      filter: url(#electric-button-displace-0);
    }
    25% {
      filter: url(#electric-button-displace-1);
    }
    50% {
      filter: url(#electric-button-displace-2);
    }
    75% {
      filter: url(#electric-button-displace-3);
    }
  }

  .electric-button {
    position: relative;
    width: 290px;
    height: 80px;
    padding: 0;
    border: 0;
    border-radius: var(--radius);
    background: linear-gradient(to bottom, #000000 80%, #f2f2f2 100%);
    box-shadow:
      0 -10px 30px rgba(57, 20, 115, 0.3),
      0 20px 30px rgba(57, 20, 115, 0.4),
      inset 0 0 2px 0 black;
    cursor: pointer;
    color: white;
    outline: none;
    transition:
      box-shadow 0.5s ease,
      transform 0.5s ease;
    user-select: none;
  }

  .electric-button:hover {
    transform: translateY(-4px);
  }

  .electric-button:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.85);
    outline-offset: 5px;
  }

  .electric-button:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }

  .button-frame {
    display: block;
    position: relative;
    height: 100%;
    border-radius: calc(var(--radius) * 0.85);
    transform: translateY(-4px);
    background: linear-gradient(to bottom, #d0d0d05e 0%, #ffffff 50%, #000000 100%);
    transition: transform 0.5s ease;
    overflow: hidden;
  }

  .electric-button:active .button-frame {
    transform: translateY(0);
  }

  .splash svg {
    position: absolute;
    left: 50%;
    top: 56%;
    z-index: 9;
    width: 423px;
    height: 274px;
    color: #9a4df1;
    stroke-width: 2px;
    stroke-dasharray: 0 173;
    stroke-dashoffset: 174;
    filter: blur(1px);
    pointer-events: none;
    transform: translate(-50%, -50%);
    animation: splashFeedback 0.7s cubic-bezier(0.18, 0.94, 1, 1) forwards;
  }

  .electric-button.is-active .splash svg {
    animation: splashFeedbackActive 0.7s cubic-bezier(0.18, 0.94, 1, 1) forwards;
  }

  .particles {
    --m: 1;
    position: absolute;
    inset: 0;
    z-index: 10;
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .particle {
    --f: 1;
    display: grid;
    position: absolute;
    left: var(--x);
    top: var(--y);
    rotate: var(--a);
    filter: blur(2px);
  }

  .particle::before {
    content: "";
    grid-area: 1/1;
    width: 15px;
    height: 3px;
    transform-origin: 0 0;
    mix-blend-mode: overlay;
    background: rgb(154, 77, 241);
    animation: particleMove calc(var(--m) * 0.5s) linear calc(var(--m) * var(--t, 0) * 1.2s) infinite;
    opacity: 0;
    transform: translateX(0) rotate(-45deg) skew(45deg, 45deg) scale(var(--f));
  }

  .electric-button:hover .particles {
    opacity: 1;
  }

  .electric-button.is-active .particles {
    opacity: 0;
  }

  .electric {
    position: absolute;
    inset: -8px 0 0 -8px;
    z-index: 10;
    border: 2px solid white;
    border-radius: var(--radius);
    filter: url(#electric-button-displace-0);
    animation: electricSwap 1.5s infinite;
    opacity: 0;
    mix-blend-mode: overlay;
    transform: scale(1.1);
    transition: all 0.6s ease;
  }

  .electric-button.is-active .electric {
    opacity: 1;
    transform: scale(1);
  }

  .glass {
    position: absolute;
    inset: 0;
    z-index: 9;
    overflow: hidden;
    border-radius: var(--radius);
    pointer-events: none;
    transition: transform 0.5s ease;
  }

  .glass::before,
  .glass::after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.08);
    border-bottom: 1px solid rgba(255, 255, 255, 0.03);
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    transition: transform 0.5s ease;
  }

  .glass::before {
    transform: skewX(70deg) rotate(347deg) translate(-45px, -54px);
  }

  .glass::after {
    transform: skewX(65deg) rotate(347deg) translate(115px, -14px);
  }

  .electric-button:hover .glass {
    transform: translateX(-10px);
  }

  .electric-button:hover .glass::before {
    transform: skewX(70deg) rotate(347deg) translate(-30px, -56px);
  }

  .electric-button:hover .glass::after {
    transform: skewX(65deg) rotate(347deg) translate(85px, -14px);
  }

  .reflex {
    position: absolute;
    inset: 0;
    z-index: 9;
    overflow: hidden;
    border-radius: inherit;
  }

  .reflex::before {
    content: "";
    position: absolute;
    top: -40%;
    bottom: -40%;
    left: -140%;
    width: 350px;
    background: linear-gradient(
      to right,
      rgba(244, 221, 255, 0.1) 10%,
      rgba(244, 221, 255, 0.5) 60%,
      rgba(244, 221, 255, 0.3) 60%,
      rgba(244, 221, 255, 0.1) 90%
    );
    opacity: 1;
    transform: translate(250%, 0) skew(30deg);
    transition: all 0.6s cubic-bezier(0.5, 0, 0.3, 1);
  }

  .electric-button:hover .reflex::before {
    transform: translateX(0) skew(-30deg);
    opacity: 0.7;
  }

  .outline {
    position: absolute;
    inset: -2px -2px -4px;
    overflow: hidden;
    border-radius: inherit;
    filter: blur(1px);
  }

  .outline::before {
    content: "";
    position: absolute;
    inset: 5px;
    width: 120px;
    height: 300px;
    margin: auto;
    background: linear-gradient(to right, transparent 0%, white 50%, transparent 100%);
    animation: spin 4s linear infinite;
  }

  .rainbow {
    position: absolute;
    z-index: 9;
    top: 50%;
    left: 0;
    right: 0;
    width: 100%;
    height: 130px;
    --stripes: repeating-linear-gradient(100deg, #fff 0%, #fff 7%, transparent 10%, transparent 12%, #fff 16%);
    --rainbow: repeating-linear-gradient(100deg, #60a5fa 10%, #f9799c 15%, #60a5fa 20%, #5eeabd 25%, #60a5fa 30%);
    background-image: var(--stripes), var(--rainbow);
    background-size: 300%, 200%;
    background-position: 50% 50%, 50% 50%;
    filter: invert(100%);
    mix-blend-mode: overlay;
    mask-image: radial-gradient(ellipse at 50%, black 40%, transparent 70%);
  }

  .rainbow::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: var(--stripes), var(--rainbow);
    background-size: 200%, 100%;
    background-attachment: fixed;
    mix-blend-mode: difference;
    animation: rainbowBg 60s linear infinite;
  }

  .bg {
    position: absolute;
    inset: 5px;
    z-index: 1;
    overflow: hidden;
    border-radius: calc(var(--radius) * 0.85);
  }

  .bg::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background: linear-gradient(6deg, #000000 0%, #181c40 44%, #121c71 48%, #bb4c8f 57%, #c5996e 62%, #badeee 79%, #83cafb 90%);
    filter: blur(4px);
  }

  .text {
    position: relative;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    overflow: hidden;
    border-radius: calc(var(--radius) * 0.85);
    color: rgba(255, 255, 255, 0.82);
    font-size: 23px;
    font-weight: 650;
    letter-spacing: 0;
    box-shadow:
      inset -6px -2px 2px -2px rgb(0 0 0 / 79%),
      inset 6px -7px 2px -2px rgb(0 0 0 / 79%),
      inset -1px 1px 4px 4px rgb(255 255 255 / 82%),
      inset 1px 4px 5px #005880;
    pointer-events: none;
  }

  .text > span {
    position: absolute;
    white-space: nowrap;
  }

  .text span span {
    display: inline-block;
  }

  .text span > span > span {
    animation: waveText 2.2s cubic-bezier(0.45, 0, 0.55, 1) calc(var(--i) * -0.13s) infinite;
    animation-play-state: paused;
  }

  .electric-button:hover .text span > span > span {
    animation-play-state: running;
  }

  .state-1 > span {
    opacity: 0;
    animation: appear 1.5s ease forwards calc(var(--i) * 0.05s);
  }

  .state-2 > span {
    opacity: 1;
    animation: disappear 0.6s ease forwards calc(var(--i) * 0.03s);
  }

  .electric-button.is-active .state-1 > span {
    opacity: 1;
    animation: disappear 0.6s ease forwards calc(var(--i) * 0.03s);
  }

  .electric-button.is-active .state-2 > span {
    opacity: 0;
    animation: appear 1.5s ease forwards calc(var(--i) * 0.05s);
  }

  .liquid {
    position: absolute;
    inset: 2px;
    z-index: 2;
    overflow: hidden;
    border-radius: inherit;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
  }

  .wave {
    position: absolute;
    inset: 0;
    top: 790px;
    left: -80px;
    margin: auto;
    filter: blur(4px);
    transition: transform 0.8s cubic-bezier(0.5, -0.5, 0.5, 1.5);
  }

  .wave::before {
    content: "";
    position: absolute;
    top: -8px;
    left: 50%;
    width: 1000px;
    height: 1000px;
    border-radius: 48%;
    background: radial-gradient(white 50%, #03081b 70%);
    opacity: 0.5;
    filter: blur(2px);
    animation: wave 5s linear infinite;
  }

  .electric-button:hover .wave {
    transform: translateY(-5px);
  }

  .svg-turbulence {
    position: absolute;
    width: 0;
    height: 0;
    pointer-events: none;
  }

  @keyframes waveText {
    0% {
      transform: translateX(-5px) rotate(8deg);
      opacity: 0.7;
    }
    60% {
      transform: translateY(3px) translateX(2px) rotate(0);
      opacity: 1;
    }
    100% {
      transform: translateX(-5px) rotate(8deg);
      opacity: 0.7;
    }
  }

  @keyframes particleMove {
    0% {
      transform: translateX(var(--d)) rotate(-45deg) skew(0deg, 0deg) scale(var(--f));
      opacity: 0;
    }
    100% {
      transform: translateX(0) rotate(-45deg) skew(45deg, 45deg) scale(var(--f));
      opacity: 1;
    }
  }

  @keyframes rainbowBg {
    from {
      background-position: 50% 50%, 50% 50%;
    }
    to {
      background-position: 350% 50%, 350% 50%;
    }
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes wave {
    to {
      transform: translate(-50%, -75%) rotate(360deg);
    }
  }

  @keyframes appear {
    0% {
      transform: translateY(-40px) rotate(-90deg);
      filter: blur(10px);
    }
    30% {
      transform: translateY(7px) rotate(0);
    }
    60% {
      transform: translateY(-5px) rotate(0);
      filter: blur(0);
      opacity: 1;
    }
    100% {
      transform: translateY(0) rotate(0);
      opacity: 1;
    }
  }

  @keyframes disappear {
    to {
      transform: translateY(40px);
      filter: blur(6px);
      opacity: 0;
      color: black;
    }
  }

  @keyframes splashFeedback {
    to {
      stroke-dasharray: 10 110;
      stroke-dashoffset: 80;
      opacity: 0;
    }
  }

  @keyframes splashFeedbackActive {
    to {
      stroke-dasharray: 10 110;
      stroke-dashoffset: 80;
      opacity: 0;
    }
  }

  @media (max-width: 768px) {
    .electric-button {
      width: min(290px, calc(100vw - 48px));
      height: 74px;
    }

    .liquid {
      display: none;
    }
  }
`;

export { ElectricButton };
