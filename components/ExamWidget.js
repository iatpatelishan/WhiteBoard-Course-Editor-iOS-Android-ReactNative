import React, {Component} from 'react'
import {View, ScrollView, Alert, TextInput, StyleSheet} from 'react-native'
import {ListItem,Text, Button, Divider} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionButton from 'react-native-action-button';
import ExamService from "../services/ExamService";


class AssignmentWidget extends Component {
    static navigationOptions = {title: 'Exam Editor'}

    constructor(props) {
        super(props)
        this.state = {
            examId: 1,
            questions: []
        }
        this.examService = ExamService.instance;
        this.fetchQuestions = this.fetchQuestions.bind(this);
    }

    componentDidMount() {
        const {navigation} = this.props;
        const examId = navigation.getParam("examId");
        this.setState({examId: examId}, this.fetchQuestions);
    }

    createQuestion(questionType){
        return this.examService.createQuestion(this.state.examId, questionType)
            .then(() => {
                this.fetchQuestions();
            });
    }

    fetchQuestions() {
        this.examService.findAllQuestionsForExam(this.state.examId)
            .then((questions) => {
                    this.setState({
                        questions: questions,
                    })
                    console.log(this.state)
                }
            )
    }

    render() {
        let count=0;
        let name='';
        let list = this.state.questions.map(
            (question, index) => {
                count++;
                name='Question '+count+' : '+ question.questionType;

                return (<ListItem
                    onPress={() => this.props.navigation
                        .navigate("AssignmentWidget", {questionId: question.id, questionNo:count})}
                    key={index}
                    title={name}
                    />);

            })

        return (
            <View style={{flex: 1, backgroundColor: '#f3f3f3'}}>
            <ScrollView style={{padding: 15}}>
                <Text>{this.state.examId}</Text>
                <Text h2>List of Questions</Text>
                {
                    list
                }
            </ScrollView>
                <ActionButton buttonColor="rgba(231,76,60,1)">
                    <ActionButton.Item buttonColor='#0084ff' title="Essay Question" onPress={() => {
                        this.createQuestion("Essay")
                    }}>
                        <Icon name="plus" style={styles.actionButtonIcon}/>
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#ff6600' title="Fill In The Blanks" onPress={() => {
                        this.createQuestion("Blanks")
                    }}>
                        <Icon name="plus" style={styles.actionButtonIcon}/>
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#009688' title="Multiple Choice" onPress={() => {
                        this.createQuestion("Choice")
                    }}>
                        <Icon name="plus" style={styles.actionButtonIcon}/>
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#FAFAFA' title="True or False" onPress={() => {
                        this.createQuestion("TrueFalse")
                    }}>
                        <Icon name="plus" style={styles.actionButtonIcon}/>
                    </ActionButton.Item>
                </ActionButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({

});

export default AssignmentWidget