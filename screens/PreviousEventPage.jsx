import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  Platform,
  Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Carousel from 'react-native-snap-carousel';

const PreviousEventPage = () => {
  // Load reviews from AsyncStorage on initial render
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', comment: '', rating: 0 });
  const [editId, setEditId] = useState(null);
  const [lovedComments, setLovedComments] = useState({});
  const [activeSlide, setActiveSlide] = useState(0);

  // Colors
  const colors = {
    primary: '#6366f1',
    primaryDark: '#4f46e5',
    secondary: '#a855f7',
    textPrimary: '#1f2937',
    textSecondary: '#4b5563',
    bgLight: '#f3f4f6',
    bgWhite: '#ffffff',
    borderColor: '#e5e7eb',
    star: '#f0c040',
  };

  const cards = [
    { id: 1, image: 'https://img.freepik.com/premium-photo/contemporary-student-with-vr-headset-demonstrating-abilities-automation-robot-front-his-classmates-presentation_274679-9219.jpg?w=1380', text: 'Artificial Intelligence & Machine Learning' },
    { id: 2, image: 'https://img.freepik.com/premium-photo/graph-is-going-up-male-business-trainer-is-against-projector-with-data-teaching-people_146671-123222.jpg?w=1380', text: 'Cloud Computing & DevOps' },
    { id: 3, image: 'https://img.freepik.com/free-photo/image-by-rawpixel-com_53876-165282.jpg?t=st=1745007077~exp=1745010677~hmac=2ea9d38674056ef30d7e19ef1238c84b1595effadde7d9de113d4990d7724fd1&w=1060', text: 'Cybersecurity' },
    { id: 4, image: 'https://img.freepik.com/premium-photo/recording-graduation-day_1048944-18644863.jpg?w=1480', text: 'Web3, Blockchain & FinTech' },
    { id: 5, image: 'https://img.freepik.com/premium-photo/building-space_664434-8204.jpg?w=1380', text: 'Metaverse & AR/VR' },
  ];

  // Load data from AsyncStorage
  useEffect(() => {
    const loadData = async () => {
      try {
        // In a real app, you would use AsyncStorage here
        const savedReviews = await AsyncStorage.getItem('eventReviews');
        const savedLoves = await AsyncStorage.getItem('lovedComments');
        setReviews(savedReviews ? JSON.parse(savedReviews) : []);
        setLovedComments(savedLoves ? JSON.parse(savedLoves) : {});
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, []);

  // Save data to AsyncStorage
  useEffect(() => {
    const saveData = async () => {
      try {
        // In a real app, you would use AsyncStorage here
        await AsyncStorage.setItem('eventReviews', JSON.stringify(reviews));
        await AsyncStorage.setItem('lovedComments', JSON.stringify(lovedComments));
      } catch (error) {
        console.error('Error saving data:', error);
      }
    };
    saveData();
  }, [reviews, lovedComments]);

  const handleSubmit = () => {
    if (!form.name || !form.comment) return;

    if (editId !== null) {
      setReviews(reviews.map(r => r.id === editId ? { ...form, id: editId, date: r.date } : r));
      setEditId(null);
    } else {
      setReviews([
        {
          ...form,
          id: Date.now(),
          date: new Date().toLocaleDateString(),
          loves: 0,
          replies: 0
        },
        ...reviews
      ]);
    }

    setForm({ name: '', email: '', comment: '', rating: 0 });
  };

  const handleEdit = (id) => {
    const review = reviews.find(r => r.id === id);
    setForm(review);
    setEditId(id);
  };

  const handleDelete = (id) => {
    setReviews(reviews.filter(r => r.id !== id));
  };

  const handleLove = (id) => {
    // Get the current user's identifier
    const userId = Math.random().toString(36).substring(2, 15); // Simplified for demo

    setLovedComments(prev => {
      const newLoves = { ...prev };
      if (!newLoves[id]) {
        newLoves[id] = [];
      }

      if (newLoves[id].includes(userId)) {
        // User already loved this comment, remove their love
        newLoves[id] = newLoves[id].filter(u => u !== userId);
      } else {
        // Add user's love
        newLoves[id] = [...newLoves[id], userId];
      }

      return newLoves;
    });

    // Update the review's love count
    setReviews(reviews.map(review => {
      if (review.id === id) {
        return {
          ...review,
          loves: lovedComments[id] ? lovedComments[id].length : 0
        };
      }
      return review;
    }));
  };

  const renderCarouselItem = ({ item, index }) => {
    return (
      <View style={styles.cardContainer}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardText}>{item.text}</Text>
        </View>
      </View>
    );
  };

  const renderReview = ({ item }) => {
    const isLoved = lovedComments[item.id]?.includes(localStorage.getItem('userId'));
    
    return (
      <View style={styles.reviewCard}>
        <View style={styles.reviewHeader}>
          <View>
            <Text style={styles.reviewName}>{item.name}</Text>
            <Text style={styles.reviewDate}>{item.date}</Text>
            <View style={styles.starsContainer}>
              {[...Array(5)].map((_, i) => (
                <Icon
                  key={i}
                  name={i < item.rating ? 'star' : 'star-o'}
                  size={20}
                  color={colors.star}
                />
              ))}
            </View>
          </View>
          <View style={styles.reviewActions}>
            <TouchableOpacity onPress={() => handleLove(item.id)} style={styles.loveButton}>
              <Icon
                name="heart"
                size={18}
                color={isLoved ? 'red' : 'gray'}
              />
              <Text style={[styles.loveCount, { color: isLoved ? 'red' : 'gray' }]}>
                {lovedComments[item.id]?.length || 0}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleEdit(item.id)} style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item.id)} style={[styles.actionButton, styles.deleteButton]}>
              <Text style={styles.actionButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.reviewComment}>{item.comment}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Event Highlights Section */}
      <View style={styles.carouselContainer}>
        <View style={styles.carouselTitleContainer}>
          <Text style={styles.carouselTitle}>Tech Summit 2024</Text>
          <Text style={styles.carouselSubtitle}>Previous Event Highlights and Topics that had been discussed</Text>
        </View>

        <Carousel
          data={cards}
          renderItem={renderCarouselItem}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width * 0.8}
          onSnapToItem={(index) => setActiveSlide(index)}
          layout={'default'}
          loop={true}
          autoplay={true}
          autoplayInterval={3000}
        />

        <View style={styles.eventMeta}>
          <Text style={styles.category}>Technology</Text>
        </View>

        <View style={styles.eventInfoContainer}>
          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Ionicons name="location" size={20} color="white" />
            </View>
            <View>
              <Text style={styles.infoTitle}>Location</Text>
              <Text style={styles.infoText}>Cairo International Convention Center</Text>
            </View>
          </View>
          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <MaterialIcons name="date-range" size={20} color="white" />
            </View>
            <View>
              <Text style={styles.infoTitle}>Date</Text>
              <Text style={styles.infoText}>April 15, 2024</Text>
            </View>
          </View>
          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Ionicons name="people" size={20} color="white" />
            </View>
            <View>
              <Text style={styles.infoTitle}>Number Of Attendees</Text>
              <Text style={styles.infoText}>500 Attendees</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Reviews Section */}
      <Text style={styles.sectionTitle}>Customer Reviews</Text>

      {reviews.length === 0 ? (
        <View style={styles.noReviews}>
          <Text style={styles.noReviewsText}>No reviews yet. Be the first to review!</Text>
        </View>
      ) : (
        <FlatList
          data={reviews}
          renderItem={renderReview}
          keyExtractor={item => item.id.toString()}
          scrollEnabled={false}
        />
      )}

      {/* Review Form */}
      <View style={styles.formCard}>
        <Text style={styles.formTitle}>Submit Your Review</Text>
        <View style={styles.starsContainer}>
          {[...Array(5)].map((_, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => setForm({ ...form, rating: i + 1 })}
            >
              <Icon
                name={i < form.rating ? 'star' : 'star-o'}
                size={24}
                color={colors.star}
                style={styles.star}
              />
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={form.name}
          onChangeText={(text) => setForm({ ...form, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={form.email}
          onChangeText={(text) => setForm({ ...form, email: text })}
          keyboardType="email-address"
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Write your review..."
          value={form.comment}
          onChangeText={(text) => setForm({ ...form, comment: text })}
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>
            {editId !== null ? 'Update Review' : 'Submit Review'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f3f4f6',
      padding: 16,
    },
  carouselContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  carouselTitleContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  carouselTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundImage: 'linear-gradient(135deg, #6366f1, #a855f7)',
    backgroundClip: 'text',
    color: 'transparent',
  },
  carouselSubtitle: {
    fontSize: 16,
    color: '#4b5563',
    marginTop: 8,
    textAlign: 'center',
  },
  cardContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  cardTextContainer: {
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  cardText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
  },
  eventMeta: {
    marginTop: 10,
    marginBottom: 20,
  },
  category: {
    color: '#6366f1',
    fontWeight: 'bold',
  },
  eventInfoContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#4b5563',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    backgroundImage: 'linear-gradient(135deg, #6366f1, #a855f7)',
    backgroundClip: 'text',
    color: 'transparent',
  },
  reviewCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  reviewName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  reviewDate: {
    fontSize: 14,
    color: '#4b5563',
    marginVertical: 5,
  },
  starsContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  star: {
    marginRight: 5,
  },
  reviewActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  loveCount: {
    marginLeft: 5,
    fontSize: 14,
  },
  actionButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 10,
  },
  deleteButton: {
    backgroundColor: '#f3f4f6',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  reviewComment: {
    fontSize: 16,
    color: '#1f2937',
    lineHeight: 24,
  },
  noReviews: {
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  noReviewsText: {
    fontSize: 16,
    color: '#4b5563',
  },
  formCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1f2937',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#6366f1',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default PreviousEventPage;