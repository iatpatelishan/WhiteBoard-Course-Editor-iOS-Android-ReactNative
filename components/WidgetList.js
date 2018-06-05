import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'

class WidgetList extends Component {
    static navigationOptions = {title: 'Widgets'}
    constructor(props) {
        super(props)
        this.state = {
            widgets: [],
            courseId: 1,
            moduleId: 1,
            lessonId: 1,
            topicId: 1
        }
    }
    componentDidMount() {
        const {navigation} = this.props;
        const courseId = navigation.getParam("courseId")
        const moduleId = navigation.getParam("moduleId")
        const lessonId = navigation.getParam("lessonId")
        const topicId = navigation.getParam("topicId")
        fetch("http://cs5610-summer1-2018-patel.herokuapp.com/api/topic/"+topicId+"/widget")
            .then(response => (response.json()))
            .then(widgets => this.setState({widgets}))
    }
    render() {
        return(
            <View style={{padding: 15}}>
                {this.state.widgets.map(
                    (widget, index) => (
                        <ListItem
                            onPress={() => this.props.navigation
                                .navigate("QuestionList", {examId: widget.id})}
                            key={index}
                            subtitle={widget.description}
                            title={widget.name}/>))}
            </View>
        )
    }
}
export default WidgetList