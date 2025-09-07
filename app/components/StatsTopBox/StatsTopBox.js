import React from 'react';
import { 
    View,
    Text, 
} from 'react-native';
import { styles } from '../../styles';

export const StatsTopBox = () => {
    return(
        <View style={styles.stats_top_box}>
            <View style={styles.stats_top_box_lines}>
                <Text style={{fontSize: 16,}}>Bu ay toplam</Text>
            </View>
            <View style={styles.stats_top_box_lines}>
                <Text style={{fontSize: 30, fontWeight: "bold", letterSpacing: 0.5}}>$2350.75</Text>
            </View>
            <View style={styles.stats_top_box_lines}>
                <Text style={{fontSize: 13}}>Haftalık ortalama $133.43</Text>
            </View>
        </View>
    )
}