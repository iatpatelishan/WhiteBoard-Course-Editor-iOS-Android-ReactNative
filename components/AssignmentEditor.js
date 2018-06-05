import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'

class AssignmentEditor extends  Component {
    static navigationOptions = {title: 'Assignment Editor'}
    constructor(props) {
        super(props)
        this.state = {
            questions: [],
            assignmentId: 1
        }
    }

    componentDidMount() {
        const {navigation} = this.props;
        const assignmentId = navigation.getParam("assignmentId");
        this.setState({assignmentId: assignmentId});
    }

    render() {
        return (
            <View style={{padding: 15}}>
                <Text>{this.state.assignmentId}</Text>

                <FormLabel>Assignment Name</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({title: text})
                }/>
                <FormValidationMessage>
                    Assignment Name is required
                </FormValidationMessage>

                <FormLabel>Title</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({title: text})
                }/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>

                <FormLabel>Description</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({description: text})
                }/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>

                <FormLabel>Points</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({description: text})
                }/>
                <FormValidationMessage>
                    Points is required
                </FormValidationMessage>

            </View>
        )
    }
}

export default AssignmentEditor