import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');

const colors = {
  primary: '#4361ee',
  primaryLight: '#4895ef',
  secondary: '#3f37c9',
  accent: '#4cc9f0',
  background: '#f8f9fa',
  text: '#2b2d42',
  textLight: '#8d99ae',
  white: '#ffffff',
  border: '#e9ecef',
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },

  // Navbar styles
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: 12,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  navItemContainer: {
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  activeNavItem: {
    backgroundColor: 'rgba(67, 97, 238, 0.08)',
  },
  navIcon: {
    color: colors.textLight,
  },
  activeIcon: {
    color: colors.primary,
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: colors.textLight,
    fontWeight: '500',
  },
  activeNavText: {
    color: colors.primary,
    fontWeight: '600',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -6,
    height: 3,
    width: '50%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },

  // Content styles
  animatedContainer: {
    flex: 1,
    paddingTop: 80, // Space for navbar
  },
  section: {
    width:'100%', // Full screen width
    minHeight: height -80,
    justifyContent: 'center',
    paddingVertical: 40,
  },

  // Card styles (to be used in your components)
  card: {
    width: width -10, // Full width minus padding
    marginHorizontal: 0,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 0,
    marginBottom: 16,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
});
