import { Text, View } from 'react-native';
import { styles } from '../../styles';

export const HomeTopBox = ({backgroundColor, icon, totals, title}) => {
    return(
        <View style={[styles.home_top_box,{backgroundColor: backgroundColor}]}>
            <View>
                <Text style={styles.home_top_box_text}>{title}</Text>
                <Text style={styles.home_top_box_total}>{totals}</Text>
            </View>
            <View style={{width: 40, height:40, borderRadius:50 ,backgroundColor: "#fff", opacity: 0.45, alignItems: "center", justifyContent: "center"}}>
                {icon}
            </View>
        </View>
    )
}