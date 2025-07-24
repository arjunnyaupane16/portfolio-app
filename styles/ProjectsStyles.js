import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    marginTop: 60,
    borderRadius: 15,
    backgroundColor: '#0B1220',
  },

  sectionTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
    color: '#00fb15d3',
    textAlign: 'center',
    letterSpacing: 0.8,
  },

  projectCard: {
    marginBottom: 28,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#6C2BD9',
    backgroundColor: '#10172A',
    overflow: 'hidden',

    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  imageWrapper: {
    width: '100%',
    height: 180,
    backgroundColor: '#1E293B',
  },

  projectImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  imageLoader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -12 }, { translateY: -12 }],
  },

  projectHeader: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#334155',
  },

  projectTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#38BDF8',
    flex: 1,
  },

  projectDetails: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#10172A',
  },

  projectDescription: {
    fontSize: 15,
    color: '#E2E8F0',
    marginBottom: 10,
    lineHeight: 21,
  },

  projectTech: {
    fontSize: 13,
    color: '#94A3B8',
    marginBottom: 16,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },

  demoButton: {
    backgroundColor: '#38BDF8',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
  },

  statsButton: {
    backgroundColor: '#0EA5E9',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
  },

  buttonText: {
    color: '#0B1220',
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
  },
});
