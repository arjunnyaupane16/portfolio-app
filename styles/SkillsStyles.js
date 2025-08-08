import { StyleSheet } from 'react-native';
const colors = {
  primary: '#4ea8de',         // Sky blue - primary CTA
  primaryLight: '#73c2fb',    // Light blue - hover/secondary CTA
  accent: '#d92a0fff',          // Mint green - accent highlight
  secondary: '#3f3d56',       // Muted violet-grey - contrast/dark elements

  background: '#1e293b',      // Very dark blue - app background
  backgroundLight: '#273349', // Slightly lighter bg for cards

  text: '#a3e483ff',            // Lime-tinted pastel - primary readable text
  textLight: '#baceecff',       // Muted blue-grey - secondary text

  border: '#334155',          // Border color - subtle blue-grey
  highlight: '#a5f3fc',       // Cyan glow - hover or focus highlight

  error: '#f87171',           // Soft red - error state
  success: '#34d399',         // Soft green - success confirmation
  white: '#f3ececff',           // Pure white
  card: '#2c3e50',            // Dark card bg for better contrast
};


export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 15,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
  },
  section: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary + '20',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
    marginLeft: 10,
   color: '#b9fbc0' // Light pastel green (softer, yet visible on dark bg)

  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  /** ✅ Final fixed card style */
  card: {
    width: '32%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'flex-start', // ✅ Aligns header to left of card
  },

  cardText: {
    fontSize: 12,
    fontWeight: '600',
    marginRight: 12, // ✅ Slightly left aligned
    color: colors.white, // ✅ White text
  },

  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 20,
    height: 24,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  progressBackground: {
    flex: 1,
    height: 5,
    backgroundColor: colors.textLight + '30',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  percentText: {
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 6,
    color: colors.textLight,
  },
});
