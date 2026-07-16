"use client";

import React from "react";
import styled from "styled-components";

const stackLayers = [
  "私有化部署",
  "权限管理",
  "安全审计",
  "模型路由",
  "上下文管理",
  "Memory OS",
  "GoData 知识库",
  "Skills 仓库",
];

type LayerStyle = React.CSSProperties & {
  "--i": number;
  "--label": string;
};

export function AiosStackCard() {
  return (
    <StyledWrapper>
      <div className="stack-card" aria-label="GoAgent AIOS 能力栈">
        {stackLayers.map((label, index) => (
          <div
            key={label}
            className="layer"
            style={
              {
                "--i": index,
                "--label": `"${label}"`,
              } as LayerStyle
            }
          />
        ))}
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  min-height: 340px;
  align-items: center;
  justify-content: flex-start;
  overflow: visible;
  padding-left: 20px;

  .stack-card {
    --w: min(250px, 62vw);
    --h: 300px;
    --step: 18px;
    --offset: 8px;
    --hover-mult: 2.15;
    --active-mult: 5.2;

    position: relative;
    width: var(--w);
    height: var(--h);
    border: 1px dashed rgba(255, 255, 255, 0.18);
    border-radius: 1rem;
    background: rgba(28, 28, 31, 0.7);
    box-shadow:
      rgba(0, 0, 0, 0.28) 4px -4px 18px,
      0 4rem 24px 8px rgba(0, 0, 0, 0.2);
    font-family: inherit;
    perspective: 600px;
    transform: translateY(-12px) translateX(18px) rotateX(-13deg) rotateY(-32deg);
    transition: 0.6s ease-in-out;
    user-select: none;
  }

  .stack-card:hover {
    border-color: rgba(255, 255, 255, 0.26);
    background: rgba(42, 42, 46, 0.72);
    box-shadow:
      rgba(0, 0, 0, 0.24) 4px -4px 18px,
      -1rem 5rem 25px 20px rgba(0, 0, 0, 0.2);
    transform: translateY(-12px) translateX(18px) rotateX(-13deg) rotateY(-32deg);
  }

  .stack-card:active {
    height: 230px;
    border-color: rgba(255, 255, 255, 0.34);
    box-shadow:
      rgba(0, 0, 0, 0.32) 4px -4px 18px,
      -1rem 6rem 24px 28px rgba(0, 0, 0, 0.2);
    transition: 0.6s ease-in-out;
    transition-delay: 0.1s;
  }

  .layer {
    position: absolute;
    top: 0;
    left: 0;
    width: calc(var(--w) - (var(--i) * var(--step)));
    height: calc(var(--h) - (var(--i) * var(--step)));
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 1rem;
    background:
      linear-gradient(145deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0)),
      rgba(24, 24, 27, calc(0.72 - (var(--i) * 0.045)));
    box-shadow: rgba(0, 0, 0, 0.28) 4px -4px 12px;
    transform: translateY(calc(var(--i) * var(--offset) * var(--hover-mult)))
      translateX(calc(var(--i) * var(--offset) * var(--hover-mult) * -1));
    transition: 0.4s cubic-bezier(0.87, 0, 0.13, 1);
    transition-delay: 0.05s;
  }

  .stack-card:hover .layer {
    background:
      linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0)),
      rgba(28, 28, 31, calc(0.68 - (var(--i) * 0.045)));
    transform: translateY(calc(var(--i) * var(--offset) * var(--hover-mult)))
      translateX(calc(var(--i) * var(--offset) * var(--hover-mult) * -1));
  }

  .stack-card:active .layer {
    transform: translateY(calc(var(--i) * var(--offset) * var(--active-mult)))
      translateX(calc(var(--i) * var(--offset) * var(--active-mult) * -1));
  }

  .stack-card:active .layer:first-child {
    transform: translateY(10px) translateX(-10px);
  }

  .layer::after {
    content: var(--label);
    position: absolute;
    top: 50%;
    left: 50%;
    color: rgba(255, 255, 255, 0.88);
    font-size: 0.76rem;
    font-weight: 700;
    opacity: 1;
    pointer-events: none;
    text-shadow: 0 1px 10px rgba(0, 0, 0, 0.8);
    transform: translate(-50%, -50%) scale(1);
    transform-origin: center center;
    transition:
      color 0.3s,
      text-shadow 0.3s,
      transform 0.3s,
      opacity 0.3s;
    white-space: nowrap;
  }

  .layer:hover::after {
    color: #fff;
    opacity: 1;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.45);
    transform: translate(-50%, -50%) scale(1.08);
  }

  @media (max-width: 767px) {
    min-height: 330px;
    justify-content: flex-start;
    padding-left: 34px;

    .stack-card {
      --w: 240px;
      --h: 292px;
      --step: 18px;
      transform: rotateX(-13deg) rotateY(-30deg);
    }

    .layer::after {
      opacity: 1;
      font-size: 0.68rem;
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;
