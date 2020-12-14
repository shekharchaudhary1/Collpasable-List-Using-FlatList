import React, { Component } from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet, LayoutAnimation, Platform, UIManager } from "react-native";
import { Colors } from './Colors';
import Icon from "react-native-vector-icons/MaterialIcons";

export default class Accordian extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            expanded: false,
        }

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    render() {

        debugger
        return (
            <View style={{margin:10}}>
                
                <TouchableOpacity style={styles.row} onPress={() => this.toggleExpand()}>
                <Icon name={'fastfood' } size={30} color={Colors.DARKGRAY} />
                    <Text style={[styles.title]}>{this.props.title} {this.props.subTitle}</Text>
                    <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={Colors.DARKGRAY} />
                    
                </TouchableOpacity>

                <View style={styles.parentHr} />
                {
                    this.state.expanded &&
                    <View style={{}}>
                        <FlatList
                            data={this.state.data}
                            numColumns={1}
                            scrollEnabled={false}
                            renderItem={({ item, index }) =>
                                <View>
                               

                                    {item.items.map((v, i) => (

                                        <View>

                                             <TouchableOpacity style={[styles.childRow, styles.button, item.value ? styles.btnActive : styles.btnInActive]}
                                            //onPress={()=>this.onClick(index)}
                                            >

                                                <Text style={[styles.font, styles.itemInActive]} >{v}</Text>
                                                
                                            </TouchableOpacity>
                                            <View style={styles.childHr} />

                                        </View>


                                    ))}
                                </View>



     


                            } />
                    </View>
                }

            </View>
        )
    }

    onClick = (index) => {
        const temp = this.state.data.slice()
        temp[index].value = !temp[index].value
        this.setState({ data: temp })
    }

    toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expanded: !this.state.expanded })
    }

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: '100%',
        height: 54,
        alignItems: 'center',
        paddingLeft: 35,
        paddingRight: 35,
        fontSize: 12,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.DARKGRAY,
    },
    itemActive: {
        fontSize: 12,
        color: Colors.GREEN,
    },
    itemInActive: {
        fontSize: 12,
        color: Colors.DARKGRAY,
    },
    btnActive: {
        borderColor: Colors.GREEN,
    },
    btnInActive: {
        borderColor: Colors.DARKGRAY,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 56,
        paddingLeft: 25,
        paddingRight: 18,
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
    },
    childRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.WHITE,
    },
    parentHr: {
        height: 1,
        color: Colors.CGRAY,
        width: '100%'
    },
    childHr: {
        height: 1,
        backgroundColor: Colors.CGRAY,
        width: '100%',
    },
    colorActive: {
        borderColor: Colors.GREEN,
    },
    colorInActive: {
        borderColor: Colors.WHITE,
    }

});
