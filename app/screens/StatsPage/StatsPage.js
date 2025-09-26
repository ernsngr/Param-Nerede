import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, Text, View, Dimensions } from 'react-native';
import { styles } from '../../styles';
import { StatsTopBox } from '../../components/StatsTopBox/StatsTopBox';
import { ProgressChart } from 'react-native-chart-kit';
import { getCategoryTotals } from '../../db/db';
import PagerView from 'react-native-pager-view';

const screenWidth = Dimensions.get("window").width;

export const StatsPage = () => {
  const [data, setData] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const categories = await getCategoryTotals();
        const toplam = categories.reduce((sum, c) => sum + c.total, 0);

        // Grafiğe uygun format
        setData({
          labels: categories.map(c => c.name),
          data: categories.map(c => toplam ? c.total / toplam : 0),
        });
      };

      
      fetchData();
    }, []) // burada dependency array boş olmalı, yoksa sonsuz döngü olur
  );

  const chartConfig = {
    backgroundGradientFrom: "#ebebebff",  // beyaz arka plan
    backgroundGradientTo: "#ebebebff",    // beyaz arka plan
    backgroundGradientFromOpacity: 1,
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(250, 129, 47, ${opacity})`, // çizgi rengi
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false
    
};


  return (
    <View style={styles.stats_container}>
      <View style={styles.stats_header}>
        <Text style={{fontSize: 32, fontWeight: "500", letterSpacing: 1}}>
          İstatistikler
        </Text>
        <Text style={{fontSize: 18, letterSpacing: 1}}>
          Harcama raporunuz
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{width: "100%", height: "100%"}}
        contentContainerStyle={{
          width: "100%",
          height: "auto",
          alignItems: 'center',
          paddingBottom : 100
        }}
      >
        <PagerView style={{width: "100%", height: 125, alignItems: "center", justifyContent: "center"}} initialPage={3}>
          <StatsTopBox/>
          <StatsTopBox/>
          <StatsTopBox/>
        </PagerView>

        {/* İnfo Boxs */}
        <View style={styles.spending_by_category}>
          <View style={styles.info_box_header}>
            <Text style={{fontSize: 16, letterSpacing: 0.5, color: "#404040"}}>
              Kategorilere göre harcamaların
            </Text>

            {data && (
              <View style={{ 
                width: "100%",
                height: "100%",
                justifyContent: "center", 
                alignItems: "center",
                marginTop: 0,
                }}>
                    <ProgressChart
                        data={data}
                        width={screenWidth - 40}
                        height={230}
                        strokeWidth={10}
                        radius={30}
                        chartConfig={chartConfig}
                        hideLegend={false}
                        style={{borderRadius: 18}}
                    />
                </View>
            )}
          </View>
        </View>
        
      </ScrollView>
    </View>
  );
};
