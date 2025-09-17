import { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Dropdown } from "react-native-element-dropdown";
import { styles } from '../../styles';

// Icons
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// db
import { initDB, getCategories, addTransaction } from "../../db/db"





export const AddPage = () => {

    

    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
        const setup = async () => {
            await initDB();
            const cats = await getCategories();
            // Dropdown için formatla
            setCategoryData(cats.map(c => ({ label: c.name, value: c.id })));
            if (cats.length > 0) setSelectedCategory(cats[0].id);
        }
        setup();
    },[]);


    const handleAdd = async () => {
        if(!amount || !selectedCategory) {
            alert("Lütfen kategori ve miktar ekleyiniz");
            return;
        }

        await addTransaction({
            amount: parseFloat(amount),
            categoryId: selectedCategory,
            note,
            date: new Date(),
        });

        alert("Harcama Eklendi")
        setAmount("");
        setNote("");
    }


    return(
        <View>
           <View style={{width: "100%", height: "100%", alignItems: "center", justifyContent: "center", paddingTop: 40}}>
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
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", paddingLeft: 50}}>
                    <Text style={{width: "5%", fontSize: 26, color: "#161616ff", marginRight: 5 }}>₺</Text>
                    <TextInput
                        style={styles.number_input}
                        placeholder='0.00'
                        editable
                        value={amount}
                        onChangeText={setAmount}
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
                        style={[styles.number_input,{fontSize: 16, width: "100%", textAlign: "center"}]}
                        placeholder='Add a description'
                        editable
                        value={note}
                        onChangeText={setNote}
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
                        style={[styles.number_input,{fontSize: 16, width: "100%", textAlign: "center"}]}
                        placeholder={day + "." + month + "." + year }
                        editable={false}
                        keyboardType="number-pad"
                    />
                </View>
            </View>
               <TouchableOpacity onPress={handleAdd} style={styles.add_page_button}>
                <Text style={{fontSize: 24, color: "#f5f5f5", fontWeight: "600", letterSpacing: 2 }}>
                    Ekle
                </Text>
               </TouchableOpacity>
            </View>
        </View>
    )
}