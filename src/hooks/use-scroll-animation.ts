"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";

type MarginType = `${number}${"px" | "%"}`;
type MarginValue =
  | MarginType
  | `${MarginType} ${MarginType}`
  | `${MarginType} ${MarginType} ${MarginType}`
  | `${MarginType} ${MarginType} ${MarginType} ${MarginType}`;

/**
 * 스크롤 애니메이션을 위한 커스텀 훅
 * 요소가 뷰포트에 들어올 때 애니메이션을 트리거합니다.
 */
export function useScrollAnimation(options?: {
  once?: boolean;
  margin?: MarginValue;
  amount?: "some" | "all" | number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: options?.once ?? true,
    margin: options?.margin ?? ("-100px" as MarginValue),
    amount: options?.amount ?? "some",
  });

  return { ref, isInView };
}
