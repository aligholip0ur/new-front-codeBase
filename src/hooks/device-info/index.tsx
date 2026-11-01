import { useState, useEffect } from 'react';

type DeviceType = 'mobile' | 'tablet' | 'desktop';
type OS = 'Windows' | 'macOS' | 'Linux' | 'Android' | 'iOS' | 'Windows Phone' | 'unknown';

interface DeviceInfo {
  deviceType: DeviceType;
  os: OS;
}

export function useDeviceInfo(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    deviceType: 'desktop',
    os: 'unknown',
  });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera;

    let os: OS = 'unknown';
    let deviceType: DeviceType = 'desktop';

    if (/windows phone/i.test(ua)) {
      os = 'Windows Phone';
      deviceType = 'mobile';
    } else if (/windows/i.test(ua)) {
      os = 'Windows';
    } else if (/android/i.test(ua)) {
      os = 'Android';
      deviceType = /mobile/i.test(ua) ? 'mobile' : 'tablet';
    } else if (/iPad|Macintosh/i.test(ua) && 'ontouchend' in document) {
      os = 'iOS';
      deviceType = 'tablet';
    } else if (/iPhone/i.test(ua)) {
      os = 'iOS';
      deviceType = 'mobile';
    } else if (/Macintosh/i.test(ua)) {
      os = 'macOS';
    } else if (/linux/i.test(ua)) {
      os = 'Linux';
    }

    setDeviceInfo({ deviceType, os });
  }, []);

  return deviceInfo;
}
