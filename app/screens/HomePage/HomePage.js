import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../../styles';
import { HomeTopBox } from '../../components/HomeTopBox';
import { HomeExpensesBox } from '../../components/HomeExpensesBox';

// Icons
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
export const HomePage = () => {
    return(
        <View style={styles.home_container}>
            <View style={styles.home_top_header}>
                <Text style={[styles.home_top_h1]}>Gider Takibi</Text>
                <Text style={[styles.home_top_h3,{marginTop: 6, marginLeft: 3}]}>Günlük harcamalarınızı takip edin</Text>
            </View>
            <View style={styles.top_box_container}>
                <HomeTopBox
                    title="Today's Total"
                    backgroundColor="#00CAFF"
                    totals="$154.29"
                    icon={<Feather name="coffee" size={24} color="black" />}
                />
                <HomeTopBox
                    title="This Month"
                    backgroundColor="#C68EFD"
                    totals="$2350.75"
                    icon={<AntDesign name="hearto" size={22} color="black" />}
                />
            </View>
            <View style={styles.home_expences_header}>
                <Text style={{fontSize: 16, fontWeight: "600"}}> Bugün Harcadıkların </Text>
                <Text style={{fontSize: 12, color: "#616161"}}> 4 harcama </Text>
            </View>
            <View style={styles.home_expenses_view} >
                <HomeExpensesBox
                    icon={<Feather name="coffee" size={24} color="black" />}
                    title="Coffe & pastry"
                    category="Food"
                    time="8.47 AM"
                    price="-$12.45"
                    backgroundColor="orange"
                />
                <HomeExpensesBox
                    icon={<FontAwesome5 name="car-alt" size={24} color="black" />}
                    title="Uber ride"
                    category="Transport"
                    time="11.17 AM"
                    price="-$47.00"
                    backgroundColor="#3396D3"
                />
                <HomeExpensesBox
                    icon={<Ionicons name="game-controller-outline" size={24} color="black" />}
                    title="Movie tickets"
                    category="Entertainment"
                    time="7.30 PM"
                    price="-$28.99"
                    backgroundColor="#934790"
                />
            </View>
        </View>
    )
}