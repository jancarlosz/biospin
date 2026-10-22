"use client";

import { useState } from "react";

interface AccordionItem {
  number: string;
  title: string;
  body: string;
}

interface Props {
  items: AccordionItem[];
  colorMode?: "blue" | "green";
}

export function TechAccordion({ items, colorMode = "blue" }: Props) {
  const [openIndex, setOpenIndex] = useState(0);

  const accentColor = colorMode === "blue" ? "#60a5fa" : "#d8f6a0";
  const textColor = colorMode === "blue" ? "#F6F6F6" : "#f4f5ef";
  const mutedColor = colorMode === "blue" ? "#94a3b8" : "#b1c3b9";
  const borderColor = colorMode === "blue" ? "#ffffff18" : "#ffffff30";
  const labelColor = colorMode === "blue" ? "#64748b" : "#9eb1a6";

  return (
    <div>
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={item.number}
            style={{
              borderTop: `1px solid ${borderColor}`,
              borderBottom: idx === items.length - 1 ? `1px solid ${borderColor}` : "none",
            }}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : idx)}
              className="w-full flex items-center gap-5 text-left"
              style={{
                padding: "22px 0",
                cursor: "pointer",
                background: "none",
                border: "none",
                color: textColor,
              }}
              aria-expanded={isOpen}
            >
              <span style={{ fontSize: "10px", color: labelColor, flexShrink: 0 }}>{item.number}</span>
              <span style={{ fontSize: "16px", flex: 1 }}>{item.title}</span>
              <b
                style={{
                  fontWeight: 400,
                  color: accentColor,
                  fontSize: "20px",
                  transform: isOpen ? "rotate(45deg)" : "none",
                  transition: "transform 0.25s",
                  flexShrink: 0,
                  display: "inline-block",
                }}
              >
                +
              </b>
            </button>
            <div
              style={{
                overflow: "hidden",
                maxHeight: isOpen ? "200px" : "0",
                transition: "max-height 0.35s ease",
              }}
            >
              <p
                style={{
                  fontSize: "14px",
                  color: mutedColor,
                  margin: "0 28px 24px",
                  maxWidth: "440px",
                  lineHeight: "1.7",
                }}
              >
                {item.body}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
