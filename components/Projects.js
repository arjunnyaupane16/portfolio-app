import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Easing,
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../styles/ProjectsStyles';

import adminappImg from '../assets/images/admin-app.jpg';
import driftAndSipImg from '../assets/images/drift-and-sip.jpg';
import portfolioImg from '../assets/images/portfolio.jpg';
import taskManagerImg from '../assets/images/task-manager.jpg';

const projectsData = [
  {
    id: '1',
    title: 'Drift & Sip',
    description:
      'Real-time order management app with live tracking, soft delete, dashboards, and API integration.',
    tech: 'React Native, Node.js, MongoDB',
    image: driftAndSipImg,
    demo: 'https://drift-and-sip-user-app.vercel.app/',
    stats:
      'https://github-readme-stats.vercel.app/api?username=arjunnyaupane16&show_icons=true&theme=radical',
  },
  {
    id: '2',
    title: 'Personal Portfolio',
    description: 'Responsive portfolio website showcasing skills and featured projects.',
    tech: 'React.js, CSS3, Vercel',
    image: portfolioImg,
    demo: 'https://chandraprakashnyaupane.vercel.app/',
    stats:
      'https://github-readme-stats.vercel.app/api?username=arjunnyaupane16&show_icons=true&theme=radical',
  },
  {
    id: '3',
    title: 'Task Manager',
    description:
      'A task and project management app featuring drag & drop, reminders, and cloud sync.',
    tech: 'React Native, Firebase, Redux',
    image: taskManagerImg,
    demo: 'https://task-manager-demo.example.com',
    stats:
      'https://github-readme-stats.vercel.app/api?username=arjunnyaupane16&show_icons=true&theme=radical',
  },
  {
    id: '4',
    title: 'Admin App',
    description:
      'Admin panel for managing orders, dashboards, and staff with authentication and responsive UI.',
    tech: 'React.js, JavaScript, CSS3, Vercel',
    image: adminappImg,
    demo: 'https://admin-app-rose.vercel.app/',
    stats:
      'https://github-readme-stats.vercel.app/api?username=arjunnyaupane16&show_icons=true&theme=radical',
  },
];

export default function Projects() {
  const [expandedId, setExpandedId] = useState(null);
  const animValues = useRef(projectsData.map(() => new Animated.Value(0))).current;
  const detailHeights = useRef(projectsData.map(() => new Animated.Value(0))).current;
  const [imageLoading, setImageLoading] = useState({});

  useEffect(() => {
    const enterAnimations = animValues.map((anim, i) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 600,
        delay: i * 150,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      })
    );
    Animated.stagger(100, enterAnimations).start();
  }, []);

  useEffect(() => {
    projectsData.forEach((_, idx) => {
      Animated.timing(detailHeights[idx], {
        toValue: expandedId === projectsData[idx].id ? 200 : 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    });
  }, [expandedId]);

  const handleLinkPress = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) await Linking.openURL(url);
      else Alert.alert('Unsupported URL', `Cannot open this link: ${url}`);
    } catch (err) {
      console.error('Linking error:', err);
      Alert.alert('Error', 'Failed to open the link.');
    }
  };

  const renderProjectCard = (project, index) => {
    const isExpanded = expandedId === project.id;
    const opacity = animValues[index];
    const translateY = opacity.interpolate({
      inputRange: [0, 1],
      outputRange: [50, 0],
    });

    return (
      <Animated.View
        key={project.id}
        style={[styles.projectCard, { opacity, transform: [{ translateY }] }]}
      >
        <View style={styles.imageWrapper}>
          <Image
            source={project.image}
            style={styles.projectImage}
            resizeMode="cover"
            onLoadStart={() => setImageLoading((prev) => ({ ...prev, [project.id]: true }))}
            onLoadEnd={() => setImageLoading((prev) => ({ ...prev, [project.id]: false }))}
          />
          {imageLoading[project.id] && (
            <ActivityIndicator style={styles.imageLoader} size="small" color="#0984e3" />
          )}
        </View>

        <TouchableOpacity
          style={styles.projectHeader}
          onPress={() => setExpandedId(isExpanded ? null : project.id)}
          activeOpacity={0.85}
        >
          <Text style={styles.projectTitle}>{project.title}</Text>
          <Ionicons
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={24}
            color="#0984e3"
          />
        </TouchableOpacity>

        <Animated.View style={[styles.projectDetails, { height: detailHeights[index] }]}>
          <ScrollView nestedScrollEnabled style={{ flex: 1 }}>
            <Text style={styles.projectDescription}>{project.description}</Text>
            <Text style={styles.projectTech}>
              <Text style={{ fontWeight: '700' }}>Tech:</Text> {project.tech}
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.demoButton}
                onPress={() => handleLinkPress(project.demo)}
              >
                <Text style={styles.buttonText}>Live Demo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.statsButton}
                onPress={() => handleLinkPress(project.stats)}
              >
                <Text style={styles.buttonText}>GitHub Stats</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animated.View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Featured Projects</Text>
      {projectsData.map(renderProjectCard)}
    </View>
  );
}
