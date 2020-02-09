import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Picker, Image, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';  
export default class AddPollComponent extends Component {
    constructor() {
        super();
        this.state = {
            isPoll: false,
            poll:{question:"",choices:[]},
            choices:[{choiceNo:1,placeholder:"choice 1",choice:""},
            {choiceNo:2,placeholder:"choice 2",choice:""}]
        }
    }
    onChangeQuestion=text=>
    {
        let poll=this.state.poll;
        poll.question=text;
        this.setState({
            poll:poll
        })
    }
    pollHandler=()=>
    {
        this.props.onStateChange();
        this.setState({
            isPoll:true
        })
    }
    addChoiceHandler=()=>
    {
        let choices=this.state.choices;
        let len=choices.length+1;
        let placeholderText="choice "+len
        choices.push({choiceNo:len,placeholder:placeholderText,choice:""})
        this.setState({
            choices:choices
        })
    }
    addChoiceText=(idx,text)=>
    {
        let choices=this.state.choices;
        for(let i=0;i<choices.length;i++)
        {
            if(idx.choiceNo==choices[i].choiceNo)
               choices[i].choice=text;
        }
        this.setState({
            choices:choices
        })
        console.log("state",this.state.choices);
    }
    render() {
        let pollContent = null;
        let extraChoices=this.state.choices.map((i)=>{
            return(
                <TextInput placeholder={i.placeholder} key={i.choiceNo} onChangeText={(text)=>{this.addChoiceText(i,text)}}/>
            )
        })
        if (this.state.isPoll) {
            pollContent = (
                <View style={styles.pollContainer}>
                    <TextInput placeholder="Add Question" onChangeText={(txt)=>{this.onChangeQuestion(txt)}}/>
                    {extraChoices}
                    <TouchableOpacity style={styles.pollAddContainer} onPress={this.addChoiceHandler}>
                        <Text>Add Choice</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.pollSaveContainer} onPress={()=>{this.props.addPoll(this.state.poll,this.state.choices)}}>
                        <Text>Save Poll</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        else {
            pollContent=(
            <TouchableOpacity onPress={this.pollHandler} style={styles.poll}>
                <Text>Create Poll</Text>
            </TouchableOpacity>
            )
        }
        return (
            <View style={styles.container}>
                {pollContent}
            </View>
        )
    }
}
const styles = StyleSheet.create(
    {
        container:
        {
            alignItems: 'center',
            width: "100%",
            marginTop: 10,
            padding:10
        },
        poll:
        {
            justifyContent:"center",
            padding:10
        },
        addPollContainer:
        {
            backgroundColor: "#34c6eb",
            width: "80%",
            height: 35,
            alignItems: "center",
            justifyContent: "center"
        },
        pollContainer:
        {
            width:"95%",
            alignItems:"center",
            borderWidth:1,
            borderColor:"#bbb",
            paddingBottom:10,
        },
        pollSaveContainer:
        {
            backgroundColor: "#34c6eb",
            width: "80%",
            height: 35,
            alignItems: "center",
            justifyContent: "center",
            marginTop:10
        },
        pollAddContainer:
        {
            backgroundColor: "#34c6eb",
            width: "80%",
            height: 35,
            alignItems: "center",
            justifyContent: "center"
        },
    }
)