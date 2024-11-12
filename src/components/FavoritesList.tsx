import React from 'react';
import {View, FlatList, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {Movie} from '../types/movie';
import FastImage from 'react-native-fast-image'; // Import FastImage
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'; // Import wp and hp

interface FavoritesListProps {
  navigation: any;
}

export function FavoritesList({navigation}: FavoritesListProps) {
  const favoritesData = useSelector(
    (state: RootState) => state.movies.favoritesData,
  );

  if (favoritesData.length === 0) {
    return null;
  }

  // Render item for each movie
  const renderFavoriteItem = ({item}: {item: Movie}) => (
    <TouchableOpacity
      key={item.trackId}
      style={styles.favoriteItem}
      onPress={() => navigation.navigate('Software Details', {movie: item})}>
      <FastImage
        source={
          item.artworkUrl100
            ? {uri: item.artworkUrl100}
            : require('../assets/Placeholder.jpg')
        }
        style={styles.favoriteImage}
        resizeMode={FastImage.resizeMode.cover} // Optional resizeMode for image display
      />
      <Text style={styles.favoriteText} numberOfLines={1}>
        {item.trackName}
      </Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      horizontal
      data={favoritesData}
      renderItem={renderFavoriteItem}
      keyExtractor={item => item.trackId.toString()}
      showsHorizontalScrollIndicator={false}
      style={styles.flatList}
    />
  );
}

const styles = StyleSheet.create({
  flatList: {
    height: hp(15), // 15% of screen height for FlatList container
  },
  favoriteItem: {
    width: wp(18), // 18% of screen width for each item container
    marginHorizontal: wp(2), // 2% of screen width for horizontal margin
    alignItems: 'center',
  },
  favoriteImage: {
    width: wp(18), // 18% of screen width for image
    height: wp(18), // 18% of screen width for height (keep aspect ratio square)
    borderRadius: wp(9), // Half the width for rounded corners (circular shape)
  },
  favoriteText: {
    fontSize: wp(3.5), // 3.5% of screen width for font size
    marginTop: hp(1), // 1% of screen height for margin
    textAlign: 'center',
  },
});
