let PLATFORMS_MAP = {
  ipad: undefined,
  iphone: undefined,
  ios: undefined,
  android: undefined,
  phablet: undefined,
  tablet: undefined,
  cordova: undefined,
  capacitor: undefined,
  electron: undefined,
  pwa: undefined,
  mobile: undefined,
  mobileweb: undefined,
  desktop: undefined,
  hybrid: undefined,
};

export type Platforms = keyof typeof PLATFORMS_MAP;

interface IsPlatformSignature {
  (plt: Platforms): boolean;
  (win: Window, plt: Platforms): boolean;
}
export const testUserAgent = (win: Window, expr: RegExp) => expr.test(win.navigator.userAgent);
const matchMedia = (win: Window, query: string): boolean => win.matchMedia?.(query).matches;

const detectPlatforms = (win: Window) => (Object.keys(PLATFORMS_MAP) as Platforms[]).filter(p => PLATFORMS_MAP[p](win));

export const setupPlatforms = (win: any = window) => {
  if (typeof win === 'undefined') {
    return [];
  }

  win.Titian = win.Titian || {};

  let { platforms } = win.Titian;
  if (platforms == null) {
    win.Titian.platforms = detectPlatforms(win);
    platforms = win.Titian.platforms;
    platforms.forEach(p => win.document.documentElement.classList.add(`plt-${p}`));
  }
  return platforms;
};

export const getPlatforms = (win?: any) => setupPlatforms(win);

export const isPlatform: IsPlatformSignature = (
  winOrPlatform: Window | Platforms | undefined,
  platform?: Platforms,
) => {
  if (typeof winOrPlatform === 'string') {
    platform = winOrPlatform;
    winOrPlatform = undefined;
  }
  return getPlatforms(winOrPlatform).includes(platform!);
};

const isCordova = (win: any): boolean => !!(win.cordova || win.phonegap || win.PhoneGap);

const isMobile = (win: Window) => matchMedia(win, '(any-pointer:coarse)');

const isIpad = (win: Window) => {
  // iOS 12 and below
  if (testUserAgent(win, /iPad/i)) {
    return true;
  }

  // iOS 13+
  if (testUserAgent(win, /Macintosh/i) && isMobile(win)) {
    return true;
  }

  return false;
};

const isIphone = (win: Window) => testUserAgent(win, /iPhone/i);

const isIOS = (win: Window) => testUserAgent(win, /iPhone|iPod/i) || isIpad(win);

const isAndroid = (win: Window) => testUserAgent(win, /android|sink/i);

const isAndroidTablet = (win: Window) => isAndroid(win) && !testUserAgent(win, /mobile/i);

const isPhablet = (win: Window) => {
  const width = win.innerWidth;
  const height = win.innerHeight;
  const smallest = Math.min(width, height);
  const largest = Math.max(width, height);

  return smallest > 390 && smallest < 520 && largest > 620 && largest < 800;
};

const isTablet = (win: Window) => {
  const width = win.innerWidth;
  const height = win.innerHeight;
  const smallest = Math.min(width, height);
  const largest = Math.max(width, height);

  return isIpad(win) || isAndroidTablet(win) || (smallest > 460 && smallest < 820 && largest > 780 && largest < 1400);
};

const isDesktop = (win: Window) => !isMobile(win);

const isCapacitorNative = (win: any): boolean => {
  const capacitor = win.Capacitor;
  return !!capacitor?.isNative;
};

const isHybrid = (win: Window) => isCordova(win) || isCapacitorNative(win);

const isElectron = (win: Window): boolean => testUserAgent(win, /electron/i);

const isMobileWeb = (win: Window): boolean => isMobile(win) && !isHybrid(win);

const isPWA = (win: Window): boolean =>
  !!(win.matchMedia?.('(display-mode: standalone)').matches || (win.navigator as any).standalone);

PLATFORMS_MAP = {
  ipad: isIpad,
  iphone: isIphone,
  ios: isIOS,
  android: isAndroid,
  phablet: isPhablet,
  tablet: isTablet,
  cordova: isCordova,
  capacitor: isCapacitorNative,
  electron: isElectron,
  pwa: isPWA,
  mobile: isMobile,
  mobileweb: isMobileWeb,
  desktop: isDesktop,
  hybrid: isHybrid,
};

export type PlatformConfig = Partial<typeof PLATFORMS_MAP>;
