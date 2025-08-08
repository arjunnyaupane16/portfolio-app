import { StyleSheet } from 'react-native';

const colors = {
  primary: '#4ea8de',         // soft sky blue for CTA/buttons
  primaryLight: '#73c2fb',    // lighter hover state

accent: '#8acec4ff', // minty green (subtle neon touch)     // minty fresh accent/highlight
  secondary: '#3f3d56',       // muted dark violet-grey (for depth)

  background: '#1e293b',      // deep desaturated blue-grey (main bg)
  backgroundLight: '#273349', // for cards/sections

  text: '#dbeafe', // very soft, pastel blue (from Tailwind’s blue-10           // soft light text (not white)
  textLight: '#94a3b8',       // muted text for descriptions/labels

  border: '#334155',          // soft border shade
  highlight: '#a5f3fc',       // for glow or focus states

  error: '#f87171',           // calm red
  success: '#34d399'          // smooth green
};


export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 20
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    letterSpacing: 1
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center'
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
    borderWidth: 1
  },
  imageContainer: {
    width: '100%',
    height: 200,
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
    height: '100%'
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
    fontSize: 20,
    fontWeight: '700',
    flex: 1
  },
  projectDetails: {
    paddingHorizontal: 20,
    borderTopWidth: 1,
    overflow: 'hidden'
  },
  projectDescription: {
    fontSize: 15,
    color: colors.textLight,
    lineHeight: 24,
    marginBottom: 15
  },
  projectTech: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 20,
    lineHeight: 20
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 15
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8
  },
  buttonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 14
  }
});
