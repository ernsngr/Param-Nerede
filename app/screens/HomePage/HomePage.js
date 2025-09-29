import React, { useCallback, useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { styles } from '../../styles';
import { HomeTopBox } from '../../components/HomeTopBox';
import { HomeExpensesBox } from '../../components/HomeExpensesBox';
import { SwipeListView } from 'react-native-swipe-list-view';

// Icons
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'; // icon için
import Ionicons from '@expo/vector-icons/Ionicons';

import { getTransactions, getMonthlyTotal , deleteTransaction, getDailyTotal} from '../../db/db';

export const HomePage = () => {
    
    const [expences, setExpences] = useState([]);
    const [totalMonth, setTotalMonth] = useState("0");
    const [totalDaily, setTotalDaily] = useState("0");

   useFocusEffect(
        useCallback(() => {

            const fetchTransactions = async () => {
            const data = await getTransactions();
            setExpences(data);
            };  

            const fetchTotalMonth = async () => {
                const monthData = await getMonthlyTotal();
                setTotalMonth(monthData);
            }

            const fetchTotalDaily = async () => {
                const dailyData = await getDailyTotal();
                setTotalDaily(dailyData);
            }
            fetchTransactions();
            fetchTotalMonth();
            fetchTotalDaily();
        }, [expences])
    );

    const handleDelete = async (id) => {
        const deleteItem = deleteTransaction(id);
        const newList = expences.filter(item => item.id !== id);
        setExpences(newList);
    }

    const selectIcon = (data) => {
        if(data.item.category_name == "Yemek"){
            return <Ionicons name="fast-food-outline" size={24} color="black" />
        }
        else if ( data.item.category_name == "Ulaşım") {
            return <Ionicons name="bus-outline" size={24} color="black" />
        }
        else if (data.item.category_name == "Market"){
            return <Ionicons name="bag-handle-outline" size={24} color="black" />
        }
        else if (data.item.category_name == "Eğlence"){
            return <Ionicons name="game-controller-outline" size={24} color="black" />
        }
        else if (data.item.category_name == "Faturalar"){
            return <Ionicons name="albums-outline" size={24} color="black" />
        }
        else if (data.item.category_name == "Sağlık"){
            return <Ionicons name="medical-outline" size={24} color="black" />
        }
        else {
            return <Ionicons name="bookmark-outline" size={24} color="black" />
        }
    }

    const selectBg = (data) => {
        if(data.item.category_name == "Yemek"){
            return "#FAB12F"
        }
        else if ( data.item.category_name == "Ulaşım") {
            return "#0BA6DF"
        }
        else if (data.item.category_name == "Market"){
            return "#67C090"
        }
        else if (data.item.category_name == "Eğlence"){
            return "#FF0066"
        }
        else if (data.item.category_name == "Faturalar"){
            return "#CADCAE"
        }
        else if (data.item.category_name == "Sağlık"){
            return "#7ADAA5"
        }
        else {
            return "#FFD700"
        }
    }


    
    return(
        <View style={styles.home_container}>
            <View style={styles.home_top_header}>
                <Text style={[styles.home_top_h1]}>Gider Takibi</Text>
                <Text style={[styles.home_top_h3,{marginTop: 6, marginLeft: 3}]}>Günlük harcamalarınızı takip edin</Text>
            </View>
            <View style={styles.top_box_container}>
                <HomeTopBox
                    title="Bugün Toplam"
                    color1="#287BFF"
                    color2="#1861FD"
                    totals={`₺ ${totalDaily}`}
                    icon={<Feather name="coffee" size={24} color="black" />}
                />
                <HomeTopBox
                    title="Bu Ay Toplam"
                    color1="#655CFF"
                    color2="#952CFB"
                    totals={`₺ ${totalMonth}`}
                    icon={<AntDesign name="hearto" size={22} color="black" />}
                />
            </View>
            <View style={styles.home_expences_header}>
                <Text style={{fontSize: 16, fontWeight: "600"}}> Bugün Harcadıkların </Text>
                <Text style={{fontSize: 12, color: "#616161"}}> {expences.length} Harcama </Text>
            </View>
            <View style={styles.home_expenses_view} >
               <SwipeListView
                showsVerticalScrollIndicator={false}
                style={{marginBottom: 220}}
                data={expences}
                keyExtractor={(item) => item.id.toString()}
                renderItem={(data) => (
                    <HomeExpensesBox
                        icon={selectIcon(data)}
                        title={data.item.category_name || "Harcama"}
                        price={`- ${data.item.amount} ₺`}
                        category={data.item.note || "Kategori yok"}
                        time={new Date(data.item.date).toLocaleDateString()}
                        backgroundColor={selectBg(data)}
                    />
                )}
                
                renderHiddenItem={(data) => (
                    <View style={{ height: "100%",  flexDirection: 'row', justifyContent: 'flex-end', alignItems: "center",}}>
                    <TouchableOpacity 
                        onPress={() => handleEdit(data.item)} 
                        style={{ 
                            backgroundColor: '#c8c8c8ff',  
                            width: 60,
                            height: 50, 
                            justifyContent: 'center', 
                            alignItems: 'center',
                            marginLeft: 5,
                            marginRight: 5,
                            borderRadius: 15

                        }}>
                        <EvilIcons name="pencil" size={30} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => handleDelete(data.item.id)} 
                        style={{ 
                            backgroundColor: '#c8c8c8ff', 
                            width: 60,
                            height: 50, 
                            justifyContent: 'center', 
                            alignItems: 'center',
                            marginLeft: 5,
                            marginRight: 5,
                            borderRadius: 15
                        }}>
                        <EvilIcons name="trash" size={30} color="black" />
                    </TouchableOpacity>
                    </View>
                )}
                rightOpenValue={-160} // sağa kaydırma mesafesi
                />
            </View>
        </View>
    )
}