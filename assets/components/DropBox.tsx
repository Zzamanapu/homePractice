import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import data from './MOC_DATA.json'

function DropBox () {

    const [value, setValue] = useState('');

    const handleValue = (text: string) => {
        setValue(text);
        console.log("Input Value", text);
    };

    const onSearch = (searchTerm: string) => {
        setValue(searchTerm);
        console.log('Search Term: ', searchTerm);
    };
    let jsonValue = data['full-name'];

    console.log("jsonValue:", jsonValue);
    return(
        <View style={styles.app}>
         <Text style={styles.title}>Search</Text>

         <View style={styles.searchContainer}>
            <View style={styles.searchInner}>
                <TextInput style={styles.input} placeholder="Search..." value={value} onChangeText={handleValue}/>
            </View>
            <ScrollView style={styles.dropdown}>
                {
                    jsonValue
                    .filter(item => {
                        const searchItem = value.toLowerCase();
                        const fullName = item.full_name.toLowerCase();
                        console.log(searchItem);
                        console.log(fullName);
                        return searchItem && fullName.startsWith(searchItem) && fullName !== searchItem;
                    })
                    .slice(0,4)
                    .map(item => (
                        <TouchableOpacity key={item.full_name} onPress={()=> onSearch(item.full_name)}>
                            <Text style={styles.dropdownRow}>{item.full_name}</Text>
                        </TouchableOpacity>
                    )) 
                }
            </ScrollView>
         </View>
        </View>
    );
}

const styles = StyleSheet.create({
    app: {
        fontFamily: 'sans-serif',
        textAlign: 'center',
        alignItems: 'center',
        padding: 16
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16
    },
    searchContainer: {
        width: '100%'
    },
    searchInner: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10
    },
    dropdown: {
        backgroundColor: '#f1f1f1', 
        borderRadius: 5,
        maxHeight: 200,
        marginTop: 8
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 8,
        borderRadius: 5
    },
    dropdownRow: {
        padding: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
});


export default DropBox