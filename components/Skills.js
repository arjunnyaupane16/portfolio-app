import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  LayoutAnimation,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import styles from '../styles/SkillsStyles';

const skillsData = [
  {
    category: 'Frontend Development',
    icon: 'code',
    color: '#4cc9f0',
    items: [
      { name: 'HTML5', icon: require('../assets/icons/html.png'), level: 95 },
      { name: 'CSS3', icon: require('../assets/icons/css.png'), level: 90 },
      { name: 'JavaScript', icon: require('../assets/icons/javascript.png'), level: 75 },
      { name: 'React', icon: require('../assets/icons/react.png'), level: 90 },
      { name: 'React Native', icon: require('../assets/icons/react-native.png'), level: 85 },
      { name: 'TypeScript', icon: require('../assets/icons/typescript.png'), level: 65 },
    ],
  },
  {
    category: 'Backend & Databases',
    icon: 'storage',
    color: '#4895ef',
    items: [
      { name: 'Node.js', icon: require('../assets/icons/node.png'), level: 85 },
      { name: 'Express', icon: require('../assets/icons/express.png'), level: 80 },
      { name: 'MongoDB', icon: require('../assets/icons/mongodb.png'), level: 75 },
    ],
  },
  {
    category: 'Tools & Platforms',
    icon: 'build',
    color: '#4cc9f0',
    items: [
      { name: 'Git', icon: require('../assets/icons/git.png'), level: 90 },
      { name: 'GitHub', icon: require('../assets/icons/github.png'), level: 85 },
      { name: 'Firebase', icon: require('../assets/icons/firebase.png'), level: 75 },
      { name: 'Postman', icon: require('../assets/icons/postman.png'), level: 95 },
    ],
  },
];

const INITIAL_VISIBLE_ITEMS = 6;

export default function Skills() {
  const titleFade = useRef(new Animated.Value(0)).current;
  const titleSlide = useRef(new Animated.Value(-20)).current;
  const subtitleFade = useRef(new Animated.Value(0)).current;

  const sectionFades = useRef(skillsData.map(() => new Animated.Value(0))).current;
  const sectionScales = useRef(skillsData.map(() => new Animated.Value(0.9))).current;

  const cardFades = useRef(skillsData.flatMap(s => s.items.map(() => new Animated.Value(0)))).current;
  const cardScales = useRef(skillsData.flatMap(s => s.items.map(() => new Animated.Value(0.8)))).current;
  const cardRotations = useRef(skillsData.flatMap(s => s.items.map(() => new Animated.Value(0)))).current;
  const progressAnims = useRef(skillsData.flatMap(s => s.items.map(() => new Animated.Value(0)))).current;

  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    Animated.sequence([
      Animated.parallel([
        Animated.timing(titleFade, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true
        }),
        Animated.spring(titleSlide, {
          toValue: 0,
          speed: 2,
          bounciness: 8,
          useNativeDriver: true
        }),
      ]),
      Animated.timing(subtitleFade, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true
      }),

      Animated.stagger(150, skillsData.map((_, i) =>
        Animated.parallel([
          Animated.spring(sectionScales[i], {
            toValue: 1,
            friction: 5,
            useNativeDriver: true
          }),
          Animated.timing(sectionFades[i], {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
          })
        ])
      )),

      Animated.stagger(50, skillsData.flatMap((section, sectionIndex) =>
        section.items.map((_, itemIndex) => {
          const flatIndex = skillsData
            .slice(0, sectionIndex)
            .reduce((sum, s) => sum + s.items.length, 0) + itemIndex;

          return Animated.parallel([
            Animated.spring(cardScales[flatIndex], {
              toValue: 1,
              friction: 5,
              tension: 60,
              useNativeDriver: true
            }),
            Animated.timing(cardFades[flatIndex], {
              toValue: 1,
              duration: 500,
              useNativeDriver: true
            }),
            Animated.timing(cardRotations[flatIndex], {
              toValue: 1,
              duration: 700,
              easing: Easing.elastic(1),
              useNativeDriver: true
            }),
            Animated.timing(progressAnims[flatIndex], {
              toValue: 1,
              duration: 1200,
              easing: Easing.out(Easing.exp),
              useNativeDriver: false
            })
          ]);
        })
      ))
    ]).start();
  }, []);

  const toggleSection = (sectionIndex) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedSections(prev => ({
      ...prev,
      [sectionIndex]: !prev[sectionIndex]
    }));
  };

  const renderSkillCard = (item, section, flatIndex) => {
    const rotateInterpolate = cardRotations[flatIndex].interpolate({
      inputRange: [0, 1],
      outputRange: ['-15deg', '0deg']
    });

    const progressWidth = progressAnims[flatIndex].interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', `${item.level}%`]
    });

    return (
      <Animated.View
        key={item.name}
        style={[
          styles.card,
          {
            opacity: cardFades[flatIndex],
            transform: [
              { scale: cardScales[flatIndex] },
              { rotate: rotateInterpolate }
            ],
            borderColor: section.color + '40',
            shadowColor: section.color
          }
        ]}
      >
        <View style={styles.cardHeader}>
          <Animated.View
            style={[
              styles.iconContainer,
              {
                backgroundColor: section.color + '20',
                transform: [{
                  rotate: cardRotations[flatIndex].interpolate({
                    inputRange: [0, 1],
                    outputRange: ['-180deg', '0deg']
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
                  width: progressWidth,
                  backgroundColor: section.color
                }
              ]}
            />
          </View>
          <Animated.Text
            style={[
              styles.percentText,
              {
                color: section.color,
                opacity: progressAnims[flatIndex],
                transform: [{
                  translateX: progressAnims[flatIndex].interpolate({
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
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.header,
            {
              opacity: titleFade,
              transform: [{ translateY: titleSlide }]
            }
          ]}
        >
          <Text style={styles.title}>My Skills</Text>
          <Animated.Text style={[styles.subtitle, { opacity: subtitleFade }]}>
            Technologies I work with daily
          </Animated.Text>
        </Animated.View>

        {skillsData.map((section, sectionIndex) => (
          <Animated.View
            key={section.category}
            style={[
              styles.section,
              {
                opacity: sectionFades[sectionIndex],
                transform: [{ scale: sectionScales[sectionIndex] }]
              }
            ]}
          >
            <TouchableOpacity
              onPress={() => toggleSection(sectionIndex)}
              activeOpacity={0.7}
              style={styles.sectionHeader}
            >
              <MaterialIcons
                name={section.icon}
                size={24}
                color={section.color}
              />
              <Text
                style={[
                  styles.sectionTitle,
                  {
                    color:
                      section.category === 'Frontend Development' ||
                      section.category === 'Backend & Databases' ||
                      section.category === 'Tools & Platforms'
                        ? '#ffffff'
                        : section.color
                  }
                ]}
              >
                {section.category}
              </Text>
              <MaterialIcons
                name={expandedSections[sectionIndex] ? 'expand-less' : 'expand-more'}
                size={24}
                color={section.color}
              />
            </TouchableOpacity>

            <View style={styles.grid}>
              {section.items
                .slice(0, expandedSections[sectionIndex] ? section.items.length : INITIAL_VISIBLE_ITEMS)
                .map((item, itemIndex) => {
                  const flatIndex = skillsData
                    .slice(0, sectionIndex)
                    .reduce((sum, s) => sum + s.items.length, 0) + itemIndex;
                  return renderSkillCard(item, section, flatIndex);
                })}
            </View>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}
