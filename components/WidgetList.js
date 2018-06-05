import React, {Component} from 'react'
import {Picker, View, Alert, TouchableOpacity} from 'react-native'
import {Text, ListItem, Button, Divider, FormLabel} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from "react-native-modal";
import WidgetService from '../services/WidgetService';


class WidgetList extends Component {
    static navigationOptions = {title: 'Widgets'}

    constructor(props) {
        super(props)
        this.state = {
            widgetModal: false,
            widgetType: 'Assignment',
            widgets: [],
            courseId: 1,
            moduleId: 1,
            lessonId: 1,
            topicId: 1
        }
        this.widgetService = WidgetService.instance;
        this.fetchWidgets = this.fetchWidgets.bind(this);
        this.createWidget = this.createWidget.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
    }

    componentDidMount() {
        const {navigation} = this.props;
        const courseId = navigation.getParam("courseId")
        const moduleId = navigation.getParam("moduleId")
        const lessonId = navigation.getParam("lessonId")
        let topicId = navigation.getParam("topicId")
        topicId = 87;

        this.setState({topicId: topicId, lessonId: lessonId, moduleId: moduleId, courseId: courseId},
            () => this.fetchWidgets());
    }

    fetchWidgets() {
        console.log("http://cs5610-summer1-2018-patel.herokuapp.com/api/topic/" + this.state.topicId + "/widget");
        fetch("http://cs5610-summer1-2018-patel.herokuapp.com/api/topic/" + this.state.topicId + "/widget")
            .then(response => (response.json()))
            .then(widgets => this.setState({widgets}))
    }

    createWidget() {

        return this.widgetService.createWidget(this.state.topicId, this.state.widgetType)
            .then((course) => {
                this.fetchWidgets();
            });
    }

    setModalVisible(visible) {
        this.setState({widgetModal: visible});
    }

    render() {
        return (
            <View style={{padding: 15}}>
                <Text>{this.state.topicId}</Text>
                <FormLabel>Widget Type:</FormLabel>
                <Picker
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({widgetType: itemValue})}
                    selectedValue={this.state.widgetType}>
                    <Picker.Item value="Assignment" label="Assignment"/>
                    <Picker.Item value="Exam" label="Exam"/>
                </Picker>

                <Button
                    icon={
                        <Icon
                            name='arrow-right'
                            size={15}
                            color='blue'
                        />
                    }
                    title='Add Widget'
                    onPress={() => {
                        this.createWidget()
                    }}
                />

                <Divider style={{backgroundColor: '#7a8291', marginTop: 20, marginBottom: 20}}/>

                {this.state.widgets.map(
                    (widget, index) => {
                        if (widget.widgetType == 'Assignment') {
                            return (<ListItem
                                onPress={() => this.props.navigation
                                    .navigate("AssignmentEditor", {assignmentId: widget.id})}
                                key={index}
                                subtitle={widget.description}
                                title={widget.name}/>)
                        }
                        return (<ListItem title='Unsupported Widget' key={index} />)
                    })
                }
            </View>
        )
    }
}

export default WidgetList