import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const reviewsData = [
  // ... existing review data ...
];

function CustomerReviews({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState(reviewsData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!name || !email || !review || rating === 0) {
      Alert.alert('Error', 'Please fill all fields and provide a rating');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newReview = {
        id: Date.now().toString(),
        name,
        date: new Date().toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        review,
        avatar: 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436180.jpg?w=900',
        rating,
        likes: 0,
        comments: 0,
      };
      
      setReviews([newReview, ...reviews]);
      setName('');
      setEmail('');
      setReview('');
      setRating(0);
      setIsSubmitting(false);
      Alert.alert('Success', 'Your review has been submitted!');
    }, 1000);
  };

  const renderStars = (rate) => (
    <View style={styles.starsContainer}>
      {[...Array(5)].map((_, i) => (
        <FontAwesome
          key={i}
          name={i < rate ? 'star' : 'star-o'}
          size={16}
          color="#FFD700"
        />
      ))}
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.reviewCard}>
      <View style={styles.userRow}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.name}</Text>
          <View style={styles.ratingRow}>
            {renderStars(item.rating)}
            <Text style={styles.date}>{item.date}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.reviewText}>{item.review}</Text>
      <View style={styles.reactionsRow}>
        <TouchableOpacity style={styles.reactionButton}>
          <FontAwesome name="thumbs-o-up" size={16} color="#333" />
          <Text style={styles.reactionText}>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.reactionButton, { marginLeft: 16 }]}>
          <FontAwesome name="comment-o" size={16} color="#333" />
          <Text style={styles.reactionText}>{item.comments}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Customer Reviews</Text>
      
      {reviews.length === 0 ? (
        <Text style={styles.noReviewsText}>No reviews yet. Be the first to review!</Text>
      ) : (
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          scrollEnabled={false}
        />
      )}

      <Text style={styles.title}>Submit Your Review</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Add Your Rating</Text>
        <View style={styles.starsContainer}>
          {[...Array(5)].map((_, i) => (
            <TouchableOpacity 
              key={i} 
              onPress={() => setRating(i + 1)}
              activeOpacity={0.7}
            >
              <FontAwesome
                name={i < rating ? 'star' : 'star-o'}
                size={24}
                color="#FFD700"
                style={styles.star}
              />
            </TouchableOpacity>
          ))}
        </View>
        
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          value={name}
          onChangeText={setName}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Write your review..."
          value={review}
          onChangeText={setReview}
          multiline
          numberOfLines={4}
        />
        
        <TouchableOpacity
          style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={styles.submitText}>
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 16,
    color: '#333',
  },
  reviewCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 1,
  },
  userRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  userInfo: {
    flex: 1,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  userName: {
    fontWeight: '600',
    fontSize: 16,
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginLeft: 8,
  },
  reviewText: {
    marginVertical: 10,
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
  },
  reactionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  reactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reactionText: {
    marginLeft: 6,
    fontSize: 13,
    color: '#555',
  },
  form: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 20,
    marginTop: 8,
  },
  label: {
    fontSize: 15,
    marginBottom: 8,
    fontWeight: '500',
    color: '#444',
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  star: {
    marginRight: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 15,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#1a73e8',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#9fc1f9',
  },
  submitText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  noReviewsText: {
    textAlign: 'center',
    color: '#888',
    marginVertical: 20,
    fontSize: 15,
  },
});

export default CustomerReviews;