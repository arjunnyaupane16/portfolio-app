// utils/responsive.js
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const isMobile = width < 600;
export const isTablet = width >= 600 && width < 1024;
export const isDesktop = width >= 1024;

export const responsiveFont = (mobileSize, tabletSize, desktopSize) => {
  if (isMobile) return mobileSize;
  if (isTablet) return tabletSize;
  return desktopSize;
};
