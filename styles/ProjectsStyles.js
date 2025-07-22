import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 0, // 🔼 Moved to the top — remove spacing if not needed
    borderRadius: 15,
    backgroundColor: '#0B1220', // Matches outermost background
  },

  sectionTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
    color: '#F8FAFC',
    textAlign: 'center',
  },

  projectCard: {
    marginBottom: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1E293B',
    backgroundColor: '#10172A',
    overflow: 'hidden',

    // Shadow for iOS
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },

    // Elevation for Android
    elevation: 5,
  },

  imageWrapper: {
    width: '100%',
    height: 160,
    backgroundColor: '#1E293B',
  },

  projectImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  imageLoader: {
    position: 'absolute',
    top: '45%',
    left: '45%',
  },

  projectHeader: {
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  projectTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#38BDF8',
  },

  projectDetails: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    backgroundColor: '#10172A',
  },

  projectDescription: {
    fontSize: 15,
    color: '#CBD5E1',
    marginBottom: 10,
    lineHeight: 20,
  },

  projectTech: {
    fontSize: 13,
    color: '#94A3B8',
    marginBottom: 14,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  demoButton: {
    backgroundColor: '#38BDF8',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },

  statsButton: {
    backgroundColor: '#0EA5E9',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },

  buttonText: {
    color: '#0B1220',
    fontWeight: '700',
    fontSize: 14,
  },
});
