import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  LayoutAnimation
} from 'react-native';
import styles from '../styles/ProjectsStyles';

// Import your project images
import adminappImg from '../assets/images/admin-app.jpg';
import driftAndSipImg from '../assets/images/drift-and-sip.jpg';
import portfolioImg from '../assets/images/portfolio.jpg';
import taskManagerImg from '../assets/images/task-manager.jpg';

const projectsData = [
  {
    id: '1',
    title: 'Drift & Sip',
    description: 'Real-time order management app with live tracking, soft delete, dashboards, and API integration.',
    tech: 'React Native, Node.js, MongoDB',
    image: driftAndSipImg,
    demo: 'https://drift-and-sip-user-app.vercel.app/',
    github: 'https://github.com/yourusername/drift-and-sip',
    color: '#4cc9f0' // Teal
  },
  {
    id: '2',
    title: 'Personal Portfolio',
    description: 'Responsive portfolio website showcasing skills and featured projects.',
    tech: 'React.js, CSS3, Vercel',
    image: portfolioImg,
    demo: 'https://chandraprakashnyaupane.vercel.app/',
    github: 'https://github.com/yourusername/portfolio',
    color: '#4895ef' // Light blue
  },
  {
    id: '3',
    title: 'Task Manager',
    description: 'A task and project management app featuring drag & drop, reminders, and cloud sync.',
    tech: 'React Native, Firebase, Redux',
    image: taskManagerImg,
    demo: 'https://task-manager-demo.example.com',
    github: 'https://github.com/yourusername/task-manager',
    color: '#4361ee' // Primary blue
  },
  {
    id: '4',
    title: 'Admin App',
    description: 'Admin panel for managing orders, dashboards, and staff with authentication and responsive UI.',
    tech: 'React.js, JavaScript, CSS3, Vercel',
    image: adminappImg,
    demo: 'https://admin-app-rose.vercel.app/',
    github: 'https://github.com/yourusername/admin-app',
    color: '#3f37c9' // Dark blue
  },
];

export default function Projects() {
  const [expandedId, setExpandedId] = useState(null);
  const [imageLoaded, setImageLoaded] = useState({});

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const cardFades = useRef(projectsData.map(() => new Animated.Value(0))).current;
  const cardScales = useRef(projectsData.map(() => new Animated.Value(0.9))).current;
  const cardRotations = useRef(projectsData.map(() => new Animated.Value(-10))).current;
  const detailHeights = useRef(projectsData.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    // Configure LayoutAnimation for smooth expand/collapse
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    // Header animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        speed: 2,
        bounciness: 8,
        useNativeDriver: true
      })
    ]).start();
Animated.stagger(150, projectsData.map((_, i) =>
    Animated.parallel([
      Animated.spring(cardScales[i], {
        toValue: 1,
        friction: 5,
        useNativeDriver: true
      }),
      Animated.timing(cardFades[i], {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.spring(cardRotations[i], {
        toValue: 0,
        tension: 60,
        friction: 7,
        useNativeDriver: true
      })
    ])
  )).start(); // ✅ This .start() now correctly closes the stagger block
}, []);
  useEffect(() => {
    // Animate details height when expandedId changes
    projectsData.forEach((_, i) => {
      Animated.timing(detailHeights[i], {
        toValue: expandedId === projectsData[i].id ? 1 : 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false
      }).start();
    });
  }, [expandedId]);

  const handleLinkPress = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log("Don't know how to open this URL: " + url);
    }
  };

  const renderProjectCard = (project, index) => {
    const isExpanded = expandedId === project.id;
    const rotateInterpolate = cardRotations[index].interpolate({
      inputRange: [0, 1],
      outputRange: ['-5deg', '0deg']
    });

    const detailHeightInterpolate = detailHeights[index].interpolate({
      inputRange: [0, 1],
      outputRange: [0, 200] // Adjust based on your content height
    });

    return (
      <Animated.View
        key={project.id}
        style={[
          styles.projectCard,
          {
            opacity: cardFades[index],
            transform: [
              { scale: cardScales[index] },
              { rotate: rotateInterpolate }
            ],
            borderColor: project.color + '40',
            shadowColor: project.color
          }
        ]}
      >
        {/* Image with loading indicator */}
        <View style={styles.imageContainer}>
          {!imageLoaded[project.id] && (
            <ActivityIndicator
              style={styles.loadingIndicator}
              size="large"
              color={project.color}
            />
          )}
          <Image
            source={project.image}
            style={styles.projectImage}
            resizeMode="cover"
            onLoadStart={() => setImageLoaded(prev => ({ ...prev, [project.id]: false }))}
            onLoadEnd={() => setImageLoaded(prev => ({ ...prev, [project.id]: true }))}
          />
        </View>

        {/* Project header with expand button */}
        <TouchableOpacity
          style={styles.projectHeader}
          onPress={() => setExpandedId(isExpanded ? null : project.id)}
          activeOpacity={0.7}
        >
          <Text style={[styles.projectTitle, { color: project.color }]}>
            {project.title}
          </Text>
          <MaterialIcons
            name={isExpanded ? 'expand-less' : 'expand-more'}
            size={28}
            color={project.color}
          />
        </TouchableOpacity>

        {/* Project details (animated height) */}
        <Animated.View
          style={[
            styles.projectDetails,
            {
              height: detailHeightInterpolate,
              borderTopColor: project.color + '20'
            }
          ]}
        >
          <ScrollView
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.projectDescription}>{project.description}</Text>
            <Text style={styles.projectTech}>
              <Text style={{ fontWeight: '700', color: project.color }}>Tech Stack: </Text>
              {project.tech}
            </Text>

            {/* Action buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: project.color }]}
                onPress={() => handleLinkPress(project.demo)}
              >
                <Ionicons name="md-open-outline" size={18} color="#fff" />
                <Text style={styles.buttonText}>Live Demo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: project.color + 'cc' }]}
                onPress={() => handleLinkPress(project.github)}
              >
                <Ionicons name="logo-github" size={18} color="#fff" />
                <Text style={styles.buttonText}>View Code</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animated.View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.header,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <Text style={styles.title}>Featured Projects</Text>
        <Text style={styles.subtitle}>My best work and contributions</Text>
      </Animated.View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {projectsData.map((project, index) => renderProjectCard(project, index))}
      </ScrollView>
    </View>
  );
}
