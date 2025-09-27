import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { 
    View,
    Text, 
} from 'react-native';
import { styles } from '../../styles';
import { LinearGradient } from "expo-linear-gradient";
import { getMonthlyTotal } from '../../db/db';

export const StatsTopBox = ({title, index, color1, color2 }) => {

  const [totalMonth, setTotalMonth] = useState("0");

  const indexChoose = (i) => {
    if(i === 0){
      return totalMonth;
    } else if (i === 1) {
      return parseInt(totalMonth / 4);
    } else if (i === 2) {
      const avarageDaily = totalMonth / 30;
      return parseInt(avarageDaily);
    }
  }


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
      colors={[color1, color2]} 
      start={{ x: 0, y: 0 }}          
      end={{ x: 1, y: 1 }}            
      style={styles.stats_top_box}    
    >
      <View style={styles.stats_top_box_lines}>
        <Text style={{ fontSize: 16, color: "#fff"  }}>{title}</Text>
      </View>
      <View style={styles.stats_top_box_lines}>
        <Text style={{ fontSize: 30, fontWeight: "bold", letterSpacing: 0.5, color: "#fff" }}>
          ₺{indexChoose(index)}
        </Text>
      </View>
      <View style={styles.stats_top_box_lines}>
        <Text style={{ fontSize: 13, color: "#fff", fontWeight: "500"  }}>Son 30 günü kapsar</Text>
      </View>
    </LinearGradient>
    )
}