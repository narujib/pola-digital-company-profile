"use client";

import { useEffect, useCallback, useRef } from "react";

/**
 * Hook that warns users before navigating away with unsaved changes.
 *
 * Uses the native `beforeunload` event for tab close / external navigation,
 * and patches `pushState` / `replaceState` + the `popstate` event for
 * in-app (SPA) navigation.
 *
 * @param hasChanges — whether there are unsaved modifications
 * @param message   — confirmation text shown in the browser dialog
 */
export function useUnsavedChanges(
  hasChanges: boolean,
  message = "Ada perubahan yang belum disimpan. Yakin ingin meninggalkan halaman?"
) {
  const hasChangesRef = useRef(hasChanges);
  useEffect(() => {
    hasChangesRef.current = hasChanges;
  }, [hasChanges]);

  // ---- beforeunload (tab close, hard navigation) ----
  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      if (!hasChangesRef.current) return;
      e.preventDefault();
    }

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // ---- SPA navigation (pushState / replaceState / popstate) ----
  useEffect(() => {
    const originalPush = history.pushState.bind(history);
    const originalReplace = history.replaceState.bind(history);

    function guard(
      original: typeof history.pushState,
      ...args: Parameters<typeof history.pushState>
    ) {
      if (hasChangesRef.current && !window.confirm(message)) {
        return; // cancelled
      }
      original(...args);
    }

    history.pushState = (...args) => guard(originalPush, ...args);
    history.replaceState = (...args) => {
      // Allow replace without confirmation (used for URL sync like search params)
      // Only guard pushState (actual navigation)
      originalReplace(...args);
    };

    function handlePopState() {
      if (hasChangesRef.current && !window.confirm(message)) {
        // Push current state back to cancel the back navigation
        history.pushState(null, "", window.location.href);
      }
    }

    window.addEventListener("popstate", handlePopState);

    return () => {
      history.pushState = originalPush;
      history.replaceState = originalReplace;
      window.removeEventListener("popstate", handlePopState);
    };
  }, [message]);

  /**
   * Call this before programmatic navigation (e.g. router.push after save).
   * Returns true if safe to navigate, false if user cancelled.
   */
  const confirmNavigation = useCallback(() => {
    if (!hasChangesRef.current) return true;
    return window.confirm(message);
  }, [message]);

  return { confirmNavigation };
}
