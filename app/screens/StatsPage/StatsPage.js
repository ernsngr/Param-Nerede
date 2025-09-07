import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { styles } from '../../styles';
import { StatsTopBox } from '../../components/StatsTopBox/StatsTopBox';

export const StatsPage = () => {
    return(
        <View style={styles.stats_container}>
            <View style={styles.stats_header}>
                <Text style={{fontSize: 32, fontWeight: "500", letterSpacing: 1,}}>
                    İstatistikler
                </Text>
                <Text style={{fontSize: 18, letterSpacing: 1, }}>
                    Harcama raporunuz
                </Text>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                scrollEnabled
                style={{width: "100%", height: "100%"}}
                contentContainerStyle={{
                    width: "100%",
                    height: "auto",
                    alignItems: 'center',
                }}>
                
                    <View style={styles.stats_top_box_container}>
                        <StatsTopBox/>
                    </View>
            
                    {/* İnfo Boxs */}
                    <View style={styles.spending_by_category}>
                        <View style={styles.info_box_header}>
                            <Text style={{fontSize: 16, letterSpacing: 0.5}}>
                                Kategorilere göre harcamaların
                            </Text>
                        </View>
                    </View>
                    <View style={styles.spending_by_category}>
                        <View style={styles.info_box_header}>
                            <Text style={{fontSize: 16, letterSpacing: 0.5}}>
                                Kategorilere göre harcamaların
                            </Text>
                        </View>
                    </View>
                    <View style={styles.spending_by_category}>
                        <View style={styles.info_box_header}>
                            <Text style={{fontSize: 16, letterSpacing: 0.5}}>
                                Kategorilere göre harcamaların
                            </Text>
                        </View>
                    </View>
                
            </ScrollView>
        </View>
    )
}