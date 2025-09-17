import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { 
    View,
    Text, 
} from 'react-native';
import { styles } from '../../styles';
import { LinearGradient } from "expo-linear-gradient";
import { getMonthlyTotal } from '../../db/db';

export const StatsTopBox = () => {

  const [totalMonth, setTotalMonth] = useState("0");

  useFocusEffect(
          useCallback(() => {
 
              const fetchTotalMonth = async () => {
                  const monthData = await getMonthlyTotal();
                  setTotalMonth(monthData);
              }
              fetchTotalMonth();
          }, [])
      );

    return(
    <LinearGradient
      colors={["#655CFF", "#952CFB"]} 
      start={{ x: 0, y: 0 }}          
      end={{ x: 1, y: 1 }}            
      style={styles.stats_top_box}    
    >
      <View style={styles.stats_top_box_lines}>
        <Text style={{ fontSize: 16, color: "#fff"  }}>Bu ay toplam</Text>
      </View>
      <View style={styles.stats_top_box_lines}>
        <Text style={{ fontSize: 30, fontWeight: "bold", letterSpacing: 0.5, color: "#fff" }}>
          ₺{totalMonth}
        </Text>
      </View>
      <View style={styles.stats_top_box_lines}>
        <Text style={{ fontSize: 13, color: "#fff", fontWeight: "500"  }}>Haftalık ortalama {totalMonth / 4}</Text>
      </View>
    </LinearGradient>
    )
}