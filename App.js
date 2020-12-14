import React, { Component } from 'react';
import { StyleSheet, View, Text, Modal, TouchableHighlight } from 'react-native';
import Accordian from './src/app/Accordian'
import { Colors } from './src/app/Colors';
import { Container,  Content, Item, Input, Icon } from 'native-base';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {

      CategoryList: [],
      text: '',
      modalVisible: false
    }
  }

  componentDidMount() {
    const url = `https://api.jsonbin.io/b/5fce7e1e2946d2126fff85f0`
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {

        this.setState({
          CategoryList: res.categories,

        }
        );
        this.arrayData = res.categories;
      }
      )

      .catch(error => {
        this.setState({ error, loading: false });
      });
  }

  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.arrayData.filter(function (item) {

      const itemData = item.category.categoryName ? item.category.categoryName.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({

      CategoryList: newData,
      text: text,
    });
  }
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { modalVisible } = this.state;
    return (

      <View style={styles.container}>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <Container style={styles.container}>
            <Content>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <MaterialIcons name={'close'} size={30} color={'black'} style={{ marginLeft: 10,marginTop:20, fontWeight: 'bold' }} onPress={() => {
                this.setModalVisible(!modalVisible);
              }} />
                 <Ionicons name={'ios-chatbox-ellipses'} size={30} color={'black'} style={{ marginRight: 10,marginTop:20,borderRadius:20, fontWeight: 'bold' }} />
              </View>
             
              <View style={{ margin: 10, marginBottom: 40 }}>
                <Text style={{ fontSize: 30, fontWeight: "bold" }}>Approved Foods List</Text>
              </View>

              <Item style={{ marginLeft: 10, marginRight: 10, backgroundColor: '#e8f0f6' }}>
                <Icon name="ios-search" style={{ marginLeft: 10 }} />
                <Input placeholder="Search" value={this.state.text} onChangeText={text => this.SearchFilterFunction(text)} />
              </Item>



              {this.renderAccordians()}
            </Content>
          </Container>
        </Modal>
        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text style={styles.textStyle}>Show FoodList</Text>
        </TouchableHighlight>
      </View>

    );
  }

  renderAccordians = () => {
    const items = [];
    for (let item of this.state.CategoryList) {
      items.push(
        <Accordian
          title={item.category.categoryName}
          subTitle={item.category.servingSize}

          data={item.category.subcategories}
        />
      );
    }
    return items;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //  paddingTop:50,
    backgroundColor: Colors.CGRAY,

  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 300
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
