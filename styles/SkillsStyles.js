import { StyleSheet } from 'react-native';

const colors = {
  background: '#0a192f',
  backgroundLight: '#112240',
  text: '#e6f1ff',
  textLight: '#8892b0',
  accent: '#4cc9f0',
  primary: '#4361ee',
  primaryLight: '#4895ef'
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
