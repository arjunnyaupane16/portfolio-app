// styles/ProjectsStyles.js
import { StyleSheet, Platform, Dimensions } from 'react-native';
import { isMobile, isTablet, isDesktop, responsiveFont } from '../utils/responsive';

const { width } = Dimensions.get('window');

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
  white: '#ffffff'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: isDesktop ? 80 : isTablet ? 40 : 20,
    paddingTop: 20
  },

  scrollContainer: {
    paddingBottom: 40
  },

  header: {
    alignItems: 'center',
    marginBottom: 30
  },

  title: {
    fontSize: responsiveFont(26, 30, 36),
    fontWeight: '700',
    color: colors.text,
    marginBottom: 10,
    letterSpacing: 1
  },

  subtitle: {
    fontSize: responsiveFont(14, 16, 18),
    color: colors.textLight,
    textAlign: 'center'
  },

  projectCard: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 16,
    marginBottom: 25,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    width: isDesktop ? 700 : '100%',
    alignSelf: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10
      },
      android: {
        elevation: 5
      }
    })
  },

  imageContainer: {
    width: '100%',
    height: isDesktop ? 300 : 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background
  },

  loadingIndicator: {
    position: 'absolute',
    zIndex: 1
  },

  projectImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },

  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: colors.backgroundLight
  },

  projectTitle: {
    fontSize: responsiveFont(18, 20, 22),
    fontWeight: '700',
    color: colors.text,
    flex: 1
  },

  projectDetails: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderColor: colors.border
  },

  projectDescription: {
    fontSize: responsiveFont(14, 15, 16),
    color: colors.textLight,
    lineHeight: responsiveFont(22, 24, 26),
    marginBottom: 15
  },

  projectTech: {
    fontSize: responsiveFont(13, 14, 15),
    color: colors.textLight,
    marginBottom: 20,
    lineHeight: 20
  },

  buttonContainer: {
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'space-between',
    gap: 15
  },

  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: colors.primary,
    gap: 8,
    marginBottom: isMobile ? 10 : 0
  },

  buttonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: responsiveFont(13, 14, 15)
  }
});

export default styles;
