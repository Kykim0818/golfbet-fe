import { useEffect, useRef } from "react";

/** stictmode에서 한번만 작동을 원할떄 사용, useEffect 관련 eslint나 경고를 못띄울 수 있으니 주의 */
export const useStrictModeEffectOnce = (
  effect: React.EffectCallback,
  deps?: React.DependencyList
) => {
  const rendered = useRef(false);

  // StrictMode에서 useRef, useMemo, useEffect 등의 동작 방식을 이용해서 작업함.
  // 리액트 디펜던시 존재
  const prevDeps = useRef(deps);

  if (deps?.some((v, idx) => v !== prevDeps.current?.[idx]))
    rendered.current = false;

  useEffect(() => {
    if (rendered.current) return;
    rendered.current = true;
    effect();
  }, deps);
};
