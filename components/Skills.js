import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, LayoutAnimation, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles/SkillsStyles';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;

const skillsData = [
  {
    category: 'Frontend Development',
    icon: '💻',
    color: '#6366F1', // Indigo
    items: [
      { name: 'HTML5', icon: require('../assets/icons/html.png'), level: 95 },
      { name: 'CSS3', icon: require('../assets/icons/css.png'), level: 90 },
      { name: 'JavaScript', icon: require('../assets/icons/javascript.png'), level: 78 },
      { name: 'TypeScript', icon: require('../assets/icons/typescript.png'), level: 85 },
      { name: 'React', icon: require('../assets/icons/react.png'), level: 90 },
       { name: 'Python', icon: require('../assets/icons/python.png'), level: 85 },
      { name: 'React Native', icon: require('../assets/icons/react-native.png'), level: 87 },
    ],
  },
  {
    category: 'Backend & Databases',
    icon: '🛠️',
    color: '#10B981', // Emerald
    items: [
      { name: 'Node.js', icon: require('../assets/icons/node.png'), level: 80 },
      { name: 'Express.js', icon: require('../assets/icons/express.png'), level: 75 },
      { name: 'MongoDB', icon: require('../assets/icons/mongodb.png'), level: 78 },
      { name: 'RESTful APIs', icon: require('../assets/icons/api.png'), level: 82 },
    ],
  },
  {
    category: 'Tools & Platforms',
    icon: '🔧',
    color: 'pink', // Amber
    items: [
      { name: 'Git', icon: require('../assets/icons/git.png'), level: 90 },
      { name: 'GitHub', icon: require('../assets/icons/github.png'), level: 93 },
      { name: 'Postman', icon: require('../assets/icons/postman.png'), level: 95 },
      { name: 'Firebase', icon: require('../assets/icons/firebase.png'), level: 80 },
      { name: 'Vercel', icon: require('../assets/icons/vercel.png'), level: 88 },
      { name: 'Netlify', icon: require('../assets/icons/netlify.png'), level: 86 },
    ],
  },
];

const INITIAL_VISIBLE_ITEMS = 2; // Show only 2 skills initially

export default function Skills() {
  const [expandedSections, setExpandedSections] = useState({});
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const sectionFade = useRef(skillsData.map(() => new Animated.Value(0))).current;
  const sectionSlide = useRef(skillsData.map(() => new Animated.Value(20))).current;
  const cardScale = useRef(skillsData.flatMap(section => section.items.map(() => new Animated.Value(0.9)))).current;
  const cardOpacity = useRef(skillsData.flatMap(section => section.items.map(() => new Animated.Value(0)))).current;
  const progressAnim = useRef(skillsData.flatMap(section => section.items.map(() => new Animated.Value(0)))).current;

  const toggleSection = (sectionIndex) => {
    LayoutAnimation.configureNext({
      duration: 300,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    });
    setExpandedSections(prev => ({
      ...prev,
      [sectionIndex]: !prev[sectionIndex]
    }));
  };

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 60,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),
      Animated.stagger(
        150,
        skillsData.map((_, i) =>
          Animated.parallel([
            Animated.timing(sectionFade[i], {
              toValue: 1,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.spring(sectionSlide[i], {
              toValue: 0,
              tension: 70,
              friction: 8,
              useNativeDriver: true,
            }),
          ])
        )
      ),
      Animated.stagger(
        50,
        skillsData.flatMap((section, sectionIndex) =>
          section.items.slice(0, INITIAL_VISIBLE_ITEMS).map((_, itemIndex) => {
            const flatIndex = skillsData
              .slice(0, sectionIndex)
              .reduce((sum, sec) => sum + sec.items.length, 0) + itemIndex;

            return Animated.parallel([
              Animated.spring(cardScale[flatIndex], {
                toValue: 1,
                tension: 70,
                friction: 7,
                useNativeDriver: true,
              }),
              Animated.timing(cardOpacity[flatIndex], {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
              }),
              Animated.timing(progressAnim[flatIndex], {
                toValue: 1,
                duration: 1000,
                delay: 100,
                useNativeDriver: false,
              }),
            ]);
          })
        )
      ),
    ]).start();
  }, []);

  const animateAdditionalCards = (sectionIndex) => {
    const startIndex = skillsData
      .slice(0, sectionIndex)
      .reduce((sum, sec) => sum + sec.items.length, 0) + INITIAL_VISIBLE_ITEMS;

    const endIndex = startIndex + (skillsData[sectionIndex].items.length - INITIAL_VISIBLE_ITEMS);

    Animated.stagger(
      50,
      skillsData[sectionIndex].items.slice(INITIAL_VISIBLE_ITEMS).map((_, index) => {
        const flatIndex = startIndex + index;
        return Animated.parallel([
          Animated.spring(cardScale[flatIndex], {
            toValue: 1,
            tension: 70,
            friction: 7,
            useNativeDriver: true,
          }),
          Animated.timing(cardOpacity[flatIndex], {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(progressAnim[flatIndex], {
            toValue: 1,
            duration: 800,
            delay: 100,
            useNativeDriver: false,
          }),
        ]);
      })
    ).start();
  };

  const renderSkillCard = (item, section, flatIndex) => {
    const widthInterpolate = progressAnim[flatIndex].interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', `${item.level}%`],
    });

    return (
      <Animated.View
        key={`${section.category}-${item.name}`}
        style={[
          styles.card,
          {
            opacity: cardOpacity[flatIndex],
            transform: [{ scale: cardScale[flatIndex] }],
            borderColor: section.color + '40',
            shadowColor: section.color,
          },
        ]}
      >
        <View style={styles.cardHeader}>
          <Animated.View
            style={[
              styles.iconContainer,
              {
                backgroundColor: section.color + '20',
                transform: [{
                  rotate: progressAnim[flatIndex].interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg']
                  })
                }]
              }
            ]}
          >
            <Image
              source={item.icon}
              style={styles.icon}
              resizeMode="contain"
            />
          </Animated.View>
          <Text style={styles.cardText}>{item.name}</Text>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBackground}>
            <Animated.View
              style={[
                styles.progressBar,
                {
                  width: widthInterpolate,
                  backgroundColor: section.color,
                },
              ]}
            />
          </View>
          <Animated.Text
            style={[
              styles.percentText,
              {
                color: section.color,
                opacity: progressAnim[flatIndex],
                transform: [{
                  translateX: progressAnim[flatIndex].interpolate({
                    inputRange: [0, 1],
                    outputRange: [-10, 0]
                  })
                }]
              }
            ]}
          >
            {item.level}%
          </Animated.Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Text style={styles.title}>My Skills & Expertise</Text>
      <Text style={styles.subtitle}>Technologies I work with daily</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {skillsData.map((section, sectionIndex) => (
          <Animated.View
            key={section.category}
            style={[
              styles.section,
              {
                opacity: sectionFade[sectionIndex],
                transform: [{ translateY: sectionSlide[sectionIndex] }],
              },
            ]}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>{section.icon}</Text>
              <Text style={[styles.sectionTitle, { color: section.color }]}>
                {section.category}
              </Text>
            </View>

            <View style={styles.grid}>
              {section.items.slice(0, INITIAL_VISIBLE_ITEMS).map((item, itemIndex) => {
                const flatIndex = skillsData
                  .slice(0, sectionIndex)
                  .reduce((sum, sec) => sum + sec.items.length, 0) + itemIndex;
                return renderSkillCard(item, section, flatIndex);
              })}

              {expandedSections[sectionIndex] &&
                section.items.slice(INITIAL_VISIBLE_ITEMS).map((item, itemIndex) => {
                  const flatIndex = skillsData
                    .slice(0, sectionIndex)
                    .reduce((sum, sec) => sum + sec.items.length, 0) + INITIAL_VISIBLE_ITEMS + itemIndex;
                  return renderSkillCard(item, section, flatIndex);
                })
              }
            </View>

            {section.items.length > INITIAL_VISIBLE_ITEMS && (
              <TouchableOpacity
                onPress={() => {
                  toggleSection(sectionIndex);
                  if (!expandedSections[sectionIndex]) {
                    animateAdditionalCards(sectionIndex);
                  }
                }}
                style={[styles.showMoreButton, { borderColor: section.color }]}
              >
               {expandedSections[sectionIndex] ? (
  <Text style={[styles.showLessText, { color: section.color }]}>Show Less</Text>
) : (
  <Text style={[styles.showMoreText, { color: section.color }]}>
    Show {section.items.length - INITIAL_VISIBLE_ITEMS} More
  </Text>
)}

              </TouchableOpacity>
            )}
          </Animated.View>
        ))}
      </ScrollView>
    </Animated.View>
  );
}
