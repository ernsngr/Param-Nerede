import { Text, View } from 'react-native';
import { styles } from '../../styles';
import { LinearGradient } from 'expo-linear-gradient';

export const HomeTopBox = ({color1, color2, icon, totals, title}) => {
    return(
        <LinearGradient
            colors={[color1, color2]} // gradient renkleri
            start={{ x: 0, y: 0 }}          // başlangıç noktası
            end={{ x: 1, y: 1 }}            // bitiş noktası
            style={styles.home_top_box}    // mevcut stilin
        >
            <View style={[styles.home_top_box,{ width: "100%", padding: 0, backgroundColor: "transparent"}]}>
                <View>
                    <Text style={styles.home_top_box_text}>{title}</Text>
                    <Text style={styles.home_top_box_total}>{totals}</Text>
                </View>
                <View style={{width: 40, height:40, borderRadius:50 ,backgroundColor: "#fff", opacity: 0.45, alignItems: "center", justifyContent: "center"}}>
                    {icon}
                </View>
            </View>
        </LinearGradient>
    )
}