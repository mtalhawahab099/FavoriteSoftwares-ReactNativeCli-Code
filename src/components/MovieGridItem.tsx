import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {toggleFavorite} from '../store/moviesSlice';
import {RootState} from '../store/store';
import {Movie} from '../types/movie';
import FastImage from 'react-native-fast-image'; // Import FastImage
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'; // Import wp and hp

interface Props {
  item: Movie;
  navigation: any;
}

export function MovieGridItem({item, navigation}: Props) {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.movies.favorites);
  const isFavorite = favorites.includes(item.trackId);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Software Details', {movie: item})}>
      {/* Movie Image */}
      <FastImage
        source={
          item.artworkUrl100
            ? {uri: item.artworkUrl100}
            : require('../assets/Placeholder.jpg')
        }
        style={styles.image}
        resizeMode={FastImage.resizeMode.cover} // FastImage resizeMode option
      />

      {/* Movie Details */}
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={1}>
          {item.trackName}
        </Text>
        <Text style={styles.genre}>{item.primaryGenreName}</Text>
        <Text style={styles.price}>{`${item.formattedPrice}`}</Text>

        {/* Favorite Button */}
        <TouchableOpacity
          onPress={() => dispatch(toggleFavorite(item.trackId))}>
          <Text
            style={[
              styles.favoriteIcon,
              {color: isFavorite ? 'gold' : 'gray'},
            ]}>
            {isFavorite ? '★' : '☆'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp(44), // 44% of screen width
    margin: wp(2), // 2% of screen width
    backgroundColor: '#fff',
    borderRadius: wp(2), // 2% of screen width
    overflow: 'hidden',
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: hp(15), // 15% of screen height
  },
  details: {
    padding: wp(3), // 3% of screen width
  },
  title: {
    fontSize: wp(4.2), // 4.2% of screen width
    fontWeight: 'bold',
    marginBottom: hp(1), // 1% of screen height
  },
  genre: {
    color: 'gray',
    marginBottom: hp(1), // 1% of screen height
  },
  price: {
    fontSize: wp(3.8), // 3.8% of screen width
    fontWeight: 'bold',
  },
  favoriteIcon: {
    fontSize: wp(6), // 6% of screen width
    alignSelf: 'flex-end',
    marginTop: hp(1), // 1% of screen height
  },
});
