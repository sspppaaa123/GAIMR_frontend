import React, { Component } from "react";
import ImagePicker from 'react-native-image-picker';
import * as constants from '../constants'
import { MenuButton, Logo, Middle } from "../components/header/header";
import { StyleSheet, View, SafeAreaView, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
export default class AddStreamScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: () => <MenuButton onPress={() => navigation.openDrawer()} />,
            headerRight: () => (<Logo />),
        };
    };
    constructor() {
        super()
        this.state = {
            selectedImage: null,
            streamName: ""
        }
    }
    addLogoHandler = () => {
        ImagePicker.showImagePicker({ title: "Pick Image", maxWidth: 800, maxHeight: 600 }, res => {
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
    onChangeStream = text => {
        this.setState({
            streamName: text
        })
    }
    onStreamAddHandler = () => {
        if (this.state.selectedImage != null) {
            if (this.state.streamName === "") {
                alert("Stream name cant be empty")
            }
            else {
                let stream = {
                    streamName: this.state.streamName
                }
                let fd = new FormData()
                let logo = this.state.selectedImage
                fd.append("logo", { name: logo.fileName, type: logo.type, uri: logo.uri })
                fd.append("stream", JSON.stringify(stream))
                fetch(constants.APIURL + "/streams/addStream", {
                    method: "POST",
                    body: fd
                }).then((resp) => resp.json()).then((respJSON) => {
                    console.log(respJSON)
                    alert("done")
                    this.setState({
                        selectedImage: null,
                        streamName: ""
                    }
                    )
                })
            }
        }
        else {
            alert("please add logo")
        }
    }
    render() {
        let image = null;
        if (this.state.selectedImage != null) {
            console.log("image added")
            image = (<Image source={{ uri: this.state.selectedImage.uri }} style={styles.logo} />)
        }
        else {
            image = (<Text>Add Logo</Text>)
        }
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.addStreamContainer}>
                    <TouchableOpacity style={styles.logoContainer} onPress={this.addLogoHandler}>
                        {image}
                    </TouchableOpacity>
                    <TextInput placeholder="Enter Name Of Stream" style={styles.streamInput} onChangeText={this.onChangeStream} />
                    <TouchableOpacity style={styles.addStreamBtn} onPress={this.onStreamAddHandler}>
                        <Text>Add Stream</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: "center",
        flex: 1,
        backgroundColor: "#ccf7ff"
    },
    addStreamContainer:
    {
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: "#fff",
        width: "90%",
        height: "60%",
        padding: 20
    },
    streamInput:
    {
        width: "80%",
        height: 40,
        marginLeft: 10,
        borderColor: "#bbbb",
        borderWidth: 1
    },
    addStreamBtn: {
        backgroundColor: "#34c6eb",
        width: "80%",
        alignItems: "center",
        justifyContent: "center",
        height: "10%",
        padding: 20,
        marginTop: 20
    },
    logoContainer:
    {
        width: "60%",
        height: "50%",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        padding: 10,
        borderColor: "#bbb",
        marginBottom: 20
    },
    logo:
    {
        width: "100%",
        height: "100%"
    }
})