export const seedProjects = [
  { 
    id: 'p001', 
    number: '001', 
    title: 'Portable Apple Grading System',
    hook: 'AI-powered CNN sorts apples by defect detection in real time.',
    description: 'CNN trained on apple surface images to detect defects such as black spots. Images from a camera are processed in real time, features extracted through convolutional layers, and classified using TensorFlow/Keras. The prediction triggers servo-based mechanical sorting integrated with embedded control systems.',
    category: 'AGRICULTURE', 
    status: 'DEPLOYED', 
    stack: ['TensorFlow', 'Keras', 'OpenCV', 'Python', 'Servo Systems'],
    featured: true, 
    createdAt: Date.now(), 
    updatedAt: Date.now() 
  },
  {
    id: 'p002',
    number: '002',
    title: 'Autonomous Navigation for Agri-Bots',
    hook: 'LiDAR-based SLAM for obstacle avoidance in dense orchards.',
    description: 'Developed a robust navigation stack using ROS2 and LiDAR sensors to allow small robotic platforms to navigate between tight tree rows without GPS. Implemented A* for path planning and TEB Local Planner for dynamic obstacle avoidance.',
    category: 'AGRICULTURE',
    status: 'PROTOTYPE',
    stack: ['ROS2', 'C++', 'LiDAR', 'SLAM', 'Python'],
    featured: true,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'p003',
    number: '003',
    title: 'Real-time Weed Detection',
    hook: 'YOLOv8 implementation for selective herbicide spraying.',
    description: 'A deep learning model designed to distinguish between crop plants and common weeds in high-resolution video streams. Achieved 94% mAP on field datasets. Integrated with edge computing hardware (Jetson Nano) for low-latency inference.',
    category: 'DETECTION',
    status: 'DEPLOYED',
    stack: ['YOLOv8', 'PyTorch', 'Jetson Nano', 'Computer Vision'],
    featured: false,
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
];

export const seedRecognition = [
  { 
    id: 'r001', 
    type: 'COMPETITION', 
    institution: 'IIT Delhi',
    achievement: 'Youth Ideathon — Top 10 Nationally', 
    date: '2023',
    description: 'Competed against hundreds of student innovators from across India with the Apple Grading System. Recognized for technical feasibility and social impact.',
    url: 'https://youthideathon.in',
    showOnPortfolio: true,
    createdAt: Date.now()
  },
  {
    id: 'r002',
    type: 'AWARD',
    institution: 'Prime Minister of India',
    achievement: 'National Innovation Award',
    date: '2024',
    description: 'Awarded for pioneering work in affordable agricultural technology for remote Himalayan regions.',
    showOnPortfolio: true,
    createdAt: Date.now()
  }
];

export const seedJournal = [
  {
    id: 'j001',
    title: 'The Challenge of Low-Light Inference',
    body: 'Current vision models struggle when the sun starts setting in the orchards. Need to look into IR-based data augmentation or switching to thermal imaging for night-time autonomous runs. Initial tests with synthetic noise addition show promise.',
    tags: ['research', 'ml', 'obstacle'],
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
];

export const seedProfile = {
  about: [
    'Deep Learning Engineer and Entrepreneur with a focus on solving real-world challenges through AI.',
    'I build systems that bridge the gap between complex research and field-ready applications, particularly in Agriculture.',
    'Based in Kashmir, I am passionate about leveraging technology to empower local communities and industries.'
  ],
  skills: ['Deep Learning', 'Computer Vision', 'Embedded Systems', 'ROS2', 'PyTorch', 'TensorFlow', 'React'],
  contact: {
    email: 'adnan@example.com',
    linkedin: 'https://linkedin.com/in/adnan-mushtaq',
    github: 'https://github.com/adnan-mushtaq'
  },
  tagline: 'Architecting the Future of Intelligent Systems'
};
