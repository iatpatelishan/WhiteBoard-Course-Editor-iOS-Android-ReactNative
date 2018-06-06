import React, {Component} from 'react'
import {View, ScrollView, Alert, TextInput, StyleSheet} from 'react-native'
import {Card, Text, Button, Divider} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import AssignmentService from "../services/AssignmentService";


class AssignmentWidget extends Component {
    static navigationOptions = {title: 'Assignment Editor'}

    constructor(props) {
        super(props)
        this.state = {
            assignmentId: 1,
            name: '',
            title: '',
            description: '',
            points: 0,
        }
        this.assignmentService = AssignmentService.instance;
        this.updateForm = this.updateForm.bind(this);
        this.fetchAssignment = this.fetchAssignment.bind(this);
        this.updateAssignment = this.updateAssignment.bind(this);
    }

    componentDidMount() {
        const {navigation} = this.props;
        const assignmentId = navigation.getParam("assignmentId");
        this.setState({assignmentId: assignmentId}, this.fetchAssignment);
    }

    fetchAssignment() {
        this.assignmentService.findAssignmentById(this.state.assignmentId)
            .then((assignment) => {
                    this.setState({
                        name: assignment.name,
                        title: assignment.title,
                        description: assignment.description,
                        points: assignment.points,
                    })
                    console.log(this.state)
                }
            )
    }

    updateAssignment() {
        this.assignmentService.updateAssignment(
            this.state.assignmentId,
            {
                'id': this.state.assignmentId,
                'name': this.state.name,
                'title': this.state.title,
                'description': this.state.description,
                'points': this.state.points
            })
    }

    updateForm(newState) {
        this.setState(newState);
    }

    render() {
        return (
            <ScrollView style={{backgroundColor: '#f3f3f3', paddingLeft: 5, paddingRight: 5}}>

                <Card>
                    <FormLabel>Assignment Name</FormLabel>
                    <FormInput style={styles.textInput} value={this.state.name} onChangeText={
                        text => this.updateForm({name: text})
                    }/>
                    <FormValidationMessage>
                        Assignment Name is required
                    </FormValidationMessage>

                    <FormLabel>Title</FormLabel>
                    <FormInput style={styles.textInput} value={this.state.title} onChangeText={
                        text => this.updateForm({title: text})
                    }/>
                    <FormValidationMessage>
                        Title is required
                    </FormValidationMessage>

                    <FormLabel>Description</FormLabel>
                    <FormInput style={styles.textInput} value={this.state.description} onChangeText={
                        text => this.updateForm({description: text})
                    }/>
                    <FormValidationMessage>
                        Description is required
                    </FormValidationMessage>

                    <FormLabel>Points</FormLabel>
                    <FormInput style={styles.textInput} value={String(this.state.points)} onChangeText={
                        text => this.updateForm({points: text})
                    }/>
                    <FormValidationMessage>
                        Points is required
                    </FormValidationMessage>

                    <Button backgroundColor="green"
                            color="white"
                            title="Save"
                            onPress={() => this.updateAssignment()}/>

                    <Button backgroundColor="red"
                            color="white"
                            title="Cancel" onPress={() => this.props.navigation.goBack()}/>
                </Card>

                <Divider style={{backgroundColor: '#7a8291', marginTop: 20}}/>

                <Card title="Preview">

                    <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
                        <Text h3 style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                        }}>{this.state.title}</Text>
                        <Text h3 style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            marginLeft: 10
                        }}>{this.state.points}pts</Text>
                    </View>
                    <Text>{this.state.description} </Text>

                    <Text style={styles.essayAnswer} h4>Essay Answer </Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        placeholder="Student would enter answer here"/>

                    <Text style={styles.uploadFile} h4>Upload a file </Text>


                    <Text style={styles.uploadLink} h4>Submit a Link </Text>
                    <FormInput style={styles.textInput} placeholder="Student would submit link here"/>
                </Card>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    textInput: {
        fontSize: 20,
        height: 30,
        color: 'white',
    },
    essayAnswer: {
        marginTop: 20,
    },
    uploadFile: {
        marginTop: 20,
    },
    uploadLink: {
        marginTop: 20,
    },
    saveButton: {
        marginTop: 20,
    }
});

export default AssignmentWidget