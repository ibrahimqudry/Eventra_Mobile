import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useRoute } from "@react-navigation/native";
// Remove this import
// import Carousel from 'react-native-snap-carousel';

// Change the component name from ReactService to ServiceDetails
const ServiceDetails = () => {
  const route = useRoute();
  // Add a default ID if route.params is undefined or doesn't contain an id
  const { id = 1 } = route.params || {};
  
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
      rating: 5,
      text: "Amazing service! Everything was perfect and exactly as described. Would definitely recommend!",
      date: "2 days ago",
    },
    {
      id: 2,
      user: "Sarah Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      rating: 4,
      text: "Great experience overall. The team was very professional and responsive.",
      date: "1 week ago",
    },
  ]);

  // Handlers
  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleReviewSubmit = () => {
    if (rating === 0 || !reviewText.trim()) return;

    const newReview = {
      id: reviews.length + 1,
      user: "Current User",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`,
      rating: rating,
      text: reviewText,
      date: "Just now",
    };

    setReviews([newReview, ...reviews]);
    setRating(0);
    setReviewText("");
  };

  // Data
  const services = [
    {
      id: 1,
      title: "Wedding Halls",
      description:
        "Turn your dream wedding into reality! Grand ballrooms, intimate garden settings, or chic modern spaces every detail crafted to mirror your love story. ✨💍",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
      category: "wedding",
    },
    {
      id: 2,
      title: "Photography",
      description:
        "Capture every magical moment with our professional photography services. From candid emotions to stunning portraits, we ensure your memories last forever.",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622",
      category: "photography",
    },
    {
      id: 3,
      title: "Catering",
      description:
        "Delight your guests with exquisite cuisine. Our catering services offer a variety of menu options to suit every taste and dietary requirement.",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3",
      category: "catering",
    },
    {
      id: 4,
      title: "Decoration",
      description:
        "Transform your venue into a breathtaking space with our decoration services. From elegant to extravagant, we bring your vision to life.",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
      category: "decoration",
    },
    {
      id: 5,
      title: "Entertainment",
      description:
        "Keep your guests entertained with our premium entertainment services. From live bands to DJs, we ensure your event is filled with energy and excitement.",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745",
      category: "entertainment",
    },
    {
      id: 6,
      title: "Transportation",
      description:
        "Arrive in style with our luxury transportation services. From classic cars to modern limousines, we ensure you make a grand entrance.",
      image: "https://images.unsplash.com/photo-1550355291-bbee04a92027",
      category: "transportation",
    },
    {
      id: 7,
      title: "Floral Arrangements",
      description:
        "Add a touch of natural beauty with our exquisite floral arrangements. Custom designs to match your theme and color palette.",
      image: "https://images.unsplash.com/photo-1561181286-d5c73485a63d",
      category: "flowers",
    },
    {
      id: 8,
      title: "Videography",
      description:
        "Preserve every moment with our professional videography services. Cinematic storytelling that captures the essence of your special day.",
      image: "https://images.unsplash.com/photo-1569240651738-2c7e9b24bb7a",
      category: "videography",
    },
    {
      id: 9,
      title: "Wedding Planning",
      description:
        "Let our expert planners handle every detail of your special day. From concept to execution, we ensure a stress-free experience.",
      image: "https://images.unsplash.com/photo-1472653431158-6364773b2a56",
      category: "planning",
    },
    {
      id: 10,
      title: "Cake & Desserts",
      description:
        "Indulge in delicious custom cakes and desserts that not only look stunning but taste amazing. Perfect sweet endings for your celebration.",
      image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d",
      category: "desserts",
    },
    {
      id: 11,
      title: "Lighting & Sound",
      description:
        "Create the perfect ambiance with our professional lighting and sound systems. Set the mood for an unforgettable experience.",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
      category: "technical",
    },
    {
      id: 12,
      title: "Invitations & Stationery",
      description:
        "Make a great first impression with custom invitations and stationery. Elegant designs that set the tone for your event.",
      image: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8",
      category: "stationery",
    },
  ];

  const serviceId = id ? parseInt(id) : 1;
  const service = services.find((s) => s.id === serviceId) || services[0];
  const packages = [
    {
      id: 1,
      name: "Basic Package",
      price: "$999",
      features: [
        "Basic setup and coordination",
        "Standard equipment",
        "4-hour service",
        "Basic support",
      ],
    },
    {
      id: 2,
      name: "Premium Package",
      price: "$1,999",
      features: [
        "Full setup and coordination",
        "Premium equipment",
        "8-hour service",
        "Priority support",
        "Customized experience",
        "Digital photo album",
      ],
    },
    {
      id: 3,
      name: "Luxury Package",
      price: "$3,499",
      features: [
        "Complete event management",
        "Top-tier equipment",
        "Full-day service",
        "24/7 dedicated support",
        "Personalized experience",
        "Digital & printed photo album",
        "Video highlights",
        "Complimentary add-ons",
      ],
    },
  ];

  const inspirationImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
      title: "Elegant Wedding Setup",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622",
      title: "Wedding Reception",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3",
      title: "Outdoor Ceremony",
    },
  ];

  if (!service) {
    return <Text style={styles.notFound}>Service not found</Text>;
  }

  // Remove the renderInspirationItem function since we're not using Carousel anymore
  // const renderInspirationItem = ({ item }) => (
  //   <View style={styles.sliderItem}>
  //     <Image
  //       source={{ uri: item.url }}
  //       style={styles.sliderImage}
  //       resizeMode="cover"
  //     />
  //     <Text style={styles.sliderTitle}>{item.title}</Text>
  //   </View>
  // );

  return (
    <ScrollView style={styles.container}>
      {/* Service Header */}
      <View style={styles.serviceHeader}>
        <Image
          source={{ uri: service.image }}
          style={styles.headerImage}
          resizeMode="cover"
        />
        <View style={styles.serviceInfo}>
          <Text style={styles.category}>{service.category}</Text>
          <Text style={styles.title}>{service.title}</Text>
          <Text style={styles.description}>{service.description}</Text>
        </View>
      </View>

      {/* Inspiration Gallery */}
      <View style={styles.inspirationSection}>
        <Text style={styles.sectionTitle}>Inspiration Gallery</Text>
        <Text style={styles.subtitle}>Discover amazing possibilities</Text>

        {/* Replace Carousel with ScrollView */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.galleryScrollView}
        >
          {inspirationImages.map((item) => (
            <View key={item.id} style={styles.sliderItem}>
              <Image
                source={{ uri: item.url }}
                style={styles.sliderImage}
                resizeMode="cover"
              />
              <Text style={styles.sliderTitle}>{item.title}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Packages */}
      <View style={styles.packagesSection}>
        <Text style={styles.sectionTitle}>Available Packages</Text>
        {packages.map((pkg) => (
          <View
            key={pkg.id}
            style={[
              styles.packageCard,
              pkg.id === 2 ? styles.highlightedPackage : {},
            ]}
          >
            {pkg.id === 2 && (
              <View style={styles.popularBadge}>
                <Text style={styles.popularText}>POPULAR</Text>
              </View>
            )}
            <Text style={styles.packageName}>{pkg.name}</Text>
            <Text style={styles.packagePrice}>{pkg.price}</Text>
            {pkg.features.map((feature, index) => (
              <Text key={index} style={styles.feature}>
                • {feature}
              </Text>
            ))}
            <TouchableOpacity
              style={[
                styles.bookButton,
                pkg.id === 2 ? styles.highlightedButton : {},
              ]}
            >
              <Text style={styles.bookButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Reviews */}
      <View style={styles.reviewsSection}>
        <Text style={styles.sectionTitle}>Customer Reviews</Text>

        {/* Review Form */}
        <View style={styles.reviewForm}>
          <Text style={styles.reviewFormTitle}>Leave a Review</Text>
          <View style={styles.ratingInput}>
            <Text>Your Rating:</Text>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => handleRatingClick(star)}
                >
                  <Text
                    style={[
                      styles.star,
                      { color: star <= rating ? "#f6e05e" : "#cbd5e0" },
                    ]}
                  >
                    ★
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <TextInput
            style={styles.reviewInput}
            placeholder="Share your experience..."
            value={reviewText}
            onChangeText={setReviewText}
            multiline
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleReviewSubmit}
          >
            <Text style={styles.submitButtonText}>Submit Review</Text>
          </TouchableOpacity>
        </View>

        {/* Reviews List */}
        {reviews.map((review) => (
          <View key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <View style={styles.reviewerInfo}>
                <Image source={{ uri: review.avatar }} style={styles.avatar} />
                <View>
                  <Text style={styles.reviewerName}>{review.user}</Text>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
              </View>
              <View style={styles.rating}>
                {Array(5)
                  .fill("★")
                  .map((star, index) => (
                    <Text
                      key={index}
                      style={[
                        styles.star,
                        {
                          color: index < review.rating ? "#f6e05e" : "#cbd5e0",
                        },
                      ]}
                    >
                      {star}
                    </Text>
                  ))}
              </View>
            </View>
            <Text style={styles.reviewText}>{review.text}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  notFound: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  serviceHeader: {
    marginBottom: 20,
  },
  headerImage: {
    width: "100%",
    height: 200,
  },
  serviceInfo: {
    padding: 15,
  },
  category: {
    textTransform: "uppercase",
    color: "#666",
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#444",
    lineHeight: 24,
  },
  inspirationSection: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    color: "#666",
    marginBottom: 15,
  },
  galleryScrollView: {
    paddingBottom: 10,
  },
  sliderItem: {
    padding: 5,
    width: Dimensions.get("window").width * 0.8,
    marginRight: 10,
  },
  sliderImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  sliderTitle: {
    marginTop: 5,
    fontSize: 16,
    textAlign: "center",
  },
  packagesSection: {
    padding: 15,
    backgroundColor: "#f9f9f9",
  },
  packageCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    position: "relative",
  },
  highlightedPackage: {
    borderColor: "#6366f1", // Changed to primary color
    borderWidth: 2,
    transform: [{ scale: 1.02 }],
  },
  popularBadge: {
    position: "absolute",
    top: -10,
    right: 20,
    backgroundColor: "#a855f7", // Changed to secondary color
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  popularText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  packageName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#1f2937", // Changed to textPrimary
  },
  packagePrice: {
    fontSize: 28,
    color: "#6366f1", // Changed to primary color
    marginBottom: 15,
    fontWeight: "bold",
  },
  feature: {
    marginBottom: 8,
    color: "#4b5563", // Changed to textSecondary
    fontSize: 15,
  },
  bookButton: {
    backgroundColor: "#6366f1", // Changed to primary color
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
  },
  highlightedButton: {
    backgroundColor: "#a855f7", // Changed to secondary color
  },
  bookButtonText: {
    color: "#ffffff", // Changed to bgWhite
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  // Update review form styling to match
  reviewForm: {
    backgroundColor: "#ffffff", // Changed to bgWhite
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitButton: {
    backgroundColor: "#6366f1", // Changed from green to primary color
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  submitButtonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  reviewsSection: {
    padding: 15,
  },
  reviewForm: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  reviewFormTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  ratingInput: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  stars: {
    flexDirection: "row",
    marginLeft: 10,
  },
  star: {
    fontSize: 24,
    marginHorizontal: 2,
  },
  reviewInput: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#48bb78",
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  submitButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  reviewCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#eee",
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  reviewerInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  reviewerName: {
    fontWeight: "bold",
  },
  reviewDate: {
    color: "#666",
    fontSize: 12,
  },
  rating: {
    flexDirection: "row",
  },
  reviewText: {
    color: "#444",
    lineHeight: 20,
  },
});

export default ServiceDetails;
