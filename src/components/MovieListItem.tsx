import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image'; // Import FastImage
import {toggleFavorite} from '../store/moviesSlice';
import {RootState} from '../store/store';
import {Movie} from '../types/movie';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'; // Import wp and hp

interface Props {
  item: Movie;
  navigation: any;
}

export function MovieListItem({item, navigation}: Props) {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.movies.favorites);
  const isFavorite = favorites.includes(item.trackId);

  const handleFavoriteToggle = () => {
    dispatch(toggleFavorite(item.trackId));
  };

  const handleNavigation = () => {
    navigation.navigate('Software Details', {movie: item});
  };

  return (
    <View style={styles.container}>
      {/* Movie Details and Navigation */}
      <TouchableOpacity
        style={styles.detailsTouchable}
        onPress={handleNavigation}>
        {/* Movie Image */}
        <FastImage
          source={
            item.artworkUrl100
              ? {uri: item.artworkUrl100}
              : require('../assets/Placeholder.jpg')
          }
          style={styles.movieImage}
          resizeMode={FastImage.resizeMode.cover} // Optional resize mode
        />

        {/* Movie Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.movieName}>{item.trackName}</Text>
          <Text style={styles.genre}>{item.primaryGenreName}</Text>
          <Text style={styles.price}>{`${item.formattedPrice}`}</Text>
        </View>
      </TouchableOpacity>

      {/* Favorite Button */}
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={handleFavoriteToggle}>
        <Text
          style={[
            styles.favoriteText,
            isFavorite ? styles.favorite : styles.notFavorite,
          ]}>
          {isFavorite ? '★' : '☆'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: wp(3), // 3% of screen width for padding
    backgroundColor: 'white',
    marginBottom: hp(1.5), // 1.5% of screen height for bottom margin
    borderRadius: wp(2), // 2% of screen width for border radius
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  detailsTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  movieImage: {
    width: wp(15), // 15% of screen width for image
    height: wp(15), // 15% of screen width for image height
    borderRadius: wp(2), // Border radius as 2% of screen width for rounded corners
  },
  detailsContainer: {
    marginLeft: wp(3), // 3% of screen width for left margin
    flex: 1,
  },
  movieName: {
    fontWeight: 'bold',
    fontSize: wp(4.5), // 4.5% of screen width for font size
  },
  genre: {
    color: '#666',
    fontSize: wp(4), // 4% of screen width for font size
  },
  price: {
    fontSize: wp(4), // 4% of screen width for font size
    fontWeight: 'bold',
    marginTop: hp(0.5), // 0.5% of screen height for margin
  },
  favoriteButton: {
    padding: wp(3), // 3% of screen width for padding around the favorite button
  },
  favoriteText: {
    fontSize: wp(6), // 6% of screen width for font size
  },
  favorite: {
    color: 'gold',
  },
  notFavorite: {
    color: '#ccc',
  },
});

export default MovieListItem;
