import { useState, useEffect, useCallback } from 'react';

const DISMISS_KEY = 'kuchnia-kingi-install-dismissed';
const DISMISS_DAYS = 14;
const SHOW_DELAY_MS = 1500;

function isStandalone() {
  return (
    window.matchMedia('(display-mode: standalone)').matches
    || window.navigator.standalone === true
  );
}

function isMobileDevice() {
  const ua = navigator.userAgent;
  const mobileUa = /Android|webOS|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(ua);
  const narrow = window.matchMedia('(max-width: 768px)').matches;
  const touch = navigator.maxTouchPoints > 1;
  return mobileUa || (narrow && touch);
}

function isIos() {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
}

function isDismissed() {
  try {
    const raw = localStorage.getItem(DISMISS_KEY);
    if (!raw) return false;
    const dismissedAt = Number.parseInt(raw, 10);
    if (Number.isNaN(dismissedAt)) return true;
    const days = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24);
    return days < DISMISS_DAYS;
  } catch {
    return false;
  }
}

export function usePwaInstallPrompt() {
  const [visible, setVisible] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIosDevice] = useState(() =>
    typeof window !== 'undefined' && isIos()
  );

  const dismiss = useCallback(() => {
    setVisible(false);
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      // ignore
    }
  }, []);

  const install = useCallback(async () => {
    if (!deferredPrompt) return false;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    if (outcome === 'accepted') {
      setVisible(false);
      return true;
    }
    return false;
  }, [deferredPrompt]);

  useEffect(() => {
    if (isStandalone() || isDismissed() || !isMobileDevice()) {
      return undefined;
    }

    const onBeforeInstall = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstall);

    const timer = window.setTimeout(() => {
      setVisible(true);
    }, SHOW_DELAY_MS);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
    };
  }, []);

  const canNativeInstall = Boolean(deferredPrompt);

  return {
    visible,
    isIosDevice,
    canNativeInstall,
    install,
    dismiss,
  };
}
