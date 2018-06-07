import React, {Component} from 'react'
import {Picker, View, ScrollView, Alert, TextInput, StyleSheet} from 'react-native'
import {Card, CheckBox, Text, Button, Divider} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import FillInTheBlanksQuestionWidgetService from "../services/FillInTheBlanksQuestionWidgetService";
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
const reactStringReplace = require('react-string-replace')


class FillInTheBlanksQuestionWidget extends Component {
    static navigationOptions = {
        title: 'Fill In The Blanks Editor'
    }

    constructor(props) {
        super(props)
        this.state = {
            questionNo: 1,
            questionId: 1,
            title: '',
            description: '',
            points:0,
            instructions:'',
            variables:'',
        }
        this.fillInTheBlanksQuestionWidgetService = FillInTheBlanksQuestionWidgetService.instance;
        this.fetchQuestion = this.fetchQuestion.bind(this);
        this.updateForm = this.updateForm.bind(this);
        this.updateQuestion = this.updateQuestion.bind(this);
    }

    componentDidMount() {
        const {navigation} = this.props;
        const questionId = navigation.getParam("questionId");
        const questionNo = navigation.getParam("questionNo");
        this.setState({questionId: questionId, questionNo: questionNo}, this.fetchQuestion);
    }

    fetchQuestion() {
        this.fillInTheBlanksQuestionWidgetService.findQuestionById(this.state.questionId)
            .then((question) => {
                    this.setState({
                        title: question.title,
                        description: question.description,
                        points: question.points,
                        instructions: question.instructions,
                        variables: question.variables
                    })
                }
            )
    }

    updateQuestion() {
        this.fillInTheBlanksQuestionWidgetService.updateQuestion(
            this.state.questionId,
            {
                'id': this.state.questionId,
                'title': this.state.title,
                'description': this.state.description,
                'points': this.state.points,
                'instructions': this.state.instructions,
                'variables': this.state.variables
            })
    }

    updateForm(newState) {
        this.setState(newState);
    }

    render() {
        let previewList = this.state.variables.split('\n')
            .map((line,i) => {

                let arr=[];
                let words = line.split(/(?!\(.*)\s(?![^\[]*?\])/g);
                words.map((seq,ind) => {
                    if(seq.substr(0,1)=='[' && seq.slice(-1)==']'){
                        arr.push(<View style={{marginTop:5, marginRight:3, height: 18,
                            width: 50,
                            borderWidth: 1,
                            borderColor: '#cacbce'}} key={ind}><Text> </Text></View>);
                    } else {
                        arr.push(<Text style={{
                            marginTop:5, marginBottom:5, marginRight: 3, flexWrap:'wrap'
                        }} key={ind}>{seq}</Text>);
                    }
                });

                return React.createElement(View,{key: i, style:styles.blankPreviewLine},arr);
            });
        return (
            <ScrollView style={{backgroundColor: '#f3f3f3', paddingLeft: 5, paddingRight: 5}}>
                <Text>{this.props.questionId}</Text>
                <Card>
                    <FormLabel>Title</FormLabel>
                    <FormInput style={styles.textInput} value={this.state.title} onChangeText={
                        text => this.updateForm({title: text})
                    }/>
                    <FormValidationMessage>
                        Title is required
                    </FormValidationMessage>

                    <FormLabel>Points</FormLabel>
                    <FormInput style={styles.textInput} value={String(this.state.points)} onChangeText={
                        text => this.updateForm({points: text})
                    }/>
                    <FormValidationMessage>
                        Points is required
                    </FormValidationMessage>

                    <FormLabel>Instructions</FormLabel>
                    <FormInput style={styles.textInput} value={String(this.state.instructions)} onChangeText={
                        text => this.updateForm({instructions: text})
                    }/>
                    <FormValidationMessage>
                        Instructions is required
                    </FormValidationMessage>

                    <FormLabel>Fill in The Blanks</FormLabel>
                    <TextInput style={styles.box}
                               multiline={true}
                               numberOfLines={5}
                               placeholder="Enter one per line"
                               value={this.state.variables}
                               onChangeText={
                                   text => this.updateForm({variables: text})
                               }
                    />
                    <FormValidationMessage>
                        To create blank enter [blank1=4] for correct answer 4 for blank1
                    </FormValidationMessage>

                    <Button backgroundColor="green"
                            color="white"
                            title="Save"
                            onPress={() => {this.updateQuestion(); this.props.navigation.goBack()}}/>

                    <Button backgroundColor="red"
                            color="white"
                            title="Cancel" onPress={() => this.props.navigation.goBack()}/>
                </Card>

                <Divider style={{backgroundColor: '#7a8291', marginTop: 20}}/>

                <Card title="Preview">

                    <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
                        <Text h3 style={{
                            flex: 1,
                            justifyContent: 'flex-start',
                        }}>Question {this.state.questionNo} </Text>
                        <Text h3 style={{
                            justifyContent: 'flex-end',
                            marginLeft: 10
                        }}>{this.state.points}pts</Text>
                    </View>
                    <Text h3>{this.state.title}</Text>
                    <Text>{this.state.instructions} </Text>


                    <Text h5 style={{marginTop:20, marginBottom:10, fontWeight: "bold"}}>Fill In The Blanks :-</Text>

                    <View>
                        {previewList}
                    </View>

                    <View style={styles.container}>
                        <Button style={styles.button}
                                backgroundColor="red"
                                color="white"
                                title="Cancel"
                                onPress={() => {this.props.navigation.goBack()}}/>

                        <Button style={styles.button}
                                backgroundColor="blue"
                                color="white"
                                title="Submit"
                                onPress={() => this.props.navigation.goBack()} />
                    </View>

                </Card>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    box: {
        marginLeft: 15,
        marginRight: 15,
        borderWidth: 1,
        borderRadius: 4,
        marginTop: 10,
        borderColor: '#cacbce'
    },
    container: {
        paddingTop:20,
        flex: 1,
        flexDirection: 'row'
    },
    button: {
        flex: 1,
        marginTop: 15,
        backgroundColor: 'green',
    },
    blankPreviewLine: {
        flex: 1,
        flexDirection:'row',
        flexWrap: 'wrap'
    },
    previewText: {
        marginTop:5, marginBottom:5, marginRight: 3, flexWrap:'wrap'
    },
    previewInput: {
        height: 20,
        width: 50,
        borderWidth: 1,
        color: '#cacbce',
    }

});


export default FillInTheBlanksQuestionWidget