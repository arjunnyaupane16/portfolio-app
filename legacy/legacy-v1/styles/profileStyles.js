import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
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
 scrollContainer: {
  paddingTop: 0, // reduced from 10 to 0
  paddingBottom: 40,
  width: '100%',
  paddingHorizontal: 15,
  backgroundColor: colors.background,
  flex: 1,
},

  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: 1,
  },
  profileCard: {
    width: '100%',           // full width of the parent container (with padding)
    backgroundColor: colors.backgroundLight,
    borderRadius: 16,
    padding: 20,
    // Align content to left inside the card for better full width layout
    alignItems: 'flex-start',
    marginBottom: 25,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    overflow: 'visible',    // show any overflowing content like shadows
  },
  imageContainer: {
    marginBottom: 20,
    alignSelf: 'center',     // center image container horizontally inside card
  },
  circularBorder: {
    width: 150,
    height: 150,
    borderRadius: 75,       // circle (half width/height)
    borderWidth: 4,
    borderColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  content: {
    width: '100%',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 5,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 16,
    color: colors.textLight,
    marginBottom: 20,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  divider: {
    height: 1,
    width: '80%',
    backgroundColor: colors.border,
    marginVertical: 20,
    alignSelf: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  bioToggle: {
    width: '100%',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginRight: 10,
  },
  bioContainer: {
  width: '100%',
  backgroundColor: colors.backgroundLight,
  borderRadius: 16, // smoother corners
  paddingVertical: 24, // more breathing room vertically
  paddingHorizontal: 20,
  marginBottom: 20, // more separation
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3, // for Android shadow
  overflow: 'hidden',
  alignItems: 'center',
},

bio: {
  fontSize: 16, // slightly bigger for readability
  lineHeight: 26,
  color: colors.textLight,
  textAlign: 'center',
  fontWeight: '400',
},

  educationCard: {
    width: '100%',        // full width inside container padding
    backgroundColor: colors.backgroundLight,
    borderRadius: 16,
    padding: 25,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  eduItem: {
    flexDirection: 'row',
    marginBottom: 25,
    alignItems: 'flex-start',
  },
  eduIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    backgroundColor: `${colors.accent}20`, // 20 hex for 12.5% opacity
  },
  eduDetails: {
    flex: 1,
  },
  eduTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 3,
  },
  eduDegree: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 3,
    lineHeight: 20,
  },
  eduDate: {
    fontSize: 13,
    color: colors.primary,
    marginBottom: 5,
  },
  eduHighlight: {
    fontSize: 13,
    color: colors.highlight,
    fontStyle: 'italic',
  },
});
