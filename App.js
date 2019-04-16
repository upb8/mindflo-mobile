import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";
import Bgimage from "./assets/img/image.png";
import playbtn from "./assets/img/play.png";
import pausebtn from "./assets/img/pause.png";
import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient(
  "https://api.graph.cool/simple/v1/cjuhavbfm4dew0136f5svjec8",
  {
    headers: {
      Authorization: "Bearer YOUR_AUTH_TOKEN"
    }
  }
);

export default class App extends Component {
  state = { videoStatus: true };

  onPress = () => {
    this.setState({ videoStatus: !this.state.videoStatus });
    client.request(`      
      mutation update{
        updateYoutubePlayer(
          id: "cjuibfqka0g0a0146mdnvw3et"
          playing: ${this.state.videoStatus ? "true" : "false"}
        ){
          id
          playing
          user{
            id
            name
          }
        }
      }
    `);
  };
  render() {
    return (
      <ImageBackground source={Bgimage} style={styles.container}>
        <TouchableOpacity onPress={this.onPress}>
          {this.state.videoStatus === true ? (
            <Image source={playbtn} style={styles.imgbtn} />
          ) : (
            <Image source={pausebtn} style={styles.imgbtn} />
          )}
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  imgbtn: {
    height: 50,
    width: 50
  }
});
