import React, { useState } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

const List = ({
  onItemPress,
  data,
  renderItem,
  handleRefresh,
  handleLoadMore,
}) => {
  const [state, setState] = useState({ loading: false, refreshing: false });
  return (
    <FlatList
      style={{ backgroundColor: 'white' }}
      contentContainerStyle={{ margin: 15 }}
      showsVerticalScrollIndicator={false}
      data={data}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          style={{ width: '100%' }}
          onPress={() => onItemPress(item)}
          activeOpacity={0.9}>
          {renderItem({ item, index })}
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => String(index)}
      ItemSeparatorComponent={() => (
        <View style={{ width: '100%', height: 10 }} />
      )}
      ListFooterComponent={() =>
        state.loading ? (
          <ActivityIndicator
            animating
            size="large"
            style={{ marginTop: 10, marginVertical: 20 }}
          />
        ) : (
          <View style={{ height: 30 }} />
        )
      }
      onRefresh={() => {
        setState({ ...state, refreshing: true });
        handleRefresh();
      }}
      refreshing={state.refreshing}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={50}
    />
  );
};

List.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  renderItem: PropTypes.PropTypes.func.isRequired,
  onItemPress: PropTypes.func,
  handleLoadMore: PropTypes.func,
  handleRefresh: PropTypes.func,
};

List.defaultProps = {
  handleLoadMore: () => {},
  handleRefresh: () => {},
  onItemPress: () => {},
};

export default List;
