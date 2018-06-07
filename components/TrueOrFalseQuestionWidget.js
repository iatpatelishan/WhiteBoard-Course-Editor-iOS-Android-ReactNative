import React, {Component} from 'react'
import {Picker, View, ScrollView, Alert, TextInput, StyleSheet} from 'react-native'
import {Card, CheckBox, Text, Button, Divider} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import TrueOrFalseQuestionWidgetService from "../services/TrueOrFalseQuestionWidgetService";
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';


class TrueOrFalseQuestionWidget extends Component {
    static navigationOptions = {
        title: 'True or False Editor'
    }

    constructor(props) {
        super(props)
        this.state = {
            questionNo: 1,
            questionId: 1,
            title: '',
            description: '',
            points: 0,
            instructions: '',
            isTrue: false,
        }
        this.trueOrFalseQuestionWidgetService = TrueOrFalseQuestionWidgetService.instance;
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
        this.trueOrFalseQuestionWidgetService.findQuestionById(this.state.questionId)
            .then((question) => {
                    this.setState({
                        title: question.title,
                        description: question.description,
                        points: question.points,
                        instructions: question.instructions,
                        isTrue: question.isTrue
                    })
                }
            )
    }

    updateQuestion() {
        this.trueOrFalseQuestionWidgetService.updateQuestion(
            this.state.questionId,
            {
                'id': this.state.questionId,
                'title': this.state.title,
                'description': this.state.description,
                'points': this.state.points,
                'instructions': this.state.instructions,
                'isTrue': this.state.isTrue
            })
    }

    updateForm(newState) {
        this.setState(newState);
    }

    render() {

        return (
            <ScrollView style={{backgroundColor: '#f3f3f3', paddingLeft: 5, paddingRight: 5}}>
                <View style={{marginBottom: 20}}>
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

                        <FormLabel>True or False</FormLabel>
                        <CheckBox onPress={() => this.updateForm({isTrue: !this.state.isTrue})}
                                  checked={this.state.isTrue} title='Check if True'/>
                        <FormValidationMessage>
                            Answer is required.
                        </FormValidationMessage>

                        <Button backgroundColor="green"
                                color="white"
                                title="Save"
                                onPress={() => {
                                    this.updateQuestion();
                                    this.props.navigation.goBack()
                                }}/>

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

                        <Card>
                            <RadioGroup>
                                <RadioButton value={'True'}>
                                    <Text>True</Text>
                                </RadioButton>
                                <RadioButton value={'False'}>
                                    <Text>False</Text>
                                </RadioButton>
                            </RadioGroup>
                        </Card>

                        <View style={styles.container}>
                            <Button style={styles.button}
                                    backgroundColor="red"
                                    color="white"
                                    title="Cancel"
                                    onPress={() => {
                                        this.props.navigation.goBack()
                                    }}/>

                            <Button style={styles.button}
                                    backgroundColor="blue"
                                    color="white"
                                    title="Submit"
                                    onPress={() => this.props.navigation.goBack()}/>
                        </View>

                    </Card>
                </View>
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
        paddingTop: 20,
        flex: 1,
        flexDirection: 'row'
    },
    button: {
        flex: 1,
        marginTop: 15,
        backgroundColor: 'green',
    }

});

export default TrueOrFalseQuestionWidget