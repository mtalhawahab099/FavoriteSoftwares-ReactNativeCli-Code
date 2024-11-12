import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../store/store';
import {
  fetchMovies,
  toggleViewMode,
  updateLastVisited,
  initializeState,
} from '../store/moviesSlice';
import {MovieListItem} from './MovieListItem';
import {MovieGridItem} from './MovieGridItem';
import {FavoritesList} from './FavoritesList';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'; // Import wp and hp

interface MovieListProps {
  navigation: any;
}

export function MovieList({navigation}: MovieListProps) {
  const dispatch = useDispatch<AppDispatch>();
  const {items, loading, error, viewMode, lastVisited} = useSelector(
    (state: RootState) => state.movies,
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await dispatch(fetchMovies('a'));
    setRefreshing(false);
  }, [refreshing]);

  useEffect(() => {
    dispatch(initializeState());
    dispatch(updateLastVisited());
    dispatch(fetchMovies('a'));
  }, [dispatch]);

  // Fetch movies whenever the search query changes
  useEffect(() => {
    if (searchQuery) {
      dispatch(fetchMovies(searchQuery));
    } else {
      dispatch(fetchMovies('a'));
    }
  }, [dispatch, searchQuery]);

  const renderMovieItem = ({item}: any) => {
    return viewMode === 'list' ? (
      <MovieListItem item={item} navigation={navigation} />
    ) : (
      <MovieGridItem item={item} navigation={navigation} />
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{flex: 1}}>
      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search softwares..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Favorites List */}
        <View style={{marginBottom: hp(2)}}>
          <FavoritesList navigation={navigation} />
        </View>

        {/* Toggle View Button */}
        <Button
          title={`Toggle ${viewMode === 'list' ? 'Grid' : 'List'} View`}
          onPress={() => dispatch(toggleViewMode())}
        />

        {/* Last Visited Info */}
        <Text style={styles.lastVisited}>
          Last visited: {new Date(lastVisited).toLocaleDateString()}
        </Text>

        {/* Conditional Rendering for Loading, Error, and Movie List */}
        {loading ? (
          <ActivityIndicator size="large" color="#007bff" />
        ) : error ? (
          <Text style={styles.error}>{error}</Text>
        ) : items.length === 0 ? (
          <Text style={styles.noMovies}>No movies found</Text>
        ) : (
          <FlatList
            data={items}
            key={viewMode}
            keyExtractor={item => item.trackId.toString()}
            renderItem={renderMovieItem}
            numColumns={viewMode === 'grid' ? 2 : 1}
            contentContainerStyle={styles.flatListContent}
            showsVerticalScrollIndicator={false}
            style={styles.flatlist}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: wp(3), // 3% of screen width for padding
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(4), // 4% of screen height for margin bottom
  },
  searchBar: {
    flex: 1,
    height: hp(5.3), // 5% of screen height for input height
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: wp(2), // 2% of screen width for border radius
    paddingHorizontal: wp(3), // 3% of screen width for padding
  },
  searchButton: {
    backgroundColor: '#007bff',
    paddingVertical: hp(1), // 1% of screen height for vertical padding
    paddingHorizontal: wp(4), // 4% of screen width for horizontal padding
    marginLeft: wp(2), // 2% of screen width for margin left
    borderRadius: wp(2), // 2% of screen width for border radius
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  lastVisited: {
    marginVertical: hp(2), // 2% of screen height for vertical margin
    color: '#666',
    fontSize: wp(4), // 4% of screen width for font size
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginVertical: hp(2), // 2% of screen height for margin
  },
  noMovies: {
    textAlign: 'center',
    marginVertical: hp(5), // 5% of screen height for margin
    fontSize: wp(4), // 4% of screen width for font size
  },
  flatListContent: {
    marginBottom: hp(19),
  },
  flatlist:{
    marginBottom: hp(2),
  }
});

export default MovieList;
