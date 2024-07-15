import React, {useEffect, useState, useCallback} from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import {
  StatusBar,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
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

const LeftContent = () => <Avatar.Text label="IM" size={40}/>

const ListPhotos = ({navigation}) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [files, setFiles] = useState<FileInfo[]>([]);

  const onRefresh = useCallback(async () => {
    // setLoading(true)
    setRefreshing(true);
    setFiles(await listPhotos());
    // setLoading(false);
    setRefreshing(false);
  }, []);

  const grantPermission = async (url: any) => {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);

    console.log('granted', granted);
    downloadImage(url);

    return granted;
  };

  const downloadImage = async (url: any) => {  
    // Define the path where you want to save the file
    const { config, fs } = RNFetchBlob;
    const downloads = fs.dirs.DownloadDir;
    const path = `${downloads}/image_${Date.now()}.jpg`;

    // Start downloading the image
    config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: path,
          description: 'Downloading image',
        },
    })
    .fetch('GET', url)
    .then((res) => {
        console.log('The file is saved to:', res.path());
        Alert.alert(`Image downloaded successfully to: ${res.path()}`);
        navigation.navigate('dataCenter', { imagePath: res.path() });
    })
    .catch((error) => {
        console.error('Error downloading image:', error);
        Alert.alert(`Failed to download image due to: ${error}`);
    });
  };

  useEffect(() => {
    const init = async () => {
      const info = await getThetaInfo();
      navigation.setOptions({ title: `${info.model}:${info.serialNumber}` });
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
          <Button onPress={async () => {grantPermission(item.fileUrl);}}>Download</Button>
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
