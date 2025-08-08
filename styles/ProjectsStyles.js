import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

const isLargeScreen = Platform.OS === 'web' && width > 1024;

const colors = {
  primary: '#4ea8de',
  primaryLight: '#73c2fb',
  accent: '#8acec4ff',
  secondary: '#3f3d56',
  background: '#1e293b',
  backgroundLight: '#273349',
  text: '#dbeafe',
  textLight: '#94a3b8',
  border: '#334155',
  highlight: '#a5f3fc',
  error: '#f87171',
  success: '#34d399',
  white: '#ffffff',
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center', // center content on desktop
  },
  scrollContainer: {
    width: isLargeScreen ? '60%' : '100%',
    paddingHorizontal: isLargeScreen ? 40 : 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 20,
  },
  title: {
    fontSize: isLargeScreen ? 38 : 32,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: isLargeScreen ? 18 : 16,
    color: colors.textLight,
    textAlign: 'center',
  },
  projectCard: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 16,
    marginBottom: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.border,
    width: isLargeScreen ? '100%' : '100%',
  },
  imageContainer: {
    width: '100%',
    height: isLargeScreen ? 250 : 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingIndicator: {
    position: 'absolute',
    zIndex: 1,
  },
  projectImage: {
    width: '100%',
    height: '100%',
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: colors.backgroundLight,
  },
  projectTitle: {
    fontSize: isLargeScreen ? 22 : 20,
    fontWeight: '700',
    flex: 1,
    color: colors.text,
  },
  projectDetails: {
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  projectDescription: {
    fontSize: isLargeScreen ? 16 : 15,
    color: colors.textLight,
    lineHeight: 24,
    marginBottom: 15,
  },
  projectTech: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 20,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: isLargeScreen ? 'row' : 'column',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 15,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
});
