import React from 'react';
import { View, Text, Image, SectionList, StyleSheet, TouchableOpacity,
  TouchableHighlight } from 'react-native';
import { fakeSections } from './fackeData';

class ListItem extends React.Component {
  constructor(props) {
    super(props)
  }
  _onPress = () =>{
    // alert(`Click on ${this.props.name}`)
  }

  render() {
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={{ backgroundColor: 'skyblue', flex: 1}}>
          <Text style={styles.nameText}>{this.props.name}</Text>
          <Text style={styles.priceText}>{this.props.price}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

class SectionHeader extends React.Component {
  constructor(props) {
    super(props)
  }
  _onPress = () => {
    var {section, sectionList} = this.props
    section.isShow = !section.isShow
    sectionList.updateData()
  }

  render() {
    var {section} = this.props

    return (
      <TouchableOpacity onPress={this._onPress}>
        <Text style={styles.headerText}>{section.title}</Text>
      </TouchableOpacity>
    )
  }
}

export default class SectionListExample extends React.Component {

  constructor(props) {
    super(props) 
    this.state={
      data: fakeSections
    }
  }

  updateData() {
    this.forceUpdate()
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#e6ecff'}}>
        <SectionList
          sections={this.state.data}
          renderItem={({section, item, index}) => {
            if (!section.isShow) {
              return (<ListItem name={item.name} price={item.price} />)
            } else {
              return (<View></View>)
            }
          }}
          renderSectionHeader={({section}) => <SectionHeader section={section} sectionList={this}/>}
          keyExtractor={(item) => `${item.name}`}
          ItemSeparatorComponent={()=><View style={{height: 0.5, backgroundColor: 'steelblue'}}/>}
          extraData={this.state}
        >
        </SectionList>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  nameText: {
    fontSize: 14,
    height: 20, 
    color: 'black',
    margin: 8,
    fontWeight: 'bold'
  },
  priceText: {
    fontSize: 14,
    height: 20, 
    color: 'red',
    margin: 8,
    textAlign: 'right'
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    height: 60, 
    backgroundColor: 'powderblue',
    padding: 12
  }
})