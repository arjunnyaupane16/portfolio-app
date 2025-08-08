import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const isTablet = width >= 768 && width < 1024;
const isDesktop = width >= 1024;

// ⬇️ Reduced card size here
const baseCardSize = isDesktop ? 220 : isTablet ? 200 : 180;

const colors = {
  background: '#f9f9f9',
  card: '#ffffff',
  text: '#1e1e1e',
  textLight: '#6b6b6b',
  accent: '#4ea8de',
  border: '#e0e0e0',
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: isDesktop ? 50 : isTablet ? 30 : 20,
    paddingTop: 20,
  },
  title: {
    fontSize: isDesktop ? 28 : isTablet ? 24 : 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    width: '100%',
    maxWidth: baseCardSize,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: baseCardSize * 0.55, // smaller image height
    borderRadius: 10,
    marginBottom: 8,
    resizeMode: 'cover',
    backgroundColor: colors.border,
  },
  projectTitle: {
    fontSize: isDesktop ? 17 : isTablet ? 16 : 15,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  description: {
    fontSize: isDesktop ? 14 : 13,
    color: colors.textLight,
    lineHeight: 18,
  },
  readMore: {
    color: colors.accent,
    fontSize: 13,
    marginTop: 6,
    fontWeight: '500',
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 8,
    gap: 12,
  },
  iconButton: {
    padding: 6,
  },
  scrollView: {
    paddingBottom: 30,
  },
  rowWrap: {
    flexDirection: isDesktop ? 'row' : 'column',
    flexWrap: 'wrap',
    justifyContent: isDesktop ? 'space-between' : 'center',
    gap: 16,
  },
});
