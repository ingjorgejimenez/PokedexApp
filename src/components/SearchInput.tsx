import React, {useEffect, useState} from 'react';
import {StyleProp, StyleSheet, TextInput, View, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import {useDebouncedValue} from '../hooks/useDebouncedValue';

interface Props {
  style: StyleProp<ViewStyle>;
  onDebounce: (value: string) => void;
}
export const SearchInput = ({style, onDebounce}: Props) => {
  const [search, setSearch] = useState('');
  const debouncedValue = useDebouncedValue(search);
  useEffect(() => {
    onDebounce(debouncedValue);
  }, [debouncedValue]);

  return (
    <View style={[style, styles.sectionServicesHeader]}>
      <View style={styles.search}>
        <Icon name="search" size={22} color="#666666" />
        <TextInput
          style={styles.input}
          placeholder="Escriba su búsqueda aquí"
          autoCorrect={false}
          autoCapitalize="none"
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <Icon name="filter" size={15} color="#333333" />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionServices: {
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  sectionServicesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  sectionServicesContainer: {
    flex: 1,
    paddingBottom: 10,
    gap: 10,
    marginBottom: 100,
  },
  search: {
    marginLeft: 12,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#F3F3F3',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  input: {
    height: 40,
    paddingLeft: 8,
    paddingRight: 8,
    width: '100%',
    textAlign: 'center',
    paddingEnd: 25,
  },
});
