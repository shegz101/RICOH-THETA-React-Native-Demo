import React, {useEffect, useState, useCallback} from 'react';
import {
  StatusBar,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './Styles';
import {
  listFiles,
  getThetaInfo,
  FileTypeEnum,
  FileInfo,
} from 'theta-client-react-native';
// import card modules from React-Native-Paper
import { Avatar, Button, Card, Text as Tex } from 'react-native-paper';
import SkeletonCardLoader from './SkeletonCardLoader';

const listPhotos = async () => {
  const {fileList} = await listFiles(FileTypeEnum.IMAGE, 0, 1000);
  return fileList;
};

const LeftContent = props => <Avatar.Icon {...props} icon="camera" size={40}/>

const ListPhotos = ({navigation}) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  // const [loading, setLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<FileInfo[]>([]);

  const onRefresh = useCallback(async () => {
    // setLoading(true)
    setRefreshing(true);
    setFiles(await listPhotos());
    // setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    const init = async () => {
      const info = await getThetaInfo();
      navigation.setOptions({title: `${info.model}:${info.serialNumber}`});
      await onRefresh();
    };
    init();
  }, [onRefresh, navigation]);

  const onSelect = (item: FileInfo) => {
    navigation.navigate('sphere', {item: item});
  };

  const items = files.map(item => (
    <TouchableOpacity
      style={styles.cardWrapper}
      key={item.name}
    >
      <Card style={{ padding: 10}}>
        <Card.Title title="Testing" subtitle={item.dateTimeZone} left={LeftContent} />
        <Card.Content>
          <Tex variant="titleLarge">{item.name}</Tex>
          <Tex variant="bodyMedium">{item?.imageDescription || 'Simple Image'}</Tex>
        </Card.Content>
        <Card.Cover source={{ uri: item.thumbnailUrl }} />
        <Card.Actions>
          <Button onPress={() => onSelect(item)}>View</Button>
        </Card.Actions>
      </Card>
    </TouchableOpacity>
));


  return (
    <SafeAreaView style={styles.listContainer} edges={['left', 'right', 'bottom']}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        } contentContainerStyle={styles.scrollViewContent}>
        
        {
          refreshing ? (<SkeletonCardLoader/>) : (items)
        }
      </ScrollView>
    </SafeAreaView>
  );
};

export default ListPhotos;
