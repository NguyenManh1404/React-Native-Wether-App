import React, { useEffect, useState } from 'react';
import { View,Text,FlatList } from 'react-native'
import styles from './style';
import DropDownPicker from 'react-native-dropdown-picker';
// import Icon from 'react-native-vector-icons/Ionicons';
import CITY_LIST from '../../data/city.json'
import { COLORS, SIZES } from '../../constants/theme';
import { baseUrl, apiKey } from '../../constants/api';
import Pannel from '../../components/pannel';
const HomeScreen = () => {
    const [open,setOpen]=useState(false)
    const [value,setValue]=useState(null)
    const [items,setItems]=useState(CITY_LIST)

    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
  
    const [data, setData] = useState();
    const [error, setError] = useState();
  
    useEffect(() => {
      setData();
    //   console.log('va',value); lấy ra được giá trịn khi mình select
      const cityData = items.filter((val) => val.city === value);//
    //   console.log('cityData',cityData);
      if (cityData.length > 0) {
        setLat(cityData[0].lat);
        setLng(cityData[0].lng);
      }
    }, [items, value]);
  
    useEffect(() => {
      const apiCalling = async () => {
        try {
          const response = await fetch(
            `${baseUrl}/forecast?lat=${lat}&lon=${lng}&appid=${apiKey}`,
          );
          const json = await response.json();

            // console.log(json.list);
          setData(json.list);
          setError(null);
        } catch (err) {
          setError(err);
        }
      };

      if (lat && lng) {
        apiCalling(lat, lng);
      }
    }, [lat, lng]); 

    // useEffect(() => {
    //     console.log(data);
    // }, [data]); 
    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.appName}>Ứng Dụng Dự Báo Thời Tiết</Text>

                <View style={{ zIndex: 0 }}>
                    <DropDownPicker
                        open={open}
                        searchable
                        searchPlaceholder='Tìm kiếm thành phố ?'
                        searchTextInputStyle={{

                        }}

                        searchContainerStyle={{
                        paddingVertical: 15,
                        // borderBottomColor: COLORS.accent,
                        }}
                        placeholder="Select a city"
                        placeholderStyle={{
                        color: COLORS.darkGrey,
                        }}
                        containerStyle={{
                        margin: 15,
                        width: SIZES.width - 30,
                        
                        zIndex:0

                        }}
                        labelStyle={{
                        color: COLORS.primary,
                        fontWeight: 'bold',
                        fontSize: SIZES.h3,
                            
                        }}
                        listItemLabelStyle={{
                        color: COLORS.primary,
                        fontWeight: '700',
                        
                        }}
                        showTickIcon={false}
                        dropDownContainerStyle={{
                        borderColor: COLORS.primary,
                        
                       
                        }}
                        // ArrowUpIconComponent={() => <Icon name="caret-up-outline" size={50} color={COLORS.accent} />}
                        // ArrowDownIconComponent={() => <Icon name="caret-up-outline" size={50} color={COLORS.accent} />}

                        value={value}
                        items={items.map(({city})=>({
                            label:city,
                            value:city,
                        }))}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        
                    />
                </View>   
            </View>
            {open ?

            
                data ? (

                  <FlatList
                    data={data}
                    
                    style={{ marginTop:200}} 
                    renderItem={({ item }) => (
                      <View  >
                        <Pannel data={item} />
                      </View>
                    )}
                  />
                ) : (
                  <View style={styles.noData}>
                    <Text style={styles.noDataTxt}>
                      {!value ? ' - No Data - ' : 'Data loading...'}
                    </Text>
                  </View>
                )
             : 
             data ? (

                <FlatList
                data={data}
                renderItem={({ item }) => (
                    <View  >
                    <Pannel data={item} />
                    </View>
                )}
                />
                ) : (
                <View style={styles.noData}>
                <Text style={styles.noDataTxt}>
                    {!value ? ' - No Data - ' : 'Data loading...'}
                </Text>
                </View>
                )     
        }



        </View>
        );
      };

export default HomeScreen;      