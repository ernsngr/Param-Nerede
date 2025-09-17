import React from 'react';
import {
    View,
    Text
} from "react-native";
import { styles } from '../../styles';

export const HomeExpensesBox = ({icon, title, price, category, time, backgroundColor}) => {
    return(
        
        <View style={styles.home_expenses_box_container}>
            <View style={[styles.home_expenses_box_icon,{backgroundColor: backgroundColor}]}>{icon}</View>
            <View style={styles.home_expenses_box_content}>
                <View style={styles.home_expenses_box_text_container}>
                    <Text style={{fontSize: 16, fontWeight: "600"}}>{title}</Text>
                    <Text style={{fontSize: 12, color: "#616161", marginTop: 5}}>{category} • {time} </Text>
                </View>
                <View>
                    <Text style={{fontSize: 18, fontWeight: "bold", color: "#CB0404"}}> {price} </Text>
                </View>
            </View>
        </View>
    )
}