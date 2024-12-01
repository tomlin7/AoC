import React from "react";
import type { FetchError } from "../services/types";
import { colors } from "../theme/colors";

interface DescriptionProps {
  puzzleContent: string;
  error?: FetchError;
}

export function Description({ puzzleContent, error }: DescriptionProps) {
  if (error) {
    return (
      <div
        className="h-full overflow-y-auto p-6"
        style={{ backgroundColor: colors.bg0 }}
      >
        <div
          className="rounded-md p-4 border"
          style={{
            backgroundColor: `${colors.red}20`,
            borderColor: colors.red,
          }}
        >
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium" style={{ color: colors.red }}>
                Error Loading
              </h3>
              <div className="mt-2 text-sm" style={{ color: colors.fg2 }}>
                <p>{error.message}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="h-full overflow-y-auto p-6"
      style={{ backgroundColor: colors.bg0 }}
    >
      <div
        className="prose max-w-none"
        style={
          {
            color: colors.fg1,
            "--tw-prose-headings": colors.fg0,
            "--tw-prose-links": colors.blue,
            "--tw-prose-code": colors.yellow,
            "--tw-prose-pre-code": colors.fg1,
            "--tw-prose-pre-bg": colors.bg1,
          } as React.CSSProperties
        }
        dangerouslySetInnerHTML={{ __html: puzzleContent }}
      />
    </div>
  );
}
