import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  marginTop:0,
      backgroundColor: '#0B1220', // Outermost dark background
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00fb15d3',
    marginBottom: 8,
    textAlign: 'center',

  },
  subtitle: {
    fontSize: 16,
    color: '#CBD5E1',
    marginBottom: 30,
    textAlign: 'center',
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  section: {
    marginBottom: 30,
    borderRadius: 15,
    backgroundColor: '#10172A', // Mid-layer darker than card
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 3,
    borderColor: '#f84343ff', // Subtle separation from container
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  sectionIcon: {
    fontSize: 22,
    marginRight: 10,
    color: '#38BDF8',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    color: '#F1F5F9',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#1E293B', // Lightest within inner content
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: '#0F172A',
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#38BDF8',
  },
  cardText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#E2E8F0',
    flexShrink: 1,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBackground: {
    flex: 1,
    height: 6,
    backgroundColor: '#334155',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  percentText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#94A3B8',
  },
  showMoreButton: {
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: '#FFFFFF',
  },
  showMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    textDecorationLine: 'underline',
  },
  showLessText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    textDecorationLine: 'underline',
    fontStyle: 'italic',
  },
});

export default styles;
