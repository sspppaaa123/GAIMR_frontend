import { MenuButton, Logo } from "../components/header/header";
import { HeaderBackButton } from "react-navigation-stack";
import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';  
import {Modal, View, Text, StyleSheet, TextInput,TouchableHighlight, TouchableOpacity, Picker, Image, ScrollView } from 'react-native';
import AddPollComponent from '../components/AddPoll';
import { Card, ListItem, Button, Icon } from 'react-native-elements';


export default class PostScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft:()=> (<HeaderBackButton onPress={() => navigation.goBack(null)} />),
      headerRight:()=> (<Logo />),
      headerLayoutPreset: "center"
    };
  };
  constructor() {
    super();
    this.state = {
        postRequest:
        {
            postType: "",
            streamName: "",
            pollExists: false,
            postContent: {
                text: "",
                image: null
            },
            postDate: "",
            hashtags: [],
            poll: {
            },
            postActivity: {
                auditorLikes: []
            }
        },
        postText: "",
        streamSelected: "Select Stream",
        selectedImage: null,
        isPolling:false,
        visible: false,
    }
}
postHandler = () => {
    if (this.state.streamSelected === "Select Stream") {
        alert("Please Select Stream");
    }
    else {
        if (this.state.postText === "") {
            alert("Enter Atleast One #hashtag");
        }
        else {
            let tags = []
            tags = this.state.postText.match(/#\w+/g)
            if (tags == null) {
                alert("Enter Atleast One #hashtag");
            }
            else {
                let hashtags = []
                for (let i = 0; i < tags.length; i++) {
                    hashtags.push({ tagName: tags[i].substr(1) })
                }
                console.log("hastags", hashtags);
                let newPostRequest = this.state.postRequest;
                let fd = new FormData();
                if (this.state.selectedImage == null) {
                    newPostRequest.postType = "text";
                }
                else {
                    newPostRequest.postType = "image";
                    let file = this.state.selectedImage
                    fd.append("file", { name: file.fileName, type: file.type, uri: file.uri })
                }
                newPostRequest.streamName = this.state.streamSelected;
                newPostRequest.postContent.text = this.state.postText;
                newPostRequest.hashtags = hashtags;
                newPostRequest.postDate = new Date();
                console.log("sending..", newPostRequest);
                fd.append("post", JSON.stringify(newPostRequest));
                console.log("fd", fd);
                fetch("http://192.168.1.17:8080/posts/addPost", {
                    method: "POST",
                    body: fd
                }).then((response) => response.json())
                    .then((responseJSON) => { console.log(responseJSON) })
                    .then(error => { console.log("err", error) })
            }
        }
    }
}
onChangePostText = text => {
    this.setState({
        postText: text
    })
}
imageSelectHandler = () => {
    ImagePicker.showImagePicker({ title: "Pick Image" }, res => {
        if (res.didCancel) {
            console.log("Cancelled")
        }
        else if (res.error) {
            console.log("ERR", res.error)
        }
        else {
            this.setState({
                selectedImage: res
            })
        }
    }
    )
}
deselectImage=()=>
{
    this.setState({
        selectedImage:null
    })
}
addPoll=(poll,choices)=>
{
    poll.choices=choices;
    let post=this.state.postRequest;
    post.pollExists=true;
    post.poll=poll;
    this.setState({
        postRequest:post
    })
    console.log("post",this.state.postRequest);
    }
    onChangeState=()=>
    {
        this.setState({
            isPolling:true
        })
    }
render() {
    let imageSelected = null;
    if (this.state.selectedImage != null) {
        imageSelected = (
            <View style={styles.selectedImageContainer}>
                <Image source={{ uri: this.state.selectedImage.uri }} style={styles.selectedImage} />
                <TouchableOpacity onPress={this.deselectImage} style={styles.close}>
                <Ionicons name="ios-close-circle" size={25} />
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={styles.container}>
         <ScrollView style={styles.scrollContainer} >
         <View style={styles.streamPickerContainer}>
                <Picker
                    selectedValue={this.state.streamSelected}
                    style={styles.streamPicker}
                    onValueChange={(itemValue) =>
                        this.setState({ streamSelected: itemValue })
                    }>
                    <Picker.Item label="Select Stream" value="Select Stream" />
                    <Picker.Item label="Advertisement" value="Advertisement" />
                    <Picker.Item label="Innovation" value="Innovation" />
                    <Picker.Item label="Promotion" value="Promotion" />
                    <Picker.Item label="Sports" value="Sports" />
                </Picker>
            </View>
            <View style={styles.bottomView}>
            <View style={styles.textstyle} >
            <TextInput placeholder="Post something.." style={styles.textPost} onChangeText={(text) => this.onChangePostText(text)} />
            </View>
            <View style={styles.sendstyle}>
            <TouchableOpacity onPress={this.postHandler}>
              <Ionicons name="ios-send" size={25} />
            </TouchableOpacity>
            </View>
            <View style={styles.imagestyle}>
            <TouchableOpacity onPress={this.imageSelectHandler}>
               <Ionicons name="ios-image" size={25} />
            </TouchableOpacity>
            </View>
            <View style={styles.pollstyle}>
            <TouchableOpacity onPress={()=>{this.setState({visible: true})}} >
                <Ionicons name="ios-stats" size={25} />
            </TouchableOpacity>
            {/* <AddPollComponent addPoll={this.addPoll} onStateChange={this.onChangeState}/> */}
            </View>
            </View>
            {imageSelected}
            {this.state.visible ? <AddPollComponent addPoll={this.addPoll} onStateChange={this.onChangeState}/> : null}
            </ScrollView>
        </View>
    )
}
}
const styles = StyleSheet.create(
{
    container:
    {
        flex: 1,
        alignItems: 'center',
        justifyContent:"center",
        marginTop:20
    },

    textPostContainer:
    {
        width: "95%",
        height: "15%",
        backgroundColor: "#fff",
        margin: 10
    },
    textPost:
    {
        width: "100%",
        height: "100%",
        borderColor: "#bbb",
        // borderWidth: 1,
        textAlignVertical: "top"
    },
    addPostContainer:
    {
        width: "80%",
        backgroundColor: "#34c6eb",
        alignItems: "center",
        height: 35,
        justifyContent: "center",
        marginTop:10
    },
    streamPicker:
    {
        width: "100%",
        height: "100%",
    },
    streamPickerContainer:
    {
        // width: "95%",
        height: 50,
        // backgroundColor: "#fff",
        borderWidth: 3,
        borderRadius:60,
        // borderColor: "#bbb",
        marginTop: 10
    },
    addImageContainer:
    {
        width: "80%",
        backgroundColor: "#34c6eb",
        alignItems: "center",
        height: 35,
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#bbb",
        padding: 10
    },
    selectedImageContainer:
    {
        width:"80%",
        marginTop: 10,
        borderWidth:1,
        borderColor:"#bbbb",
        padding:10
    },
    selectedImage:
    {
        width: "100%",
        height: 250,
        borderRadius:60,
        borderWidth:3
    },
    close: {
        margin: 5,
        position: "absolute",
        top: 0,
        left: 0,
        width: 25,
        height: 25,
        color: "tomato"
      },
    scrollContainer:
    {
        width:"100%",
        height:"100%",
        flex:1,
    },

    bottomView: {
        width: '100%',
        height: 50,
        borderWidth:3,
        borderRadius: 30,
        // justifyContent: 'center',
        flexDirection:"row",
        // position: 'absolute', 
        bottom: 0,
        flex:1,
        justifyContent:"space-around",
        alignItems:"center",
        marginTop:20,
      },
    
    textstyle:
    {
        width: "70%",
        height: "100%",
        // backgroundColor: "#fff",
        margin: 10,
        // marginLeft:40
    },
    sendstyle:
    {
        justifyContent:"flex-end",
        padding:10
    },
    imagestyle:
    {
        justifyContent:"flex-end",
        padding:10
    },
    pollstyle:
    {
        justifyContent:"flex-end",
        padding:10
    }
}
)
