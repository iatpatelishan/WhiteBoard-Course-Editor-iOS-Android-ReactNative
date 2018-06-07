import React from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView} from 'react-native';
import { createStackNavigator } from 'react-navigation'
import FixedHeader from './elements/FixedHeader'
import {Button} from 'react-native-elements'

import CourseList from './components/CourseList'
import ModuleList from './components/ModuleList'
import LessonList from './components/LessonList'
import TopicList from './components/TopicList'
import WidgetList from './components/WidgetList'
import AssignmentWidget from './components/AssignmentWidget'
import ExamWidget from './components/ExamWidget'
import EssayQuestionWidget from './components/EssayQuestionWidget'
import MultipleChoiceQuestionWidget from './components/MultipleChoiceQuestionWidget'
import TrueOrFalseQuestionWidget from './components/TrueOrFalseQuestionWidget'
import FillInTheBlanksQuestionWidget from './components/FillInTheBlanksQuestionWidget'

class Home extends React.Component {
    static navigationOptions = {
        title: 'Course Manager'
    }
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <ScrollView>
                <StatusBar barStyle="dark-content"/>

                <Button title="Courses"
                        onPress={() => this.props.navigation
                            .navigate('CourseList') } />
            </ScrollView>
        )
    }
}


const App = createStackNavigator({
    Home,
    CourseList,
    ModuleList,
    LessonList,
    TopicList,
    WidgetList,
    AssignmentWidget,
    ExamWidget,
    EssayQuestionWidget,
    MultipleChoiceQuestionWidget,
    TrueOrFalseQuestionWidget,
    FillInTheBlanksQuestionWidget
},{initialRouteName:'Home'});

export default App;
