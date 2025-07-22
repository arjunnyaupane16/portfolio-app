import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#0a192f',
  },
  scrollContainer: {
    paddingTop: 0,
    paddingBottom: 30,
    alignItems: 'center',
    backgroundColor: '#112240',
    margin: 0,
  },
  header: {
    marginBottom: 30,
  },
  headerText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ccd6f6',
    letterSpacing: 1,
    textAlign: 'center',
  },
  profileCard: {
    width: '90%',
    backgroundColor: '#112240',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    shadowRadius: 20,
    marginBottom: 30,
  },
  imageContainer: {
    marginBottom: 20,
  },
  circularBorder: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 6,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#e6f1ff',
    marginBottom: 5,
    textAlign: 'center',
  },
  title: {
    fontSize: 16,
    color: '#8892b0',
    marginBottom: 20,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    width: '80%',
    backgroundColor: '#233554',
    marginVertical: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  bioToggle: {
    width: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ccd6f6',
    marginRight: 10,
  }, bioBox: {
    width: '105%',
    backgroundColor: '#112240',
    borderRadius: 15,
    padding: 25,
    marginTop: 10,
    marginBottom: 25,
    shadowColor: '#040c16',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
  },


  bio: {
    fontSize: 15,
    lineHeight: 24,
    color: '#dddbe3ff',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  educationCard: {
    width: '90%',
    backgroundColor: '#112240',
    borderRadius: 15,
    padding: 25,
    shadowColor: '#040c16',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,

  },
  eduItem: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  eduIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  eduDetails: {
    flex: 1,
  },
  eduTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e6f1ff',
    marginBottom: 3,
  },
  eduDegree: {
    fontSize: 14,
    color: '#8892b0',
    marginBottom: 3,
  },
  eduDate: {
    fontSize: 13,
    color: '#4c80ff',
    marginBottom: 5,
  },
  eduHighlightText: {
    fontSize: 13,
    color: '#64ffda',
    fontStyle: 'italic',
  },
});
