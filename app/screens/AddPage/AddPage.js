import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { Dropdown } from "react-native-element-dropdown";
import { styles } from '../../styles';
// Icons
import MaterialIcons from '@expo/vector-icons/MaterialIcons';



const categoryData = [
  { label: "Teknoloji", value: "tech" },
  { label: "Spor", value: "sport" },
  { label: "Müzik", value: "music" },
  { label: "Sağlık", value: "health" },
];

export const AddPage = () => {

    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const [selectedCategory, setSelectedCategory] = useState("");


    return(
        <View>
           <View style={{width: "100%", height: "100%", alignItems: "center", justifyContent: "center"}}>
            <Text style={{position: "absolute", top: 65, left: 25, fontSize: 32, fontWeight: "500", letterSpacing: 1, marginBottom: 20}}>
                Harcama Ekle
            </Text>
            <View style={styles.add_page_box}>
                <View style={{width: 45, height: 45, backgroundColor: "purple", alignItems: "center", justifyContent: "center", borderRadius: 50}}  >
                    <MaterialIcons name="attach-money" size={24} color="white" />
                </View>
                <Text style={{width: "95%"}}>
                    Amount
                </Text>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-around"}}>
                    <TextInput
                        style={styles.number_input}
                        placeholder='$0.00'
                        editable
                        keyboardType="number-pad"
                    />
                </View>
            </View>
            <View style={styles.add_page_box}>
                <Text style={{width: "95%"}}>
                    Category
                </Text>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        data={categoryData}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Kategori Seçiniz"
                        value={selectedCategory}
                        onChange={(item) => setSelectedCategory(item.value)}
                    />
                </View>
            </View>
            <View style={styles.add_page_box}>
                <Text style={{width: "95%"}}>
                    Note (Optional)
                </Text>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                    <TextInput
                        style={[styles.number_input,{fontSize: 16}]}
                        placeholder='Add a description'
                        editable
                        keyboardType="default"
                    />
                </View>
            </View>
            <View style={styles.add_page_box}>
                <Text style={{width: "95%"}}>
                    Date
                </Text>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                    <TextInput
                        style={[styles.number_input,{fontSize: 16}]}
                        placeholder={day + "." + month + "." + year }
                        editable={false}
                        keyboardType="number-pad"
                    />
                </View>
            </View>
           </View>
        </View>
    )
}