import React, {Component} from 'react'
import {View, ScrollView, Alert, TextInput, StyleSheet} from 'react-native'
import {Text, Button, Divider} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
/*import ExamService from "../services/ExamService";*/


class AssignmentWidget extends Component {
    static navigationOptions = {title: 'Exam Editor'}

    constructor(props) {
        super(props)
        this.state = {
            examId: 1,
            questions: []
        }
        //this.examService = ExamService.instance;
        this.fetchExam = this.fetchExam.bind(this);
    }

    componentDidMount() {
        const {navigation} = this.props;
        const examId = navigation.getParam("examId");
        this.setState({examId: examId}, this.fetchExam);
    }

    fetchExam() {
        /*this.examService.findExamById(this.state.examId)
            .then((exam) => {
                    this.setState({
                        questions: exam.questions,
                    })
                    console.log(this.state)
                }
            )*/
    }

    render() {
        return (
            <ScrollView style={{backgroundColor: '#f3f3f3', paddingLeft: 15, paddingRight: 15}}>
                <Text>{this.state.examId}</Text>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({

});

export default AssignmentWidget