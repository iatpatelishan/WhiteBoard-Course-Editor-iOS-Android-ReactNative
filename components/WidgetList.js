import React, {Component} from 'react'
import {StyleSheet, Picker, ScrollView, View, Alert, TouchableOpacity} from 'react-native'
import {Text, ListItem, Button, Divider, FormLabel} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import WidgetService from '../services/WidgetService';
import ActionButton from 'react-native-action-button';


class WidgetList extends Component {
    static navigationOptions = {title: 'Widgets'}

    constructor(props) {
        super(props)
        this.state = {
            widgetModal: false,
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


        this.setState({topicId: topicId, lessonId: lessonId, moduleId: moduleId, courseId: courseId},
            () => this.fetchWidgets());
    }

    componentWillReceiveProps(newProps) {
        const {navigation} = newProps;
        const courseId = navigation.getParam("courseId")
        const moduleId = navigation.getParam("moduleId")
        const lessonId = navigation.getParam("lessonId")
        let topicId = navigation.getParam("topicId")


        this.setState({topicId: topicId, lessonId: lessonId, moduleId: moduleId, courseId: courseId},
            () => this.fetchWidgets());
    }

    fetchWidgets() {
        console.log("http://cs5610-summer1-2018-patel.herokuapp.com/api/topic/" + this.state.topicId + "/widget");
        fetch("http://cs5610-summer1-2018-patel.herokuapp.com/api/topic/" + this.state.topicId + "/widget")
            .then(response => (response.json()))
            .then(widgets => this.setState({widgets}))
    }

    createWidget(widgetType) {
        return this.widgetService.createWidget(this.state.topicId, widgetType)
            .then((course) => {
                this.fetchWidgets();
            });
    }

    setModalVisible(visible) {
        this.setState({widgetModal: visible});
    }

    render() {
        let assignmentList = [];
        let examList = [];

        this.state.widgets.map(
            (widget, index) => {
                if (widget.widgetType == 'Assignment') {
                    assignmentList.push(widget)
                }
                if (widget.widgetType == 'Exam') {
                    examList.push(widget)
                }
            })

        return (
            <View style={{flex: 1, backgroundColor: '#f3f3f3'}}>
                <ScrollView style={{padding: 15}}>
                    <View style={{marginBottom: 20}}>
                        <Text h1>Exam</Text>
                        {examList.map(
                            (widget, index) => {
                                return (<ListItem
                                    leftIcon={<Icon name="times-circle" style={styles.widgetIcon}/>}
                                    onPress={() => this.props.navigation
                                        .navigate("ExamWidget", {examId: widget.id})}
                                    key={index}
                                    subtitle={widget.description}
                                    title={widget.name}/>);
                            })
                        }

                        <Text h1 style={{paddingTop: 20}}>Assignment</Text>
                        {assignmentList.map(
                            (widget, index) => {
                                return (<ListItem
                                    leftIcon={<Icon name="times-circle" style={styles.widgetIcon} />}
                                    onPress={() => this.props.navigation
                                        .navigate("AssignmentWidget", {assignmentId: widget.id})}
                                    key={index}
                                    subtitle={widget.description}
                                    title={widget.name}/>);
                            })
                        }
                    </View>
                </ScrollView>
                <ActionButton buttonColor="rgba(231,76,60,1)">
                    <ActionButton.Item buttonColor='#3498db' title="New Exam" onPress={() => {
                        this.createWidget("Exam")
                    }}>
                        <Icon name="plus" style={styles.actionButtonIcon}/>
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#9b59b6' title="New Assignment" onPress={() => {
                        this.createWidget("Assignment")
                    }}>
                        <Icon name="plus" style={styles.actionButtonIcon}/>
                    </ActionButton.Item>
                </ActionButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    widgetIcon: {
        marginRight: 10,
    }
});

export default WidgetList