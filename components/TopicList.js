import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'

class TopicList extends Component {
    static navigationOptions = {title: 'Topics'}
    constructor(props) {
        super(props)
        this.state = {
            topics: [],
            courseId: 1,
            moduleId: 1,
            lessonId: 1
        }
    }
    componentDidMount() {
        const {navigation} = this.props;
        const courseId = navigation.getParam("courseId")
        const moduleId = navigation.getParam("moduleId")
        const lessonId = navigation.getParam("lessonId")
        fetch("http://cs5610-summer1-2018-patel.herokuapp.com/api/lesson/"+lessonId+"/topic")
            .then(response => (response.json()))
            .then(topics => this.setState({topics}))
    }
    render() {
        return(
            <View style={{padding: 15}}>
                {this.state.topics.map(
                    (topic, index) => (
                        <ListItem
                            onPress={() => this.props.navigation
                                .navigate("WidgetList", {
                                    courseId: this.state.courseId,
                                    moduleId: this.state.moduleId,
                                    lessonId: this.state.lessonId,
                                    topicId: topic.id})}
                            key={index}
                            title={topic.title}/>))}
            </View>
        )
    }
}
export default TopicList