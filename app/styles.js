import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    home_container:{
        width: "100%",
        height: "100%",
        alignItems: "center",
        paddingTop: 65
    },
    home_top_header:{
        width: "100%",
        height: "auto",
        marginLeft: 50
    },
    home_top_h1:{fontSize: 28, fontWeight: "600", letterSpacing: 1, color: "#151515"},
    home_top_h2:{},
    home_top_h3:{fontSize: 14, letterSpacing: 0.4, color: "#616161"},
    
    top_box_container:{
        width: "100%",
        height: "auto",
        alignContent: "center",
        justifyContent: "space-around",
        flexDirection: "row",
        marginTop: 20
    },
    home_top_box:{
        width: "45%",
        height: 90,
        backgroundColor: "aqua",
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "space-around",
        padding: 10,
        flexDirection: "row"
    },
    home_top_box_text:{
        fontSize: 14,
        fontWeight: "600",
        color: "#f5f5f5"
    },
    home_top_box_total:{
        fontSize: 22,
        fontWeight: "bold",
        color: "#f5f5f5"
    },
    home_expenses_view:{
        width: "100%",
        height: "100%",
        alignItems: "center",
    },
    home_expenses_box_container:{
        width:"100%",
        height: 60,
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        borderRadius: 18,
        marginTop: 10,
        marginBottom: 10,
        
    },
    home_expenses_box_icon:{
        width: 40,
        height: 40,
        backgroundColor: "orange",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50
    },
    home_expenses_box_content:{
        width: "75%",
        height: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    home_expenses_box_text_container:{
        width: "50%",
        height:"50%",
    },
    home_expences_header:{
        width: "100%",
        height: 30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 20,
        paddingLeft: 20,
        paddingRight: 20
    },
    number_input:{
        width: "45%",
        height: 50,
        fontSize: 26,
    },
    add_page_box:{
        width: "90%",
        height: "auto",
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        backgroundColor: "#ffffff",
        shadowColor: "#000000",
        shadowOffset: {
        width: 0,
        height: 5,
        },
        shadowOpacity:  0.20,
        shadowRadius: 5.62,
        elevation: 7,
        borderRadius: 15,
        marginTop: 15,
        marginBottom: 15,
    },
    dropdown:{
        width: "90%",
        height: 45,
        borderRadius: 10,
        padding: 10,
        marginTop: 5,
        marginBottom: 5
    },
    stats_container:{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#ebebebff"
    },
    stats_header:{
        width: "100%",
        height: "15%",
        justifyContent: "center",
        alignItems: "flex-start",
        marginTop: 40,
        marginLeft: 20
    },
    stats_top_box:{
        width: "80%",
        height: "auto",
        backgroundColor: "red",
        padding: 25,
        borderRadius: 18,
        marginLeft: 40,
        marginRight: 40,
    },
    stats_top_box_lines:{
        width: "100%",
        height: "auto",
        alignItems: "center",
        justifyContent: "center",
    },
    spending_by_category:{
        width: "95%",
        height: 300,
        padding: 20,
        borderRadius: 18,
        marginTop: 35,
        marginBottom: 35,
        alignItems: "center",
        justifyContent: "center",
        shadowColor:"#2e2e2e",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 0,
    },
    info_box_header:{
        width: "100%",
        height: "100%",
    },
    add_page_button:{
        width: "50%",
        height: 45,
        alignItems: "center",
        justifyContent:"center",
        backgroundColor: "blue",
        borderRadius: 18,
        marginTop: 15
    }
})