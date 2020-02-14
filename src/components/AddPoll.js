import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Picker, Image, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default class AddPollComponent extends Component {
    constructor() {
        super();
        this.state = {
            isPoll: false,
            disabledButton: true,
            poll: { question: "", choices: [] },
            choices: [{ choiceNo: 1, placeholder: "Choice 1:", choice: "", votes: 0 },
            { choiceNo: 2, placeholder: "Choice 2:", choice: "", votes: 0 }]
        }
    }
    onChangeQuestion = text => {
        let poll = this.state.poll;
        poll.question = text;
        this.setState({
            poll: poll
        }, function () {
            this.savePollHandler()
        })
    }
    pollHandler = () => {
        // this.props.onStateChange();
        this.setState({
            isPoll: true
        })
    }
    addChoiceHandler = () => {
        let choices = this.state.choices;
        let len = choices.length + 1;
        let placeholderText = "Choice " + len + ":"
        choices.push({ choiceNo: len, placeholder: placeholderText, choice: "", votes: 0 })
        this.setState({
            choices: choices
        })
    }
    addChoiceText = (idx, text) => {
        let choices = this.state.choices;
        for (let i = 0; i < choices.length; i++) {
            if (idx.choiceNo == choices[i].choiceNo)
                choices[i].choice = text;
        }
        this.setState({
            choices: choices
        }, function () {
            this.savePollHandler()
        })
        console.log("state", this.state.choices);
    }
    savePollHandler = () => {
        let poll = this.state.poll;
        let choices = this.state.choices;
        if (poll.question != "") {
            let isFilled = true;
            for (let i = 0; i < choices.length; i++) {
                let choice = choices[i];
                if (choice.choice == "") {
                    isFilled = false;
                }
            }
            if (isFilled) {
                this.setState({
                    disabledButton: false
                })
            }
        }
    }
    render() {
        let pollContent = null;
        let extraChoices = this.state.choices.map((i) => {
            return (
                <View style={styles.choiceInputContainer} key={i.choiceNo}>
                    <Text>{i.placeholder}</Text>
                    <TextInput
                        onChangeText={(text) => { this.addChoiceText(i, text) }}
                        style={styles.choiceinput} />
                </View>
            )
        })
        if (this.state.isPoll) {
            pollContent = (
                <View style={styles.pollContainer}>
                    <View style={[styles.choiceInputContainer, { marginTop: 15 }]}>
                        <Text>Question:</Text>
                        <TextInput onChangeText={(txt) => { this.onChangeQuestion(txt) }}
                            style={styles.choiceinput} />
                    </View>
                    {extraChoices}
                    <TouchableOpacity style={styles.pollAddContainer} onPress={this.addChoiceHandler}>
                        <Text>Add Choice</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.pollSaveContainer} disabled={this.state.disabledButton}
                        onPress={() => { this.props.addPoll(this.state.poll, this.state.choices) }}>
                        <Text>Save Poll</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        else {
            pollContent = (
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
            padding: 10
        },
        poll:
        {
            justifyContent: "center",
            padding: 10,
            backgroundColor: "#34c6eb"
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
            width: "95%",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#bbb",
            paddingBottom: 10,
        },
        pollSaveContainer:
        {
            backgroundColor: "#34c6eb",
            width: "80%",
            height: 35,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10
        },
        pollAddContainer:
        {
            backgroundColor: "#34c6eb",
            width: "80%",
            height: 35,
            alignItems: "center",
            justifyContent: "center"
        },
        choiceInputContainer:
        {
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
            marginLeft: 20,
            marginBottom: 20
        },
        choiceinput:
        {
            width: "65%",
            height: 40,
            marginLeft: 10,
            borderColor: "#bbbb",
            borderWidth: 1
        }
    }
)