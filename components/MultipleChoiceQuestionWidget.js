import React, {Component} from 'react'
import {Picker, View, ScrollView, Alert, TextInput, StyleSheet} from 'react-native'
import {Card, ListItem, Text, Button, Divider} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import MultipleChoiceQuestionWidgetService from "../services/MultipleChoiceQuestionWidgetService";
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';


class MultipleChoiceQuestionWidget extends Component {
    static navigationOptions = {
        title: 'Multiple Choice Editor'
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
            options:'',
            answer:''
        }
        this.multipleChoiceQuestionWidgetService = MultipleChoiceQuestionWidgetService.instance;
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
        this.multipleChoiceQuestionWidgetService.findQuestionById(this.state.questionId)
            .then((question) => {
                    this.setState({
                        title: question.title,
                        description: question.description,
                        points: question.points,
                        instructions: question.instructions,
                        options: question.options,
                        answer: question.answer,
                    })
                }
            )
    }

    updateQuestion() {
        this.multipleChoiceQuestionWidgetService.updateQuestion(
            this.state.questionId,
            {
                'id': this.state.questionId,
                'title': this.state.title,
                'description': this.state.description,
                'points': this.state.points,
                'instructions': this.state.instructions,
                'options': this.state.options,
                'answer': this.state.answer,
            })
    }

    updateForm(newState) {
        this.setState(newState);
    }

    render() {
        let formList = this.state.options.split('\n')
            .map((line,i) => { return (<Picker.Item key={i} label={line} value={line} />)});
        let previewList = this.state.options.split('\n')
            .map((line,i) => { return (<RadioButton key={i} value={i}><Text>{line}</Text></RadioButton>)});

        return (
            <ScrollView style={{backgroundColor: '#f3f3f3', paddingLeft: 5, paddingRight: 5}}>
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

                    <FormLabel>Options</FormLabel>
                    <TextInput style={styles.box}
                               multiline={true}
                               numberOfLines={5}
                               placeholder="Enter one per line"
                               value={String(this.state.options)}
                               onChangeText={
                                   text => this.updateForm({options: text})
                               }
                    />
                    <FormValidationMessage>
                        Choices are required. Enter one per line
                    </FormValidationMessage>

                    <FormLabel>Correct Choice</FormLabel>
                    <Picker
                        selectedValue={this.state.answer}
                        onValueChange={(answer, itemIndex) => this.setState({answer: answer})}>
                        {formList}

                    </Picker>
                    <FormValidationMessage>
                        Correct choice is required!
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

                    <Card>
                        <RadioGroup>
                        {previewList}
                        </RadioGroup>
                    </Card>

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
    }

});

export default MultipleChoiceQuestionWidget