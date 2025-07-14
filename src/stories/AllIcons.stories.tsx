import type { Meta, StoryObj } from "@storybook/react-webpack5";
import React, { useState, useMemo } from "react";

// 모든 아이콘들을 import
import * as Icons from "../icons";

const meta: Meta = {
  title: "Icons/All Icons",
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

// 모든 아이콘을 렌더링하는 컴포넌트
const AllIconsComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

  const iconEntries = Object.entries(Icons);

  // 검색어를 기반으로 아이콘 필터링
  const filteredIcons = useMemo(() => {
    if (!searchTerm.trim()) return iconEntries;

    return iconEntries.filter(([name]) =>
      name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, iconEntries]);

  // 아이콘 이름 클립보드 복사 기능
  const handleIconClick = async (iconName: string) => {
    try {
      await navigator.clipboard.writeText(iconName);
      setCopiedIcon(iconName);
      setTimeout(() => setCopiedIcon(null), 2000);
    } catch (error) {
      console.error("클립보드 복사 실패:", error);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      {/* 검색 입력창 */}
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <input
          type="text"
          placeholder="아이콘 이름으로 검색..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{
            padding: "12px 16px",
            fontSize: "14px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            width: "400px",
            maxWidth: "100%",
            outline: "none",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            transition: "all 0.2s ease",
          }}
          onFocus={e => {
            e.target.style.borderColor = "#007bff";
            e.target.style.boxShadow = "0 0 0 3px rgba(0,123,255,0.1)";
          }}
          onBlur={e => {
            e.target.style.borderColor = "#ddd";
            e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
          }}
        />
        <div
          style={{
            fontSize: "14px",
            color: "#666",
            fontWeight: "500",
          }}
        >
          {filteredIcons.length} / {iconEntries.length} 아이콘
        </div>
      </div>

      {/* 아이콘 그리드 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
          gap: "16px",
        }}
      >
        {filteredIcons.map(([name, IconComponent]) => (
          <div
            key={name}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "12px",
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              transition: "all 0.2s ease",
              cursor: "pointer",
              border:
                copiedIcon === name
                  ? "2px solid #28a745"
                  : "2px solid transparent",
              position: "relative",
            }}
            onClick={() => handleIconClick(name)}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
            }}
          >
            {/* 복사 확인 표시 */}
            {copiedIcon === name && (
              <div
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  backgroundColor: "#28a745",
                  color: "white",
                  fontSize: "10px",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  fontWeight: "bold",
                }}
              >
                복사됨!
              </div>
            )}

            <div
              style={{
                marginBottom: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconComponent
                width={12}
                height={12}
                style={{
                  color: "#333",
                  strokeWidth: 2,
                }}
              />
            </div>
            <span
              style={{
                fontSize: "10px",
                textAlign: "center",
                color: "#666",
                wordBreak: "break-word",
                lineHeight: "1.2",
              }}
            >
              {name}
            </span>
          </div>
        ))}
      </div>

      {/* 검색 결과가 없을 때 메시지 */}
      {filteredIcons.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            color: "#666",
            fontSize: "16px",
          }}
        >
          "{searchTerm}" 검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
};

export const AllIcons: Story = {
  render: () => <AllIconsComponent />,
};
