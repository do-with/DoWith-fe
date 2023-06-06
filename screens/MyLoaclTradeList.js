import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable, Image } from 'react-native';
import { ScreenHeader } from '../components/ScreenHeader';
import axios from 'axios';
import { ipAddress } from '../ipAddress';
import { AuthContext } from '../contexts/AuthContext';
import Moment from 'moment';

export default function MyLocalTradeList({navigation}){
    const { user } = useContext(AuthContext);
    const [myLocalTradeList, setMyLocalTradeList] = useState("");
    
    useEffect(() => {
        axios
          .get(`http://${ipAddress}:8080/local-trade/user/${user.id}`)
          .then((response) => {
            setMyLocalTradeList(response.data);
            console.log(myLocalTradeList);
          })
          .catch((error) => console.log(error));
    }, []);

    const createColumns = (data, columnsCount) => {
        const columns = [];
        const rowCount = Math.ceil(data.length / columnsCount);
    
        for (let i = 0; i < rowCount; i++) {
          const startIndex = i * columnsCount;
          const endIndex = startIndex + columnsCount;
    
          columns.push(data.slice(startIndex, endIndex));
        }
    
        return columns;
    };
    
    const renderTradeColumns = () => {
        const columns = createColumns(myLocalTradeList, 2);
    
        return columns.map((column, columnIndex) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: "10%",
            }}
            key={columnIndex}
          >
            {column.map((localTrade, index) => (
              <Pressable
                style={styles.tradeBoard}
                key={index}
                onPress={() =>
                  navigation.navigate("DetailLocalTrade", { localTrade })
                }
              >
                <View style={{ width: "100%", height: "100%" }}>
                  <Image
                    source={{
                      uri: localTrade.image1,
                    }}
                    resizeMode="contain"
                    style={{
                      aspectRatio: 1,
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                    }}
                  />
    
                  <View style={{ paddingTop: "3%" }}>
                    <Text style={styles.nameText}>{localTrade.name}</Text>
                    <Text style={styles.dateText}>
                      {Moment(localTrade.created_at).format("MM.DD")}
                    </Text>
                    {localTrade.sold_yn ? (
                      <Text style={styles.priceText}>판매완료</Text>
                    ) : (
                      <Text style={styles.priceText}>{localTrade.price}원</Text>
                    )}
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        ));
    };
    

    return(
        <View style={styles.aboutBody}>
            <ScreenHeader headerTitle="물품 내역"/>
            <View style={styles.aboutContent}>
                <View style={{height: '6%', marginLeft: '5%', justifyContent: 'center'}}>
                    <Text style={styles.titleText}>지역거래 물품 내역</Text>
                </View>
                <View>
                {myLocalTradeList.length !== 0 ? (
                    <View style={{ position: "relative" }}>
                        <ScrollView
                            contentContainerStyle={{
                                paddingTop: "3%",
                                paddingBottom: "75%",
                                alignItems: "center",
                            }}
                        >
                        <View
                            style={{
                            flexDirection: "column",
                            width: "90%",
                            justifyContent: "center",
                            }}
                        >
                            {renderTradeColumns()}
                        </View>
                        </ScrollView>
                    </View>
                ) : (
                    <View style={styles.noContent}>
                        <Text style={styles.noContentText}>
                            작성한 지역거래한 물품이 없습니다.
                        </Text>
                    </View>
                )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    aboutBody: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
    },
    aboutContent: {
        width: '100%',
        height: '100%',
        position: 'relative',
        top: '15%',
        display: 'flex',
        flexDirection: 'column',
    },
    titleText: {
        fontWeight: 500,
        fontSize: 18,
        lineHeight: 26,
        letterSpacing: 0.15,
        color: '#353535',
    },
    tradeBoard: {
        flexDirection: "row",
        alignItems: "center",
        height: "110%",
        width: "48%",
        marginBottom: "2%",
        borderRadius: 8,
        backgroundColor: "rgba(251, 251, 251, 0.35)",
        shadowColor: "#c9c9c9",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.26,
        shadowRadius: 4,
        borderRadius: 10,
    },
    nameText: {
        fontWeight: 600,
        fontSize: 13,
        lineHeight: 16,
        color: "rgba(0, 0, 0, 0.75)",
    },
    dateText: {
        fontWeight: 400,
        fontSize: 13,
        lineHeight: 16,
        color: "rgba(0, 0, 0, 0.55)",
    },
    priceText: {
        fontWeight: 600,
        fontSize: 16,
        lineHeight: 19,
        color: "rgba(0, 0, 0, 0.8)",
    },
    noContent: {
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noContentText: {
        fontWeight: 400,
        fontSize: 16,
        lineHeight: 19,
        color: "#aaa",
    },
});