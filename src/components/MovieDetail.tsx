import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {toggleFavorite} from '../store/moviesSlice';
import {RootState} from '../store/store';
import {Movie} from '../types/movie';
import FastImage from 'react-native-fast-image'; // Import FastImage
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface MovieDetailProps {
  route: any;
}

export function MovieDetail({route}: MovieDetailProps) {
  const dispatch = useDispatch();
  const movie: Movie = route.params.movie;
  const favorites = useSelector((state: RootState) => state.movies.favorites);
  const isFavorite = favorites.includes(movie.trackId);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <FastImage
        source={
          movie.artworkUrl100
            ? {uri: movie.artworkUrl100}
            : require('../assets/Placeholder.jpg')
        }
        style={styles.movieImage}
        resizeMode={FastImage.resizeMode.cover} // FastImage resizeMode
      />

      <View style={styles.detailsContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.movieName}>{movie.trackName}</Text>
          <TouchableOpacity
            onPress={() => dispatch(toggleFavorite(movie.trackId))}>
            <Text
              style={[
                styles.favoriteIcon,
                {color: isFavorite ? 'gold' : 'gray'},
              ]}>
              {isFavorite ? '★' : '☆'}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.genre}>{movie.primaryGenreName}</Text>
        <Text style={styles.price}>{`${movie.formattedPrice}`}</Text>
        <Text style={styles.description}>{movie.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    padding: wp(4), // 4% of the screen width
  },
  movieImage: {
    width: '100%',
    height: hp(30), // 30% of the screen height
    borderRadius: wp(2), // 2% of the screen width
  },
  detailsContainer: {
    padding: wp(4), // 4% of the screen width
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  movieName: {
    fontSize: wp(6), // 6% of the screen width
    fontWeight: 'bold',
    flexShrink: 1,
  },
  favoriteIcon: {
    fontSize: wp(8), // 8% of the screen width
  },
  genre: {
    color: 'gray',
    marginVertical: hp(1), // 1% of the screen height
  },
  price: {
    fontSize: wp(5), // 5% of the screen width
    fontWeight: 'bold',
  },
  description: {
    marginTop: hp(2), // 2% of the screen height
  },
});

export default MovieDetail;
