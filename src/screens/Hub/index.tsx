/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import apps from '../../data/apps';
import {styles} from './styles';
import {Colors} from 'utils/colors';
import {ScrollView} from 'react-native-gesture-handler';
import HubCatgories from '../../data/categories';

const HubScreen = () => {
  const {t} = useTranslation();
  const scrollRef: any = useRef();
  const [screen, setScreen] = useState(HubCatgories[0]);

  const bubble = (item, index) => {
    return (
      <TouchableOpacity
        key={item.title}
        onPress={() => {
          setScreen(item);
          scrollRef.current?.scrollTo({
            x: index * 70,
            animated: true,
          });
        }}
        style={{
          backgroundColor:
            screen.title === item.title ? Colors.foreground : Colors.darker,
          flex: 1,
          padding: 5,
          height: 25,
          paddingHorizontal: 15,
          borderRadius: 15,
          marginHorizontal: 3,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          minWidth: 70,
        }}>
        <Text
          style={{
            fontSize: 14,
            color:
              screen.title === item.title
                ? Colors.background
                : Colors.foreground,
          }}>
          {t(item.title)}
        </Text>
      </TouchableOpacity>
    );
  };

  const RenderScreen = React.memo(() => {
    return screen.component();
  });

  return (
    <View style={styles.container}>
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.title}>{t('hub.title')} </Text>
          <Text style={styles.subtitle}>
            {apps.length + ' ' + t('hub.modules')}
          </Text>
        </View>
      </View>
      <View>
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingRight: 20}}
          style={{paddingTop: 10, paddingHorizontal: 10, paddingBottom: 5}}>
          {HubCatgories.map((item, index) => bubble(item, index))}
        </ScrollView>
      </View>

      <RenderScreen />
    </View>
  );
};

export default HubScreen;
