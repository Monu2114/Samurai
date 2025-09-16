// import { isDev } from "./helper";
import { Variants } from "framer-motion";

export const pricingPlans = [
  {
    name: "Basic",
    description: "perfect for ocassional use",
    price: 9,
    items: [
      "5 PDF summaries per month",
      "Standard processing speed",
      "Email support",
    ],
    id: "basic",
    paymentLink:
      "https://buy.stripe.com/test_7sY6oH8VEgmf6v3aWd33W01",
    priceId: "price_1S0ycHFa1E1RjCDc1aysspNl",
  },
  {
    name: "Pro",
    description: "For professionals and teams",
    price: 19,
    items: [
      "Unlimited PDF summaries",
      "Priority processing",
      "24/7 priority support",
      "Markdown Export",
    ],
    id: "pro",
    paymentLink:"https://buy.stripe.com/test_5kQ28r1tcc5Zg5D1lD33W00",
    priceId: "price_1S0yfUFa1E1RjCDc0nco4fls",
  },
];

export const DEMO_SUMMARY = `# Deep Learning in Action: Object Detection and Feature Extraction! 🚀
🎯 Hands-on experience with building deep learning pipelines for object detection and using CNNs for feature extraction.
🚀 Learn to train, test, and infer using popular models and datasets.

# Document Details
📄 Type: Course Assignment
👥 For: B.Tech Students (Deep Learning Course)

# Key Highlights
✨ • 🤖 Building a pipeline for training, testing, and inference in object detection.
💡 • 🧠 Implementing Convolutional Neural Networks (CNNs) as feature extractors.
🎯 • 🖼️ Working with real-world datasets like mask-wearing and Stanford car datasets.

# Why It Matters
🔧 This assignment provides practical experience in applying deep learning concepts to real-world problems. By building pipelines for object detection and using CNNs for feature extraction, students gain valuable skills applicable to various industries, including security, autonomous vehicles, and image analysis.

# Main Points
📌 • 🔍 Object detection pipeline using YOLOv5 and Faster RCNN.
🛠️ • ⚙️ Feature extraction using pre-trained CNN models like ResNet-50, VGG-16/19, and InceptionNetv3.
📊 • 📈 Visualizing extracted features from different layers of CNNs.

# Pro Tips
⭐ • 📚 Refer to research papers (like the YOLO and RCNN papers) for a deeper understanding of the models.
⭐ • 💻 Leverage TensorFlow/Keras for efficient implementation.
⭐ • 🎨 Experiment with different layers in CNNs to extract diverse features.

# Key Terms to Know
📖 • CNN: Convolutional Neural Network - A type of deep learning model commonly used for image recognition.
📖 • Object Detection: Identifying and locating objects within an image or video.

# Bottom Line
💡 • 🚀 This assignment empowers you to build and apply deep learning models for object detection and feature extraction, essential skills for a career in AI!
`;

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 100,
      duration: 0.5,
    },
  },
};
