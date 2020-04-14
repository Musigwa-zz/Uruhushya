import React from 'react';
import Select from 'react-native-select-two';
import PropTypes from 'prop-types';

const SelectInput = ({
  data = [],
  theme,
  onSelect,
  title,
  popupTitle,
  isSelectSingle,
  cancelButtonText,
  selectButtonText,
  listEmptyTitle,
  searchPlaceHolderText,
  style,
}) => {
  const { colors } = theme;
  return (
    <Select
      title={title}
      popupTitle={popupTitle}
      isSelectSingle={isSelectSingle}
      cancelButtonText={cancelButtonText}
      selectButtonText={selectButtonText}
      listEmptyTitle={listEmptyTitle}
      searchPlaceHolderText={searchPlaceHolderText}
      style={{ borderRadius: 5, ...style }}
      colorTheme={colors.primary}
      data={data}
      onSelect={([id]) => onSelect(id)}
    />
  );
};

SelectInput.propTypes = {
  title: PropTypes.string.isRequired,
  popupTitle: PropTypes.string.isRequired,
  isSelectSingle: PropTypes.bool,
  cancelButtonText: PropTypes.string,
  selectButtonText: PropTypes.string,
  listEmptyTitle: PropTypes.string,
  searchPlaceHolderText: PropTypes.string,
  theme: PropTypes.objectOf(PropTypes.any).isRequired,
  onSelect: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  style: PropTypes.objectOf(PropTypes.any),
};
SelectInput.defaultProps = {
  isSelectSingle: true,
  cancelButtonText: 'Bireke',
  selectButtonText: 'Emeza',
  listEmptyTitle: 'Nta byabonetse',
  searchPlaceHolderText: `Andika hano ushakisha `.padEnd(6, '.'),
  style: {},
};

export default SelectInput;
