import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, Text, View, Dimensions } from 'react-native';
import { styles } from '../../styles';
import { StatsTopBox } from '../../components/StatsTopBox/StatsTopBox';
import { ProgressChart } from 'react-native-chart-kit';
import { getCategoryTotals, get30DayTopCategory } from '../../db/db';
import PagerView from 'react-native-pager-view';
import { LinearGradient } from 'expo-linear-gradient';

const screenWidth = Dimensions.get("window").width;

export const StatsPage = () => {
  const [data, setData] = useState(null);
  const [topCat, setTopCat] = useState({name: "Yükleniyor", total: 0});

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

        const topCat = await get30DayTopCategory();
        setTopCat(topCat);
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
        <PagerView style={{width: screenWidth, height: 125, alignItems: "center", justifyContent: "center"}} initialPage={0}>
          <StatsTopBox 
            title="Aylık Toplam" 
            index={0}
            color1="#655CFF"
            color2="#952CFB"
            />
          <StatsTopBox 
            title="Haftalık Ortalama" 
            index={1}
            color1="#637AB9"
            color2="#31326F"
            />
          <StatsTopBox 
            title="Günlük Ortalama" 
            index={2}
            color1="#660B05"
            color2="#3E0703"
          />
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
          <LinearGradient
                colors={["#A86523", "#E9A319"]} 
                start={{ x: 0, y: 0 }}          
                end={{ x: 1, y: 1 }}            
                style={styles.stats_top_box}    
              >
                <View style={styles.stats_top_box_lines}>
                  <Text style={{ fontSize: 22, color: "#fff", fontWeight: "600", letterSpacing: 1 }}>{topCat.name}</Text>
                </View>
                <View style={styles.stats_top_box_lines}>
                  <Text style={{ fontSize: 30, fontWeight: "bold", letterSpacing: 0.5, color: "#fff" }}>
                    ₺{topCat.total}
                  </Text>
                </View>
                <View style={styles.stats_top_box_lines}>
                  <Text style={{ fontSize: 13, color: "#fff", fontWeight: "500"  }}>En çok harcama yaptığın kategori</Text>
                </View>
          </LinearGradient>
        
      </ScrollView>
    </View>
  );
};
