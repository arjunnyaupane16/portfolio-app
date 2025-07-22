import { Dimensions, StyleSheet } from 'react-native';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 0,
    backgroundColor: '#ffffff',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  navItemContainer: {
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  activeNavItem: {
    backgroundColor: 'rgba(36, 65, 231, 0.1)',
  },
  navIcon: {
    color: '#666',
  },
  activeIcon: {
    color: '#2441e7',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
    fontWeight: '500',
  },
  activeNavText: {
    color: '#2441e7',
    fontWeight: '600',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -5,
    height: 3,
    width: '60%',
    backgroundColor: '#2441e7',
    borderRadius: 3,
  },
  animatedContainer: {
    flex: 1,
    paddingBottom: 0,
  },
  section: {
    flex: 1,
    minHeight: height -80,
    justifyContent: 'center',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
});
