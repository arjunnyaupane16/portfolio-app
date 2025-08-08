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
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 15,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30
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
  section: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary + '20'
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
    marginLeft: 10
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  card: {
    width: '48%',
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  icon: {
    width: 20,
    height: 20
  },
  cardText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    flexShrink: 1
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  progressBackground: {
    flex: 1,
    height: 6,
    backgroundColor: colors.textLight + '30',
    borderRadius: 3,
    overflow: 'hidden'
  },
  progressBar: {
    height: '100%',
    borderRadius: 3
  },
  percentText: {
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 8
  }
});
