import React, { Component } from "react";
import { Dimensions, ScrollView, Text, View, Picker,ActivityIndicator,StyleSheet } from "react-native";
import Axios from "axios";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      Active: "",
      confirmed: "",
      recovered: "",
      Death: "",
      selectedState: "",
      states: [],
      loader:false
    };
  }

  onSelect =async (state, index) => {
 await this.setState({loader:true})
    console.log(state + "selected" + index);

    this.setState({ selectedState: state });

    var newArray = this.state.data.filter(function (el) {
      return (el.state = `${state}`);
    });
    console.log(newArray[index]);
    this.setState({ ...newArray[index] });
    console.log(this.state.Active + "active");
  // this.setState({loader:false});
  setTimeout(() => {this.setState({loader:false})}, 1000)

  };

  componentDidMount = async () => {
    this.setState({loader:true})
    console.log(this.state.selectedState + " new State");
    let state = this.state.selectedState;
    await Axios.get("https://api.covid19india.org/data.json")
      .then((result) => {
        this.setState({ data: result.data.statewise });
        let selectedtate = "Total";
        var newArray = this.state.data.filter(function (el) {
          return (el.state = `${selectedtate}`);
        });
        this.setState({ ...newArray[0] });
      })
      .catch((err) => {
        console.log(err);
      });
      setTimeout(() => {this.setState({loader:false})}, 1000)

    //getting States
    await Axios.get("https://api.covid19india.org/data.json")
      .then((result) => {
        console.log(result.data.statewise);
        // this.setState({ states: result.data.statewise[0].state });
        var newArray = result.data.statewise.map(function (el) {
          return el.state;
        });
        this.setState({ states: newArray });
        console.log(this.state.states);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      <View>
     
        <View
          style={{
            height: Dimensions.get("window").height / 2,
           
            backgroundColor: "#d6d6d6",
          }}
        >
        
          <View >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                alignSelf: "center",
                marginTop: 50,
              }}
            >
              Covid 19 Matrics
            </Text>
          </View>
          <View style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <Text
              style={{
                fontSize: 20,
                alignSelf: "center",
              }}
            >
              India
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
         
            <View>
              <Text style={{ fontSize: 15,fontWeight:'bold',paddingTop:5,paddingRight:10 }}>STATE    </Text>
            </View>
          
            <View style={{width:250,borderWidth:1,borderColor:'#000',height:30,backgroundColor:'#fff'}}>
              <Picker
                selectedValue={this.state.selectedState}
                style={{
                  height: 50,
                  width: 200,
                  top: -12,
                  marginHorizontal: 20,
                  borderWidth: 1,
                  borderBottomColor: "#000",
                }}
                onValueChange={(itemValue, itemIndex) =>
                  this.onSelect(itemValue, itemIndex)
                }
              >
                <Picker.Item label="All" value="Total" />

                {this.state.states.map((row) => (
                  <Picker.Item key={row.state} label={row} value={row} />
                ))}
              </Picker>
            </View>
          </View>
        </View>
        <View style={{ height: 1, backgroundColor: "#000" }}></View>
        <View style={{ marginHorizontal: 20, marginTop: 30 }}>
         
          {this.state.loader ?
<View style={{top:100}}>
          <ActivityIndicator size="large" color="red" />

</View>
          :
          <View>
          <View>
            <Text
              style={{
                // display: "flex",
                color: "gray",
                marginTop: 10,
                alignSelf: "center",
                fontWeight: "bold",
              }}
            >
              As on {this.state.lastupdatedtime}
            </Text>
          </View>
          <View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 30,
                justifyContent: "space-around",
              }}
            >
            </View>
           
            <View
                style={styles.content}
            >
            
              <View>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Active</Text>
              </View>
              <View>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {this.state.active}
                </Text>
              </View>
            </View>
          </View>
         
          <View
           
            style={styles.content}

          >
          
            <View>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Confirmed
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {this.state.confirmed}
              </Text>
            </View>
          </View>

          <View
             style={styles.content}
          >
            <View>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Recoverd</Text>
            </View>
            <View>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {this.state.recovered}
              </Text>
            </View>
          </View>

          <View
              style={styles.content}
          >
            <View>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Death</Text>
            </View>
            <View>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {this.state.deaths}
              </Text>
            </View>
          </View>
          </View>
          }
        
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
	
  content:{
              flexDirection: "row",
              justifyContent: "space-around",
              marginVertical: 10,
  },

  

});




